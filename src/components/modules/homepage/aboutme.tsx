"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { FaCode, FaPaintBrush, FaBook, FaGamepad } from "react-icons/fa";
import { FiZap, FiTarget, FiStar } from "react-icons/fi";

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface StoryItem {
  icon: ReactNode;
  colorClass: string; 
  title: string;
  content: string;
}

interface ApproachItem {
  skill: string;
  level: number;
  colorClass: string;
}

// ─── Background Polka Dots ──────────────────────────────────────────────────
const BgDots: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05]"
    style={{ 
      backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)", 
      backgroundSize: "40px 40px" 
    }} 
  />
);

// ─── Enhanced Tilt Card ─────────────────────────────────────────────────────
const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 20 });
  const sry = useSpring(ry, { stiffness: 300, damping: 20 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return; // Disable tilt on mobile for better UX
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };

  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={move} 
      onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Story Card Component ───────────────────────────────────────────────────
const StoryCard: React.FC<{ item: StoryItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, delay: index * 0.1 }}
    >
      <TiltCard>
        <div className="group relative rounded-[2rem] border-[4px] border-black bg-white dark:bg-zinc-900 p-5 sm:p-7 flex flex-col sm:flex-row gap-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl border-[4px] border-black flex items-center justify-center text-3xl ${item.colorClass} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-12 transition-transform`}>
            {item.icon}
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">
              {item.title}
            </h3>
            <p className="text-base font-bold text-muted-foreground leading-tight">
              {item.content}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Main About Section ─────────────────────────────────────────────────────
const AboutMe: React.FC = () => {
  const stories: StoryItem[] = [
    {
      icon: <FaCode />,
      colorClass: "bg-blue-500",
      title: "The Code Smith",
      content: "Building digital kingdoms with the MERN stack. I turn coffee into clean, scalable architectures.",
    },
    {
      icon: <FaPaintBrush />,
      colorClass: "bg-pink-500",
      title: "UI Artisan",
      content: "Aesthetics meet logic. I obsess over pixels, ensuring every interaction feels like a breeze.",
    },
    {
      icon: <FaGamepad />,
      colorClass: "bg-yellow-500",
      title: "Level 99 Gamer",
      content: "Tactical precision in Valorant, survival instincts in PUBG. Gaming fuels my strategic thinking.",
    },
  ];

  const approaches: ApproachItem[] = [
    { skill: "Logic Crafting", level: 92, colorClass: "bg-cyan-400" },
    { skill: "Pixel Perfection", level: 88, colorClass: "bg-purple-500" },
    { skill: "Data Sorcery", level: 85, colorClass: "bg-emerald-400" },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-32 px-4 overflow-hidden bg-background">
      <BgDots />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        
        {/* Section Title */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-block px-6 py-2 border-[3px] border-black bg-yellow-400 text-black font-black uppercase italic text-sm mb-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] -rotate-2"
          >
            Who is this guy?
          </motion.div>
          <h2 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase italic leading-none drop-shadow-[6px_6px_0_rgba(0,0,0,1)]">
            ABOUT <span className="text-primary">ME!</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Story Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {stories.map((item, index) => (
              <StoryCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Right Column: Stats & Meta (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <TiltCard>
              <div className="bg-white dark:bg-zinc-900 border-[4px] border-black rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 rounded-full bg-black dark:bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                    <FiStar className="text-yellow-400 text-2xl" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic">Skill Levels</h3>
                </div>

                <div className="space-y-8">
                  {approaches.map((item, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between font-black uppercase text-sm mb-3">
                        <span className="tracking-widest">{item.skill}</span>
                        <span className="bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded italic">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-8 w-full bg-zinc-100 dark:bg-zinc-800 border-[3px] border-black rounded-xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <motion.div
                          className={`h-full ${item.colorClass} border-r-[3px] border-black relative`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ type: "spring", bounce: 0.3, duration: 2, delay: index * 0.2 }}
                        >
                          {/* Striped Pattern Overlay */}
                          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: "XP Points", value: "1.5y", color: "bg-orange-400" },
                { label: "Missions", value: "12+", color: "bg-green-400" },
                { label: "Stamina", value: "100%", color: "bg-blue-400" },
                { label: "Rank", value: "PRO", color: "bg-pink-400" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, rotate: i % 2 === 0 ? 2 : -2 }}
                  className={`${stat.color} border-[4px] border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <p className="text-[10px] font-black uppercase text-black/60">{stat.label}</p>
                  <p className="text-3xl font-black text-black italic leading-none">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Fun Tags */}
            <div className="flex flex-wrap gap-3 justify-center">
              {["Coffee Addict", "Night Owl", "Fast Learner", "Team Player"].map((tag, i) => (
                <span 
                  key={i}
                  className="bg-zinc-100 dark:bg-zinc-800 border-[3px] border-black px-4 py-1.5 rounded-full font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;