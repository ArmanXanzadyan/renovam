/**
 * Shared validation schemas (client + server) for lead submission.
 * Keep messages in Armenian — they surface directly in the form UI.
 */
import { z } from "zod";

export const SERVICE_SLUGS = [
  "painting",
  "flooring",
  "laminating",
  "tiling",
  "electrical",
  "plumbing",
  "gypsum",
  "complete",
] as const;

export const PROPERTY_TYPES = ["APARTMENT", "NEWBUILD", "HOUSE", "OFFICE"] as const;

export const PREFERRED_CONTACTS = ["PHONE", "VIBER", "TELEGRAM", "WHATSAPP"] as const;

/**
 * Armenian phone. Accepts common local formats:
 *   +37400000000, 37400000000, 0000000000, 00 00 00 00 (spaces/dashes allowed).
 * Validation is on the normalized digit string.
 */
const phoneSchema = z
  .string()
  .trim()
  .min(1, "Հեռախոսահամարը պարտադիր է")
  .transform((v) => v.replace(/[\s()\-]/g, ""))
  .refine(
    (v) => /^(\+374\d{8}|374\d{8}|0\d{8})$/.test(v),
    "Մուտքագրեք վավեր հայկական հեռախոսահամար",
  );

/**
 * The canonical lead payload sent to /api/leads.
 * Only name + phone are required. `website` is a honeypot (must be empty).
 */
export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Մուտքագրեք ձեր անունը")
    .max(100, "Անունը չափազանց երկար է"),
  phone: phoneSchema,
  preferredContact: z.enum(PREFERRED_CONTACTS).default("PHONE"),
  service: z.enum(SERVICE_SLUGS).optional(),
  message: z.string().trim().max(1000, "Հաղորդագրությունը չափազանց երկար է").optional(),
  areaSqm: z.coerce.number().int().positive().max(100000).optional(),
  propertyType: z.enum(PROPERTY_TYPES).optional(),
  city: z.string().trim().max(100).optional(),

  // Estimate snapshot (optional; filled by calculator later)
  estimateLow: z.coerce.number().int().nonnegative().optional(),
  estimateHigh: z.coerce.number().int().nonnegative().optional(),

  // Attribution
  source: z.string().max(120).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),

  // Honeypot — real users never fill this. Must be empty/absent.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;

/** Normalize any accepted phone format to +374XXXXXXXX for storage. */
export function normalizePhone(raw: string): string {
  const v = raw.replace(/[\s()\-]/g, "");
  if (v.startsWith("+374")) return v;
  if (v.startsWith("374")) return `+${v}`;
  if (v.startsWith("0")) return `+374${v.slice(1)}`;
  return v;
}
