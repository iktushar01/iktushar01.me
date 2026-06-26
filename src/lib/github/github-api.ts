import { githubRestFetch } from "@/lib/github/cache";
import type {
  ActivityFeedItem,
  RecentCommit,
} from "@/lib/github/types";

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string; url: string };
  actor: { avatar_url: string };
  payload: {
    ref?: string;
    commits?: { sha: string; message: string }[];
    action?: string;
    release?: { tag_name: string; name: string };
    pull_request?: { title: string; html_url: string };
  };
}

export async function fetchPublicEvents(
  username: string,
  page = 1
): Promise<GitHubEvent[]> {
  return githubRestFetch<GitHubEvent[]>(
    `/users/${username}/events/public?per_page=30&page=${page}`
  );
}

export function mapEventsToCommits(
  events: GitHubEvent[],
  avatarUrl: string
): RecentCommit[] {
  const commits: RecentCommit[] = [];

  for (const event of events) {
    if (event.type !== "PushEvent" || !event.payload.commits?.length) continue;

    for (const commit of event.payload.commits.slice(0, 3)) {
      commits.push({
        id: `${event.id}-${commit.sha}`,
        message: commit.message.split("\n")[0],
        repo: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        branch: event.payload.ref?.replace("refs/heads/", "") ?? "main",
        sha: commit.sha,
        shaShort: commit.sha.slice(0, 7),
        timestamp: event.created_at,
        avatarUrl,
      });
    }
  }

  return commits.slice(0, 20);
}

export function mapEventsToActivityFeed(
  events: GitHubEvent[]
): ActivityFeedItem[] {
  const items: ActivityFeedItem[] = [];

  for (const event of events) {
    const repo = event.repo.name;

    switch (event.type) {
      case "PushEvent": {
        const count = event.payload.commits?.length ?? 0;
        if (count === 0) break;
        items.push({
          id: event.id,
          type: "push",
          message: `Pushed ${count} commit${count > 1 ? "s" : ""} to ${repo.split("/")[1]}`,
          timestamp: event.created_at,
          url: `https://github.com/${repo}`,
        });
        break;
      }
      case "CreateEvent":
        if (event.payload.ref === "refs/heads/main" || !event.payload.ref) {
          items.push({
            id: event.id,
            type: "create",
            message: `Created repository ${repo.split("/")[1]}`,
            timestamp: event.created_at,
            url: `https://github.com/${repo}`,
          });
        }
        break;
      case "PullRequestEvent":
        items.push({
          id: event.id,
          type: "pull_request",
          message: `${event.payload.action ?? "Opened"} pull request on ${repo.split("/")[1]}`,
          timestamp: event.created_at,
          url: event.payload.pull_request?.html_url,
        });
        break;
      case "WatchEvent":
        items.push({
          id: event.id,
          type: "watch",
          message: `Starred ${repo.split("/")[1]}`,
          timestamp: event.created_at,
          url: `https://github.com/${repo}`,
        });
        break;
      case "ReleaseEvent":
        items.push({
          id: event.id,
          type: "release",
          message: `Released ${event.payload.release?.tag_name ?? "a new version"} on ${repo.split("/")[1]}`,
          timestamp: event.created_at,
          url: `https://github.com/${repo}/releases`,
        });
        break;
      case "IssuesEvent":
        items.push({
          id: event.id,
          type: "issue",
          message: `${event.payload.action ?? "Opened"} issue on ${repo.split("/")[1]}`,
          timestamp: event.created_at,
          url: `https://github.com/${repo}/issues`,
        });
        break;
      default:
        break;
    }
  }

  return items.slice(0, 30);
}

export function deriveAchievements(
  stats: {
    pullRequests: number;
    totalStars: number;
    totalContributions: number;
    commitsThisYear: number;
    longestStreak: number;
  },
  profile: { created_at?: string }
): import("@/lib/github/types").GitHubAchievement[] {
  const achievements: import("@/lib/github/types").GitHubAchievement[] = [];
  const baseDate = profile.created_at ?? new Date().toISOString();

  if (stats.pullRequests >= 5) {
    achievements.push({
      id: "pull-shark",
      icon: "🏆",
      name: "Pull Shark",
      description: "Merged multiple pull requests across open source projects.",
      earnedDate: baseDate,
    });
  }

  if (stats.totalStars >= 10) {
    achievements.push({
      id: "starstruck",
      icon: "⭐",
      name: "Starstruck",
      description: "Repositories earned significant community stars.",
      earnedDate: baseDate,
    });
  }

  if (stats.commitsThisYear >= 100) {
    achievements.push({
      id: "quickdraw",
      icon: "🚀",
      name: "Quickdraw",
      description: "Consistent rapid contributions throughout the year.",
      earnedDate: new Date().toISOString(),
    });
  }

  if (stats.totalContributions >= 500) {
    achievements.push({
      id: "yolo",
      icon: "🔥",
      name: "YOLO",
      description: "Bold shipper with hundreds of contributions on the graph.",
      earnedDate: baseDate,
    });
  }

  if (stats.longestStreak >= 14) {
    achievements.push({
      id: "streak-master",
      icon: "🦈",
      name: "Streak Master",
      description: `Maintained a ${stats.longestStreak}-day contribution streak.`,
      earnedDate: new Date().toISOString(),
    });
  }

  if (achievements.length === 0) {
    achievements.push({
      id: "open-source",
      icon: "💻",
      name: "Open Source Contributor",
      description: "Building in public on GitHub.",
      earnedDate: baseDate,
    });
  }

  return achievements;
}
