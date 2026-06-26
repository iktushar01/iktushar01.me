"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import type { BlogPost } from "@/components/data/blogs";
import { BlogCard } from "@/components/modules/blog/blog-card";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import { springSoft } from "@/lib/motion";

interface LatestBlogsProps {
  posts: BlogPost[];
  limit?: number;
}

export default function LatestBlogs({ posts, limit = 4 }: LatestBlogsProps) {
  const displayed = posts.slice(0, limit);

  if (displayed.length === 0) {
    return (
      <section
        id="blogs"
        className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16"
      >
        <SectionHeader kicker="Writing" title="Latest Blogs" />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSoft}
          className="mt-8 sm:mt-12 border border-dashed border-border py-16 px-6 text-center"
        >
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
            No posts yet
          </p>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Blog posts coming soon
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Articles on development, design, and career growth will appear here.
          </p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      id="blogs"
      className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16"
    >
      <SectionHeader kicker="Writing" title="Latest Blogs" />

      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {displayed.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>

      <div className="mt-10 sm:mt-14 flex justify-center">
        <Link
          href="/blogs"
          className="group inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
        >
          View all articles
          <FiArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
