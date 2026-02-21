import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, Terminal } from "lucide-react";

interface TerminalFeedProps {
  logs: string[];
}

export function TerminalFeed({ logs }: TerminalFeedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors py-2 text-xs font-mono uppercase tracking-widest focus:outline-none"
        >
          {isOpen ? <ChevronDown className="w-4 h-4" strokeWidth={1} /> : <ChevronRight className="w-4 h-4" strokeWidth={1} />}
          <Terminal className="w-4 h-4" strokeWidth={1} />
          Initialize Logic
        </button>
        {logs.length > 0 && !isOpen && (
          <span className="text-[10px] text-vesper-glow font-mono animate-pulse">Running...</span>
        )}
      </div>

      {isOpen && (
        <div className="bg-[#020202] border border-white/5 rounded-xl p-4 mt-2 font-mono text-xs h-32 overflow-y-auto scrollbar-hide flex flex-col">
          {logs.map((log, i) => (
            <div key={i} className={`mb-1 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-amber-400' : 'text-zinc-400'}`}>
              <span className="text-zinc-600 select-none mr-2">{'>'}</span>
              {log}
            </div>
          ))}
          <div className="animate-pulse text-vesper-glow mt-2">_</div>
          <div ref={endRef} />
        </div>
      )}
    </div>
  );
}
