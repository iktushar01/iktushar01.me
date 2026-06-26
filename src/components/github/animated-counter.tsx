"use client";

import { motion, useInView, useSpring, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState("0");

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(`${Math.round(v).toLocaleString()}${suffix}`);
  });

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
