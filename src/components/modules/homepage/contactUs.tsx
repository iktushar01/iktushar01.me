"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Magnetic Button (Cartoon Slab Style) ---
const MagneticButton = ({ children, disabled, status }: { children: ReactNode, disabled: boolean, status: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 15 });
  const sy = useSpring(y, { stiffness: 400, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.3);
    y.set((e.clientY - top - height / 2) * 0.3);
  };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={() => { x.set(0); y.set(0); }} 
      style={{ x: sx, y: sy }}
      className="w-full"
    >
      <Button 
        type="submit"
        disabled={disabled}
        className={cn(
          "w-full py-6 sm:py-8 border-[4px] sm:border-[6px] border-black text-xl sm:text-2xl font-black uppercase italic transition-all",
          status === "sent" ? "bg-green-400 text-black" : "bg-primary text-primary-foreground",
          "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95"
        )}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${label} copied!`, {
        className: "border-4 border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    toast.success("Message Dispatched! 🚀");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6 bg-background overflow-hidden">
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        {/* Header Section */}
        <header className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ scale: 0, rotate: 10 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 border-[3px] border-black bg-yellow-400 font-black text-xs sm:text-sm uppercase mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            Let's Collab! 🤝
          </motion.div>
          <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none drop-shadow-[5px_5px_0_rgba(0,0,0,1)] md:drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
            SAY <span className="text-primary text-outline">HELLO</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Contact Details Column */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-3xl sm:text-4xl font-black uppercase italic underline underline-offset-8 decoration-[6px] sm:decoration-8 decoration-primary/30">
              Quick Access
            </h3>
            
            <div className="grid gap-4 sm:gap-6">
              {[
                { icon: <FaMapMarkerAlt />, val: "Gazipur, Dhaka", label: "Base", color: "bg-blue-400" },
                { icon: <FaWhatsapp />, val: "+880 1756650014", label: "Ping", color: "bg-green-400" },
                { icon: <FaEnvelope />, val: "hello@tushar.dev", label: "Mail", color: "bg-pink-400" },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleCopy(item.val, item.label)}
                  className="group relative flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white dark:bg-zinc-900 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer"
                >
                  <div className={cn("shrink-0 w-12 h-12 sm:w-16 sm:h-16 border-[3px] border-black flex items-center justify-center text-xl sm:text-2xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]", item.color)}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black uppercase text-[10px] text-primary">{item.label}</p>
                    <p className="text-lg sm:text-xl font-black truncate">{item.val}</p>
                  </div>
                  <div className="text-black/30 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {copied === item.label ? <FaCheck className="text-green-500" /> : <FaCopy size={18} />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Column */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 border-[6px] sm:border-[8px] border-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] sm:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative"
          >
            {/* Cartoon Badge */}
            <div className="absolute -top-5 -right-3 sm:-top-6 sm:-right-6 bg-red-500 text-white border-[3px] border-black px-3 py-1 sm:px-4 sm:py-2 font-black italic rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs sm:text-base">
                URGENT!
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-2">
                  <label className="font-black uppercase italic text-xs">Citizen Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black z-10" />
                    <Input 
                      required
                      className="h-14 border-[3px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 font-bold focus:ring-0 focus:bg-yellow-100 dark:focus:bg-zinc-700 transition-colors rounded-none placeholder:text-zinc-400" 
                      placeholder="e.g. Bruce Wayne"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-black uppercase italic text-xs">Digital Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black z-10" />
                    <Input 
                      type="email" 
                      required
                      className="h-14 border-[3px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 font-bold focus:ring-0 focus:bg-cyan-100 dark:focus:bg-zinc-700 transition-colors rounded-none placeholder:text-zinc-400" 
                      placeholder="batman@cave.com"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-black uppercase italic text-xs">The Secret Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-black z-10" />
                  <Textarea 
                    required
                    rows={4}
                    className="border-[3px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 pt-4 font-bold focus:ring-0 focus:bg-pink-100 dark:focus:bg-zinc-700 transition-colors rounded-none resize-none placeholder:text-zinc-400" 
                    placeholder="Drop your project details here..."
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                </div>
              </div>

              <MagneticButton disabled={status !== "idle"} status={status}>
                <div className="flex items-center justify-center gap-3">
                    {status === "sending" ? (
                      <Loader2 className="animate-spin" size={24} />
                    ) : status === "sent" ? (
                      <FaCheck size={24} />
                    ) : (
                      <Send size={24} />
                    )}
                    <span className="tracking-tight">
                        {status === "sending" ? "Transmitting..." : status === "sent" ? "Dispatched!" : "Launch Message"}
                    </span>
                </div>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1px black;
          color: var(--primary);
        }
        @media (min-width: 768px) {
          .text-outline {
            -webkit-text-stroke: 3px black;
          }
        }
      `}</style>
    </section>
  );
}