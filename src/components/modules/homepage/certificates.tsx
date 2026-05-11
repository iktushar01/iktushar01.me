"use client";

import React, { useState, useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiAward, FiCalendar, FiZap } from "react-icons/fi";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { certificatesData, type Certificate } from "@/components/data/certificates";

// --- Types ---
interface TechColors {
  [key: string]: string;
}

const TECH_COLORS: TechColors = {
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  MongoDB: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/30",
  "UI/UX": "bg-pink-500/10 text-pink-400 border-pink-500/30",
  default: "bg-primary/10 text-primary border-primary/30",
};

const getTechColor = (t: string) => TECH_COLORS[t] || TECH_COLORS.default;

// --- Sub-Components ---
const GlitchText = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block group font-syne">
    <span className="relative z-10">{children}</span>
    <span aria-hidden className="absolute inset-0 text-primary opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none transition-opacity duration-300"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}>{children}</span>
    <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none transition-opacity duration-300"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}>{children}</span>
  </span>
);

const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 25 });
  const sry = useSpring(ry, { stiffness: 200, damping: 25 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMove} 
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 px-4 sm:px-8 bg-background text-foreground overflow-hidden font-dm-sans">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, var(--primary) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-primary mb-4 block">— Achievements</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-syne">
            Certificates & <span className="text-primary">Awards</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm max-w-xs mx-auto">
            A testament to my dedication and continuous learning journey.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificatesData.map((cert: Certificate, index: number) => (
            <Dialog key={cert.id}>
              <DialogTrigger asChild>
                <div className="h-full">
                  <TiltCard className="h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative h-full rounded-2xl border border-border bg-card/40 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col"
                    >
                      {/* Image Preview */}
                      <div className="relative h-52 overflow-hidden bg-black/40">
                        <Image 
                          src={cert.image} 
                          alt={cert.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Badge variant="destructive" className="flex gap-2"><FiAward /> View Details</Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold mb-2 font-syne">
                          <GlitchText>{cert.title}</GlitchText>
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{cert.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {cert.skills.slice(0, 3).map((skill: string) => (
                            <Badge key={skill} variant="outline" className={getTechColor(skill)}>
                              {skill}
                            </Badge>
                          ))}
                          {cert.skills.length > 3 && <Badge variant="secondary" className="bg-secondary/30 text-foreground">+{cert.skills.length - 3}</Badge>}
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </DialogTrigger>

              {/* Modal Content */}
              <DialogContent className="max-w-2xl bg-card border-border text-foreground">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-syne font-bold">{cert.title}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-6">
                  <div className="relative h-64 rounded-xl overflow-hidden border border-border">
                    <Image src={cert.image} alt={cert.title} fill className="object-cover" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[10px] uppercase text-primary font-bold mb-1">Issuer</p>
                      <p className="flex items-center gap-2 text-sm"><FiAward className="text-primary" /> {cert.issuer}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border">
                      <p className="text-[10px] uppercase text-primary font-bold mb-1">Date</p>
                      <p className="flex items-center gap-2 text-sm"><FiCalendar className="text-primary" /> {cert.date}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{cert.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {cert.skills.map((skill: string) => (
                        <Badge key={skill} variant="outline" className={`${getTechColor(skill)} py-1 px-3`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                    >
                      <FiExternalLink /> Verify Credential
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}