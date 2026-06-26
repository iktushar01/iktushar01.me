import { GlassCard } from "@/components/github/glass-card";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-muted/80 rounded-none ${className ?? ""}`}
    />
  );
}

export function GitHubJourneySkeleton() {
  return (
    <div className="space-y-8 sm:space-y-12" aria-busy="true" aria-label="Loading GitHub data">
      <GlassCard className="p-6 sm:p-8" hover={false}>
        <div className="flex flex-col sm:flex-row gap-6">
          <SkeletonBar className="size-24 sm:size-28 shrink-0" />
          <div className="flex-1 space-y-3">
            <SkeletonBar className="h-8 w-48" />
            <SkeletonBar className="h-4 w-full max-w-md" />
            <SkeletonBar className="h-4 w-64" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonBar key={i} className="h-16" />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 h-72" hover={false}>
          <SkeletonBar className="h-4 w-40 mb-4" />
          <SkeletonBar className="h-full w-full" />
        </GlassCard>
        <GlassCard className="p-6 h-72" hover={false}>
          <SkeletonBar className="h-4 w-40 mb-4" />
          <SkeletonBar className="h-full w-full" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} className="p-5 h-40" hover={false}>
            <SkeletonBar className="h-4 w-24 mb-3" />
            <SkeletonBar className="h-3 w-full" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
