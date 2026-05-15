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

const cursorSpring = { stiffness: 430, damping: 31, mass: 0.45 };
const magneticSpring = { stiffness: 210, damping: 19, mass: 0.65 };
const shapeSpring = { type: "spring" as const, stiffness: 260, damping: 24 };

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
    return "Tap";
  }
  return "Click";
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
  const speedScaleX = useTransform(xVelocity, [-2500, 0, 2500], [1.35, 1, 1.35]);
  const speedScaleY = useTransform(yVelocity, [-2500, 0, 2500], [0.72, 1, 0.72]);
  const rotate = useTransform(xVelocity, [-2500, 2500], [-18, 18]);

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
        updateMode("text", { label: "Type", width: 22, height: 42 });
        return;
      }

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        moveCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
        updateMode("hover", {
          label: getActionLabel(interactiveElement),
          width: Math.min(Math.max(rect.width + 18, 48), window.innerWidth - 32),
          height: Math.min(Math.max(rect.height + 14, 42), 120),
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
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div className="relative flex items-center justify-center" style={cursorStyle}>
        <motion.div
          animate={{
            width: isHover ? target?.width ?? 56 : isText ? 20 : isPressed ? 18 : 26,
            height: isHover ? target?.height ?? 48 : isText ? 44 : isPressed ? 18 : 26,
            borderRadius: isHover ? "18px" : isText ? "999px" : "50%",
            backgroundColor: isHover
              ? "color-mix(in oklab, var(--primary) 18%, transparent)"
              : isText
                ? "var(--foreground)"
                : isPressed
                  ? "var(--accent)"
                  : "var(--primary)",
            borderColor: isHover ? "var(--border)" : "var(--foreground)",
            borderWidth: isHover || isText ? 3 : 2,
            boxShadow: isHover
              ? "6px 6px 0 0 var(--cartoon-shadow)"
              : "4px 4px 0 0 var(--cartoon-shadow)",
          }}
          transition={shapeSpring}
          className="relative flex items-center justify-center border will-change-transform"
        >
          <AnimatePresence mode="wait">
            {isHover ? (
              <motion.span
                key="label"
                initial={{ opacity: 0, scale: 0.8, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -4 }}
                className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-accent-foreground shadow-cartoon-sm"
              >
                {target?.label ?? "Click"}
              </motion.span>
            ) : isText ? (
              <motion.span
                key="text"
                initial={{ opacity: 0, scaleY: 0.5 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.5 }}
                className="h-7 w-1 rounded-full bg-background"
              />
            ) : (
              <motion.span
                key="dot"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                className="flex gap-1"
              >
                <span className="size-1.5 rounded-full bg-primary-foreground" />
                <span className="size-1.5 rounded-full bg-primary-foreground" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          animate={{
            width: isHover ? (target?.width ?? 56) + 16 : 52,
            height: isHover ? (target?.height ?? 48) + 16 : 52,
            opacity: isHover ? 0.35 : 0.2,
          }}
          transition={magneticSpring}
          className="absolute rounded-full border-2 border-primary"
        />
      </motion.div>
    </div>
  );
}
