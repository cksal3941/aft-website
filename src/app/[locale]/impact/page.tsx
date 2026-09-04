import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
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
  const t = await getTranslations({ locale, namespace: "impact" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

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
      <PageHero
        image={media.impactImg1}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      >
        <CtaLink href={routes.support} variant="primary" event="donate_start">
          {t("hero.ctaSupport")}
        </CtaLink>
        <CtaLink href={routes.projects} variant="secondary">
          {t("hero.ctaReport")}
        </CtaLink>
      </PageHero>

      <Breadcrumb />

      {/* IMPACT NUMBERS (with base year + basis) */}
      <section className="bg-white section">
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
                className="card text-center"
              >
                <div className="text-3xl font-extrabold text-accent sm:text-4xl">
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
      <section className="bg-surface section">
        <div className="container-aft grid items-center gap-10 lg:grid-cols-2">
          <AftImage
            {...media.impactHomeImg}
            label="Our Ocean, Our Tomorrow"
            className="aspect-[16/10] w-full"
          />
          <div>
            <SectionHeading eyebrow={t("featured.eyebrow")} title={t("featured.title")} centerOnMobile />
            <p className="mt-4 text-muted">{t("featured.body")}</p>
            <div className="mt-6 text-center sm:text-left">
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
      <section className="bg-white section">
        <div className="container-aft">
          <SectionHeading eyebrow={t("areas.eyebrow")} title={t("areas.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {areaKeys.map((k) => (
              <div key={k} className="card">
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
      <section className="bg-surface section">
        <div className="container-aft max-w-2xl">
          <SectionHeading eyebrow={t("donation.eyebrow")} title={t("donation.title")} centered />
          <p className="mt-2 whitespace-pre-line text-center text-sm text-muted">{t("donation.note")}</p>
          <dl className="mt-6 overflow-hidden rounded-sm border border-line bg-white">
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

      {/* FINAL CTA — background photo + black overlay (mirrors PageHero) so it
          reads clearly apart from the navy footer below. */}
      <section className="relative isolate overflow-hidden section text-white">
        <AftImage
          src="/images/GILL1152.jpg"
          alt=""
          objectPosition="center 40%"
          sizes="100vw"
          className="absolute inset-0 h-full w-full rounded-none"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <div className="relative z-10 container-aft flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("finalCta.title")}</h2>
          <CtaLink href={routes.support} variant="primary" event="donate_start">
            {t("finalCta.cta")}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
