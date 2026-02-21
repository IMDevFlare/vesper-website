"use client";

import { motion } from "framer-motion";
import { 
  BoltIcon, 
  CodeBracketIcon, 
  CubeTransparentIcon,
  ShieldCheckIcon 
} from "@heroicons/react/24/outline";
import { cn } from "../lib/utils";

const features = [
  {
    title: "Lightning Fast",
    description: "Powered by Bun and Next.js 16 App Router for instant loading times.",
    icon: BoltIcon,
    className: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "Type Safe",
    description: "Strict TypeScript configuration out of the box.",
    icon: CodeBracketIcon,
    className: "col-span-1",
  },
  {
    title: "Vesper Aesthetics",
    description: "Sleek, eye-catching design language inspired by modern developer tooling.",
    icon: CubeTransparentIcon,
    className: "col-span-1",
  },
  {
    title: "Secure Core",
    description: "Enterprise grade security defaults.",
    icon: ShieldCheckIcon,
    className: "col-span-1 md:col-span-2",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-xl bg-muted/40 p-8 hover-glow border border-border",
              feature.className
            )}
          >
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent/20 group-hover:bg-accent transition-colors" />
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <feature.icon className="w-8 h-8 text-accent/80 mb-4" />
              <div>
                <h3 className="text-xl font-mono font-semibold text-foreground mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
