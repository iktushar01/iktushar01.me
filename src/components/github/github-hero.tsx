"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Download,
  ExternalLink,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MapPin,
  Star,
  Users,
} from "lucide-react";

import { AnimatedCounter } from "@/components/github/animated-counter";
import { GlassCard } from "@/components/github/glass-card";
import type { GitHubJourneyData } from "@/lib/github/types";
import { springSoft } from "@/lib/motion";

interface GitHubHeroProps {
  data: Pick<GitHubJourneyData, "profile" | "stats">;
}

const statItems = (
  data: GitHubHeroProps["data"]
): { label: string; value: number; icon: React.ReactNode }[] => [
  { label: "Followers", value: data.profile.followers, icon: <Users className="size-3.5" /> },
  { label: "Following", value: data.profile.following, icon: <Users className="size-3.5" /> },
  { label: "Repositories", value: data.profile.publicRepos, icon: <GitBranch className="size-3.5" /> },
  { label: "Stars Earned", value: data.stats.totalStars, icon: <Star className="size-3.5" /> },
  { label: "Commits (Year)", value: data.stats.commitsThisYear, icon: <GitCommit className="size-3.5" /> },
  { label: "Pull Requests", value: data.stats.pullRequests, icon: <GitPullRequest className="size-3.5" /> },
  { label: "Issues Opened", value: data.stats.issuesOpened, icon: <GitPullRequest className="size-3.5" /> },
  { label: "Contributions", value: data.stats.totalContributions, icon: <GitCommit className="size-3.5" /> },
];

export function GitHubHero({ data }: GitHubHeroProps) {
  const { profile, stats } = data;
  const stats_grid = statItems({ profile, stats });

  return (
    <GlassCard className="p-6 sm:p-8 lg:p-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-64 rounded-full blur-[100px] opacity-30"
        style={{ background: "oklch(0.86 0.17 96 / 0.25)" }}
      />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={springSoft}
          className="shrink-0"
        >
          <div className="relative size-24 sm:size-28 border-2 border-primary/30 p-1 bg-card/80 backdrop-blur-sm">
            <Image
              src={profile.avatarUrl}
              alt={profile.name ?? profile.login}
              width={112}
              height={112}
              className="size-full object-cover"
              priority
            />
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springSoft, delay: 0.05 }}
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {profile.name ?? profile.login}
            </h3>
            <p className="text-sm font-mono text-muted-foreground mt-1">
              @{profile.login}
            </p>
            {profile.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-2xl">
                {profile.bio}
              </p>
            )}
            <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
              {profile.company && (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary" />
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  {profile.location}
                </span>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {stats_grid.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: 0.08 + i * 0.04 }}
                className="p-3 sm:p-4 border border-border/50 bg-background/40 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  {item.icon}
                  <span className="text-[10px] uppercase tracking-widest">
                    {item.label}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-foreground tabular-nums">
                  <AnimatedCounter value={item.value} />
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="size-4" />
              View GitHub Profile
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
