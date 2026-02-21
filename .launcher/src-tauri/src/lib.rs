use tauri::{AppHandle, Emitter, Manager, WebviewUrl, WebviewWindowBuilder};
use std::process::Stdio;
use tokio::io::{AsyncBufReadExt, BufReader};
use tauri_plugin_opener::OpenerExt;
use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use std::fs;
use std::path::PathBuf;

fn get_minecraft_path() -> Option<PathBuf> {
    let mut path = dirs::data_dir()?;
    #[cfg(target_os = "windows")]
    path.push(".minecraft");
    #[cfg(target_os = "macos")]
    {
        path = dirs::data_local_dir().unwrap_or(path);
        path.push("minecraft");
    }
    #[cfg(target_os = "linux")]
    path.push(".minecraft");
    Some(path)
}

#[tauri::command]
async fn check_minecraft_dir() -> Result<bool, String> {
    let path = get_minecraft_path().ok_or("No data dir found")?;
    Ok(path.exists())
}

#[tauri::command]
async fn scan_installed_versions() -> Result<Vec<String>, String> {
    let mut path = get_minecraft_path().ok_or("No data dir found")?;
    path.push("versions");
    
    let mut versions = Vec::new();
    if path.exists() && path.is_dir() {
        if let Ok(entries) = fs::read_dir(path) {
            for entry in entries.flatten() {
                if let Ok(file_type) = entry.file_type() {
                    if file_type.is_dir() {
                        if let Ok(name) = entry.file_name().into_string() {
                            versions.push(name);
                        }
                    }
                }
            }
        }
    }
    Ok(versions)
}

#[tauri::command]
async fn download_manifest() -> Result<String, String> {
    let resp = reqwest::get("https://launchermeta.mojang.com/mc/game/version_manifest.json")
        .await.map_err(|e| e.to_string())?;
    let text = resp.text().await.map_err(|e| e.to_string())?;
    Ok(text)
}

#[tauri::command]
async fn launch_game(app: AppHandle, version: String, ram: String) -> Result<(), String> {
    let _ = app.emit("game-log", format!("[INFO] Starting launch sequence for {} with {}...", version, ram));
    
    let mut cmd = tokio::process::Command::new("java");
    cmd.arg("-Xmx".to_owned() + &ram)
       .arg("-version");
       
    cmd.stdout(Stdio::piped())
       .stderr(Stdio::piped());
       
    let mut child = match cmd.spawn() {
        Ok(c) => c,
        Err(e) => {
            let _ = app.emit("game-log", format!("[ERROR] Failed to start Java: {}", e));
            return Err(e.to_string());
        }
    };
    
    let stderr = child.stderr.take().unwrap();
    let mut reader = BufReader::new(stderr).lines();
    
    let app_clone = app.clone();
    tokio::spawn(async move {
        while let Ok(Some(line)) = reader.next_line().await {
            let _ = app_clone.emit("game-log", format!("[JAVA] {}", line));
        }
    });

    let stdout = child.stdout.take().unwrap();
    let mut stdout_reader = BufReader::new(stdout).lines();
    
    tokio::spawn(async move {
        while let Ok(Some(line)) = stdout_reader.next_line().await {
            let _ = app.emit("game-log", format!("[JAVA] {}", line));
        }
    });
    
    Ok(())
}

