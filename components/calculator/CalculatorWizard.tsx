"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LeadFormModal } from "@/components/forms/LeadFormModal";
import { TextInput } from "@/components/forms/fields";
import { calculate, formatAMD, type CalcInput } from "@/lib/calculator";
import {
  rates,
  finishLabels,
  finishDescriptions,
  propertyLabels,
  type RateKey,
  type FinishLevel,
  type CalcPropertyType,
} from "@/config/pricing-rules";
import { services, getService } from "@/config/services";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

const STEPS = ["Ծառայություն", "Օբյեկտ", "Ծավալ", "Ավարտ", "Արդյունք"];

const PROPERTY_TYPES: CalcPropertyType[] = ["APARTMENT", "NEWBUILD", "HOUSE", "OFFICE"];
const FINISH_LEVELS: FinishLevel[] = ["economy", "standard", "premium"];

export function CalculatorWizard() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<RateKey[]>([]);
  const [propertyType, setPropertyType] = useState<CalcPropertyType>("APARTMENT");
  const [quantities, setQuantities] = useState<Partial<Record<RateKey, number>>>({});
  const [finish, setFinish] = useState<FinishLevel>("standard");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleService = (slug: RateKey) =>
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );

  const input: CalcInput = { services: selected, propertyType, quantities, finish };
  const result = calculate(input);

  const canNext =
    (step === 0 && selected.length > 0) ||
    (step === 1) ||
    (step === 2 && selected.every((s) => (quantities[s] ?? 0) > 0)) ||
    (step === 3);

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-small text-muted">
          <span>Քայլ {step + 1} / {STEPS.length}</span>
          <span>{STEPS[step]}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-card border border-line bg-surface p-6 shadow-card">
        {/* Step 1 — Services */}
        {step === 0 && (
          <div>
            <h2 className="text-h3">Ընտրեք ծառայությունները</h2>
            <p className="mt-1 text-small text-muted">Կարող եք ընտրել մեկ կամ մի քանիսը։</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((s) => {
                const active = selected.includes(s.slug as RateKey);
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => toggleService(s.slug as RateKey)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-btn border p-4 text-left transition-colors",
                      active ? "border-brand bg-brand-50" : "border-line hover:border-brand",
                    )}
                  >
                    <span className="block font-medium text-ink">{s.name}</span>
                    <span className="mt-1 block text-small text-muted">
                      {formatAMD(rates[s.slug as RateKey].rate)} /
                      {rates[s.slug as RateKey].unit === "sqm" ? " մ²" : " կետ"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2 — Property type */}
        {step === 1 && (
          <div>
            <h2 className="text-h3">Օբյեկտի տեսակը</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {PROPERTY_TYPES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPropertyType(p)}
                  aria-pressed={propertyType === p}
                  className={cn(
                    "rounded-btn border p-4 text-left font-medium transition-colors",
                    propertyType === p ? "border-brand bg-brand-50 text-brand" : "border-line text-ink hover:border-brand",
                  )}
                >
                  {propertyLabels[p]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Quantities */}
        {step === 2 && (
          <div>
            <h2 className="text-h3">Նշեք ծավալը</h2>
            <p className="mt-1 text-small text-muted">
              Մուտքագրեք մակերեսը (մ²) կամ կետերի քանակը յուրաքանչյուր ծառայության համար։
            </p>
            <div className="mt-4 space-y-4">
              {selected.map((s) => {
                const svc = getService(s);
                const unit = rates[s].unit;
                return (
                  <div key={s} className="flex items-center justify-between gap-4">
                    <label htmlFor={`qty-${s}`} className="text-body text-ink">
                      {svc?.name}
                      <span className="block text-small text-muted">
                        {unit === "sqm" ? "մ²" : "կետ"}
                      </span>
                    </label>
                    <div className="w-32">
                      <TextInput
                        id={`qty-${s}`}
                        type="number"
                        inputMode="numeric"
                        min={1}
                        placeholder={unit === "sqm" ? "մ²" : "կետ"}
                        value={quantities[s] ?? ""}
                        onChange={(e) =>
                          setQuantities((q) => ({ ...q, [s]: Number(e.target.value) }))
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4 — Finish */}
        {step === 3 && (
          <div>
            <h2 className="text-h3">Ավարտի մակարդակը</h2>
            <div className="mt-4 space-y-3">
              {FINISH_LEVELS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f)}
                  aria-pressed={finish === f}
                  className={cn(
                    "flex w-full items-center justify-between rounded-btn border p-4 text-left transition-colors",
                    finish === f ? "border-brand bg-brand-50" : "border-line hover:border-brand",
                  )}
                >
                  <span>
                    <span className="block font-medium text-ink">{finishLabels[f]}</span>
                    <span className="block text-small text-muted">{finishDescriptions[f]}</span>
                  </span>
                  <span
                    className={cn(
                      "h-5 w-5 rounded-full border-2",
                      finish === f ? "border-brand bg-brand" : "border-line",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5 — Result */}
        {step === 4 && (
          <div>
            <h2 className="text-h3">Նախնական գնահատում</h2>
            <div className="mt-4 rounded-card bg-brand p-6 text-center text-white">
              <p className="text-small opacity-90">Մոտավոր արժեք</p>
              <p className="mt-1 text-2xl font-bold">
                {formatAMD(result.totalLow)} – {formatAMD(result.totalHigh)}
              </p>
            </div>

            <ul className="mt-4 divide-y divide-line rounded-card border border-line">
              {result.lines.map((l) => (
                <li key={l.service} className="flex items-center justify-between px-4 py-3">
                  <span className="text-body text-ink">
                    {getService(l.service)?.name}
                    <span className="block text-small text-muted">
                      {l.quantity} {l.unit === "sqm" ? "մ²" : "կետ"}
                    </span>
                  </span>
                  <span className="text-small font-medium text-ink">
                    {formatAMD(l.low)} – {formatAMD(l.high)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 rounded-btn bg-canvas p-3 text-small text-muted">
              * Սա մոտավոր հաշվարկ է։ Վերջնական գինը կհաստատվի անվճար այցից հետո։
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button variant="accent" size="lg" fullWidth onClick={() => setModalOpen(true)}>
                Ստանալ ճշգրիտ գին
              </Button>
              <Button href={site.phoneHref} variant="call" size="lg" fullWidth>
                Զանգահարել
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              Հետ
            </Button>
            <Button variant="primary" onClick={next} disabled={!canNext}>
              Հաջորդ
            </Button>
          </div>
        )}
      </div>

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Ստացեք ճշգրիտ գին"
        subtitle="Կկապվենք ձեզ հետ և կհաստատենք վերջնական գինը։"
        source="calculator"
        service={selected[0]}
        estimateLow={result.totalLow}
        estimateHigh={result.totalHigh}
      />
    </div>
  );
}
