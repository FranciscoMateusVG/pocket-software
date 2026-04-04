"use client";

import AnimatedSection from "./AnimatedSection";

export default function SpeedStatement() {
  return (
    <AnimatedSection id="speed" className="py-24 md:py-40">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-center">
        {/* The number — massive, impossible to miss */}
        <p className="font-display text-[clamp(4rem,12vw,9rem)] leading-[1] tracking-[-0.02em] text-gold mb-4">
          1 semana.
        </p>
        <p className="text-text-muted text-[clamp(1.1rem,1.4vw,1.4rem)] leading-[1.6] mb-16">
          Do briefing ao seu software funcionando.
        </p>

        {/* Contrast row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Traditional market */}
          <div className="text-center">
            <p className="text-text-dim text-sm uppercase tracking-widest mb-2 font-body">
              Mercado tradicional
            </p>
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-text-dim line-through decoration-text-dim/40">
              4 a 6 meses
            </p>
          </div>

          {/* Pocket Software */}
          <div className="text-center">
            <p className="text-copper text-sm uppercase tracking-widest mb-2 font-body">
              Pocket Software
            </p>
            <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-gold">
              1 semana
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
