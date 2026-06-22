"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaReact, FaNodeJs, FaFire, FaPython } from "react-icons/fa";
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
    panelClass: "bg-primary/10 text-primary border-primary/20",
    description: "Architecting snappy, component-driven modular systems with fine-tuned micro-interactions.",
    skills: [
      { name: "React", icon: <FaReact />, color: "#61DAFB", level: 90 },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", level: 85 },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", level: 80 },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8", level: 85 },
    ],
  },
  {
    id: 2,
    category: "Backend",
    icon: <FiZap />,
    panelClass: "bg-accent/10 text-accent-foreground border-accent/20",
    description: "The background engine structuring business logic layer abstractions and scaling data flows securely.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#68A063", level: 85 },
      { name: "Express", icon: <SiExpress />, color: "#828282", level: 80 },
      { name: "Python", icon: <FaPython />, color: "#3776AB", level: 75 },
      { name: "JWT authentication", icon: <SiJsonwebtokens />, color: "#FB923C", level: 75 },
    ],
  },
  {
    id: 3,
    category: "Data",
    icon: <FiDatabase />,
    panelClass: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    description: "Optimizing relational schemas, non-relational clustering solutions, and fast ORM queries.",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1", level: 80 },
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      viewport={{ once: true }}
      transition={{ ...springSoft, delay }}
      className="group bg-card/40 text-card-foreground border border-border p-4 rounded-xl shadow-sm flex flex-col items-center gap-3 backdrop-blur-sm hover:border-border/80 transition-colors duration-300"
    >
      <div
        className="text-3xl transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
        style={{ color: skill.color }}
      >
        {skill.icon}
      </div>
      <span className="text-[11px] font-medium tracking-wide text-center text-foreground/90">
        {skill.name}
      </span>

      <div className="w-full h-1.5 bg-muted border border-border/40 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ ...springSoft, delay: delay + 0.08 }}
          className="h-full rounded-full relative"
          style={{ backgroundColor: skill.color }}
        >
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:6px_6px]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillGroupSection: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "flex flex-col gap-6 sm:gap-10 lg:flex-row items-center",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>
      <motion.div
        initial={{ scale: 0.96, rotate: isEven ? -2 : 2, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={springSoft}
        className={cn(
          "w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-2xl border flex flex-col items-center justify-center shadow-sm backdrop-blur-md",
          group.panelClass,
        )}
      >
        <div className="text-4xl sm:text-5xl mb-2 filter drop-shadow-sm">{group.icon}</div>
        <span className="font-semibold uppercase tracking-wider text-xs sm:text-sm">
          {group.category}
        </span>
      </motion.div>

      <div className="flex-1 w-full">
        <TiltCard>
          <div className="bg-card/60 text-card-foreground border border-border rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-md">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-2 text-foreground">
                {group.category} <span className="text-primary font-normal">Arsenal</span>
              </h3>
              <p className="text-sm font-normal text-muted-foreground max-w-2xl leading-relaxed">
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
    { label: "Weapon Classes", value: "03", surface: "bg-primary/5 text-primary border-primary/20" },
    { label: "Unlocked Gear", value: "20+", surface: "bg-accent/5 text-accent-foreground border-accent/20" },
    { label: "Server Uptime", value: "99%", surface: "bg-secondary/5 text-secondary-foreground border-secondary/20" },
  ];

  return (
    <section id="skills" className="lp-section relative py-20 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] pointer-events-none lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          kicker="Capabilities Loaded!"
          kickerIcon={<FiDatabase />}
          kickerTone="primary"
          title={
            <>
              <span className="text-primary">TECH</span> <span className="text-foreground">STACK</span>
            </>
          }
        />
        
        <div className="space-y-16 sm:space-y-24 mt-12">
          {skillsData.map((group, index) => (
            <SkillGroupSection key={group.id} group={group} index={index} />
          ))}
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {footStats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              transition={springSoft}
              className={cn(
                "p-6 sm:p-8 rounded-2xl border text-center shadow-sm backdrop-blur-md flex flex-col justify-center items-center",
                stat.surface,
              )}
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/80">
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