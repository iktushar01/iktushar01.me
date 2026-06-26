export const GITHUB_CACHE_REVALIDATE = 3600;

export function getGitHubUsername(): string {
  return process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "iktushar01";
}

export function getGitHubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function githubRestFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      ...getGitHubHeaders(),
      ...(init?.headers ?? {}),
    },
    next: { revalidate: GITHUB_CACHE_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`GitHub REST error ${response.status} for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function githubGraphqlFetch<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...getGitHubHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: GITHUB_CACHE_REVALIDATE },
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL error ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("GitHub GraphQL returned no data");
  }

  return json.data;
}
