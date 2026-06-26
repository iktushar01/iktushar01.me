import type { BlogPost } from "@/types/portfolio";
import { fetchBlogBySlug, fetchBlogPosts } from "@/lib/api/portfolio";

export type { BlogPost };

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await fetchBlogPosts();
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  return getAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = await fetchBlogBySlug(slug);
  return post ?? undefined;
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured);
}

export async function getLatestPosts(limit = 4): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const current = posts.find((post) => post.slug === slug);

  if (!current) {
    return posts.filter((p) => p.slug !== slug).slice(0, limit);
  }

  return posts
    .filter(
      (post) =>
        post.slug !== slug &&
        (post.category === current.category ||
          post.tags.some((tag) => current.tags.includes(tag)))
    )
    .slice(0, limit);
}

export async function getAdjacentPosts(slug: string): Promise<{
  prev: BlogPost | null;
  next: BlogPost | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.category))].sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort();
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/#+\s*$/, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
