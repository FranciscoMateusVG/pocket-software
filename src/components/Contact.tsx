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

function WhatsAppIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
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

  const handleWhatsAppClick = () => {
    trackCTAClick("whatsapp_conversa", "contact_section");
    sendGAEvent("event", "whatsapp_click", {
      event_category: "conversion",
      event_label: "whatsapp_contact",
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
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          {/* ── Left: Direct contact (Cal.com + WhatsApp) ──────────── */}
          <div className="flex flex-col items-center md:items-start md:pr-12">
            {/* Cal.com scheduling (if configured) */}
            {showCal && (
              <>
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

                {/* ── "ou" divider between Cal and WhatsApp ────────── */}
                <div className="flex items-center gap-4 w-full my-8">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-text-dim text-sm font-body uppercase tracking-widest">
                    ou
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </>
            )}

            {/* ── WhatsApp (always visible) ─────────────────────────── */}
            <div className="inline-flex items-center gap-2 mb-3">
              <WhatsAppIcon size={20} className="text-[#25D366]" />
              <h3 className="font-display text-xl text-text">
                Chame no WhatsApp
              </h3>
            </div>
            <p className="text-text-muted text-base leading-[1.7] mb-8 text-center md:text-left">
              Respondemos em minutos.
            </p>

            <a
              href="https://wa.me/5511994367475?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os%20da%20Pocket%20Software."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 bg-[#25D366] text-bg font-body font-semibold text-base px-10 py-4 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(37,211,102,0.4)] tracking-[0.02em]"
            >
              <WhatsAppIcon size={18} />
              Conversar no WhatsApp
            </a>
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

          {/* ── Right: Contact form ────────────────────────────────── */}
          <div className="md:pl-12">
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
