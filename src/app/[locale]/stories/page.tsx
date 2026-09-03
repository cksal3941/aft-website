import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { AftImage } from "@/components/ui/AftImage";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";
import { getStories } from "@/content/stories";
import { routes } from "@/config/nav";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stories" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

export default function StoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("stories");
  const items = getStories(locale as Locale);

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.storyShot1}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Breadcrumb />

      {/* STORY CARDS */}
      <section className="bg-white section">
        <div className="container-aft space-y-16">
          {items.map((s, i) => (
            <article
              key={s.slug}
              className={`grid items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <AftImage
                src={s.cover}
                alt={s.name}
                label={s.project}
                tone={s.coverTone}
                className="aspect-[4/3] w-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-hover">
                    {s.role}
                  </span>
                  <span className="text-sm text-muted">{s.project}</span>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-accent">
                  {t("quoteLabel")}
                </p>
                <blockquote className="mt-2 border-l-4 border-accent pl-4 text-xl font-semibold leading-snug text-ink">
                  “{s.quote}”
                </blockquote>
                <p className="mt-4 text-muted">{s.body}</p>
                <p className="mt-3 text-sm font-semibold text-ink">{s.name}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface section">
        <div className="container-aft flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("hero.title")}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href={routes.join} variant="primary" event="join_click">
              {t("cta")}
            </CtaLink>
            <CtaLink href={routes.support} variant="secondary-dark" event="donate_start">
              {t("ctaSupport")}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
