"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { springSoft } from "@/lib/motion";

const PACKAGE = "@iktushar01/developer";
const PROMPT = "guest@iktushar01.me ~ %";

type LineType = "default" | "muted" | "success" | "accent" | "warn" | "cmd" | "error";

interface TerminalLine {
  id: number;
  text: string;
  type?: LineType;
}

const lineColor: Record<LineType, string> = {
  default: "text-foreground/90",
  muted: "text-muted-foreground",
  success: "text-emerald-400",
  accent: "text-primary",
  warn: "text-amber-400",
  cmd: "text-foreground",
  error: "text-red-400",
};

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about      — who I am",
    "  skills     — tech stack",
    "  contact    — email, phone, location",
    "  socials    — GitHub, LinkedIn, etc.",
    "  education  — academic background",
    "  role       — current role",
    "  stack      — primary technologies",
    "  based      — location",
    "  status     — availability",
    "  resume     — CV download links",
    "  whoami     — display name",
    "  clear      — clear terminal",
  ],
  about:
    "Full Stack Developer building production web apps with MERN & Next.js — resilient backends, considered interfaces, and code that holds up after the demo ends.",
  skills:
    "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, Go\nDatabases: MongoDB, PostgreSQL, Prisma, Redis\nTools: Git, Docker, Vercel, Figma",
  contact: [
    "Email:    iktushar01@gmail.com",
    "Phone:    +880 1756650014",
    "Location: Gazipur, Dhaka, Bangladesh",
  ],
  socials: [
    "GitHub:    github.com/iktushar01",
    "LinkedIn:  linkedin.com/in/iktushar01",
    "Facebook:  facebook.com/iktushar01",
    "Instagram: instagram.com/iktushar01",
    "YouTube:   youtube.com/@iktushar01",
  ],
  education: [
    "B.Sc in Computer Science — Uttara University (2025–2029)",
    "HSC — Rajendrapur Cantonment Public School and College (2021–2023)",
  ],
  role: "Fullstack Web Developer",
  stack: "MERN, Next.js, TypeScript",
  based: "Gazipur, Bangladesh",
  status: "Open to work — freelance, remote & full-time opportunities",
  resume: [
    "Download: /resume.pdf",
    "View CV:  drive.google.com (link on homepage)",
  ],
  whoami: "Md. Ibrahim Khalil Tushar",
};

const INSTALL_SCRIPT: Array<{ text: string; type?: LineType; delay: number }> = [
  { text: `$ pnpm add ${PACKAGE}`, type: "cmd", delay: 0 },
  { text: "", delay: 400 },
  { text: "Packages: +1", type: "accent", delay: 600 },
  { text: "Progress: resolved 1, reused 0, downloaded 0, added 0", type: "muted", delay: 900 },
  { text: "", delay: 1100 },
  { text: "dependencies:", type: "muted", delay: 1300 },
  { text: `+ ${PACKAGE} 1.0.0`, type: "success", delay: 1600 },
  { text: "", delay: 1800 },
  { text: "Progress: resolved 1, reused 0, downloaded 1, added 1, done", type: "success", delay: 2200 },
  { text: "", delay: 2400 },
  { text: "Done in 1.8s", type: "accent", delay: 2600 },
  { text: "", delay: 2800 },
  { text: `Package installed. Type 'help' to explore.`, type: "muted", delay: 3000 },
];

function ProgressBar({ progress }: { progress: number }) {
  const filled = Math.round(progress * 28);
  const bar = "█".repeat(filled) + "░".repeat(28 - filled);
  return (
    <span className="text-primary/80 font-mono text-[11px] tracking-tight">
      [{bar}] {Math.round(progress * 100)}%
    </span>
  );
}

export default function HeroTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [installing, setInstalling] = useState(true);
  const [installProgress, setInstallProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const lineId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = useCallback((text: string, type: LineType = "default") => {
    lineId.current += 1;
    setLines((prev) => [...prev, { id: lineId.current, text, type }]);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let progressTimer: ReturnType<typeof setInterval> | null = null;

    INSTALL_SCRIPT.forEach((step) => {
      const t = setTimeout(() => {
        if (step.text) {
          lineId.current += 1;
          setLines((prev) => [
            ...prev,
            { id: lineId.current, text: step.text, type: step.type ?? "default" },
          ]);
        }
        if (step.text.includes("downloaded 0")) {
          progressTimer = setInterval(() => {
            setInstallProgress((p) => {
              if (p >= 1) {
                if (progressTimer) clearInterval(progressTimer);
                return 1;
              }
              return Math.min(p + 0.08, 0.95);
            });
          }, 120);
        }
        if (step.text.includes("added 1, done")) {
          if (progressTimer) clearInterval(progressTimer);
          setInstallProgress(1);
        }
      }, step.delay);
      timers.push(t);
    });

    const doneTimer = setTimeout(() => {
      setInstalling(false);
      setReady(true);
    }, 3200);
    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, input]);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      addLine(`${PROMPT} ${raw}`, "cmd");

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      const handler = COMMANDS[cmd];
      if (!handler) {
        addLine(`command not found: ${cmd}. Type 'help' for available commands.`, "error");
        return;
      }

      if (Array.isArray(handler)) {
        handler.forEach((line) => addLine(line, "default"));
      } else {
        handler.split("\n").forEach((line) => addLine(line, "default"));
      }
    },
    [addLine]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || !input.trim()) return;
    runCommand(input);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springSoft, delay: 0.3 }}
      className="hidden lg:flex flex-col w-full max-w-md xl:max-w-lg shrink-0 self-center"
      onClick={() => ready && inputRef.current?.focus()}
    >
      <div className="border border-border bg-muted/20 backdrop-blur-sm overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
          <span className="size-2 rounded-full bg-red-500/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-[10px] font-mono text-muted-foreground tracking-wide">
            terminal — zsh
          </span>
        </div>

        {/* Output */}
        <div
          ref={scrollRef}
          className="h-[280px] xl:h-[320px] overflow-y-auto px-4 py-3 font-mono text-[11px] xl:text-xs leading-relaxed scrollbar-thin"
        >
          {lines.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap break-words ${lineColor[line.type ?? "default"]}`}
            >
              {line.text}
            </div>
          ))}

          {installing && installProgress > 0 && installProgress < 1 && (
            <div className="mt-1">
              <ProgressBar progress={installProgress} />
            </div>
          )}

          {ready && (
            <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
              <span className="text-muted-foreground shrink-0">{PROMPT}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-foreground caret-primary min-w-0"
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal input"
              />
              <span className="inline-block w-[7px] h-[14px] bg-primary/80 animate-pulse shrink-0" />
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
