"use client";

import React, { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { springMagnetic, springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

const MagneticButton = ({
  children,
  disabled,
  status,
}: {
  children: ReactNode;
  disabled: boolean;
  status: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springMagnetic);
  const sy = useSpring(y, springMagnetic);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || window.innerWidth < 768) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * 0.2);
    y.set((e.clientY - top - height / 2) * 0.2);
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
          "w-full py-6 text-sm font-medium uppercase tracking-wider transition-all duration-200 ease-out rounded-xl shadow-sm border",
          status === "sent" 
            ? "bg-accent text-accent-foreground border-accent/20" 
            : "bg-primary text-primary-foreground border-primary/20 hover:opacity-90",
          "active:scale-[0.99]"
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
      className: "border border-border bg-card text-card-foreground shadow-sm",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("sent");
      toast.success("Message received in Tushar's inbox! I'll get back to you soon. 😎", {
        icon: <Send size={16} />,
      });

      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Submission Error:", error);
      setStatus("idle");
      toast.error("Transmission Failed!", {
        description: error.message || "Please try again later or use direct contact.",
        className: "border border-destructive/20 bg-card",
      });
    }
  };

  const contactRows = [
    { icon: <FaMapMarkerAlt />, val: "Gazipur, Dhaka", label: "Current Location", surface: "bg-primary/10 text-primary border-primary/10" },
    { icon: <FaWhatsapp />, val: "+880 1756650014", label: "WhatsApp & Call", surface: "bg-accent/10 text-accent border-accent/10" },
    { icon: <FaEnvelope />, val: "iktushar01@gmail.com", label: "Mail Address", surface: "bg-secondary/10 text-secondary border-secondary/10" },
  ];

  return (
    <section id="contact" className="lp-section relative py-20 overflow-hidden bg-background">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.03] pointer-events-none lp-dots bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:16px_16px]" />

      <div className="lp-container max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeader
          kicker="Capabilities Loaded!"
          kickerIcon={<MessageSquare size={16} />}
          kickerTone="primary"
          title={
            <>
              <span className="text-primary">CONTACT </span>
              <span className="text-foreground">ME</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mt-12">
          {/* LEFT SIDE: QUICK ACCESS */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground">
              Quick Access
            </h3>

            <div className="grid gap-4">
              {contactRows.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -16, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: i * 0.06 }}
                  onClick={() => handleCopy(item.val, item.label)}
                  className="group relative flex items-center gap-4 p-4 bg-card/60 text-card-foreground border border-border shadow-sm hover:border-border/80 transition-all duration-300 cursor-pointer rounded-2xl backdrop-blur-md"
                >
                  <div
                    className={cn(
                      "shrink-0 w-11 h-11 border flex items-center justify-center text-base rounded-xl transition-transform duration-300 group-hover:scale-105",
                      item.surface
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[10px] text-primary tracking-wider uppercase">{item.label}</p>
                    <p className="text-sm sm:text-base font-medium text-foreground truncate mt-0.5">{item.val}</p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 px-1">
                    {copied === item.label ? (
                      <FaCheck className="text-primary text-sm" />
                    ) : (
                      <FaCopy size={15} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: MESSAGE TERMINAL */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={springSoft}
            className="bg-card/60 text-card-foreground border border-border p-6 sm:p-8 shadow-sm rounded-2xl relative backdrop-blur-md"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* NAME FIELD */}
                <div className="space-y-1.5">
                  <label className="font-medium uppercase text-[10px] tracking-wider text-muted-foreground">Citizen Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                    <Input
                      required
                      className="h-11 border border-border bg-muted/40 pl-10 font-normal text-sm focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:bg-muted/70 transition-all duration-200 rounded-xl placeholder:text-muted-foreground/60"
                      placeholder="e.g. Bruce Wayne"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* EMAIL FIELD */}
                <div className="space-y-1.5">
                  <label className="font-medium uppercase text-[10px] tracking-wider text-muted-foreground">Digital Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                    <Input
                      type="email"
                      required
                      className="h-11 border border-border bg-muted/40 pl-10 font-normal text-sm focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:bg-muted/70 transition-all duration-200 rounded-xl placeholder:text-muted-foreground/60"
                      placeholder="batman@cave.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* MESSAGE FIELD */}
              <div className="space-y-1.5">
                <label className="font-medium uppercase text-[10px] tracking-wider text-muted-foreground">The Secret Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/70" />
                  <Textarea
                    required
                    rows={4}
                    className="border border-border bg-muted/40 pl-10 pt-3 font-normal text-sm focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:bg-muted/70 transition-all duration-200 rounded-xl resize-none placeholder:text-muted-foreground/60"
                    placeholder="Drop your project details here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>

              {/* SUBMIT COMPONENT */}
              <MagneticButton disabled={status !== "idle"} status={status}>
                <div className="flex items-center justify-center gap-2">
                  {status === "sending" ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : status === "sent" ? (
                    <FaCheck size={14} />
                  ) : (
                    <Send size={14} />
                  )}
                  <span className="tracking-wider">
                    {status === "sending" ? "Transmitting..." : status === "sent" ? "Dispatched!" : "Send Message"}
                  </span>
                </div>
              </MagneticButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}