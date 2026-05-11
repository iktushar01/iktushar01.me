"use client";

import React, { useState, useRef, useCallback, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { projectsData, type Project } from '@/components/data/projects';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Magnetic Button (Cartoon Style) ──────────────────────────────────────────
const MagneticButton: React.FC<{ children: ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 15 });
  const sy = useSpring(y, { stiffness: 400, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((clientX - (left + width / 2)) * 0.4);
    y.set((clientY - (top + height / 2)) * 0.4);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "bg-primary text-primary-foreground border-[4px] border-black font-black uppercase italic px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// ─── Project Card (Sticker/Postcard Style) ─────────────────────────────────────
const ProjectCard: React.FC<{ project: Project; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: index % 2 === 0 ? -2 : 2, y: 50 }}
      whileInView={{ opacity: 1, rotate: 0, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
      className="group relative flex flex-col md:flex-row gap-8 p-8 bg-white dark:bg-zinc-900 border-[5px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Project Thumbnail */}
      <div className="w-full md:w-1/2 aspect-video relative overflow-hidden border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 border-[3px] border-black font-black text-xs uppercase -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Featured
        </div>
      </div>

      {/* Project Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-4xl font-black font-handwritten uppercase tracking-tighter mb-4 italic">
            {project.title}
          </h3>
          <p className="font-bold text-zinc-600 dark:text-zinc-400 mb-6 leading-tight">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white dark:bg-zinc-800 border-[3px] border-black text-[10px] font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                #{tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MagneticButton onClick={onOpen} className="flex items-center gap-2">
            <FiEye size={20} /> Inspect
          </MagneticButton>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white dark:bg-zinc-800 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <FiExternalLink size={24} className="text-black dark:text-white" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Projects Section ───────────────────────────────────────────────────
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6 bg-background overflow-hidden">
      {/* Background Decor (Grid/Dots) */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <header className="text-center mb-24">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-block px-6 py-2 border-[4px] border-black bg-cyan-400 font-black text-sm uppercase mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-3"
          >
            Portfolio Lab 🧪
          </motion.div>
          <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter drop-shadow-[10px_10px_0_rgba(0,0,0,1)] uppercase">
            CRAFTED <span className="text-primary">WORKS</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-24">
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

      {/* Modal Detail (Cartoon Style) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-yellow-400/20 backdrop-blur-xl border-[10px] border-black"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
              className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 border-[8px] border-black shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-4 bg-black text-white flex justify-between items-center">
                <span className="font-black italic uppercase text-sm">Project_Terminal.exe</span>
                <button onClick={() => setSelectedProject(null)} className="hover:text-red-500 transition-colors">
                  <FiX size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                {/* Simplified Carousel for Cartoon style */}
                <div className="relative aspect-video border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] bg-zinc-200 mb-8">
                  <Image
                    src={selectedProject.images[0]}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h2 className="text-5xl font-black font-handwritten italic uppercase mb-6">{selectedProject.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="inline-block px-3 py-1 bg-primary text-white border-[3px] border-black font-black uppercase text-xs mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      The Mission
                    </h4>
                    <ul className="space-y-4">
                      {selectedProject.challenges.map((c, i) => (
                        <li key={i} className="font-bold flex gap-3 text-zinc-600">
                          <span className="text-primary font-black">▶</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="inline-block px-3 py-1 bg-green-400 text-black border-[3px] border-black font-black uppercase text-xs mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      Technology
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t) => (
                        <span key={t} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-[3px] border-black text-xs font-black uppercase">
                          {t}
                        </span>
                      ))}
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