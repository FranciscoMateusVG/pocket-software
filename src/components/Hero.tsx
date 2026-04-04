"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { trackCTAClick } from "@/hooks/useAnalytics";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const words = [
    "Software",
    "feito",
    "exclusivamente",
    "para",
    "você.",
  ];

  const line2Words = [
    "Não",
    "é",
    "plataforma.",
    "Não",
    "é",
    "template.",
    "É",
    "seu.",
  ];

  const scrollToContact = () => {
    trackCTAClick("vamos_conversar", "hero");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProcess = () => {
    trackCTAClick("veja_como_funciona", "hero");
    document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-24 md:pt-40 md:pb-32">
      {/* Animated gradient mesh — CSS-only, decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr]">
          <div>
            <motion.h1
              initial={!hasMounted || prefersReducedMotion ? false : "hidden"}
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.01em] mb-6"
            >
              <span className="block">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      },
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block text-text-muted">
                {line2Words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                        },
                      },
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={!hasMounted || prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-text-muted text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.7] max-w-xl mb-10"
            >
              Desenvolvemos software sob medida que só a sua empresa tem. Cada linha de código, escrita para resolver o seu problema.
            </motion.p>

            <motion.div
              initial={!hasMounted || prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToContact}
                className="bg-gold text-bg font-body font-semibold text-base px-8 py-3.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em]"
              >
                Vamos Conversar
              </button>
              <button
                onClick={scrollToProcess}
                className="bg-transparent text-text border border-border px-8 py-3.5 font-body text-base cursor-pointer transition-colors duration-300 hover:border-copper focus:outline-none focus:border-gold focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)]"
              >
                Veja Como Funciona
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
