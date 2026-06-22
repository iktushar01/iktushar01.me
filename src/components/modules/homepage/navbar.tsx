"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import {
    Home, User, Code, GraduationCap,
    Briefcase, Award, Mail, ArrowRight, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { springDrawer, springSnappy, springSoft } from "@/lib/motion";
import { AnimatedThemeTogglerDemo } from "@/components/mode-toggle";

interface NavItem {
    icon: React.ElementType;
    label: string;
    id: string;
}

const NAV_ITEMS: NavItem[] = [
    { icon: Home, label: "Home", id: "home" },
    { icon: User, label: "About", id: "about" },
    { icon: Code, label: "Skills", id: "skills" },
    { icon: GraduationCap, label: "Education", id: "education" },
    { icon: Briefcase, label: "Projects", id: "projects" },
    { icon: Award, label: "Certificates", id: "certificates" },
    { icon: Mail, label: "Contact", id: "contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const rafScrollId = useRef<number | null>(null);

    const navItemIds = useMemo(() => NAV_ITEMS.map((i) => i.id), []);
    const sectionRangesRef = useRef<Array<{ id: string; top: number; bottom: number }>>([]);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 160,
        damping: 22,
        restDelta: 0.001
    });

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
            setActiveItem(id);
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        const computeSectionRanges = () => {
            const next: Array<{ id: string; top: number; bottom: number }> = [];
            for (const id of navItemIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;
                next.push({ id, top, bottom });
            }
            sectionRangesRef.current = next;
        };

        computeSectionRanges();
        window.addEventListener("resize", computeSectionRanges, { passive: true });

        const updateFromScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 20);

            const scrollPosition = y + 240;
            const ranges = sectionRangesRef.current;
            for (const r of ranges) {
                if (scrollPosition >= r.top && scrollPosition < r.bottom) {
                    setActiveItem((prev) => (prev === r.id ? prev : r.id));
                    break;
                }
            }
        };

        const onScroll = () => {
            if (rafScrollId.current != null) return;
            rafScrollId.current = window.requestAnimationFrame(() => {
                rafScrollId.current = null;
                updateFromScroll();
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        updateFromScroll();

        return () => {
            window.removeEventListener("resize", computeSectionRanges);
            window.removeEventListener("scroll", onScroll);
            if (rafScrollId.current != null) window.cancelAnimationFrame(rafScrollId.current);
        };
    }, [navItemIds]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 w-full z-[60] transition-all duration-500 ease-in-out",
                    scrolled ? "py-3 px-4" : "py-5 px-4 sm:px-6"
                )}
            >
                {/* Main Premium Floating Bar Container */}
                <div className={cn(
                    "relative max-w-6xl mx-auto px-6 h-14 md:h-16 flex items-center justify-between rounded-full border border-white/5 transition-all duration-500 ease-in-out",
                    scrolled
                        ? "bg-background/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.2)] border-white/10 dark:border-zinc-800/50"
                        : "bg-transparent border-transparent shadow-none"
                )}>
                    {/* Minimalist Top Scroll Progress Bar with Accent Glow */}
                    <motion.div
                        className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 origin-left rounded-full opacity-80 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
                        style={{ scaleX }}
                    />

                    {/* Logo Wrapper */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={springSnappy}
                        className="cursor-pointer shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                        onClick={() => scrollToSection("home")}
                    >
                        <Image
                            src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
                            alt="Logo"
                            width={120}
                            height={80}
                            className="h-7 md:h-8 w-auto filter dark:brightness-110 transition-all duration-300"
                            priority
                        />
                    </motion.div>

                    {/* Desktop Center Navigation (Vercel Style) */}
                    <div className="hidden md:flex items-center gap-1 bg-zinc-900/5 dark:bg-white/5 border border-black/[0.04] dark:border-white/[0.04] p-1 rounded-full backdrop-blur-sm">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors duration-200 outline-none",
                                    activeItem === item.id
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeItem === item.id && (
                                    <motion.div
                                        layoutId="activePremiumNav"
                                        className="absolute inset-0 bg-background dark:bg-zinc-800/80 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] border border-black/[0.04] dark:border-white/10 z-0"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right Utilities Controls */}
                    <div className="flex items-center gap-3">
                        <Button
                            className="hidden sm:flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-background text-foreground text-xs font-medium tracking-tight shadow-sm hover:bg-accent/50 transition-all duration-300 px-5 h-9"
                            onClick={() => scrollToSection("contact")}
                        >
                            Hire Me
                        </Button>

                        <div className="scale-90 opacity-90 hover:opacity-100 transition-opacity">
                            <AnimatedThemeTogglerDemo />
                        </div>

                        {/* Premium Menu Hamburger Toggle Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-background/50 text-foreground shadow-sm hover:bg-accent transition-all duration-200 shrink-0 md:hidden"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-4 w-4 stroke-[2px]" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Premium Command-Drawer Style Sidebar Menu */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        {/* Backdrop Glass Mask */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        {/* Sidebar Drawer Component */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={springDrawer}
                            className="relative w-full max-w-xs bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl text-foreground border-l border-zinc-200 dark:border-zinc-800/80 h-full p-6 flex flex-col shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8 pt-2">
                                <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/80">Navigation</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full h-8 w-8 border border-zinc-200 dark:border-zinc-800/80 hover:bg-accent transition-colors duration-200"
                                >
                                    <X className="h-4 w-4 stroke-[2px]" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-1.5 overflow-y-auto">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ ...springSoft, delay: idx * 0.03 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-200 font-medium text-sm text-left tracking-tight",
                                            activeItem === item.id
                                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-transparent shadow-sm"
                                                : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-4 w-4 opacity-80" />
                                            <span>{item.label}</span>
                                        </div>
                                        <ArrowRight className={cn(
                                            "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5",
                                            activeItem === item.id ? "opacity-100" : "opacity-0"
                                        )} />
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}