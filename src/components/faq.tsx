"use client";

import { motion } from "framer-motion";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is Vesper?",
    answer:
      "Vesper is a minimal, high-performance Minecraft launcher and toolkit for creators and people who like to mess with or customize their game. It gives you full control over your Minecraft setup and removes all unnecessary bloat.",
  },
  {
    question: "Is Vesper open source?",
    answer:
      "Yes! Vesper is open source. You can view the code, contribute, or suggest features on GitHub.",
  },
  {
    question: "Will Vesper work with modpacks?",
    answer:
      "Yes. Vesper is designed to support modded Minecraft — Fabric, Forge, Quilt, and more. Manage your modpacks like real projects, not just folders.",
  },
  {
    question: "Who is Vesper for?",
    answer:
      "Vesper is for players who want control, speed, and transparency — creators, people who like to change things, or anyone who wants to go beyond what other launchers offer.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="max-w-7xl mx-auto px-6 py-20 border-t border-border/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-mono font-bold text-foreground mb-4">
          Frequently Asked <span className="text-brand-accent">Questions</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Answers to what people usually want to know about Vesper and why it’s different.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="p-6 rounded-xl bg-muted/20 border border-border flex items-start gap-5 group hover:border-brand-accent/30 transition-colors"
          >
            <QuestionMarkCircleIcon className="w-8 h-8 min-w-8 text-brand-accent mt-1 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-lg font-mono font-bold text-foreground mb-1">{faq.question}</h3>
              <p className="text-sm text-muted-foreground font-medium">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;