"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const cursorSpring = { stiffness: 380, damping: 30, mass: 0.5 };
const magneticSpring = { stiffness: 180, damping: 22, mass: 0.6 };
const shapeSpring = { type: "spring" as const, stiffness: 220, damping: 26 };

const interactiveSelector = [
  "a",
  "button",
  "summary",
  "select",
  "[role='button']",
  "[data-slot='button']",
  "[type='button']",
  "[type='submit']",
  "[type='reset']",
  ".interactive",
  ".magnetic-target",
].join(",");

const textSelector = [
  "input",
  "textarea",
  "[contenteditable='true']",
  "[role='textbox']",
].join(",");

type CursorMode = "default" | "hover" | "text" | "pressed";

type CursorTarget = {
  label: string;
  width: number;
  height: number;
};

function getActionLabel(element: HTMLElement) {
  if (element.matches("a")) return "Open";
  if (element.matches("button, [type='submit'], [data-slot='button']")) {
    return "View";
  }
  return "Explore";
}

export default function SmoothFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [target, setTarget] = useState<CursorTarget | null>(null);
  const modeRef = useRef<CursorMode>("default");
  const rafId = useRef<number | null>(null);
  const lastPoint = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, cursorSpring);
  const smoothY = useSpring(mouseY, cursorSpring);

  const xVelocity = useVelocity(smoothX);
  const yVelocity = useVelocity(smoothY);
  
  // Refined non-exaggerated fluid skew based on pointer velocity
  const speedScaleX = useTransform(xVelocity, [-2000, 0, 2000], [1.15, 1, 1.15]);
  const speedScaleY = useTransform(yVelocity, [-2000, 0, 2000], [0.88, 1, 0.88]);
  const rotate = useTransform(xVelocity, [-2000, 2000], [-8, 8]);

  const cursorStyle = useMemo(
    () => ({
      x: smoothX,
      y: smoothY,
      translateX: "-50%",
      translateY: "-50%",
      scaleX: mode === "default" ? speedScaleX : 1,
      scaleY: mode === "default" ? speedScaleY : 1,
      rotate: mode === "default" ? rotate : 0,
    }),
    [mode, rotate, smoothX, smoothY, speedScaleX, speedScaleY],
  );

  const updateMode = useCallback((nextMode: CursorMode, nextTarget: CursorTarget | null) => {
    if (modeRef.current !== nextMode) {
      modeRef.current = nextMode;
      setMode(nextMode);
    }

    setTarget((current) => {
      if (
        current?.label === nextTarget?.label &&
        current?.width === nextTarget?.width &&
        current?.height === nextTarget?.height
      ) {
        return current;
      }
      return nextTarget;
    });
  }, []);

  const moveCursor = useCallback(
    (x: number, y: number) => {
      lastPoint.current = { x, y };

      if (rafId.current != null) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        mouseX.set(lastPoint.current.x);
        mouseY.set(lastPoint.current.y);
      });
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncVisibility = () => {
      setIsVisible(pointerQuery.matches && !motionQuery.matches);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const element = event.target as HTMLElement | null;
      const textElement = element?.closest(textSelector) as HTMLElement | null;
      const interactiveElement = element?.closest(interactiveSelector) as HTMLElement | null;

      setIsVisible(pointerQuery.matches && !motionQuery.matches);

      if (textElement) {
        moveCursor(event.clientX, event.clientY);
        updateMode("text", { label: "Type", width: 4, height: 24 });
        return;
      }

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        moveCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
        updateMode("hover", {
          label: getActionLabel(interactiveElement),
          width: Math.min(Math.max(rect.width + 12, 40), window.innerWidth - 32),
          height: Math.min(Math.max(rect.height + 8, 36), 100),
        });
        return;
      }

      moveCursor(event.clientX, event.clientY);
      updateMode("default", null);
    };

    const handlePointerDown = () => {
      if (modeRef.current !== "default") return;
      updateMode("pressed", null);
    };

    const handlePointerUp = () => {
      if (modeRef.current !== "pressed") return;
      updateMode("default", null);
    };

    syncVisibility();
    pointerQuery.addEventListener("change", syncVisibility);
    motionQuery.addEventListener("change", syncVisibility);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });

    return () => {
      pointerQuery.removeEventListener("change", syncVisibility);
      motionQuery.removeEventListener("change", syncVisibility);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      if (rafId.current != null) window.cancelAnimationFrame(rafId.current);
    };
  }, [moveCursor, updateMode]);

  if (!isVisible) return null;

  const isHover = mode === "hover";
  const isText = mode === "text";
  const isPressed = mode === "pressed";

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden mix-blend-difference">
      <motion.div className="relative flex items-center justify-center" style={cursorStyle}>
        {/* CORE CORE INTERACTIVE FOLLOWER CONTAINER */}
        <motion.div
          animate={{
            width: isHover ? target?.width ?? 48 : isText ? 2 : isPressed ? 8 : 12,
            height: isHover ? target?.height ?? 36 : isText ? 22 : isPressed ? 8 : 12,
            borderRadius: isHover ? "12px" : isText ? "1px" : "50%",
            backgroundColor: isHover
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 1)",
            borderColor: isHover ? "rgba(255, 255, 255, 0.3)" : "transparent",
            borderWidth: isHover ? 1 : 0,
          }}
          transition={shapeSpring}
          className="relative flex items-center justify-center border backdrop-blur-[2px] will-change-[width,height,transform]"
        >
          <AnimatePresence mode="wait">
            {isHover && (
              <motion.span
                key="label"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-[10px] font-medium uppercase tracking-widest text-white whitespace-nowrap"
              >
                {target?.label ?? "View"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ELEGANT OUTER RADIUS BOUNDING LINK EFFECT */}
        <motion.div
          animate={{
            width: isHover ? (target?.width ?? 48) + 12 : isText ? 20 : isPressed ? 24 : 28,
            height: isHover ? (target?.height ?? 36) + 12 : isText ? 20 : isPressed ? 24 : 28,
            opacity: isHover ? 0.4 : isText ? 0 : isPressed ? 0.8 : 0.25,
            borderRadius: isHover ? "16px" : "50%",
          }}
          transition={magneticSpring}
          className="absolute border border-white"
        />
      </motion.div>
    </div>
  );
}