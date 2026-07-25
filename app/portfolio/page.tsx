import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/portfolio/BeforeAfter";
import { getService } from "@/config/services";
import { projects } from "@/config/portfolio";
import { site } from "@/config/site";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Աշխատանքներ",
  description:
    "Մեր ավարտված վերանորոգման նախագծերը Երևանում՝ առաջ և հետո լուսանկարներով։",
};

export default function PortfolioPage() {
  return (
    <>
      <Section>
        <SectionHeading
          center
          eyebrow="Աշխատանքներ"
          title="Մեր նախագծերը"
          subtitle={`${site.stats.projects} հաջողությամբ ավարտված նախագիծ։ Քաշեք սահիչը՝ առաջ և հետո տեսնելու համար։`}
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.slug}>
              <BeforeAfter before={p.image.before} after={p.image.after} alt={p.image.alt} />
              <div className="mt-4">
                <h2 className="text-h3">{p.title}</h2>
                <p className="mt-2 text-small text-muted">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand"
                    >
                      {getService(s)?.name}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-small text-muted">
                  {p.areaSqm} մ² · {p.durationDays} օր
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
