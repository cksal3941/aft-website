import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaArrow } from "@/components/ui/CtaArrow";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";
import { routes } from "@/config/nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partners" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

export default function PartnersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("partners");

  const whyKeys = ["youth", "society", "org"] as const;
  const modelKeys = ["corporate", "public", "venue", "inkind"] as const;
  const typeKeys = ["partner", "venue", "sponsor", "inkind", "expert"] as const;
  const howSteps = ["inquiry", "meeting", "plan", "action", "report"] as const;
  // Each partnership type routes to its dedicated form (기획서 §7.1).
  const typeHref: Record<string, string> = {
    partner: routes.partnership,
    venue: routes.venue,
    sponsor: routes.sponsor,
    inkind: routes.inkind,
    expert: routes.expert,
  };

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.joinPartners}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      >
        <CtaLink href={routes.partnership} variant="primary">
          {t("hero.ctaPartner")}
        </CtaLink>
        <CtaLink href={routes.venue} variant="secondary">
          {t("hero.ctaVenue")}
        </CtaLink>
        <CtaLink href={routes.sponsor} variant="secondary">
          {t("hero.ctaSponsor")}
        </CtaLink>
      </PageHero>

      <Breadcrumb />

      {/* WHY PARTNER */}
      <section className="bg-white section">
        <div className="container-aft">
          <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyKeys.map((k) => (
              <div
                key={k}
                data-reveal
                className="card flex flex-col items-center text-center"
              >
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <WhyIcon name={k} />
                </span>
                <h3 className="text-lg font-bold text-ink">
                  {t(`why.items.${k}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted">{t(`why.items.${k}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP MODELS */}
      <section className="bg-surface section">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("models.eyebrow")}
            title={t("models.title")}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modelKeys.map((k) => (
              <div
                key={k}
                data-reveal
                className="card flex flex-col items-center text-center"
              >
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <ModelIcon name={k} />
                </span>
                <h3 className="font-bold text-ink">{t(`models.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`models.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 5-step process infographic */}
      <section className="bg-white section">
        <div className="container-aft">
          <SectionHeading eyebrow={t("how.eyebrow")} title={t("how.title")} centered />
          <ol className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
            {howSteps.map((k, i) => (
              <li
                key={k}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                {/* Connector to the next step (desktop only), sitting behind the
                    opaque icon badges so it reads as a line linking the circles. */}
                {i < howSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-line lg:block"
                  />
                )}
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <HowIcon name={k} />
                </span>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-accent">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 text-base font-bold text-ink">
                  {t(`how.steps.${k}.title`)}
                </h3>
                <p className="mt-1 max-w-[200px] text-sm text-muted">
                  {t(`how.steps.${k}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PARTNERSHIP TYPES → forms (§7.1) */}
      <section className="bg-white section">
        <div className="container-aft">
          <SectionHeading eyebrow={t("types.eyebrow")} title={t("types.title")} centered />
          <ul className="mx-auto mt-10 max-w-2xl divide-y divide-line overflow-hidden rounded-lg border border-line">
            {typeKeys.map((k, i) => (
              <li key={k}>
                <Link
                  href={typeHref[k]}
                  className="group flex items-center gap-5 px-5 py-6 transition-colors hover:bg-surface sm:px-8"
                >
                  <span className="w-8 shrink-0 text-lg font-bold tabular-nums text-accent/50 transition-colors group-hover:text-accent sm:w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-ink">
                      {t(`types.items.${k}.title`)}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {t(`types.items.${k}.body`)}
                    </p>
                  </div>
                  <CtaArrow className="size-6 text-muted transition-colors group-hover:text-accent" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

// Icons for the "WHY PARTNER" cards — same badge treatment as the About page's
// youth-led-teams section. Simple 24×24 line icons (stroke = currentColor) so
// they inherit the teal badge color.
function WhyIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 26,
    height: 26,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "youth": // 청소년 성장·잠재력 — sparkles
      return (
        <svg {...common}>
          <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
          <path d="M19 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
        </svg>
      );
    case "society": // 사회적 가치·영향 — globe
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "org": // 기관·브랜드 성장 — building
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6" />
        </svg>
      );
    default:
      return null;
  }
}

// Icons for the "협력 모델" (partnership models) cards — same teal badge
// treatment as the WHY cards above. Simple 24×24 line icons.
function ModelIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 26,
    height: 26,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "corporate": // 기업 협력 — briefcase
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
        </svg>
      );
    case "public": // 공공·기관 — landmark
      return (
        <svg {...common}>
          <path d="M3 9l9-6 9 6" />
          <path d="M5 9v9M10 9v9M14 9v9M19 9v9M3 21h18" />
        </svg>
      );
    case "venue": // 공간 제공 — location pin
      return (
        <svg {...common}>
          <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "inkind": // 물품·현물 후원 — gift box
      return (
        <svg {...common}>
          <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" />
          <rect x="2" y="7" width="20" height="5" rx="1" />
          <path d="M12 21V7M12 7S11 3 8.5 3 6 5 6 5s0 2 3 2M12 7s1-4 3.5-4S18 5 18 5s0 2-3 2" />
        </svg>
      );
    default:
      return null;
  }
}

// Step icons for the "협력 절차" process infographic. Simple 24×24 line icons
// (stroke = currentColor) so they inherit the accent badge color.
function HowIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 26,
    height: 26,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "inquiry": // 문의 — chat bubble
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.4 8.4 0 0 1 12.5 3a8.4 8.4 0 0 1 8.5 8.5z" />
        </svg>
      );
    case "meeting": // 미팅 — people
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "plan": // 기획 — clipboard
      return (
        <svg {...common}>
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "action": // 실행 — spark / energy
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "report": // 보고 — bar chart
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M8 17v-6M13 17V7M18 17v-9" />
        </svg>
      );
    default:
      return null;
  }
}
