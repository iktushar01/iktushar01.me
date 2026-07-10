"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FaFileDownload, FaEye, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springSnappy, springSoft, easeInOut } from "@/lib/motion";
import { Rocket, Layers, Cpu, Database, ArrowUpRight } from "lucide-react";

const RESUME_PDF_PATH = "/Ibrahim_Khalil_Tushar_Resume.pdf";
const CV_DOC_URL = "https://drive.google.com/file/d/1kDBaB5KUNH5UAQdH_rf_ps6SyojpBALF/view?usp=sharing";

const floatingIcon: Variants = {
  animate: (i: number) => ({
    y: [0, -8, 0],
    x: [0, i % 2 === 0 ? 4 : -4, 0],
    transition: {
      duration: 5 + i * 0.5,
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
      transition={{ duration: 0.5, ease: easeInOut.ease }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-8 lg:px-16 py-24 xl:py-0"
    >
      {/* Premium Neo-Brutalist Grid Structure */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] bg-[radial-gradient(#808080_1.5px,transparent_1.5px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-12 z-20 relative">
        
        {/* Left Section: Heavy Headline & Structural Speech Frame */}
        <div className="flex-1 text-center lg:text-left space-y-8 w-full max-w-2xl">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springSoft}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <Badge className="px-4 py-1.5 border-4 border-border bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-cartoon-sm rounded-[var(--radius-sticker)] gap-2">
                AVAILABLE FOR HIRE <Rocket className="size-3.5" />
              </Badge>
              <div className="h-1 flex-1 bg-border hidden lg:block rounded-full max-w-[100px]" />
            </motion.div>

            {/* Asymmetric Dynamic Typographic Title */}
            <h1 className="text-6xl sm:text-8xl xl:text-[8.5rem] font-black tracking-tighter leading-[0.82] drop-shadow-cartoon select-none">
              <span className="text-yellow-400 block lg:inline-block">TUSHAR</span>
              <span className="text-primary italic font-light ml-1">!</span>
            </h1>
          </div>

          {/* Interactive Layered Block */}
          <div className="relative group max-w-xl mx-auto lg:mx-0">
            {/* Ambient decorative backdrop accent box */}
            <div className="absolute inset-0 bg-yellow-400 border-4 border-border rounded-[var(--radius-cartoon-lg)] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-200" />
            
            <div className="relative bg-card text-card-foreground border-4 border-border p-6 sm:p-8 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md transition-all duration-200">
              <h3 className="text-xl sm:text-2xl font-black mb-3 uppercase italic tracking-tight text-foreground flex items-center justify-center lg:justify-start gap-2">
                Fullstack MERN & Next.js Dev
              </h3>
              <p className="text-base sm:text-lg font-semibold leading-relaxed text-muted-foreground">
                I architect{" "}
                <span className="text-foreground underline decoration-primary decoration-4 underline-offset-4 font-bold">
                  high-performance
                </span>{" "}
                web applications. Specialist in crafting pixel-perfect UIs with
                <span className="text-primary font-bold italic"> Next.js</span> & scalable
                backends with <span className="text-primary font-bold italic">Node.js</span>.
              </p>
            </div>
          </div>

          {/* Clean Interactive Action Deck */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy} className="w-full sm:w-auto">
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

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={springSnappy} className="w-full sm:w-auto">
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

        {/* Right Section: The Feature Dashboard Matrix */}
        <div className="flex-1 w-full max-w-lg hidden lg:block relative pl-6">
          
          {/* Main Container Stack */}
          <div className="space-y-4">
            
            {/* Slot 1: Frontend Stack Layer */}
            <motion.div 
              custom={1} variants={floatingIcon} animate="animate"
              className="bg-card border-4 border-border p-4 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-sm flex items-center justify-between group hover:-translate-x-1 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 border-2 border-border rounded-xl text-blue-500">
                  <Layers className="size-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wide">Client Infrastructure</h4>
                  <p className="text-xs font-bold text-muted-foreground flex items-center gap-2 mt-0.5">
                    <SiNextdotjs className="inline text-foreground" /> Next.js &bull; <FaReact className="inline text-sky-400" /> React &bull; <SiTailwindcss className="inline text-teal-400" /> Tailwind
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Slot 2: Backend Architecture Layer */}
            <motion.div 
              custom={2} variants={floatingIcon} animate="animate"
              className="bg-card border-4 border-border p-4 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-sm flex items-center justify-between translate-x-4 group hover:translate-x-3 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 border-2 border-border rounded-xl text-green-500">
                  <Cpu className="size-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wide">Logic &amp; Execution</h4>
                  <p className="text-xs font-bold text-muted-foreground flex items-center gap-2 mt-0.5">
                    <FaNodeJs className="inline text-green-500" /> Node.js &bull; REST APIs &bull; Scalable Microservices
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            {/* Slot 3: Data Management Layer */}
            <motion.div 
              custom={3} variants={floatingIcon} animate="animate"
              className="bg-card border-4 border-border p-4 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-sm flex items-center justify-between group hover:-translate-x-1 transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 border-2 border-border rounded-xl text-emerald-500">
                  <Database className="size-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-wide">Persistence Matrix</h4>
                  <p className="text-xs font-bold text-muted-foreground flex items-center gap-2 mt-0.5">
                    <SiMongodb className="inline text-emerald-500" /> MongoDB &bull; Document Warehousing &bull; Optimization
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

          </div>

          {/* Large Abstract Geometric Backdrop Framing Accent */}
          <div className="absolute -z-10 bottom-6 right-6 w-44 h-44 border-4 border-dashed border-primary/40 rounded-full animate-spin duration-[40s]" />
        </div>

      </div>
    </motion.header>
  );
};

export default Header;