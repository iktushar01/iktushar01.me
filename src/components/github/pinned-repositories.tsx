"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GitFork,
  Star,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { GlassCard } from "@/components/github/glass-card";
import type { PinnedRepository } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

interface PinnedRepositoriesProps {
  repos: PinnedRepository[];
}

export function PinnedRepositories({ repos }: PinnedRepositoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
    scrollRef.current.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !scrollRef.current) return;
      const dx = e.clientX - dragStart.current.x;
      scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const onPointerUp = useCallback(() => setIsDragging(false), []);

  if (repos.length === 0) {
    return (
      <GlassCard className="p-8 text-center" hover={false}>
        <p className="text-sm text-muted-foreground">No pinned repositories.</p>
      </GlassCard>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="flex items-end justify-between mb-6"
      >
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
            Repositories
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            Pinned Repositories
          </h3>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-2 border border-border hover:bg-muted transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-2 border border-border hover:bg-muted transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </motion.div>

      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className={cn(
          "flex gap-4 sm:gap-6 overflow-x-auto lp-scrollbar pb-2 snap-x snap-mandatory",
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {repos.map((repo, i) => (
          <motion.div
            key={repo.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: i * 0.06 }}
            className="snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[280px]"
          >
            <GlassCard className="p-5 h-full flex flex-col" delay={i * 0.04}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {repo.name}
                </h4>
                <FaGithub className="size-4 text-muted-foreground shrink-0" />
              </div>

              {repo.description && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
                  {repo.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3.5" />
                  {repo.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {repo.forks}
                </span>
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-2 rounded-full"
                      style={{ background: repo.languageColor ?? "#888" }}
                    />
                    {repo.language}
                  </span>
                )}
              </div>

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="text-[10px] font-mono border border-border px-2 py-0.5 text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-4">
                Updated {timeAgo(repo.updatedAt)}
              </p>

              <div className="flex gap-2 mt-auto">
                <Link
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border border-border hover:bg-muted transition-colors"
                >
                  <FaGithub className="size-3.5" />
                  GitHub
                </Link>
                {repo.homepageUrl && (
                  <Link
                    href={repo.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="size-3.5" />
                    Live Demo
                  </Link>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
