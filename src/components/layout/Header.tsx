"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mainNav, mobileNav, routes } from "@/config/nav";
import { track } from "@/lib/analytics";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-6 lg:px-12">
        <Logo variant="light" />

        {/* Desktop nav (기획서 §1.1) */}
        <nav className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm font-medium uppercase tracking-wide text-white/85 transition-colors hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher tone="light" />
          </div>

          {/* Join stays visible on mobile per 기획서 §1.2 */}
          <Link
            href={routes.join}
            onClick={() => track("join_click", { source: "header" })}
            className="hidden rounded-md border border-white/40 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/10 sm:inline-flex"
          >
            {t("join")}
          </Link>

          <Link
            href={routes.support}
            onClick={() => track("donate_start", { source: "header" })}
            className="btn-primary px-4 py-2"
          >
            {t("donate")}
          </Link>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-white transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-white transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu (기획서 §1.2 order) */}
      {open && (
        <div className="border-t border-white/10 bg-navy lg:hidden">
          <nav className="flex w-full flex-col px-6 py-2 lg:px-12">
            {mobileNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-medium uppercase tracking-wide text-white/90"
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="py-3">
              <LanguageSwitcher tone="light" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
