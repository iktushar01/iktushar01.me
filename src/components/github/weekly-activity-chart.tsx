"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { GlassCard } from "@/components/github/glass-card";
import type { WeeklyActivityPoint } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

const AreaChart = dynamic(
  () =>
    import("recharts").then((m) => {
      const { AreaChart: Chart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } = m;
      return function WeeklyChart({
        data,
      }: {
        data: WeeklyActivityPoint[];
      }) {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <Chart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.86 0.17 96)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.86 0.17 96)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fill: "oklch(0.64 0.015 85)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "oklch(0.64 0.015 85)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "oklch(0.16 0.012 85 / 0.95)",
                  border: "1px solid oklch(0.97 0.006 85 / 0.12)",
                  borderRadius: 0,
                  fontSize: 12,
                }}
                labelStyle={{ color: "oklch(0.97 0.006 85)" }}
                itemStyle={{ color: "oklch(0.86 0.17 96)" }}
              />
              <Area
                type="monotone"
                dataKey="commits"
                stroke="oklch(0.86 0.17 96)"
                strokeWidth={2}
                fill="url(#commitGradient)"
                animationDuration={1200}
              />
            </Chart>
          </ResponsiveContainer>
        );
      };
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-muted/50 rounded-none" />
    ),
  }
);

interface WeeklyActivityChartProps {
  data: WeeklyActivityPoint[];
}

export function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  return (
    <GlassCard className="p-6 sm:p-8 h-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mb-6"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
          Consistency
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Weekly Coding Activity
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          My coding consistency over the last 3 months.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ ...springSoft, delay: 0.1 }}
        className="h-[220px] sm:h-[260px]"
      >
        <AreaChart data={data} />
      </motion.div>
    </GlassCard>
  );
}
