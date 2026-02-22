import React, { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalFeedProps {
  logs: string[];
}

export function TerminalFeed({ logs }: TerminalFeedProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className="w-full h-full flex flex-col min-h-[200px]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest">
          <Terminal className="w-4 h-4" strokeWidth={1.5} />
          SYS_OUT / LOGS
        </div>
        {logs.length > 0 && (
          <span className="text-[10px] text-vesper-copper-end font-mono animate-pulse">Running...</span>
        )}
      </div>

      <div className="bg-[#020202] border border-[#222] flex-1 p-4 font-mono text-xs overflow-y-auto scrollbar-hide flex flex-col scanline relative">
        <AnimatePresence initial={false}>
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-1.5 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-amber-400' : 'text-zinc-400'}`}
            >
              <span className="text-zinc-600 select-none mr-2">{'>'}</span>
              {log}
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="animate-pulse text-vesper-copper-end mt-2 leading-none">█</div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
