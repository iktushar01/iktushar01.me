"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Flame, TrendingUp, Zap } from "lucide-react";

import { GlassCard } from "@/components/github/glass-card";
import { AnimatedCounter } from "@/components/github/animated-counter";
import type { ContributionDay, ContributionSummary } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const LEVEL_CLASSES = [
  "bg-muted/80",
  "bg-primary/25",
  "bg-primary/45",
  "bg-primary/65",
  "bg-primary",
];

function getLevel(count: number, max: number): number {
  if (count <= 0) return 0;
  if (max <= 0) return 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

interface ContributionHeatmapProps {
  weeks: ContributionDay[][];
}

function ContributionHeatmap({ weeks }: ContributionHeatmapProps) {
  const max = weeks.reduce(
    (peak, week) => Math.max(peak, ...week.map((day) => day.count)),
    0
  );

  return (
    <div className="overflow-x-auto lp-scrollbar pb-2">
      <div className="inline-flex gap-[3px] min-w-min">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.count} contributions on ${day.date}`}
                className={cn(
                  "size-3 sm:size-[12px] border border-border/30",
                  LEVEL_CLASSES[getLevel(day.count, max)]
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface GitHubCalendarSectionProps {
  totalContributions: number;
  summary: ContributionSummary;
  weeks: ContributionDay[][];
}

export function GitHubCalendarSection({
  totalContributions,
  summary,
  weeks,
}: GitHubCalendarSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    {
      label: "This Year",
      value: summary.thisYearContributions,
      icon: <Calendar className="size-4" />,
    },
    {
      label: "Avg / Week",
      value: summary.averagePerWeek,
      icon: <TrendingUp className="size-4" />,
    },
    {
      label: "Top Month",
      value: summary.mostActiveMonth,
      icon: <Zap className="size-4" />,
      isText: true,
    },
    {
      label: "Current Streak",
      value: summary.currentStreak,
      suffix: " days",
      icon: <Flame className="size-4" />,
    },
    {
      label: "Longest Streak",
      value: summary.longestStreak,
      suffix: " days",
      icon: <Flame className="size-4" />,
    },
  ];

  return (
    <GlassCard className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
          Contribution Graph
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-1">
          Contribution Heatmap
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          <AnimatedCounter value={totalContributions} /> contributions in the
          last year on GitHub
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...springSoft, delay: 0.1 }}
      >
        {mounted && weeks.length > 0 ? (
          <ContributionHeatmap weeks={weeks} />
        ) : (
          <div className="h-[140px] animate-pulse bg-muted/60" />
        )}
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: 0.15 + i * 0.05 }}
            className="p-3 border border-border/50 bg-background/30"
          >
            <div className="flex items-center gap-1.5 text-primary mb-1">
              {stat.icon}
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-foreground truncate">
              {"isText" in stat && stat.isText ? (
                stat.value
              ) : (
                <>
                  <AnimatedCounter
                    value={typeof stat.value === "number" ? stat.value : 0}
                  />
                  {"suffix" in stat && stat.suffix}
                </>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
