import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatAMD } from "@/lib/calculator";
import type { Service } from "@/config/services";

const unitLabel: Record<string, string> = {
  sqm: "մ²",
  point: "կետ",
  room: "սենյակ",
  project: "նախագիծ",
};

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card hover className="flex flex-col">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-btn bg-brand-50 text-brand">
        <ServiceGlyph />
      </div>
      <h3 className="text-h3">{service.name}</h3>
      <p className="mt-2 flex-1 text-small text-muted">{service.short}</p>
      <p className="mt-4 font-semibold text-accent">
        {formatAMD(service.priceFrom)}
        <span className="text-small font-normal text-muted"> / {unitLabel[service.unit]}</span>
      </p>
      <div className="mt-4 flex gap-2">
        <Link
          href="/calculator"
          className="text-small font-medium text-brand hover:text-brand-hover"
        >
          Հաշվել գինը →
        </Link>
      </div>
    </Card>
  );
}

function ServiceGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M6 21V8l6-4 6 4v13M10 21v-6h4v6" />
    </svg>
  );
}
