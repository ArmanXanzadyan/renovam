import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";

const ITEMS = [
  { value: site.stats.projects, label: "Ավարտված նախագիծ" },
  { value: site.stats.years, label: "Տարվա փորձ" },
  { value: site.stats.rating, label: "Միջին գնահատական" },
  { value: `${site.stats.warrantyYears} տարի`, label: "Երաշխիք" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-canvas py-10">
      <Container>
        <dl className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {ITEMS.map((i) => (
            <div key={i.label}>
              <dt className="font-heading text-3xl font-bold text-brand">{i.value}</dt>
              <dd className="mt-1 text-small text-muted">{i.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
