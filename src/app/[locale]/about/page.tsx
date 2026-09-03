import type { Metadata } from "next";
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
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

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

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.aboutHero}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      >
        <CtaLink href={routes.join} variant="primary" event="join_click">
          {t("hero.ctaJoin")}
        </CtaLink>
        <CtaLink href={routes.impact} variant="secondary">
          {t("hero.ctaImpact")}
        </CtaLink>
      </PageHero>

      <Breadcrumb />

      {/* MISSION — text left, image right (aligned to the section container) */}
      <section className="section bg-white">
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:flex-1">
            <SectionHeading eyebrow={t("mission.eyebrow")} title={t("mission.title")} />
            <p className="mt-4 text-lg text-muted">
              {/* Korean desktop only: force the \n breaks with a desktop-only <br>.
                  Mobile + English keep their natural wrap (no whitespace-pre-line). */}
              {t("mission.body")
                .split("\n")
                .map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && (
                      <>
                        {" "}
                        {locale === "ko" && <br className="hidden lg:inline" />}
                      </>
                    )}
                  </span>
                ))}
            </p>
          </div>
          <div className="lg:flex-1">
            <AftImage
              {...media.aboutGrid3}
              className="aspect-[4/3] w-full rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* YOUTH-LED TEAMS */}
      <section className="section surface-mist">
        <div className="container-aft">
          <SectionHeading eyebrow={t("teams.eyebrow")} title={t("teams.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamKeys.map((k) => (
              <div
                key={k}
                data-reveal
                className="card flex flex-col items-center text-center"
              >
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <AboutIcon name={k} />
                </span>
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
      <section className="section bg-white">
        <div className="container-aft">
          <SectionHeading eyebrow={t("beyond.eyebrow")} title={t("beyond.title")} centered />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {beyondKeys.map((k) => (
              <div
                key={k}
                data-reveal
                className="card flex flex-col items-center text-center"
              >
                <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <AboutIcon name={k} />
                </span>
                <h3 className="font-bold text-ink">{t(`beyond.items.${k}.title`)}</h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`beyond.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>

          {/* Youth books */}
          <div className="mt-14">
            <p className="eyebrow">{t("books.eyebrow")}</p>
            <h3 className="mt-2 text-xl font-bold text-ink">{t("books.title")}</h3>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
              {[media.aboutBook1, media.aboutBook2, media.aboutBook3].map(
                (img, i) => (
                  <div
                    key={i}
                    className="card overflow-hidden !p-0"
                  >
                    <AftImage
                      {...img}
                      className="aspect-[3/4] w-full rounded-none"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section surface-mist">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("values.eyebrow")}
            title={t("values.title")}
            centered
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {valueGroups.map((g) => {
              const items = t.raw(`values.${g}.items`) as string[];
              // Colour-code each card (no icons — the two sections above already
              // use them): coloured title, divider and checks.
              const s = {
                youth: { text: "text-accent", rule: "bg-accent" },
                society: { text: "text-teal", rule: "bg-teal" },
                partners: { text: "text-navy", rule: "bg-navy" },
              }[g];
              return (
                <div
                  key={g}
                  className="card text-center !px-8 !py-10"
                >
                  <h3 className={`text-xl font-bold ${s.text}`}>
                    {t(`values.${g}.title`)}
                  </h3>
                  <div className={`mx-auto mt-3 h-0.5 w-10 rounded-full ${s.rule}`} />
                  <ul className="mt-6 inline-block space-y-3 text-left text-sm text-muted">
                    {items.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <CheckIcon className={`mt-1 h-4 w-4 flex-none ${s.text}`} />
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

// Infographic icons for the youth-led teams + beyond-the-canvas cards. Simple
// 24×24 line icons (stroke = currentColor) so they inherit the badge's teal.
function AboutIcon({ name }: { name: string }) {
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
    // Youth-led teams
    case "media": // 영상·미디어 — video camera
      return (
        <svg {...common}>
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M16 10l6-3v10l-6-3z" />
        </svg>
      );
    case "event": // 이벤트·전시기획 — calendar
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18M8 2v4M16 2v4" />
        </svg>
      );
    case "editing": // 편집·출판 — open book
      return (
        <svg {...common}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case "host": // 청소년 진행자·발표자 — microphone
      return (
        <svg {...common}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8" />
        </svg>
      );
    // Beyond the canvas
    case "publishing": // 출판 — book
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "campaign": // 환경 캠페인 — leaf
      return (
        <svg {...common}>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
          <path d="M2 22c1.5-1.5 3-4 3-7" />
        </svg>
      );
    case "goods": // 굿즈·기부 — shopping bag
      return (
        <svg {...common}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case "performance": // 공연 — music notes
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    default:
      return null;
  }
}
