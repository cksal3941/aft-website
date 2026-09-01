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
  const t = await getTranslations({ locale, namespace: "join" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

export default function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("join");

  const roleKeys = ["artist", "author", "designer", "planner", "leader"] as const;
  const stepKeys = ["join", "choose", "create", "share"] as const;
  const benefitKeys = ["projects", "leadership", "network"] as const;

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.joinHero}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      >
        <CtaLink href={routes.apply} variant="primary" event="join_start">
          {t("hero.ctaStart")}
        </CtaLink>
        <CtaLink href={routes.projects} variant="secondary">
          {t("hero.ctaProjects")}
        </CtaLink>
        <CtaLink href={routes.about} variant="secondary">
          {t("hero.ctaParents")}
        </CtaLink>
      </PageHero>

      <Breadcrumb />

      {/* MEMBER ROLES */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("roles.eyebrow")}
            title={t("roles.title")}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {roleKeys.map((k) => (
              <div
                key={k}
                className="rounded-sm border border-line bg-white p-5 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent-hover">
                  {t(`roles.items.${k}.title`).charAt(0)}
                </div>
                <h3 className="font-bold text-ink">{t(`roles.items.${k}.title`)}</h3>
                <p className="mt-1 text-sm text-muted">
                  {t(`roles.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
            centered
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((k, i) => (
              <div key={k} className="rounded-sm bg-white p-6 shadow-sm">
                <div className="text-3xl font-extrabold text-accent">{i + 1}</div>
                <h3 className="mt-2 font-bold text-ink">
                  {t(`how.steps.${k}.title`)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {t(`how.steps.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS + SAFETY */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t("benefits.eyebrow")}
              title={t("benefits.title")}
            />
            <ul className="mt-6 space-y-3">
              {benefitKeys.map((k) => (
                <li key={k} className="flex gap-3 text-muted">
                  <span className="mt-1 text-accent">✓</span>
                  {t(`benefits.items.${k}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-line bg-surface p-8">
            <SectionHeading
              eyebrow={t("safety.eyebrow")}
              title={t("safety.title")}
            />
            <p className="mt-4 text-muted">{t("safety.body")}</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("hero.title")}</h2>
          <CtaLink href={routes.apply} variant="primary" event="join_start">
            {t("hero.ctaStart")}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
