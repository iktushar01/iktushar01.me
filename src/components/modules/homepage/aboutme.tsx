"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaCode, FaPaintBrush, FaBook } from "react-icons/fa";
import { FiZap, FiTarget, FiTrendingUp } from "react-icons/fi";

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface StoryItem {
  icon: ReactNode;
  colorClass: string; // Using Tailwind classes for theme colors
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

// ─── BG Grid ──────────────────────────────────────────────────────────────────
const BgGrid: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
    style={{ 
      backgroundImage: "radial-gradient(circle, var(--secondary) 1px, transparent 1px)", 
      backgroundSize: "40px 40px" 
    }} 
  />
);

// ─── Glitch Text ──────────────────────────────────────────────────────────────
const GlitchText: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{children}</span>
    <span 
      aria-hidden 
      className="absolute inset-0 text-secondary opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}
    >
      {children}
    </span>
    <span 
      aria-hidden 
      className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}
    >
      {children}
    </span>
  </span>
);

// ─── Tilt Card ────────────────────────────────────────────────────────────────
const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
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

// ─── Animated progress bar ────────────────────────────────────────────────────
const ProgressBar: React.FC<{ level: number; colorClass: string; delay?: number }> = ({ level, colorClass, delay = 0 }) => (
  <div className="w-full bg-foreground/10 rounded-full h-1.5 overflow-hidden">
    <motion.div
      className={`h-full rounded-full ${colorClass}`}
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: "easeOut", delay }}
    />
  </div>
);

// ─── Story card ───────────────────────────────────────────────────────────────
const StoryCard: React.FC<{ item: StoryItem; index: number }> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <TiltCard>
        <motion.div
          className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-md overflow-hidden p-5 md:p-6 flex gap-4"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Hover Overlay */}
          <motion.div
            className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${item.colorClass}/10`}
            style={{ opacity: hovered ? 0.1 : 0 }}
          />
          
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.colorClass}`} />

          <motion.div
            className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-xl mt-0.5 border border-border bg-muted ${hovered ? item.colorClass + ' text-white' : 'text-foreground'}`}
            animate={hovered ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }}
          >
            {item.icon}
          </motion.div>

          <div className="flex-1 min-w-0" style={{ transform: "translateZ(8px)" }}>
            <h3 className="text-base font-bold mb-1.5 tracking-tight font-syne text-foreground">
              <GlitchText>{item.title}</GlitchText>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

// ─── Approach stat row ────────────────────────────────────────────────────────
const ApproachRow: React.FC<{ item: ApproachItem; index: number }> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        whileHover={{ x: 5 }}
        className="p-4 rounded-xl border border-border bg-muted/30 backdrop-blur-sm transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${item.colorClass} text-white`}>
              {item.icon}
            </div>
            <span className="text-sm font-semibold text-foreground/80">{item.skill}</span>
          </div>
          <span className="text-sm font-black text-secondary">{item.level}%</span>
        </div>
        <ProgressBar level={item.level} colorClass={item.colorClass} delay={index * 0.1 + 0.4} />
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AboutMe: React.FC = () => {
  const stories: StoryItem[] = [
    {
      icon: <FaCode />,
      colorClass: "bg-secondary",
      title: "My Coding Journey",
      content: "My programming adventure began at college when I built my first website. Since then, I've fallen in love with problem-solving. Currently specializing in the MERN stack, I enjoy creating full-stack applications.",
    },
    {
      icon: <FaPaintBrush />,
      colorClass: "bg-primary",
      title: "Creative Problem Solver",
      content: "I thrive on projects that require both technical skills and creative thinking. Designing intuitive interfaces and architecting backend systems is where I shine.",
    },
    {
      icon: <FaBook />,
      colorClass: "bg-accent",
      title: "Beyond the Keyboard",
      content: "When I'm not coding, you'll find me playing Valorant or PUBG. I believe diverse interests fuel creativity, and I'm active in mentoring aspiring developers.",
    },
  ];

  const approaches: ApproachItem[] = [
    { skill: "Clean Code", level: 90, colorClass: "bg-secondary", icon: <FiZap size={13} /> },
    { skill: "Problem Solving", level: 80, colorClass: "bg-primary", icon: <FiTarget size={13} /> },
    { skill: "UI/UX Design", level: 90, colorClass: "bg-accent", icon: <FaPaintBrush size={11} /> },
    { skill: "Continuous Learning", level: 100, colorClass: "bg-green-500", icon: <FiTrendingUp size={13} /> },
  ];

  const funFacts: FunFactItem[] = [
    { emoji: "🎮", text: "Gamer — Valorant" },
    { emoji: "🌍", text: "Dhaka, Bangladesh" },
    { emoji: "🎓", text: "CSE Undergrad" },
    { emoji: "💡", text: "Full Stack" },
    { emoji: "🏆", text: "GPA 5.00" },
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-4 sm:px-8 bg-background text-foreground overflow-hidden font-dm-sans"
    >
      <BgGrid />
      
      {/* Dynamic Glows using Theme Colors */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary mb-4 block">— Who I Am</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-syne">
            About <span className="text-secondary">Me</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-xs mx-auto">
            A passionate full-stack developer crafting meaningful digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            {stories.map((item, index) => (
              <StoryCard key={index} item={item} index={index} />
            ))}
          </div>

          <div className="space-y-6">
            <TiltCard>
              <div className="relative rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <FiTarget size={16} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight font-syne">My Approach</h3>
                </div>
                <div className="space-y-4">
                  {approaches.map((item, index) => (
                    <ApproachRow key={index} item={item} index={index} />
                  ))}
                </div>
              </div>
            </TiltCard>

            <div className="flex flex-wrap gap-2">
              {funFacts.map((fact, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-muted text-xs font-medium">
                  <span>{fact.emoji}</span> {fact.text}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "1+", label: "Years" },
                { value: "10+", label: "Tools" },
                { value: "3+", label: "Projects" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center py-4 rounded-2xl border border-border bg-card text-center">
                  <span className="text-2xl font-extrabold text-secondary font-syne">{stat.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
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