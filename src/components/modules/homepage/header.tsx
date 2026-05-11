"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { 
  FaGithub, FaFileDownload, FaEye, FaReact, FaNodeJs 
} from "react-icons/fa";
import { 
  SiMongodb, SiTailwindcss, SiJavascript 
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Bouncy Cartoon Animation Variants
const cartoonFloat: Variants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Header: React.FC = () => {
  const resumeUrl = "https://drive.google.com/file/d/1GNnn7i54WYWNjWlTPZHLxRqmqxLLV5tA/view?usp=sharing";

  return (
    <motion.header
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-6 py-20"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        {/* Playful polka dot pattern instead of formal grids */}
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
      </div>

      {/* --- FLOATING TECH ICONS (Bubbly Style) --- */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40">
        <motion.div variants={cartoonFloat} animate="animate" className="absolute top-[15%] left-[5%] text-7xl text-blue-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"><FaReact /></motion.div>
        <motion.div variants={cartoonFloat} animate="animate" className="absolute bottom-[20%] left-[10%] text-5xl text-green-500 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"><SiMongodb /></motion.div>
        <motion.div variants={cartoonFloat} animate="animate" className="absolute top-[10%] right-[10%] text-6xl text-sky-400 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"><SiTailwindcss /></motion.div>
        <motion.div variants={cartoonFloat} animate="animate" className="absolute bottom-[15%] right-[5%] text-8xl text-green-600 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"><FaNodeJs /></motion.div>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-20">
        
        {/* --- LEFT SIDE: IMAGE WITH "STICKER" LOOK --- */}
        <motion.div
          initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative group"
        >
          {/* Thick Comic Border */}
          <div className="relative z-20 overflow-hidden rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
            <Image
              src="https://res.cloudinary.com/dfoqasqnw/image/upload/v1778472274/ChatGPT_Image_May_11_2026_10_03_45_AM_wpab42.png"
              alt="Tushar"
              width={500}
              height={500}
              className="w-full max-w-sm md:max-w-md h-auto hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          {/* Floating Bubble Tag */}
          <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground px-4 py-2 border-4 border-black rounded-2xl font-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30">
            HI THERE! 👋
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
             initial={{ x: 100, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             transition={{ type: "spring", delay: 0.2 }}
          >
            <Badge className="px-4 py-1 border-2 border-black bg-yellow-400 text-black mb-4 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              PRO DEVELOPER 🚀
            </Badge>

            <h1 className="text-7xl lg:text-9xl font-black tracking-tight leading-[0.8] mb-4 font-handwritten drop-shadow-[6px_6px_0_rgba(0,0,0,1)]">
              TUSHAR<span className="text-primary">!</span>
            </h1>

            {/* Bubble Container */}
            <div className="bg-white border-4 border-black p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900 relative">
              <h3 className="text-3xl font-black mb-3 font-cartoon">THE CODE WIZARD</h3>
              <p className="text-lg font-bold leading-relaxed opacity-80">
                I build super-cool <span className="underline decoration-primary decoration-4">apps</span> that work like magic. 
                Focusing on making the web a more <span className="text-primary italic">colorful</span> place!
              </p>
            </div>
          </motion.div>

          {/* Action Buttons (Squishy Hover) */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center pt-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                size="lg" 
                className="bg-primary text-primary-foreground border-4 border-black rounded-2xl px-10 h-16 font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                RESUME <FaFileDownload className="ml-2" />
                </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button 
                variant="outline" 
                size="lg"
                className="bg-white text-black border-4 border-black rounded-2xl px-10 h-16 font-black text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                VIEW CV <FaEye className="ml-2" />
                </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;