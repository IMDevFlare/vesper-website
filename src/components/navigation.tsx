"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CommandLineIcon, Bars3Icon, XMarkIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// 1. Define the interface for the GitHub API response
interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

const menuVariants: Variants = {
  closed: { opacity: 0, y: -10, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 40, staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, x: -10 },
  open: { opacity: 1, x: 0 }
};

export function Navigation() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch("https://api.github.com/repos/IMDevFlare/vesper-launcher/releases/latest");
      // 2. Cast the response to our GitHubRelease interface
      const data = (await res.json()) as GitHubRelease;

      const exeAsset = data.assets?.find((a: GitHubAsset) => a.name.endsWith(".exe"));

      if (exeAsset) {
        window.location.href = exeAsset.browser_download_url;
      } else {
        window.open("https://github.com/IMDevFlare/vesper-launcher/releases/latest", "_blank");
      }
    } catch {
      window.open("https://github.com/IMDevFlare/vesper-launcher/releases/latest", "_blank");
    } finally {
      setIsDownloading(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-[60]">
          <CommandLineIcon className="w-6 h-6 text-brand-accent" />
          <span className="font-mono font-bold tracking-tight text-foreground">Vesper.init()</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-brand-accent transition-colors">Features</a>
          <a href="#system" className="text-sm font-medium hover:text-brand-accent transition-colors">Requirements</a>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-5 py-2 bg-brand-accent text-background text-sm font-bold rounded-full hover:scale-105 transition-transform disabled:opacity-50"
          >
            {isDownloading ? "..." : "Download"}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-[60] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/40 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              variants={menuVariants} initial="closed" animate="open" exit="closed"
              className="fixed top-0 left-0 right-0 bg-background border-b border-border px-6 pt-20 pb-8 z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-3">
                {[
                  { name: "Features", href: "#features" },
                  { name: "Requirements", href: "#system" }
                ].map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-xl bg-brand-accent/5 border border-border/50 text-lg font-semibold"
                    >
                      {link.name} <ChevronRightIcon className="w-5 h-5 text-brand-accent" />
                    </a>
                  </motion.div>
                ))}

                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full p-4 bg-brand-accent text-background rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : "Download for Windows"}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}