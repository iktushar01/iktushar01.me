import type { BlogPost } from "@/types/portfolio";
import { formatBlogDate } from "@/lib/blog";

interface BlogJsonLdProps {
  post: BlogPost;
}

export function BlogJsonLd({ post }: BlogJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Person",
      name: post.author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.iktushar01.me/blogs/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BlogListJsonLdProps {
  posts: BlogPost[];
}

export function BlogListJsonLd({ posts }: BlogListJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tushar's Blog",
    description: "Articles on web development, design, and full-stack engineering.",
    url: "https://www.iktushar01.me/blogs",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://www.iktushar01.me/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      author: { "@type": "Person", name: post.author },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
