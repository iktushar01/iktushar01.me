"use client";

import React, { useRef, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiExternalLink, FiAward, FiEye, FiX } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { certificatesData, type Certificate } from "@/components/data/certificates";
import { springSoft, tiltSpring } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

const TiltCard = ({ children, className }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, tiltSpring);
  const sry = useSpring(ry, tiltSpring);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
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
    <section id="certificates" className="lp-section">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none lp-dots" />

      <div className="lp-container">
        <SectionHeader
          kicker="Skill Badges Unlocked! 🏆"
          kickerTone="primary"
          title={
            <>
               <span className="text-yellow-400">CERTIF</span><span className="text-primary">ICATES</span>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {certificatesData.map((cert: Certificate, index: number) => (
            <Dialog key={cert.id}>
              <DialogTrigger asChild>
                <div className="cursor-pointer group">
                  <TiltCard>
                    <motion.div
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...springSoft, delay: index * 0.06 }}
                      className="relative bg-card text-card-foreground border-4 border-border p-4 rounded-[var(--radius-cartoon)] shadow-cartoon-md group-hover:shadow-none group-hover:-translate-y-1 transition-all duration-200 ease-out"
                    >
                      <div className="relative h-48 sm:h-60 border-4 border-border overflow-hidden bg-muted rounded-[var(--radius-sticker)]">
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="bg-card border-4 border-border px-3 py-2 font-black uppercase italic text-xs flex items-center gap-2 shadow-cartoon-sm rounded-[var(--radius-sticker)]">
                            <FiEye /> View Detail
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 pb-1">
                        <h3 className="text-lg sm:text-xl font-black uppercase italic leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                          {cert.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 bg-muted border-2 border-border text-[9px] font-black uppercase rounded-[var(--radius-sticker)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </DialogTrigger>

              <DialogContent
                showCloseButton={false}
                className="w-[95%] max-w-2xl bg-card text-card-foreground border-4 border-border rounded-[var(--radius-sticker)] shadow-cartoon-md p-0 gap-0 overflow-hidden outline-none lp-scrollbar max-h-[90vh] overflow-y-auto sm:max-w-2xl"
              >
                <div className="bg-foreground text-background p-4 flex justify-between items-center sticky top-0 z-50 border-b-4 border-border">
                  <DialogTitle className="font-black italic uppercase tracking-wide flex items-center gap-2 text-xs sm:text-sm">
                    <FiAward className="text-accent" /> Achievement_Unlocked
                  </DialogTitle>
                  <DialogClose className="text-background hover:bg-destructive hover:text-white p-1.5 transition-colors duration-200 border-2 border-transparent hover:border-border rounded-[var(--radius-sticker)]">
                    <FiX size={20} />
                  </DialogClose>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="relative w-full aspect-video border-4 border-border shadow-cartoon-sm mb-6 overflow-hidden rounded-[var(--radius-sticker)] group">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-2xl sm:text-3xl font-black italic uppercase leading-tight decoration-primary decoration-4 underline underline-offset-4">
                      {cert.title}
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1 p-3 bg-accent text-accent-foreground border-4 border-border shadow-cartoon-sm -rotate-1 rounded-[var(--radius-sticker)]">
                        <p className="text-[9px] font-black uppercase opacity-70 leading-none mb-1">Issuer</p>
                        <p className="font-black text-sm sm:text-base truncate">{cert.issuer}</p>
                      </div>
                      <div className="flex-1 p-3 bg-secondary text-secondary-foreground border-4 border-border shadow-cartoon-sm rotate-1 rounded-[var(--radius-sticker)]">
                        <p className="text-[9px] font-black uppercase opacity-70 leading-none mb-1">Achieved</p>
                        <p className="font-black text-sm sm:text-base">{cert.date}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">Description</p>
                      <p className="font-semibold text-foreground/90 leading-relaxed bg-muted/50 p-4 border-l-4 border-border rounded-r-[var(--radius-sticker)]">
                        {cert.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-muted-foreground">Skills Earned</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 bg-card border-2 border-border font-black text-[10px] uppercase shadow-cartoon-sm rounded-[var(--radius-sticker)]"
                          >
                            #{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground border-4 border-border py-3.5 sm:py-4 font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 rounded-[var(--radius-sticker)] active:scale-[0.99]"
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
    </section>
  );
}
