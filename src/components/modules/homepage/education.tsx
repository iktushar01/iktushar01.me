"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

interface EducationItem {
  index: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  logo: string;
  current: boolean;
  gpa?: string;
  skills: string[];
}

const UTTARA_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778809068/cropped_circle_image_ic9c2j.png";
const RCPSC_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/rcpscLogo_f6ccxs.png";

const educationData: EducationItem[] = [
  {
    index: "01",
    degree: "B.Sc in Computer Science",
    institution: "Uttara University",
    duration: "2025 — 2029 (Expected)",
    description: "Deep diving into algorithms, software architecture, and advanced web technologies.",
    logo: UTTARA_LOGO,
    current: true,
    gpa: "In progress",
    skills: ["React.js", "MERN Stack", "Node.js"],
  },
  {
    index: "02",
    degree: "Higher Secondary (HSC)",
    institution: "Rajendrapur Cantonment Public School and College",
    duration: "2021 — 2023",
    description: "Built a solid foundation in science and mathematics with academic distinction.",
    logo: RCPSC_LOGO,
    current: false,
    gpa: "5.00",
    skills: ["HTML/CSS", "Photoshop", "Physics"],
  },
];

const EducationRow: React.FC<{ item: EducationItem; idx: number }> = ({ item, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ ...springSoft, delay: idx * 0.06 }}
    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-b border-border last:border-b-0"
  >
    {/* Index + logo + status */}
    <div className="lg:col-span-3 flex items-start gap-4">
      <span className="text-xs font-mono text-muted-foreground/50 pt-1">{item.index}</span>
      <div className="relative w-12 h-12 rounded-md border border-border bg-card shrink-0 overflow-hidden">
        <Image
          src={item.logo}
          alt={`${item.institution} logo`}
          fill
          sizes="48px"
          className="object-contain p-1.5"
        />
      </div>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground pt-1.5">
        {item.current ? "Ongoing" : "Completed"}
      </span>
    </div>

    {/* Main content */}
    <div className="lg:col-span-9">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
          {item.degree}
        </h3>
        <span className="text-xs font-mono text-muted-foreground">{item.duration}</span>
      </div>

      <p className="text-sm font-medium text-primary mb-3">{item.institution}</p>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
        {item.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        {item.gpa && (
          <span className="text-muted-foreground">
            <span className="text-foreground/70">GPA</span> &middot; {item.gpa}
          </span>
        )}
        <span className="text-muted-foreground">
          <span className="text-foreground/70">Focus</span> &middot; {item.skills.join(", ")}
        </span>
      </div>
    </div>
  </motion.div>
);

const Education: React.FC = () => (
  <section id="education" className="relative py-24 bg-background text-foreground px-5 sm:px-10 lg:px-16">
    <SectionHeader kicker="Academic background" title="Education" />

    <div className="mt-12">
      {educationData.map((item, idx) => (
        <EducationRow key={item.index} item={item} idx={idx} />
      ))}
    </div>
  </section>
);

export default Education;