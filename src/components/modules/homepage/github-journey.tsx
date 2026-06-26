import { Suspense } from "react";
import { AlertCircle } from "lucide-react";

import {
  GitHubErrorBoundary,
  GitHubJourneyContent,
  GitHubJourneySkeleton,
  GlassCard,
} from "@/components/github";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import { getGitHubUsername } from "@/lib/github/cache";
import { getGitHubJourneyData } from "@/lib/github/get-github-journey";

async function GitHubJourneyData() {
  try {
    const data = await getGitHubJourneyData();
    const username = getGitHubUsername();
    return <GitHubJourneyContent data={data} username={username} />;
  } catch {
    return (
      <GlassCard className="p-8 text-center" hover={false}>
        <AlertCircle className="size-8 mx-auto text-muted-foreground mb-3" />
        <p className="text-sm font-medium text-foreground mb-1">
          Unable to load GitHub data
        </p>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          Verify NEXT_PUBLIC_GITHUB_USERNAME and GITHUB_TOKEN in your environment.
        </p>
      </GlassCard>
    );
  }
}

export default function GitHubJourney() {
  return (
    <section
      id="github"
      className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lp-dots opacity-[0.35]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] opacity-20"
        style={{ background: "oklch(0.86 0.17 96 / 0.3)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          kicker="Open Source"
          title="GitHub Activity & Journey"
        />

        <GitHubErrorBoundary>
          <Suspense fallback={<GitHubJourneySkeleton />}>
            <div className="mt-8 sm:mt-12">
              <GitHubJourneyData />
            </div>
          </Suspense>
        </GitHubErrorBoundary>
      </div>
    </section>
  );
}
