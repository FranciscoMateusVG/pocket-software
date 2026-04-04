"use client";

import { useScrollDepth, useSectionVisibility } from "@/hooks/useAnalytics";

export default function AnalyticsProvider() {
  useScrollDepth();
  useSectionVisibility();
  return null;
}
