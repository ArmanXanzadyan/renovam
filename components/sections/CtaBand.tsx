import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuoteButton } from "@/components/forms/QuoteButton";
import { site } from "@/config/site";
import { hy } from "@/content/hy";

export function CtaBand() {
  return (
    <section className="section">
      <Container className="text-center">
        <h2>Պատրա՞ստ եք սկսել ձեր վերանորոգումը</h2>
        <p className="prose-hy mx-auto mt-3 text-lg">
          Թողեք հայտ կամ զանգահարեք՝ {site.responsePromise.toLowerCase()}։
        </p>
        <div className="mx-auto mt-6 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
          <QuoteButton label={hy.cta.requestQuote} variant="accent" size="lg" source="cta_band" />
          <Button href={site.phoneHref} variant="call" size="lg">
            {hy.cta.callNow}
          </Button>
        </div>
      </Container>
    </section>
  );
}
