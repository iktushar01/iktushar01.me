"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

const kickerToneClass = {
  accent: "bg-accent text-accent-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
} as const;

export type SectionKickerTone = keyof typeof kickerToneClass;

type SectionHeaderProps = {
  kicker: string;
  kickerTone?: SectionKickerTone;
  /** Slight sticker rotation; keep small for consistency */
  kickerRotate?: string;
  title: ReactNode;
  className?: string;
  /** Default on; turn off when using stroked text (e.g. education hero) */
  showTitleDropShadow?: boolean;
};

export function SectionHeader({
  kicker,
  kickerTone = "accent",
  kickerRotate = "-rotate-2",
  title,
  className,
  showTitleDropShadow = true,
}: SectionHeaderProps) {
  return (
    <header className={cn("text-center mb-16 sm:mb-20 md:mb-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className={cn(
          "inline-block px-4 py-2 sm:px-5 sm:py-2.5 border-4 border-border font-black text-xs sm:text-sm uppercase tracking-wide mb-6 shadow-cartoon-sm",
          kickerToneClass[kickerTone],
          kickerRotate,
        )}
      >
        {kicker}
      </motion.div>
      <div
        className={cn(
          "font-black uppercase italic tracking-tighter leading-none text-foreground text-5xl sm:text-6xl md:text-8xl lg:text-9xl",
          showTitleDropShadow && "drop-shadow-cartoon",
        )}
      >
        {title}
      </div>
    </header>
  );
}
