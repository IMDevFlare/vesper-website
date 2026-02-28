"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CommandLineIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import DownloadModal from "./download_modal";

function GitHubIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <title>GitHub</title>
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.021c0 4.427 2.867 8.184 6.839 9.504.5.093.682-.217.682-.482
        0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608
        1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.339-2.22-.253-4.555-1.113-4.555-4.951
        0-1.093.39-1.987 1.029-2.686-.103-.254-.447-1.272.098-2.651 0 0 .84-.27 2.75 1.025A9.564 9.564 0
        0 1 12 6.844a9.6 9.6 0 0 1 2.504.338c1.909-1.296 2.747-1.025 2.747-1.025.547 1.379.203 2.397.1 2.651.64.699
        1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012
        2.417-.012 2.747 0 .267.18.579.688.481A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

type NavLink =
  | { name: string; href: string; type: "anchor" }
  | { name: string; href: string; type: "route" };

const navLinks: NavLink[] = [
  { name: "Features", href: "#features", type: "anchor" },
  { name: "Requirements", href: "#system", type: "anchor" },
  { name: "Changelog", href: "/changelog", type: "route" }
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleOpenDownloadModal = () => {
    setDownloadModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40"
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-[60]">
            <CommandLineIcon className="w-6 h-6 text-brand-accent" />
            <span className="font-mono font-bold tracking-tight text-foreground">Vesper.init()</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link =>
              link.type === "route" ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              )
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenDownloadModal}
                className="px-5 py-2 bg-brand-accent text-background text-sm font-bold rounded-full hover:scale-105 transition-transform"
              >
                Download
              </button>
              <a
                href="https://github.com/IMDevFlare/vesper-website"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 rounded-full hover:bg-brand-accent/10 transition-colors p-2"
                aria-label="Open GitHub repository"
              >
                <GitHubIcon className="w-6 h-6 text-foreground" />
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-60 p-2"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/40 backdrop-blur-md z-40 md:hidden"
              />
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="fixed top-0 left-0 right-0 bg-background border-b border-border px-6 pt-20 pb-8 z-50 md:hidden shadow-2xl"
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-lg font-semibold px-4 py-3 rounded-lg text-brand-accent underline underline-offset-4 hover:bg-brand-accent/10 hover:text-brand-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent transition-colors cursor-pointer"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants} className="pt-2 flex gap-2">
                    <button
                      onClick={handleOpenDownloadModal}
                      className="w-full p-4 bg-brand-accent text-background rounded-xl font-bold text-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform"
                    >
                      Download for Windows
                    </button>
                    <a
                      href="https://github.com/IMDevFlare/vesper-website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 rounded-full hover:bg-brand-accent/10 transition-colors p-2 flex items-center justify-center"
                      aria-label="Open GitHub repository"
                    >
                      <GitHubIcon className="w-6 h-6 text-foreground" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
      <DownloadModal open={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
