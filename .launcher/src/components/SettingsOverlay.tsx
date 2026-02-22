import React from "react";
import { Settings2, X, Cpu, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  ram: string;
  setRam: (ram: string) => void;
}

export function SettingsOverlay({ isOpen, onClose, ram, setRam }: SettingsOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bento-panel w-full max-w-md relative z-10 flex flex-col shadow-2xl shadow-black"
          >
            <div className="flex justify-between items-center p-4 border-b border-[#333]">
              <h2 className="text-sm font-mono font-bold tracking-widest text-white flex gap-2 items-center uppercase">
                <Settings2 className="w-4 h-4 text-vesper-copper-end" strokeWidth={1.5} />
                Engine Config
              </h2>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors hover:bg-white/10 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* RAM Allocation */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-500 tracking-widest flex items-center gap-2 uppercase">
                  <Cpu className="w-3 h-3 text-vesper-copper-end" /> Max Memory (RAM)
                </label>
                <div className="border border-[#333] flex bg-black/50 p-1">
                  {['2G', '4G', '8G'].map(val => (
                    <button
                      key={val}
                      onClick={() => setRam(val)}
                      className={`flex-1 py-2 text-sm font-mono transition-colors ${
                        ram === val 
                          ? 'bg-vesper-copper-end/10 text-vesper-copper-end border border-vesper-copper-end/30' 
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
                <label className="text-xs font-mono text-zinc-500 tracking-widest flex items-center gap-2 uppercase">
                  <FolderOpen className="w-3 h-3 text-vesper-copper-end" /> Java Executable
                </label>
                <div className="border border-[#333] bg-black/50 px-4 py-3 flex items-center justify-between text-zinc-400 text-sm font-mono group hover:border-zinc-500 transition-colors cursor-pointer">
                  <span className="truncate mr-2 uppercase">System Default</span>
                  <FolderOpen className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-vesper-copper-end transition-all" />
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-[#333] bg-black/20">
              <p className="text-[10px] text-zinc-500 font-mono text-center tracking-widest">VESPER.INIT() v0.1.0-beta</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
