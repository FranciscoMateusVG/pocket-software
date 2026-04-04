"use client";

import AnimatedSection from "./AnimatedSection";

const pillars = [
  {
    title: "Exclusive",
    description:
      "Your codebase is built from scratch, for your business alone. We don't reuse it, resell it, or build the same thing for anyone else.",
  },
  {
    title: "Tailored",
    description:
      "Every feature, every workflow, every decision is shaped around how your team actually works — not how a SaaS vendor thinks you should.",
  },
  {
    title: "Owned",
    description:
      "You own the code outright, from day one. Host it anywhere. Extend it with any team. It's your competitive edge, not our product.",
  },
];

export default function Difference() {
  return (
    <AnimatedSection className="py-32 md:py-48">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-16">
          We build software that belongs to you.{" "}
          <span className="text-copper">Only you.</span>
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
