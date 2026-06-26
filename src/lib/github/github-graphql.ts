import { githubGraphqlFetch } from "@/lib/github/cache";
import type { RecentCommit } from "@/lib/github/types";

const RECENT_COMMITS_SEARCH_QUERY = `
  query RecentCommitsSearch($query: String!) {
    search(query: $query, type: COMMIT, first: 20) {
      edges {
        node {
          ... on Commit {
            oid
            messageHeadline
            committedDate
            url
            author {
              avatarUrl
              user { avatarUrl }
            }
            repository {
              nameWithOwner
              url
              defaultBranchRef { name }
            }
          }
        }
      }
    }
  }
`;

const RECENT_COMMITS_REPOS_QUERY = `
  query RecentCommitsRepos($username: String!) {
    user(login: $username) {
      repositories(
        first: 12
        privacy: PUBLIC
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          nameWithOwner
          url
          defaultBranchRef {
            name
            target {
              ... on Commit {
                history(first: 5) {
                  nodes {
                    oid
                    messageHeadline
                    committedDate
                    url
                    author { avatarUrl }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface CommitSearchResponse {
  search: {
    edges: {
      node: {
        oid: string;
        messageHeadline: string;
        committedDate: string;
        url: string;
        author: {
          avatarUrl: string | null;
          user: { avatarUrl: string } | null;
        } | null;
        repository: {
          nameWithOwner: string;
          url: string;
          defaultBranchRef: { name: string } | null;
        };
      } | null;
    }[];
  };
}

interface CommitReposResponse {
  user: {
    repositories: {
      nodes: {
        nameWithOwner: string;
        url: string;
        defaultBranchRef: {
          name: string;
          target: {
            history: {
              nodes: {
                oid: string;
                messageHeadline: string;
                committedDate: string;
                url: string;
                author: { avatarUrl: string | null } | null;
              }[];
            };
          } | null;
        } | null;
      }[];
    };
  } | null;
}

function mapCommitNode(
  commit: {
    oid: string;
    messageHeadline: string;
    committedDate: string;
    author?: { avatarUrl: string | null; user?: { avatarUrl: string } | null } | null;
  },
  repo: { nameWithOwner: string; url: string; branch: string },
  fallbackAvatar: string
): RecentCommit {
  return {
    id: `${repo.nameWithOwner}-${commit.oid}`,
    message: commit.messageHeadline,
    repo: repo.nameWithOwner,
    repoUrl: repo.url,
    branch: repo.branch,
    sha: commit.oid,
    shaShort: commit.oid.slice(0, 7),
    timestamp: commit.committedDate,
    avatarUrl:
      commit.author?.user?.avatarUrl ??
      commit.author?.avatarUrl ??
      fallbackAvatar,
  };
}

export async function fetchRecentCommitsGraphQL(
  username: string,
  fallbackAvatar: string
): Promise<RecentCommit[]> {
  const commits: RecentCommit[] = [];
  const seen = new Set<string>();

  const addCommit = (commit: RecentCommit) => {
    if (seen.has(commit.sha)) return;
    seen.add(commit.sha);
    commits.push(commit);
  };

  try {
    const searchResult = await githubGraphqlFetch<CommitSearchResponse>(
      RECENT_COMMITS_SEARCH_QUERY,
      { query: `author:${username} sort:committer-date-desc` }
    );

    for (const edge of searchResult.search.edges) {
      const node = edge.node;
      if (!node?.repository) continue;

      addCommit(
        mapCommitNode(
          node,
          {
            nameWithOwner: node.repository.nameWithOwner,
            url: node.repository.url,
            branch: node.repository.defaultBranchRef?.name ?? "main",
          },
          fallbackAvatar
        )
      );
    }
  } catch {
    // Fall through to repository history
  }

  if (commits.length < 3) {
    try {
      const reposResult = await githubGraphqlFetch<CommitReposResponse>(
        RECENT_COMMITS_REPOS_QUERY,
        { username }
      );

      for (const repo of reposResult.user?.repositories.nodes ?? []) {
        const branch = repo.defaultBranchRef?.name ?? "main";
        const history = repo.defaultBranchRef?.target?.history?.nodes ?? [];

        for (const commit of history) {
          addCommit(
            mapCommitNode(
              commit,
              {
                nameWithOwner: repo.nameWithOwner,
                url: repo.url,
                branch,
              },
              fallbackAvatar
            )
          );
        }
      }
    } catch {
      // Return whatever we have
    }
  }

  return commits
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 20);
}

const GITHUB_JOURNEY_QUERY = `
  query GitHubJourney($username: String!) {
    user(login: $username) {
      name
      login
      bio
      avatarUrl
      company
      location
      url
      followers { totalCount }
      following { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalPullRequestReviewContributions
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
            updatedAt
            pushedAt
          }
        }
      }
      repositories(
        first: 100
        privacy: PUBLIC
        ownerAffiliations: OWNER
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          stargazerCount
          forkCount
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name color }
            }
          }
        }
      }
    }
  }
`;

export interface GraphQLJourneyResponse {
  user: {
    name: string | null;
    login: string;
    bio: string | null;
    avatarUrl: string;
    company: string | null;
    location: string | null;
    url: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: {
        name: string;
        stargazerCount: number;
        forkCount: number;
        languages: {
          edges: { size: number; node: { name: string; color: string | null } }[];
        };
      }[];
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
          }[];
        }[];
      };
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalIssueContributions: number;
      totalPullRequestReviewContributions: number;
    };
    pinnedItems: {
      nodes: {
        id: string;
        name: string;
        description: string | null;
        url: string;
        homepageUrl: string | null;
        stargazerCount: number;
        forkCount: number;
        primaryLanguage: { name: string; color: string } | null;
        repositoryTopics: { nodes: { topic: { name: string } }[] };
        updatedAt: string;
        pushedAt: string;
      }[];
    };
  } | null;
}

export async function fetchGitHubJourneyGraphQL(
  username: string
): Promise<GraphQLJourneyResponse> {
  return githubGraphqlFetch<GraphQLJourneyResponse>(GITHUB_JOURNEY_QUERY, {
    username,
  });
}
