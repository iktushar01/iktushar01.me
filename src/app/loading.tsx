import Link from "next/link";

export default function Loading() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md px-6">
        <div className="rounded-[var(--radius-cartoon-lg)] border-4 border-border bg-card shadow-cartoon-md p-8">
          <div className="flex items-center justify-between">
            <div className="text-xl font-black uppercase italic tracking-tight">
              Loading…
            </div>
            <div
              aria-label="Loading"
              className="h-6 w-6 rounded-full border-[3px] border-border border-t-transparent animate-spin"
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Warming up the page. This should only take a moment.
          </p>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="h-10 w-32 rounded-[var(--radius-sticker)] border-4 border-border bg-muted/60" />
            <Link
              href="/"
              className="rounded-[var(--radius-sticker)] border-4 border-border bg-accent text-accent-foreground px-4 py-2 font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ease-out"
            >
              Home
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Tip: if this hangs, try a hard refresh.
        </p>
      </div>
    </main>
  );
}

