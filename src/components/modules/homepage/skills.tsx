"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaFire, FaWordpress, FaPython, FaPaintBrush
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJavascript, SiPostman, 
  SiJsonwebtokens, SiTypescript, SiNextdotjs, SiPostgresql, 
  SiPrisma, SiFigma, SiNotion
} from "react-icons/si";
import { FiZap, FiCode, FiDatabase, FiTool } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: ReactNode;
  color: string;
  level: number;
}

interface SkillGroup {
  id: number;
  category: string;
  icon: ReactNode;
  color: string;
  description: string;
  skills: Skill[];
}

const skillsData: SkillGroup[] = [
  {
    id: 1,
    category: "Frontend",
    icon: <FiCode />,
    color: "#3B82F6", // Blue
    description: "Making the web look pretty and stay snappy with modern frameworks.",
    skills: [
      { name: "React", icon: <FaReact />, color: "#61DAFB", level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", level: 85 },
      { name: "TS", icon: <SiTypescript />, color: "#3178C6", level: 80 },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8", level: 85 },
    ],
  },
  {
    id: 2,
    category: "Backend",
    icon: <FiZap />,
    color: "#EF4444", // Red
    description: "The secret sauce behind the scenes that keeps everything running.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#68A063", level: 85 },
      { name: "Express", icon: <SiExpress />, color: "#828282", level: 80 },
      { name: "Python", icon: <FaPython />, color: "#3776AB", level: 75 },
      { name: "JWT", icon: <SiJsonwebtokens />, color: "#FB923C", level: 75 },
    ],
  },
  {
    id: 3,
    category: "Data",
    icon: <FiDatabase />,
    color: "#10B981", // Green
    description: "Organizing bits and bytes into powerful, structured logic.",
    skills: [
      { name: "Postgres", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", level: 85 },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8", level: 85 },
      { name: "Firebase", icon: <FaFire />, color: "#FFA000", level: 80 },
    ],
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 15 });
  const sry = useSpring(ry, { stiffness: 300, damping: 15 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 15);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SkillSticker: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 5, y: -5 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
      className="group relative bg-white dark:bg-zinc-800 border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-2 min-w-[100px]"
    >
      <div className="text-3xl" style={{ color: skill.color }}>{skill.icon}</div>
      <span className="text-[10px] font-black uppercase tracking-tight">{skill.name}</span>
      
      {/* Cartoon Progress Bar */}
      <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 border-2 border-black rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: delay + 0.3, type: "spring" }}
          className="h-full border-r-2 border-black"
          style={{ backgroundColor: skill.color }}
        />
      </div>
    </motion.div>
  );
};

const SkillGroupSection: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={cn(
        "flex flex-col lg:flex-row items-center gap-10",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Chunky Category Badge */}
      <div className="lg:w-1/3 flex justify-center">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="w-40 h-40 rounded-full border-8 border-black flex flex-col items-center justify-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          style={{ backgroundColor: group.color }}
        >
          <div className="text-6xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">{group.icon}</div>
          <span className="font-black text-white uppercase tracking-tighter text-sm drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
            {group.category}
          </span>
        </motion.div>
      </div>

      {/* Skills Container */}
      <div className="w-full lg:w-2/3">
        <TiltCard>
          <div className="bg-white dark:bg-zinc-900 border-4 border-black rounded-[2.5rem] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
            <h3 className="text-4xl font-black font-handwritten mb-4 italic drop-shadow-sm">
              {group.category} <span className="text-primary italic">Stuff</span>
            </h3>
            <p className="text-lg font-bold opacity-80 mb-8 leading-tight">
              {group.description}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {group.skills.map((skill, i) => (
                <SkillSticker key={skill.name} skill={skill} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 px-6 bg-background overflow-hidden">
      {/* Cartoon Polka Dots */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <header className="text-center mb-24">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="inline-block px-6 py-2 border-4 border-black bg-yellow-400 font-black text-sm uppercase mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-2"
          >
            My Power Ups! ⚡
          </motion.div>
          <h2 className="text-7xl md:text-9xl font-black font-handwritten drop-shadow-[8px_8px_0_rgba(0,0,0,1)] tracking-tighter">
            TECH <span className="text-primary italic">STACK</span>
          </h2>
        </header>

        <div className="space-y-32">
          {skillsData.map((group, index) => (
            <SkillGroupSection key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* Bouncy Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            { label: "XP Categories", value: "04", color: "bg-blue-400" },
            { label: "Mastered Tools", value: "20+", color: "bg-green-400" },
            { label: "Leveling Since", value: "2023", color: "bg-purple-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
              className={cn(
                "p-8 rounded-[2rem] border-4 border-black text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
                stat.color
              )}
            >
              <div className="text-6xl font-black text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] mb-2 font-handwritten">
                {stat.value}
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-black/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;