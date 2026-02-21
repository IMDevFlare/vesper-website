import React from "react";
import { Settings2, X, Cpu, FolderOpen } from "lucide-react";

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  ram: string;
  setRam: (ram: string) => void;
}

export function SettingsOverlay({ isOpen, onClose, ram, setRam }: SettingsOverlayProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 w-80 bg-vesper-charcoal border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold tracking-tight text-white flex gap-2 items-center">
              <Settings2 className="w-5 h-5 text-vesper-glow" strokeWidth={1.5} />
              <span className="text-gradient">Engine Config</span>
            </h2>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 flex-1">
            {/* RAM Allocation */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-500 tracking-widest flex items-center gap-2">
                <Cpu className="w-3 h-3" /> MAX MEMORY (RAM)
              </label>
              <div className="bg-black/40 border border-white/10 rounded-xl p-1 flex">
                {['2G', '4G', '8G'].map(val => (
                  <button
                    key={val}
                    onClick={() => setRam(val)}
                    className={`flex-1 py-2 text-sm font-mono rounded-lg transition-colors ${
                      ram === val 
                        ? 'bg-vesper-glow/20 text-vesper-glow border border-vesper-glow/30' 
                        : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Java Executable */}
            <div className="space-y-3">
              <label className="text-xs font-mono text-zinc-500 tracking-widest flex items-center gap-2">
                <FolderOpen className="w-3 h-3" /> JAVA EXECUTABLE
              </label>
              <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-zinc-400 text-sm font-mono group hover:border-white/20 transition-colors cursor-pointer">
                <span className="truncate mr-2">System Default</span>
                <FolderOpen className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-vesper-glow transition-all" />
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <p className="text-[10px] text-zinc-500 font-mono text-center">VESPER.INIT() v0.1.0-beta</p>
          </div>
        </div>
      </div>
    </>
  );
}
