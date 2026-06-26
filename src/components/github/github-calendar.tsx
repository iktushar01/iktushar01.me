"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Calendar, Flame, TrendingUp, Zap } from "lucide-react";

import { GlassCard } from "@/components/github/glass-card";
import { AnimatedCounter } from "@/components/github/animated-counter";
import type { ContributionSummary } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((m) => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[140px] animate-pulse bg-muted/60 rounded-none" />
    ),
  }
);

interface GitHubCalendarSectionProps {
  username: string;
  totalContributions: number;
  summary: ContributionSummary;
}

export function GitHubCalendarSection({
  username,
  totalContributions,
  summary,
}: GitHubCalendarSectionProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const calendarTheme = {
    light: ["#f0ede6", "#e8d9a8", "#d4b84a", "#b8941a", "#8a6f00"],
    dark: ["#1a1a1a", "#3d3520", "#6b5a1e", "#a89020", "#e8d44a"],
  };

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
        className="overflow-x-auto lp-scrollbar pb-2"
      >
        <GitHubCalendar
          username={username}
          theme={calendarTheme}
          colorScheme={theme}
          blockSize={12}
          blockMargin={3}
          fontSize={12}
          showWeekdayLabels
        />
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
