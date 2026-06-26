import GithubSlugger from "github-slugger";

import { blogPostsData, type BlogPost } from "@/components/data/blogs";

export function getAllPosts(): BlogPost[] {
  return [...blogPostsData].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts();
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((post) => post.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return getAllPosts().find((post) => post.featured);
}

export function getLatestPosts(limit = 4): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return getLatestPosts(limit).filter((p) => p.slug !== slug);

  return getAllPosts()
    .filter(
      (post) =>
        post.slug !== slug &&
        (post.category === current.category ||
          post.tags.some((tag) => current.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getAllCategories(): string[] {
  return [...new Set(blogPostsData.map((post) => post.category))].sort();
}

export function getAllTags(): string[] {
  return [
    ...new Set(blogPostsData.flatMap((post) => post.tags)),
  ].sort();
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].replace(/#+\s*$/, "").trim();
    headings.push({
      id: slugger.slug(text),
      text,
      level,
    });
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