#[tauri::command]
async fn start_microsoft_oauth(app: AppHandle) -> Result<String, String> {
    let client = reqwest::Client::new();
    let client_id = "00000000402b5328";

    let redirect_uri = "https://login.live.com/oauth20_desktop.srf";
    
    let auth_url = format!(
        "https://login.live.com/oauth20_authorize.srf?client_id={}&response_type=code&redirect_uri={}&scope=XboxLive.signin%20offline_access",
        client_id, urlencoding::encode(redirect_uri)
    );
    
    let _ = app.emit("game-log", "[INFO] Opening Microsoft Auth window...");
    
    if let Some(win) = app.get_webview_window("ms-login") {
        let _ = win.close();
    }
    
    let (tx, rx) = tokio::sync::oneshot::channel();
    let tx_arc = std::sync::Arc::new(std::sync::Mutex::new(Some(tx)));
    let tx_clone = tx_arc.clone();
    let app_clone = app.clone();
    
    let _login_window = WebviewWindowBuilder::new(&app, "ms-login", WebviewUrl::External(auth_url.parse().unwrap()))
        .title("Microsoft Login")
        .inner_size(500.0, 600.0)
        .on_navigation(move |url| {
            let url_str = url.to_string();
            if url_str.starts_with("https://login.live.com/oauth20_desktop.srf") {
                if let Some(query) = url.query() {
                    for param in query.split('&') {
                        let mut kv = param.split('=');
                        if kv.next() == Some("code") {
                            if let Some(val) = kv.next() {
                                if let Some(tx_sender) = tx_clone.lock().unwrap().take() {
                                    let _ = tx_sender.send(val.to_string());
                                }
                                if let Some(win) = app_clone.get_webview_window("ms-login") {
                                    let _ = win.close();
                                }
                                return false;
                            }
                        }
                    }
                }
            }
            true
        })
        .build()
        .map_err(|e| e.to_string())?;

    let auth_code = rx.await.map_err(|_| "Login window closed before completing authentication")?;
    
    let _ = app.emit("game-log", "[INFO] Exchanging auth code...");

    // 2. MS Token
    let body = format!(
        "client_id={}&code={}&grant_type=authorization_code&redirect_uri={}",
        client_id, urlencoding::encode(&auth_code), urlencoding::encode(redirect_uri)
    );
    
    let token_res: serde_json::Value = client.post("https://login.live.com/oauth20_token.srf")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .body(body)
        .send().await.map_err(|e| e.to_string())?
        .json().await.map_err(|e| e.to_string())?;
        
    let ms_token = token_res["access_token"].as_str().ok_or("Failed to get MS access token")?;

    let _ = app.emit("game-log", "[INFO] Authenticating with Xbox Live...");

    // 3. XBL Token
    let xbl_req = serde_json::json!({
        "Properties": {
            "AuthMethod": "RPS",
            "SiteName": "user.auth.xboxlive.com",
            "RpsTicket": format!("d={}", ms_token)
        },
        "RelyingParty": "http://auth.xboxlive.com",
        "TokenType": "JWT"
    });
    let xbl_res: serde_json::Value = client.post("https://user.auth.xboxlive.com/user/authenticate")
        .json(&xbl_req)
        .send().await.map_err(|e| e.to_string())?
        .json().await.map_err(|e| e.to_string())?;
        
    let xbl_token = xbl_res["Token"].as_str().ok_or("Failed to get XBL token")?;
    let uhs = xbl_res["DisplayClaims"]["xui"][0]["uhs"].as_str().ok_or("Failed to get UHS")?;

    let _ = app.emit("game-log", "[INFO] Fetching XSTS token...");

    // 4. XSTS Token
    let xsts_req = serde_json::json!({
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [xbl_token]
        },
        "RelyingParty": "rp://api.minecraftservices.com/",
        "TokenType": "JWT"
    });
    let xsts_res: serde_json::Value = client.post("https://xsts.auth.xboxlive.com/xsts/authorize")
        .json(&xsts_req)
        .send().await.map_err(|e| e.to_string())?
        .json().await.map_err(|e| e.to_string())?;
        
    let xsts_token = xsts_res["Token"].as_str().ok_or("Missing XSTS token. Might be underage account?")?;

    let _ = app.emit("game-log", "[INFO] Logging into Minecraft services...");

    // 5. MC Token
    let mc_req = serde_json::json!({
        "identityToken": format!("XBL3.0 x={};{}", uhs, xsts_token)
    });
    let mc_res: serde_json::Value = client.post("https://api.minecraftservices.com/authentication/login_with_xbox")
        .json(&mc_req)
        .send().await.map_err(|e| e.to_string())?
        .json().await.map_err(|e| e.to_string())?;
        
    let mc_token = mc_res["access_token"].as_str().ok_or("Failed to get MC token")?;

    let _ = app.emit("game-log", "[INFO] Fetching Minecraft profile...");

    // 6. Profile
    let profile_res: serde_json::Value = client.get("https://api.minecraftservices.com/minecraft/profile")
        .header("Authorization", format!("Bearer {}", mc_token))
        .send().await.map_err(|e| e.to_string())?
        .json().await.map_err(|e| e.to_string())?;
        
    let name = profile_res["name"].as_str().unwrap_or("Steve");

    let _ = app.emit("game-log", format!("[INFO] Logged in successfully: {}", name));

    // For now we just return the name to show it visually
    Ok(name.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_log::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            check_minecraft_dir,
            scan_installed_versions,
            download_manifest,
            launch_game,
            start_microsoft_oauth
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
