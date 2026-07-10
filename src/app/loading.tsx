"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const GREETINGS = [
  { word: "Hello", lang: "English" },
  { word: "Bonjour", lang: "French" },
  { word: "Hola", lang: "Spanish" },
  { word: "Ciao", lang: "Italian" },
  { word: "Hallo", lang: "German" },
  { word: "Olá", lang: "Portuguese" },
  { word: "こんにちは", lang: "Japanese" },
  { word: "안녕하세요", lang: "Korean" },
  { word: "你好", lang: "Chinese" },
  { word: "مرحبا", lang: "Arabic" },
  { word: "Привет", lang: "Russian" },
  { word: "नमस्ते", lang: "Hindi" },
  { word: "Merhaba", lang: "Turkish" },
  { word: "Hej", lang: "Swedish" },
   { word: "হ্যালো", lang: "Bengali" },
];

const WORD_INTERVAL = 150;

function markAppReady() {
  document.documentElement.dataset.appReady = "true";
}

export default function InitialLoader() {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (index >= GREETINGS.length - 1) {
      const exitTimer = setTimeout(() => setExiting(true), WORD_INTERVAL + 200);
      return () => clearTimeout(exitTimer);
    }
    const timer = setTimeout(() => setIndex((i) => i + 1), WORD_INTERVAL);
    return () => clearTimeout(timer);
  }, [index]);

  if (hidden) return null;

  const current = GREETINGS[index];

  return (
    <AnimatePresence
      onExitComplete={() => {
        setHidden(true);
        markAppReady();
      }}
    >
      {!exiting && (
        <motion.div
          id="initial-loader"
          aria-label="Loading"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-background text-foreground"
        >
          <div className="relative h-12 flex items-center justify-center min-w-[16rem]">
            <AnimatePresence mode="popLayout">
              {/* Pure Soft Fade & Scale */}
              <motion.p
                key={current.word}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.25, 1, 0.5, 1] // Smooth ease-out curve 
                }}
                className="absolute text-3xl sm:text-4xl font-normal tracking-tight text-center"
              >
                {current.word}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Simple matching fade for language text */}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={current.lang}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase"
            >
              {current.lang}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}