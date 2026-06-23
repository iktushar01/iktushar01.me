import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function AnimatedThemeTogglerDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <AnimatedThemeToggler
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-none text-foreground transition-colors duration-200 hover:bg-muted [&_svg]:size-4",
        className
      )}
    />
  );
}
