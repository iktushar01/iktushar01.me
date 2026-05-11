"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCalendar, FiAward, FiZap, FiBookOpen } from "react-icons/fi";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  logo: string;
  current: boolean;
  gpa?: string;
  icon: ReactNode;
  skills: string[];
  color: string;
}

const UTTARA_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/UttaraUniversityLogo_bf6z7s.jpg";
const RCPSC_LOGO = "https://res.cloudinary.com/dfoqasqnw/image/upload/rcpscLogo_f6ccxs.png";

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Sc in Computer Science",
    institution: "Uttara University",
    duration: "2025 - 2029 (Exp)",
    description: "Deep diving into algorithms, software architecture, and advanced web technologies.",
    logo: UTTARA_LOGO,
    current: true,
    gpa: "In Progress",
    icon: <FiZap />,
    color: "#FACC15",
    skills: ["React.js", "MERN Stack", "Node.js"],
  },
  {
    id: 2,
    degree: "Higher Secondary (HSC)",
    institution: "Rajuk Uttara Model College",
    duration: "2021 - 2023",
    description: "Built a solid foundation in Science and Mathematics with excellence.",
    logo: RCPSC_LOGO,
    current: false,
    gpa: "5.00",
    icon: <FiAward />,
    color: "#60A5FA",
    skills: ["HTML/CSS", "Photoshop", "Physics"],
  },
];

const TiltCard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 300, damping: 20 });
  const sry = useSpring(ry, { stiffness: 300, damping: 20 });

  const move = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const r = ref.current.getBoundingClientRect();
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const EducationPostcard: React.FC<{ item: EducationItem; index: number }> = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={cn(
        "relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Sticker Badge */}
      <div className="relative z-20 shrink-0">
        <motion.div
          whileHover={{ scale: 1.05, rotate: isEven ? 8 : -8 }}
          className="w-28 h-28 lg:w-40 lg:h-40 rounded-full border-[4px] lg:border-[6px] border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          <img src={item.logo} alt="Logo" className="w-full h-full object-contain rounded-full" />
        </motion.div>
        
        <div className={cn(
          "absolute -top-3 -right-3 p-3 rounded-2xl border-[3px] border-black text-white shadow-md",
          item.current ? "bg-black animate-pulse" : "bg-zinc-800"
        )}>
            {item.icon}
        </div>
      </div>

      {/* The Postcard */}
      <TiltCard>
        <div className="relative bg-white dark:bg-zinc-900 border-[4px] lg:border-[5px] border-black p-6 lg:p-10 rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-1">
          {/* Status Flag */}
          <div className={cn(
            "absolute -top-3 right-8 px-4 py-1 border-[3px] border-black font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            item.current ? "bg-yellow-400 rotate-2" : "bg-emerald-400 -rotate-2"
          )}>
            {item.current ? "Ongoing" : "Completed"}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
               <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black rounded-xl text-[11px] font-black flex items-center gap-2 uppercase">
                 <FiCalendar className="text-primary" /> {item.duration}
               </span>
               {item.gpa && (
                 <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border-2 border-black rounded-xl text-[11px] font-black flex items-center gap-2 uppercase">
                 <FiAward className="text-orange-500" /> GPA: {item.gpa}
               </span>
               )}
            </div>

            <div>
              <h3 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none mb-2">
                {item.degree}
              </h3>
              <h4 className="text-lg lg:text-xl font-black text-primary underline decoration-black decoration-[3px] underline-offset-4">
                @{item.institution}
              </h4>
            </div>
            
            <p className="text-black/80 dark:text-white/80 font-bold leading-snug lg:leading-relaxed text-base lg:text-lg max-w-2xl">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {item.skills.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-white dark:bg-zinc-800 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[10px] font-black uppercase hover:bg-primary transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Education: React.FC = () => (
  <section id="education" className="relative py-24 lg:py-32 px-4 lg:px-8 bg-background overflow-hidden">
    <div 
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}
    />

    <div className="relative z-10 container mx-auto max-w-5xl">
      <header className="flex flex-col items-center mb-20 lg:mb-32">
        <motion.span 
          initial={{ rotate: -5, scale: 0.9 }}
          whileInView={{ rotate: 3, scale: 1 }}
          className="bg-primary px-4 py-1 border-[3px] border-black font-black text-xs uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          My Academic Journey 📖
        </motion.span>
        <h2 className="text-6xl lg:text-9xl font-black uppercase italic tracking-tighter text-center">
          LEVELED <span className="text-primary text-outline">UP</span>
        </h2>
      </header>

      <div className="relative">
        {/* Modern Vertical Spine (Hidden on mobile) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-black/10 -translate-x-1/2" />

        <div className="flex flex-col gap-24 lg:gap-40">
          {educationData.map((item, index) => (
            <EducationPostcard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>

      <motion.div 
        whileInView={{ y: [20, 0], opacity: [0, 1] }}
        className="mt-32 flex flex-col items-center gap-6"
      >
        <div className="w-20 h-20 bg-yellow-400 border-[4px] border-black rounded-full flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-6">
            <FiBookOpen size={32} />
        </div>
        <p className="font-black uppercase tracking-widest text-center text-sm lg:text-base">
          Always Learning. Always Growing.
        </p>
      </motion.div>
    </div>

    <style jsx global>{`
      .text-outline {
        -webkit-text-stroke: 2px black;
        color: var(--primary);
      }
      @media (min-width: 1024px) {
        .text-outline {
          -webkit-text-stroke: 3px black;
        }
      }
    `}</style>
  </section>
);

export default Education;