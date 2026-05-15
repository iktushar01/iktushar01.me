"use client";

import React, { useState, useRef, ReactNode } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import {
  FiExternalLink,
  FiX,
  FiEye,
  FiGithub,
} from "react-icons/fi";

import { projectsData, type Project } from "@/components/data/projects";
import { cn } from "@/lib/utils";
import {
  springSoft,
  springMagnetic,
  springSnappy,
} from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

const MagneticButton: React.FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, springMagnetic);
  const sy = useSpring(y, springMagnetic);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      ref.current.getBoundingClientRect();

    x.set((clientX - (left + width / 2)) * 0.35);
    y.set((clientY - (top + height / 2)) * 0.35);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "bg-primary text-primary-foreground border-4 border-border font-black uppercase italic px-6 py-3 rounded-[var(--radius-sticker)] shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

const ActionButton = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 px-5 py-3 bg-card border-4 border-border rounded-[var(--radius-sticker)] font-black uppercase text-xs sm:text-sm shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200"
    >
      {icon}
      {label}
    </a>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  onOpen: () => void;
}> = ({ project, index, onOpen }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotate: index % 2 === 0 ? -1 : 1,
        y: 32,
      }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={springSoft}
      className="group relative flex flex-col md:flex-row gap-8 p-6 sm:p-8 bg-card text-card-foreground border-4 border-border rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md transition-shadow duration-200"
    >
      <div className="w-full md:w-1/2 aspect-video relative overflow-hidden border-4 border-border rounded-[var(--radius-sticker)] shadow-cartoon-sm">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
        />

        <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground border-4 border-border font-black text-[10px] uppercase -rotate-2 shadow-cartoon-sm rounded-[var(--radius-sticker)]">
          Featured
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-6">
        <div>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-3 italic">
            {project.title}
          </h3>

          <p className="font-semibold text-muted-foreground mb-6 leading-snug">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-muted border-2 border-border text-[10px] font-black uppercase shadow-cartoon-sm rounded-[var(--radius-sticker)]"
              >
                #{tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={onOpen}
            className="flex items-center gap-2"
          >
            <FiEye size={18} />
            Inspect
          </MagneticButton>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 sm:p-4 bg-card border-4 border-border shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 rounded-[var(--radius-sticker)]"
          >
            <FiExternalLink
              size={22}
              className="text-foreground"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <section id="projects" className="lp-section">
      <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05] pointer-events-none lp-dots" />

      <div className="lp-container">
        <SectionHeader
          kicker="Portfolio Lab 🧪"
          kickerTone="secondary"
          title={
            <>
              <span className="text-yellow-400">
                CRAFTED{" "}
              </span>
              <span className="text-primary">
                WORKS
              </span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-16 sm:gap-20">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md border-y-4 border-border"
              onClick={() => setSelectedProject(null)}
            />

            {/* MODAL */}
            <motion.div
              initial={{
                scale: 0.94,
                rotate: -1,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.94,
                rotate: 1,
                opacity: 0,
              }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-4xl bg-card text-card-foreground border-4 border-border shadow-cartoon-md rounded-[var(--radius-sticker)] overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* HEADER */}
              <div className="p-3 sm:p-4 bg-foreground text-background flex justify-between items-center border-b-4 border-border">
                <span className="font-black italic uppercase text-xs tracking-wide">
                  Project_Terminal.exe
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedProject(null)
                  }
                  className="hover:text-destructive transition-colors duration-200 p-1"
                >
                  <FiX size={22} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 sm:p-8 overflow-y-auto lp-scrollbar">
                <div className="relative aspect-video border-4 border-border shadow-cartoon-sm bg-muted mb-6 rounded-[var(--radius-sticker)] overflow-hidden">
                  <Image
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-3xl sm:text-4xl font-black italic uppercase mb-5 tracking-tight">
                  {selectedProject.title}
                </h2>

                {/* 3 BUTTONS */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <ActionButton
                    href={selectedProject.frontendLink}
                    icon={<FiGithub size={18} />}
                    label="Frontend"
                  />

                  <ActionButton
                    href={selectedProject.backendLink}
                    icon={<FiGithub size={18} />}
                    label="Backend"
                  />

                  <ActionButton
                    href={selectedProject.liveLink}
                    icon={<FiExternalLink size={18} />}
                    label="Live Preview"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="inline-block px-3 py-1 bg-primary text-primary-foreground border-4 border-border font-black uppercase text-[10px] mb-3 shadow-cartoon-sm rounded-[var(--radius-sticker)]">
                      The Mission
                    </h4>

                    <ul className="space-y-3">
                      {selectedProject.challenges.map(
                        (c, i) => (
                          <li
                            key={i}
                            className="font-semibold flex gap-2 text-muted-foreground text-sm sm:text-base"
                          >
                            <span className="text-primary font-black">
                              ▶
                            </span>

                            {c}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="inline-block px-3 py-1 bg-secondary text-secondary-foreground border-4 border-border font-black uppercase text-[10px] mb-3 shadow-cartoon-sm rounded-[var(--radius-sticker)]">
                      Technology
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(
                        (t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-muted border-2 border-border text-[10px] font-black uppercase rounded-[var(--radius-sticker)]"
                          >
                            {t}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;