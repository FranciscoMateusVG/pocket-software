"use client";

import { useState, useRef } from "react";
import {
  User,
  Mail,
  MessageSquare,
  CheckCircle,
  Calendar,
  Loader2,
} from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { trackFormEngagement, trackCTAClick } from "@/hooks/useAnalytics";
import AnimatedSection from "./AnimatedSection";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formEngagedRef = useRef(false);

  const calUrl = process.env.NEXT_PUBLIC_CALCOM_URL;
  const calSlug = process.env.NEXT_PUBLIC_CALCOM_EVENT_SLUG;
  const showCal = !!(calUrl && calSlug);

  const handleFieldFocus = () => {
    if (!formEngagedRef.current) {
      formEngagedRef.current = true;
      trackFormEngagement();
    }
  };

  const handleCalClick = () => {
    trackCTAClick("agendar_conversa", "contact_section");
    sendGAEvent("event", "cal_booking_click", {
      event_category: "conversion",
      event_label: "cal_schedule",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Erro ao enviar mensagem. Tente novamente.");
        setStatus("error");
        return;
      }

      // Fire GA4 event ONLY on success
      sendGAEvent("event", "form_submit", {
        event_category: "conversion",
        event_label: "contact_form",
      });

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      formEngagedRef.current = false;

      // Reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrorMessage("Erro de conexão. Verifique sua internet e tente novamente.");
      setStatus("error");
    }
  };

  return (
    <AnimatedSection id="contact" className="pt-32 pb-40 md:pt-48 md:pb-64">
      <div className="max-w-[1280px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        {/* Section header */}
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-4 text-center">
          Vamos começar?
        </h2>
        <p className="text-text-muted text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.7] text-center mb-16 max-w-2xl mx-auto">
          Sem pitch. Sem compromisso. Apenas uma conversa sobre o que você está
          construindo e se somos a equipe certa para isso.
        </p>

        {/* Two-column layout */}
        <div
          className={`relative grid grid-cols-1 gap-12 ${
            showCal ? "md:grid-cols-2 md:gap-0" : "max-w-[560px] mx-auto"
          }`}
        >
          {/* ── Left: Cal.com scheduling (primary) ─────────────────── */}
          {showCal && (
            <>
              <div className="flex flex-col items-center md:items-start md:pr-12">
                <div className="inline-flex items-center gap-2 mb-3">
                  <Calendar
                    size={20}
                    strokeWidth={1.5}
                    className="text-copper"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl text-text">
                    Agende uma conversa
                  </h3>
                </div>
                <p className="text-text-muted text-base leading-[1.7] mb-8 text-center md:text-left">
                  Escolha o melhor horário e conversamos sobre o seu projeto.
                </p>

                <a
                  href={`${calUrl}/${calSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCalClick}
                  className="inline-flex items-center gap-2 bg-gold text-bg font-body font-semibold text-base px-10 py-4 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em]"
                >
                  <Calendar size={18} strokeWidth={2} aria-hidden="true" />
                  Agendar Horário
                </a>

                <p className="text-text-dim text-sm mt-4 text-center md:text-left">
                  Duração: ~30 minutos. Sem custo.
                </p>
              </div>

              {/* ── Divider ──────────────────────────────────────────── */}
              {/* Desktop: vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
              {/* Mobile: horizontal "ou" badge */}
              <div className="flex md:hidden items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="text-text-dim text-sm font-body uppercase tracking-widest">
                  ou
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            </>
          )}

          {/* ── Right: Contact form (secondary) ────────────────────── */}
          <div className={showCal ? "md:pl-12" : ""}>
            {showCal && (
              <>
                <div className="inline-flex items-center gap-2 mb-3">
                  <MessageSquare
                    size={20}
                    strokeWidth={1.5}
                    className="text-copper"
                    aria-hidden="true"
                  />
                  <h3 className="font-display text-xl text-text">
                    Ou envie uma mensagem
                  </h3>
                </div>
                <p className="text-text-muted text-base leading-[1.7] mb-8">
                  Prefere escrever? Respondemos em até um dia útil.
                </p>
              </>
            )}

            {/* Success state */}
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle
                  size={48}
                  strokeWidth={1.5}
                  className="text-gold mb-4"
                />
                <p className="font-display text-xl text-text mb-2">
                  Mensagem enviada!
                </p>
                <p className="text-text-muted text-base">
                  Respondemos em breve.
                </p>
              </div>
            ) : (
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
                      onFocus={handleFieldFocus}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      disabled={status === "loading"}
                      className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200 disabled:opacity-50"
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
                      onFocus={handleFieldFocus}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      disabled={status === "loading"}
                      className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200 disabled:opacity-50"
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
                      onFocus={handleFieldFocus}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      disabled={status === "loading"}
                      className="w-full bg-surface border border-border text-text pl-10 pr-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200 resize-vertical disabled:opacity-50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gold text-bg font-body font-semibold text-base px-8 py-3.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em] disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2
                        size={18}
                        strokeWidth={2}
                        className="animate-spin"
                        aria-hidden="true"
                      />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </button>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-sm text-center text-[#C87B6B]">
                    {errorMessage}
                  </p>
                )}

                {status !== "error" && (
                  <p className="text-text-dim text-sm text-center">
                    Respondemos em até um dia útil.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
