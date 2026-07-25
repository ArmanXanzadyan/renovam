"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line rounded-card border border-line bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-ink">{item.q}</span>
              <span
                className={cn(
                  "shrink-0 text-2xl leading-none text-brand transition-transform",
                  isOpen && "rotate-45",
                )}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-body text-muted">{item.a}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
