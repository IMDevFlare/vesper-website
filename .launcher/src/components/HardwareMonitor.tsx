import React from "react";
import { Zap, Activity } from "lucide-react";

export function HardwareMonitor() {
  return (
    <div className="flex gap-6 items-center bento-panel px-6 hover:bg-white/5 transition-colors h-10">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-vesper-copper-end" strokeWidth={1.5} />
        <div className="flex gap-2 items-end">
          <span className="text-[10px] text-zinc-500 font-mono leading-none tracking-widest">RAM</span>
          <span className="text-xs font-mono text-white font-bold leading-none">8.0GB</span>
        </div>
      </div>
      
      <div className="w-px h-full bg-[#333]" />
      
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-vesper-copper-end" strokeWidth={1.5} />
        <div className="flex gap-2 items-end">
          <span className="text-[10px] text-zinc-500 font-mono leading-none tracking-widest">CPU</span>
          <span className="text-xs font-mono text-white font-bold leading-none">12T</span>
        </div>
      </div>
    </div>
  );
}
