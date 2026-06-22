"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const cursorSpring = { stiffness: 380, damping: 30, mass: 0.5 };
const shapeSpring = { type: "spring" as const, stiffness: 260, damping: 28 };

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
].join(",");

const mediaSelector = "[data-cursor-hover]";

const textSelector = [
  "input",
  "textarea",
  "[contenteditable='true']",
  "[role='textbox']",
].join(",");

type CursorMode = "default" | "hover" | "text" | "pressed";

type CursorTarget = {
  width: number;
  height: number;
};

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

  const updateMode = useCallback((nextMode: CursorMode, nextTarget: CursorTarget | null) => {
    if (modeRef.current !== nextMode) {
      modeRef.current = nextMode;
      setMode(nextMode);
    }
    setTarget((current) => {
      if (current?.width === nextTarget?.width && current?.height === nextTarget?.height) {
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
      const mediaElement = element?.closest(mediaSelector) as HTMLElement | null;
      const interactiveElement = element?.closest(interactiveSelector) as HTMLElement | null;

      setIsVisible(pointerQuery.matches && !motionQuery.matches);

      if (textElement) {
        moveCursor(event.clientX, event.clientY);
        updateMode("text", null);
        return;
      }

      if (mediaElement) {
        const rect = mediaElement.getBoundingClientRect();
        moveCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
        updateMode("hover", {
          width: rect.width + 8,
          height: rect.height + 8,
        });
        return;
      }

      if (interactiveElement) {
        const rect = interactiveElement.getBoundingClientRect();
        moveCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
        updateMode("hover", {
          width: Math.min(Math.max(rect.width + 8, 32), window.innerWidth - 32),
          height: Math.min(Math.max(rect.height + 6, 28), 80),
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
      <motion.div
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          animate={{
            width: isHover ? target?.width ?? 36 : isText ? 2 : isPressed ? 8 : 10,
            height: isHover ? target?.height ?? 28 : isText ? 20 : isPressed ? 8 : 10,
            borderRadius: isHover ? 6 : isText ? 1 : 999,
          }}
          transition={shapeSpring}
          className={
            isHover
              ? "border border-primary bg-primary/10"
              : "bg-primary"
          }
        />
      </motion.div>
    </div>
  );
}