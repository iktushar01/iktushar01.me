"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiX } from "react-icons/fi";
import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

const ID_CARD_FRONT =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792186/ChatGPT_Image_Jun_30_2026_09_55_36_AM_aournx.png";
const ID_CARD_BACK =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792185/ChatGPT_Image_Jun_30_2026_09_59_48_AM_uoycy6.png";

interface SpecRow {
  index: string;
  label: string;
  value: string;
}

interface DomainItem {
  label: string;
  tools: string;
  note: string;
}

const AboutMe: React.FC = () => {
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [showIdCardBack, setShowIdCardBack] = useState(false);

  const openIdCardModal = () => {
    setShowIdCardBack(false);
    setIsIdCardOpen(true);
  };

  const closeIdCardModal = () => {
    setIsIdCardOpen(false);
    setShowIdCardBack(false);
  };

  const specRows: SpecRow[] = [
    { index: "01", label: "Name", value: "Md. Ibrahim Khalil Tushar" },
    { index: "02", label: "Role", value: "Full-stack Web Developer" },
    { index: "03", label: "Education", value: "B.Sc. CSE, Uttara University" },
    { index: "04", label: "Location", value: "Gazipur, Bangladesh" },
  ];

  const domains: DomainItem[] = [
    {
      label: "Frontend",
      tools: "React, Next.js, TypeScript",
      note: "Interfaces built for real traffic, not just the demo — responsive by default, fast by default.",
    },
    {
      label: "Backend",
      tools: "Node.js, Express, Go",
      note: "APIs and services designed around clear boundaries, predictable failure modes, and clean data contracts.",
    },
    {
      label: "Data",
      tools: "MongoDB, PostgreSQL",
      note: "Schema decisions made for the query patterns the product actually needs, not the ones that look neat in a diagram.",
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16">
      <SectionHeader kicker="Who is this guy?" title="About Me" />

      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
        {/* Left: fixed label, running paragraph */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-4">
              Profile
            </span>
            <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium tracking-tight">
              I architect MERN-stack and Next.js systems end to end — from
              schema design to the pixel that ships.
            </p>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              Most of my time goes into the boring parts that make software
              trustworthy: clear data models, predictable APIs, and interfaces
              that don&rsquo;t fall apart outside the happy path. Currently
              expanding into Go and relational systems for work that needs to
              hold at scale.
            </p>
            <button
              type="button"
              onClick={openIdCardModal}
              className="mt-6 group inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
            >
              <FiCreditCard
                size={15}
                className="text-muted-foreground group-hover:text-foreground transition-colors duration-200"
              />
              View ID card
            </button>
          </div>
        </div>

        {/* Right: spec sheet table */}
        <div className="lg:col-span-7">
          <dl>
            {specRows.map((row, idx) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.05 }}
                className="grid grid-cols-[2.5rem_8rem_1fr] sm:grid-cols-[3rem_9rem_1fr] items-baseline gap-4 py-4 border-b border-border"
              >
                <dt className="text-xs font-mono text-muted-foreground/60">
                  {row.index}
                </dt>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  {row.label}
                </dt>
                <dd className="text-sm sm:text-base font-medium text-foreground tracking-tight">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>

          {/* Domains list */}
          <div className="mt-8 sm:mt-12">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-2">
              Where I work
            </span>
            {domains.map((domain, idx) => (
              <motion.div
                key={domain.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.06 }}
                className="py-5 border-b border-border last:border-b-0 grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-2 sm:gap-4"
              >
                <div>
                  <h3 className="text-sm font-semibold text-foreground tracking-tight">
                    {domain.label}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    {domain.tools}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {domain.note}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isIdCardOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/90"
              onClick={closeIdCardModal}
            />

            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={springSnappy}
              className="relative z-[110] w-full max-w-lg bg-card text-card-foreground border border-border shadow-lg overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-5 py-4 border-b border-border flex justify-between items-center sticky top-0 z-50 bg-card">
                <span className="font-mono text-xs text-muted-foreground/70 tracking-wide">
                  {showIdCardBack ? "ID CARD — BACK" : "ID CARD — FRONT"}
                </span>
                <button
                  type="button"
                  onClick={closeIdCardModal}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Close"
                >
                  <FiX size={18} />
                </button>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto lp-scrollbar space-y-5">
                <div className="relative w-full aspect-[1.586/1] border border-border overflow-hidden bg-muted">
                  <Image
                    src={showIdCardBack ? ID_CARD_BACK : ID_CARD_FRONT}
                    alt={showIdCardBack ? "ID card back" : "ID card front"}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowIdCardBack((prev) => !prev)}
                  className="w-full border border-border py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
                >
                  {showIdCardBack ? "View front" : "View back"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutMe;