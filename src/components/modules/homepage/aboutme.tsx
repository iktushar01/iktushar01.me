"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCreditCard,
  FiX,
  FiLayers,
  FiLayout,
  FiServer,
  FiDatabase,
  FiCode,
  FiTrendingUp,
  FiMapPin,
  FiBriefcase,
  FiBookOpen,
  FiUser,
  FiCheck,
  FiCompass,
} from "react-icons/fi";
import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import { cn } from "@/lib/utils";

const ID_CARD_FRONT =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792186/ChatGPT_Image_Jun_30_2026_09_55_36_AM_aournx.png";
const ID_CARD_BACK =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792185/ChatGPT_Image_Jun_30_2026_09_59_48_AM_uoycy6.png";

const specCards = [
  { icon: FiUser, label: "Name", value: "Md. Ibrahim Khalil Tushar" },
  { icon: FiBriefcase, label: "Role", value: "Full Stack Developer" },
  { icon: FiBookOpen, label: "Education", value: "B.Sc. CSE, Uttara University" },
  { icon: FiMapPin, label: "Location", value: "Gazipur, Bangladesh" },
];

const services = [
  { icon: FiLayers, title: "Full Stack Web Application Development" },
  { icon: FiLayout, title: "Modern & Responsive UI/UX Implementation" },
  { icon: FiServer, title: "REST API Development & Backend Systems" },
  { icon: FiDatabase, title: "Database Design & Performance Optimization" },
  { icon: FiCode, title: "Clean Architecture & Maintainable Codebases" },
  { icon: FiTrendingUp, title: "Scalable and Performance-Focused Solutions" },
];

const exploring = [
  "Advanced Backend Architecture",
  "Scalable System Design",
  "Cloud & DevOps Technologies",
  "Go (Golang)",
];

const openTo = [
  "Freelance & Remote Opportunities",
  "Full Stack Development Projects",
  "Open Source Collaboration",
  "Long-Term Professional Collaboration",
];

function BlockTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-4">
      {children}
    </h3>
  );
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

  return (
    <section
      id="about"
      className="relative py-14 sm:py-20 lg:py-24 bg-background text-foreground px-4 sm:px-10 lg:px-16"
    >
      <SectionHeader kicker="Who is this guy?" title="About Me" />

      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
        {/* Left: sticky intro */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-4">
              Profile
            </span>
            <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium tracking-tight">
              Hi, I&rsquo;m Ibrahim Khalil Tushar — a Full Stack Developer focused on
              building scalable, high-performance web applications that deliver seamless
              user experiences and real business value.
            </p>
            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              I specialize in production-ready applications using React.js, Next.js,
              Node.js, Express.js, MongoDB, PostgreSQL, Prisma, and TypeScript —
              writing clean, maintainable code and designing architectures built for
              long-term growth.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              From responsive interfaces to secure backends and optimized APIs, I enjoy
              transforming ideas into fast, functional, and visually engaging digital
              products.
            </p>
            <button
              type="button"
              onClick={openIdCardModal}
              data-cursor-hover
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              <FiCreditCard size={15} />
              View ID card
            </button>
          </div>
        </div>

        {/* Right: scrollable content — each block has a distinct layout */}
        <div className="lg:col-span-7 space-y-12 sm:space-y-16">
          {/* 1. Profile — compact info cards + status banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
          >
            <BlockTitle>At a glance</BlockTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specCards.map((card, idx) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: idx * 0.05 }}
                  className="border border-border p-4 bg-muted/20"
                >
                  <card.icon className="size-4 text-muted-foreground mb-2" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground leading-snug">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: 0.2 }}
              className="mt-3 flex items-center gap-3 border border-primary/30 bg-primary/10 px-4 py-3"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              <p className="text-sm font-medium text-primary">Open to opportunities</p>
            </motion.div>
          </motion.div>

          {/* 2. Services — icon card grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
          >
            <BlockTitle>What I can help with</BlockTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: idx * 0.04 }}
                  className="group flex gap-3 border border-border p-4 hover:border-primary/40 hover:bg-muted/30 transition-colors duration-200"
                >
                  <div className="shrink-0 flex size-9 items-center justify-center border border-border bg-background text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-colors duration-200">
                    <service.icon size={16} />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-1">
                    {service.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 4. Exploring — flowing pill cloud */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
          >
            <BlockTitle>Currently exploring</BlockTitle>
            <div className="border border-dashed border-border p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                <FiCompass size={14} />
                <span className="text-xs font-mono">Learning roadmap</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {exploring.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...springSoft, delay: idx * 0.06 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-primary bg-primary/10 border border-primary/25"
                  >
                    <span className="text-[10px] font-mono text-primary/60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 5. Open to — checklist panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
          >
            <BlockTitle>Open to</BlockTitle>
            <ul className="divide-y divide-border border border-border bg-muted/20">
              {openTo.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: idx * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3.5"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <FiCheck size={11} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 6. Philosophy — pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
            className="relative border-l-4 border-primary pl-6 py-2"
          >
            <BlockTitle>Philosophy</BlockTitle>
            <span
              className="absolute -top-1 left-4 text-5xl font-serif text-primary/20 leading-none select-none"
              aria-hidden
            >
              &ldquo;
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              I enjoy collaborating on impactful projects, solving complex problems, and
              continuously improving my skills to stay aligned with modern technologies and
              industry standards.
            </p>
            <p className="mt-4 text-base sm:text-lg font-medium text-foreground leading-relaxed tracking-tight">
              Great products are built through clean code, thoughtful design, scalability,
              and continuous innovation — let&rsquo;s connect and build something impactful
              together.
            </p>
          </motion.blockquote>
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
