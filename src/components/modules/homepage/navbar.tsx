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
                    "fixed top-0 w-full z-[60] transition-all duration-300 px-6",
                    scrolled ? "py-4" : "py-8"
                )}
            >
                <div className={cn(
                    "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-[4px] border-black transition-all",
                    scrolled 
                        ? "bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" 
                        : "bg-transparent border-transparent"
                )}>
                    {/* Progress Bar (Cartoon Style) */}
                    <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[8px] bg-primary border-x-[4px] border-black origin-left"
                        style={{ scaleX }}
                    />

                    {/* Logo Section */}
                    <div
    className="cursor-pointer"
    onClick={() => scrollToSection("home")}
>
    <Image
        src="https://res.cloudinary.com/dfoqasqnw/image/upload/logo_msrkwi.png"
        alt="Logo"
        width={200}
        height={320}
        className="h-14 w-auto"
        priority
    />
</div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-4">
                        <Button
                            className="hidden md:flex bg-yellow-400 hover:bg-yellow-500 text-black border-[3px] border-black font-black uppercase italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all rounded-none"
                            onClick={() => scrollToSection("contact")}
                        >
                            Hire Me!
                        </Button>

                        <ModeToggle />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 border-[3px] border-black bg-primary text-primary-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-primary active:shadow-none active:translate-x-1 active:translate-y-1 transition-all rounded-none"
                            onClick={() => setIsOpen(true)}
                        >
                            <Menu className="h-6 w-6 stroke-[3px]" />
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Cartoon Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-end">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 20, stiffness: 150 }}
                            className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border-l-[8px] border-black h-full p-10 flex flex-col shadow-[-20px_0px_0px_0px_rgba(0,0,0,0.2)]"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Menu</h2>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setIsOpen(false)} 
                                    className="border-[3px] border-black rounded-none hover:bg-red-500 hover:text-white transition-colors"
                                >
                                    <X className="h-6 w-6 stroke-[3px]" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {NAV_ITEMS.map((item, idx) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => scrollToSection(item.id)}
                                        className={cn(
                                            "group flex items-center justify-between w-full p-5 border-[4px] border-black font-black uppercase italic transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1",
                                            activeItem === item.id
                                                ? "bg-primary text-white"
                                                : "bg-white dark:bg-zinc-800 text-black dark:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="h-6 w-6" />
                                            <span className="text-xl">{item.label}</span>
                                        </div>
                                        <ArrowRight className={cn(
                                            "h-6 w-6 transition-transform group-hover:translate-x-2",
                                            activeItem === item.id ? "opacity-100" : "opacity-30"
                                        )} />
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-auto text-center border-[4px] border-black p-4 bg-zinc-100 dark:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="font-black uppercase text-xs">Ibrahim Khalil Tushar</p>
                                <p className="text-[10px] font-bold opacity-50">v2.0.26_STABLE</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}