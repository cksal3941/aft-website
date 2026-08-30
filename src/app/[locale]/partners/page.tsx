import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routes } from "@/config/nav";

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
      <section className="bg-navy text-white">
        <div className="container-aft py-24 md:py-32">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href={routes.partnership} variant="primary">
              {t("hero.ctaPartner")}
            </CtaLink>
            <CtaLink href={routes.venue} variant="secondary">
              {t("hero.ctaVenue")}
            </CtaLink>
            <CtaLink href={routes.sponsor} variant="secondary">
              {t("hero.ctaSponsor")}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {whyKeys.map((k) => (
              <div key={k} className="rounded-xl border border-line bg-white p-6 shadow-sm">
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
              <div key={k} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-ink">{t(`models.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`models.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft text-center">
          <p className="eyebrow">{t("how.eyebrow")}</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("how.title")}
          </h2>
        </div>
      </section>

      {/* PARTNERSHIP TYPES → forms (§7.1) */}
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft">
          <p className="eyebrow">{t("types.eyebrow")}</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t("types.title")}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typeKeys.map((k) => (
              <Link
                key={k}
                href={typeHref[k]}
                className="group flex flex-col rounded-xl border border-white/15 bg-white/5 p-6 transition-colors hover:border-accent hover:bg-white/10"
              >
                <h3 className="font-bold text-white">{t(`types.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-white/60">
                  {t(`types.items.${k}.body`)}
                </p>
                <span className="mt-4 text-sm font-semibold text-accent">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
