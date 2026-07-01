import { apiFetch, safeApiFetch } from "@/lib/api/client";
import { hasOptionalUrl } from "@/lib/utils";
import type {
  Activity,
  BlogPost,
  Certificate,
  Project,
} from "@/types/portfolio";

function normalizeOptionalUrl(value?: string | null): string | null {
  return hasOptionalUrl(value) ? value!.trim() : null;
}

function normalizeProject(project: Project): Project {
  return {
    ...project,
    liveLink: normalizeOptionalUrl(project.liveLink),
    frontendLink: normalizeOptionalUrl(project.frontendLink),
    backendLink: normalizeOptionalUrl(project.backendLink),
    demoVideoLink: normalizeOptionalUrl(project.demoVideoLink),
  };
}

export async function fetchProjects(limit?: number): Promise<Project[]> {
  const query = limit ? `?limit=${limit}&sortBy=sortOrder&sortOrder=asc` : "?sortBy=sortOrder&sortOrder=asc";
  const res = await safeApiFetch<Project[]>(`/projects${query}`);
  const projects = (res.data || []).map(normalizeProject);
  return limit ? projects.slice(0, limit) : projects;
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const res = await safeApiFetch<Certificate[]>("/certificates?sortBy=sortOrder&sortOrder=asc");
  return res.data || [];
}

export async function fetchActivities(): Promise<Activity[]> {
  const res = await safeApiFetch<Activity[]>("/activities?sortBy=sortOrder&sortOrder=asc");
  return (res.data || []).map((activity) => ({
    ...activity,
    id: activity.slug || activity.id,
  }));
}

export async function fetchBlogPosts(limit?: number): Promise<BlogPost[]> {
  const query = limit ? `?limit=${limit}` : "";
  const res = await safeApiFetch<BlogPost[]>(`/blogs${query}`);
  return res.data || [];
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  const res = await safeApiFetch<BlogPost>(`/blogs/slug/${slug}`);
  return res.data || null;
}
