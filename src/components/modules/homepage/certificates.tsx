"use client";

import React, { useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiAward, FiCalendar, FiEye, FiX } from "react-icons/fi";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { certificatesData, type Certificate } from "@/components/data/certificates";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Cartoon Tilt Component ---
const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 15 });
  const sry = useSpring(ry, { stiffness: 300, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 15);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 15);
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
    <section id="certificates" className="relative py-32 px-6 bg-background overflow-hidden">
      {/* Polka Dot Background */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 3px, transparent 3px)", backgroundSize: "40px 40px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-24">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: -3 }}
            className="inline-block px-6 py-2 border-[4px] border-black bg-purple-400 font-black text-sm uppercase mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Skill Badges Unlocked! 🏆
          </motion.div>
          <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
            CERTIF<span className="text-primary">ICATES</span>
          </h2>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {certificatesData.map((cert: Certificate, index: number) => (
            <Dialog key={cert.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative bg-white dark:bg-zinc-900 border-[5px] border-black p-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[18px_18px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-all"
                    >
                      {/* Image Area */}
                      <div className="relative h-64 border-[4px] border-black overflow-hidden bg-zinc-100">
                        <Image 
                          src={cert.image} 
                          alt={cert.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white border-4 border-black px-4 py-2 font-black uppercase italic flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <FiEye /> Inspect
                            </div>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="pt-6 pb-2">
                        <h3 className="text-2xl font-black uppercase italic leading-none mb-3">
                          {cert.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </DialogTrigger>

              {/* Cartoon Modal Content */}
              <DialogContent className="max-w-2xl bg-white dark:bg-zinc-900 border-[8px] border-black rounded-none shadow-[30px_30px_0px_0px_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden">
                <div className="bg-black p-4 flex justify-between items-center">
                    <DialogTitle className="text-white font-black italic uppercase tracking-widest flex items-center gap-2">
                       <FiAward className="text-yellow-400" /> Achievement_Unlocked
                    </DialogTitle>
                    <DialogClose className="text-white hover:text-red-500 transition-colors">
                        <FiX size={24} />
                    </DialogClose>
                </div>

                <div className="p-8">
                  <div className="relative h-64 border-[5px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] mb-8 overflow-hidden">
                    <Image 
                      src={cert.image} 
                      alt={cert.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  
                  <h2 className="text-4xl font-black italic uppercase mb-6 leading-tight underline decoration-primary decoration-4">
                    {cert.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-yellow-400 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                      <p className="text-[10px] font-black uppercase text-black/60">Issuer</p>
                      <p className="font-black text-lg">{cert.issuer}</p>
                    </div>
                    <div className="p-4 bg-cyan-400 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1">
                      <p className="text-[10px] font-black uppercase text-black/60">Achieved</p>
                      <p className="font-black text-lg">{cert.date}</p>
                    </div>
                  </div>

                  <p className="font-bold text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                    {cert.description}
                  </p>

                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex w-full items-center justify-center gap-3 bg-primary text-primary-foreground border-[5px] border-black py-4 font-black uppercase italic shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
                  >
                    <FiExternalLink size={20} /> Verify This Win
                  </a>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}