"use client";

import React, { useState, useEffect, JSX } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFacebook, FaArrowUp } from 'react-icons/fa';

// Define the interface for social links
interface SocialLink {
  icon: JSX.Element;
  link: string;
}

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const currentYear: number = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Explicitly typing the date parameter
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, link: "https://github.com/iktushar01" },
    { icon: <FaFacebook />, link: "https://facebook.com/iktushar01" }
  ];

  return (
    <footer className="relative bg-background text-muted-foreground py-12 border-t border-border/50 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* LEFT: System Status */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
                System_Live // v2.0.26
              </span>
            </div>
            <p className="text-sm font-light tracking-widest text-foreground/80 uppercase">
              © {currentYear} <span className="text-primary font-bold uppercase">Ibrahim Khalil Tushar</span>
            </p>
          </div>

          {/* CENTER: Social Cluster */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "var(--primary)" }}
                  className="text-xl transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-[10px] font-mono tracking-tighter opacity-40 uppercase">MERN_STACK_ENGINEER // DHAKA_BD</p>
          </div>

          {/* RIGHT: Time & Top Button */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="text-right font-mono">
              <span className="text-[10px] block text-muted-foreground uppercase tracking-widest">Runtime_Clock</span>
              <span className="text-lg text-foreground font-bold">
                {mounted ? formatTime(currentTime) : "--:--:--"}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "var(--primary)" }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-3 bg-foreground/5 border border-border rounded-lg transition-all"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-foreground group-hover:text-background" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
            <p className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-[0.8em]">
                Built_with_Love
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
