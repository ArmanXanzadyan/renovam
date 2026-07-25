/**
 * Service catalog — hardcoded in v1 (no `services` DB table yet).
 * `slug` values must match the Prisma `ServiceType` enum added in Phase 2.
 * Prices are AMD anchors ("from X") to pre-qualify leads.
 *
 * ⚠️ TEMPORARY placeholder pricing (provided by owner Harut) — verify before launch.
 */

export type ServiceUnit = "sqm" | "point" | "room" | "project";

export type Service = {
  slug: string;
  name: string; // Armenian
  short: string; // one-line benefit
  unit: ServiceUnit;
  priceFrom: number; // AMD per unit
  icon: string; // key into an icon set (Phase 2 renders it)
};

export const services: Service[] = [
  {
    slug: "painting",
    name: "Ներկարարական աշխատանքներ",
    short: "Հարթ, հավասար և երկարակյաց ներկապատում",
    unit: "sqm",
    priceFrom: 2500,
    icon: "paint",
  },
  {
    slug: "flooring",
    name: "Հատակի աշխատանքներ",
    short: "Որակյալ հատակածածկ ամեն սենյակի համար",
    unit: "sqm",
    priceFrom: 4500,
    icon: "floor",
  },
  {
    slug: "laminating",
    name: "Լամինատի փռում",
    short: "Արագ և ճշգրիտ լամինատի տեղադրում",
    unit: "sqm",
    priceFrom: 3500,
    icon: "laminate",
  },
  {
    slug: "tiling",
    name: "Սալիկապատում",
    short: "Խոհանոց, սանհանգույց և հատակ՝ ճշգրիտ սալիկով",
    unit: "sqm",
    priceFrom: 7000,
    icon: "tile",
  },
  {
    slug: "electrical",
    name: "Էլեկտրական աշխատանքներ",
    short: "Անվտանգ էլեկտրագծեր և կետեր",
    unit: "point",
    priceFrom: 8000,
    icon: "electric",
  },
  {
    slug: "plumbing",
    name: "Սանտեխնիկական աշխատանքներ",
    short: "Ջրագծեր և սանտեխնիկա՝ առանց արտահոսքի",
    unit: "point",
    priceFrom: 10000,
    icon: "plumbing",
  },
  {
    slug: "gypsum",
    name: "Գիպսաստվարաթղթի աշխատանքներ",
    short: "Առաստաղներ, խորշեր և միջնապատեր",
    unit: "sqm",
    priceFrom: 5500,
    icon: "gypsum",
  },
  {
    slug: "complete",
    name: "Բնակարանի ամբողջական վերանորոգում",
    short: "«Բանալի հանձնելու» սկզբունքով լրիվ վերանորոգում",
    unit: "sqm",
    priceFrom: 120000,
    icon: "complete",
  },
];

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);
