"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { track } from "@/lib/analytics";

// Toggles the current page between EN and KR, preserving the pathname
// (기획서 §1.1: "현재 페이지 언어 전환").
export function LanguageSwitcher({ tone = "light" }: { tone?: "light" | "dark" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const next = locale === "en" ? "ko" : "en";
  const label = next === "en" ? "EN" : "KR";

  const color =
    tone === "light"
      ? "text-white/90 hover:text-white"
      : "text-navy hover:text-accent-hover";

  function switchLocale() {
    track("language_switch", { from: locale, to: next });
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      type="button"
      onClick={switchLocale}
      className={`text-sm font-semibold ${color}`}
      aria-label={`Switch language to ${label}`}
    >
      {routing.locales.map((l, i) => (
        <span key={l}>
          <span className={l === locale ? "opacity-100" : "opacity-50"}>
            {l.toUpperCase()}
          </span>
          {i === 0 && <span className="mx-1 opacity-40">/</span>}
        </span>
      ))}
    </button>
  );
}
