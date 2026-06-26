"use client";

import { motion } from "framer-motion";

import { AnimatedCounter } from "@/components/github/animated-counter";
import { GlassCard } from "@/components/github/glass-card";
import type { MonthlyContribution, MonthlySummary } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

interface MonthlyContributionsProps {
  data: MonthlyContribution[];
  summary: MonthlySummary;
}

export function MonthlyContributions({
  data,
  summary,
}: MonthlyContributionsProps) {
  const maxCommits = Math.max(...data.map((d) => d.commits), 1);

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
          Analytics
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Monthly Contributions
        </h3>
      </motion.div>

      <div className="space-y-4">
        {data.map((month, i) => {
          const width = (month.commits / maxCommits) * 100;
          return (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: i * 0.05 }}
              className="group"
            >
              <div className="flex items-center justify-between gap-4 mb-1.5">
                <span className="text-sm font-medium text-foreground w-24 shrink-0">
                  {month.month}
                </span>
                <span className="text-xs font-mono text-muted-foreground tabular-nums">
                  {month.commits} commits
                </span>
              </div>
              <div className="h-2 bg-muted/50 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: 0.1 + i * 0.05 }}
                  className="h-full bg-gradient-to-r from-primary/60 to-primary group-hover:from-primary group-hover:to-primary/80 transition-colors"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No monthly data available yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
            Most Productive
          </p>
          <p className="text-sm font-semibold text-foreground">
            {summary.mostProductiveMonth}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
            Avg Monthly
          </p>
          <p className="text-sm font-semibold text-foreground tabular-nums">
            <AnimatedCounter value={summary.averageMonthlyCommits} /> commits
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
            Yearly Growth
          </p>
          <p className="text-sm font-semibold text-primary tabular-nums">
            {summary.yearlyGrowthPercent >= 0 ? "+" : ""}
            <AnimatedCounter value={summary.yearlyGrowthPercent} suffix="%" />
          </p>
        </div>
      </div>
    </GlassCard>
  );
}
