"use client";

import { Package, Users, Shuffle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const bullets = [
  {
    icon: Package,
    text: "Você paga por funcionalidades que nunca vai usar — e não tem as que realmente precisa.",
  },
  {
    icon: Users,
    text: "Seus concorrentes usam a mesma plataforma, veem os mesmos dados, têm as mesmas ferramentas.",
  },
  {
    icon: Shuffle,
    text: "Você mudou a forma de trabalhar para se adaptar ao software. Deveria ser o contrário.",
  },
];

export default function Pain() {
  return (
    <AnimatedSection className="py-16 md:py-24 bg-surface-alt">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-10">
          Software pronto quase resolve.{" "}
          <span className="text-text-muted">Quase.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bullets.map(({ icon: Icon, text }, i) => (
            <div key={i} className="bg-surface p-8">
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-copper mb-5"
                aria-hidden="true"
              />
              <p className="text-text-muted text-base leading-[1.6]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
