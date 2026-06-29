"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiExternalLink,
  FiX,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
  FiPlay,
} from "react-icons/fi";

import type { Project } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

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
      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-transparent border border-border rounded-none font-medium text-xs sm:text-sm text-foreground hover:bg-muted transition-colors duration-200"
    >
      {icon}
      {label}
    </a>
  );
};

const ProjectRow: React.FC<{
  project: Project;
  index: number;
  onOpen: () => void;
}> = ({ project, index, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...springSoft, delay: index * 0.04 }}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 py-6 sm:py-8 lg:py-10 border-b border-border last:border-b-0"
    >
      {/* Image */}
      <button
        type="button"
        onClick={onOpen}
        data-cursor-hover
        className="lg:col-span-5 relative aspect-video overflow-hidden border border-border bg-muted text-left"
      >
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </button>

      {/* Content */}
      <div className="lg:col-span-7 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-muted-foreground/50 shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
            {project.description}
          </p>

          <p className="text-xs font-mono text-muted-foreground">
            {project.technologies.slice(0, 4).join(" / ")}
          </p>
        </div>

        <div className="flex items-center gap-5 pt-2">
          <button
            type="button"
            onClick={onOpen}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            View details <FiArrowUpRight size={15} />
          </button>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Live site <FiExternalLink size={14} />
            </a>
          )}

          {project.demoVideoLink && (
            <a
              href={project.demoVideoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Demo video <FiPlay size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC<{
  projects: Project[];
  limit?: number;
  showAllButton?: boolean;
  kicker?: string;
  title?: string;
}> = ({ projects, limit, showAllButton, kicker = "Selected work", title = "Projects" }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const displayedProjects = limit
    ? projects.slice(0, limit)
    : projects;

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
    <section id="projects" className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16">
      <SectionHeader kicker={kicker} title={title} />

      <div className="mt-8 sm:mt-12">
        {displayedProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            onOpen={() => openProject(project)}
          />
        ))}
      </div>

      {showAllButton && (
        <div className="mt-10 sm:mt-14 flex justify-center">
          <Link
            href="/project"
            className="group inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
          >
            View all projects
            <FiArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/90"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-4xl bg-card text-card-foreground border border-border shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-border flex justify-between items-center sticky top-0 z-50 bg-card">
                <span className="font-mono text-xs text-muted-foreground/70 tracking-wide">
                  PROJECT DETAIL
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-6">
                {/* Carousel */}
                <div className="relative aspect-video border border-border bg-muted overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
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

                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border text-foreground hover:bg-background transition-colors duration-200"
                    aria-label="Previous image"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/80 border border-border text-foreground hover:bg-background transition-colors duration-200"
                    aria-label="Next image"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 lp-scrollbar">
                  {selectedProject.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={cn(
                        "relative min-w-[90px] h-[60px] overflow-hidden border transition-opacity duration-200",
                        activeImage === index
                          ? "border-primary opacity-100"
                          : "border-border opacity-50 hover:opacity-90"
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

                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    {selectedProject.title}
                  </h2>

                  {/* Link actions */}
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
                    {selectedProject.liveLink && (
                      <ActionButton
                        href={selectedProject.liveLink}
                        icon={<FiExternalLink size={16} />}
                        label="Live preview"
                      />
                    )}
                    {selectedProject.demoVideoLink && (
                      <ActionButton
                        href={selectedProject.demoVideoLink}
                        icon={<FiPlay size={16} />}
                        label="Demo video"
                      />
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 border-t border-border">
                    <div className="pt-5">
                      <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                        Key challenges
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedProject.challenges.map((c, i) => (
                          <li
                            key={i}
                            className="flex gap-2.5 text-muted-foreground text-sm leading-relaxed"
                          >
                            <span className="text-muted-foreground/40 font-mono text-xs mt-0.5">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-5">
                      <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-3">
                        Stack
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                        {selectedProject.technologies.join(" / ")}
                      </p>
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