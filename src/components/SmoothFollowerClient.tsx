"use client";

import dynamic from "next/dynamic";

const SmoothFollower = dynamic(
  () => import("@/components/modules/SmoothFollower/SmoothFollower"),
  { ssr: false },
);

export default function SmoothFollowerClient() {
  return <SmoothFollower />;
}

