/**
 * Minimal className combiner (no external deps for Phase 1).
 * Filters falsy values and joins with a space.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
