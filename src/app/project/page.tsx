import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Projects from "@/components/modules/homepage/projects";
import Footer from "@/components/modules/homepage/footer";
import { AnimatedThemeTogglerDemo } from "@/components/mode-toggle";
import { fetchProjects } from "@/lib/api/portfolio";

export const metadata: Metadata = {
  title: "Projects — Tushar's Portfolio",
  description: "All projects by Tushar — full-stack developer.",
};

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
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

      <main className="flex-1">
        <Projects projects={projects} kicker="All work" title="All Projects" />
      </main>

      <Footer />
    </div>
  );
}
