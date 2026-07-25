import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { LeadForm } from "@/components/forms/LeadForm";
import { PhoneIcon } from "@/components/ui/icons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Կապ",
  description:
    "Կապվեք RenovAM-ի հետ Երևանում՝ հեռախոսով, Telegram-ով կամ WhatsApp-ով։ Անվճար գնահատում և խորհրդատվություն։",
};

const CHANNELS = [
  { label: "Telegram", href: site.messengers.telegram, bg: "bg-telegram" },
  { label: "WhatsApp", href: site.messengers.whatsapp, bg: "bg-whatsapp" },
  { label: "Viber", href: site.messengers.viber, bg: "bg-viber" },
];

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        center
        eyebrow="Կապ"
        title="Կապվեք մեզ հետ"
        subtitle={site.responsePromise + "՝ աշխատանքային ժամերին։"}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: contact channels */}
        <div className="space-y-6">
          {/* Instant channels first (mobile behavior) */}
          <a
            href={site.phoneHref}
            className="flex items-center gap-4 rounded-card bg-call px-6 py-5 text-white shadow-card"
          >
            <PhoneIcon width={28} height={28} />
            <span>
              <span className="block text-small opacity-90">Զանգահարեք հիմա</span>
              <span className="block text-xl font-bold">{site.phoneDisplay}</span>
            </span>
          </a>

          <div className="grid grid-cols-3 gap-3">
            {CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-14 items-center justify-center rounded-btn font-semibold text-white ${c.bg}`}
              >
                {c.label}
              </a>
            ))}
          </div>

          <Card>
            <ul className="space-y-3 text-body text-ink">
              <li>
                <span className="font-medium">Հասցե:</span> {site.address}
              </li>
              <li>
                <span className="font-medium">Աշխատանքային ժամեր:</span> {site.workingHours}
              </li>
              <li>
                <span className="font-medium">Էլ. փոստ:</span>{" "}
                <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                  {site.email}
                </a>
              </li>
            </ul>
          </Card>

          <div className="overflow-hidden rounded-card border border-line">
            <iframe
              title="Քարտեզ"
              src="https://www.openstreetmap.org/export/embed.html?bbox=44.45%2C40.15%2C44.55%2C40.21&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: form */}
        <Card>
          <h2 className="text-h3">Ուղարկեք հայտ</h2>
          <p className="mt-1 text-small text-muted">
            Լրացրեք ձևը, և մենք կկապվենք ձեզ հետ։
          </p>
          <div className="mt-5">
            <LeadForm source="contact_page" />
          </div>
        </Card>
      </div>
    </Section>
  );
}
