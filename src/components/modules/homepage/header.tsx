"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  FaGithub, FaFileDownload, FaEye, FaReact, FaNodeJs 
} from "react-icons/fa";
import { 
  SiMongodb, SiTailwindcss, SiJavascript 
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Types for the floating animation
const floatingVariants = (delay: number, duration: number = 4): Variants => ({
  animate: {
    y: [0, -15, 0],
    x: [0, 10, 0],
    rotate: [0, 10, -10, 0],
    transition: {
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    },
  },
});

const Header: React.FC = () => {
  const resumeUrl = "https://drive.google.com/file/d/1GNnn7i54WYWNjWlTPZHLxRqmqxLLV5tA/view?usp=sharing";

  const handleDownload = () => {
    // In a real app, this would point to your local asset path
    window.open("/path-to-your-resume.pdf", "_blank");
  };

  return (
    <motion.header
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background text-foreground px-6 py-20"
    >
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- FLOATING TECH ICONS --- */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-20">
        <motion.div variants={floatingVariants(0, 5)} animate="animate" className="absolute top-[15%] left-[5%] text-7xl"><FaReact /></motion.div>
        <motion.div variants={floatingVariants(1, 6)} animate="animate" className="absolute bottom-[20%] left-[10%] text-5xl text-primary"><SiMongodb /></motion.div>
        <motion.div variants={floatingVariants(0.5, 4)} animate="animate" className="absolute top-[10%] right-[10%] text-6xl text-blue-500"><SiTailwindcss /></motion.div>
        <motion.div variants={floatingVariants(2, 7)} animate="animate" className="absolute bottom-[15%] right-[5%] text-8xl"><FaNodeJs /></motion.div>
        <motion.div variants={floatingVariants(1.5, 5)} animate="animate" className="absolute top-[40%] right-[15%] text-4xl text-yellow-500"><SiJavascript /></motion.div>
      </div>

      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-20">
        
        {/* --- LEFT SIDE: IMAGE WITH HUD --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* HUD Brackets */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary z-30" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary z-30" />
          
          {/* Scanning Line */}
          <div className="absolute left-0 right-0 h-[2px] bg-primary/50 shadow-[0_0_15px_rgba(220,38,38,0.8)] z-30 animate-scan" />

          <div className="relative z-20 overflow-hidden rounded-lg bg-muted border border-white/5 shadow-2xl">
            <img
              src="https://res.cloudinary.com/dfoqasqnw/image/upload/photo_jnp3c8.png" // Replace with your 'photo' import
              alt="Tushar"
              className="w-full max-w-sm md:max-w-md h-auto grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary/70 uppercase">
              System.Status: Active<br />
              Loc: 23.8103° N, 90.4125° E
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: CONTENT --- */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
          >
            <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary mb-4 gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              FULL STACK DEVELOPER
            </Badge>

            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-4">
              TUSHAR<span className="text-primary">.</span>
            </h1>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl relative overflow-hidden group max-w-xl">
              <div className="absolute -right-4 -bottom-4 text-7xl font-black text-white/[0.02] pointer-events-none select-none">CODE</div>
              <h3 className="text-2xl font-bold mb-3">HIGH-PERFORMANCE ARCHITECT</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Specialized in building decentralized architectures and scalable web systems.
                Focusing on <span className="text-foreground border-b border-primary">React Ecosystems</span> and <span className="text-foreground border-b border-primary">Node Logic</span>.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
            <Button 
              size="lg" 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 font-bold shadow-lg shadow-primary/20"
            >
              GET RESUME <FaFileDownload className="ml-2" />
            </Button>

            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open(resumeUrl, "_blank")}
              className="rounded-xl px-8 h-14 font-bold border-white/20 hover:border-blue-500 hover:text-blue-500 transition-all"
            >
              VIEW CV <FaEye className="ml-2" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open('https://github.com/iktushar01')}
              className="rounded-full w-14 h-14 border border-white/10 hover:bg-white/5 text-xl"
            >
              <FaGithub />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;