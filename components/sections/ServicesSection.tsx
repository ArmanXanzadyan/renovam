import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services } from "@/config/services";

export function ServicesSection({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <Section muted id="services">
      <SectionHeading
        center
        eyebrow="Ծառայություններ"
        title="Ի՞նչ ենք առաջարկում"
        subtitle="Բոլոր տեսակի վերանորոգման աշխատանքներ՝ մեկ թիմից։"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
      </div>
      {limit && (
        <div className="mt-8 text-center">
          <Button href="/services" variant="ghost">
            Բոլոր ծառայությունները
          </Button>
        </div>
      )}
    </Section>
  );
}
