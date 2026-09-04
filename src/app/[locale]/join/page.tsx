import type { Metadata } from "next";
import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CheckIcon } from "@/components/ui/CheckIcon";
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
      <section className="bg-white section">
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
                className="card !p-5 text-center"
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
      <section className="bg-surface section">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("how.eyebrow")}
            title={t("how.title")}
            centered
          />
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((k, i) => (
              <div key={k} className="card text-center">
                {/* Number + title on one line, centered — hierarchy comes from
                    colour: accent number, dark-ink title. */}
                <div className="flex items-baseline justify-center gap-2 text-2xl">
                  <span className="font-extrabold text-accent">{i + 1}</span>
                  <h3 className="text-xl font-bold text-slate-700">
                    {t(`how.steps.${k}.title`)}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-muted">
                  {t(`how.steps.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS + SAFETY */}
      <section className="bg-white section">
        <div className="container-aft grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div className="card flex flex-col items-center gap-6 !p-8 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <div className="sm:flex-1">
              <SectionHeading
                eyebrow={t("benefits.eyebrow")}
                title={t("benefits.title")}
                centerOnMobile
              />
              <ul className="mt-6 space-y-3">
                {benefitKeys.map((k) => (
                  <li key={k} className="flex gap-3 text-muted">
                    <CheckIcon className="mt-1 h-4 w-4 flex-none text-accent" />
                    {t(`benefits.items.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="/images/icon-trophy.webp"
              alt=""
              width={128}
              height={128}
              className="order-first h-28 w-28 flex-none sm:order-last sm:h-32 sm:w-32"
            />
          </div>
          <div className="card flex flex-col items-center gap-6 !p-8 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left">
            <div className="sm:flex-1">
              <SectionHeading
                eyebrow={t("safety.eyebrow")}
                title={t("safety.title")}
                centerOnMobile
              />
              <p className="mt-4 text-muted">{t("safety.body")}</p>
            </div>
            <Image
              src="/images/icon-shield.webp"
              alt=""
              width={128}
              height={128}
              className="order-first h-28 w-28 flex-none sm:order-last sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA — background photo + black overlay */}
      <section className="relative isolate overflow-hidden section text-white">
        <AftImage
          src="/images/GILL1035.jpg"
          alt=""
          sizes="100vw"
          className="absolute inset-0 h-full w-full rounded-none"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden />
        <div className="relative z-10 container-aft flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("hero.title")}</h2>
          <CtaLink href={routes.apply} variant="primary" event="join_start">
            {t("hero.ctaStart")}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
