"use client";

import { HelpCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const caseStudies = [
  {
    industry: "Logística",
    description:
      "Uma transportadora regional precisava de um sistema de despacho que funcionasse do jeito delas. Construímos um painel de operações em tempo real com rastreamento de motoristas, atribuição automática de rotas e visibilidade de embarques para os clientes.",
    result: "40% de redução no tempo de despacho no primeiro trimestre",
  },
  {
    industry: "Serviços Profissionais",
    description:
      "Um escritório de advocacia boutique precisava de um portal de clientes construído em torno do seu processo de captação — não um SaaS jurídico genérico. Construímos uma ferramenta de gestão de documentos e comunicação sob medida.",
    result: "60% menos tempo gasto com burocracia administrativa",
  },
  {
    industry: "Varejo",
    description:
      "Um varejista independente já tinha superado todos os sistemas de estoque prontos do mercado. Construímos uma plataforma de gestão de estoque que espelha exatamente como eles compram, armazenam e vendem.",
    result: "Conciliação por planilha — eliminada",
  },
];

const faqs = [
  {
    question: "O que 'exclusivo' realmente significa?",
    answer:
      "Seu software pertence só a você. Não revendemos, não fazemos white-label, não construímos a mesma solução para um concorrente. Cada linha de código é feita sob medida para a sua empresa.",
  },
  {
    question: "Quanto tempo leva um projeto?",
    answer:
      "A maioria dos projetos é entregue em 8 a 16 semanas, dependendo do escopo. Definimos o prazo exato durante o Diagnóstico — sem estimativas vagas, sem prazos que mudam.",
  },
  {
    question: "Eu sou dono do código?",
    answer:
      "Completamente. O código-fonte completo é seu desde o primeiro dia. Hospede onde quiser, amplie com qualquer equipe, leve para onde o seu negócio for.",
  },
];

/* ── Abstract UI Mockups ─────────────────────────────────────────────── */

function LogisticsMockup() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="rotate-2 bg-surface border border-border w-[220px] h-[148px] overflow-hidden flex flex-col shrink-0"
    >
      {/* Top bar */}
      <div className="h-6 bg-[#1A1714] border-b border-border flex items-center gap-1.5 px-2 shrink-0">
        <div className="w-2 h-2 rounded-full bg-copper opacity-60" />
        <div className="w-2 h-2 rounded-full bg-gold opacity-35" />
        <div className="w-2 h-2 rounded-full bg-rust opacity-35" />
      </div>
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: route list */}
        <div className="w-14 bg-[#1A1714] border-r border-border p-2 space-y-2 shrink-0">
          <div className="h-1.5 bg-copper opacity-40 w-full" />
          <div className="h-1.5 bg-[#78746C] opacity-25 w-4/5" />
          <div className="h-1.5 bg-[#78746C] opacity-20 w-full" />
          <div className="h-1.5 bg-[#78746C] opacity-15 w-3/4" />
        </div>
        {/* Map area with grid + driver dots */}
        <div className="flex-1 relative">
          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(46,42,35,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(46,42,35,0.9) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          {/* Driver position dots */}
          <div className="absolute top-[22%] left-[28%] w-2.5 h-2.5 rounded-full bg-copper opacity-80" />
          <div className="absolute top-[52%] left-[58%] w-2 h-2 rounded-full bg-gold opacity-65" />
          <div className="absolute top-[68%] left-[18%] w-2 h-2 rounded-full bg-copper opacity-70" />
          <div className="absolute top-[38%] left-[72%] w-1.5 h-1.5 rounded-full bg-rust opacity-55" />
          <div className="absolute top-[15%] left-[62%] w-1.5 h-1.5 rounded-full bg-[#A8A299] opacity-35" />
        </div>
      </div>
    </div>
  );
}

