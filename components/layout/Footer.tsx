import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PhoneIcon } from "@/components/ui/icons";
import { site, mainNav, legalNav } from "@/config/site";
import { services } from "@/config/services";
import { hy } from "@/content/hy";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <Container className="grid gap-10 py-12 md:grid-cols-4">
        {/* Brand + trust */}
        <div className="md:col-span-1">
          <div className="font-heading text-xl font-bold text-brand">{site.name}</div>
          <p className="prose-hy mt-2 text-small">{site.tagline}</p>
          <p className="mt-3 text-small text-muted">
            {site.stats.years} տարվա փորձ · {site.stats.projects} նախագիծ ·{" "}
            {site.stats.warrantyYears} տարի երաշխիք
          </p>
        </div>

        {/* Nav */}
        <nav aria-label="Ստորին մենյու">
          <h3 className="text-h3">{site.name}</h3>
          <ul className="mt-3 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-small text-muted hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <nav aria-label={hy.footer.servicesTitle}>
          <h3 className="text-h3">{hy.footer.servicesTitle}</h3>
          <ul className="mt-3 space-y-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href="/services" className="text-small text-muted hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-h3">{hy.footer.contactTitle}</h3>
          <ul className="mt-3 space-y-2 text-small text-muted">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-brand">
                <PhoneIcon width={16} height={16} />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </li>
            <li>{site.address}</li>
            <li>
              <span className="font-medium text-ink">{hy.footer.hoursLabel}:</span>{" "}
              {site.workingHours}
            </li>
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-small text-muted md:flex-row">
          <p>
            © {year} {site.name}. {hy.footer.rights}.
          </p>
          <ul className="flex gap-4">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
