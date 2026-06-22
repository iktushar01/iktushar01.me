"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaFacebook, FaArrowUp, FaLinkedinIn } from "react-icons/fa";
import { springSnappy } from "@/lib/motion";

interface SocialLink {
  icon: React.JSX.Element;
  link: string;
}

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks: SocialLink[] = [
    { icon: <FaGithub />, link: "https://github.com/iktushar01" },
    { icon: <FaLinkedinIn />, link: "https://linkedin.com/in/iktushar01" },
    { icon: <FaFacebook />, link: "https://facebook.com/iktushar01" },
  ];

  return (
    <footer className="relative bg-background text-foreground border-t border-border px-5 sm:px-10 lg:px-16 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left: identity */}
        <div>
          <p className="text-sm font-medium text-foreground">
            &copy; {currentYear}{" "}
            <span className="text-primary">iktushar01.me</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Full-stack developer &middot; Dhaka, Bangladesh
          </p>
        </div>

        {/* Right: socials + back to top */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.link}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnappy}
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Scroll to top"
          >
            Back to top <FaArrowUp size={11} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;