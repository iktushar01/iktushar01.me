"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { FaCode, FaPaintBrush, FaBook } from "react-icons/fa";
import { FiZap, FiTarget, FiTrendingUp } from "react-icons/fi";

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
  icon: ReactNode;
}

interface FunFactItem {
  emoji: string;
  text: string;
}

// ─── BG Polka Dots (Cartoon Style) ──────────────────────────────────────────
const BgDots: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.15]"
    style={{ 
      backgroundImage: "radial-gradient(#000 2px, transparent 2px)", 
      backgroundSize: "30px 30px" 
    }} 
  />
);

// ─── Tilt Card (Enhanced for Cartoon) ────────────────────────────────────────
const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 15 }); // Snappier
  const sry = useSpring(ry, { stiffness: 300, damping: 15 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 15);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
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

// ─── Story card (Sticker Look) ────────────────────────────────────────────────
const StoryCard: React.FC<{ item: StoryItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
    >
      <TiltCard>
        <div className="relative rounded-3xl border-4 border-black bg-white dark:bg-zinc-900 p-6 flex gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border-4 border-black flex items-center justify-center text-2xl ${item.colorClass} text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
            {item.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black mb-1 font-handwritten italic tracking-wide drop-shadow-sm">
              {item.title}
            </h3>
            <p className="text-sm font-bold opacity-80 leading-snug">{item.content}</p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AboutMe: React.FC = () => {
  const stories: StoryItem[] = [
    {
      icon: <FaCode />,
      colorClass: "bg-blue-500",
      title: "My Coding Journey",
      content: "Started with a simple 'Hello World', now I'm architecting full-scale MERN adventures!",
    },
    {
      icon: <FaPaintBrush />,
      colorClass: "bg-pink-500",
      title: "Design & Logic",
      content: "I believe code should work perfectly and look like a masterpiece at the same time.",
    },
    {
      icon: <FaBook />,
      colorClass: "bg-yellow-500",
      title: "Gamer Spirit",
      content: "When the IDE closes, the gaming rig glows. Valorant and PUBG fuel my competitive edge.",
    },
  ];

  const approaches: ApproachItem[] = [
    { skill: "Clean Code", level: 90, colorClass: "bg-blue-500", icon: <FiZap /> },
    { skill: "Problem Solving", level: 85, colorClass: "bg-red-500", icon: <FiTarget /> },
    { skill: "Modern UI", level: 95, colorClass: "bg-purple-500", icon: <FaPaintBrush /> },
  ];

  return (
    <section id="about" className="relative py-24 px-6 bg-background overflow-hidden">
      <BgDots />
      
      {/* Cartoon Glow Blobs */}
      <div className="absolute top-1/4 -right-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <span className="inline-block px-4 py-1 border-2 border-black bg-white font-black text-xs uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            — The Player Profile
          </span>
          <h2 className="text-6xl md:text-8xl font-black font-handwritten drop-shadow-[6px_6px_0_rgba(0,0,0,1)]">
            ABOUT <span className="text-primary italic">ME!</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Story Cards */}
          <div className="space-y-8">
            {stories.map((item, index) => (
              <StoryCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Right Column: Stats & Fun Facts */}
          <div className="space-y-10">
            <TiltCard>
              <div className="bg-white dark:bg-zinc-900 border-4 border-black rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-secondary border-4 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <FiTarget size={24} />
                  </div>
                  <h3 className="text-3xl font-black font-handwritten uppercase tracking-tighter">My Stats</h3>
                </div>

                <div className="space-y-6">
                  {approaches.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between font-black uppercase text-sm">
                        <span>{item.skill}</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 border-4 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <motion.div
                          className={`h-full ${item.colorClass} border-r-4 border-black`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* Fun Fact Stickers */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {[
                { emoji: "🎮", text: "Gamer", color: "bg-green-400" },
                { emoji: "🌍", text: "BD", color: "bg-blue-400" },
                { emoji: "🎓", text: "CSE", color: "bg-yellow-400" },
                { emoji: "🏆", text: "GPA 5", color: "bg-orange-400" },
              ].map((fact, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 5 : -5 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-4 border-black ${fact.color} font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                >
                  <span>{fact.emoji}</span> {fact.text}
                </motion.div>
              ))}
            </div>

            {/* Big Stat Boxes */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val: "1+", lab: "YEARS" },
                { val: "10+", lab: "TOOLS" },
                { val: "3+", lab: "PROJECTS" },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 border-4 border-black p-4 rounded-2xl text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform">
                  <div className="text-3xl font-black text-primary font-handwritten">{stat.val}</div>
                  <div className="text-[10px] font-black uppercase tracking-tighter">{stat.lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;