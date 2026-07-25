/**
 * Central site configuration — single source of truth for contact details,
 * navigation, working hours, and messenger deep links.
 * No CMS in v1: edit here and redeploy.
 */

export const site = {
  name: "RenovAM",
  // Armenian tagline used in header/footer/OG
  tagline: "Վերանորոգում առանց սթրեսի",
  url: "https://renovam.am",
  locale: "hy",

  // ── TEMPORARY BUSINESS DATA (placeholder — replace before launch) ──
  owner: "Հարութ",

  // Contact
  phoneDisplay: "+374 00 000 000",
  phoneHref: "tel:+37400000000",
  email: "info@renovam.am",
  address: "ք. Երևան, Հայաստան",
  workingHours: "Երկ–Շաբ, 09:00–19:00",
  responsePromise: "Կզանգահարենք 1 ժամվա ընթացքում",

  // Messenger deep links (huge in the Armenian market)
  messengers: {
    viber: "viber://chat?number=%2B37400000000",
    telegram: "https://t.me/renovam",
    whatsapp: "https://wa.me/37400000000",
  },

  // Social
  social: {
    facebook: "https://facebook.com/renovam",
    instagram: "https://instagram.com/renovam",
  },

  // Trust signals (shown in strips/footer) — TEMPORARY placeholder values
  stats: {
    projects: "150+",
    years: "8",
    rating: "4.9",
    warrantyYears: "1",
  },
} as const;

export type NavItem = { href: string; label: string };

/** Primary navigation (Armenian only in v1). */
export const mainNav: NavItem[] = [
  { href: "/", label: "Գլխավոր" },
  { href: "/services", label: "Ծառայություններ" },
  { href: "/calculator", label: "Հաշվիչ" },
  { href: "/portfolio", label: "Աշխատանքներ" },
  { href: "/contact", label: "Կապ" },
];

/** Footer legal links. */
export const legalNav: NavItem[] = [
  { href: "/privacy", label: "Գաղտնիության քաղաքականություն" },
];
