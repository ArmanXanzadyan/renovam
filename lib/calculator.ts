/**
 * Pure pricing engine for the calculator. No React, no I/O — easily testable.
 */
import {
  rates,
  finishMultipliers,
  propertyMultipliers,
  RANGE_SPREAD,
  type RateKey,
  type FinishLevel,
  type CalcPropertyType,
} from "@/config/pricing-rules";

export type CalcInput = {
  services: RateKey[]; // selected services
  propertyType: CalcPropertyType;
  quantities: Partial<Record<RateKey, number>>; // m² or points per service
  finish: FinishLevel;
};

export type CalcLineItem = {
  service: RateKey;
  unit: "sqm" | "point";
  quantity: number;
  low: number;
  high: number;
};

export type CalcResult = {
  lines: CalcLineItem[];
  totalLow: number;
  totalHigh: number;
};

const round = (n: number) => Math.round(n / 1000) * 1000;

export function calculate(input: CalcInput): CalcResult {
  const finishM = finishMultipliers[input.finish] ?? 1;
  const propM = propertyMultipliers[input.propertyType] ?? 1;

  const lines: CalcLineItem[] = input.services.map((service) => {
    const def = rates[service];
    const qty = Math.max(0, Number(input.quantities[service] ?? 0));
    const base = def.rate * qty * finishM * propM;
    const low = round(base * (1 - RANGE_SPREAD));
    const high = round(base * (1 + RANGE_SPREAD));
    return { service, unit: def.unit, quantity: qty, low, high };
  });

  const totalLow = lines.reduce((s, l) => s + l.low, 0);
  const totalHigh = lines.reduce((s, l) => s + l.high, 0);

  return { lines, totalLow, totalHigh };
}

/** AMD formatting helper: 1200000 → "1 200 000 ֏". */
export function formatAMD(value: number): string {
  return `${value.toLocaleString("hy-AM").replace(/,/g, " ")} ֏`;
}
