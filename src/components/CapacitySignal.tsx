"use client";

import { sendGAEvent } from "@next/third-parties/google";
import AnimatedSection from "./AnimatedSection";

export default function CapacitySignal() {
  const scrollToContact = () => {
    sendGAEvent("event", "capacity_cta_click", {
      event_category: "conversion",
      event_label: "capacity_signal",
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatedSection id="capacity" className="py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <div className="border border-copper/30 px-8 py-10 md:px-12 md:py-14 text-center shadow-[0_0_40px_rgba(200,149,108,0.08)]">
          {/* Pulsing dot + primary text */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              aria-hidden="true"
              className="pulse-dot w-3 h-3 bg-copper rounded-full shrink-0"
            />
            <p className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.3] text-text">
              Aceitamos apenas 2 a 3 novos clientes por trimestre.
            </p>
          </div>

          {/* Secondary line */}
          <p className="text-text-muted text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.7] mb-8">
            Se a agenda estiver aberta, o próximo cliente pode ser você.
          </p>

          {/* CTA */}
          <button
            onClick={scrollToContact}
            className="bg-gold text-bg font-body font-semibold text-base px-8 py-3.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em]"
          >
            Verificar Disponibilidade
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}
