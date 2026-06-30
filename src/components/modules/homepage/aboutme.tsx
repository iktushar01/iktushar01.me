"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCreditCard, FiX } from "react-icons/fi";
import { springSoft, springSnappy } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";
import { cn } from "@/lib/utils";

const ID_CARD_FRONT =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792186/ChatGPT_Image_Jun_30_2026_09_55_36_AM_aournx.png";
const ID_CARD_BACK =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1782792185/ChatGPT_Image_Jun_30_2026_09_59_48_AM_uoycy6.png";

const specRows = [
  { index: "01", label: "Name", value: "Md. Ibrahim Khalil Tushar" },
  { index: "02", label: "Role", value: "Full Stack Developer" },
  { index: "03", label: "Education", value: "B.Sc. CSE, Uttara University" },
  { index: "04", label: "Location", value: "Gazipur, Bangladesh" },
  { index: "05", label: "Status", value: "Open to opportunities" },
];

const services = [
  "Full Stack Web Application Development",
  "Modern & Responsive UI/UX Implementation",
  "REST API Development & Backend Systems",
  "Database Design & Performance Optimization",
  "Clean Architecture & Maintainable Codebases",
  "Scalable and Performance-Focused Solutions",
];

const techStack = [
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    label: "Tools & Technologies",
    items: ["Git", "GitHub", "Docker", "Firebase", "Linux", "Postman", "Vercel"],
  },
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-4">
      {children}
    </span>
  );
}

function TagPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border bg-muted/40",
        className
      )}
    >
      {children}
    </span>
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

      {/* Intro + profile specs */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springSoft}
            >
              <SectionLabel>Introduction</SectionLabel>
              <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium tracking-tight">
                Hi, I&rsquo;m Ibrahim Khalil Tushar — a Full Stack Developer focused on
                building scalable, high-performance web applications that deliver seamless
                user experiences and real business value.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: 0.05 }}
              className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground"
            >
              <p>
                I specialize in production-ready applications using React.js, Next.js,
                Node.js, Express.js, MongoDB, PostgreSQL, Prisma, and TypeScript —
                writing clean, maintainable code and designing architectures built for
                long-term growth.
              </p>
              <p>
                From responsive interfaces to secure backends and optimized APIs, I enjoy
                transforming ideas into fast, functional, and visually engaging digital
                products.
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={openIdCardModal}
              data-cursor-hover
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: 0.1 }}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              <FiCreditCard size={15} />
              View ID card
            </motion.button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel>Profile</SectionLabel>
          <dl>
            {specRows.map((row, idx) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.04 }}
                className="grid grid-cols-[2.5rem_8rem_1fr] sm:grid-cols-[3rem_9rem_1fr] items-baseline gap-4 py-4 border-b border-border"
              >
                <dt className="text-xs font-mono text-muted-foreground/60">{row.index}</dt>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  {row.label}
                </dt>
                <dd
                  className={cn(
                    "text-sm sm:text-base font-medium tracking-tight",
                    row.label === "Status" ? "text-primary" : "text-foreground"
                  )}
                >
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      {/* Services */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={springSoft}
        className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-border"
      >
        <SectionLabel>What I can help with</SectionLabel>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
          {services.map((service, idx) => (
            <motion.li
              key={service}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: idx * 0.04 }}
              className="flex gap-4 py-4 border-b border-border"
            >
              <span className="text-xs font-mono text-muted-foreground/50 shrink-0 mt-0.5">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-sm sm:text-base text-foreground leading-relaxed">
                {service}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Tech stack */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={springSoft}
        className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-border"
      >
        <SectionLabel>Tech stack</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {techStack.map((group, idx) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...springSoft, delay: idx * 0.06 }}
            >
              <h3 className="text-sm font-semibold text-foreground tracking-tight mb-3">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TagPill key={item}>{item}</TagPill>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Exploring + Open to */}
      <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSoft}
        >
          <SectionLabel>Currently exploring</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {exploring.map((item, idx) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: idx * 0.05 }}
              >
                <TagPill className="border-primary/20 bg-primary/10 text-primary">
                  {item}
                </TagPill>
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...springSoft, delay: 0.05 }}
        >
          <SectionLabel>Open to</SectionLabel>
          <ul className="space-y-3">
            {openTo.map((item, idx) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: idx * 0.05 }}
                className="flex items-start gap-3 text-sm sm:text-base text-foreground"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springSoft}
        className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-border"
      >
        <div className="border border-border bg-muted/30 p-6 sm:p-8 space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            I enjoy collaborating on impactful projects, solving complex problems, and
            continuously improving my skills to stay aligned with modern technologies and
            industry standards.
          </p>
          <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed tracking-tight">
            Great products are built through clean code, thoughtful design, scalability,
            and continuous innovation — let&rsquo;s connect and build something impactful
            together.
          </p>
        </div>
      </motion.div>

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
