"use client";

import React, { useRef, ReactNode, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import {
  FiExternalLink,
  FiAward,
  FiEye,
  FiX,
} from "react-icons/fi";

import {
  certificatesData,
  type Certificate,
} from "@/components/data/certificates";

import {
  springSoft,
  tiltSpring,
  springSnappy,
} from "@/lib/motion";

import { SectionHeader } from "@/components/modules/homepage/section-header";

const TiltCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const srx = useSpring(rx, tiltSpring);
  const sry = useSpring(ry, tiltSpring);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;

    const r = ref.current.getBoundingClientRect();

    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  return (
    <section id="certificates" className="lp-section relative py-20 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] pointer-events-none lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          kicker="Skill Badges Unlocked!"
          kickerIcon={<FiAward />}
          kickerTone="primary"
          title={
            <>
              <span className="text-primary">CERTIF</span>
              <span className="text-foreground">ICATES</span>
            </>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {certificatesData.map(
            (cert: Certificate, index: number) => (
              <div
                key={cert.id}
                className="cursor-pointer group"
                onClick={() => setSelectedCertificate(cert)}
              >
                <TiltCard>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      ...springSoft,
                      delay: index * 0.06,
                    }}
                    className="relative bg-card/60 text-card-foreground border border-border p-4 rounded-2xl shadow-sm hover:border-primary/30 transition-all duration-300 backdrop-blur-md"
                  >
                    <div className="relative h-48 sm:h-60 border border-border overflow-hidden bg-muted rounded-xl">
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-card border border-border px-4 py-2 font-medium uppercase text-xs flex items-center gap-2 shadow-sm rounded-xl text-foreground">
                          <FiEye className="text-primary" />
                          View Details
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 pb-1">
                      <h3 className="text-base sm:text-lg font-medium tracking-tight mb-2 group-hover:text-primary transition-colors duration-200 text-foreground">
                        {cert.title}
                      </h3>

                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills
                          .slice(0, 3)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-0.5 bg-muted border border-border/60 text-[10px] font-medium uppercase tracking-wider text-muted-foreground rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>
            )
          )}
        </div>
      </div>

      {/* CUSTOM MODAL */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md border-y border-border"
              onClick={() => setSelectedCertificate(null)}
            />

            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-2xl bg-card/90 text-card-foreground border border-border shadow-lg rounded-2xl overflow-hidden max-h-[90vh] flex flex-col backdrop-blur-xl"
            >
              {/* HEADER */}
              <div className="bg-muted border-b border-border p-4 flex justify-between items-center sticky top-0 z-50">
                <div className="font-medium uppercase tracking-wider flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <FiAward className="text-primary text-base" />
                  Achievement Unlocked
                </div>

                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive p-1.5 transition-colors duration-200 border border-border/40 rounded-lg"
                >
                  <FiX size={16} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-6">
                <div className="relative w-full aspect-video border border-border shadow-sm overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                    {selectedCertificate.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-muted/50 border border-border rounded-xl">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                        Issuer
                      </p>
                      <p className="font-medium text-sm text-foreground truncate">
                        {selectedCertificate.issuer}
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 border border-border rounded-xl">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
                        Achieved
                      </p>
                      <p className="font-medium text-sm text-foreground">
                        {selectedCertificate.date}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Description
                    </p>
                    <p className="text-sm font-normal text-muted-foreground leading-relaxed bg-muted/30 p-4 border border-border/60 rounded-xl">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Skills Earned
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCertificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-muted border border-border/60 text-[10px] font-medium uppercase tracking-wider text-muted-foreground rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={selectedCertificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground border border-primary/20 py-3 sm:py-3.5 font-medium uppercase text-xs tracking-wider shadow-sm hover:opacity-90 transition-all rounded-xl active:scale-[0.99]"
                    >
                      <FiExternalLink size={14} />
                      Verify Credential
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}