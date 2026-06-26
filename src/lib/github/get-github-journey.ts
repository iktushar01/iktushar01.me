import {
  deriveAchievements,
  fetchPublicEvents,
  mapEventsToActivityFeed,
  mapEventsToCommits,
} from "@/lib/github/github-api";
import { fetchGitHubJourneyGraphQL } from "@/lib/github/github-graphql";
import { getGitHubUsername } from "@/lib/github/cache";
import {
  flattenContributionDays,
  getContributionSummary,
  getMonthlyContributions,
  getMonthlySummary,
  getWeeklyActivity,
} from "@/lib/github/contribution-stats";
import { aggregateLanguages } from "@/lib/github/language-stats";
import type {
  GitHubJourneyData,
  ImpactMetrics,
  PinnedRepository,
} from "@/lib/github/types";

function mapPinnedRepos(
  nodes: NonNullable<
    Awaited<ReturnType<typeof fetchGitHubJourneyGraphQL>>["user"]
  >["pinnedItems"]["nodes"]
): PinnedRepository[] {
  return nodes.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.url,
    homepageUrl: repo.homepageUrl,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage?.name ?? null,
    languageColor: repo.primaryLanguage?.color ?? null,
    topics: repo.repositoryTopics.nodes.map((t) => t.topic.name),
    updatedAt: repo.pushedAt ?? repo.updatedAt,
  }));
}

export async function getGitHubJourneyData(): Promise<GitHubJourneyData> {
  const username = getGitHubUsername();

  const [graphql, events] = await Promise.all([
    fetchGitHubJourneyGraphQL(username),
    fetchPublicEvents(username).catch(() => [] as Awaited<ReturnType<typeof fetchPublicEvents>>),
  ]);

  if (!graphql.user) {
    throw new Error(`GitHub user "${username}" not found`);
  }

  const user = graphql.user;
  const collection = user.contributionsCollection;
  const calendar = collection.contributionCalendar;
  const contributionDays = flattenContributionDays(calendar.weeks);
  const contributionSummary = getContributionSummary(contributionDays);
  const monthlySummary = getMonthlySummary(contributionDays);

  const repoNodes = user.repositories.nodes;
  const totalStars = repoNodes.reduce((s, r) => s + r.stargazerCount, 0);
  const totalForks = repoNodes.reduce((s, r) => s + r.forkCount, 0);

  const languages = aggregateLanguages(repoNodes);
  const pinnedRepos = mapPinnedRepos(user.pinnedItems.nodes);

  const recentCommits = mapEventsToCommits(events, user.avatarUrl);
  const activityFeed = mapEventsToActivityFeed(events);

  const stats = {
    totalStars,
    totalForks,
    commitsThisYear: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issuesOpened: collection.totalIssueContributions,
    totalContributions: calendar.totalContributions,
  };

  const impactMetrics: ImpactMetrics = {
    totalRepositories: user.repositories.totalCount,
    totalStarsReceived: totalStars,
    totalForks,
    pullRequestsMerged: collection.totalPullRequestContributions,
    issuesResolved: collection.totalIssueContributions,
    openSourceContributions: calendar.totalContributions,
    longestStreak: contributionSummary.longestStreak,
  };

  const achievements = deriveAchievements(
    { ...stats, longestStreak: contributionSummary.longestStreak },
    {}
  );

  return {
    profile: {
      login: user.login,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      company: user.company,
      location: user.location,
      url: user.url,
      followers: user.followers.totalCount,
      following: user.following.totalCount,
      publicRepos: user.repositories.totalCount,
    },
    stats,
    contributionDays,
    weeklyActivity: getWeeklyActivity(contributionDays, 12),
    monthlyContributions: getMonthlyContributions(contributionDays),
    contributionSummary,
    monthlySummary,
    languages,
    pinnedRepos,
    recentCommits,
    achievements,
    impactMetrics,
    activityFeed,
  };
}
