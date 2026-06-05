"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { FaFileDownload, FaEye, FaReact, FaNodeJs, FaCode, FaGithub, FaFacebook, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springSnappy, springSoft, easeInOut } from "@/lib/motion";
import { Rocket, Terminal } from "lucide-react";

const RESUME_PDF_PATH = "/resume.pdf";
const CV_DOC_URL = "https://drive.google.com/file/d/1kDBaB5KUNH5UAQdH_rf_ps6SyojpBALF/view?usp=sharing";

const floatingIcon: Variants = {
  animate: (i: number) => ({
    y: [0, -15, 5, 0],
    x: [0, i % 2 === 0 ? 5 : -5, 0],
    rotate: [0, i % 2 === 0 ? 8 : -8, i % 2 === 0 ? -4 : 4, 0],
    transition: {
      duration: 6 + i * 0.8,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
  }),
};

interface TerminalLine {
  text: string;
  type: "input" | "output" | "success" | "accent" | "error";
}

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [inputVal, setInputVal] = useState("");
  
  // Installation Flow States
  const [isInstalling, setIsInstalling] = useState(true);
  const [installProgress, setInstallProgress] = useState(0);
  const [installStage, setInstallStage] = useState("Initializing package runner...");

  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Realistic PNPM Installation Lifecycle Animation Loop
  useEffect(() => {
    if (!mounted) return;

    let progress = 0;
    const stages = [
      { pct: 15, msg: "pnpm add iktushar01@latest" },
      { pct: 35, msg: "Resolving production dependencies..." },
      { pct: 55, msg: "Fetching components/MERN-stack core tree..." },
      { pct: 75, msg: "Linking multi-stage supply chain modules..." },
      { pct: 90, msg: "Optimizing layout context engines..." },
      { pct: 100, msg: "Installation Successful!" }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 4) + 2;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsInstalling(false);
          setTerminalLines([
            { text: "Successfully downloaded and extracted environment: iktushar01", type: "success" },
            { text: "Welcome to Ibrahim's CLI Shell Dashboard.", type: "accent" },
            { text: "Type 'help' to unlock project data branches.", type: "output" }
          ]);
        }, 600);
      }

      setInstallProgress(progress);
      const currentStage = stages.find(s => progress <= s.pct) || stages[stages.length - 1];
      setInstallStage(currentStage.msg);

    }, 80);

    return () => clearInterval(interval);
  }, [mounted]);

  // Auto-scroll inside terminal history window
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [terminalLines, inputVal, isInstalling]);

  if (!mounted) return null;

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    if (!cleanInput) return;

    const newLines = [...terminalLines, { text: `$ ${inputVal}`, type: "input" as const }];

    switch (cleanInput) {
      case "help":
        newLines.push(
          { text: "Available Resume Blueprint Commands:", type: "accent" },
          { text: "  about    - Show career objective, contact parameters, location data", type: "output" },
          { text: "  skills   - Pull layout architecture technologies & tools spectrum", type: "output" },
          { text: "  projects - Inspect ecosystem releases (Acadex, Retail Flow, Easy Home)", type: "output" },
          { text: "  clear    - Clear window context pipelines", type: "output" }
        );
        break;
      case "about":
        newLines.push(
          { text: "--- MD. IBRAHIM KHALIL TUSHAR ---", type: "accent" },
          { text: "📍 Location: Gazipur, Bangladesh | 📧 iktushar01@gmail.com", type: "output" },
          { text: "🎯 Objective: Full Stack Web Developer specializing in MERN stack, Next.js, and TypeScript. Skilled in designing responsive UIs, secure RESTful APIs, and implementation of multi-stage system logic.", type: "success" },
          { text: "🎓 Education: Bachelor of Science in CSE at Uttara University (Expected 2029)", type: "output" }
        );
        break;
      case "skills":
        newLines.push(
          { text: "--- TECHNICAL SPECTRUM GRAPH ---", type: "accent" },
          { text: " [Frontend]  React.js (v19), Next.js, TypeScript, JS (ES6+), Tailwind CSS (v4)", type: "success" },
          { text: " [Backend]   Node.js, Express.js, RESTful APIs, JWT Cryptography", type: "success" },
          { text: " [Database]  MongoDB, PostgreSQL, Prisma ORM, Firebase Auth", type: "success" },
          { text: " [Platforms] Git, GitHub, Vercel, Netlify, Postman, Figma", type: "output" }
        );
        break;
      case "projects":
        newLines.push(
          { text: "--- RELEASES ATTAINMENT TRACK ---", type: "accent" },
          { text: "📦 Acadex (Academic Collaboration Platform)", type: "success" },
          { text: "   - Engineered role-aware dashboard tracks (Student, CR, Admin, Super Admin)", type: "output" },
          { text: "   - Technologies: Next.js, TypeScript, TanStack Query, Framer Motion", type: "output" },
          { text: "📦 Retail Flow (POS & Inventory Management Architecture)", type: "success" },
          { text: "   - Handled complex multi-stage supply chain conversions (PO -> GRN mapping)", type: "output" },
          { text: "   - Technologies: React.js, Node.js, Express.js, MongoDB, TanStack Table", type: "output" },
          { text: "📦 Easy Home (Role-Based Real Estate Ecosystem)", type: "success" },
          { text: "   - Developed secure authentication verification flows and property offer tracks", type: "output" }
        );
        break;
      case "clear":
        setTerminalLines([]);
        setInputVal("");
        return;
      default:
        newLines.push({ text: `command error processing: "${inputVal}" not found. Enter "help"`, type: "error" });
    }

    setTerminalLines(newLines);
    setInputVal("");
  };

  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  const renderProgressBar = () => {
    const totalBars = 20;
    const filledBars = Math.round((installProgress / 100) * totalBars);
    const emptyBars = totalBars - filledBars;
    return `[${"■".repeat(filledBars)}${".".repeat(emptyBars)}] ${installProgress}%`;
  };

  const inlineSocials = [
  { Icon: FaGithub, url: "https://github.com/iktushar01", label: "GitHub" },
  { Icon: FaLinkedinIn, url: "https://linkedin.com/in/iktushar01", label: "LinkedIn" },
  { Icon: FaFacebook, url: "https://facebook.com/iktushar01", label: "Facebook" },
  { Icon: FaInstagram, url: "https://instagram.com/iktushar01", label: "Instagram" },
  { Icon: FaYoutube, url: "https://youtube.com/@iktushar01", label: "YouTube" },
];

  return (
    <>
      <style jsx global>{`
        @keyframes gridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 24px 24px; }
        }
        @keyframes auraBreath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; blur: 120px; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.14; blur: 140px; }
        }
        .animate-grid-infinite {
          animation: gridMove 4s linear infinite;
        }
        .animate-aura-infinite {
          animation: auraBreath 8s ease-in-out infinite;
        }

        /* Custom Scrollbar Injection to match terminal aesthetic */
        .custom-terminal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 30, 46, 0.5);
          border-radius: 4px;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(137, 180, 250, 0.3); /* Matches theme blue */
          border-radius: 4px;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(137, 180, 250, 0.6);
        }
      `}</style>

      <motion.header
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: easeInOut.ease }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 lg:px-12 py-24 lg:py-0"
      >
        {/* Background Canvas Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] animate-grid-infinite" />
          <div className="absolute top-1/2 left-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] bg-primary/10 rounded-full animate-aura-infinite" />
        </div>

        {/* Floating Background Ambient Design Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block overflow-hidden">
          {[
            { Icon: FaReact, color: "text-primary/30", pos: "top-[15%] left-[8%]", size: "text-6xl" },
            { Icon: SiNextdotjs, color: "text-primary/40", pos: "bottom-[25%] left-[5%]", size: "text-7xl" },
            { Icon: SiTailwindcss, color: "text-primary/35", pos: "top-[12%] right-[8%]", size: "text-6xl" },
            { Icon: FaNodeJs, color: "text-primary/30", pos: "bottom-[18%] right-[6%]", size: "text-7xl" },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={floatingIcon}
              animate="animate"
              className={`absolute ${item.pos} ${item.size} ${item.color} drop-shadow-cartoon`}
            >
              <item.Icon />
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 z-20 relative">
          
          {/* Left Column Profile Text Info */}
          <div className="flex-1 text-center lg:text-left space-y-6 w-full">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={springSoft}
            >
              <Badge className="inline-flex items-center px-4 py-1.5 border-4 border-border bg-primary text-primary-foreground mb-6 font-black text-xs uppercase tracking-widest shadow-cartoon-sm rounded-[var(--radius-sticker)] gap-2 transform -rotate-1">
                AVAILABLE FOR HIRE <Rocket className="size-3.5" strokeWidth={3} />
              </Badge>

              <h1 className="text-6xl sm:text-8xl xl:text-[9rem] font-black tracking-tighter leading-[0.85] mb-6 drop-shadow-cartoon select-none">
                <span className="text-yellow-400">TUSHAR</span>
                <span className="text-primary italic">!</span>
              </h1>

              <div className="bg-card text-card-foreground border-4 border-border p-6 sm:p-8 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md relative max-w-2xl mx-auto lg:mx-0">
                <div className="absolute -top-4 left-1/2 lg:left-12 -translate-x-1/2 lg:translate-x-0 w-8 h-8 bg-card border-l-4 border-t-4 border-border rotate-45 hidden sm:block" />

                <h3 className="text-xl sm:text-2xl font-black mb-3 uppercase italic tracking-tight flex items-center justify-center lg:justify-start gap-2">
                  <Terminal className="size-5 text-primary" strokeWidth={3} /> 
                  Fullstack MERN & Next.js Dev
                </h3>

                <p className="text-base sm:text-lg font-semibold leading-relaxed text-muted-foreground">
                  I architect{" "}
                  <span className="text-foreground underline decoration-yellow-400 decoration-4 underline-offset-2 font-bold">
                    high-performance
                  </span>{" "}
                  web applications. Specialist in crafting pixel-perfect UIs with
                  <span className="text-primary font-bold italic"> Next.js</span> & scalable
                  backends with <span className="text-primary font-bold italic">Node.js</span>.
                </p>
              </div>
            </motion.div>

            {/* Social Icons Strip Before Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              {inlineSocials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 6 : -6 }}
                  whileTap={{ scale: 0.95 }}
                  transition={springSnappy}
                  className="w-12 h-12 bg-card text-card-foreground border-4 border-border flex items-center justify-center text-xl shadow-cartoon-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-150 rounded-[var(--radius-sticker)]"
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>

            {/* Actions CTA Bars */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-1">
              <motion.div whileHover={{ scale: 1.02, rotate: -1 }} whileTap={{ scale: 0.98 }} transition={springSnappy} className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground border-4 border-border rounded-[var(--radius-sticker)] px-8 h-16 font-black text-lg shadow-cartoon-md hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  <a href={RESUME_PDF_PATH} download="Ibrahim Khalil Tushar.pdf">
                    RESUME <FaFileDownload className="ml-2.5 size-5" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02, rotate: 1 }} whileTap={{ scale: 0.98 }} transition={springSnappy} className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-card text-card-foreground border-4 border-border rounded-[var(--radius-sticker)] px-8 h-16 font-black text-lg shadow-cartoon-md hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
                >
                  <a href={CV_DOC_URL} target="_blank" rel="noopener noreferrer">
                    VIEW CV <FaEye className="ml-2.5 size-5" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Fixed Large-Sized Real-time Terminal */}
          <motion.div 
            className="flex-1 w-full max-w-xl hidden lg:block relative cursor-text"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springSoft, delay: 0.15 }}
            onClick={focusTerminalInput}
          >
            <div className="absolute inset-0 bg-primary border-4 border-border rounded-[var(--radius-cartoon-lg)] translate-x-3 translate-y-3" />
            
            <div className="w-full h-[420px] bg-[#1e1e2e] text-[#cdd6f4] border-4 border-border rounded-[var(--radius-cartoon-lg)] p-5 relative z-10 shadow-cartoon-md font-mono text-sm leading-relaxed flex flex-col justify-between">
              
              <div>
                {/* Header Window Controller */}
                <div className="flex items-center justify-between border-b-2 border-border/30 pb-3 mb-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                    <span className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                    <span className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-bold">
                    <FaCode className="text-primary size-3.5" /> pnpm-installer.sh
                  </span>
                </div>

                {/* Internal Render Display Area with Custom Scrollbar Class applied */}
                <div 
                  ref={containerRef}
                  className="space-y-1 text-xs sm:text-sm font-medium max-h-[280px] overflow-y-auto pr-1 custom-terminal-scrollbar"
                >
                  {isInstalling ? (
                    <div className="space-y-3 pt-4">
                      <p className="text-[#89b4fa] font-bold">pnpm i iktushar01</p>
                      <div className="text-muted-foreground text-xs">
                        <p>{installStage}</p>
                      </div>
                      <p className="text-[#a6e3a1] font-mono tracking-wider text-base">
                        {renderProgressBar()}
                      </p>
                    </div>
                  ) : (
                    <>
                      {terminalLines.map((line, idx) => {
                        let colorClass = "text-[#cdd6f4]";
                        if (line.type === "input") colorClass = "text-[#89b4fa] font-bold";
                        if (line.type === "success") colorClass = "text-[#a6e3a1]";
                        if (line.type === "accent") colorClass = "text-[#f9e2af]";
                        if (line.type === "error") colorClass = "text-[#f38ba8]";
                        
                        return (
                          <p key={idx} className={colorClass}>
                            {line.text}
                          </p>
                        );
                      })}
                      
                      {/* Active Input Line */}
                      <form onSubmit={handleTerminalSubmit} className="flex items-center text-[#89b4fa] font-bold">
                        <span>$ &nbsp;</span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          className="bg-transparent border-none outline-none flex-1 font-mono font-medium p-0 m-0 text-[#cdd6f4] caret-primary"
                          autoFocus
                          autoComplete="off"
                          spellCheck="false"
                        />
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Status Footer Row */}
              <div className="pt-3 border-t border-border/20 mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-[#a6e3a1]">
                  <span className={`w-2 h-2 rounded-full mr-1 ${isInstalling ? "bg-[#f9e2af] animate-ping" : "bg-[#a6e3a1] animate-pulse"}`} />
                  {isInstalling ? "Fetching core modules..." : "Package 'iktushar01' initialized"}
                </span>
                <span className="text-[#f9e2af] font-bold">Node20 / pnpm v9</span>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.header>
    </>
  );
};

export default Header;