"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mainNav, mobileNav, routes } from "@/config/nav";
import { track } from "@/lib/analytics";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Transparent over the hero at the very top (home only); solid navy on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-navy shadow-sm"
      }`}
    >
      <div className="container-aft flex h-20 items-center justify-between gap-4">
        <Logo variant="light" />

        {/* Right-aligned nav + controls */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Desktop nav (기획서 §1.1) */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-12">
            {mainNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-80"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden sm:block">
            <LanguageSwitcher tone="light" />
          </div>

          {/* JOIN AFT — flat black @ 70% opacity, no border, no radius */}
          <Link
            href={routes.join}
            onClick={() => track("join_click", { source: "header" })}
            className="hidden rounded-sm bg-black/70 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-white hover:text-ink sm:inline-flex"
          >
            {t("join")}
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
          <nav className="container-aft flex flex-col py-2">
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
