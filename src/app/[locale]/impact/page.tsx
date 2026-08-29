import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
import { media } from "@/config/media";
import { routes } from "@/config/nav";

export default function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("impact");

  const numberKeys = ["youth", "raised", "donated", "books"] as const;
  const areaKeys = ["art", "publishing", "environment", "public"] as const;
  const donationRows = ["ecobags", "badges", "total", "cost", "donated"] as const;

  return (
    <>
      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-aft py-24 md:py-32">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/75">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={routes.support} variant="primary" event="donate_start">
              {t("hero.ctaSupport")}
            </CtaLink>
            <CtaLink href={routes.projects} variant="secondary">
              {t("hero.ctaReport")}
            </CtaLink>
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS (with base year + basis) */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <div className="flex flex-col items-center gap-2 text-center">
            <SectionHeading eyebrow={t("numbers.eyebrow")} title={t("numbers.title")} centered />
            <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted">
              {t("numbers.baseYear")}
            </span>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {numberKeys.map((k) => (
              <div
                key={k}
                className="rounded-xl border border-line bg-white p-6 text-center shadow-sm"
              >
                <div className="text-4xl font-extrabold text-accent">
                  {t(`numbers.items.${k}.value`)}
                </div>
                <div className="mt-2 text-sm font-semibold text-ink">
                  {t(`numbers.items.${k}.label`)}
                </div>
                <div className="mt-1 text-xs text-muted">
                  {t(`numbers.items.${k}.note`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED IMPACT */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft grid items-center gap-10 lg:grid-cols-2">
          <AftImage
            {...media.impactFeatured}
            label="Our Ocean, Our Tomorrow"
            className="aspect-[16/10] w-full"
          />
          <div>
            <SectionHeading eyebrow={t("featured.eyebrow")} title={t("featured.title")} />
            <p className="mt-4 text-muted">{t("featured.body")}</p>
            <div className="mt-6">
              <CtaLink
                href={`${routes.projects}/our-ocean-our-tomorrow`}
                variant="primary"
                event="project_view"
              >
                {t("featured.cta")}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT BY AREA */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("areas.eyebrow")} title={t("areas.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areaKeys.map((k) => (
              <div key={k} className="rounded-xl bg-surface p-6">
                <h3 className="font-bold text-ink">{t(`areas.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`areas.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATION OUTCOMES */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft max-w-2xl">
          <SectionHeading eyebrow={t("donation.eyebrow")} title={t("donation.title")} />
          <p className="mt-2 text-sm text-muted">{t("donation.note")}</p>
          <dl className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
            {donationRows.map((r) => {
              const emphasize = r === "total" || r === "donated";
              return (
                <div
                  key={r}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    emphasize ? "bg-accent-soft" : "border-b border-line last:border-0"
                  }`}
                >
                  <dt className={emphasize ? "font-bold text-ink" : "text-muted"}>
                    {t(`donation.rows.${r}.label`)}
                  </dt>
                  <dd
                    className={`font-mono font-semibold ${
                      emphasize ? "text-lg text-ink" : "text-ink"
                    }`}
                  >
                    {t(`donation.rows.${r}.value`)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft max-w-3xl">
          <SectionHeading
            eyebrow={t("transparency.eyebrow")}
            title={t("transparency.title")}
          />
          <p className="mt-4 text-muted">{t("transparency.body")}</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("finalCta.title")}</h2>
          <CtaLink href={routes.support} variant="primary" event="donate_start">
            {t("finalCta.cta")}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