function LawFirmMockup() {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="-rotate-2 bg-surface border border-border w-[220px] h-[148px] overflow-hidden flex flex-col shrink-0"
    >
      {/* Top nav */}
      <div className="h-6 bg-[#1A1714] border-b border-border flex items-center gap-2 px-2 shrink-0">
        <div className="w-4 h-1 bg-copper opacity-45" />
        <div className="w-4 h-1 bg-[#78746C] opacity-25" />
        <div className="w-4 h-1 bg-[#78746C] opacity-20" />
      </div>
      {/* Body */}
      <div className="flex flex-1 gap-2 p-2 overflow-hidden">
        {/* Document list column */}
        <div className="w-24 space-y-1.5 shrink-0">
          {(
            [
              { dot: "bg-copper" },
              { dot: "bg-gold" },
              { dot: "bg-rust" },
            ] as { dot: string }[]
          ).map((d, i) => (
            <div
              key={i}
              className="h-7 bg-[#1A1714] border border-border flex items-center px-1.5 gap-1"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${d.dot} opacity-60 shrink-0`} />
              <div className="flex-1 space-y-1">
                <div className="h-0.5 bg-[#78746C] opacity-25 w-full" />
                <div className="h-0.5 bg-[#78746C] opacity-15 w-4/5" />
              </div>
            </div>
          ))}
        </div>
        {/* Communication area */}
        <div className="flex-1 flex flex-col gap-1.5 justify-end overflow-hidden">
          <div className="h-8 bg-[#1A1714] border border-border p-1.5">
            <div className="h-0.5 bg-[#78746C] opacity-25 w-full mb-1" />
            <div className="h-0.5 bg-[#78746C] opacity-15 w-3/4" />
          </div>
          <div className="h-6 border border-copper/20 bg-copper/5 p-1 self-end w-3/4">
            <div className="h-0.5 bg-copper opacity-35 w-full mb-0.5" />
            <div className="h-0.5 bg-copper opacity-20 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RetailMockup() {
  const items = [
    { w: 70, color: "bg-copper" },
    { w: 40, color: "bg-rust" },
    { w: 90, color: "bg-gold" },
    { w: 55, color: "bg-copper" },
    { w: 20, color: "bg-rust" },
    { w: 75, color: "bg-gold" },
  ];

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="rotate-2 bg-surface border border-border w-[220px] h-[148px] overflow-hidden flex flex-col shrink-0"
    >
      {/* Top bar */}
      <div className="h-6 bg-[#1A1714] border-b border-border flex items-center px-2 gap-1.5 shrink-0">
        <div className="w-10 h-1 bg-[#78746C] opacity-25" />
        <div className="ml-auto w-3 h-3 border border-[#78746C] opacity-30" />
      </div>
      {/* 2×3 product grid */}
      <div className="flex-1 p-2 grid grid-cols-3 gap-1">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-[#1A1714] border border-border flex flex-col overflow-hidden"
          >
            <div className="flex-1 p-1">
              <div className="h-0.5 bg-[#78746C] opacity-20 w-4/5 mb-0.5" />
              <div className="h-0.5 bg-[#78746C] opacity-10 w-3/5" />
            </div>
            {/* Stock level bar */}
            <div className="h-1 bg-[#2E2A23] relative overflow-hidden">
              <div
                className={`h-full ${item.color} opacity-55`}
                style={{ width: `${item.w}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Mini chart in corner */}
      <div className="absolute bottom-2 right-2 w-9 h-5 border border-border/40 flex items-end gap-px p-0.5">
        {[3, 5, 2, 4, 3].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-copper opacity-30"
            style={{ height: `${h * 18}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const mockupComponents = [
  <LogisticsMockup key="logistics" />,
  <LawFirmMockup key="law" />,
  <RetailMockup key="retail" />,
];

/* ── Main Component ──────────────────────────────────────────────────── */

export default function Proof() {
  return (
    <AnimatedSection id="proof" className="py-32 md:py-48">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-16">
          Feito para empresas reais.{" "}
          <span className="text-text-muted">E de propriedade delas.</span>
        </h2>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className={`bg-surface p-10 ${i === 2 ? "md:col-span-2 md:max-w-[calc(50%-1.25rem)]" : ""}`}
            >
              <span className="text-copper text-sm font-semibold uppercase tracking-[0.08em] block mb-6">
                {study.industry}
              </span>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex-1 min-w-0">
                  <p className="text-text-muted text-base leading-[1.6] mb-6">
                    {study.description}
                  </p>
                  <p className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] text-gold">
                    {study.result}
                  </p>
                </div>
                {mockupComponents[i]}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Pairs */}
        <div className="max-w-[640px] space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-body font-semibold text-text text-base mb-2 flex items-center gap-2">
                <HelpCircle
                  size={16}
                  strokeWidth={1.5}
                  className="text-text-muted shrink-0"
                  aria-hidden="true"
                />
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
