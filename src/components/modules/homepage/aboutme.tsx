"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaCode, FaPaintBrush, FaGamepad } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { springSoft, tiltSpring } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

interface StoryItem {
  icon: ReactNode;
  iconSurface: string;
  title: string;
  content: string;
}

interface ApproachItem {
  skill: string;
  level: number;
  barClass: string;
}

const TiltCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, tiltSpring);
  const sry = useSpring(ry, tiltSpring);

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };

  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StoryCard: React.FC<{ item: StoryItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div className="group relative h-full rounded-[var(--radius-cartoon)] border-4 border-border bg-card text-card-foreground p-6 flex flex-col gap-4 shadow-cartoon-sm hover:shadow-cartoon-md hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 ease-out">
          <div
            className={cn(
              "w-12 h-12 rounded-[var(--radius-sticker)] border-4 border-border flex items-center justify-center text-xl text-primary-foreground shadow-cartoon-sm group-hover:rotate-6 transition-transform duration-200",
              item.iconSurface,
            )}
          >
            {item.icon}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black mb-1.5 uppercase italic tracking-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const AboutMe: React.FC = () => {
  // Personalized stories mapped to your portfolio architecture focus
  const stories: StoryItem[] = [
    {
      icon: <FaCode />,
      iconSurface: "bg-primary",
      title: "MERN Stack Engineer",
      content:
        "Architecting robust systems using MongoDB, Express, React, and Node.js. Obsessed with clean code architecture and aggressive performance layouts.",
    },
    {
      icon: <FaPaintBrush />,
      iconSurface: "bg-accent text-accent-foreground",
      title: "UI/UX & Optimization",
      content:
        "Bridging elegant frontend layout systems with strict logical rules. Crafting production interfaces prioritizing responsive layouts and absolute pixel-perfection.",
    },
    {
      icon: <FiStar />,
      iconSurface: "bg-secondary text-secondary-foreground",
      title: "Next & Systems Grind",
      content:
        "Actively expanding structural pipelines into high-scale setups using Next.js frameworks, Go compilers, and reliable relational SQL platforms.",
    },
  ];

  // Actual skills from your toolkit
  const approaches: ApproachItem[] = [
    { skill: "Frontend Architecture (React/Next)", level: 92, barClass: "bg-primary" },
    { skill: "Backend Layouts (Node/Express/Go)", level: 85, barClass: "bg-accent" },
    { skill: "Database Optimization (SQL/NoSQL)", level: 80, barClass: "bg-secondary" },
  ];

  // Milestone data points transformed into metrics
  const stats: { label: string; value: string; surface: string }[] = [
    { label: "Built Projects", value: "6+", surface: "bg-accent text-accent-foreground" },
    { label: "Tech Infrastructure Nodes", value: "12+", surface: "bg-primary text-primary-foreground" },
    { label: "System Stamina", value: "100%", surface: "bg-secondary text-secondary-foreground" },
    { label: "Developer Tier", value: "PRO", surface: "bg-muted text-foreground" },
  ];

  return (
    <section id="about" className="lp-section">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07] dark:opacity-[0.05] lp-dots" />

      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/25 rounded-full blur-[80px] pointer-events-none" />

      <div className="lp-container">
        <SectionHeader
          kicker="Who is this guy?"
          kickerTone="accent"
          title={
            <>
              <span className="text-yellow-400 ">ABOUT</span> <span className="text-primary">ME!</span>
            </>
          }
        />

        {/* Brand New Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Context Box: Introduction card spanning half the bento layout */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 bg-card border-4 border-border rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md">
            <div className="space-y-4">
              <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border-2 border-border">
                Core Identity
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-none">
                Md. Ibrahim Khalil Tushar
              </h3>
              <p className="text-sm sm:text-base font-semibold text-muted-foreground leading-relaxed">
                Full-stack software developer pursuing a B.Sc. in Computer Science and Engineering at Uttara University. Focused on translating clean modular paradigms into fast web user spaces.
              </p>
            </div>

            {/* Quick-firing dynamic anchor reference badges referencing your ecosystem highlights */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t-4 border-dashed border-border/40">
              {["#Acadex", "#Store-Xen", "#Medquix", "#DocScheduleBD"].map((project) => (
                <span
                  key={project}
                  className="bg-muted text-foreground border-2 border-border px-2.5 py-1 rounded-md font-black text-[10px] uppercase shadow-cartoon-sm"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          {/* Skill Matrix Box (Spans 6 units on desktop) */}
          <div className="lg:col-span-6">
            <TiltCard className="h-full">
              <div className="h-full bg-card text-card-foreground border-4 border-border rounded-[var(--radius-cartoon-lg)] p-6 sm:p-8 shadow-cartoon-md flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center border-4 border-border shadow-cartoon-sm">
                    <FiStar className="text-accent text-lg" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tight">System Matrix</h3>
                </div>

                <div className="space-y-5">
                  {approaches.map((item, index) => (
                    <div key={item.skill} className="group">
                      <div className="flex justify-between font-black uppercase text-[10px] sm:text-xs mb-1.5 tracking-wide">
                        <span>{item.skill}</span>
                        <span className="bg-foreground text-background px-1.5 py-0.5 rounded text-[10px] font-bold border border-border">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-6 w-full bg-muted border-4 border-border rounded-[var(--radius-sticker)] overflow-hidden shadow-cartoon-sm">
                        <motion.div
                          className={cn("h-full border-r-4 border-border relative", item.barClass)}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ ...springSoft, delay: index * 0.1 }}
                        >
                          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,rgba(0,0,0,0.12)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.12)_75%,transparent_75%,transparent)] bg-[length:12px_12px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Three Column Dynamic Story Card Track Block */}
          {stories.map((item, index) => (
            <div key={item.title} className="lg:col-span-4 md:col-span-1">
              <StoryCard item={item} index={index} />
            </div>
          ))}

          {/* Numerical Status Metrics Panel Footer Grid Block */}
          <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={springSoft}
                className={cn(
                  "border-4 border-border p-4 rounded-[var(--radius-sticker)] shadow-cartoon-sm flex flex-col justify-center",
                  stat.surface,
                )}
              >
                <p className="text-[9px] font-black uppercase opacity-75 tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-black italic leading-none">{stat.value}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;