"use client";

import React from "react";
import { motion } from "framer-motion";

// FontAwesome Icons (fa)
import { 
  FaReact, 
  FaNodeJs, 
  FaWordpress, 
  FaHtml5, 
  FaCss3Alt, 
  FaGithub, 
  FaFigma, 
  FaDocker, 
  FaLinux, 
  FaGitAlt 
} from "react-icons/fa";

// SimpleIcons (si)
import {
  SiTailwindcss, 
  SiExpress, 
  SiMongodb, 
  SiTypescript, 
  SiNextdotjs, 
  SiPostgresql,
  SiPrisma, 
  SiFirebase, 
  SiRedis, 
  SiGo, 
  SiWebflow, 
  SiPostman, 

  SiVercel
} from "react-icons/si";

import { VscCode } from "react-icons/vsc";

// Ionicons (io5) - best standard JS icon
import { IoLogoJavascript } from "react-icons/io5";

import { springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  darkColor?: string;
}

interface SkillGroup {
  index: string;
  category: string;
  description: string;
  skills: Skill[];
}

const skillsData: SkillGroup[] = [
  {
    index: "01",
    category: "Frontend",
    description: "Component-driven interfaces with deliberate state management and interaction detail.",
    skills: [
      { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "JavaScript", icon: <IoLogoJavascript />, color: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "React", icon: <FaReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000", darkColor: "#ffffff" },
      { name: "Webflow", icon: <SiWebflow />, color: "#4353FF" },
      { name: "WordPress", icon: <FaWordpress />, color: "#21759B" },
    ],
  },
  {
    index: "02",
    category: "Backend & Databases",
    description: "Business logic, architecture, and schema design across relational and non-relational stores.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#000000", darkColor: "#ffffff" },
      { name: "Go", icon: <SiGo />, color: "#00ADD8" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "Prisma", icon: <SiPrisma />, color: "#2D3748", darkColor: "#A0AEC0" },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28" },
      { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
    ],
  },
  {
    index: "03",
    category: "Tools & DevOps",
    description: "Version control, development environments, design tools, and deployment workflows.",
    skills: [
      { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
      { name: "GitHub", icon: <FaGithub />, color: "#181717", darkColor: "#ffffff" },
      { name: "VS Code", icon: <VscCode />, color: "#007ACC" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
      { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
      { name: "Vercel", icon: <SiVercel />, color: "#000000", darkColor: "#ffffff" },
      { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
      { name: "Linux", icon: <FaLinux />, color: "#FCC624" },
    ],
  },
];

const SkillGroupRow: React.FC<{ group: SkillGroup; index: number }> = ({ group, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...springSoft, delay: index * 0.05 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 py-6 sm:py-8 lg:py-10 border-b border-border last:border-b-0"
    >
      {/* Label column */}
      <div className="lg:col-span-4 flex items-start gap-4">
        <span className="text-xs font-mono text-muted-foreground/50 pt-1">
          {group.index}
        </span>
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {group.category}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
            {group.description}
          </p>
        </div>
      </div>

      {/* Skill list column */}
      <div className="lg:col-span-8">
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
          {group.skills.map((skill) => (
            <li
              key={skill.name}
              className="group flex items-center gap-2.5 py-2 border-b border-border/60 sm:border-b-0"
              style={
                {
                  "--skill-color": skill.color,
                  "--skill-dark-color": skill.darkColor ?? skill.color,
                } as React.CSSProperties
              }
            >
              <span className="text-base text-muted-foreground transition-colors duration-200 group-hover:text-[var(--skill-color)] dark:group-hover:text-[var(--skill-dark-color)]">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-foreground tracking-tight">
                {skill.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const footStats = [
    { label: "Project Completed", value: "10+" },
    { label: "Tools in Use", value: "25+" },
    { label: "Primary Focus", value: "PERN Stack" },
  ];

  return (
    <section id="skills" className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16">
      <SectionHeader kicker="What I work with" title="Tech Stack" />

      <div className="mt-8 sm:mt-12">
        {skillsData.map((group, index) => (
          <SkillGroupRow key={group.category} group={group} index={index} />
        ))}
      </div>

      {/* Footer summary strip */}
      <div className="mt-4 grid grid-cols-3 border-t border-border">
        {footStats.map((stat) => (
          <div
            key={stat.label}
            className="py-4 sm:py-6 px-2 sm:px-4 text-center border-r border-border last:border-r-0"
          >
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {stat.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;