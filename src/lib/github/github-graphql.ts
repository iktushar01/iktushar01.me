import { githubGraphqlFetch } from "@/lib/github/cache";

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
      repositories(privacy: PUBLIC) { totalCount }
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
