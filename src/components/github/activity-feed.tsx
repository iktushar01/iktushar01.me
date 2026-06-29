"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitCommit,
  GitPullRequest,
  Package,
  Rocket,
  Star,
} from "lucide-react";

import { GlassCard } from "@/components/github/glass-card";
import type { ActivityFeedItem, ActivityFeedType } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

const INITIAL_COUNT = 8;

const FEED_ICONS: Record<ActivityFeedType, React.ReactNode> = {
  push: <GitCommit className="size-4" />,
  create: <Package className="size-4" />,
  pull_request: <GitPullRequest className="size-4" />,
  watch: <Star className="size-4" />,
  release: <Rocket className="size-4" />,
  issue: <GitPullRequest className="size-4" />,
};

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

interface ActivityFeedProps {
  items: ActivityFeedItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const displayed = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <GlassCard className="p-6 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mb-6"
      >
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
          Live Feed
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Recent Activity
        </h3>
      </motion.div>

      {items.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border">
          <p className="text-sm text-muted-foreground">
            No recent public activity yet.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2">
            Push commits or open pull requests on GitHub to populate this feed.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {displayed.map((item, i) => {
            const content = (
              <div className="flex items-start gap-3 p-3 border border-border/40 bg-background/30 hover:bg-muted/30 transition-colors">
                <span
                  className={cn(
                    "flex items-center justify-center size-8 shrink-0 border border-border/50 text-primary"
                  )}
                >
                  {FEED_ICONS[item.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground leading-snug">
                    {item.message}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mt-1">
                    {timeAgo(item.timestamp)}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: i * 0.03 }}
              >
                {item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </motion.li>
            );
          })}
        </ul>
      )}

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + INITIAL_COUNT)}
          className="mt-6 w-full py-2.5 text-sm font-medium border border-border hover:bg-muted transition-colors"
        >
          Load more activity
        </button>
      )}
    </GlassCard>
  );
}
