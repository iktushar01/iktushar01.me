"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
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

/** Utility for Tailwind class merging (Standard in Shadcn) */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  icon: ReactNode;
  color: string; // Used for dynamic glow/styles
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

// ─── Skill Data ───────────────────────────────────────────────────────────────
const skillsData: SkillGroup[] = [
  {
    id: 1,
    category: "Frontend",
    icon: <FiCode />,
    color: "var(--secondary)",
    description: "Building responsive, interactive user interfaces with modern frameworks and styling tools.",
    skills: [
      { name: "React.js", icon: <FaReact />, color: "#61DAFB", level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF", level: 85 },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: 80 },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", level: 85 },
      { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", level: 90 },
      { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", level: 85 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38BDF8", level: 85 },
    ],
  },
  {
    id: 2,
    category: "Backend",
    icon: <FiZap />,
    color: "var(--primary)",
    description: "Developing robust server-side logic, RESTful APIs, and integrated systems.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#68A063", level: 85 },
      { name: "Express.js", icon: <SiExpress />, color: "#CCCCCC", level: 80 },
      { name: "Python", icon: <FaPython />, color: "#3776AB", level: 75 },
      { name: "WordPress", icon: <FaWordpress />, color: "#21759B", level: 70 },
      { name: "JWT Auth", icon: <SiJsonwebtokens />, color: "#FB923C", level: 75 },
    ],
  },
  {
    id: 3,
    category: "Database & ORM",
    icon: <FiDatabase />,
    color: "var(--accent)",
    description: "Designing and managing relational and NoSQL databases with type-safe ORMs.",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", level: 85 },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8", level: 85 },
      { name: "Firebase", icon: <FaFire />, color: "#FFA000", level: 80 },
    ],
  },
  {
    id: 4,
    category: "Design & Tools",
    icon: <FiTool />,
    color: "var(--primary)",
    description: "Proficient with industry-standard tools for design, version control, and productivity.",
    skills: [
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E", level: 85 },
      { name: "Photoshop", icon: <FaPaintBrush />, color: "#31A8FF", level: 70 },
      { name: "Git", icon: <FaGitAlt />, color: "#F05032", level: 85 },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37", level: 85 },
      { name: "Notion", icon: <SiNotion />, color: "#FFFFFF", level: 80 },
    ],
  },
];

// ─── Sub-Components ───────────────────────────────────────────────────────────

const GlitchText: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{children}</span>
    <span 
      aria-hidden 
      className="absolute inset-0 text-primary opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}
    >
      {children}
    </span>
    <span 
      aria-hidden 
      className="absolute inset-0 text-secondary opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}
    >
      {children}
    </span>
  </span>
);

const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current) return;
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

const SkillChip: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -3 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: "spring" }}
      className={cn(
        "flex flex-col items-center gap-1.5 p-3 rounded-xl border backdrop-blur-sm cursor-default transition-all duration-300",
        "bg-white/5 border-white/10"
      )}
      style={{
        backgroundColor: hovered ? `${skill.color}15` : undefined,
        borderColor: hovered ? `${skill.color}40` : undefined,
      }}
    >
      <div 
        className="text-xl flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 transition-colors duration-300"
        style={{ color: skill.color, backgroundColor: hovered ? `${skill.color}20` : undefined }}
      >
        {skill.icon}
      </div>
      <span className="text-[10px] font-semibold text-foreground/70 uppercase tracking-tighter whitespace-nowrap">
        {skill.name}
      </span>
      <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mt-1">
        <motion.div
          className="h-full rounded-full"
          style={{ background: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        />
      </div>
    </motion.div>
  );
};

const SkillCard: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Category Orb */}
      <div className="lg:w-1/3 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05, rotate: isEven ? 5 : -5 }}
          className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-3xl flex flex-col items-center justify-center gap-2 border bg-muted/20 backdrop-blur-md"
          style={{ borderColor: `${group.color}40`, boxShadow: `0 0 30px ${group.color}15` }}
        >
          <div className="text-4xl lg:text-5xl" style={{ color: group.color }}>{group.icon}</div>
          <span className="text-[10px] font-black tracking-widest uppercase text-center" style={{ color: group.color }}>
            {group.category}
          </span>
        </motion.div>
      </div>

      {/* Content Card */}
      <div className="w-full lg:w-2/3">
        <TiltCard>
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative rounded-3xl border border-border bg-card/50 backdrop-blur-xl p-6 md:p-8 overflow-hidden"
          >
            <div 
              className="absolute left-0 top-0 bottom-0 w-1"
              style={{ background: `linear-gradient(to bottom, ${group.color}, transparent)` }}
            />
            <h3 className="text-2xl font-bold font-syne mb-2">
              <GlitchText>{group.category}</GlitchText>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {group.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, i) => (
                <SkillChip key={skill.name} skill={skill} delay={index * 0.1 + i * 0.05} />
              ))}
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Skills: React.FC = () => {
  const totalSkills = skillsData.reduce((a, g) => a + g.skills.length, 0);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 bg-background text-foreground overflow-hidden font-dm-sans">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-5xl">
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block"
          >
            — My Stack
          </motion.span>
          <h2 className="text-4xl sm:text-6xl font-extrabold font-syne tracking-tight">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </header>

        <div className="space-y-20">
          {skillsData.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20">
          {[
            { label: "Categories", value: skillsData.length, color: "var(--primary)" },
            { label: "Tools Mastered", value: `${totalSkills}+`, color: "var(--secondary)" },
            { label: "Experience", value: "1+ Year", color: "var(--accent)" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl border border-border bg-card/30 backdrop-blur-sm text-center"
            >
              <div className="text-3xl font-black font-syne mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;