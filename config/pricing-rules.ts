/**
 * ⚠️ TEMPORARY pricing rules (from owner Harut) — verify before launch.
 *
 * Drives the price calculator. Rates are AMD per unit (m² or point).
 * A ±spread produces a low/high range; finish level and property type apply
 * multipliers. All values are config-only (no DB) in this MVP.
 */

export type FinishLevel = "economy" | "standard" | "premium";

/** Per-service base rate (AMD) and unit. Mirrors config/services.ts. */
export const rates = {
  painting: { unit: "sqm", rate: 2500 },
  tiling: { unit: "sqm", rate: 7000 },
  laminating: { unit: "sqm", rate: 3500 },
  flooring: { unit: "sqm", rate: 4500 },
  electrical: { unit: "point", rate: 8000 },
  plumbing: { unit: "point", rate: 10000 },
  gypsum: { unit: "sqm", rate: 5500 },
  complete: { unit: "sqm", rate: 120000 },
} as const;

export type RateKey = keyof typeof rates;

/** Range spread applied around the base rate (±12%). */
export const RANGE_SPREAD = 0.12;

/** Finish-level multipliers. */
export const finishMultipliers: Record<FinishLevel, number> = {
  economy: 0.85,
  standard: 1.0,
  premium: 1.35,
};

export const finishLabels: Record<FinishLevel, string> = {
  economy: "Էկոնոմ",
  standard: "Ստանդարտ",
  premium: "Պրեմիում",
};

export const finishDescriptions: Record<FinishLevel, string> = {
  economy: "Մատչելի նյութեր, պարզ լուծումներ",
  standard: "Որակի և գնի հավասարակշռություն",
  premium: "Բարձրակարգ նյութեր և ավարտ",
};

/** Property-type multipliers (new-builds need more base work). */
export type CalcPropertyType = "APARTMENT" | "NEWBUILD" | "HOUSE" | "OFFICE";

export const propertyMultipliers: Record<CalcPropertyType, number> = {
  APARTMENT: 1.0,
  NEWBUILD: 1.1,
  HOUSE: 1.15,
  OFFICE: 1.05,
};

export const propertyLabels: Record<CalcPropertyType, string> = {
  APARTMENT: "Բնակարան",
  NEWBUILD: "Նորակառույց",
  HOUSE: "Առանձնատուն",
  OFFICE: "Գրասենյակ",
};
