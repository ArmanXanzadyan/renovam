/**
 * Simple in-memory, fixed-window rate limiter keyed by IP.
 *
 * NOTE: In-memory state is per-instance and resets on cold starts. It's a
 * pragmatic first line of defense for a low-volume lead form. For multi-instance
 * or serverless-at-scale, swap the store for Upstash Redis in a later phase
 * (same interface).
 */
import { getEnv } from "@/lib/env";

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSec: number;
};

export function checkRateLimit(key: string): RateLimitResult {
  const { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } = getEnv();
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now >= bucket.resetAt) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1, resetAt, retryAfterSec: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return {
    ok: true,
    remaining: RATE_LIMIT_MAX - bucket.count,
    resetAt: bucket.resetAt,
    retryAfterSec: 0,
  };
}

/** Best-effort client IP extraction from proxy headers. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/** Periodically drop expired buckets to bound memory. */
function sweep() {
  const now = Date.now();
  for (const [key, bucket] of store) {
    if (now >= bucket.resetAt) store.delete(key);
  }
}
// Unref so the timer never keeps the process alive.
if (typeof setInterval !== "undefined") {
  const t = setInterval(sweep, 10 * 60 * 1000);
  (t as unknown as { unref?: () => void }).unref?.();
}
