"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { springSoft, springSoftPhysics } from "@/lib/motion";

export default function SmoothFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dotX = useSpring(mouseX, springSoftPhysics);
  const dotY = useSpring(mouseY, springSoftPhysics);

  const borderX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.75 });
  const borderY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.75 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const checkVisibility = () => {
      setIsVisible(mediaQuery.matches);
    };

    checkVisibility();
    mediaQuery.addEventListener("change", checkVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        "a, button, input, textarea, select, [role=\"button\"], .interactive",
      );
      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      mediaQuery.removeEventListener("change", checkVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent ring-2 ring-primary/25"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.div
        className="absolute rounded-full border-2 border-primary/40 bg-primary/5"
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
