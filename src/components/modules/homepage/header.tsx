"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { 
  FaFileDownload, FaEye, FaReact, FaNodeJs 
} from "react-icons/fa";
import { 
  SiMongodb, SiTailwindcss 
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Bouncy Cartoon Animation Variants
const cartoonFloat: Variants = {
  animate: (i: number) => ({
    y: [0, -20, 0],
    rotate: [i % 2 === 0 ? 0 : 5, i % 2 === 0 ? 5 : -5, 0],
    transition: {
      duration: 3 + i,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

const Header: React.FC = () => {
  const resumeUrl = "#"; // Replace with your link

  return (
    <motion.header
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 py-12 md:py-20"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.1] bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:30px_30px]" />
        {/* Colorful Gradient Blob for Modern Touch */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      {/* --- FLOATING TECH ICONS --- */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-hidden">
        {[
          { Icon: FaReact, color: "text-blue-400", pos: "top-[15%] left-[5%]", size: "text-7xl" },
          { Icon: SiMongodb, color: "text-green-500", pos: "bottom-[20%] left-[8%]", size: "text-5xl" },
          { Icon: SiTailwindcss, color: "text-sky-400", pos: "top-[12%] right-[10%]", size: "text-6xl" },
          { Icon: FaNodeJs, color: "text-green-600", pos: "bottom-[15%] right-[5%]", size: "text-8xl" },
        ].map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cartoonFloat}
            animate="animate"
            className={`absolute ${item.pos} ${item.size} ${item.color} drop-shadow-[4px_4px_0_rgba(0,0,0,1)] opacity-40`}
          >
            <item.Icon />
          </motion.div>
        ))}
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-20">
        
        {/* --- LEFT SIDE: THE STICKER --- */}
        <motion.div
          initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg"
        >
          {/* Main Image Container */}
          <div className="relative z-20 overflow-hidden rounded-[2.5rem] border-[6px] border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-zinc-800">
            <Image
              src="https://res.cloudinary.com/dfoqasqnw/image/upload/v1778472274/ChatGPT_Image_May_11_2026_10_03_45_AM_wpab42.png"
              alt="Tushar"
              width={600}
              height={600}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />
          </div>

          {/* Floating Bubble Tag */}
          <motion.div 
            animate={{ rotate: [12, 8, 12] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-yellow-400 text-black px-6 py-3 border-[4px] border-black rounded-2xl font-black text-lg sm:text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-30 select-none"
          >
            HI THERE! 👋
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex-1 text-center md:text-left space-y-8 w-full">
          <motion.div
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
          >
            <Badge className="px-6 py-2 border-[3px] border-black bg-pink-500 text-white mb-6 font-black text-sm uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-600 transition-colors">
              AVAILABLE FOR HIRE 🚀
            </Badge>

            <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-6 drop-shadow-[8px_8px_0_rgba(0,0,0,1)] dark:drop-shadow-[8px_8px_0_rgba(255,255,255,0.1)]">
              TUSHAR<span className="text-primary italic">!</span>
            </h1>

            {/* Speech Bubble Style Container */}
            <div className="bg-white dark:bg-zinc-900 border-[6px] border-black p-6 sm:p-10 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
              {/* The "Bubble Tail" */}
              <div className="absolute -top-6 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 w-12 h-12 bg-white dark:bg-zinc-900 border-l-[6px] border-t-[6px] border-black rotate-45" />
              
              <h3 className="text-2xl sm:text-4xl font-black mb-4 uppercase italic">The Fullstack Wizard</h3>
              <p className="text-base sm:text-xl font-bold leading-relaxed text-muted-foreground">
                I craft <span className="text-black dark:text-white underline decoration-yellow-400 decoration-[6px]">extraordinary</span> digital experiences. 
                Focusing on pixel-perfect designs and code that 
                <span className="text-primary italic"> actually</span> works!
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 pt-4">
            <motion.div whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground border-[4px] border-black rounded-2xl px-12 h-20 font-black text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                RESUME <FaFileDownload className="ml-3" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotate: 2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto bg-white dark:bg-zinc-800 text-black dark:text-white border-[4px] border-black rounded-2xl px-12 h-20 font-black text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                VIEW CV <FaEye className="ml-3" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;