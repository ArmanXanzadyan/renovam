"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LeadFormModal } from "@/components/forms/LeadFormModal";
import type { LeadFormProps } from "@/components/forms/LeadForm";

type QuoteButtonProps = {
  label: string;
  variant?: "primary" | "accent" | "call" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  modalTitle?: string;
  modalSubtitle?: string;
} & Pick<LeadFormProps, "service" | "source" | "estimateLow" | "estimateHigh">;

/**
 * Button that opens the LeadFormModal. Drop it anywhere a quote CTA is needed;
 * pass `service`/`source` for context-aware pre-fill and attribution.
 */
export function QuoteButton({
  label,
  variant = "accent",
  size = "md",
  fullWidth,
  className,
  modalTitle,
  modalSubtitle,
  ...formProps
}: QuoteButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <LeadFormModal
        open={open}
        onClose={() => setOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        {...formProps}
      />
    </>
  );
}
