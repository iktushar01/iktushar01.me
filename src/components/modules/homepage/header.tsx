"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaFileDownload, FaEye, FaReact, FaNodeJs, FaCode } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiTypescript, SiNextdotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springSnappy, springSoft, easeInOut } from "@/lib/motion";
import { Rocket, Terminal, ChevronRight } from "lucide-react";

const RESUME_PDF_PATH = "/resume.pdf";
const CV_DOC_URL = "https://drive.google.com/file/d/1kDBaB5KUNH5UAQdH_rf_ps6SyojpBALF/view?usp=sharing";

const floatingIcon: Variants = {
  animate: (i: number) => ({
    y: [0, -12, 0],
    rotate: [0, i % 2 === 0 ? 3 : -3, 0],
    transition: {
      duration: 4 + i * 0.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <motion.header
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeInOut.ease }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 lg:px-12 py-24 lg:py-0"
    >
      {/* Modern Brutalist Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] bg-primary/10 blur-[120px] rounded-full" />
      </div>

      {/* Floating Tech Stack Background Icons */}
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
        
        {/* Left Column: Bio & Info */}
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

            {/* Main Speech Bubble Card */}
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 pt-2">
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

        {/* Right Column: Fixed Code IDE Window (No ESLint errors) */}
        <motion.div 
          className="flex-1 w-full max-w-lg hidden lg:block relative"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ ...springSoft, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-primary border-4 border-border rounded-[var(--radius-cartoon-lg)] translate-x-3 translate-y-3" />
          
          <div className="w-full bg-[#1e1e2e] text-[#cdd6f4] border-4 border-border rounded-[var(--radius-cartoon-lg)] p-5 relative z-10 shadow-cartoon-md font-mono text-sm leading-relaxed">
            {/* Window controls header */}
            <div className="flex items-center justify-between border-b-2 border-border/30 pb-3 mb-4">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#f38ba8]" />
                <span className="w-3 h-3 rounded-full bg-[#f9e2af]" />
                <span className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-bold">
                <FaCode className="text-primary size-3.5" /> developer.ts
              </span>
            </div>

            {/* Code Body Content safely wrapped in JS expressions */}
            <div className="space-y-1 text-xs sm:text-sm">
              <p><span className="text-[#cba6f7]">const</span> <span className="text-[#89b4fa]">developer</span> = {"{"}</p>
              <p className="pl-4"><span className="text-[#eba0ac]">name</span>: <span className="text-[#a6e3a1]">&quot;Ibrahim Khalil Tushar&quot;</span>,</p>
              <p className="pl-4"><span className="text-[#eba0ac]">role</span>: <span className="text-[#a6e3a1]">&quot;Full Stack Developer&quot;</span>,</p>
              <p className="pl-4"><span className="text-[#eba0ac]">speciality</span>: [<span className="text-[#a6e3a1]">&quot;MERN&quot;</span>, <span className="text-[#a6e3a1]">&quot;Next.js&quot;</span>],</p>
              <p className="pl-4"><span className="text-[#eba0ac]">passions</span>: [</p>
              <p className="pl-8"><span className="text-[#a6e3a1]">&quot;Clean Code&quot;</span>,</p>
              <p className="pl-8"><span className="text-[#a6e3a1]">&quot;UI/UX Design&quot;</span>,</p>
              <p className="pl-8"><span className="text-[#a6e3a1]">&quot;Performance Optimization&quot;</span></p>
              <p className="pl-4">],</p>
              <p className="pl-4"><span className="text-[#f9e2af]">isAvailable</span>: <span className="text-[#fab387]">true</span></p>
              <p>{"};"}</p>
              
              <div className="pt-4 border-t border-border/20 mt-4 flex items-center justify-between text-muted-foreground text-xs">
                <span className="text-[#a6e3a1] flex items-center gap-1"><ChevronRight className="size-3" /> Ready to build</span>
                <span className="text-[#f9e2af]">UTF-8</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.header>
  );
};

export default Header;