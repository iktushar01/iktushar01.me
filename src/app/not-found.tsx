import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-xl px-6">
        <div className="rounded-[var(--radius-cartoon-lg)] border-4 border-border bg-card shadow-cartoon-md p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight">
              404
            </h1>
            <span className="text-sm text-muted-foreground font-black uppercase italic">
              Page not found
            </span>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            The page you’re looking for doesn’t exist (or it moved). Use the
            button below to get back to safety.
          </p>

          <div className="mt-6">
            <Link
              href="/"
              className="inline-block rounded-[var(--radius-sticker)] border-4 border-border bg-accent text-accent-foreground px-4 py-2 font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ease-out"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

