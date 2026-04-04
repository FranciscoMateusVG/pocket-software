"use client";

import AnimatedSection from "./AnimatedSection";

const caseStudies = [
  {
    industry: "Logistics",
    description:
      "A regional freight company needed a dispatch system that actually matched how they worked. We built a real-time operations dashboard with driver tracking, automated route assignment, and client-facing shipment visibility.",
    result: "40% reduction in dispatch time within the first quarter",
  },
  {
    industry: "Professional Services",
    description:
      "A boutique law firm needed a client portal built around their intake process — not a generic legal SaaS. We built a custom document management and communication tool, shaped to their workflow.",
    result: "60% less time spent on administrative back-and-forth",
  },
  {
    industry: "Retail",
    description:
      "An independent retailer had outgrown every off-the-shelf inventory system they tried. We built a stock management platform that mirrors exactly how they buy, store, and sell.",
    result: "Spreadsheet reconciliation: eliminated",
  },
];

const faqs = [
  {
    question: "What does 'exclusive' actually mean?",
    answer:
      "Your software belongs to you alone. We don't resell it, white-label it, or build the same solution for a competitor. Every line of code is purpose-built for your company.",
  },
  {
    question: "How long does a build take?",
    answer:
      "Most projects ship in 8–16 weeks, depending on scope. We nail down the exact timeline during Discovery — no vague estimates, no moving targets.",
  },
  {
    question: "Do I own the code?",
    answer:
      "Completely. The full codebase is yours from day one. Host it anywhere, extend it with any team, take it wherever your business goes.",
  },
];

export default function Proof() {
  return (
    <AnimatedSection className="py-32 md:py-48">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-16">
          Built for real businesses.{" "}
          <span className="text-text-muted">Owned by them, too.</span>
        </h2>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className={`bg-surface p-10 ${i === 2 ? "md:col-span-2 md:max-w-[calc(50%-1.25rem)]" : ""}`}
            >
              <span className="text-copper text-sm font-semibold uppercase tracking-[0.08em] block mb-4">
                {study.industry}
              </span>
              <p className="text-text-muted text-base leading-[1.6] mb-6">
                {study.description}
              </p>
              <p className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] text-gold">
                {study.result}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ Pairs */}
        <div className="max-w-[640px] space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-body font-semibold text-text text-base mb-2">
                {faq.question}
              </h3>
              <p className="font-body text-text-muted text-base leading-[1.6]">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
