"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { mainNav, mobileNav } from "@/config/nav";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Transparent over the hero at the very top of every page (home + sub-pages
  // all open with a dark hero image); solid navy once scrolled or menu open.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // While the full-screen mobile menu is open, lock body scroll and hide the
  // floating quick menu (handled in globals.css via the `nav-open` class).
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const transparent = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        transparent
          ? "bg-gradient-to-b from-black/45 to-transparent"
          : open
            ? "bg-navy shadow-sm"
            : "bg-navy/70 shadow-sm backdrop-blur-lg supports-[backdrop-filter]:bg-navy/55"
      }`}
    >
      <div className="mx-auto flex h-20 w-full items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Logo variant="light" />

        {/* Right-aligned nav + controls */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* Desktop nav (기획서 §1.1) — hover dropdown submenus */}
          <nav className="hidden items-center gap-9 lg:flex xl:gap-12">
            {mainNav.map((item) => {
              // Active when on the section's landing page or any page beneath it.
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);
              return (
              <div key={item.key} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-80 ${
                    active
                      ? "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-white"
                      : ""
                  }`}
                >
                  {t(item.key)}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 pt-4 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul className="min-w-[224px] overflow-hidden rounded-md bg-white py-2 text-ink shadow-xl ring-1 ring-black/5">
                      {item.children.map((c) => (
                        <li key={c.key}>
                          <Link
                            href={c.href}
                            className="block whitespace-nowrap px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:bg-surface hover:text-ink"
                          >
                            {t(`sub.${c.key}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              );
            })}
          </nav>

          <div className="hidden sm:block">
            <LanguageSwitcher tone="light" />
          </div>

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

      {/* Mobile menu — full-screen overlay below the header; accordion inside */}
      <div
        className={`fixed inset-x-0 bottom-0 top-20 z-40 bg-navy transition-opacity duration-300 ease-out lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="h-full overflow-hidden">
          <div className="h-full overflow-y-auto border-t border-white/10">
            <nav className="container-aft flex flex-col py-2">
            {mobileNav.map((item) => {
              const isOpen = openKey === item.key;
              if (!item.children) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-white/5 py-3 text-sm font-medium uppercase tracking-wide text-white/90"
                  >
                    {t(item.key)}
                  </Link>
                );
              }
              return (
                <div key={item.key} className="border-b border-white/5">
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : item.key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium uppercase tracking-wide text-white/90"
                  >
                    <span>{t(item.key)}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-4 w-4 text-white/60 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 pb-2 pl-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.key}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="py-2 text-xs font-medium text-white/75"
                          >
                            {t(`sub.${c.key}`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="py-3">
              <LanguageSwitcher tone="light" />
            </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
