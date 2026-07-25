import { Section, SectionHeading } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/config/faq";

export function FaqSection() {
  return (
    <Section muted>
      <div className="mx-auto max-w-3xl">
        <SectionHeading center eyebrow="Հարցեր" title="Հաճախ տրվող հարցեր" />
        <Accordion items={faqs.map((f) => ({ q: f.q, a: f.a }))} />
      </div>
    </Section>
  );
}
