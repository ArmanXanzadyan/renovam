import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

const REASONS = [
  {
    title: "Ֆիքսված գին",
    text: "Գրավոր պայմանագիր և ֆիքսված գին՝ առանց թաքնված ծախսերի։",
  },
  {
    title: "1 տարի երաշխիք",
    text: "Բոլոր աշխատանքների վրա տրամադրում ենք երաշխիք։",
  },
  {
    title: "Ժամկետների պահպանում",
    text: "Աշխատանքներն ավարտում ենք համաձայնեցված ժամկետում։",
  },
  {
    title: "Փորձառու թիմ",
    text: "8 տարվա փորձ և 150+ հաջողությամբ ավարտված նախագիծ։",
  },
  {
    title: "Մաքուր հանձնում",
    text: "Աշխատանքից հետո տարածքը հանձնում ենք մաքուր վիճակում։",
  },
  {
    title: "Անվճար խորհրդատվություն",
    text: "Անվճար այց և գնահատում ձեր օբյեկտում։",
  },
];

export function WhyUs() {
  return (
    <Section>
      <SectionHeading
        center
        eyebrow="Ինչու՞ մենք"
        title="Ինչու՞ ընտրել մեզ"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r) => (
          <Card key={r.title}>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-call/15 text-call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-h3">{r.title}</h3>
            <p className="mt-2 text-small text-muted">{r.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
