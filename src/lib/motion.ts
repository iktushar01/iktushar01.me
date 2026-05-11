/**
 * Shared motion presets for the landing page (one easing family).
 */
/** For `motion` `transition` props */
export const springSnappy = {
  type: "spring" as const,
  stiffness: 320,
  damping: 28,
  mass: 0.85,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 220,
  damping: 26,
  mass: 0.75,
};

export const springDrawer = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

/** For `useSpring` / `useMotionValue` — omit `type` */
export const springSoftPhysics = { stiffness: 220, damping: 26, mass: 0.75 };

export const tiltSpring = { stiffness: 280, damping: 26 };

/** Magnetic / cursor-follow micro-interactions */
export const springMagnetic = { stiffness: 380, damping: 22 };

export const easeOut = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const easeInOut = {
  duration: 0.45,
  ease: [0.45, 0, 0.55, 1] as const,
};

export const viewFadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-64px" as const },
  transition: springSoft,
};
