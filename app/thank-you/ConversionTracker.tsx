"use client";

import { useEffect } from "react";

/**
 * Fires the lead conversion event on the thank-you page load.
 * This is the authoritative conversion signal for GA4 + Meta Pixel
 * (fires even if the user reached this page via redirect).
 */
export function ConversionTracker() {
  useEffect(() => {
    try {
      const w = window as unknown as {
        gtag?: (...args: unknown[]) => void;
        fbq?: (...args: unknown[]) => void;
      };
      w.gtag?.("event", "conversion", { event_category: "lead" });
      w.fbq?.("track", "Lead");
    } catch {
      /* no-op */
    }
  }, []);

  return null;
}
