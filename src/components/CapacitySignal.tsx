"use client";

import AnimatedSection from "./AnimatedSection";

export default function CapacitySignal() {
  return (
    <AnimatedSection id="capacity" className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-center">
        <div className="inline-flex items-center gap-3 justify-center">
          {/* Pulsing availability indicator */}
          <span
            aria-hidden="true"
            className="pulse-dot w-2 h-2 bg-copper rounded-full shrink-0"
          />
          <p className="font-display italic text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.4] text-text-muted">
            Aceitamos 2 a 3 novos clientes por trimestre.
            <br />
            Se o momento for certo, vamos conversar.
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}
