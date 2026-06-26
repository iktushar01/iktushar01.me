"use client";

import { motion } from "framer-motion";

import { GlassCard } from "@/components/github/glass-card";
import type { GitHubAchievement } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

function formatEarnedDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

interface AchievementsProps {
  achievements: GitHubAchievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mb-6"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
          Milestones
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          GitHub Achievements
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: i * 0.06 }}
            whileHover={{
              scale: 1.03,
              rotate: 1,
              transition: { duration: 0.2 },
            }}
          >
            <GlassCard className="p-5 h-full text-center" delay={0}>
              <motion.span
                className="text-4xl block mb-3"
                whileHover={{
                  filter: "drop-shadow(0 0 12px oklch(0.86 0.17 96 / 0.5))",
                }}
              >
                {badge.icon}
              </motion.span>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {badge.name}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                {badge.description}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                Earned {formatEarnedDate(badge.earnedDate)}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
