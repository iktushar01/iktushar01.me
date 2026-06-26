"use client";

import { motion } from "framer-motion";
import {
  SiGo,
  SiJavascript,
  SiPython,
  SiSharp,
  SiTypescript,
} from "react-icons/si";

import { AnimatedCounter } from "@/components/github/animated-counter";
import { GlassCard } from "@/components/github/glass-card";
import type { LanguageStat } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LANGUAGE_ICONS: Record<string, React.ReactNode> = {
  TypeScript: <SiTypescript className="size-4" />,
  JavaScript: <SiJavascript className="size-4" />,
  Python: <SiPython className="size-4" />,
  "C#": <SiSharp className="size-4" />,
  Go: <SiGo className="size-4" />,
};

interface TopLanguagesProps {
  languages: LanguageStat[];
}

export function TopLanguages({ languages }: TopLanguagesProps) {
  return (
    <GlassCard className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mb-8"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
          Codebase
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Top Languages
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Distribution across public repositories
        </p>
      </motion.div>

      <div className="space-y-5">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: i * 0.06 }}
            className="group"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center size-7 border border-border/50"
                  style={{ color: lang.color }}
                >
                  {LANGUAGE_ICONS[lang.name] ?? (
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: lang.color }}
                    />
                  )}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {lang.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  <AnimatedCounter value={lang.percentage} suffix="%" />
                </span>
                <span className="text-xs text-muted-foreground ml-2 font-mono">
                  {lang.lines.toLocaleString()} lines
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${lang.percentage}%` }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: 0.15 + i * 0.06 }}
                className={cn("h-full")}
                style={{
                  background: `linear-gradient(90deg, ${lang.color}99, ${lang.color})`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {languages.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-6">
          No language data available.
        </p>
      )}
    </GlassCard>
  );
}
