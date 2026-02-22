"use client";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { LaunchBar } from '@/components/LaunchBar';
import { InstanceCard } from '@/components/InstanceCard';
import { TerminalFeed } from '@/components/TerminalFeed';
import { HardwareMonitor } from '@/components/HardwareMonitor';
import { SettingsOverlay } from '@/components/SettingsOverlay';
import { useLauncher } from '@/hooks/useLauncher';
import { Package, Blocks, Cpu, Settings } from 'lucide-react';
import Image from 'next/image';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const launcher = useLauncher();

  const instances = launcher.installedVersions.length > 0
    ? launcher.installedVersions.slice(0, 4).map(ver => ({
        version: ver,
        loader: "Local",
        lastPlayed: "UNKNOWN",
        icon: <Package className="w-5 h-5" />
      }))
    : [
        { version: "1.21.1", loader: "Fabric", lastPlayed: "2H AGO", icon: <Package className="w-5 h-5" /> },
        { version: "1.20.4", loader: "Forge", lastPlayed: "5D AGO", icon: <Blocks className="w-5 h-5" /> },
        { version: "1.19.2", loader: "Quilt", lastPlayed: "2W AGO", icon: <Cpu className="w-5 h-5" /> }
      ];

  if (!launcher.playerName) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-8 bg-vesper-black">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bento-panel p-12 flex flex-col items-center justify-center max-w-md w-full"
        >
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 font-mono uppercase">
            Vesper<span className="text-vesper-copper-end">.init()</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-10 text-center leading-relaxed font-mono">
            SYS_AUTH_REQUIRED. Please authenticate via Microsoft to sync your profile.
          </p>
          
          <button 
            onClick={launcher.authenticate}
            className="w-full bg-white text-black hover:bg-zinc-200 px-6 py-4 font-mono font-bold text-sm transition-colors border border-transparent shadow-none"
          >
            EXECUTE AUTH LOGIC
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full p-6 flex flex-col gap-6 bg-vesper-black/80">
      {/* Header Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center bento-panel p-4"
      >
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
            Vesper<span className="text-vesper-copper-end">.init()</span>
          </h1>
          <div className="h-4 w-px bg-zinc-800" />
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest leading-none">High-Utility Output</span>
        </div>
        
        <div className="flex items-center gap-4">
          <HardwareMonitor />
          
          <div className="flex items-center gap-3 bento-panel pr-4 p-1">
             <Image src={`https://minotar.net/helm/${launcher.playerName}/40.png`} alt="Player" width={32} height={32} className="w-8 h-8 pixelated grayscale hover:grayscale-0 transition-all" style={{ imageRendering: 'pixelated' }} />
             <span className="text-white font-mono text-sm uppercase">{launcher.playerName}</span>
          </div>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-zinc-500 hover:text-white transition-colors bento-panel p-3 hover:bg-white/5"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Main Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 grid grid-cols-12 gap-6 min-h-0"
      >
        {/* Left Column (Instances) */}
        <motion.div variants={itemVariants} className="col-span-4 flex flex-col gap-6">
          <div className="flex-1 bento-panel p-6 flex flex-col">
             <InstanceCard 
               instances={instances} 
               selectedVersion={launcher.selectedVersion} 
               onSelect={launcher.setSelectedVersion} 
             />
          </div>
        </motion.div>

        {/* Right Column (Terminal / Launch) */}
        <motion.div variants={itemVariants} className="col-span-8 flex flex-col gap-6">
          <div className="flex-1 bento-panel p-6 relative overflow-hidden flex flex-col">
            <h3 className="text-zinc-500 font-mono text-xs mb-4 tracking-widest uppercase flex items-center gap-2">
              <div className="w-2 h-2 bg-vesper-copper-end" />
              Terminal Output
            </h3>
            <TerminalFeed logs={launcher.logs} />
          </div>
          
          <div className="bento-panel p-4">
            <LaunchBar 
               state={launcher.state}
               onLaunch={launcher.handleLaunch}
               onKill={launcher.killProcess}
               selectedVersion={launcher.selectedVersion}
            />
          </div>
        </motion.div>
      </motion.div>

      <SettingsOverlay 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        ram={launcher.ram}
        setRam={launcher.setRam}
      />
    </main>
  );
}
