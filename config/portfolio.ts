/**
 * ⚠️ DEMO PORTFOLIO CONTENT — placeholder data for launch preview.
 * ------------------------------------------------------------------
 * Everything here is fake/sample content and MUST be replaced with the
 * business's real projects before going live.
 *
 * HOW TO REPLACE:
 *  1. Drop real images into /public/portfolio/<project-slug>/before.jpg
 *     and /after.jpg (or point `before`/`after` at a CDN URL).
 *  2. Update title / description / meta for each project.
 *  3. Keep `services` slugs in sync with config/services.ts.
 *
 * IMAGES: `before`/`after` currently use a placeholder image service so the
 * gallery renders out of the box. Swap the paths for local/CDN images later.
 */

export type PortfolioImage = {
  before: string;
  after: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string; // Armenian
  description: string; // Armenian
  areaSqm: number;
  durationDays: number;
  propertyType: "apartment" | "newbuild" | "house" | "office";
  services: string[]; // slugs from config/services.ts
  featured: boolean;
  image: PortfolioImage;
};

/** Placeholder image helper — deterministic demo images (replace later). */
const ph = (seed: string, label: string): string =>
  `https://picsum.photos/seed/${seed}/1200/900`;

export const projects: Project[] = [
  {
    slug: "kentron-2room",
    title: "2 սենյականոց բնակարան, Կենտրոն",
    description:
      "Խորհրդային շենքի ամբողջական վերանորոգում՝ ժամանակակից ոճով. նոր հատակ, ներկապատում և վերակառուցված խոհանոց։",
    areaSqm: 62,
    durationDays: 45,
    propertyType: "apartment",
    services: ["complete", "painting", "flooring", "electrical"],
    featured: true,
    image: { before: ph("kentron-b", "before"), after: ph("kentron-a", "after"), alt: "Կենտրոնի բնակարանի վերանորոգում" },
  },
  {
    slug: "arabkir-kitchen",
    title: "Խոհանոցի վերանորոգում, Արաբկիր",
    description:
      "Խոհանոցի սալիկապատում և սանտեխնիկայի ամբողջական թարմացում՝ գործնական և հարմարավետ դասավորությամբ։",
    areaSqm: 12,
    durationDays: 14,
    propertyType: "apartment",
    services: ["tiling", "plumbing", "electrical"],
    featured: true,
    image: { before: ph("arabkir-b", "before"), after: ph("arabkir-a", "after"), alt: "Խոհանոցի վերանորոգում" },
  },
  {
    slug: "davtashen-bathroom",
    title: "Սանհանգույցի վերակառուցում, Դավթաշեն",
    description:
      "Ամբողջական սանհանգույց՝ նոր սալիկապատում, ջրագծեր և ժամանակակից սանտեխնիկա։",
    areaSqm: 6,
    durationDays: 12,
    propertyType: "apartment",
    services: ["tiling", "plumbing"],
    featured: true,
    image: { before: ph("davtashen-b", "before"), after: ph("davtashen-a", "after"), alt: "Սանհանգույցի վերանորոգում" },
  },
  {
    slug: "nork-livingroom",
    title: "Հյուրասենյակ, Նոր Նորք",
    description:
      "Գիպսաստվարաթղթե առաստաղ՝ թաքնված լուսավորությամբ, ներկապատում և լամինատի փռում։",
    areaSqm: 24,
    durationDays: 18,
    propertyType: "apartment",
    services: ["gypsum", "painting", "laminating"],
    featured: true,
    image: { before: ph("nork-b", "before"), after: ph("nork-a", "after"), alt: "Հյուրասենյակի վերանորոգում" },
  },
  {
    slug: "ajapnyak-newbuild",
    title: "Նորակառույց բնակարան, Աջափնյակ",
    description:
      "Նորակառույցի «բանալի հանձնելու» վերանորոգում՝ զրոյից մինչև բնակելի վիճակ։",
    areaSqm: 78,
    durationDays: 60,
    propertyType: "newbuild",
    services: ["complete", "gypsum", "tiling", "electrical", "plumbing"],
    featured: false,
    image: { before: ph("ajapnyak-b", "before"), after: ph("ajapnyak-a", "after"), alt: "Նորակառույցի վերանորոգում" },
  },
  {
    slug: "malatia-bedroom",
    title: "Ննջասենյակ, Մալաթիա",
    description:
      "Հանգիստ երանգներով ներկապատում և լամինատե հատակ՝ ջերմ մթնոլորտի համար։",
    areaSqm: 16,
    durationDays: 10,
    propertyType: "apartment",
    services: ["painting", "laminating"],
    featured: false,
    image: { before: ph("malatia-b", "before"), after: ph("malatia-a", "after"), alt: "Ննջասենյակի վերանորոգում" },
  },
  {
    slug: "erebuni-hallway",
    title: "Միջանցք և նախասրահ, Էրեբունի",
    description:
      "Գիպսաստվարաթղթե խորշեր, ներկապատում և ամուր հատակածածկ բարձր անցունակության գոտու համար։",
    areaSqm: 14,
    durationDays: 9,
    propertyType: "apartment",
    services: ["gypsum", "painting", "flooring"],
    featured: false,
    image: { before: ph("erebuni-b", "before"), after: ph("erebuni-a", "after"), alt: "Միջանցքի վերանորոգում" },
  },
  {
    slug: "shengavit-office",
    title: "Փոքր գրասենյակ, Շենգավիթ",
    description:
      "Գրասենյակային տարածքի արդիականացում՝ էլեկտրական կետեր, ներկապատում և հատակ։",
    areaSqm: 40,
    durationDays: 20,
    propertyType: "office",
    services: ["electrical", "painting", "flooring"],
    featured: false,
    image: { before: ph("shengavit-b", "before"), after: ph("shengavit-a", "after"), alt: "Գրասենյակի վերանորոգում" },
  },
  {
    slug: "kentron-studio",
    title: "Ստուդիա բնակարան, Կենտրոն",
    description:
      "Բաց դասավորությամբ ստուդիայի ամբողջական վերանորոգում՝ ֆունկցիոնալ գոտիավորմամբ։",
    areaSqm: 34,
    durationDays: 30,
    propertyType: "apartment",
    services: ["complete", "laminating", "gypsum"],
    featured: false,
    image: { before: ph("studio-b", "before"), after: ph("studio-a", "after"), alt: "Ստուդիայի վերանորոգում" },
  },
  {
    slug: "avan-kids",
    title: "Մանկական սենյակ, Ավան",
    description:
      "Անվտանգ նյութերով ներկապատում և տաք լամինատե հատակ մանկական սենյակի համար։",
    areaSqm: 15,
    durationDays: 8,
    propertyType: "apartment",
    services: ["painting", "laminating"],
    featured: false,
    image: { before: ph("avan-b", "before"), after: ph("avan-a", "after"), alt: "Մանկական սենյակի վերանորոգում" },
  },
  {
    slug: "kanaker-house",
    title: "Առանձնատան հարկ, Քանաքեռ",
    description:
      "Առանձնատան մեկ հարկի ամբողջական վերանորոգում՝ սալիկապատում, ներկապատում և էլեկտրագծեր։",
    areaSqm: 95,
    durationDays: 70,
    propertyType: "house",
    services: ["complete", "tiling", "painting", "electrical", "plumbing"],
    featured: false,
    image: { before: ph("kanaker-b", "before"), after: ph("kanaker-a", "after"), alt: "Առանձնատան վերանորոգում" },
  },
  {
    slug: "zeytun-bathroom2",
    title: "Երկրորդ սանհանգույց, Զեյթուն",
    description:
      "Կոմպակտ սանհանգույցի սալիկապատում և սանտեխնիկա՝ նվազագույն ժամկետում։",
    areaSqm: 4,
    durationDays: 7,
    propertyType: "apartment",
    services: ["tiling", "plumbing"],
    featured: false,
    image: { before: ph("zeytun-b", "before"), after: ph("zeytun-a", "after"), alt: "Սանհանգույցի վերանորոգում" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
