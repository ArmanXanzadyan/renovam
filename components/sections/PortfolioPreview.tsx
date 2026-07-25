import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { projects } from "@/config/portfolio";

export function PortfolioPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <Section muted>
      <SectionHeading
        center
        eyebrow="Աշխատանքներ"
        title="Մեր վերջին նախագծերը"
        subtitle="Իրական արդյունքներ՝ առաջ և հետո։"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button href="/portfolio" variant="ghost">
          Դիտել բոլոր աշխատանքները
        </Button>
      </div>
    </Section>
  );
}
