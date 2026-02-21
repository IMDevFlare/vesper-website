"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-accent/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-muted/50 backdrop-blur-sm mb-8"
      >
        <CheckCircleIcon className="w-4 h-4 text-accent" />
        <span className="text-xs font-mono font-medium tracking-wide text-muted-foreground uppercase">
          System Operational
        </span>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold text-center tracking-tight text-foreground max-w-4xl"
      >
        Engineered for <span className="text-accent italic">Efficiency</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl"
      >
        High-utility terminal interface designed to deploy Next.js applications
        at breakneck speeds. Sleek, minimal, and fully typed.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex items-center justify-center gap-4"
      >
        <div className="flex items-center gap-3 px-6 py-3 rounded-lg bg-foreground text-background shadow-lg border-2 border-transparent hover:border-accent/40 font-mono text-sm relative overflow-hidden group transition-all">
          <span className="relative z-10 text-background/60 dark:text-background/80">$</span>
          <span className="relative z-10 font-mono">bun create next-app my-app</span>
        </div>
      </motion.div>
    </section>
  );
}
