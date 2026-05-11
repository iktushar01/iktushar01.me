"use client";

import { useEffect } from "react";

/**
 * Marks the app as "ready" on the client and force-hides/removes the
 * server-rendered initial loader overlay.
 */
export default function AppReadyClient() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.appReady = "true";

    const loader = document.getElementById("initial-loader");
    if (!loader) return;

    // Prefer removing it entirely to avoid any CSS/stacking quirks.
    try {
      loader.remove();
      return;
    } catch {
      // Fallback for very old/odd environments.
    }

    loader.setAttribute("aria-hidden", "true");
    (loader as HTMLElement).style.display = "none";
  }, []);

  return null;
}

