export const GITHUB_CACHE_REVALIDATE = 3600;

/** Server-only username — never exposed to the client bundle. */
export function getGitHubUsername(): string {
  return (
    process.env.GITHUB_USERNAME ??
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ??
    "iktushar01"
  );
}

function getGitHubToken(): string | undefined {
  return process.env.GITHUB_TOKEN?.trim() || undefined;
}

export function hasGitHubToken(): boolean {
  return Boolean(getGitHubToken());
}

export function assertGitHubConfigured(): void {
  if (!getGitHubToken()) {
    throw new Error(
      "GITHUB_TOKEN is missing. Add it to .env.local (server-only, no NEXT_PUBLIC prefix)."
    );
  }
}

export function getGitHubHeaders(): HeadersInit {
  const token = getGitHubToken();
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
    const body = await response.text().catch(() => "");
    throw new Error(
      `GitHub REST error ${response.status} for ${path}${body ? `: ${body.slice(0, 120)}` : ""}`
    );
  }

  return response.json() as Promise<T>;
}

export async function githubGraphqlFetch<T>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  assertGitHubConfigured();

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
    const body = await response.text().catch(() => "");
    throw new Error(
      `GitHub GraphQL HTTP ${response.status}${body ? `: ${body.slice(0, 120)}` : ""}`
    );
  }

  const json = (await response.json()) as {
    data?: T;
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GitHub GraphQL request failed");
  }

  if (!json.data) {
    throw new Error("GitHub GraphQL returned no data");
  }

  return json.data;
}
