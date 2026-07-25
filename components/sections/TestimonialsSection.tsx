import { Section, SectionHeading } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { testimonials } from "@/config/testimonials";

export function TestimonialsSection() {
  return (
    <Section>
      <SectionHeading
        center
        eyebrow="Կարծիքներ"
        title="Ի՞նչ են ասում մեր հաճախորդները"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.slice(0, 6).map((t, i) => (
          <TestimonialCard key={i} item={t} />
        ))}
      </div>
    </Section>
  );
}
