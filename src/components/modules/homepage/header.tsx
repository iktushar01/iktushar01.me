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
    y: [0, -12, 4, 0],
    x: [0, i % 2 === 0 ? 4 : -4, 0],
    rotate: [0, i % 2 === 0 ? 4 : -4, i % 2 === 0 ? -2 : 2, 0],
    transition: {
      duration: 7 + i * 1,
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
          100% { background-position: 32px 32px; }
        }
        @keyframes auraBreath {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.15; }
        }
        .animate-grid-infinite {
          animation: gridMove 8s linear infinite;
        }
        .animate-aura-infinite {
          animation: auraBreath 10s ease-in-out infinite;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.2);
          border-radius: 10px;
        }
        .custom-terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.4);
        }
      `}</style>

      <motion.header
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: easeInOut.ease }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 lg:px-12 py-24 lg:py-0"
      >
        {/* Background Canvas Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px] animate-grid-infinite text-muted-foreground/30" />
          <div className="absolute top-1/2 left-1/2 w-[650px] h-[650px] bg-primary/10 rounded-full blur-[140px] animate-aura-infinite" />
        </div>

        {/* Floating Background Ambient Tech Icons */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden xl:block overflow-hidden opacity-15 dark:opacity-20">
          {[
            { Icon: FaReact, pos: "top-[18%] left-[10%]", size: "text-5xl" },
            { Icon: SiNextdotjs, pos: "bottom-[22%] left-[8%]", size: "text-6xl" },
            { Icon: SiTailwindcss, pos: "top-[15%] right-[10%]", size: "text-5xl" },
            { Icon: FaNodeJs, pos: "bottom-[20%] right-[8%]", size: "text-6xl" },
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={floatingIcon}
              animate="animate"
              className={`absolute ${item.pos} ${item.size} text-muted-foreground`}
            >
              <item.Icon />
            </motion.div>
          ))}
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 z-20 relative">
          
          {/* Left Column Profile Text Info */}
          <div className="flex-1 text-center lg:text-left space-y-6 w-full">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={springSoft}
            >
              <Badge variant="outline" className="inline-flex items-center px-3.5 py-1 border-primary/30 bg-primary/10 text-primary mb-6 font-medium text-xs uppercase tracking-wider rounded-full gap-2 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                AVAILABLE FOR HIRE <Rocket className="size-3" strokeWidth={2.5} />
              </Badge>

              <h1 className="text-5xl sm:text-7xl xl:text-[7.5rem] font-medium tracking-tight leading-[0.9] mb-6 select-none font-sans bg-gradient-to-b from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
                TUSHAR<span className="text-primary font-light">.</span>
              </h1>

              <div className="bg-muted/30 border border-border p-6 sm:p-7 rounded-2xl backdrop-blur-md relative max-w-xl mx-auto lg:mx-0 shadow-sm">
                <h3 className="text-base sm:text-lg font-medium mb-2.5 tracking-tight text-foreground flex items-center justify-center lg:justify-start gap-2">
                  <Terminal className="size-4.5 text-primary" strokeWidth={2} /> 
                  Fullstack MERN & Next.js Engineer
                </h3>

                <p className="text-sm sm:text-base font-normal leading-relaxed text-muted-foreground">
                  I architect{" "}
                  <span className="text-foreground font-medium underline decoration-primary/60 decoration-2 underline-offset-4">
                    high-performance
                  </span>{" "}
                  web applications. Specialist in crafting production-ready UIs with
                  <span className="text-foreground font-medium"> Next.js</span> & scalable distributed
                  backends with <span className="text-foreground font-medium">Node.js</span>.
                </p>
              </div>
            </motion.div>

            {/* Social Icons Strip */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              {inlineSocials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-10 h-10 bg-muted/40 text-muted-foreground border border-border flex items-center justify-center text-base hover:text-primary hover:border-primary/30 transition-all duration-300 rounded-xl backdrop-blur-sm"
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>

            {/* Actions CTA Bars */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3.5 pt-1">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={springSnappy} className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground font-medium text-sm rounded-full px-7 h-12 hover:bg-primary/90 shadow-sm transition-all duration-300"
                >
                  <a href={RESUME_PDF_PATH} download="Ibrahim Khalil Tushar.pdf">
                    Download Resume <FaFileDownload className="ml-2 size-4 opacity-80" />
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} transition={springSnappy} className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-transparent text-muted-foreground border-border font-medium text-sm rounded-full px-7 h-12 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <a href={CV_DOC_URL} target="_blank" rel="noopener noreferrer">
                    View Interactive CV <FaEye className="ml-2 size-4 opacity-70" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Theme-Aware Code Terminal Dashboard */}
          <motion.div 
            className="flex-1 w-full max-w-xl hidden lg:block relative cursor-text group"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springSoft, delay: 0.12 }}
            onClick={focusTerminalInput}
          >
            {/* Soft Ambient Subtle Glow Hover Effect */}
            <div className="absolute inset-0 bg-primary/5 rounded-2xl filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="w-full h-[400px] bg-card text-card-foreground border border-border rounded-2xl p-5 relative z-10 shadow-lg font-mono text-xs leading-relaxed flex flex-col justify-between backdrop-blur-md">
              
              <div>
                {/* Header Window Controller */}
                <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-muted border border-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-muted border border-border" />
                    <span className="w-2.5 h-2.5 rounded-full bg-muted border border-border" />
                  </div>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1.5 font-medium tracking-tight">
                    <FaCode className="text-primary/70 size-3" /> pnpm-installer.sh
                  </span>
                </div>

                {/* Internal Render Display Area */}
                <div 
                  ref={containerRef}
                  className="space-y-1.5 font-normal max-h-[260px] overflow-y-auto pr-1 custom-terminal-scrollbar"
                >
                  {isInstalling ? (
                    <div className="space-y-3.5 pt-2">
                      <p className="text-primary font-medium">pnpm i iktushar01</p>
                      <div className="text-muted-foreground">
                        <p>{installStage}</p>
                      </div>
                      <p className="text-emerald-500 tracking-wider text-sm font-light">
                        {renderProgressBar()}
                      </p>
                    </div>
                  ) : (
                    <>
                      {terminalLines.map((line, idx) => {
                        let colorClass = "text-card-foreground";
                        if (line.type === "input") colorClass = "text-primary font-medium";
                        if (line.type === "success") colorClass = "text-emerald-500 font-medium";
                        if (line.type === "accent") colorClass = "text-amber-500 font-medium";
                        if (line.type === "error") colorClass = "text-destructive";
                        
                        return (
                          <p key={idx} className={colorClass}>
                            {line.text}
                          </p>
                        );
                      })}
                      
                      {/* Active Input Line */}
                      <form onSubmit={handleTerminalSubmit} className="flex items-center text-primary font-medium">
                        <span>$ &nbsp;</span>
                        <input
                          ref={inputRef}
                          type="text"
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          className="bg-transparent border-none outline-none flex-1 font-mono font-normal p-0 m-0 text-card-foreground caret-primary"
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
              <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 font-medium">
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${isInstalling ? "bg-amber-500 animate-ping" : "bg-emerald-500"}`} />
                  {isInstalling ? "Fetching core modules..." : "Environment online"}
                </span>
                <span className="text-muted-foreground/60 font-medium">Node20 / pnpm v9</span>
              </div>

            </div>
          </motion.div>

        </div>
      </motion.header>
    </>
  );
};

export default Header;