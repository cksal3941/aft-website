import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
import { media } from "@/config/media";
import { routes } from "@/config/nav";

export default function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  const teamKeys = ["media", "event", "editing", "host"] as const;
  const beyondKeys = ["publishing", "campaign", "goods", "performance"] as const;
  const valueGroups = ["youth", "society", "partners"] as const;
  const books = t.raw("books.items") as string[];

  return (
    <>
      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-aft grid gap-10 py-24 md:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={routes.join} variant="primary" event="join_click">
                {t("hero.ctaJoin")}
              </CtaLink>
              <CtaLink href={routes.impact} variant="secondary">
                {t("hero.ctaImpact")}
              </CtaLink>
            </div>
          </div>
          <AftImage {...media.aboutHero} label="AFT youth in action" className="aspect-[4/3] w-full" priority />
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft max-w-3xl">
          <SectionHeading eyebrow={t("mission.eyebrow")} title={t("mission.title")} />
          <p className="mt-4 text-lg text-muted">{t("mission.body")}</p>
        </div>
      </section>

      {/* YOUTH-LED TEAMS */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("teams.eyebrow")} title={t("teams.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamKeys.map((k) => (
              <div key={k} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-bold text-ink">{t(`teams.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`teams.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEYOND THE CANVAS */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("beyond.eyebrow")} title={t("beyond.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beyondKeys.map((k) => (
              <div
                key={k}
                className="rounded-xl border border-line bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-ink">{t(`beyond.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`beyond.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>

          {/* Youth books */}
          <div className="mt-14 rounded-2xl bg-surface p-8">
            <p className="eyebrow">{t("books.eyebrow")}</p>
            <h3 className="mt-2 text-xl font-bold text-ink">{t("books.title")}</h3>
            <p className="mt-1 text-sm text-muted">{t("books.note")}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {books.map((title, i) => (
                <div key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <AftImage
                    {...[media.aboutBook1, media.aboutBook2, media.aboutBook3][i]}
                    className="aspect-[3/4] w-full rounded-none"
                  />
                  <p className="p-4 text-center font-semibold text-ink">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft">
          <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} centered />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valueGroups.map((g) => {
              const items = t.raw(`values.${g}.items`) as string[];
              return (
                <div
                  key={g}
                  className="rounded-xl border border-white/15 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-bold text-accent">
                    {t(`values.${g}.title`)}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/75">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-0.5 text-accent">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <CtaLink href={routes.join} variant="primary" event="join_click">
              {t("hero.ctaJoin")}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
