"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { springSoft } from "@/lib/motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  delay = 0,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay }}
      whileHover={hover ? { y: -4 } : undefined}
      className={cn(
        "relative group rounded-none",
        "bg-card/50 backdrop-blur-xl",
        "border border-border/60",
        "shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]",
        "transition-shadow duration-300",
        hover && "hover:shadow-lg hover:border-primary/20",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.86 0.17 96 / 0.06) 0%, transparent 50%, oklch(0.76 0.16 82 / 0.04) 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
