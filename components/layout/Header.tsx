"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, MenuIcon, CloseIcon } from "@/components/ui/icons";
import { site, mainNav } from "@/config/site";
import { hy } from "@/content/hy";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-header border-b border-line bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-brand">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Հիմնական">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-body font-medium hover:text-brand",
                  active ? "text-brand" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 font-medium text-brand hover:text-brand-hover"
          >
            <PhoneIcon width={18} height={18} />
            {site.phoneDisplay}
          </a>
          <Button href="/calculator" variant="accent" size="sm">
            {hy.cta.getEstimate}
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 md:hidden">
          <a
            href={site.phoneHref}
            aria-label={hy.cta.call}
            className="flex h-10 w-10 items-center justify-center rounded-btn text-brand"
          >
            <PhoneIcon width={22} height={22} />
          </a>
          <button
            type="button"
            aria-label={open ? hy.header.close : hy.header.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-btn text-ink"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden">
          <nav
            className="border-t border-line bg-surface px-4 pb-6 pt-2"
            aria-label="Մոբայլ մենյու"
          >
            {mainNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block border-b border-line py-3 text-lg font-medium",
                    active ? "text-brand" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-4">
              <Button href="/calculator" variant="accent" fullWidth>
                {hy.cta.getEstimate}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
