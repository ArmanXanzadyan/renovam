import { site } from "@/config/site";
import { hy } from "@/content/hy";

/**
 * Floating messenger cluster (bottom-right on desktop).
 * Viber / Telegram / WhatsApp dominate Armenian communication.
 * Hidden on mobile where the MobileActionBar covers primary actions.
 */
export function MessengerCluster() {
  const items = [
    { href: site.messengers.telegram, label: hy.messengers.telegram, bg: "bg-telegram" },
    { href: site.messengers.whatsapp, label: hy.messengers.whatsapp, bg: "bg-whatsapp" },
    { href: site.messengers.viber, label: hy.messengers.viber, bg: "bg-viber" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-cluster hidden flex-col gap-3 md:flex">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-card transition-transform hover:scale-105 ${item.bg}`}
        >
          <MessengerGlyph />
        </a>
      ))}
    </div>
  );
}

function MessengerGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.5 1.13 4.75 2.96 6.36-.13 1.1-.53 2.5-1.46 3.64 1.7-.2 3.2-.86 4.32-1.6 1.28.4 2.66.6 4.18.6 5.52 0 10-4.03 10-9S17.52 2 12 2z" />
    </svg>
  );
}
