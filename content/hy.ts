/**
 * Armenian UI strings for shared layout/shell.
 * Single-language in v1; centralized here so copy edits don't touch components.
 */

export const hy = {
  cta: {
    getEstimate: "Անվճար գնահատում",
    requestQuote: "Հայտ ուղարկել",
    call: "Զանգահարել",
    callNow: "Զանգահարել հիմա",
    viewPortfolio: "Դիտել աշխատանքները",
  },
  header: {
    menu: "Մենյու",
    close: "Փակել",
  },
  footer: {
    servicesTitle: "Ծառայություններ",
    contactTitle: "Կապ",
    hoursLabel: "Աշխատանքային ժամեր",
    rights: "Բոլոր իրավունքները պաշտպանված են",
  },
  messengers: {
    viber: "Viber",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
  },
} as const;

export type HyStrings = typeof hy;
