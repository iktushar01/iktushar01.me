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
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ ...springSoft, delay: index * 0.08 }}
    >
      <TiltCard>
        <div className="group relative rounded-[var(--radius-cartoon)] border-4 border-border bg-card text-card-foreground p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-cartoon-md hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 ease-out">
          <div
            className={cn(
              "flex-shrink-0 w-16 h-16 rounded-[var(--radius-sticker)] border-4 border-border flex items-center justify-center text-3xl text-primary-foreground shadow-cartoon-sm group-hover:rotate-6 transition-transform duration-200",
              item.iconSurface,
            )}
          >
            {item.icon}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-2 uppercase italic tracking-tight">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-muted-foreground leading-snug">
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
      iconSurface: "bg-primary",
      title: "The Code Smith",
      content:
        "Building digital kingdoms with the MERN stack. I turn coffee into clean, scalable architectures.",
    },
    {
      icon: <FaPaintBrush />,
      iconSurface: "bg-accent text-accent-foreground",
      title: "UI Artisan",
      content:
        "Aesthetics meet logic. I obsess over pixels, ensuring every interaction feels like a breeze.",
    },
    {
      icon: <FaGamepad />,
      iconSurface: "bg-secondary text-secondary-foreground",
      title: "Level 99 Gamer",
      content:
        "Tactical precision in Valorant, survival instincts in PUBG. Gaming fuels my strategic thinking.",
    },
  ];

  const approaches: ApproachItem[] = [
    { skill: "Logic Crafting", level: 92, barClass: "bg-primary" },
    { skill: "Pixel Perfection", level: 88, barClass: "bg-accent" },
    { skill: "Data Sorcery", level: 85, barClass: "bg-secondary" },
  ];

  const stats: { label: string; value: string; surface: string }[] = [
    { label: "XP Points", value: "1.5y", surface: "bg-accent text-accent-foreground" },
    { label: "Missions", value: "12+", surface: "bg-primary text-primary-foreground" },
    { label: "Stamina", value: "100%", surface: "bg-secondary text-secondary-foreground" },
    { label: "Rank", value: "PRO", surface: "bg-muted text-foreground" },
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
              ABOUT <span className="text-primary">ME!</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7 space-y-8">
            {stories.map((item, index) => (
              <StoryCard key={item.title} item={item} index={index} />
            ))}
          </div>

          <div className="lg:col-span-5 space-y-8">
            <TiltCard>
              <div className="bg-card text-card-foreground border-4 border-border rounded-[var(--radius-cartoon-lg)] p-8 shadow-cartoon-md">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center border-4 border-border shadow-cartoon-sm">
                    <FiStar className="text-accent text-2xl" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tight">Skill Levels</h3>
                </div>

                <div className="space-y-8">
                  {approaches.map((item, index) => (
                    <div key={item.skill} className="group">
                      <div className="flex justify-between font-black uppercase text-xs sm:text-sm mb-2 tracking-wide">
                        <span>{item.skill}</span>
                        <span className="bg-foreground text-background px-2 py-0.5 rounded-md italic border-2 border-border">
                          {item.level}%
                        </span>
                      </div>
                      <div className="h-7 sm:h-8 w-full bg-muted border-4 border-border rounded-[var(--radius-sticker)] overflow-hidden shadow-cartoon-sm">
                        <motion.div
                          className={cn("h-full border-r-4 border-border relative", item.barClass)}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ ...springSoft, delay: index * 0.12 }}
                        >
                          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,rgba(0,0,0,0.12)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.12)_75%,transparent_75%,transparent)] bg-[length:16px_16px]" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  transition={springSoft}
                  className={cn(
                    "border-4 border-border p-4 rounded-[var(--radius-sticker)] shadow-cartoon-sm",
                    stat.surface,
                  )}
                >
                  <p className="text-[10px] font-black uppercase opacity-80">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-black italic leading-none">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {["Coffee Addict", "Night Owl", "Fast Learner", "Team Player"].map((tag) => (
                <span
                  key={tag}
                  className="bg-muted/80 border-4 border-border px-3 py-1.5 rounded-full font-black text-[10px] sm:text-xs uppercase shadow-cartoon-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
