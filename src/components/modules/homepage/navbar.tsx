"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { springDrawer, springSoft } from "@/lib/motion";
import { AnimatedThemeTogglerDemo } from "@/components/mode-toggle";

interface NavItem {
    label: string;
    id: string;
}

const NAV_ITEMS: NavItem[] = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Certificates", id: "certificates" },
    { label: "Contact", id: "contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const rafScrollId = useRef<number | null>(null);

    const navItemIds = useMemo(() => NAV_ITEMS.map((i) => i.id), []);
    const sectionRangesRef = useRef<Array<{ id: string; top: number; bottom: number }>>([]);

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
                    "fixed top-0 w-full z-[60] border-b transition-colors duration-300",
                    scrolled
                        ? "bg-background border-border"
                        : "bg-background/0 border-transparent"
                )}
            >
                <div className="relative max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection("home")}
                        className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                        aria-label="Go to top"
                    >
                        <Image
                            src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
                            alt="Logo"
                            width={120}
                            height={80}
                            className="h-6 md:h-7 w-auto dark:brightness-110"
                            priority
                        />
                    </button>

                    {/* Desktop nav — flat text links */}
                    <div className="hidden md:flex items-center gap-7">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "relative text-xs uppercase tracking-widest transition-colors duration-200 py-1",
                                    activeItem === item.id
                                        ? "text-foreground font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                                {activeItem === item.id && (
                                    <motion.span
                                        layoutId="activeNavUnderline"
                                        className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right utilities */}
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => scrollToSection("contact")}
                            className="hidden sm:flex rounded-none bg-primary text-primary-foreground text-xs font-medium tracking-wide hover:bg-primary/90 transition-colors duration-200 px-5 h-9"
                        >
                            Hire me
                        </Button>

                        <div className="opacity-90 hover:opacity-100 transition-opacity">
                            <AnimatedThemeTogglerDemo />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-none text-foreground hover:bg-muted transition-colors duration-200 shrink-0 md:hidden"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/80"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={springDrawer}
                            className="relative w-full max-w-xs bg-background text-foreground border-l border-border h-full p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-8 pt-2 border-b border-border pb-4">
                                <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    Navigation
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    aria-label="Close menu"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex flex-col">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ ...springSoft, delay: idx * 0.03 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full py-4 border-b border-border text-left text-sm tracking-tight transition-colors duration-200",
                                            activeItem === item.id
                                                ? "text-foreground font-semibold"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <span>{item.label}</span>
                                        <ArrowUpRight
                                            className={cn(
                                                "h-4 w-4 transition-opacity duration-200",
                                                activeItem === item.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                                            )}
                                        />
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