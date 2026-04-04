"use client";

import AnimatedSection from "./AnimatedSection";

export default function CapacitySignal() {
  return (
    <AnimatedSection className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)] text-center">
        <p className="font-display italic text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.4] text-text-muted">
          We take on 2–3 new clients each quarter.
          <br />
          If the timing is right, let&apos;s talk.
        </p>
      </div>
    </AnimatedSection>
  );
}
