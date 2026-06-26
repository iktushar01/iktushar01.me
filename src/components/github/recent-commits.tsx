"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCommit } from "lucide-react";

import { GlassCard } from "@/components/github/glass-card";
import type { RecentCommit } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

const INITIAL_COUNT = 6;

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
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

interface RecentCommitsProps {
  commits: RecentCommit[];
}

export function RecentCommits({ commits }: RecentCommitsProps) {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const displayed = commits.slice(0, visible);
  const hasMore = visible < commits.length;

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
          Activity
        </p>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Recent Commits
        </h3>
      </motion.div>

      {commits.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No recent commits found.
        </p>
      ) : (
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[11px] top-3 bottom-3 w-px bg-border"
          />

          <ul className="space-y-6">
            {displayed.map((commit, i) => (
              <motion.li
                key={commit.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: i * 0.04 }}
                className="relative pl-8"
              >
                <span className="absolute left-0 top-1.5 size-[22px] rounded-full border-2 border-primary bg-background flex items-center justify-center">
                  <GitCommit className="size-3 text-primary" />
                </span>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground leading-snug truncate">
                      {commit.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Repo:{" "}
                      <Link
                        href={commit.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {commit.repo.split("/")[1]}
                      </Link>
                      {" · "}
                      branch <span className="font-mono">{commit.branch}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Image
                      src={commit.avatarUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="size-5 rounded-full"
                    />
                    <Link
                      href={`${commit.repoUrl}/commit/${commit.sha}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      {commit.shaShort}
                    </Link>
                    <span className="text-[10px] text-muted-foreground/70">
                      {timeAgo(commit.timestamp)}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + INITIAL_COUNT)}
              className="mt-8 w-full py-2.5 text-sm font-medium border border-border hover:bg-muted transition-colors"
            >
              Load more commits
            </button>
          )}
        </div>
      )}
    </GlassCard>
  );
}
