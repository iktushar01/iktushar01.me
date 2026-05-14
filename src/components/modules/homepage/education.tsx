"use client";

import React, { useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCalendar, FiAward, FiZap, FiBookOpen } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { springSoft, tiltSpring } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

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
    skills: ["React.js", "MERN Stack", "Node.js"],
  },
  {
    id: 2,
    degree: "Higher Secondary (HSC)",
    institution: "Rajendrapur Cantonment Public School and College",
    duration: "2021 - 2023",
    description: "Built a solid foundation in Science and Mathematics with excellence.",
    logo: RCPSC_LOGO,
    current: false,
    gpa: "5.00",
    icon: <FiAward />,
    skills: ["HTML/CSS", "Photoshop", "Physics"],
  },
];

const TiltCard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, tiltSpring);
  const sry = useSpring(ry, tiltSpring);

  const move = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const EducationPostcard: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <div className="relative z-20 shrink-0">
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={springSoft}
          className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-full border-4 border-border p-2 bg-card shadow-cartoon-md overflow-hidden"
        >
          <Image
            src={item.logo}
            alt={`${item.institution} logo`}
            fill
            sizes="(max-width: 1024px) 112px, 144px"
            className="object-contain p-1"
          />
        </motion.div>

        <div
          className={cn(
            "absolute -top-2 -right-2 p-2.5 rounded-[var(--radius-sticker)] border-4 border-border text-primary-foreground shadow-cartoon-sm",
            item.current ? "bg-primary animate-pulse" : "bg-muted text-foreground",
          )}
        >
          {item.icon}
        </div>
      </div>

      <TiltCard>
        <div className="relative bg-card text-card-foreground border-4 border-border p-6 lg:p-10 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md transition-transform duration-200 hover:-translate-y-0.5">
          <div
            className={cn(
              "absolute -top-3 right-8 px-3 py-1 border-4 border-border font-black uppercase text-[10px] tracking-widest shadow-cartoon-sm",
              item.current ? "bg-accent text-accent-foreground rotate-1" : "bg-secondary text-secondary-foreground -rotate-1",
            )}
          >
            {item.current ? "Ongoing" : "Completed"}
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="px-3 py-1 bg-muted border-2 border-border rounded-[var(--radius-sticker)] text-[10px] sm:text-[11px] font-black flex items-center gap-2 uppercase">
                <FiCalendar className="text-primary" /> {item.duration}
              </span>
              {item.gpa && (
                <span className="px-3 py-1 bg-muted border-2 border-border rounded-[var(--radius-sticker)] text-[10px] sm:text-[11px] font-black flex items-center gap-2 uppercase">
                  <FiAward className="text-primary" /> GPA: {item.gpa}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-2xl lg:text-4xl font-black uppercase italic tracking-tight leading-none mb-2">
                {item.degree}
              </h3>
              <h4 className="text-base lg:text-lg font-black text-primary underline decoration-border decoration-4 underline-offset-4">
                @{item.institution}
              </h4>
            </div>

            <p className="text-foreground/85 font-semibold leading-relaxed text-sm sm:text-base lg:text-lg max-w-2xl">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 bg-card border-2 border-border shadow-cartoon-sm text-[10px] font-black uppercase hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default rounded-[var(--radius-sticker)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Education: React.FC = () => (
  <section id="education" className="lp-section">
    <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none lp-dots" />

    <div className="lp-container">
            <SectionHeader
              kicker="My Academic Journey 📖"
              kickerTone="primary"
              kickerRotate="-rotate-2"
              title={
                <>
                  <span className="text-yellow-400">LEVELED</span> <span className="text-primary">UP</span>
                </>
              }
            />

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 rounded-full" />

        <div className="flex flex-col gap-20 lg:gap-28">
          {educationData.map((item, index) => (
            <EducationPostcard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mt-24 flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent text-accent-foreground border-4 border-border rounded-full flex items-center justify-center shadow-cartoon-md rotate-3">
          <FiBookOpen size={28} />
        </div>
        <p className="font-black uppercase tracking-widest text-center text-xs sm:text-sm text-muted-foreground">
          Always Learning. Always Growing.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Education;
