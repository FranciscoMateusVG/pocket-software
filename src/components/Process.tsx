"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We spend time understanding your business, your workflows, and the problem you're actually trying to solve.",
  },
  {
    number: "02",
    title: "Spec",
    description:
      "We turn that understanding into a precise scope: what we're building, how it works, and exactly what you'll get.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Our engineers get to work. You have visibility throughout — no black boxes, no surprises.",
  },
  {
    number: "04",
    title: "Yours",
    description:
      "We hand over a working, documented codebase that's fully yours to own, operate, and build on.",
  },
];

export default function Process() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="py-32 md:py-48">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-16"
        >
          A clear process, start to finish.
        </motion.h2>

        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 relative"
        >
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-border" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
              className="relative md:border-l-0 border-l border-border md:border-0 pl-6 md:pl-0 py-2 md:py-0"
            >
              <span className="font-display text-[clamp(1.75rem,3vw,2.75rem)] text-copper opacity-60 block mb-3">
                {step.number}
              </span>
              <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted text-base leading-[1.6]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
