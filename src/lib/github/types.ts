export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatarUrl: string;
  company: string | null;
  location: string | null;
  url: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  commitsThisYear: number;
  pullRequests: number;
  issuesOpened: number;
  totalContributions: number;
}

export interface ContributionDay {
  date: string;
  count: number;
}

export interface WeeklyActivityPoint {
  week: string;
  commits: number;
  label: string;
}

export interface MonthlyContribution {
  month: string;
  monthIndex: number;
  commits: number;
}

export interface ContributionSummary {
  thisYearContributions: number;
  averagePerWeek: number;
  mostActiveMonth: string;
  currentStreak: number;
  longestStreak: number;
}

export interface MonthlySummary {
  mostProductiveMonth: string;
  averageMonthlyCommits: number;
  yearlyGrowthPercent: number;
}

export interface LanguageStat {
  name: string;
  percentage: number;
  lines: number;
  color: string;
}

export interface PinnedRepository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  topics: string[];
  updatedAt: string;
}

export interface RecentCommit {
  id: string;
  message: string;
  repo: string;
  repoUrl: string;
  branch: string;
  sha: string;
  shaShort: string;
  timestamp: string;
  avatarUrl: string;
}

export interface GitHubAchievement {
  id: string;
  icon: string;
  name: string;
  description: string;
  earnedDate: string;
}

export interface ImpactMetrics {
  totalRepositories: number;
  totalStarsReceived: number;
  totalForks: number;
  pullRequestsMerged: number;
  issuesResolved: number;
  openSourceContributions: number;
  longestStreak: number;
}

export type ActivityFeedType =
  | "push"
  | "create"
  | "pull_request"
  | "watch"
  | "release"
  | "issue";

export interface ActivityFeedItem {
  id: string;
  type: ActivityFeedType;
  message: string;
  timestamp: string;
  url?: string;
}

export interface GitHubJourneyData {
  profile: GitHubProfile;
  stats: GitHubStats;
  contributionDays: ContributionDay[];
  contributionWeeks: ContributionDay[][];
  weeklyActivity: WeeklyActivityPoint[];
  monthlyContributions: MonthlyContribution[];
  contributionSummary: ContributionSummary;
  monthlySummary: MonthlySummary;
  languages: LanguageStat[];
  pinnedRepos: PinnedRepository[];
  recentCommits: RecentCommit[];
  achievements: GitHubAchievement[];
  impactMetrics: ImpactMetrics;
  activityFeed: ActivityFeedItem[];
}
