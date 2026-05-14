"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FaFileDownload, FaEye, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiTailwindcss } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { springSnappy, springSoft, easeInOut } from "@/lib/motion";
import { useTheme } from "next-themes";

const RESUME_PDF_PATH = "/resume.pdf";

const CV_DOC_URL =
  "https://docs.google.com/document/d/1ztbC17xOWptwf2VrMfnj8E_hO7D9JQKyt7wfhGdNC1U/edit?usp=sharing";

/** Hero photo — light theme (full color). */
const HEADER_IMAGE_LIGHT =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778717897/Untitled_design_3_lknubo.png";

/**
 * Dark theme variant: same asset with Cloudinary transforms so `src` is always a valid URL.
 * Replace with a separate upload URL if you add a dedicated dark-mode portrait.
 */
const HEADER_IMAGE_DARK =
  "https://res.cloudinary.com/dfoqasqnw/image/upload/v1778472274/ChatGPT_Image_May_11_2026_10_03_45_AM_wpab42.png";

const cartoonFloat: Variants = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    rotate: [0, i % 2 === 0 ? 2 : -2, 0],
    transition: {
      duration: 4.5 + i * 0.35,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const Header: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount, `resolvedTheme` is undefined — always use a valid https URL for `next/image`.
  const imageSrc =
    mounted && resolvedTheme === "dark" ? HEADER_IMAGE_DARK : HEADER_IMAGE_LIGHT;

  return (
    <motion.header
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeInOut.ease }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 py-24 md:py-28"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08] lp-dots" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,500px)] h-[min(90vw,500px)] bg-primary/15 blur-[100px] rounded-full" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-hidden">
        {[
          {
            Icon: FaReact,
            color: "text-primary/45",
            pos: "top-[15%] left-[5%]",
            size: "text-7xl",
          },
          {
            Icon: SiMongodb,
            color: "text-primary/35",
            pos: "bottom-[20%] left-[8%]",
            size: "text-5xl",
          },
          {
            Icon: SiTailwindcss,
            color: "text-primary/40",
            pos: "top-[12%] right-[10%]",
            size: "text-6xl",
          },
          {
            Icon: FaNodeJs,
            color: "text-primary/35",
            pos: "bottom-[15%] right-[5%]",
            size: "text-8xl",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cartoonFloat}
            animate="animate"
            className={`absolute ${item.pos} ${item.size} ${item.color} drop-shadow-cartoon opacity-50`}
          >
            <item.Icon />
          </motion.div>
        ))}
      </div>

      <div className="lp-container flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-20">
        <motion.div
          initial={{ scale: 0.92, rotate: -3, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={springSnappy}
          className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg"
        >
          <div className="relative z-20 overflow-hidden rounded-[var(--radius-cartoon-lg)] border-4 border-border shadow-cartoon-md bg-card">
            <Image
              src={imageSrc}
              alt="Tushar"
              width={600}
              height={600}
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500 ease-out"
              priority
            />
          </div>

          <motion.div
            animate={{ rotate: [10, 6, 10] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-accent text-accent-foreground px-5 py-2.5 sm:px-6 sm:py-3 border-4 border-border rounded-[var(--radius-sticker)] font-black text-base sm:text-xl shadow-cartoon-sm z-30 select-none"
          >
            HI THERE! 👋
          </motion.div>
        </motion.div>

        <div className="flex-1 text-center md:text-left space-y-8 w-full">
          <motion.div
            initial={{ x: 36, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springSoft, delay: 0.12 }}
          >
            <Badge className="px-5 py-2 border-4 border-border bg-primary text-primary-foreground mb-6 font-black text-xs uppercase tracking-widest shadow-cartoon-sm hover:bg-primary/90 transition-colors duration-200 rounded-[var(--radius-sticker)]">
              AVAILABLE FOR HIRE 🚀
            </Badge>

            <h1 className="text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.88] mb-6 drop-shadow-cartoon">
              <span className="text-yellow-400">TUSHAR</span>
              <span className="text-primary italic">!</span>
            </h1>

            <div className="bg-card text-card-foreground border-4 border-border p-6 sm:p-10 rounded-[var(--radius-cartoon-lg)] shadow-cartoon-md relative">
              <div className="absolute -top-4 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 w-10 h-10 bg-card border-l-4 border-t-4 border-border rotate-45" />

              <h3 className="text-2xl sm:text-3xl font-black mb-3 uppercase italic tracking-tight">
                The Fullstack Wizard
              </h3>

              <p className="text-base sm:text-lg font-semibold leading-relaxed text-muted-foreground">
                I craft{" "}
                <span className="text-foreground underline decoration-accent decoration-4 underline-offset-2">
                  extraordinary
                </span>{" "}
                digital experiences. Focusing on pixel-perfect designs and code
                that
                <span className="text-primary italic"> actually</span> works!
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 pt-2">
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground border-4 border-border rounded-[var(--radius-sticker)] px-10 h-16 sm:h-[4.5rem] font-black text-xl shadow-cartoon-md hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 ease-out"
              >
                <a
                  href={RESUME_PDF_PATH}
                  download="Ibrahim Khalil Tushar.pdf"
                >
                  RESUME <FaFileDownload className="ml-3" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              transition={springSnappy}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-card text-card-foreground border-4 border-border rounded-[var(--radius-sticker)] px-10 h-16 sm:h-[4.5rem] font-black text-xl shadow-cartoon-md hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 ease-out"
              >
                <a
                  href={CV_DOC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW CV <FaEye className="ml-3" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;