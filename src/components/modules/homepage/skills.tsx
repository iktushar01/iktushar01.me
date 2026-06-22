"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaFire, FaPython } from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiJsonwebtokens, SiTypescript, SiNextdotjs, SiPostgresql,
  SiPrisma
} from "react-icons/si";
import { springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

interface Skill {
  name: string;
  icon: React.ReactNode;
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
    description:
      "Component-driven interfaces with deliberate state management and interaction detail.",
    skills: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
    ],
  },
  {
    index: "02",
    category: "Backend",
    description:
      "Business logic, authentication, and data flow built around clear boundaries.",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Python", icon: <FaPython /> },
      { name: "JWT Auth", icon: <SiJsonwebtokens /> },
    ],
  },
  {
    index: "03",
    category: "Data",
    description:
      "Schema design and querying across relational and non-relational stores.",
    skills: [
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Prisma", icon: <SiPrisma /> },
      { name: "Firebase", icon: <FaFire /> },
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-b border-border last:border-b-0"
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
              className="flex items-center gap-2.5 py-2 border-b border-border/60 sm:border-b-0"
            >
              <span className="text-base text-muted-foreground">{skill.icon}</span>
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
    { label: "Stack Areas", value: "03" },
    { label: "Tools in Use", value: "12" },
    { label: "Primary Focus", value: "MERN" },
  ];

  return (
    <section id="skills" className="relative py-24 bg-background text-foreground px-5 sm:px-10 lg:px-16">
      <SectionHeader
        kicker="What I work with"
        kickerTone="primary"
        title={
          <>
            <span className="text-primary">TECH</span> <span className="text-foreground">STACK</span>
          </>
        }
      />

      <div className="mt-12">
        {skillsData.map((group, index) => (
          <SkillGroupRow key={group.category} group={group} index={index} />
        ))}
      </div>

      {/* Footer summary strip */}
      <div className="mt-4 grid grid-cols-3 border-t border-border">
        {footStats.map((stat) => (
          <div
            key={stat.label}
            className="py-6 px-2 sm:px-4 text-center border-r border-border last:border-r-0"
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