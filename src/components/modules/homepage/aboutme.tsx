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
    tools: "React.js, Next.js, Tailwind CSS, JavaScript, TypeScript",
  },
  {
    label: "Backend",
    tools: "Node.js, Express.js, MongoDB, PostgreSQL, Prisma",
  },
  {
    label: "Tools",
    tools: "Git, GitHub, Docker, Firebase, Linux, Postman, Vercel",
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

        {/* Right: scrollable content */}
        <div className="lg:col-span-7 space-y-10 sm:space-y-12">
          {/* Spec sheet */}
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

          {/* What I can help with */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-2">
              What I can help with
            </span>
            {services.map((service, idx) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.04 }}
                className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] items-baseline gap-4 py-4 border-b border-border"
              >
                <span className="text-xs font-mono text-muted-foreground/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{service}</p>
              </motion.div>
            ))}
          </div>


          {/* Currently exploring */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-2">
              Currently exploring
            </span>
            {exploring.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.05 }}
                className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] items-baseline gap-4 py-4 border-b border-border"
              >
                <span className="text-xs font-mono text-muted-foreground/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-primary leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Open to */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-2">
              Open to
            </span>
            {openTo.map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ ...springSoft, delay: idx * 0.05 }}
                className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] items-baseline gap-4 py-4 border-b border-border"
              >
                <span className="text-xs font-mono text-muted-foreground/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-foreground leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={springSoft}
            className="pt-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/70 block mb-4">
              Philosophy
            </span>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              I enjoy collaborating on impactful projects, solving complex problems, and
              continuously improving my skills to stay aligned with modern technologies and
              industry standards.
            </p>
            <p className="mt-4 text-sm sm:text-base font-medium text-foreground leading-relaxed tracking-tight">
              Great products are built through clean code, thoughtful design, scalability,
              and continuous innovation — let&rsquo;s connect and build something impactful
              together.
            </p>
          </motion.div>
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
