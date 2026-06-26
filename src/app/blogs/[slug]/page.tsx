import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import Footer from "@/components/modules/homepage/footer";
import { BlogContent } from "@/components/modules/blog/blog-content";
import { BlogToc } from "@/components/modules/blog/blog-toc";
import { BlogCard } from "@/components/modules/blog/blog-card";
import { BlogJsonLd } from "@/components/modules/blog/blog-json-ld";
import { ShareButtons } from "@/components/modules/blog/share-buttons";
import { AnimatedThemeTogglerDemo } from "@/components/mode-toggle";
import {
  extractHeadings,
  formatBlogDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `https://www.iktushar01.me/blogs/${post.slug}`;

  return {
    title: `${post.title} — Tushar's Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const relatedPosts = await getRelatedPosts(slug, 3);
  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <BlogJsonLd post={post} />

      <header className="sticky top-0 z-[60] border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">All articles</span>
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

      <main className="flex-1">
        <article>
          <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] border-b border-border bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              <div className="lg:col-span-8">
                <header className="mb-8 sm:mb-10">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-medium">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground/40">·</span>
                    <time
                      dateTime={post.publishedAt}
                      className="text-[10px] uppercase tracking-widest text-muted-foreground/70"
                    >
                      {formatBlogDate(post.publishedAt)}
                    </time>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground/70">
                      <Clock className="size-3" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter text-foreground">
                    {post.title}
                  </h1>

                  <p className="mt-4 text-sm text-muted-foreground">
                    By{" "}
                    <span className="font-medium text-foreground">
                      {post.author}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <ShareButtons title={post.title} slug={post.slug} />
                  </div>
                </header>

                <BlogContent content={post.content} />
              </div>

              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-24 space-y-8">
                  <BlogToc headings={headings} />
                </div>
              </aside>
            </div>
          </div>
        </article>

        {(prev || next) && (
          <nav
            aria-label="Article navigation"
            className="border-t border-border"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  href={`/blogs/${prev.slug}`}
                  className="group border border-border p-5 hover:bg-muted transition-colors duration-200"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 flex items-center gap-1">
                    <ArrowLeft className="size-3" /> Previous
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/blogs/${next.slug}`}
                  className="group border border-border p-5 hover:bg-muted transition-colors duration-200 sm:text-right"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2 flex items-center gap-1 sm:justify-end">
                    Next <ArrowRight className="size-3" />
                  </p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}

        {relatedPosts.length > 0 && (
          <section className="border-t border-border py-14 sm:py-20 px-4 sm:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-6">
                Related Articles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {relatedPosts.map((related, index) => (
                  <BlogCard key={related.id} post={related} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
