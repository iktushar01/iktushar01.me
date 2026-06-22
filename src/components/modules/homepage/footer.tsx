"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaArrowUp, FaLinkedinIn } from "react-icons/fa";
import { springSnappy } from "@/lib/motion";

interface SocialLink {
  icon: JSX.Element;
  link: string;
}

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const currentYear: number = new Date().getFullYear();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, link: "https://github.com/iktushar01" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/iktushar01" },
    { icon: <FaFacebook />, link: "https://facebook.com/iktushar01" },
  ];

  return (
    <footer className="relative bg-background py-12 border-t border-border overflow-hidden">
      {/* GRID PATTERN BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:24px_24px] text-foreground" />
      </div>

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          {/* LEFT: BRANDING & META */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 mb-3 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              <span className="font-medium text-[9px] uppercase tracking-wider">System Operational</span>
            </div>
            
            <p className="text-lg font-medium tracking-tight text-foreground">
              © {currentYear}{" "}
              <span className="text-primary hover:underline cursor-pointer">iktushar01.me</span>
            </p>
            <p className="mt-1 font-mono text-[10px] font-normal text-muted-foreground tracking-wide uppercase">
              Hand-coded in Dhaka, BD
            </p>
          </div>

          {/* MIDDLE: SOCIAL EMBEDS */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={springSnappy}
                  className="w-11 h-11 bg-card text-muted-foreground border border-border flex items-center justify-center text-lg shadow-sm hover:border-primary/50 hover:text-primary transition-all duration-200 rounded-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="bg-muted text-muted-foreground border border-border/60 px-2.5 py-0.5 font-medium text-[9px] uppercase tracking-wider rounded-md">
              Full-Stack Developer
            </div>
          </div>

          {/* RIGHT: LIVE METRICS & BACK-TO-TOP */}
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="text-center md:text-right">
              <span className="text-[9px] font-medium uppercase tracking-wider text-primary">Local Timestamp</span>
              <div className="bg-muted/50 border border-border px-3 py-1.5 shadow-sm rounded-xl mt-1 min-w-[96px]">
                <span className="text-base sm:text-lg font-medium font-mono tabular-nums text-foreground">
                  {mounted ? formatTime(currentTime) : "00:00:00"}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
              onClick={scrollToTop}
              className="p-3 bg-primary text-primary-foreground border border-primary/20 shadow-sm hover:opacity-90 transition-all duration-200 rounded-xl"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        {/* REFINED BOTTOM DIVIDER */}
        <div className="mt-10 pt-4 border-t border-border/40 flex flex-col items-center">
          <p className="text-[8px] font-medium text-muted-foreground/50 uppercase tracking-[0.5em]">
            EndOfLine
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;