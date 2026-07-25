"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field, TextInput, Textarea, Select, Honeypot } from "@/components/forms/fields";
import { leadSchema, PREFERRED_CONTACTS } from "@/lib/validation";
import { services } from "@/config/services";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const CONTACT_LABELS: Record<(typeof PREFERRED_CONTACTS)[number], string> = {
  PHONE: "Զանգ",
  VIBER: "Viber",
  TELEGRAM: "Telegram",
  WHATSAPP: "WhatsApp",
};

const PROPERTY_OPTIONS = [
  { value: "APARTMENT", label: "Բնակարան" },
  { value: "NEWBUILD", label: "Նորակառույց" },
  { value: "HOUSE", label: "Առանձնատուն" },
  { value: "OFFICE", label: "Գրասենյակ" },
];

export type LeadFormProps = {
  /** Pre-select a service (e.g. from a service page). */
  service?: string;
  /** Where the form was submitted from (attribution). */
  source?: string;
  /** Estimate snapshot passed from the calculator (later phase). */
  estimateLow?: number;
  estimateHigh?: number;
  /** Called after a successful submit instead of redirecting to /thank-you. */
  onSuccess?: (id: string) => void;
  /** Compact spacing for use inside a modal. */
  compact?: boolean;
  className?: string;
};

type FieldErrors = Record<string, string[] | undefined>;

export function LeadForm({
  service,
  source = "website",
  estimateLow,
  estimateHigh,
  onSuccess,
  compact,
  className,
}: LeadFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredContact, setPreferredContact] =
    useState<(typeof PREFERRED_CONTACTS)[number]>("PHONE");
  const [selectedService, setSelectedService] = useState(service ?? "");
  const [propertyType, setPropertyType] = useState("");
  const [areaSqm, setAreaSqm] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [showDetails, setShowDetails] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Capture UTM params once on mount.
  const [utm, setUtm] = useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  }>({});
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setUtm({
      utmSource: p.get("utm_source") ?? undefined,
      utmMedium: p.get("utm_medium") ?? undefined,
      utmCampaign: p.get("utm_campaign") ?? undefined,
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError(null);

    const payload = {
      fullName,
      phone,
      preferredContact,
      service: selectedService || undefined,
      propertyType: propertyType || undefined,
      areaSqm: areaSqm || undefined,
      city: city || undefined,
      message: message || undefined,
      estimateLow,
      estimateHigh,
      source,
      ...utm,
      website,
    };

    // Client-side validation (mirrors the server schema).
    const result = leadSchema.safeParse(payload);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (res.status === 429) {
        setServerError("Չափազանց շատ փորձեր։ Խնդրում ենք փորձել մի փոքր ուշ։");
        return;
      }
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        if (body?.fields) setErrors(body.fields as FieldErrors);
        setServerError("Հայտը չհաջողվեց ուղարկել։ Խնդրում ենք փորձել կրկին։");
        return;
      }

      const body = await res.json();
      // Analytics conversion event (fires if gtag/fbq are present).
      trackLead();

      if (onSuccess) {
        onSuccess(body.id as string);
      } else {
        router.push("/thank-you");
      }
    } catch {
      setServerError("Ցանցի սխալ։ Ստուգեք կապը և փորձեք կրկին։");
    } finally {
      setSubmitting(false);
    }
  }

  const err = (k: string) => errors[k]?.[0];

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("space-y-4", className)}>
      <Honeypot value={website} onChange={setWebsite} />

      <Field id="fullName" label="Անուն" required error={err("fullName")}>
        <TextInput
          id="fullName"
          name="fullName"
          autoComplete="name"
          placeholder="Ձեր անունը"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          invalid={!!err("fullName")}
        />
      </Field>

      <Field id="phone" label="Հեռախոս" required error={err("phone")}>
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+374 __ ______"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          invalid={!!err("phone")}
        />
      </Field>

      {/* Preferred contact channel — chips */}
      <fieldset>
        <legend className="text-small font-medium text-ink">Նախընտրելի կապ</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PREFERRED_CONTACTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setPreferredContact(c)}
              aria-pressed={preferredContact === c}
              className={cn(
                "h-10 rounded-btn border px-4 text-small font-medium transition-colors",
                preferredContact === c
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-ink hover:border-brand",
              )}
            >
              {CONTACT_LABELS[c]}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Service — hidden if pre-selected via prop */}
      {!service && (
        <Field id="service" label="Ծառայություն" error={err("service")}>
          <Select
            id="service"
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            invalid={!!err("service")}
          >
            <option value="">Ընտրեք ծառայությունը (ըստ ցանկության)</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </Select>
        </Field>
      )}

      {/* Progressive disclosure of optional detail */}
      <button
        type="button"
        onClick={() => setShowDetails((v) => !v)}
        className="text-small font-medium text-brand hover:text-brand-hover"
      >
        {showDetails ? "− Թաքցնել մանրամասները" : "+ Ավելացնել մանրամասներ (ավելի ճշգրիտ գնահատման համար)"}
      </button>

      {showDetails && (
        <div className={cn("space-y-4", compact ? "" : "rounded-card bg-canvas p-4")}>
          <Field id="propertyType" label="Օբյեկտի տեսակ" error={err("propertyType")}>
            <Select
              id="propertyType"
              name="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Ընտրեք</option>
              {PROPERTY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field id="areaSqm" label="Մակերես (մ²)" error={err("areaSqm")}>
            <TextInput
              id="areaSqm"
              name="areaSqm"
              type="number"
              inputMode="numeric"
              min={1}
              placeholder="Օր. 60"
              value={areaSqm}
              onChange={(e) => setAreaSqm(e.target.value)}
              invalid={!!err("areaSqm")}
            />
          </Field>

          <Field id="city" label="Քաղաք / թաղամաս" error={err("city")}>
            <TextInput
              id="city"
              name="city"
              placeholder="Օր. Երևան, Կենտրոն"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Field>

          <Field id="message" label="Հաղորդագրություն" error={err("message")}>
            <Textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Նկարագրեք ձեր նախագիծը"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Field>
        </div>
      )}

      {serverError && (
        <p className="rounded-btn bg-red-50 px-4 py-3 text-small text-red-700" role="alert">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" fullWidth disabled={submitting}>
        {submitting ? "Ուղարկվում է…" : "Ուղարկել հայտը"}
      </Button>

      <p className="text-center text-small text-muted">
        Անվճար և առանց պարտավորության։ {site.responsePromise}։
      </p>
    </form>
  );
}

/** Fire GA4 + Meta Pixel conversion events if the tags are loaded. */
function trackLead() {
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      fbq?: (...args: unknown[]) => void;
    };
    w.gtag?.("event", "generate_lead");
    w.fbq?.("track", "Lead");
  } catch {
    /* no-op */
  }
}
