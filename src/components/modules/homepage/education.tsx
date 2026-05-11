"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCalendar, FiAward, FiZap, FiBookOpen } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Interfaces ──────────────────────────────────────────────────────────────
interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  logo: string;
  current: boolean;
  gpa?: string;
  icon: ReactNode;
  skills: string[];
  color: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const UTTARA_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/UttaraUniversityLogo_bf6z7s.jpg";
const RCPSC_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/rcpscLogo_f6ccxs.png";

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Sc in Computer Science",
    institution: "Uttara University",
    duration: "2025 - 2029 (Exp)",
    description: "Deep diving into algorithms, software architecture, and advanced web technologies.",
    logo: UTTARA_LOGO,
    current: true,
    gpa: "In Progress",
    icon: <FiZap />,
    color: "#FACC15", // Yellow
    skills: ["React.js", "MERN Stack", "Node.js"],
  },
  {
    id: 2,
    degree: "Higher Secondary (HSC)",
    institution: "Rajuk Uttara Model College",
    duration: "2021 - 2023",
    description: "Built a solid foundation in Science and Mathematics with excellence.",
    logo: RCPSC_LOGO,
    current: false,
    gpa: "5.00",
    icon: <FiAward />,
    color: "#60A5FA", // Blue
    skills: ["HTML/CSS", "Photoshop", "Physics"],
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const TiltCard: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    >
      {children}
    </motion.div>
  );
};

const EducationPostcard: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-12",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* ── Sticker Badge ── */}
      <div className="relative z-20 flex justify-center lg:w-1/4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: isEven ? 5 : -5 }}
          className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[6px] border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          <img src={item.logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
        </motion.div>
        
        {/* Floating Icon Tag */}
        <div className="absolute -top-2 -right-2 bg-black text-white p-3 rounded-full border-4 border-white shadow-lg animate-bounce">
            {item.icon}
        </div>
      </div>

      {/* ── The Postcard ── */}
      <div className="w-full lg:w-3/4">
        <TiltCard>
          <div className="relative bg-white dark:bg-zinc-900 border-[5px] border-black p-8 rounded-3xl shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            {/* Stamp / Badge */}
            <div className={cn(
              "absolute -top-2 -right-4 px-8 py-2 border-4 border-black font-black uppercase text-xs -rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              item.current ? "bg-green-400" : "bg-red-400"
            )}>
              {item.current ? "In Progress" : "Certified"}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                 <span className="px-3 py-1 bg-zinc-100 border-2 border-black rounded-full text-[10px] font-black flex items-center gap-1">
                   <FiCalendar /> {item.duration}
                 </span>
                 {item.gpa && (
                   <span className="px-3 py-1 bg-zinc-100 border-2 border-black rounded-full text-[10px] font-black flex items-center gap-1">
                   <FiAward className="text-yellow-500" /> GPA: {item.gpa}
                 </span>
                 )}
              </div>

              <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-none italic uppercase">
                {item.degree}
              </h3>
              
              <h4 className="text-xl font-bold text-primary italic">@{item.institution}</h4>
              
              <p className="text-zinc-600 dark:text-zinc-400 font-bold leading-relaxed max-w-xl">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2">
                {item.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[10px] font-black uppercase hover:-translate-y-1 transition-transform cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

const Education: React.FC = () => (
  <section id="education" className="relative py-32 px-6 bg-background overflow-hidden">
    {/* Polka Dot Background */}
    <div 
      className="absolute inset-0 opacity-[0.1] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(#000 3px, transparent 3px)", backgroundSize: "40px 40px" }}
    />

    <div className="relative z-10 container mx-auto max-w-6xl">
      <header className="text-center mb-24">
        <motion.div
           initial={{ y: -20, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           className="inline-block px-4 py-1 border-[3px] border-black bg-pink-400 font-black text-xs uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3"
        >
          Learning Quest! 🎒
        </motion.div>
        <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
          MY <span className="text-primary">PATH</span>
        </h2>
      </header>

      <div className="relative">
        {/* Cartoon Dashed Path (Desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 border-l-[6px] border-dashed border-black/20 -translate-x-1/2 -z-0" />

        <div className="space-y-32">
          {educationData.map((item, index) => (
            <EducationPostcard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <motion.footer 
        whileHover={{ scale: 1.1 }}
        className="mt-32 flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce">
            <FiBookOpen size={24} className="text-black" />
        </div>
        <p className="font-black uppercase tracking-tighter text-sm italic">Never Stop Leveling Up!</p>
      </motion.footer>
    </div>
  </section>
);

export default Education;