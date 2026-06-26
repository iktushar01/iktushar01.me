export const blogPostsData = [
    {
        id: "1",
        title: "Building Acadex: A Classroom-First Study Platform",
        slug: "building-acadex-classroom-platform",
        excerpt: "How we designed and shipped a full-stack academic platform in 36 hours — from problem discovery to a production-ready MVP.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782219446/ChatGPT_Image_May_17_2026_10_02_44_AM_ej3p2z.png",
        category: "Case Study",
        tags: ["Next.js", "EdTech", "Full-Stack", "Hackathon"],
        publishedAt: "2025-04-15",
        readingTime: 8,
        featured: true,
        author: "Tushar Islam",
        content: `## The Problem

Students today juggle academic life across WhatsApp groups, Google Drive folders, and handwritten notes. There is no single hub that respects classroom boundaries while keeping materials organized and motivating.

## Our Approach

We started with user interviews — five students and two teachers — to map pain points. The insight was clear: **people don't want another social network; they want a classroom**.

### Architecture Decisions

We chose Next.js App Router for its server-first rendering and clean API boundaries:

\`\`\`typescript
// app/api/classrooms/route.ts
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const classroom = await prisma.classroom.create({
    data: { name: body.name, teacherId: session.user.id },
  });

  return NextResponse.json(classroom);
}
\`\`\`

### Key Features

1. **Role-aware dashboards** — teachers manage, students participate
2. **Folder-based note organization** — subjects → folders → files
3. **Leaderboard gamification** — healthy competition per subject

## Lessons Learned

- Ship the core loop first: join class → upload note → see leaderboard
- Server Components dramatically reduced client bundle size
- Real users during the hackathon demo revealed UX gaps we fixed on the fly

## What's Next

Acadex continues to evolve with spaced repetition, quiz modes, and mobile-first refinements. The hackathon win validated the vision — now it's about sustainable growth.
`,
    },
    {
        id: "2",
        title: "React Server Components in Practice",
        slug: "react-server-components-in-practice",
        excerpt: "A practical guide to knowing when to reach for Server Components vs Client Components in Next.js App Router projects.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/one_uz50sw.png",
        category: "Tutorial",
        tags: ["React", "Next.js", "Performance"],
        publishedAt: "2025-03-02",
        readingTime: 6,
        featured: false,
        author: "Tushar Islam",
        content: `## Why Server Components Matter

React Server Components (RSC) let you fetch data and render on the server without shipping that logic to the client. For content-heavy pages, this means faster loads and smaller JavaScript bundles.

## The Mental Model

Ask one question: **does this component need browser APIs or interactivity?**

| Need | Use |
|------|-----|
| \`useState\`, \`useEffect\`, event handlers | Client Component |
| Data fetching, static layout, SEO content | Server Component |

## Example: Blog Post Page

\`\`\`tsx
// Server Component — no "use client"
import { getPostBySlug } from "@/lib/blog";
import { BlogContent } from "@/components/modules/blog/blog-content";

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <BlogContent content={post.content} />
    </article>
  );
}
\`\`\`

## Common Pitfalls

- Importing a Client Component into a Server Component is fine — but not the reverse without children composition
- Don't add \`"use client"\` at the root unless necessary
- Colocate interactive islands (search, modals) as small client boundaries

## Takeaway

Start server-first. Add \`"use client"\` only where interactivity demands it. Your users and Lighthouse scores will thank you.
`,
    },
    {
        id: "3",
        title: "Designing a Premium Portfolio with Tailwind CSS 4",
        slug: "premium-portfolio-tailwind-css-4",
        excerpt: "Thoughts on flat editorial design, OKLCH color tokens, and building a portfolio that feels intentional rather than templated.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/two_ozn9cp.png",
        category: "Design",
        tags: ["Tailwind CSS", "UI/UX", "Portfolio"],
        publishedAt: "2025-02-10",
        readingTime: 5,
        featured: false,
        author: "Tushar Islam",
        content: `## Less Is More

The best portfolios I've studied share one trait: **restraint**. Sharp corners, hairline borders, and generous whitespace signal confidence. Rounded cards and gradient overload often read as "template."

## OKLCH for Theming

Tailwind CSS 4 pairs beautifully with OKLCH variables:

\`\`\`css
:root {
  --primary: oklch(0.76 0.16 82);
  --background: oklch(0.98 0.005 80);
}

.dark {
  --primary: oklch(0.86 0.17 96);
  --background: oklch(0.13 0.012 85);
}
\`\`\`

OKLCH gives perceptually uniform lightness shifts — dark mode doesn't feel like an afterthought.

## Motion With Purpose

Framer Motion scroll reveals work when staggered subtly (\`delay: index * 0.05\`). Avoid animating everything; let content breathe.

## Typography Hierarchy

- Display font for headings (Space Grotesk)
- Sans for body (Inter)
- Mono for metadata labels

\`text-[10px] uppercase tracking-widest\` for kickers creates a editorial magazine feel.

## Final Thought

Your portfolio is a product. Treat typography, spacing, and motion as features — not decoration.
`,
    },
    {
        id: "4",
        title: "TypeScript Patterns for Full-Stack APIs",
        slug: "typescript-patterns-fullstack-apis",
        excerpt: "Shared types, Zod validation, and Prisma — patterns I use to keep frontend and backend contracts in sync.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/three_p83x25.png",
        category: "Tutorial",
        tags: ["TypeScript", "Node.js", "API"],
        publishedAt: "2025-01-20",
        readingTime: 7,
        featured: false,
        author: "Tushar Islam",
        content: `## Shared Contracts

The biggest source of bugs in full-stack apps is **schema drift** — the frontend expects a shape the API no longer returns.

## Pattern: Zod at the Boundary

\`\`\`typescript
import { z } from "zod";

export const createClassroomSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().optional(),
});

export type CreateClassroomInput = z.infer<typeof createClassroomSchema>;
\`\`\`

Validate on the server. Infer types for the client. One source of truth.

## Prisma + Type Safety

Prisma generates types from your schema. Combine with explicit DTOs for API responses to avoid leaking internal fields:

\`\`\`typescript
function toClassroomDTO(classroom: Classroom) {
  return {
    id: classroom.id,
    name: classroom.name,
    createdAt: classroom.createdAt.toISOString(),
  };
}
\`\`\`

## Error Handling

Return consistent error shapes:

\`\`\`json
{ "error": "Validation failed", "details": [{ "field": "name", "message": "Required" }] }
\`\`\`

Clients can display field-level errors without guessing.

## Summary

Invest in types at system boundaries. It pays off every time you refactor.
`,
    },
    {
        id: "5",
        title: "From Bootcamp to Production: My Developer Journey",
        slug: "bootcamp-to-production-journey",
        excerpt: "Reflections on learning web development through Programming Hero and shipping real projects that matter.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778464974/programingHero_avnspb.png",
        category: "Career",
        tags: ["Career", "Learning", "Web Development"],
        publishedAt: "2024-12-05",
        readingTime: 4,
        featured: false,
        author: "Tushar Islam",
        content: `## Starting Point

I began with zero programming background. The Programming Hero bootcamp gave structure — daily assignments, projects, and a community that kept me accountable.

## The Turning Point

Tutorials teach syntax. **Projects teach judgment.** Building Acadex forced me to make real tradeoffs: PostgreSQL vs MongoDB, auth strategies, deployment pipelines.

## Skills That Transferred

- Breaking problems into shippable slices
- Reading documentation instead of copying Stack Overflow
- Debugging systematically — reproduce, isolate, fix, verify

## Advice for Beginners

1. Build one project deeply instead of ten shallowly
2. Deploy early — production teaches things localhost never will
3. Write about what you learn (like this blog)

## Looking Forward

The journey from bootcamp graduate to production engineer is ongoing. Every shipped feature is another lesson. Keep building.
`,
    },
    {
        id: "6",
        title: "Optimizing Images in Next.js with Cloudinary",
        slug: "optimizing-images-nextjs-cloudinary",
        excerpt: "How I serve fast, responsive images across my portfolio using next/image and Cloudinary remote patterns.",
        coverImage: "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778465636/four_qsaher.png",
        category: "Tutorial",
        tags: ["Next.js", "Performance", "Cloudinary"],
        publishedAt: "2024-11-18",
        readingTime: 5,
        featured: false,
        author: "Tushar Islam",
        content: `## Why Image Optimization Matters

Images are often the largest assets on a portfolio. Unoptimized hero images can tank LCP scores and first impressions.

## next/image Basics

\`\`\`tsx
<Image
  src="https://res.cloudinary.com/.../hero.png"
  alt="Project screenshot"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  priority
/>
\`\`\`

The \`sizes\` prop is critical — it tells the browser which resolution to request.

## Cloudinary Remote Patterns

Configure \`next.config.ts\`:

\`\`\`typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "/dfoqasqnw/**",
    },
  ],
},
\`\`\`

## Tips

- Use \`priority\` only for above-the-fold images
- Prefer \`fill\` + aspect-ratio containers for responsive cards
- Cloudinary transforms (\`w_800,q_auto,f_auto\`) reduce payload further

## Result

Proper image strategy cut my portfolio LCP from ~3.2s to under 1.8s on mobile.
`,
    },
];
//# sourceMappingURL=blogs.js.map