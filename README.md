# RenovAM — Armenian Home Renovation Marketplace (MVP)

Armenian-only, mobile-first, lead-generation website for a home renovation
business in Yerevan. Built with Next.js 15, TypeScript, TailwindCSS, Prisma
and PostgreSQL, with Telegram lead notifications.

## Requirements

- Node.js 18.18+ (or 20+)
- npm
- A PostgreSQL database (local, or hosted: Neon / Supabase / RDS)

## Getting started

```bash
cd renovam
npm install
cp .env.example .env    # then fill DATABASE_URL, DIRECT_URL, TELEGRAM_*
npm run db:migrate      # creates the Lead table
npm run dev
# http://localhost:3000
```

> The site runs without a database for static browsing, but **lead submission
> requires `DATABASE_URL`**, and Telegram alerts require `TELEGRAM_BOT_TOKEN`
> + `TELEGRAM_CHAT_ID`. Without Telegram vars, leads still save and the API
> still succeeds (notification is skipped).

Other scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run typecheck`, `npm run db:studio`.

## Features

- **Pages:** Home, Services, Calculator, Portfolio, Contact, Thank You, Privacy
- **Lead system:** reusable form + modal, Zod validation, honeypot, IP rate
  limiting, Prisma persistence, Telegram notifications
- **Price calculator:** multi-step wizard (service → property → area → finish →
  result) with AMD breakdown, feeding a pre-filled lead form
- **Portfolio:** 12 demo projects with interactive before/after sliders
- **SEO:** per-page metadata, `sitemap.xml`, `robots.txt`, LocalBusiness JSON-LD
- **Design system:** Tailwind tokens + Armenian typography via `next/font`

## ⚠️ Placeholder / temporary content

All business data below is **temporary demo content** and clearly marked for
easy replacement:

| What | File | Notes |
|------|------|-------|
| Owner, phone, address, stats, hours | `config/site.ts` | Owner: Հարութ · 8 yrs · 150+ projects · 1 yr warranty |
| Services + pricing (AMD) | `config/services.ts` | Placeholder prices from owner |
| Calculator rates + multipliers | `config/pricing-rules.ts` | Same AMD prices |
| Demo portfolio (12 projects, before/after) | `config/portfolio.ts` | Images use picsum.photos — swap for real images |
| Demo testimonials | `config/testimonials.ts` | Replace with real approved reviews |
| FAQ | `config/faq.ts` | Static Q&A |
| Armenian UI strings | `content/hy.ts` | Shared shell copy |

### Replacing portfolio images

Put real images in `public/portfolio/<slug>/before.jpg` and `/after.jpg`,
then update the `before`/`after` paths in `config/portfolio.ts`. The demo uses
`picsum.photos` (allowlisted in `next.config.ts`); remove that host once you
switch to local/CDN images.

## Deploy

Deploy to Vercel; set the env vars in the project settings and run
`prisma migrate deploy` (via the build step or manually) against your
production database.
