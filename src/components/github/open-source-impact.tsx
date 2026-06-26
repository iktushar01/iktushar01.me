"use client";

import { motion } from "framer-motion";
import {
  Flame,
  GitFork,
  GitMerge,
  GitPullRequest,
  Package,
  Star,
  Target,
} from "lucide-react";

import { AnimatedCounter } from "@/components/github/animated-counter";
import { GlassCard } from "@/components/github/glass-card";
import type { ImpactMetrics } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

interface OpenSourceImpactProps {
  metrics: ImpactMetrics;
}

export function OpenSourceImpact({ metrics }: OpenSourceImpactProps) {
  const cards = [
    {
      label: "Repositories",
      value: metrics.totalRepositories,
      icon: <Package className="size-4" />,
    },
    {
      label: "Stars Received",
      value: metrics.totalStarsReceived,
      icon: <Star className="size-4" />,
    },
    {
      label: "Total Forks",
      value: metrics.totalForks,
      icon: <GitFork className="size-4" />,
    },
    {
      label: "PRs Merged",
      value: metrics.pullRequestsMerged,
      icon: <GitMerge className="size-4" />,
    },
    {
      label: "Issues Resolved",
      value: metrics.issuesResolved,
      icon: <GitPullRequest className="size-4" />,
    },
    {
      label: "Contributions",
      value: metrics.openSourceContributions,
      icon: <Target className="size-4" />,
    },
    {
      label: "Longest Streak",
      value: metrics.longestStreak,
      suffix: " days",
      icon: <Flame className="size-4" />,
    },
  ];

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
          Impact
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Open Source Impact
        </h3>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card, i) => (
          <GlassCard key={card.label} className="p-4 sm:p-5" delay={i * 0.04}>
            <div className="flex items-center gap-2 text-primary mb-2">
              {card.icon}
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {card.label}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-semibold text-foreground tabular-nums">
              <AnimatedCounter
                value={card.value}
                suffix={"suffix" in card ? card.suffix : ""}
              />
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
