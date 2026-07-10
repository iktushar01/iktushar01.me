"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { springSoft, easeInOut } from "@/lib/motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroTerminal from "@/components/modules/homepage/hero-terminal";

const RESUME_PDF_PATH = "/Ibrahim_Khalil_Tushar_Resume.pdf";
const CV_DOC_URL = "https://drive.google.com/file/d/1iN_l8gCrnPxz86haoGZsqoM7Tc50kWAG/view?usp=sharing";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...springSoft, delay: 0.05 * i },
  }),
};

const meta = [
  { k: "Role", v: "Fullstack Web Developer" },
  { k: "Stack", v: "MERN, Next.js, TypeScript" },
  { k: "Based", v: "Gazipur, Bangladesh" },
  { k: "Status", v: "Open to work" },
];

const inlineSocials = [
  { Icon: FaGithub, url: "https://github.com/iktushar01", label: "GitHub" },
  { Icon: FaLinkedinIn, url: "https://linkedin.com/in/iktushar01", label: "LinkedIn" },
  { Icon: FaFacebook, url: "https://facebook.com/iktushar01", label: "Facebook" },
  { Icon: FaInstagram, url: "https://instagram.com/iktushar01", label: "Instagram" },
  { Icon: FaYoutube, url: "https://youtube.com/@iktushar01", label: "YouTube" },
];

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
      className="relative flex min-h-screen flex-col bg-background text-foreground px-4 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-6 sm:pb-8 lg:pb-10 overflow-x-hidden"
    >

      {/* Main wordmark + terminal — grows to fill viewport */}
      <div className="flex flex-1 flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10 py-4 sm:py-6 min-w-0">
        <div className="flex flex-col justify-start min-w-0">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="text-sm sm:text-base font-medium text-primary mb-4 tracking-tight"
          >
            Md. Ibrahim Khalil Tushar
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="text-[clamp(2.25rem,10.5vw,6.5rem)] sm:text-[clamp(2.5rem,9vw,7rem)] font-semibold tracking-tighter leading-[0.9] text-foreground break-words"
          >
            Fullstack
            <br />
            Web Developer<span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed border-l border-border pl-5"
          >
            I build production web applications with the MERN stack and
            Next.js &mdash; resilient backends, considered interfaces, and code
            that holds up after the demo ends.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={4}
            variants={fadeUp}
            className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground font-medium text-sm rounded-none px-5 sm:px-6 h-11 hover:bg-primary/90 transition-colors duration-200"
            >
              <a href={RESUME_PDF_PATH} download="Ibrahim Khalil Tushar.pdf">
                Download Resume <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent text-foreground border-border font-medium text-sm rounded-none px-5 sm:px-6 h-11 hover:bg-muted transition-colors duration-200"
            >
              <a href={CV_DOC_URL} target="_blank" rel="noopener noreferrer">
                View Resume <ArrowUpRight className="ml-2 size-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        <HeroTerminal />
      </div>

      {/* Bottom cards: metadata + socials */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={5}
        variants={fadeUp}
        className="mt-auto w-full shrink-0"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {meta.map((item, idx) => (
            <div
              key={item.k}
              className="group relative border border-border bg-muted/20 backdrop-blur-sm p-4 sm:p-5 transition-colors duration-200 hover:border-primary/35 hover:bg-muted/35"
            >
              <span className="absolute top-0 left-0 w-8 h-px bg-primary/60 group-hover:w-full transition-all duration-300" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
                {String(idx + 1).padStart(2, "0")} / {item.k}
              </span>
              <p className="mt-2 text-sm sm:text-[15px] font-medium text-foreground tracking-tight leading-snug break-words">
                {item.k === "Status" ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex size-2 shrink-0">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                    </span>
                    {item.v}
                  </span>
                ) : (
                  item.v
                )}
              </p>
            </div>
          ))}
        </div>

        {/* Socials card */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-muted/20 backdrop-blur-sm p-4 sm:px-5 sm:py-4 transition-colors duration-200 hover:border-primary/25">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 shrink-0">
            Elsewhere
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {inlineSocials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center border border-border bg-background/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors duration-200 text-sm"
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;