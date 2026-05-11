"use client";

import React, { useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiExternalLink, FiAward, FiEye, FiX } from "react-icons/fi";
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
    if (!ref.current || window.innerWidth < 768) return; // Disable tilt on mobile for better UX
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
    <section id="certificates" className="relative py-24 px-4 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 3px, transparent 3px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header */}
        <header className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 border-[4px] border-black bg-purple-400 font-black text-xs sm:text-sm uppercase mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Skill Badges Unlocked! 🏆
          </motion.div>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter drop-shadow-[6px_6px_0_rgba(0,0,0,1)] md:drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
            CERTIF<span className="text-primary">ICATES</span>
          </h2>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {certificatesData.map((cert: Certificate, index: number) => (
            <Dialog key={cert.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative bg-white dark:bg-zinc-900 border-[4px] border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-2 transition-all"
                    >
                      {/* Image Area */}
                      <div className="relative h-48 sm:h-64 border-[4px] border-black overflow-hidden bg-zinc-100">
                        <Image 
                          src={cert.image} 
                          alt={cert.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="bg-white border-4 border-black px-4 py-2 font-black uppercase italic flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <FiEye /> View Detail
                            </div>
                        </div>
                      </div>

                      {/* Info Area */}
                      <div className="pt-5 pb-1">
                        <h3 className="text-xl sm:text-2xl font-black uppercase italic leading-none mb-3 group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black text-[9px] font-black uppercase">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </DialogTrigger>

              {/* MODERN CARTOON MODAL */}
              <DialogContent className="w-[95%] max-w-2xl bg-white dark:bg-zinc-900 border-[6px] sm:border-[8px] border-black rounded-none shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] sm:shadow-[25px_25px_0px_0px_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden outline-none">
                
                {/* Fixed Header */}
                <div className="bg-black p-4 flex justify-between items-center sticky top-0 z-50">
                    <DialogTitle className="text-white font-black italic uppercase tracking-widest flex items-center gap-2 text-sm sm:text-base">
                       <FiAward className="text-yellow-400" /> Achievement_Unlocked
                    </DialogTitle>
                    <DialogClose className="text-white hover:bg-red-500 p-1 transition-colors border-2 border-transparent hover:border-black">
                       <FiX size={20} />
                    </DialogClose>
                </div>

                {/* Scrollable Content Body */}
                <div className="max-h-[80vh] overflow-y-auto p-5 sm:p-8 custom-scrollbar">
                  {/* Certificate Preview */}
                  <div className="relative w-full aspect-video border-[4px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 overflow-hidden group">
                    <Image 
                      src={cert.image} 
                      alt={cert.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-black italic uppercase leading-tight decoration-primary decoration-[6px] underline underline-offset-4">
                      {cert.title}
                    </h2>

                    {/* Stats/Badges Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 p-3 bg-yellow-400 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                        <p className="text-[9px] font-black uppercase text-black/60 leading-none mb-1">Issuer</p>
                        <p className="font-black text-base truncate">{cert.issuer}</p>
                      </div>
                      <div className="flex-1 p-3 bg-cyan-400 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-1">
                        <p className="text-[9px] font-black uppercase text-black/60 leading-none mb-1">Achieved</p>
                        <p className="font-black text-base">{cert.date}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase text-zinc-400">Description</p>
                        <p className="font-bold text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-4 border-l-4 border-black">
                        {cert.description}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase text-zinc-400">Skills Earned</p>
                        <div className="flex flex-wrap gap-2">
                            {cert.skills.map((skill) => (
                                <span key={skill} className="px-3 py-1 bg-white dark:bg-zinc-900 border-2 border-black font-black text-[10px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                    #{skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Fixed-at-bottom feel button */}
                    <div className="pt-4 sticky bottom-0 bg-white dark:bg-zinc-900 pb-2">
                        <a 
                            href={cert.credentialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-3 bg-primary text-primary-foreground border-[4px] border-black py-4 font-black uppercase italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
                        >
                            <FiExternalLink size={18} /> Verify Credential
                        </a>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-left: 1px solid rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border-radius: 0px;
        }
      `}</style>
    </section>
  );
}