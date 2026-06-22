"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiX } from "react-icons/fi";

import {
  certificatesData,
  type Certificate,
} from "@/components/data/certificates";

import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  return (
    <section id="certificates" className="relative py-24 bg-background text-foreground px-5 sm:px-10 lg:px-16">
      <SectionHeader kicker="Credentials" title="Certificates" />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {certificatesData.map((cert: Certificate, index: number) => (
          <motion.button
            key={cert.id}
            type="button"
            onClick={() => setSelectedCertificate(cert)}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...springSoft, delay: index * 0.05 }}
            className="group text-left"
          >
            <div data-cursor-hover className="relative aspect-video border border-border bg-muted overflow-hidden">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-1.5">
                {cert.skills.slice(0, 3).join(" / ")}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/90"
              onClick={() => setSelectedCertificate(null)}
            />

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-2xl bg-card text-card-foreground border border-border shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-border flex justify-between items-center sticky top-0 z-50 bg-card">
                <span className="font-mono text-xs text-muted-foreground/70 tracking-wide">
                  CERTIFICATE DETAIL
                </span>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-6">
                <div className="relative w-full aspect-video border border-border overflow-hidden bg-muted">
                  <Image
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
                    {selectedCertificate.title}
                  </h2>

                  <div className="grid grid-cols-2 gap-6 py-4 border-y border-border">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        Issuer
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedCertificate.issuer}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-1">
                        Issued
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {selectedCertificate.date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                      Description
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-2">
                      Skills covered
                    </p>
                    <p className="text-sm font-mono text-muted-foreground leading-relaxed">
                      {selectedCertificate.skills.join(" / ")}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={selectedCertificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground border border-primary py-3 font-medium text-sm hover:bg-primary/90 transition-colors duration-200"
                    >
                      <FiExternalLink size={15} />
                      Verify credential
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