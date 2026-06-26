import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import Footer from "@/components/modules/homepage/footer";
import { BlogListClient } from "@/components/modules/blog/blog-list-client";
import { BlogListJsonLd } from "@/components/modules/blog/blog-json-ld";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import { AnimatedThemeTogglerDemo } from "@/components/mode-toggle";
import {
  getAllPosts,
  getAllCategories,
  getAllTags,
  getFeaturedPost,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Tushar's Portfolio",
  description:
    "Articles on web development, Next.js, TypeScript, design, and full-stack engineering.",
  openGraph: {
    title: "Blog — Tushar's Portfolio",
    description:
      "Articles on web development, Next.js, TypeScript, design, and full-stack engineering.",
    url: "https://www.iktushar01.me/blogs",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782219446/ChatGPT_Image_May_17_2026_10_02_44_AM_ej3p2z.png",
        width: 1200,
        height: 630,
        alt: "Tushar's Blog",
      },
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();
  const featuredPost = await getFeaturedPost();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <BlogListJsonLd posts={posts} />

      <header className="sticky top-0 z-[60] border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to home</span>
          </Link>

          <Link
            href="/"
            className="inline-flex size-9 shrink-0 items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
            aria-label="Go to home"
          >
            <Image
              src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
              alt="Logo"
              width={120}
              height={80}
              className="h-5 w-auto sm:h-6 dark:brightness-110"
              priority
            />
          </Link>

          <AnimatedThemeTogglerDemo />
        </div>
      </header>

      <main className="flex-1 relative py-14 sm:py-20 lg:py-24 px-4 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader kicker="Writing" title="Blog" />
          <div className="mt-8 sm:mt-12">
            <BlogListClient
              posts={posts}
              categories={categories}
              tags={tags}
              featuredPost={featuredPost}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
