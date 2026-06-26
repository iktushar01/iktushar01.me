"use client";

import { GitHubHero } from "@/components/github/github-hero";
import { GitHubCalendarSection } from "@/components/github/github-calendar";
import { WeeklyActivityChart } from "@/components/github/weekly-activity-chart";
import { MonthlyContributions } from "@/components/github/monthly-contributions";
import { TopLanguages } from "@/components/github/top-languages";
import { PinnedRepositories } from "@/components/github/pinned-repositories";
import { RecentCommits } from "@/components/github/recent-commits";
import { Achievements } from "@/components/github/achievements";
import { OpenSourceImpact } from "@/components/github/open-source-impact";
import { ActivityFeed } from "@/components/github/activity-feed";
import type { GitHubJourneyData } from "@/lib/github/types";

interface GitHubJourneyContentProps {
  data: GitHubJourneyData;
}

export function GitHubJourneyContent({ data }: GitHubJourneyContentProps) {
  return (
    <div className="space-y-10 sm:space-y-14 lg:space-y-16">
      <GitHubHero data={{ profile: data.profile, stats: data.stats }} />

      <GitHubCalendarSection
        totalContributions={data.stats.totalContributions}
        summary={data.contributionSummary}
        weeks={data.contributionWeeks}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <WeeklyActivityChart data={data.weeklyActivity} />
        <MonthlyContributions
          data={data.monthlyContributions}
          summary={data.monthlySummary}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <TopLanguages languages={data.languages} />
        <RecentCommits commits={data.recentCommits} />
      </div>

      <PinnedRepositories repos={data.pinnedRepos} />

      <Achievements achievements={data.achievements} />

      <OpenSourceImpact metrics={data.impactMetrics} />

      <ActivityFeed items={data.activityFeed} />
    </div>
  );
}
