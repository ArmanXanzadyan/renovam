import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  muted?: boolean;
  id?: string;
};

export function Section({ children, className, containerClassName, muted, id }: SectionProps) {
  return (
    <section id={id} className={cn("section", muted && "bg-canvas", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("mb-10", center && "text-center")}>
      {eyebrow && (
        <p className="mb-2 text-small font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {subtitle && (
        <p className={cn("prose-hy mt-3 text-lg", center && "mx-auto")}>{subtitle}</p>
      )}
    </div>
  );
}
