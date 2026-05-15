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
    x.set((e.clientX - left - width / 2) * 0.28);
    y.set((e.clientY - top - height / 2) * 0.28);
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
          "w-full py-5 sm:py-7 border-4 sm:border-[5px] border-border text-lg sm:text-xl font-black uppercase italic transition-all duration-200 ease-out rounded-[var(--radius-sticker)]",
          status === "sent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground",
          "shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-[0.99]"
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
      className: "border-4 border-border font-black uppercase italic shadow-cartoon-sm bg-card text-card-foreground",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    toast.success("Message Dispatched!", {
      icon: <Send size={18} />,
    });
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  const contactRows = [
    { icon: <FaMapMarkerAlt />, val: "Rajendrapur Cantonment, Gazipur", label: "Current Location", surface: "bg-primary text-primary-foreground" },
    { icon: <FaWhatsapp />, val: "+880 1756650014", label: "Whatsapp & call", surface: "bg-accent text-accent-foreground" },
    { icon: <FaEnvelope />, val: "iktushar01@gmail.com", label: "Mail", surface: "bg-secondary text-secondary-foreground" },
  ];

  return (
    <section id="contact" className="lp-section">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none lp-dots" />

      <div className="lp-container">
        <SectionHeader
          kicker="Capabilities Loaded!"
          kickerIcon={<MessageSquare size={18} />}
          kickerTone="primary"
          kickerRotate="-rotate-2"
          title={
            <>
              <span className="text-yellow-400">Contact</span> <span className="text-primary">me</span>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-black uppercase italic underline underline-offset-8 decoration-4 decoration-primary/40 tracking-tight">
              Quick Access
            </h3>

            <div className="grid gap-4">
              {contactRows.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: -24, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...springSoft, delay: i * 0.06 }}
                  onClick={() => handleCopy(item.val, item.label)}
                  className="group relative flex items-center gap-4 p-4 sm:p-5 bg-card text-card-foreground border-4 border-border shadow-cartoon-md hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 cursor-pointer rounded-[var(--radius-cartoon)]"
                >
                  <div
                    className={cn(
                      "shrink-0 w-12 h-12 sm:w-14 sm:h-14 border-4 border-border flex items-center justify-center text-lg sm:text-xl shadow-cartoon-sm rounded-[var(--radius-sticker)]",
                      item.surface,
                    )}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black uppercase text-[10px] text-primary tracking-wide">{item.label}</p>
                    <p className="text-base sm:text-lg font-black truncate">{item.val}</p>
                  </div>
                  <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {copied === item.label ? <FaCheck className="text-primary" /> : <FaCopy size={18} />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ y: 28, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={springSoft}
            className="bg-card text-card-foreground border-4 sm:border-[5px] border-border p-6 sm:p-9 shadow-cartoon-md rounded-[var(--radius-cartoon-lg)] relative"
          >
            <div className="absolute -top-4 -right-2 sm:-top-5 sm:-right-4 bg-destructive border-4 border-border px-3 py-1 font-black italic rotate-6 shadow-cartoon-sm text-xs sm:text-sm rounded-[var(--radius-sticker)] bg-yellow-400 text-black">
              URGENT!
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-black uppercase italic text-[10px] tracking-wide">Citizen Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      required
                      className="h-12 border-4 border-border bg-muted/40 pl-11 font-semibold focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:bg-muted transition-colors duration-200 rounded-[var(--radius-sticker)] placeholder:text-muted-foreground"
                      placeholder="e.g. Bruce Wayne"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-black uppercase italic text-[10px] tracking-wide">Digital Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                    <Input
                      type="email"
                      required
                      className="h-12 border-4 border-border bg-muted/40 pl-11 font-semibold focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:bg-muted transition-colors duration-200 rounded-[var(--radius-sticker)] placeholder:text-muted-foreground"
                      placeholder="batman@cave.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-black uppercase italic text-[10px] tracking-wide">The Secret Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-muted-foreground z-10" />
                  <Textarea
                    required
                    rows={4}
                    className="border-4 border-border bg-muted/40 pl-11 pt-3 font-semibold focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:bg-muted transition-colors duration-200 rounded-[var(--radius-sticker)] resize-none placeholder:text-muted-foreground"
                    placeholder="Drop your project details here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
              </div>

              <MagneticButton disabled={status !== "idle"} status={status}>
                <div className="flex items-center justify-center gap-3">
                  {status === "sending" ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : status === "sent" ? (
                    <FaCheck size={22} />
                  ) : (
                    <Send size={22} />
                  )}
                  <span className="tracking-tight">
                    {status === "sending" ? "Transmitting..." : status === "sent" ? "Dispatched!" : " Message"}
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
