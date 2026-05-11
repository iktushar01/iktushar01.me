"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keeping this minimal; user can wire Sentry/etc later.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-xl px-6">
        <div className="rounded-[var(--radius-cartoon-lg)] border-4 border-border bg-card shadow-cartoon-md p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight">
                Something broke
              </h1>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                The page crashed while rendering. You can retry, or go back home.
              </p>
            </div>
            <div className="shrink-0 h-12 w-12 rounded-[var(--radius-sticker)] border-4 border-border bg-destructive/15 grid place-items-center">
              <span className="font-black text-lg">!</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-[var(--radius-sticker)] border-4 border-border bg-primary text-primary-foreground px-4 py-2 font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ease-out"
            >
              Try again
            </button>

            <Link
              href="/"
              className="text-center rounded-[var(--radius-sticker)] border-4 border-border bg-accent text-accent-foreground px-4 py-2 font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ease-out"
            >
              Go home
            </Link>
          </div>

          {error?.digest && (
            <p className="mt-5 text-xs text-muted-foreground">
              Error digest: <code className="font-mono">{error.digest}</code>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

