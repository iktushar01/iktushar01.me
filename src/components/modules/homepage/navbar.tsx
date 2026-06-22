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
        stiffness: 260,
        damping: 28,
        restDelta: 0.001
    });

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
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

            const scrollPosition = y + 200;
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
                    "fixed top-0 w-full z-[60] transition-[padding] duration-300 ease-out",
                    scrolled ? "py-3 px-4" : "py-6 px-4 sm:px-6"
                )}
            >
                <div className={cn(
                    "relative max-w-6xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between rounded-[var(--radius-cartoon-lg)] border-4 border-border transition-colors duration-300",
                    scrolled
                        ? "bg-card/90 backdrop-blur-md shadow-cartoon-md"
                        : "bg-transparent border-transparent shadow-none"
                )}>
                    <motion.div
                        className="absolute bottom-0 left-6 right-6 h-1 bg-primary origin-left rounded-full"
                        style={{ scaleX }}
                    />

                 <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    transition={springSnappy}
    className="cursor-pointer shrink-0"
    onClick={() => scrollToSection("home")}
>
    <Image
        src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
        alt="Logo"
        width={140}
        height={100}
        className="h-10 md:h-12 w-auto [filter:drop-shadow(2px_0_0_black)_drop-shadow(-2px_0_0_black)_drop-shadow(0_2px_0_black)_drop-shadow(0_-2px_0_black)]"
        priority
    />
</motion.div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <Button
                            className="hidden sm:flex rounded-full border-4 border-border bg-card text-foreground font-black uppercase italic shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-out px-6"
                            onClick={() => scrollToSection("contact")}
                        >
                            Hire Me
                        </Button>

                        <div className="scale-90 md:scale-100">
                        <AnimatedThemeTogglerDemo />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-[var(--radius-sticker)] border-4 border-border bg-accent text-accent-foreground shadow-cartoon-sm hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 ease-out shrink-0"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-5 w-5 md:h-6 md:w-6 stroke-[3px]" />
                        </Button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "110%", scale: 0.96 }}
                            animate={{ x: 0, scale: 1 }}
                            exit={{ x: "110%", scale: 0.96 }}
                            transition={springDrawer}
                            className="relative w-full max-w-sm bg-card text-card-foreground border-4 border-border h-full max-h-[calc(100dvh-2rem)] rounded-[var(--radius-cartoon-lg)] p-8 flex flex-col shadow-cartoon-md"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Navigation</h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-[var(--radius-sticker)] border-4 border-border hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200"
                                >
                                    <X className="h-5 w-5 stroke-[3px]" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-3 overflow-y-auto">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ ...springSoft, delay: idx * 0.04 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full p-4 rounded-[var(--radius-sticker)] border-4 transition-all duration-200 font-black uppercase italic",
                                            activeItem === item.id
                                                ? "bg-primary text-primary-foreground border-border shadow-cartoon-sm"
                                                : "bg-muted/60 border-border/40 hover:border-border hover:bg-muted"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="h-5 w-5" />
                                            <span className="text-lg tracking-tight">{item.label}</span>
                                        </div>
                                        <ArrowRight className={cn(
                                            "h-5 w-5 transition-transform duration-200 group-hover:translate-x-1",
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
