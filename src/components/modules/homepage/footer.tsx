"use client";

import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaArrowUp } from "react-icons/fa";
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
    { icon: <FaFacebook />, link: "https://facebook.com/iktushar01" },
  ];

  return (
    <footer className="relative bg-background py-16 border-t-4 border-border overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px] text-foreground" />
      </div>

      <div className="lp-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-accent text-accent-foreground border-4 border-border px-3 py-1 mb-3 shadow-cartoon-sm -rotate-1 rounded-[var(--radius-sticker)]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-current opacity-80 animate-pulse" />
                <span className="font-black text-[10px] uppercase tracking-widest">System_Operational</span>
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-black uppercase italic leading-none text-foreground">
              © {currentYear}{" "}
              <span className="text-primary underline decoration-border decoration-4 underline-offset-2">iktushar01.me</span>
            </p>
            <p className="mt-2 font-mono text-[10px] font-bold uppercase text-muted-foreground tracking-wide">
              Hand-coded in Dhaka_BD
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.link}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 3 : -3 }}
                  whileTap={{ scale: 0.94 }}
                  transition={springSnappy}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-card text-card-foreground border-4 border-border flex items-center justify-center text-xl sm:text-2xl shadow-cartoon-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-200 rounded-[var(--radius-sticker)]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="bg-foreground text-background px-3 py-1 font-black text-[10px] uppercase italic tracking-widest border-2 border-border rounded-[var(--radius-sticker)]">
              Full-Stack_Maverick
            </div>
          </div>

          <div className="flex items-center gap-6 sm:gap-8">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-tight text-primary">Local_Timestamp</span>
              <div className="bg-muted border-4 border-border px-3 py-2 shadow-cartoon-sm rounded-[var(--radius-sticker)] mt-1">
                <span className="text-xl sm:text-2xl font-black font-mono tabular-nums">
                  {mounted ? formatTime(currentTime) : "00:00:00"}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={springSnappy}
              onClick={scrollToTop}
              className="p-4 sm:p-5 bg-primary text-primary-foreground border-4 border-border shadow-cartoon-md hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 rounded-[var(--radius-sticker)]"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={22} />
            </motion.button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-2 border-border/30 flex flex-col items-center gap-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">EndOfLine</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
