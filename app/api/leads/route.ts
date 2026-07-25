/**
 * POST /api/leads — the core lead-capture endpoint.
 *
 * Pipeline: method guard → honeypot → rate limit → Zod validation →
 * persist (Prisma) → Telegram notify (non-fatal) → JSON response.
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leadSchema, normalizePhone } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendLeadNotification } from "@/lib/telegram";

// Prisma + outbound fetch require the Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // 1) Parse body
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // 2) Honeypot — if the hidden field is filled, silently accept (bot thinks it won).
  if (
    raw &&
    typeof raw === "object" &&
    "website" in raw &&
    typeof (raw as Record<string, unknown>).website === "string" &&
    ((raw as Record<string, unknown>).website as string).length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 3) Rate limit by IP
  const ip = getClientIp(request.headers);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  // 4) Validate
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const phone = normalizePhone(data.phone);

  // 5) Persist
  let leadId: string;
  try {
    const lead = await prisma.lead.create({
      data: {
        fullName: data.fullName,
        phone,
        preferredContact: data.preferredContact,
        service: data.service,
        message: data.message,
        areaSqm: data.areaSqm,
        propertyType: data.propertyType,
        city: data.city,
        estimateLow: data.estimateLow,
        estimateHigh: data.estimateHigh,
        source: data.source ?? "website",
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        ipAddress: ip,
      },
      select: { id: true },
    });
    leadId = lead.id;
  } catch (err) {
    console.error("[api/leads] persist failed:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }

  // 6) Notify Telegram (non-fatal — lead is already saved)
  const notify = await sendLeadNotification({ ...data, phone, leadId });
  if (notify.ok) {
    prisma.lead
      .update({ where: { id: leadId }, data: { notifiedTelegram: true } })
      .catch((e) => console.error("[api/leads] notified flag update failed:", e));
  }

  // 7) Success
  return NextResponse.json({ ok: true, id: leadId }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
