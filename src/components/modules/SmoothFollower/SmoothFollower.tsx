'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SmoothFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configurations for smooth movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);

  const borderSpringConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const borderX = useSpring(mouseX, borderSpringConfig);
  const borderY = useSpring(mouseY, borderSpringConfig);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const checkVisibility = () => {
      setIsVisible(mediaQuery.matches);
    };

    checkVisibility();
    mediaQuery.addEventListener('change', checkVisibility);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if hovering over interactive element using event delegation approach
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], .interactive');
      setIsHovering(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mediaQuery.removeEventListener('change', checkVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Small center dot */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer border circle */}
      <motion.div
        className="absolute rounded-full border border-yellow-400/50 bg-yellow-400/5"
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? 'rgba(250, 204, 21, 0.1)' : 'rgba(250, 204, 21, 0.05)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
        style={{
          x: borderX,
          y: borderY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Subtle inner glow when hovering */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-full bg-yellow-400/10 blur-md"
          />
        )}
      </motion.div>
    </div>
  );
}

