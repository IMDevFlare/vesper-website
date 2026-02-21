import React from "react";
import { Play, Download, Square } from "lucide-react";
import type { LauncherState } from "@/hooks/useLauncher";

interface LaunchBarProps {
  state: LauncherState;
  onLaunch: () => void;
  onKill: () => void;
  selectedVersion: string;
}

export function LaunchBar({ state, onLaunch, onKill, selectedVersion }: LaunchBarProps) {
  let buttonStyle = "bg-white text-black hover:bg-zinc-200 border border-white";
  let label = "LAUNCH INITIALIZATION";
  let Icon = Play;
  let action = onLaunch;
  let versionBg = "bg-zinc-100 text-black";

  if (state === 'INITIALIZE') {
    buttonStyle = "bg-zinc-800 border border-zinc-700 text-zinc-400 cursor-not-allowed";
    label = "VERIFYING MANIFEST...";
    Icon = Download;
    action = () => {};
    versionBg = "bg-zinc-900 text-zinc-500";
  } else if (state === 'ACTIVE') {
    buttonStyle = "bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400";
    label = "KILL PROCESS";
    Icon = Square;
    action = onKill;
    versionBg = "bg-red-500/20 text-red-500";
  }

  return (
    <div className="w-full">
      <button 
        onClick={action}
        className={`w-full group relative flex items-center justify-between rounded-full px-2 py-2 overflow-hidden transition-all duration-300 ${buttonStyle}`}
      >
        <div className="flex items-center gap-4 pl-4 relative z-10 w-full">
          <Icon className={`w-5 h-5 ${state !== 'ACTIVE' ? 'fill-current' : ''}`} strokeWidth={state === 'ACTIVE' ? 2 : 1} />
          <span className="font-bold tracking-widest text-sm flex-1 text-left">{label}</span>
          
          {/* Monospaced Version Info directly on the pill */}
          <div className={`rounded-full px-6 py-2 flex items-center gap-2 font-mono text-sm tracking-widest transition-colors ${versionBg}`}>
             <span>v{selectedVersion}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
