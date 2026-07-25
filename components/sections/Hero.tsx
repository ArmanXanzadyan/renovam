import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QuoteButton } from "@/components/forms/QuoteButton";
import { site } from "@/config/site";
import { hy } from "@/content/hy";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute inset-0 opacity-10" aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 0%, #ffffff 0, transparent 30%)",
        }}
      />
      <Container className="relative py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-small font-medium">
            {site.stats.years} տարվա փորձ · {site.stats.projects} նախագիծ · {site.stats.warrantyYears} տարի երաշխիք
          </p>
          <h1 className="text-white">
            Վերանորոգում առանց սթրեսի՝ ֆիքսված գնով և երաշխիքով
          </h1>
          <p className="mt-4 text-lg text-white/90">
            {site.name} — բնակարանների և տների որակյալ վերանորոգում Երևանում։
            Ստացեք անվճար նախնական գնահատում մի քանի րոպեում։
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/calculator" variant="accent" size="lg">
              {hy.cta.getEstimate}
            </Button>
            <QuoteButton label={hy.cta.requestQuote} variant="primary" size="lg" source="home_hero" className="!bg-white !text-brand hover:!bg-white/90" />
            <Button href={site.phoneHref} variant="call" size="lg">
              {hy.cta.callNow}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
