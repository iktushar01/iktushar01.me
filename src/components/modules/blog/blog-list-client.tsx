"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

import type { BlogPost } from "@/components/data/blogs";
import { BlogCard } from "@/components/modules/blog/blog-card";
import { cn } from "@/lib/utils";

const POSTS_PER_PAGE = 6;

type SortOrder = "newest" | "oldest";

interface BlogListClientProps {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
  featuredPost?: BlogPost;
}

export function BlogListClient({
  posts,
  categories,
  tags,
  featuredPost,
}: BlogListClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sort, setSort] = useState<SortOrder>("newest");
  const [page, setPage] = useState(1);

  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      if (featuredPost && post.id === featuredPost.id) return false;

      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        category === "all" || post.category === category;

      const matchesTag =
        selectedTag === "all" || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime();
      const dateB = new Date(b.publishedAt).getTime();
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [posts, search, category, selectedTag, sort, featuredPost]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSelectedTag("all");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="space-y-10 sm:space-y-14">
      {featuredPost && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
            Featured Article
          </p>
          <div className="max-w-3xl">
            <BlogCard post={featuredPost} featured />
          </div>
        </div>
      )}

      <div className="space-y-4 border-y border-border py-6">
        <div className="relative">
          <FiSearch
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-transparent border border-border text-xs uppercase tracking-widest text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 bg-transparent border border-border text-xs uppercase tracking-widest text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Filter by tag"
          >
            <option value="all">All tags</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortOrder);
              setPage(1);
            }}
            className="px-3 py-2 bg-transparent border border-border text-xs uppercase tracking-widest text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Sort articles"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>

          {(search || category !== "all" || selectedTag !== "all") && (
            <button
              type="button"
              onClick={resetFilters}
              className="px-3 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {paginatedPosts.length === 0 ? (
        <div className="border border-dashed border-border py-16 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No articles match your filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-3 text-sm font-medium text-primary hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12">
          {paginatedPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={cn(
              "px-4 py-2 border border-border text-sm font-medium transition-colors",
              currentPage === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-muted"
            )}
          >
            Previous
          </button>
          <span className="text-xs font-mono text-muted-foreground px-3">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "px-4 py-2 border border-border text-sm font-medium transition-colors",
              currentPage === totalPages
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-muted"
            )}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
