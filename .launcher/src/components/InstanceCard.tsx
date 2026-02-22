import React from 'react';
import { cn } from '@/lib/utils';

interface Instance {
  version: string;
  loader: string;
  lastPlayed: string;
  icon: React.ReactNode;
}

interface InstanceCardProps {
  instances: Instance[];
  selectedVersion: string;
  onSelect: (version: string) => void;
}

export function InstanceCard({ instances, selectedVersion, onSelect }: InstanceCardProps) {
  return (
    <div className="w-full flex-1 flex flex-col">
      <h3 className="text-zinc-500 font-mono text-xs mb-4 tracking-widest flex items-center gap-2 uppercase">
        <div className="w-2 h-2 bg-vesper-copper-end" />
        Installed Instances
      </h3>
      <div className="grid grid-cols-1 gap-4 flex-1">
        {instances.map((instance) => {
          const isSelected = selectedVersion === instance.version;
          return (
            <div
              key={instance.version}
              onClick={() => onSelect(instance.version)}
              className={cn(
                "p-4 flex flex-col gap-3 transition-colors cursor-pointer border relative overflow-hidden group",
                isSelected 
                  ? 'border-vesper-copper-end bg-vesper-copper-end/5' 
                  : 'border-[#333] hover:border-zinc-500 bg-black/20'
              )}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 w-1 h-full bg-vesper-copper-end" />
              )}
              <div className="flex justify-between items-start">
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center font-bold text-lg border",
                  isSelected ? 'text-vesper-copper-end border-vesper-copper-end/30 bg-vesper-copper-end/10' : 'bg-black text-white border-[#333]'
                )}>
                  {instance.icon}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono text-right uppercase">
                  LAST PLAYED<br/>
                  <span className="text-zinc-400">{instance.lastPlayed}</span>
                </div>
              </div>
              <div>
                <div className="font-mono font-bold text-white text-sm">Minecraft {instance.version}</div>
                <div className="text-xs text-zinc-500 font-mono mt-0.5 uppercase">{instance.loader}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
