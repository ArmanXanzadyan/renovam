"use client";

import { useEffect, useRef } from "react";
import { LeadForm, type LeadFormProps } from "@/components/forms/LeadForm";
import { CloseIcon } from "@/components/ui/icons";

type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
} & Omit<LeadFormProps, "compact">;

/**
 * Accessible modal wrapper around LeadForm.
 * Handles Esc-to-close, body scroll lock, backdrop click, and focus capture.
 */
export function LeadFormModal({
  open,
  onClose,
  title = "Ստացեք անվճար գնահատում",
  subtitle,
  ...formProps
}: LeadFormModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the panel.
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-modal flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-card bg-surface p-5 shadow-cardHover outline-none sm:rounded-card sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-h3">{title}</h2>
            {subtitle && <p className="mt-1 text-small text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Փակել"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn text-muted hover:bg-canvas hover:text-ink"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <LeadForm compact {...formProps} />
      </div>
    </div>
  );
}
