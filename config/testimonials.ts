/**
 * ⚠️ DEMO TESTIMONIALS — placeholder reviews for launch preview.
 * Replace with real, approved customer testimonials before going live.
 * `project` optionally links to a slug in config/portfolio.ts.
 */

export type Testimonial = {
  author: string; // Armenian
  location: string;
  text: string; // Armenian
  rating: 1 | 2 | 3 | 4 | 5;
  project?: string;
};

export const testimonials: Testimonial[] = [
  {
    author: "Անի Հ.",
    location: "Երևան, Կենտրոն",
    text: "Հին բնակարանը ճանաչելի չէ։ Աշխատանքն ավարտվեց ժամանակին, գինը չփոխվեց, ամեն ինչ մաքուր հանձնեցին։",
    rating: 5,
    project: "kentron-2room",
  },
  {
    author: "Դավիթ Մ.",
    location: "Երևան, Արաբկիր",
    text: "Խոհանոցի սալիկապատումը կատարյալ է։ Հարութն ամեն քայլ բացատրում էր, խորհուրդ եմ տալիս։",
    rating: 5,
    project: "arabkir-kitchen",
  },
  {
    author: "Մարիամ Ս.",
    location: "Երևան, Դավթաշեն",
    text: "Սանհանգույցը դարձավ երազանքիս պես։ Կոկիկ աշխատանք և ազնիվ վերաբերմունք։",
    rating: 5,
    project: "davtashen-bathroom",
  },
  {
    author: "Գևորգ Ա.",
    location: "Երևան, Աջափնյակ",
    text: "Նորակառույցը զրոյից դարձրին բնակելի։ Պայմանագիր, ֆիքսված գին և երաշխիք՝ ամեն ինչ ինչպես պայմանավորվել էինք։",
    rating: 5,
    project: "ajapnyak-newbuild",
  },
  {
    author: "Լիլիթ Ք.",
    location: "Երևան, Նոր Նորք",
    text: "Առաստաղի լուսավորությունն ու ներկապատումը շատ գեղեցիկ ստացվեցին։ Շնորհակալ եմ թիմին։",
    rating: 5,
    project: "nork-livingroom",
  },
  {
    author: "Արմեն Վ.",
    location: "Երևան, Քանաքեռ",
    text: "Առանձնատան հարկը լիովին վերանորոգեցին։ Որակը բարձր է, ժամկետները՝ պահպանված։",
    rating: 5,
    project: "kanaker-house",
  },
];
