"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaReact, FaNodeJs, FaGitAlt, FaFire, FaPython
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJsonwebtokens, SiTypescript, SiNextdotjs, SiPostgresql, 
  SiPrisma
} from "react-icons/si";
import { FiZap, FiCode, FiDatabase } from "react-icons/fi";
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
    color: "#3B82F6", 
    description: "Architecting snappy, pixel-perfect interfaces with modern React sorcery.",
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
    color: "#EF4444", 
    description: "The logic engine that handles data flows and keeps the machine humming.",
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
    color: "#10B981", 
    description: "Scaling databases and organizing complexity into structured power.",
    skills: [
      { name: "Postgres", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", level: 85 },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8", level: 85 },
      { name: "Firebase", icon: <FaFire />, color: "#FFA000", level: 80 },
    ],
  },
];

// ─── Tilt Card Component ────────────────────────────────────────────────────
const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 20 });
  const sry = useSpring(ry, { stiffness: 300, damping: 20 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
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

// ─── Skill Sticker Component ────────────────────────────────────────────────
const SkillSticker: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, rotate: -2 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, delay }}
      className="group bg-white dark:bg-zinc-800 border-[3px] border-black p-4 rounded-2xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-3"
    >
      <div className="text-4xl drop-shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform group-hover:scale-110" style={{ color: skill.color }}>
        {skill.icon}
      </div>
      <span className="text-xs font-black uppercase italic tracking-tighter">{skill.name}</span>
      
      {/* Arcade Style Progress Bar */}
      <div className="w-full h-4 bg-zinc-100 dark:bg-zinc-900 border-[2px] border-black rounded-lg overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: delay + 0.2, type: "spring" }}
          className="h-full border-r-[2px] border-black relative"
          style={{ backgroundColor: skill.color }}
        >
          {/* Diagonal Stripes Pattern */}
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Skill Group Section ────────────────────────────────────────────────────
const SkillGroupSection: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "flex flex-col gap-8 sm:gap-12 lg:flex-row items-center",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>
      {/* Category Badge */}
      <motion.div
        initial={{ scale: 0.8, rotate: isEven ? -10 : 10, opacity: 0 }}
        whileInView={{ scale: 1, rotate: isEven ? -5 : 5, opacity: 1 }}
        className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 rounded-[3rem] border-[6px] border-black flex flex-col items-center justify-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        style={{ backgroundColor: group.color }}
      >
        <div className="text-7xl text-white drop-shadow-[5px_5px_0_rgba(0,0,0,1)] mb-2">{group.icon}</div>
        <span className="font-black text-white uppercase italic tracking-tighter text-lg drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
          {group.category}
        </span>
      </motion.div>

      {/* Main Content Box */}
      <div className="flex-1 w-full">
        <TiltCard>
          <div className="bg-white dark:bg-zinc-900 border-[5px] border-black rounded-[3rem] p-6 sm:p-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]">
            <div className="mb-8">
              <h3 className="text-4xl sm:text-5xl font-black uppercase italic mb-4 tracking-tight leading-none">
                {group.category} <span className="text-primary italic">Arsenal</span>
              </h3>
              <p className="text-lg sm:text-xl font-bold text-muted-foreground max-w-2xl">
                {group.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {group.skills.map((skill, i) => (
                <SkillSticker key={skill.name} skill={skill} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────
const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-10 bg-background overflow-hidden">
      {/* Background Polka Dots */}
      <div 
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 3px, transparent 3px)", backgroundSize: "40px 40px" }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <header className="text-center mb-24">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="inline-block px-8 py-3 border-[4px] border-black bg-pink-500 text-white font-black text-sm uppercase italic mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-3"
          >
            Capabilities Loaded! 💾
          </motion.div>
          <h2 className="text-7xl sm:text-9xl font-black uppercase italic tracking-tighter leading-none drop-shadow-[10px_10px_0_rgba(0,0,0,1)] dark:drop-shadow-[10px_10px_0_rgba(255,255,255,0.1)]">
            TECH <span className="text-primary">STACK</span>
          </h2>
        </header>

        <div className="space-y-32 sm:space-y-48">
          {skillsData.map((group, index) => (
            <SkillGroupSection key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* Floating Stats Section */}
        <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: "Weapon Classes", value: "03", color: "bg-cyan-400" },
            { label: "Unlocked Gear", value: "20+", color: "bg-lime-400" },
            { label: "Server Uptime", value: "99%", color: "bg-orange-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className={cn(
                "p-10 rounded-[2.5rem] border-[5px] border-black text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
                stat.color
              )}
            >
              <div className="text-7xl font-black text-black italic drop-shadow-[4px_4px_0_rgba(255,255,255,0.5)] mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-black/70 italic">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;