"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
    Home, User, Code, GraduationCap,
    Briefcase, Award, Mail, ArrowRight, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

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

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
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
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const scrollPosition = window.scrollY + 150;
            for (const item of NAV_ITEMS) {
                const section = document.getElementById(item.id);
                if (section &&
                    scrollPosition >= section.offsetTop &&
                    scrollPosition < section.offsetTop + section.offsetHeight) {
                    setActiveItem(item.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 w-full z-[60] transition-all duration-500",
                    scrolled
                        ? "py-3 bg-background/80 backdrop-blur-xl border-b border-border"
                        : "py-5 bg-transparent"
                )}
            >
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
                    style={{ scaleX }}
                />

                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <div
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => scrollToSection("home")}
                    >
                        <img 
                            src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png" 
                            alt="Logo" 
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <Button
                            variant="secondary"
                            className="hidden md:flex rounded-full font-medium"
                            onClick={() => scrollToSection("contact")}
                        >
                            Let's Talk
                        </Button>

                        {/* Added Theme Toggle Here */}
                        <ModeToggle />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-accent"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/40 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-sm bg-card border-l border-border h-full p-8 shadow-2xl flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Navigation</p>
                                <div className="flex items-center gap-2">
                                    {/* Duplicated toggle inside drawer for mobile accessibility */}
                                    <ModeToggle />
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                                        <X className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full p-4 rounded-2xl transition-all",
                                            activeItem === item.id
                                                ? "bg-primary text-primary-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className={cn("h-5 w-5", activeItem === item.id ? "text-primary-foreground" : "text-primary")} />
                                            <span className="text-xl font-medium">{item.label}</span>
                                        </div>
                                        <ArrowRight className={cn(
                                            "h-5 w-5 transition-transform group-hover:translate-x-1",
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