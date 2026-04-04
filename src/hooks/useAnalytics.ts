"use client";

import { useEffect, useRef } from "react";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%).
 * Fires once per milestone per page load.
 */
export function useScrollDepth() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const milestones = [25, 50, 75, 100];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of milestones) {
        if (percent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          sendGAEvent("event", "scroll_depth", {
            event_category: "engagement",
            event_label: `${milestone}%`,
            value: milestone,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

/**
 * Tracks when a section becomes visible in the viewport.
 * Fires once per section per page load using IntersectionObserver.
 */
export function useSectionVisibility() {
  const firedRef = useRef(new Set<string>());

  useEffect(() => {
    const sections = [
      { id: "hero", selector: "section:first-of-type" },
      { id: "speed", selector: "#speed" },
      { id: "capacity", selector: "#capacity" },
      { id: "pain", selector: "#pain" },
      { id: "difference", selector: "#difference" },
      { id: "how-it-works", selector: "#how-it-works" },
      { id: "proof", selector: "#proof" },
      { id: "capacity", selector: "#capacity" },
      { id: "contact", selector: "#contact" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const sectionId =
              entry.target.getAttribute("data-track-section") || entry.target.id;
            if (sectionId && !firedRef.current.has(sectionId)) {
              firedRef.current.add(sectionId);
              sendGAEvent("event", "section_view", {
                event_category: "engagement",
                event_label: sectionId,
              });
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      for (const section of sections) {
        const el = document.querySelector(section.selector);
        if (el) {
          el.setAttribute("data-track-section", section.id);
          observer.observe(el);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
}

/**
 * Fire a CTA click event.
 */
export function trackCTAClick(label: string, location: string) {
  sendGAEvent("event", "cta_click", {
    event_category: "conversion",
    event_label: label,
    event_location: location,
  });
}

/**
 * Fire a form engagement event (user started filling out the form).
 */
export function trackFormEngagement() {
  sendGAEvent("event", "form_start", {
    event_category: "conversion",
    event_label: "contact_form",
  });
}
