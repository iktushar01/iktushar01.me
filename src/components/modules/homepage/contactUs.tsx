"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
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
    if (!ref.current) return;
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
        disabled={disabled}
        className={cn(
          "w-full py-8 border-[5px] border-black text-2xl font-black uppercase italic transition-all",
          status === "sent" ? "bg-green-400 text-black" : "bg-primary text-primary-foreground",
          "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
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
        className: "border-4 border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
    <section id="contact" className="relative py-32 px-6 bg-background overflow-hidden">
      {/* Polka Dot Canvas */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#000 3px, transparent 3px)", backgroundSize: "40px 40px" }}
      />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <header className="text-center mb-24">
          <motion.div
            initial={{ scale: 0, rotate: 10 }}
            whileInView={{ scale: 1, rotate: 3 }}
            className="inline-block px-6 py-2 border-[4px] border-black bg-yellow-400 font-black text-sm uppercase mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Let's Collab! 🤝
          </motion.div>
          <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
            SAY <span className="text-primary">HELLO</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Contact Cards */}
          <div className="space-y-8">
            <h3 className="text-4xl font-black uppercase italic mb-8 underline decoration-8 decoration-primary/30">Quick Access</h3>
            <div className="grid gap-6">
              {[
                { icon: <FaMapMarkerAlt />, val: "Gazipur, Dhaka", label: "Base", color: "bg-blue-400" },
                { icon: <FaWhatsapp />, val: "+880 1756650014", label: "Ping", color: "bg-green-400" },
                { icon: <FaEnvelope />, val: "hello@tushar.dev", label: "Mail", color: "bg-pink-400" },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleCopy(item.val, item.label)}
                  className="group relative flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 border-[5px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 transition-all cursor-pointer"
                >
                  <div className={cn("w-16 h-16 border-[4px] border-black flex items-center justify-center text-2xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", item.color)}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-black uppercase text-xs text-primary">{item.label}</p>
                    <p className="text-xl font-black truncate">{item.val}</p>
                  </div>
                  <div className="text-black/20 group-hover:text-primary transition-colors">
                    {copied === item.label ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: The Massive Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-zinc-900 border-[8px] border-black p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="absolute -top-6 -right-6 bg-red-500 text-white border-[4px] border-black px-4 py-2 font-black italic rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                URGENT!
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="font-black uppercase italic text-sm">Citizen Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      required
                      className="h-14 border-[4px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 font-bold focus:bg-yellow-100 dark:focus:bg-zinc-700 transition-colors rounded-none" 
                      placeholder="e.g. Bruce Wayne"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="font-black uppercase italic text-sm">Digital Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black" />
                    <Input 
                      type="email" 
                      required
                      className="h-14 border-[4px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 font-bold focus:bg-cyan-100 dark:focus:bg-zinc-700 transition-colors rounded-none" 
                      placeholder="batman@cave.com"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="font-black uppercase italic text-sm">The Secret Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-black" />
                  <Textarea 
                    required
                    rows={4}
                    className="border-[4px] border-black bg-zinc-50 dark:bg-zinc-800 pl-12 pt-4 font-bold focus:bg-pink-100 dark:focus:bg-zinc-700 transition-colors rounded-none resize-none" 
                    placeholder="Drop your project details here..."
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                </div>
              </div>

              <MagneticButton disabled={status !== "idle"} status={status}>
                <div className="flex items-center justify-center gap-3">
                    {status === "sending" ? (
                      <Loader2 className="animate-spin" size={28} />
                    ) : status === "sent" ? (
                      <FaCheck size={28} />
                    ) : (
                      <Send size={28} />
                    )}
                    <span>{status === "sending" ? "Transmitting..." : status === "sent" ? "Dispatched!" : "Launch Message"}</span>
                </div>
              </MagneticButton>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}