"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function StickyHeader() {
  const [showHeader, setShowHeader] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > window.innerHeight * 0.6);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg/90 backdrop-blur-xl border-b border-border"
        >
          <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)] h-full flex items-center justify-between">
            <span className="font-display text-lg text-text tracking-[-0.01em]">
              Pocket Software
            </span>
            <button
              onClick={scrollToContact}
              className="bg-gold text-bg font-body font-semibold text-base px-8 py-2.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)]"
            >
              Start a Conversation
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
