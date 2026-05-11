"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { springSoft, springSoftPhysics } from "@/lib/motion";

export default function SmoothFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, springSoftPhysics);
  const dotY = useSpring(mouseY, springSoftPhysics);

  const borderX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.75 });
  const borderY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.75 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkVisibility = () => {
      setIsVisible(mediaQuery.matches && !reduceMotionQuery.matches);
    };

    checkVisibility();
    mediaQuery.addEventListener("change", checkVisibility);
    reduceMotionQuery.addEventListener("change", checkVisibility);

    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          mouseX.set(lastX);
          mouseY.set(lastY);
        });
      }

      const target = e.target as HTMLElement | null;
      const nextHovering = !!target?.closest(
        "a, button, input, textarea, select, [role=\"button\"], .interactive",
      );
      if (nextHovering !== isHoveringRef.current) {
        isHoveringRef.current = nextHovering;
        setIsHovering(nextHovering);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", checkVisibility);
      reduceMotionQuery.removeEventListener("change", checkVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent ring-2 ring-primary/25 will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-primary/40 bg-primary/5 will-change-transform"
        animate={{
          width: isHovering ? 52 : 30,
          height: isHovering ? 52 : 30,
        }}
        transition={springSoft}
        style={{
          x: borderX,
          y: borderY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full bg-primary/10 blur-md"
          />
        )}
      </motion.div>
    </div>
  );
}
