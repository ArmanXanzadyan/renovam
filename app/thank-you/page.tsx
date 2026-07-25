import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { hy } from "@/content/hy";
import { ConversionTracker } from "./ConversionTracker";

export const metadata: Metadata = {
  title: "Շնորհակալություն",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    title: "Կզանգահարենք",
    text: `${site.responsePromise}՝ մանրամասները ճշտելու համար։`,
  },
  {
    title: "Անվճար այց",
    text: "Կայցելենք օբյեկտ և կչափենք ծավալը՝ ճշգրիտ գնի համար։",
  },
  {
    title: "Ֆիքսված գին",
    text: "Կստանաք գրավոր, ֆիքսված գնով առաջարկ՝ առանց թաքնված ծախսերի։",
  },
];

export default function ThankYouPage() {
  return (
    <section className="section">
      {/* Fires GA4 / Meta conversion events on mount */}
      <ConversionTracker />

      <Container className="max-w-2xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-call/15 text-call">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1>Շնորհակալություն։ Ձեր հայտն ընդունված է</h1>
        <p className="prose-hy mx-auto mt-3 text-lg">
          {site.responsePromise} (աշխատանքային ժամերին)։ Մինչ այդ կարող եք կապվել
          մեզ հետ ուղիղ։
        </p>

        {/* Faster-contact block */}
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href={site.phoneHref} variant="call" size="lg" fullWidth>
            {hy.cta.callNow}
          </Button>
          <Button
            href={site.messengers.telegram}
            variant="ghost"
            size="lg"
            fullWidth
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </Button>
        </div>

        {/* Next steps */}
        <ol className="mx-auto mt-12 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-card border border-line bg-surface p-5 shadow-card">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-small font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-1 text-small text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* While you wait */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-small">
          <Button href="/portfolio" variant="ghost" size="sm">
            {hy.cta.viewPortfolio}
          </Button>
          <Button href="/services" variant="ghost" size="sm">
            Ծառայություններ
          </Button>
        </div>
      </Container>
    </section>
  );
}
