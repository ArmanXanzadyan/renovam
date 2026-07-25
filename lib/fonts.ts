/**
 * Armenian typography setup.
 *
 * Uses next/font/google to self-host fonts with full Armenian glyph coverage:
 *  - Noto Sans Armenian  → body/UI text  (--font-sans)
 *  - Noto Serif Armenian → headings      (--font-heading)  [premium contrast]
 *
 * Fonts are fetched at build time and self-hosted; no runtime requests.
 * `display: swap` avoids invisible text on slow mobile networks.
 */
import { Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";

export const fontSans = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const fontHeading = Noto_Serif_Armenian({
  subsets: ["armenian", "latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});
