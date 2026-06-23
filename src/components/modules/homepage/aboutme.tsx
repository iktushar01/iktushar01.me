"use client";

import React from "react";
import { motion } from "framer-motion";
import { springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

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
    <section id="about" className="relative py-24 bg-background text-foreground px-5 sm:px-10 lg:px-16">
      <SectionHeader kicker="Who is this guy?" title="About Me" />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
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
          <div className="mt-12">
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
    </section>
  );
};

export default AboutMe;