import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/nav";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
import { media } from "@/config/media";
import { HeroVideo } from "@/components/home/HeroVideo";
import { DottedWorldMap } from "@/components/home/DottedWorldMap";
import { StoryCarousel } from "@/components/home/StoryCarousel";

export default function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");

  return (
    <>
      {/* 01 · HERO — full-bleed activity video (runs under the transparent header) */}
      <section className="relative isolate -mt-20 flex min-h-[720px] items-center overflow-hidden bg-navy text-white">
        <HeroVideo />
        {/* Decorative oversized AFT watermark, bottom-right */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-6 right-2 select-none text-[24vw] font-extrabold leading-none tracking-[-0.03em] text-white/10 lg:right-6 lg:text-[16rem]"
        >
          AFT
        </span>
        <div className="container-aft py-32 lg:py-40">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {t("hero.title1")}
              <br />
              {t("hero.title2")}
            </h1>
            <p className="mt-7 mx-auto max-w-xl whitespace-pre-line text-lg font-light text-white/85 lg:mx-0 lg:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Link
                href={routes.about}
                className="inline-flex items-center justify-center rounded-sm bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-white/90"
              >
                {t("hero.ctaDiscover")}
              </Link>
              <Link
                href={routes.join}
                className="inline-flex items-center justify-center rounded-sm border border-white/50 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                {t("hero.ctaJoin")}
              </Link>
            </div>
            <p className="mt-10 text-sm font-light tracking-wide text-white">
              {t("hero.tagline")}
            </p>
          </div>
        </div>
      </section>

      {/* 02 · WHO WE ARE — text left · pillars (× separated) + image row right */}
      <section id="who" className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* LEFT — heading + body + CTA */}
          <div className="lg:w-[35%] lg:shrink-0">
            <p className="eyebrow text-center lg:text-left">{t("who.eyebrow")}</p>
            <h2 className="mt-4 whitespace-pre-line text-center text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-left">
              {t("who.title")}
            </h2>
            <p className="mt-6 whitespace-pre-line text-muted">{t("who.body1")}</p>
            <p className="mt-4 text-balance text-muted">{t("who.body2")}</p>
            <div className="mt-6">
              <CtaLink href={routes.about} variant="text">
                {t("who.cta")}
              </CtaLink>
            </div>
          </div>

          {/* RIGHT — pillars row + 4-image row */}
          <div className="lg:flex-1">
            <div className="mt-[30px] grid grid-cols-2 gap-x-10 gap-y-8">
              {(["art", "youth", "environment", "social"] as const).map(
                (k, i) => (
                  <div key={k} className="flex items-start gap-3">
                    <span className="shrink-0 text-teal">
                      <PillarIcon i={i} />
                    </span>
                    <div className="max-w-[300px]">
                      <h3 className="text-base font-bold uppercase tracking-wide text-ink">
                        {t(`who.pillars.${k}.label`)}
                      </h3>
                      <p className="mt-2 whitespace-pre-line text-sm text-muted">
                        {t(`who.pillars.${k}.blurb`)}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-[60px] grid grid-cols-2 gap-4 sm:grid-cols-4">
              <AftImage {...media.aboutGrid1} className="h-[168px] w-full" />
              <AftImage {...media.aboutGrid2} className="h-[168px] w-full" />
              <AftImage {...media.aboutGrid3} className="h-[168px] w-full" />
              <AftImage {...media.aboutGrid4} className="h-[168px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 03 · OUR IMPACT IN 2026 — horizontal stat strip */}
      <section
        id="impact"
        className="relative overflow-hidden border-y border-[#e2e8ef] bg-[#f2f5f9] py-14"
      >
        <div className="container-aft relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
          <p className="mx-auto max-w-[7rem] whitespace-pre-line text-center text-xl font-extrabold uppercase leading-[1.05] tracking-wide text-[#3E7035] lg:mx-0 lg:text-left">
            {t("impact.title")}
          </p>
          <ol className="grid grid-cols-2 gap-x-[6px] gap-y-[30px] sm:flex sm:flex-1 sm:flex-wrap sm:items-center sm:gap-x-[44px] sm:gap-y-[22px] lg:pr-[280px]">
            {(["creators", "goods", "donated", "project"] as const).map(
              (k, i, arr) => {
                const color = [
                  "text-navy",
                  "text-[#57a83f]",
                  "text-teal",
                  "text-[#6741d9]",
                ][i];
                return (
                  <li key={k} className="flex items-center justify-center gap-4 sm:justify-start">
                    <div
                      className={`flex min-w-[90px] flex-col items-center text-center ${color}`}
                    >
                      <div className="text-2xl font-extrabold sm:text-3xl">
                        {t(`impact.stats.${k}.value`)}
                      </div>
                      <div className="mt-[14px] max-w-[145px] text-[14px] font-semibold uppercase leading-[1.15] tracking-wide">
                        {t(`impact.stats.${k}.label`)}
                      </div>
                      <span className="mt-3 block">
                        <StatIcon i={i} small />
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <span aria-hidden className="hidden text-line lg:block">
                        →
                      </span>
                    )}
                  </li>
                );
              }
            )}
          </ol>
          {/* Full-height image; bleeds past the 1400px container to the right
              viewport edge (no cream gap). Width grows by the same amount so the
              left start position stays put. */}
          <div className="absolute right-0 hidden lg:block lg:-top-14 lg:right-[calc(50%_-_50vw)] lg:h-[calc(100%+112px)] lg:w-[calc(340px_+_50vw_-_50%)]">
            <AftImage
              {...media.impactImg1}
              className="h-full w-full rounded-none"
            />
            {/* Left-edge fade into the section background so the photo blends in */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f2f5f9] via-[#f2f5f9]/60 via-30% to-transparent to-70%" />
          </div>
        </div>
      </section>

      {/* 04 · WHERE OUR STORY BEGAN + journey (Seoul · 2026) */}
      <section id="story" className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* LEFT — intro + view all photos */}
          <div className="lg:w-[24%] lg:shrink-0">
            <h2 className="whitespace-pre-line text-center text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-3xl lg:text-left">
              {t("story.eyebrow")}
            </h2>
            <p className="mt-3 text-base font-bold uppercase tracking-[0.2em] text-accent-hover">
              {t("story.place")}
            </p>
            <p className="mt-4 text-base text-muted">{t("story.tagline")}</p>
            <div className="mt-6">
              <CtaLink
                href={`${routes.projects}/our-ocean-our-tomorrow`}
                variant="text"
                event="project_view"
              >
                {t("story.viewAll")}
              </CtaLink>
            </div>
          </div>

          {/* RIGHT — auto-sliding carousel: each photo bound to its journey step */}
          <div className="lg:flex-1">
            <StoryCarousel
              slides={(
                [
                  { k: "create", img: media.storyShot1 },
                  { k: "exhibit", img: media.storyShot2 },
                  { k: "share", img: media.storyShot3 },
                  { k: "donate", img: media.storyShot4 },
                  { k: "act", img: media.storyShot5 },
                ] as const
              ).map(({ k, img }) => ({
                ...img,
                no: t(`journey.steps.${k}.no`),
                title: t(`journey.steps.${k}.title`),
                body: t(`journey.steps.${k}.body`),
              }))}
            />
          </div>
        </div>
      </section>

      {/* 05 · CREATIVITY BECAME REAL IMPACT — AFT × WWF (light) */}
      <section id="donation" className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* LEFT — headline + amount + watch */}
          <div className="lg:w-[30%] lg:shrink-0">
            <h2 className="whitespace-pre-line text-center text-2xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-3xl lg:text-left">
              {t("donation.title")}
            </h2>
            <div className="mt-6 text-4xl font-extrabold text-teal sm:text-5xl">
              {t("donation.amount")}
            </div>
            <p className="mt-2.5 text-2xl font-semibold uppercase tracking-wide text-teal">
              {t("donation.amountLabel")}
            </p>
            <p className="mt-4 text-sm text-muted">{t("donation.ceremony")}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white">
              <PlayIcon />
              {t("donation.watch")}
            </p>
          </div>

          {/* RIGHT — ceremony image + captioned follow-ups */}
          <div className="lg:flex-1">
            <AftImage
              {...media.wwfCeremony}
              label="AFT × WWF · ₩1,000,000"
              className="aspect-[16/7] w-full"
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {(t.raw("donation.followup") as string[]).map((c, i) => {
                const slot = [
                  media.wwfFollow1,
                  media.wwfFollow2,
                  media.wwfFollow3,
                ][i];
                return (
                  <figure key={c}>
                    <AftImage {...slot} className="aspect-[4/3] w-full" />
                    <figcaption className="mt-2 text-xs font-bold uppercase leading-tight tracking-wide text-navy">
                      {c}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted/70">
              {t("donation.note")}
            </p>
          </div>
        </div>
      </section>

      {/* 06 · THIS IS ONLY THE BEGINNING → FROM SEOUL TO THE WORLD */}
      <section id="global" className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <h2 className="whitespace-pre-line text-center text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl lg:text-left">
            {t("beginning.title")}
          </h2>
          <div className="mt-4 grid items-start gap-10 lg:grid-cols-[0.85fr_2.3fr_0.85fr]">
            <p className="max-w-[320px] text-muted">{t("global.body")}</p>
            <DottedWorldMap seoulLabel={t("global.seoul")} />
            <div>
              <h3 className="whitespace-pre-line text-center text-2xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-3xl lg:text-left">
                {t("global.title")}
              </h3>
              <p className="mt-4 text-muted">{t("global.body2")}</p>
              <div className="mt-6">
                <CtaLink href={routes.globalNetwork} variant="primary">
                  {t("global.cta")} →
                </CtaLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 · JOIN THE GLOBAL COMMUNITY — overlay photo cards */}
      <section id="join-global" className="bg-[#f8fafc] py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("joinGlobal.eyebrow")}
            title={t("joinGlobal.title")}
            centered
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {(
              [
                { key: "youth", href: routes.join, event: "join_click", slot: media.joinYouth },
                { key: "advisors", href: routes.advisor, event: undefined, slot: media.joinAdvisors },
                { key: "partners", href: routes.partners, event: undefined, slot: media.joinPartners },
              ] as const
            ).map(({ key, href, event, slot }) => (
              <div
                key={key}
                className="relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-sm"
              >
                <AftImage
                  {...slot}
                  className="absolute inset-x-0 bottom-0 h-[135%] w-full rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-transparent" />
                <div className="relative p-7 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                    {t(`joinGlobal.cards.${key}.sub`)}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold">
                    {t(`joinGlobal.cards.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    {t(`joinGlobal.cards.${key}.body`)}
                  </p>
                  <div className="mt-5">
                    <CtaLink href={href} variant="secondary" event={event}>
                      {t(`joinGlobal.cards.${key}.cta`)} →
                    </CtaLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 · SUPPORT AFT — light band, text left + earth/DONATE right */}
      <section className="overflow-hidden border-t border-line bg-white py-10 md:py-12 lg:py-0">
        {/* Text stays inside the 1400px container (aligned with other sections);
            only the image column bleeds out to the right viewport edge (right:0). */}
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-8">
          {/* LEFT — heading + body + support links */}
          <div className="lg:w-[44%] lg:shrink-0">
            <p className="eyebrow text-center lg:text-left">{t("support.eyebrow")}</p>
            <h2 className="mt-3 whitespace-pre-line text-center text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-left">
              {t("support.title")}
            </h2>
            <p className="mt-4 max-w-lg whitespace-pre-line text-muted">
              {t("support.body")}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 sm:gap-x-1">
              {(["youth", "exhibitions", "environment", "publishing"] as const).map(
                (k, i) => (
                  <div
                    key={k}
                    className="flex h-full flex-col items-center gap-2 text-center"
                  >
                    <span className="whitespace-pre-line text-sm font-semibold leading-tight text-ink">
                      {t(`support.areas.${k}`)}
                    </span>
                    <span className="mt-auto text-teal">
                      <SupportIcon i={i} />
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* RIGHT — full-bleed image with DONATE overlay, right-aligned
              (caption on top, button below) */}
          <div className="relative lg:flex-1 lg:mr-[calc(50%-50vw)]">
            <AftImage
              {...media.homeSupport}
              className="aspect-[5/2] w-full"
              objectPosition="100% 50%"
            />
            {/* White gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
            {/* CTA — right-aligned, lifted to sit level with the left icon row.
                bottom-[28%] tracks the icon height proportionally as the image scales.
                Right padding keeps it inside the 1400px container (668px = half of
                container content width: 1400 − 2×32px lg padding). */}
            <div className="absolute inset-x-0 bottom-[17%] flex flex-col items-start gap-3 px-8 text-left lg:items-end lg:pr-[max(2rem,calc(50vw_-_668px))] lg:text-right">
              <p className="text-lg font-bold text-muted lg:text-xl">
                {t("support.caption")}
              </p>
              <Link
                href={routes.support}
                className="inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-accent-hover"
              >
                {t("support.ctaDonate")} →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function SupportIcon({ i }: { i: number }) {
  const common = {
    width: 26,
    height: 26,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (i === 0)
    // Youth Projects — people
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (i === 1)
    // Exhibitions — framed image
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    );
  if (i === 2)
    // Environmental Action — leaf
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    );
  // Publishing & Creative Programs — book
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function PillarIcon({ i }: { i: number }) {
  const common = {
    width: 32,
    height: 32,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (i === 0)
    // Art — palette
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.5-.2-.9-.5-1.2-.3-.4-.5-.8-.5-1.2 0-.9.7-1.5 1.6-1.5H15a5 5 0 0 0 5-5c0-3.9-3.6-6.5-8-6.5z" />
        <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (i === 1)
    // Youth — people
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (i === 2)
    // Environment — leaf
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    );
  // Social Impact — globe
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20z" />
    </svg>
  );
}

function StatIcon({ i, small = false }: { i: number; small?: boolean }) {
  const common = {
    width: small ? 28 : 48,
    height: small ? 28 : 48,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (i === 0)
    // Young Creators — group of people
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (i === 1)
    // Goods Sold — shopping bag
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    );
  if (i === 2)
    // Donated for Nature — heart
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  // Youth-Led Impact Project — target
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
