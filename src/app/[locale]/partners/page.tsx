import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyKeys.map((k) => (
              <div key={k} className="rounded-sm border border-line bg-white p-6 shadow-sm">
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
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("models.eyebrow")}
            title={t("models.title")}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modelKeys.map((k) => (
              <div key={k} className="rounded-sm bg-white p-6 shadow-sm">
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
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <div className="text-center">
            <p className="eyebrow">{t("how.eyebrow")}</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t("how.title")}
            </h2>
          </div>
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
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <p className="eyebrow">{t("types.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{t("types.title")}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typeKeys.map((k) => (
              <Link
                key={k}
                href={typeHref[k]}
                className="group flex flex-col rounded-sm border border-line bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:border-accent hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-ink">{t(`types.items.${k}.title`)}</h3>
                  <span
                    className="cta-arrow shrink-0 text-lg font-semibold text-accent"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  {t(`types.items.${k}.body`)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
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
