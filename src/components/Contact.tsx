"use client";

import { useState } from "react";
import { User, Mail, MessageSquare } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import AnimatedSection from "./AnimatedSection";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up form submission (API route, email service, etc.)
    console.log("Form submitted:", formData);

    // TODO: Move this after actual submission success once form wiring is implemented
    sendGAEvent("event", "form_submit", {
      event_category: "conversion",
      event_label: "contact_form",
    });
  };

  return (
    <AnimatedSection id="contact" className="pt-32 pb-40 md:pt-48 md:pb-64">
      <div className="max-w-[560px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-4 text-center">
          Conte-nos o que você precisa.
        </h2>
        <p className="text-text-muted text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.7] text-center mb-12">
          Sem pitch. Sem compromisso. Apenas uma conversa sobre o que você está construindo e se somos a equipe certa para isso.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-text-muted text-sm mb-2"
            >
              Seu nome
            </label>
            <div className="relative">
              <User
                size={18}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Maria Silva"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-text-muted text-sm mb-2"
            >
              Seu e-mail
            </label>
            <div className="relative">
              <Mail
                size={18}
                strokeWidth={1.5}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="maria@suaempresa.com.br"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-text-muted text-sm mb-2"
            >
              O que você precisa construir?
            </label>
            <div className="relative">
              <MessageSquare
                size={18}
                strokeWidth={1.5}
                className="absolute left-3.5 top-4 text-text-dim pointer-events-none"
                aria-hidden="true"
              />
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Conte-nos sobre o seu negócio e o problema que você quer resolver."
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200 resize-vertical"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-bg font-body font-semibold text-base px-8 py-3.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em]"
          >
            Enviar Mensagem
          </button>

          <p className="text-text-dim text-sm text-center">
            Respondemos em até um dia útil.
          </p>
        </form>
      </div>
    </AnimatedSection>
  );
}
