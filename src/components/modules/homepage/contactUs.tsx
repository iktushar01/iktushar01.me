"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { FaGithub, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // shadcn recommendation over Swal for Next.js

// Dynamic import for Lottie to avoid SSR errors
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), { ssr: false });

// --- Types ---
interface FormState {
  name: string;
  email: string;
  message: string;
}

// --- Sub-Components ---
const GlitchText = ({ children }: { children: ReactNode }) => (
  <span className="relative inline-block group">
    <span className="relative z-10">{children}</span>
    <span aria-hidden className="absolute inset-0 text-primary opacity-0 group-hover:opacity-50 translate-x-[2px] -translate-y-[1px] pointer-events-none select-none transition-opacity"
      style={{ clipPath: "polygon(0 25%, 100% 25%, 100% 45%, 0 45%)" }}>{children}</span>
    <span aria-hidden className="absolute inset-0 text-cyan-400 opacity-0 group-hover:opacity-50 -translate-x-[2px] translate-y-[1px] pointer-events-none select-none transition-opacity"
      style={{ clipPath: "polygon(0 65%, 100% 65%, 100% 85%, 0 85%)" }}>{children}</span>
  </span>
);

const MagneticWrapper = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.3);
    y.set((e.clientY - top - height / 2) * 0.3);
  };

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }}>
      {children}
    </motion.div>
  );
};

// --- Main Component ---
export default function ContactUs() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${label} copied to clipboard`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API Call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    toast.success("Message sent successfully!");
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section className="relative min-h-screen py-24 px-6 bg-background text-foreground overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-red opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h4 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">— Get in Touch</h4>
            <h2 className="text-5xl md:text-7xl font-black leading-tight italic">
              LET'S <span className="text-primary">BUILD</span> SOMETHING.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { icon: <FaMapMarkerAlt />, val: "Gazipur, Dhaka", label: "Location" },
              { icon: <FaWhatsapp />, val: "+880 1756650014", label: "Phone" },
              { icon: <FaEnvelope />, val: "hello@tushar.dev", label: "Email" },
            ].map((item) => (
              <div 
                key={item.label}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors group cursor-pointer"
                onClick={() => handleCopy(item.val, item.label)}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-tighter">{item.label}</p>
                  <p className="font-medium">{item.val}</p>
                </div>
                {copied === item.label ? <FaCheck className="text-green-500" /> : <FaCopy className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
          
          <h3 className="text-2xl font-bold mb-8">
            <GlitchText>Send Message</GlitchText>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-muted-foreground ml-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-primary" />
                  <Input 
                    required
                    className="bg-background/50 border-white/10 pl-10 focus-visible:ring-primary" 
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase font-bold text-muted-foreground ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-primary" />
                  <Input 
                    type="email" 
                    required
                    className="bg-background/50 border-white/10 pl-10 focus-visible:ring-primary" 
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-muted-foreground ml-1">Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-primary" />
                <Textarea 
                  required
                  rows={5}
                  className="bg-background/50 border-white/10 pl-10 pt-3 focus-visible:ring-primary resize-none" 
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({...form, message: e.target.value})}
                />
              </div>
            </div>

            <MagneticWrapper>
              <Button 
                disabled={status !== "idle"}
                className="w-full py-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20"
              >
                {status === "sending" ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : status === "sent" ? (
                  <FaCheck className="mr-2" />
                ) : (
                  <Send className="w-4 h-4 mr-2" />
                )}
                {status === "sending" ? "Sending..." : status === "sent" ? "Message Sent" : "Shoot Message"}
              </Button>
            </MagneticWrapper>
          </form>
        </motion.div>

      </div>
    </section>
  );
}