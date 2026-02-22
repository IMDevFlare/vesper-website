import React from "react";
import { Play, Download, Square } from "lucide-react";
import type { LauncherState } from "@/hooks/useLauncher";
import { cn } from "@/lib/utils";

interface LaunchBarProps {
  state: LauncherState;
  onLaunch: () => void;
  onKill: () => void;
  selectedVersion: string;
}

export function LaunchBar({ state, onLaunch, onKill, selectedVersion }: LaunchBarProps) {
  let buttonStyle = "bg-white text-black hover:bg-zinc-200";
  let label = "EXECUTE INITIALIZATION";
  let Icon = Play;
  let action = onLaunch;
  let versionBg = "bg-zinc-200 text-black";

  if (state === 'INITIALIZE') {
    buttonStyle = "bg-zinc-900 border-zinc-800 text-zinc-500 cursor-not-allowed";
    label = "VERIFYING MANIFEST...";
    Icon = Download;
    action = () => {};
    versionBg = "bg-zinc-950 text-zinc-600";
  } else if (state === 'ACTIVE') {
    buttonStyle = "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/30";
    label = "KILL PROCESS";
    Icon = Square;
    action = onKill;
    versionBg = "bg-red-500/20 text-red-500";
  }

  return (
    <div className="w-full">
      <button 
        onClick={action}
        className={cn(
          "w-full group relative flex items-center justify-between p-1 transition-all duration-300 border border-transparent",
          buttonStyle
        )}
      >
        <div className="flex items-center gap-4 pl-4 relative z-10 w-full h-12">
          <Icon className={cn("w-5 h-5", state !== 'ACTIVE' ? 'fill-current' : '')} strokeWidth={state === 'ACTIVE' ? 2 : 1} />
          <span className="font-mono font-bold tracking-widest text-sm flex-1 text-left uppercase">{label}</span>
          
          {/* Monospaced Version Info */}
          <div className={cn("h-full px-6 flex items-center gap-2 font-mono text-sm tracking-widest transition-colors border-l border-black/10", versionBg)}>
             <span>v{selectedVersion}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
