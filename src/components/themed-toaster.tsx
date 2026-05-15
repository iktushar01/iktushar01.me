"use client";

import { Toaster } from "sonner";
import { useTheme } from "next-themes";

export function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <Toaster
      position="top-center"
      richColors
      theme={theme}
      toastOptions={{
        classNames: {
          toast:
            "border-4 border-border bg-card text-card-foreground shadow-cartoon-md font-cartoon",
          title: "font-black uppercase italic tracking-tight text-card-foreground",
          description: "font-semibold text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground border-2 border-border font-black uppercase",
          cancelButton:
            "bg-muted text-muted-foreground border-2 border-border font-black uppercase",
        },
      }}
    />
  );
}
