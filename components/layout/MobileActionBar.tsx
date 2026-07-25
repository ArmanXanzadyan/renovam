import { site } from "@/config/site";
import { hy } from "@/content/hy";
import { PhoneIcon, ChatIcon } from "@/components/ui/icons";

/**
 * Sticky bottom action bar (mobile only) — the biggest mobile conversion lever.
 * Two thumb-zone actions: Call (green) and Request Quote (accent → calculator).
 * Body has bottom padding (globals.css) so content is never hidden behind it.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-bar border-t border-line bg-surface shadow-bar md:hidden">
      <div
        className="grid grid-cols-2 gap-2 p-2"
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={site.phoneHref}
          className="flex h-12 items-center justify-center gap-2 rounded-btn bg-call font-semibold text-white"
        >
          <PhoneIcon width={20} height={20} />
          {hy.cta.call}
        </a>
        <a
          href="/contact"
          className="flex h-12 items-center justify-center gap-2 rounded-btn bg-accent font-semibold text-ink"
        >
          <ChatIcon width={20} height={20} />
          {hy.cta.requestQuote}
        </a>
      </div>
    </div>
  );
}
