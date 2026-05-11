"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCalendar, FiAward, FiZap } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind class merging */
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
}

// ─── Constants ───────────────────────────────────────────────────────────────
const UTTARA_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/UttaraUniversityLogo_bf6z7s.jpg";
const RCPSC_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/rcpscLogo_f6ccxs.png";

// Updated color map to use your CSS variables for primary/secondary/accent
const TECH_COLORS: Record<string, string> = {
  "React.js": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  "MongoDB": "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  "Express.js": "bg-gray-500/10 text-gray-300 border border-gray-500/30",
  "Node.js": "bg-green-500/10 text-green-400 border border-green-500/30",
  "MERN Stack": "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  "HTML": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "CSS": "bg-sky-500/10 text-sky-400 border border-sky-500/30",
  "Adobe Photoshop": "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30",
  "Microsoft Office Suite": "bg-red-500/10 text-red-400 border border-red-500/30",
  "default": "bg-primary/10 text-primary border border-primary/30",
};

const getTechColor = (t: string) => TECH_COLORS[t] || TECH_COLORS.default;

// ─── Data ───────────────────────────────────────────────────────────────────
const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Sc in Computer Science & Engineering",
    institution: "Uttara University",
    duration: "2025 - 2029 (Expected)",
    description: "Focusing on core computer science principles, advanced algorithms, and full-stack engineering research.",
    logo: UTTARA_LOGO,
    current: true,
    gpa: "Pending",
    icon: <FiZap />,
    skills: ["React.js", "MERN Stack", "Node.js", "Express.js", "MongoDB"],
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Rajuk Uttara Model College",
    duration: "2021 - 2023",
    description: "Completed secondary education with a focus on Science and Mathematics.",
    logo: RCPSC_LOGO,
    current: false,
    gpa: "5.00",
    icon: <FiAward />,
    skills: ["HTML", "CSS", "Adobe Photoshop", "Microsoft Office Suite"],
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

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

const TiltCard: React.FC<{ children: ReactNode }> = ({ children }) => {
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
    >
      {children}
    </motion.div>
  );
};

const EducationRow: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* ── Logo ── */}
      <div className={cn("lg:w-1/3 flex justify-center", isEven ? "lg:justify-end" : "lg:justify-start")}>
        <motion.div
          whileHover={{ scale: 1.07, rotate: [0, -3, 3, 0] }}
          className={cn(
            "relative w-32 h-32 lg:w-40 lg:h-40 rounded-2xl flex items-center justify-center border bg-card/5 backdrop-blur-sm overflow-hidden flex-shrink-0",
            item.current ? "border-primary/30 shadow-[0_0_40px_rgba(var(--primary-rgb),0.18)]" : "border-border/50"
          )}
        >
          <img
            src={item.logo}
            alt={item.institution}
            className="w-4/5 h-4/5 rounded-full object-contain mix-blend-normal"
          />
          {item.current && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          )}
        </motion.div>
      </div>

      {/* ── Spine dot — desktop ── */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center">
        <motion.div
          className={cn(
            "relative w-5 h-5 rounded-full border-2",
            item.current ? "bg-primary border-primary/50 shadow-[0_0_18px_rgba(var(--primary-rgb),0.7)]" : "bg-muted border-muted-foreground"
          )}
        >
          {item.current && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />}
        </motion.div>
      </div>

      {/* ── Card ── */}
      <div className="w-full lg:w-2/3">
        <TiltCard>
          <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-xl overflow-hidden"
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0"
              animate={{ opacity: hovered ? 1 : 0 }}
              style={{
                background: "linear-gradient(135deg, rgba(var(--primary-rgb),0.1) 0%, rgba(var(--secondary-rgb),0.05) 100%)",
                boxShadow: "inset 0 0 0 1px rgba(var(--primary-rgb),0.2)",
              }}
            />

            <div className={cn("absolute left-0 top-0 bottom-0 w-1", item.current ? "bg-primary" : "bg-muted-foreground/30")} />

            <div className="absolute top-4 right-4 z-10 flex gap-2">
              {item.current && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Current
                </span>
              )}
              {item.gpa && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary tracking-widest uppercase flex items-center gap-1">
                  <FiAward size={10} /> GPA {item.gpa}
                </span>
              )}
            </div>

            <div className="p-6 md:p-8 pl-7 md:pl-9 relative z-20">
              <div className="flex items-start gap-4 mb-4 pr-24">
                <div className={cn("flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border", item.current ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted border-border text-muted-foreground")}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold font-syne tracking-tight leading-snug mb-1">
                    <GlitchText>{item.degree}</GlitchText>
                  </h3>
                  <h4 className="text-base font-semibold text-foreground/80 mb-1">{item.institution}</h4>
                  <p className="text-muted-foreground text-xs flex items-center gap-1.5">
                    <FiCalendar size={10} /> {item.duration}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{item.description}</p>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2.5 flex items-center gap-1.5">
                  <FiZap size={10} className="text-primary" /> Core Focus
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, i) => (
                    <span key={i} className={cn("text-[11px] font-medium px-2.5 py-1 rounded-full", getTechColor(skill))}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Education: React.FC = () => (
  <section id="education" className="relative py-24 px-4 sm:px-8 bg-background text-foreground overflow-hidden font-dm-sans">
    {/* Decorative BG */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
    />
    <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

    <div className="relative z-10 container mx-auto max-w-5xl">
      <header className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block"
        >
          — Academic History
        </motion.span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-syne tracking-tight">
          Education <span className="text-primary">Journey</span>
        </h2>
      </header>

      <div className="relative">
        {/* Timeline Spine */}
        <motion.div
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 w-px hidden lg:block bg-gradient-to-b from-primary/50 via-border to-transparent top-0 bottom-0"
        />

        <div className="space-y-12 lg:space-y-16">
          {educationData.map((item, index) => (
            <EducationRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <footer className="flex flex-col items-center mt-14 gap-2 opacity-60">
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
        <span className="text-xs tracking-widest uppercase">Steadily Progressing</span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </footer>
    </div>
  </section>
);

export default Education;