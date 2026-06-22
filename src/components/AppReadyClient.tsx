"use client";

import { useEffect } from "react";

const MIN_DISPLAY_MS = 700;
const EXIT_DURATION_MS = 500;

/**
 * Fades out the server-rendered initial loader after a short minimum display,
 * then marks the app ready so the overlay is removed from the DOM.
 */
export default function AppReadyClient() {
  useEffect(() => {
    const root = document.documentElement;
    const startedAt = performance.now();

    const beginExit = () => {
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);

      window.setTimeout(() => {
        root.dataset.appExiting = "true";

        window.setTimeout(() => {
          root.dataset.appReady = "true";
        }, EXIT_DURATION_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      beginExit();
      return;
    }

    window.addEventListener("load", beginExit, { once: true });
    return () => window.removeEventListener("load", beginExit);
  }, []);

  return null;
}
