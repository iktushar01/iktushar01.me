"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

type SectionHeaderProps = {
  kicker: string;
  title: ReactNode;
  className?: string;
};

export function SectionHeader({ kicker, title, className }: SectionHeaderProps) {
  return (
    <header className={cn("mb-12 sm:mb-16", className)}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3"
      >
        {kicker}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...springSoft, delay: 0.05 }}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-foreground leading-tight"
      >
        {title}
      </motion.div>
    </header>
  );
}
