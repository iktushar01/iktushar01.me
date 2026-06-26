import { AlertCircle } from "lucide-react";

import { GitHubJourneyContent, GlassCard } from "@/components/github";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import type { GitHubJourneyData } from "@/lib/github/types";

interface GitHubJourneyProps {
  data: GitHubJourneyData | null;
  errorMessage?: string | null;
}

export default function GitHubJourney({ data, errorMessage }: GitHubJourneyProps) {
  return (
    <section
      id="github"
      className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16"
    >
      <SectionHeader kicker="Open Source" title="GitHub Activity & Journey" />

      <div className="mt-8 sm:mt-12">
        {data ? (
          <GitHubJourneyContent data={data} />
        ) : (
          <GlassCard className="p-8 text-center" hover={false}>
            <AlertCircle className="size-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              Unable to load GitHub data
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {errorMessage ??
                "Add GITHUB_TOKEN and GITHUB_USERNAME to .env.local, then restart the dev server."}
            </p>
          </GlassCard>
        )}
      </div>
    </section>
  );
}
