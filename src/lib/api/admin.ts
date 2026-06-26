import { apiFetch, getApiBaseUrl } from "@/lib/api/client";
import type {
  Activity,
  BlogPost,
  Certificate,
  Project,
} from "@/types/portfolio";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export async function loginAdmin(email: string, password: string) {
  return apiFetch<{ user: AuthUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    auth: true,
    cache: "no-store",
  });
}

export async function getMe() {
  return apiFetch<AuthUser>("/auth/me", {
    auth: true,
    cache: "no-store",
  });
}

export async function logoutAdmin() {
  return apiFetch("/auth/logout", {
    method: "POST",
    auth: true,
    cache: "no-store",
  });
}

export async function getDashboardStats() {
  return apiFetch<{
    portfolioSummary: {
      projects: { total: number; published: number };
      certificates: number;
      activities: number;
      blogs: { total: number; published: number; drafts: number };
    };
  }>("/admins/stats", { auth: true, cache: "no-store" });
}

export async function adminFetchProjects() {
  return apiFetch<Project[]>("/projects/admin/all?limit=100&sortBy=sortOrder&sortOrder=asc", {
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchProject(id: string) {
  return apiFetch<Project>(`/projects/admin/${id}`, {
    auth: true,
    cache: "no-store",
  });
}

export async function adminSaveProject(id: string | null, data: Partial<Project>) {
  if (id) {
    return apiFetch<Project>(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      auth: true,
      cache: "no-store",
    });
  }

  return apiFetch<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
    cache: "no-store",
  });
}

export async function adminDeleteProject(id: string) {
  return apiFetch(`/projects/${id}`, {
    method: "DELETE",
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchCertificates() {
  return apiFetch<Certificate[]>("/certificates/admin/all?limit=100&sortBy=sortOrder&sortOrder=asc", {
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchCertificate(id: string) {
  return apiFetch<Certificate>(`/certificates/admin/${id}`, {
    auth: true,
    cache: "no-store",
  });
}

export async function adminSaveCertificate(id: string | null, data: Partial<Certificate>) {
  if (id) {
    return apiFetch<Certificate>(`/certificates/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      auth: true,
      cache: "no-store",
    });
  }

  return apiFetch<Certificate>("/certificates", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
    cache: "no-store",
  });
}

export async function adminDeleteCertificate(id: string) {
  return apiFetch(`/certificates/${id}`, {
    method: "DELETE",
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchActivities() {
  return apiFetch<Activity[]>("/activities/admin/all?limit=100&sortBy=sortOrder&sortOrder=asc", {
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchActivity(slug: string) {
  return apiFetch<Activity>(`/activities/admin/${slug}`, {
    auth: true,
    cache: "no-store",
  });
}

export async function adminSaveActivity(slug: string | null, data: Partial<Activity>) {
  if (slug) {
    return apiFetch<Activity>(`/activities/${slug}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      auth: true,
      cache: "no-store",
    });
  }

  return apiFetch<Activity>("/activities", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
    cache: "no-store",
  });
}

export async function adminDeleteActivity(slug: string) {
  return apiFetch(`/activities/${slug}`, {
    method: "DELETE",
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchBlogs() {
  return apiFetch<BlogPost[]>("/blogs/admin/all?limit=100&sortBy=publishedAt&sortOrder=desc", {
    auth: true,
    cache: "no-store",
  });
}

export async function adminFetchBlog(id: string) {
  return apiFetch<BlogPost>(`/blogs/admin/${id}`, {
    auth: true,
    cache: "no-store",
  });
}

export async function adminSaveBlog(id: string | null, data: Partial<BlogPost>) {
  if (id) {
    return apiFetch<BlogPost>(`/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      auth: true,
      cache: "no-store",
    });
  }

  return apiFetch<BlogPost>("/blogs", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
    cache: "no-store",
  });
}

export async function adminDeleteBlog(id: string) {
  return apiFetch(`/blogs/${id}`, {
    method: "DELETE",
    auth: true,
    cache: "no-store",
  });
}

export { getApiBaseUrl };
