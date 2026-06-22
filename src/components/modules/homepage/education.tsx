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

const UTTARA_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778809068/cropped_circle_image_ic9c2j.png";
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
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <div className="relative z-20 shrink-0">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={springSoft}
          className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-border p-2 bg-card shadow-sm overflow-hidden flex items-center justify-center backdrop-blur-sm"
        >
          <Image
            src={item.logo}
            alt={`${item.institution} logo`}
            fill
            sizes="(max-width: 1024px) 96px, 128px"
            className="object-contain p-2"
          />
        </motion.div>

        <div
          className={cn(
            "absolute -top-1 -right-1 p-2 rounded-xl border border-border text-primary-foreground shadow-sm text-sm",
            item.current ? "bg-primary" : "bg-muted text-muted-foreground",
          )}
        >
          {item.icon}
        </div>
      </div>

      <TiltCard>
        <div className="relative bg-card/60 text-card-foreground border border-border p-6 lg:p-8 rounded-2xl shadow-sm backdrop-blur-md transition-colors duration-300 hover:border-border/80">
          <div
            className={cn(
              "absolute -top-2.5 right-6 px-2.5 py-0.5 border border-border rounded-full text-[10px] font-medium tracking-wider uppercase shadow-sm",
              item.current ? "bg-accent/10 text-accent-foreground border-accent/20" : "bg-secondary/10 text-secondary-foreground border-secondary/20",
            )}
          >
            {item.current ? "Ongoing" : "Completed"}
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-muted border border-border/40 rounded-md text-[11px] font-medium flex items-center gap-1.5 text-muted-foreground uppercase tracking-wide">
                <FiCalendar className="text-primary/80" /> {item.duration}
              </span>
              {item.gpa && (
                <span className="px-2.5 py-1 bg-muted border border-border/40 rounded-md text-[11px] font-medium flex items-center gap-1.5 text-muted-foreground uppercase tracking-wide">
                  <FiAward className="text-primary/80" /> GPA: {item.gpa}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl lg:text-2xl font-medium tracking-tight text-foreground">
                {item.degree}
              </h3>
              <h4 className="text-sm lg:text-base font-medium text-primary mt-0.5">
                @{item.institution}
              </h4>
            </div>

            <p className="text-muted-foreground font-normal leading-relaxed text-sm lg:text-base max-w-2xl">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 bg-muted/60 border border-border/60 text-[10px] font-medium uppercase tracking-wider text-muted-foreground rounded-md hover:border-primary/30 hover:text-primary transition-colors duration-200 cursor-default"
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
  <section id="education" className="lp-section relative py-20 overflow-hidden bg-background">
    <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] pointer-events-none lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

    <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
      <SectionHeader
        kicker="My Academic Journey"
        kickerIcon={<FiBookOpen />}
        kickerTone="primary"
        title={
          <>
            <span className="text-primary">LEVELED</span> <span className="text-foreground">UP</span>
          </>
        }
      />

      <div className="relative mt-12">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 rounded-full" />

        <div className="flex flex-col gap-16 lg:gap-24">
          {educationData.map((item, index) => (
            <EducationPostcard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mt-20 flex flex-col items-center gap-3"
      >
        <div className="w-12 h-12 bg-accent/5 text-accent-foreground border border-accent/20 rounded-xl flex items-center justify-center shadow-sm backdrop-blur-md">
          <FiBookOpen size={20} />
        </div>
        <p className="font-medium uppercase tracking-widest text-center text-[10px] sm:text-xs text-muted-foreground/80">
          Always Learning. Always Growing.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Education;