/**
 * Telegram Bot API integration — outbound push only (no webhook in v1).
 * On every new lead, the sales team group chat gets an instant, formatted alert.
 *
 * Failure is non-fatal: the lead is already persisted before we notify, so a
 * Telegram outage never loses a lead. We log and report success/failure back
 * to the caller (used to set `notifiedTelegram`).
 */
import { getEnv } from "@/lib/env";
import { getService } from "@/config/services";
import type { LeadInput } from "@/lib/validation";

const PROPERTY_LABELS: Record<string, string> = {
  APARTMENT: "Բնակարան",
  NEWBUILD: "Նորակառույց",
  HOUSE: "Առանձնատուն",
  OFFICE: "Գրասենյակ",
};

const CONTACT_LABELS: Record<string, string> = {
  PHONE: "Զանգ",
  VIBER: "Viber",
  TELEGRAM: "Telegram",
  WHATSAPP: "WhatsApp",
};

/** HTML-escape user content for Telegram `parse_mode: HTML`. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type NotifyData = LeadInput & { phone: string; leadId?: string };

export function buildLeadMessage(lead: NotifyData): string {
  const lines: string[] = [];
  lines.push("🔔 <b>Նոր հայտ — RenovAM</b>");
  lines.push("");
  lines.push(`👤 <b>Անուն:</b> ${esc(lead.fullName)}`);
  lines.push(`📞 <b>Հեռախոս:</b> ${esc(lead.phone)}`);
  lines.push(
    `💬 <b>Կապ:</b> ${CONTACT_LABELS[lead.preferredContact] ?? lead.preferredContact}`,
  );

  if (lead.service) {
    const svc = getService(lead.service);
    lines.push(`🛠 <b>Ծառայություն:</b> ${esc(svc?.name ?? lead.service)}`);
  }
  if (lead.propertyType) {
    lines.push(
      `🏠 <b>Օբյեկտ:</b> ${PROPERTY_LABELS[lead.propertyType] ?? lead.propertyType}`,
    );
  }
  if (lead.areaSqm) lines.push(`📐 <b>Մակերես:</b> ${lead.areaSqm} մ²`);
  if (lead.city) lines.push(`📍 <b>Քաղաք:</b> ${esc(lead.city)}`);

  if (lead.estimateLow != null && lead.estimateHigh != null) {
    lines.push(
      `💰 <b>Նախնական գնահատում:</b> ${lead.estimateLow.toLocaleString("hy-AM")}–${lead.estimateHigh.toLocaleString("hy-AM")} ֏`,
    );
  }
  if (lead.message) lines.push(`📝 <b>Հաղորդագրություն:</b> ${esc(lead.message)}`);

  const attribution = [lead.source, lead.utmSource, lead.utmCampaign]
    .filter(Boolean)
    .join(" · ");
  if (attribution) lines.push(`🔗 <i>${esc(attribution)}</i>`);

  return lines.join("\n");
}

export type TelegramResult = { ok: boolean; error?: string };

export async function sendLeadNotification(
  lead: NotifyData,
): Promise<TelegramResult> {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = getEnv();

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("[telegram] Missing bot token or chat id — skipping notification.");
    return { ok: false, error: "not_configured" };
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: TELEGRAM_CHAT_ID,
    text: buildLeadMessage(lead),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  // Bound the request so a hanging call can't stall the API response.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[telegram] sendMessage failed:", res.status, detail);
      return { ok: false, error: `http_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error("[telegram] sendMessage error:", msg);
    return { ok: false, error: msg };
  } finally {
    clearTimeout(timeout);
  }
}
