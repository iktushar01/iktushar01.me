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
  FiChevronLeft,
  FiChevronRight,
  FiPackage,
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

    x.set((clientX - (left + width / 2)) * 0.25);
    y.set((clientY - (top + height / 2)) * 0.25);
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
        "bg-primary text-primary-foreground border border-primary/20 font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 ease-out flex items-center justify-center gap-2",
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
      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-muted border border-border rounded-xl font-medium text-xs sm:text-sm text-foreground hover:bg-muted/80 hover:border-border/80 transition-colors duration-200"
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springSoft}
      className="group relative flex flex-col md:flex-row gap-6 lg:gap-8 p-5 sm:p-6 bg-card/60 text-card-foreground border border-border rounded-2xl shadow-sm backdrop-blur-md transition-all duration-300 hover:border-border/80"
    >
      <div className="w-full md:w-1/2 aspect-video relative overflow-hidden border border-border/60 rounded-xl bg-muted">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
        />

        <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-accent/10 border border-accent/20 font-medium text-[10px] tracking-wide text-accent-foreground uppercase shadow-sm rounded-full backdrop-blur-md">
          Featured
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4 py-1">
        <div>
          <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-normal">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-muted border border-border/60 text-[10px] font-medium uppercase tracking-wider text-muted-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton onClick={onOpen}>
            <FiEye size={16} />
            Inspect
          </MagneticButton>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-muted border border-border shadow-sm hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200 rounded-xl"
          >
            <FiExternalLink size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [activeImage, setActiveImage] = useState(0);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveImage(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImage((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImage((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  return (
    <section id="projects" className="lp-section relative py-20 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] pointer-events-none lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          kicker="Portfolio Lab"
          kickerIcon={<FiPackage />}
          kickerTone="secondary"
          title={
            <>
              <span className="text-primary">CRAFTED </span>
              <span className="text-foreground">WORKS</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-8 mt-12">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => openProject(project)}
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
              className="absolute inset-0 bg-background/80 backdrop-blur-md border-y border-border"
              onClick={() => setSelectedProject(null)}
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-4xl bg-card/90 text-card-foreground border border-border shadow-lg rounded-2xl overflow-hidden max-h-[90vh] flex flex-col backdrop-blur-xl"
            >
              {/* HEADER */}
              <div className="p-4 bg-muted border-b border-border flex justify-between items-center sticky top-0 z-50">
                <span className="font-medium uppercase tracking-wider text-xs text-muted-foreground">
                  Project Terminal
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive p-1.5 transition-colors duration-200 border border-border/40 rounded-lg"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-6">
                {/* CAROUSEL WRAPPER */}
                <div className="relative aspect-video border border-border shadow-sm bg-muted rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={selectedProject.images[activeImage]}
                        alt={selectedProject.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 850px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* LEFT BTN */}
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-card/80 backdrop-blur-md border border-border text-foreground rounded-full shadow-sm hover:bg-card transition-all duration-200"
                  >
                    <FiChevronLeft size={18} />
                  </button>

                  {/* RIGHT BTN */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-card/80 backdrop-blur-md border border-border text-foreground rounded-full shadow-sm hover:bg-card transition-all duration-200"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>

                {/* THUMBNAILS */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 lp-scrollbar">
                  {selectedProject.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "relative min-w-[90px] h-[60px] overflow-hidden rounded-lg border transition-all duration-200 shadow-sm",
                        activeImage === index
                          ? "border-primary scale-[1.02]"
                          : "border-border opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img}
                        alt={`preview-${index}`}
                        fill
                        sizes="90px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                    {selectedProject.title}
                  </h2>

                  {/* LINK ACTIONS */}
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.frontendLink && (
                      <ActionButton
                        href={selectedProject.frontendLink}
                        icon={<FiGithub size={16} />}
                        label="Frontend"
                      />
                    )}
                    {selectedProject.backendLink && (
                      <ActionButton
                        href={selectedProject.backendLink}
                        icon={<FiGithub size={16} />}
                        label="Backend"
                      />
                    )}
                    <ActionButton
                      href={selectedProject.liveLink}
                      icon={<FiExternalLink size={16} />}
                      label="Live Preview"
                    />
                  </div>

                  {/* METADATA GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                      <h4 className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary font-medium uppercase text-[10px] tracking-wider rounded-md">
                        The Mission
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.challenges.map((c, i) => (
                          <li
                            key={i}
                            className="font-normal flex gap-2.5 text-muted-foreground text-sm leading-relaxed"
                          >
                            <span className="text-primary/70 text-xs mt-0.5">▶</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="inline-block px-2.5 py-0.5 bg-secondary/10 border border-secondary/20 text-secondary font-medium uppercase text-[10px] tracking-wider rounded-md">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-muted border border-border/60 text-[10px] font-medium uppercase tracking-wider text-muted-foreground rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
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