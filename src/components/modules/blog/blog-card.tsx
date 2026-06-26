"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock } from "react-icons/fi";

import type { BlogPost } from "@/types/portfolio";
import { formatBlogDate } from "@/lib/blog";
import { springSoft } from "@/lib/motion";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay: index * 0.05 }}
      className="group flex flex-col h-full"
    >
      <Link
        href={`/blogs/${post.slug}`}
        data-cursor-hover
        className="relative aspect-[16/10] border border-border bg-muted overflow-hidden block"
      >
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {featured && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-widest font-medium border bg-primary/15 text-primary border-primary/30">
            Featured
          </span>
        )}
      </Link>

      <div className="pt-4 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
            {post.category}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
            {formatBlogDate(post.publishedAt)}
          </span>
          <span className="text-muted-foreground/40">·</span>
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground/70">
            <FiClock size={10} />
            {post.readingTime} min
          </span>
        </div>

        <Link href={`/blogs/${post.slug}`}>
          <h3
            className={`font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 ${
              featured ? "text-xl sm:text-2xl" : "text-sm sm:text-base"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p
          className={`text-muted-foreground leading-relaxed mt-2 flex-1 ${
            featured ? "text-sm sm:text-base line-clamp-3" : "text-sm line-clamp-2"
          }`}
        >
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-muted-foreground/80 border border-border px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blogs/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors duration-200"
        >
          Read More <FiArrowUpRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
