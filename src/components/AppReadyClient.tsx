"use client";

import { useEffect } from "react";

/**
 * Marks the app as "ready" on the client so CSS can hide the server-rendered
 * initial loader overlay.
 */
export default function AppReadyClient() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.appReady = "true";
  }, []);

  return null;
}

