"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
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
            const scrollPosition = window.scrollY + 200;
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
                    scrolled ? "py-3 px-4" : "py-6 px-6"
                )}
            >
                <div className={cn(
                    "max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between transition-all duration-500 rounded-[24px] border-2",
                    scrolled 
                        ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]" 
                        : "bg-transparent border-transparent"
                )}>
                    {/* Progress Bar */}
                    <motion.div
                        className="absolute bottom-0 left-6 right-6 h-[3px] bg-primary origin-left rounded-full"
                        style={{ scaleX }}
                    />

                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cursor-pointer shrink-0"
                        onClick={() => scrollToSection("home")}
                    >
                        <Image
                            src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
                            alt="Logo"
                            width={140}
                            height={100}
                            className="h-10 md:h-12 w-auto"
                            priority
                        />
                    </motion.div>



                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <Button
                            className="hidden sm:flex rounded-full border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-black dark:text-white font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 transition-all px-6"
                            onClick={() => scrollToSection("contact")}
                        >
                            Hire Me
                        </Button>

                        <div className="scale-90 md:scale-100">
                            <ModeToggle />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-2xl border-2 border-black dark:border-white bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all shrink-0"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-5 w-5 md:h-6 md:w-6 stroke-[3px]" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Sidebar remains the same high-quality build */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "110%", scale: 0.95 }}
                            animate={{ x: 0, scale: 1 }}
                            exit={{ x: "110%", scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border-4 border-black h-full rounded-[32px] p-8 flex flex-col shadow-2xl shadow-black"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Navigation</h2>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setIsOpen(false)} 
                                    className="rounded-xl border-2 border-black hover:bg-red-500 hover:text-white transition-all"
                                >
                                    <X className="h-5 w-5 stroke-[3px]" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-3">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full p-4 rounded-2xl border-2 transition-all font-black uppercase italic",
                                            activeItem === item.id
                                                ? "bg-primary text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                : "bg-zinc-50 dark:bg-zinc-800 border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white hover:translate-x-1"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="h-5 w-5" />
                                            <span className="text-lg tracking-tight">{item.label}</span>
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