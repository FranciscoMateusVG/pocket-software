"use client";

import AnimatedSection from "./AnimatedSection";

const pillars = [
  {
    title: "Exclusivo",
    description:
      "Seu código-fonte é criado do zero, só para o seu negócio. Não reutilizamos, não revendemos, não construímos a mesma coisa para ninguém.",
  },
  {
    title: "Sob Medida",
    description:
      "Cada funcionalidade, cada fluxo de trabalho, cada decisão é moldada pela forma como a sua equipe realmente trabalha — não pela forma como um fornecedor de SaaS acha que deveria.",
  },
  {
    title: "Seu",
    description:
      "Você é dono do código desde o primeiro dia. Hospede onde quiser. Amplie com qualquer equipe. É a sua vantagem competitiva, não o nosso produto.",
  },
];

export default function Difference() {
  return (
    <AnimatedSection className="py-32 md:py-48">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-16">
          Construímos software que pertence a você.{" "}
          <span className="text-copper">Só a você.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {pillars.map((pillar, i) => (
            <div key={i}>
              <h3 className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] mb-4">
                {pillar.title}
              </h3>
              <p className="text-text-muted text-base leading-[1.6]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
