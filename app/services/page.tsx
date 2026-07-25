import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { QuoteButton } from "@/components/forms/QuoteButton";
import { CtaBand } from "@/components/sections/CtaBand";
import { services } from "@/config/services";
import { formatAMD } from "@/lib/calculator";

export const metadata: Metadata = {
  title: "Ծառայություններ",
  description:
    "Ներկարարություն, սալիկապատում, լամինատ, հատակ, էլեկտրական և սանտեխնիկական աշխատանքներ, գիպսաստվարաթուղթ և ամբողջական վերանորոգում Երևանում։",
};

const unitLabel: Record<string, string> = {
  sqm: "մ²",
  point: "կետ",
  room: "սենյակ",
  project: "նախագիծ",
};

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Ծառայություններ"
          title="Մեր ծառայությունները"
          subtitle="Բոլոր տեսակի վերանորոգման աշխատանքներ՝ ֆիքսված գնով և երաշխիքով։"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.slug} hover className="flex flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-h3">{s.name}</h2>
                  <p className="mt-2 text-body text-muted">{s.short}</p>
                </div>
              </div>
              <p className="mt-4 text-lg font-semibold text-accent">
                {formatAMD(s.priceFrom)}
                <span className="text-small font-normal text-muted"> / {unitLabel[s.unit]}-ից</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <QuoteButton
                  label="Հայտ ուղարկել"
                  variant="accent"
                  size="sm"
                  service={s.slug}
                  source={`service_${s.slug}`}
                />
                <Button href="/calculator" variant="ghost" size="sm">
                  Հաշվել գինը
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
