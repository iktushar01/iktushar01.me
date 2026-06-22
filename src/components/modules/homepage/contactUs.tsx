"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaCopy, FaCheck } from "react-icons/fa";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { springSoft } from "@/lib/motion";
import { SectionHeader } from "@/components/modules/homepage/section-header";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
    toast.success(`${label} copied`, {
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
      toast.success("Message sent. I'll get back to you soon.", {
        icon: <Send size={16} />,
      });

      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch (error: any) {
      console.error("Submission Error:", error);
      setStatus("idle");
      toast.error("Message failed to send", {
        description: error.message || "Please try again later or use direct contact.",
        className: "border border-destructive/20 bg-card",
      });
    }
  };

  const contactRows = [
    { icon: <FaMapMarkerAlt />, val: "Gazipur, Dhaka", label: "Location" },
    { icon: <FaWhatsapp />, val: "+880 1756650014", label: "WhatsApp & Call" },
    { icon: <FaEnvelope />, val: "iktushar01@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="relative py-24 bg-background text-foreground px-5 sm:px-10 lg:px-16">
      <SectionHeader kicker="Get in touch" title="Contact" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mt-12">
        {/* Left: direct contact list */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground/70 mb-6">
            Direct contact
          </h3>

          <div>
            {contactRows.map((item, i) => (
              <motion.button
                key={item.label}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...springSoft, delay: i * 0.05 }}
                onClick={() => handleCopy(item.val, item.label)}
                className="group w-full flex items-center gap-4 py-5 border-b border-border text-left"
              >
                <span className="shrink-0 text-base text-muted-foreground">
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    {item.label}
                  </p>
                  <p className="text-sm sm:text-base font-medium text-foreground truncate mt-0.5">
                    {item.val}
                  </p>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  {copied === item.label ? (
                    <FaCheck className="text-primary text-sm" />
                  ) : (
                    <FaCopy size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right: message form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSoft}
        >
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground/70 mb-6">
            Send a message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Name</label>
                <Input
                  required
                  className="h-11 border-0 border-b border-border rounded-none bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Email</label>
                <Input
                  type="email"
                  required
                  className="h-11 border-0 border-b border-border rounded-none bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 placeholder:text-muted-foreground/50"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Message</label>
              <Textarea
                required
                rows={4}
                className="border-0 border-b border-border rounded-none bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:border-primary transition-colors duration-200 resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={status !== "idle"}
              className="w-full sm:w-auto bg-primary text-primary-foreground font-medium text-sm rounded-none px-7 h-11 hover:bg-primary/90 transition-colors duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                {status === "sending" ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : status === "sent" ? (
                  <FaCheck size={14} />
                ) : (
                  <Send size={14} />
                )}
                <span>
                  {status === "sending" ? "Sending..." : status === "sent" ? "Sent" : "Send message"}
                </span>
              </div>
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}