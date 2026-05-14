"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FaReact, FaNodeJs, FaFire, FaPython
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJsonwebtokens, SiTypescript, SiNextdotjs, SiPostgresql,
  SiPrisma
} from "react-icons/si";
import { FiZap, FiCode, FiDatabase } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { springSoft, tiltSpring } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

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
  panelClass: string;
  description: string;
  skills: Skill[];
}

const skillsData: SkillGroup[] = [
  {
    id: 1,
    category: "Frontend",
    icon: <FiCode />,
    panelClass: "bg-primary text-primary-foreground",
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
    panelClass: "bg-secondary text-secondary-foreground",
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
    panelClass: "bg-accent text-accent-foreground",
    description: "Scaling databases and organizing complexity into structured power.",
    skills: [
      { name: "Postgres", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
      { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", level: 85 },
      { name: "Prisma", icon: <SiPrisma />, color: "#5a67d8", level: 85 },
      { name: "Firebase", icon: <FaFire />, color: "#FFA000", level: 80 },
    ],
  },
];

const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, tiltSpring);
  const sry = useSpring(ry, tiltSpring);

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

const SkillSticker: React.FC<{ skill: Skill; delay: number }> = ({ skill, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ ...springSoft, delay }}
      className="group bg-card text-card-foreground border-4 border-border p-4 rounded-[var(--radius-sticker)] shadow-cartoon-sm flex flex-col items-center gap-3 transition-shadow duration-200"
    >
      <div
        className="text-4xl drop-shadow-cartoon transition-transform duration-200 group-hover:scale-105"
        style={{ color: skill.color }}
      >
        {skill.icon}
      </div>
      <span className="text-[10px] sm:text-xs font-black uppercase italic tracking-tight text-center">
        {skill.name}
      </span>

      <div className="w-full h-3.5 bg-muted border-2 border-border rounded-md overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ ...springSoft, delay: delay + 0.08 }}
          className="h-full border-r-2 border-border relative"
          style={{ backgroundColor: skill.color }}
        >
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(45deg,rgba(255,255,255,0.45)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.45)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillGroupSection: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "flex flex-col gap-8 sm:gap-12 lg:flex-row items-center",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>
      <motion.div
        initial={{ scale: 0.94, rotate: isEven ? -6 : 6, opacity: 0 }}
        whileInView={{ scale: 1, rotate: isEven ? -3 : 3, opacity: 1 }}
        viewport={{ once: true }}
        transition={springSoft}
        className={cn(
          "w-44 h-44 sm:w-52 sm:h-52 shrink-0 rounded-[var(--radius-cartoon-lg)] border-4 border-border flex flex-col items-center justify-center shadow-cartoon-md",
          group.panelClass,
        )}
      >
        <div className="text-6xl sm:text-7xl drop-shadow-cartoon mb-1">{group.icon}</div>
        <span className="font-black uppercase italic tracking-tight text-sm sm:text-base">
          {group.category}
        </span>
      </motion.div>

      <div className="flex-1 w-full">
        <TiltCard>
          <div className="bg-card text-card-foreground border-4 border-border rounded-[var(--radius-cartoon-lg)] p-6 sm:p-10 shadow-cartoon-md">
            <div className="mb-8">
              <h3 className="text-3xl sm:text-4xl font-black uppercase italic mb-3 tracking-tight leading-none">
                {group.category} <span className="text-primary italic">Arsenal</span>
              </h3>
              <p className="text-base sm:text-lg font-semibold text-muted-foreground max-w-2xl leading-relaxed">
                {group.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {group.skills.map((skill, i) => (
                <SkillSticker key={skill.name} skill={skill} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const footStats = [
    { label: "Weapon Classes", value: "03", surface: "bg-primary text-primary-foreground" },
    { label: "Unlocked Gear", value: "20+", surface: "bg-accent text-accent-foreground" },
    { label: "Server Uptime", value: "99%", surface: "bg-secondary text-secondary-foreground" },
  ];

  return (
    <section id="skills" className="lp-section">
      <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05] pointer-events-none lp-dots" />

      <div className="lp-container">
        <SectionHeader
          kicker="Capabilities Loaded! 💾"
          kickerTone="primary"
          kickerRotate="-rotate-2"
          title={
            <>
              <span className="text-yellow-400">TECH</span> <span className="text-primary">STACK</span>
            </>
          }
        />
        

        <div className="space-y-24 sm:space-y-32">
          {skillsData.map((group, index) => (
            <SkillGroupSection key={group.id} group={group} index={index} />
          ))}
        </div>

        <div className="mt-24 sm:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {footStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              transition={springSoft}
              className={cn(
                "p-8 sm:p-10 rounded-[var(--radius-cartoon)] border-4 border-border text-center shadow-cartoon-md",
                stat.surface,
              )}
            >
              <div className="text-5xl sm:text-6xl font-black italic mb-2 drop-shadow-cartoon">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-80 italic">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
