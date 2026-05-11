"use client";

import React, { useState, useRef, useCallback, ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiX, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { projectsData, type Project } from '@/components/data/projects';

// ─── Shadcn-like Utility Types ───────────────────────────────────────────────
interface MagneticProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

// ─── Tech colour map ──────────────────────────────────────────────────────────
const TECH_COLORS: Record<string, string> = {
  "Next.js 16": "bg-white/10 text-white border border-white/20",
  "React 19": "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
  TypeScript: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  "Tailwind CSS 4": "bg-teal-500/10 text-teal-400 border border-teal-500/30",
  "TanStack Query": "bg-orange-500/10 text-orange-400 border border-orange-500/30",
  "Node.js": "bg-green-500/10 text-green-400 border border-green-500/30",
  MongoDB: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  default: "bg-primary/10 text-primary border border-primary/30",
};

const getTechColor = (t: string) => TECH_COLORS[t] || TECH_COLORS.default;

// ─── Magnetic button ──────────────────────────────────────────────────────────
const MagneticButton: React.FC<MagneticProps> = ({ children, className, onClick, href, target, rel }) => {
  const ref = useRef<any>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      ref={ref}
      href={href} 
      target={target} 
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      className={className}
    >
      {children}
    </Tag>
  );
};

// ─── Image carousel ───────────────────────────────────────────────────────────
const ImageCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((p) => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setIdx((p) => (p - 1 + images.length) % images.length), [images.length]);

  return (
    <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden bg-black/60 group shadow-2xl border border-border/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={images[idx]}
            alt={`${title} screenshot ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary">
            <FiChevronLeft size={18} />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary">
            <FiChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 bg-background text-foreground overflow-hidden min-h-screen font-dm-sans">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <header className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block"
          >
            — Selected Works
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black mb-4 font-syne tracking-tight">
            Crafted <span className="text-primary">Code.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {projectsData.map((project: Project, index: number) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col md:flex-row gap-8 p-6 rounded-3xl bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
               <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden rounded-2xl border border-border/50">
                 <Image 
                   src={project.images[0]} 
                   alt={project.title} 
                   fill
                   sizes="(max-width: 768px) 100vw, 500px"
                   className="object-cover group-hover:scale-105 transition-transform duration-700" 
                 />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                 <div>
                   <h3 className="text-3xl font-bold mb-4 font-syne">{project.title}</h3>
                   <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                   <div className="flex flex-wrap gap-2 mb-8">
                     {project.technologies.slice(0, 6).map((tech: string) => (
                       <span key={tech} className={`px-3 py-1 rounded-full text-xs font-medium ${getTechColor(tech)}`}>
                         {tech}
                       </span>
                     ))}
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <MagneticButton onClick={() => setSelectedProject(project)} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                     <FiEye /> View Details
                   </MagneticButton>
                   <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-secondary/20 rounded-xl border border-border hover:bg-secondary/40 transition-colors">
                     <FiExternalLink size={20} className="text-foreground" />
                   </a>
                 </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/90 backdrop-blur-md" 
               onClick={() => setSelectedProject(null)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-card rounded-3xl overflow-hidden border border-border shadow-2xl"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-2 bg-secondary/40 rounded-full hover:bg-primary transition-colors text-foreground">
                <FiX size={20} />
              </button>
              <div className="p-8 max-h-[90vh] overflow-y-auto">
                <ImageCarousel images={selectedProject.images} title={selectedProject.title} />
                <h2 className="text-4xl font-bold mt-8 mb-4 font-syne">{selectedProject.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-4">The Challenge</h4>
                    <ul className="space-y-3">
                      {selectedProject.challenges.map((c: string, i: number) => (
                        <li key={i} className="text-muted-foreground text-sm flex gap-2">
                          <span className="text-primary">/</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-primary font-bold uppercase text-xs tracking-widest mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t: string) => (
                        <span key={t} className={`px-3 py-1 rounded-full text-[10px] ${getTechColor(t)}`}>{t}</span>
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