"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Investimos tempo entendendo o seu negócio, seus fluxos de trabalho e o problema que você realmente quer resolver.",
  },
  {
    number: "02",
    title: "Especificação",
    description:
      "Transformamos esse entendimento em um escopo preciso: o que vamos construir, como vai funcionar e exatamente o que você vai receber.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Nossa equipe de engenharia começa a trabalhar. Você tem visibilidade total — sem caixas-pretas, sem surpresas.",
  },
  {
    number: "04",
    title: "Entrega",
    description:
      "Entregamos um código-fonte completo, documentado e totalmente seu para operar, manter e evoluir.",
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
          Um processo claro, do início ao fim.
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
