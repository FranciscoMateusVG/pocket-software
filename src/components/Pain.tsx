"use client";

import AnimatedSection from "./AnimatedSection";

const bullets = [
  "Você paga por funcionalidades que nunca vai usar — e não tem as que realmente precisa.",
  "Seus concorrentes usam a mesma plataforma, veem os mesmos dados, têm as mesmas ferramentas.",
  "Você mudou a forma de trabalhar para se adaptar ao software. Deveria ser o contrário.",
];

export default function Pain() {
  return (
    <AnimatedSection className="py-16 md:py-24 bg-surface-alt">
      <div className="max-w-[720px] mx-auto px-[clamp(1.5rem,4vw,3rem)] md:mx-[clamp(1.5rem,4vw,3rem)] md:mr-auto">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-10">
          Software pronto quase resolve.{" "}
          <span className="text-text-muted">Quase.</span>
        </h2>

        <ul className="space-y-6">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-2 w-2.5 h-2.5 bg-rust shrink-0" />
              <p className="text-text-muted text-base leading-[1.6]">
                {bullet}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedSection>
  );
}
