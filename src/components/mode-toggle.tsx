"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { springSnappy } from "@/lib/motion";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return <div className="h-12 w-12" />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative h-12 w-12 border-4 border-border bg-card text-card-foreground shadow-cartoon-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 rounded-[var(--radius-sticker)]"
      onClick={toggleTheme}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ scale: 0.6, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0.6, rotate: 120 }}
          transition={springSnappy}
          className="flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-6 w-6 fill-current" />
          ) : (
            <Sun className="h-6 w-6 fill-current" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
