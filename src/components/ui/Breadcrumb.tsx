"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Sub-page breadcrumb trail (홈 › 섹션 › 현재 페이지). Derives the trail from the
// current locale-agnostic pathname, so every sub-page that renders it gets a
// correct hierarchy with no per-page wiring. Each locale-agnostic path maps to a
// key in the `breadcrumb` messages namespace; nested paths (e.g. /join/apply)
// resolve their parent segment automatically. Unmapped segments are skipped, so
// the trail degrades gracefully to whatever parents ARE known.
const PATH_KEY: Record<string, string> = {
  "/about": "about",
  "/projects": "projects",
  "/impact": "impact",
  "/stories": "stories",
  "/join": "join",
  "/join/apply": "apply",
  "/join/advisor": "advisor",
  "/global-network": "globalNetwork",
  "/partners": "partners",
  "/partners/venue": "venue",
  "/partners/sponsor": "sponsor",
  "/partners/in-kind": "inkind",
  "/partners/expert": "expert",
  "/support": "support",
  "/contact": "contact",
};

export function Breadcrumb({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations("breadcrumb");

  // Walk the path segments, building a cumulative href for each known step.
  const trail: { href: string; label: string }[] = [];
  let acc = "";
  for (const seg of pathname.split("/").filter(Boolean)) {
    acc += `/${seg}`;
    const key = PATH_KEY[acc];
    if (key) trail.push({ href: acc, label: t(key) });
  }

  if (trail.length === 0) return null;

  return (
    // Independent navigation region — its own bar with a bottom divider, sitting
    // between the page title (hero) and the page content. Deliberately NOT part
    // of the title component: it signals the user's location in the site tree.
    <nav
      aria-label="Breadcrumb"
      className={`border-b border-line bg-white ${className}`}
    >
      <ol className="container-aft flex flex-wrap items-center gap-x-2 gap-y-1 py-4 text-sm font-medium text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-ink">
            {t("home")}
          </Link>
        </li>
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-x-2">
              <span aria-hidden className="text-slate-400">
                ›
              </span>
              {isLast ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
