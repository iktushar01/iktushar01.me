import type { ApiResponse } from "@/types/portfolio";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function getApiBaseUrl() {
  return API_BASE;
}

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { auth = false, headers, cache, ...rest } = options;
  const isServer = typeof window === "undefined";

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    credentials: auth ? "include" : rest.credentials,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...(isServer
      ? { next: auth ? { revalidate: 0 } : { revalidate: 60 } }
      : { cache: cache ?? (auth ? "no-store" : "default") }),
  });

  const json = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(json.message || "API request failed");
  }

  return json;
}

export async function safeApiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    return await apiFetch<T>(path, options);
  } catch {
    return { success: false, data: undefined };
  }
}

export async function apiUpload(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload/image`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const json = (await response.json()) as ApiResponse<{ url: string }>;

  if (!response.ok || !json.data?.url) {
    throw new Error(json.message || "Upload failed");
  }

  return json.data.url;
}
