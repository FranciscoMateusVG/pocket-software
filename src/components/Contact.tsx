"use client";

import { useState } from "react";
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
  };

  return (
    <AnimatedSection id="contact" className="pt-32 pb-40 md:pt-48 md:pb-64">
      <div className="max-w-[560px] mx-auto px-[clamp(1.5rem,4vw,3rem)]">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.2] tracking-[-0.01em] mb-4 text-center">
          Let&apos;s talk about what you need.
        </h2>
        <p className="text-text-muted text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.7] text-center mb-12">
          No pitch. No commitment. Just a conversation about what you&apos;re
          building and whether we&apos;re the right team to build it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-text-muted text-sm mb-2"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jane Smith"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-surface border border-border text-text px-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-text-muted text-sm mb-2"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jane@yourcompany.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-surface border border-border text-text px-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-text-muted text-sm mb-2"
            >
              What are you trying to build?
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your business and the problem you're trying to solve."
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full bg-surface border border-border text-text px-4 py-3.5 font-body text-base placeholder:text-text-dim focus:border-gold focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.2)] transition-all duration-200 resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-bg font-body font-semibold text-base px-8 py-3.5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(232,184,109,0.3)] focus:outline-none focus:shadow-[0_0_0_2px_rgba(232,184,109,0.4)] tracking-[0.02em]"
          >
            Start the Conversation
          </button>

          <p className="text-text-dim text-sm text-center">
            We reply within one business day.
          </p>
        </form>
      </div>
    </AnimatedSection>
  );
}
