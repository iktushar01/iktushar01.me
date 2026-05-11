"use client";

import React, { useState, useEffect, JSX } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFacebook, FaArrowUp } from 'react-icons/fa';

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
    <footer className="relative bg-background py-16 border-t-[8px] border-black overflow-hidden">
      {/* Cartoon Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          
          {/* LEFT: Identity Sticker */}
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-green-400 border-[4px] border-black px-4 py-1 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-black animate-pulse" />
                    <span className="font-black text-[10px] uppercase tracking-widest text-black">
                        System_Operational
                    </span>
                </div>
            </div>
            <p className="text-2xl font-black uppercase italic leading-none text-foreground drop-shadow-[2px_2px_0_#fff]">
              © {currentYear} <span className="text-primary underline decoration-[6px] decoration-black/10">Tushar.Dev</span>
            </p>
            <p className="mt-2 font-mono text-[10px] font-bold uppercase opacity-60">Hand-coded in Dhaka_BD</p>
          </div>

          {/* CENTER: Social Slab */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-white dark:bg-zinc-900 border-[4px] border-black flex items-center justify-center text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-primary hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase italic tracking-widest">
                Full-Stack_Maverick
            </div>
          </div>

          {/* RIGHT: Time & Plunger Button */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Local_Timestamp</span>
              <div className="bg-zinc-100 dark:bg-zinc-800 border-[4px] border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-2xl font-black font-mono">
                   {mounted ? formatTime(currentTime) : "00:00:00"}
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -5, boxShadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
              whileTap={{ y: 5, boxShadow: "none" }}
              onClick={scrollToTop}
              className="p-5 bg-primary border-[4px] border-black text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              aria-label="Scroll to top"
            >
              <FaArrowUp size={24} className="stroke-[20px]" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 pt-8 border-t-[4px] border-black/5 flex flex-col items-center gap-2">
            <p className="text-[10px] font-black text-black/20 uppercase tracking-[1em]">
                EndOfLine
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;