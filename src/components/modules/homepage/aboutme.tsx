"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaCode, FaPaintBrush } from "react-icons/fa";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ ...springSoft, delay: index * 0.06 }}
      className="h-full"
    >
      <TiltCard className="h-full">
        <div className="group relative h-full rounded-2xl border border-border bg-card/60 p-6 flex flex-col gap-4 shadow-sm hover:border-primary/30 transition-all duration-300 backdrop-blur-md">
          <div
            className={cn(
              "w-10 h-10 rounded-xl border border-border flex items-center justify-center text-base shadow-sm group-hover:scale-105 transition-transform duration-300",
              item.iconSurface,
            )}
          >
            {item.icon}
          </div>
          <div>
            <h3 className="text-base font-semibold mb-1.5 tracking-tight text-foreground">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm font-normal text-muted-foreground leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const AboutMe: React.FC = () => {
  const stories: StoryItem[] = [
    {
      icon: <FaCode />,
      iconSurface: "bg-primary/10 text-primary border-primary/20",
      title: "MERN Stack Engineer",
      content:
        "Architecting robust systems using MongoDB, Express, React, and Node.js. Obsessed with clean code architecture and aggressive performance layouts.",
    },
    {
      icon: <FaPaintBrush />,
      iconSurface: "bg-accent/10 text-accent-foreground border-accent/20",
      title: "UI/UX & Optimization",
      content:
        "Bridging elegant frontend layout systems with strict logical rules. Crafting production interfaces prioritizing responsive layouts and absolute pixel-perfection.",
    },
    {
      icon: <FiStar />,
      iconSurface: "bg-secondary/10 text-secondary-foreground border-secondary/20",
      title: "Next & Systems Grind",
      content:
        "Actively expanding structural pipelines into high-scale setups using Next.js frameworks, Go compilers, and reliable relational SQL platforms.",
    },
  ];

  const approaches: ApproachItem[] = [
    { skill: "Frontend Architecture (React/Next)", level: 92, barClass: "bg-primary" },
    { skill: "Backend Layouts (Node/Express/Go)", level: 85, barClass: "bg-accent" },
    { skill: "Database Optimization (SQL/NoSQL)", level: 80, barClass: "bg-secondary" },
  ];

  const stats: { label: string; value: string; surface: string }[] = [
    { label: "Built Projects", value: "6+", surface: "bg-accent/5 text-accent-foreground border-accent/20" },
    { label: "Tech Infrastructure Nodes", value: "12+", surface: "bg-primary/5 text-primary border-primary/20" },
    { label: "System Stamina", value: "100%", surface: "bg-secondary/5 text-secondary-foreground border-secondary/20" },
    { label: "Developer Tier", value: "PRO", surface: "bg-muted/40 text-foreground border-border" },
  ];

  return (
    <section id="about" className="lp-section relative py-20 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.03] lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[10s]" />

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          kicker="Who is this guy?"
          kickerTone="accent"
          title={
            <>
              <span className="text-primary">ABOUT</span> <span className="text-foreground">ME</span>
            </>
          }
        />

        {/* Brand New Modern Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch mt-12">
          
          {/* Main Context Box */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 bg-card/60 border border-border rounded-2xl backdrop-blur-md shadow-sm">
            <div className="space-y-4">
              <span className="inline-block bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md border border-primary/20">
                Core Identity
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                Md. Ibrahim Khalil Tushar
              </h3>
              <p className="text-sm sm:text-base font-normal text-muted-foreground leading-relaxed">
                Full-stack software developer pursuing a B.Sc. in Computer Science and Engineering at Uttara University. Focused on translating clean modular paradigms into fast web user spaces.
              </p>
            </div>

            {/* Quick-firing Dynamic Badges */}
            <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-border/60">
              {["#Acadex", "#Store-Xen", "#Medquix", "#DocScheduleBD"].map((project) => (
                <span
                  key={project}
                  className="bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-md font-medium text-[10px] uppercase tracking-wider"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          {/* Skill Matrix Box */}
          <div className="lg:col-span-6">
            <TiltCard className="h-full">
              <div className="h-full bg-card/60 text-card-foreground border border-border rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-center backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-muted border border-border flex items-center justify-center shadow-sm">
                    <FiStar className="text-primary text-base" />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight text-foreground">System Matrix</h3>
                </div>

                <div className="space-y-5">
                  {approaches.map((item, index) => (
                    <div key={item.skill} className="group">
                      <div className="flex justify-between text-xs mb-2 tracking-wide font-medium text-muted-foreground">
                        <span>{item.skill}</span>
                        <span className="bg-muted text-foreground px-1.5 py-0.5 rounded text-[10px] border border-border">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted border border-border rounded-full overflow-hidden">
                        <motion.div
                          className={cn("h-full rounded-full relative", item.barClass)}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ ...springSoft, delay: index * 0.1 }}
                        >
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(0,0,0,0.15)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.15)_50%,rgba(0,0,0,0.15)_75%,transparent_75%,transparent)] bg-[length:8px_8px]" />
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
                whileHover={{ y: -2, scale: 1.01 }}
                transition={springSoft}
                className={cn(
                  "border border-border p-5 rounded-2xl shadow-sm flex flex-col justify-center backdrop-blur-md",
                  stat.surface,
                )}
              >
                <p className="text-[10px] font-medium uppercase opacity-70 tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-semibold tracking-tight leading-none">{stat.value}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;