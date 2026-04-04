"use client";

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

export default function Proof() {
  return (
    <AnimatedSection className="py-32 md:py-48">
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
