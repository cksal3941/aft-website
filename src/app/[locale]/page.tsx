import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/nav";
import { CtaLink } from "@/components/ui/CtaLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AftImage } from "@/components/ui/AftImage";
import { media } from "@/config/media";

// Partner logos — drop grayscale-friendly files (svg/png) into public/images/partners/
// and set `logo` to the path. `logo: null` falls back to the text name.
const PARTNERS: { name: string; logo: string | null }[] = [
  { name: "WWF", logo: null },
  { name: "Oceana", logo: null },
  { name: "National Geographic", logo: null },
  { name: "The Body Shop", logo: null },
  { name: "Patagonia Foundation", logo: null },
  { name: "Google.org", logo: "/images/partners/google-org.svg" },
];

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
      {/* HERO — full-bleed background photo + left text overlay */}
      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-navy text-white">
        {media.homeHero.src ? (
          <>
            <AftImage
              src={media.homeHero.src}
              alt={media.homeHero.alt}
              priority
              sizes="100vw"
              className="absolute inset-0 -z-10 h-full w-full rounded-none"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
          </>
        ) : (
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-deep via-navy to-navy-soft" />
        )}
        <div className="container-aft py-32 lg:py-40">
          <div className="max-w-2xl">
            <span className="mb-6 block h-1 w-16 bg-accent" />
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-7 max-w-xl text-lg text-white/80 lg:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href={routes.join} variant="primary" event="join_click">
                {t("hero.ctaJoin")}
              </CtaLink>
              <CtaLink href={routes.projects} variant="secondary">
                {t("hero.ctaProjects")}
              </CtaLink>
              <CtaLink href={routes.partners} variant="secondary">
                {t("hero.ctaPartner")}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — text left + image grid right */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="lg:flex-1">
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <p className="mt-4 text-2xl font-bold leading-snug text-ink sm:text-3xl">
              {t("about.lead")}
            </p>
            <p className="mt-5 text-lg text-muted">{t("about.body")}</p>
            <div className="mt-8">
              <CtaLink href={routes.about} variant="text">
                {t("about.cta")}
              </CtaLink>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 lg:flex lg:flex-none">
            <AftImage {...media.aboutGrid1} className="aspect-[3/4] w-full lg:w-[211px]" />
            <AftImage {...media.aboutGrid2} className="aspect-[3/4] w-full lg:w-[211px]" />
            <AftImage {...media.aboutGrid3} className="aspect-[3/4] w-full lg:w-[211px]" />
          </div>
        </div>
      </section>

      {/* OUR IMPACT — compact stats strip */}
      <section className="border-y border-line bg-surface py-14">
        <div className="container-aft flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="max-w-[6rem] text-2xl font-extrabold uppercase leading-[1.05] tracking-wide text-teal">
            {t("impact.eyebrow")}
          </p>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:flex md:gap-[42px]">
            {(["youth", "donated", "goods"] as const).map((k, i) => (
              <div key={k} className="flex items-center gap-3">
                <span className="mr-[5px] flex-none text-teal">
                  <StatIcon i={i} />
                </span>
                <div>
                  <div className="text-3xl font-extrabold text-teal">
                    {t(`impact.stats.${k}.value`)}
                  </div>
                  <div className="max-w-[5.5rem] text-base font-semibold uppercase leading-[1.1] tracking-wide text-navy">
                    {t(`impact.stats.${k}.label`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="hidden flex-none gap-3 lg:flex">
            <AftImage {...media.impactImg1} className="h-36 w-[165px]" />
            <AftImage {...media.impactImg2} className="h-36 w-[165px]" />
            <AftImage {...media.impactImg3} className="h-36 w-[165px]" />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT — collage within 1400px container */}
      <section className="bg-white lg:pt-[30px]">
        <div className="container-aft flex flex-col lg:flex-row">
          {/* LEFT — ocean image, flush to left edge, ~20px top space from section */}
          <AftImage
            {...media.homeFeatured}
            label="Our Ocean, Our Tomorrow"
            className="h-72 w-full lg:h-[500px] lg:w-[410px] lg:shrink-0"
          />

          {/* RIGHT — text + wide image on top, thumbnails below the text */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* TOP: text (left) + wide gallery image (shorter, top+bottom space, flush right) */}
            <div className="flex flex-col lg:flex-row lg:items-start">
              <div className="flex flex-col justify-center px-8 py-10 lg:w-[450px] lg:shrink-0 lg:pl-[38px] lg:pr-2 lg:py-8">
                <p className="eyebrow">{t("featured.eyebrow")}</p>
                <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
                  {(() => {
                    const title = t("featured.title");
                    const i = title.indexOf(", ");
                    return i === -1 ? (
                      title
                    ) : (
                      <>
                        {title.slice(0, i + 1)}
                        <br />
                        {title.slice(i + 2)}
                      </>
                    );
                  })()}
                </h2>
                <p className="mt-4 text-lg text-muted">{t("featured.body")}</p>
                <div className="mt-6">
                  <CtaLink
                    href={`${routes.projects}/our-ocean-our-tomorrow`}
                    variant="text"
                    event="project_view"
                  >
                    {t("featured.cta")}
                  </CtaLink>
                </div>
              </div>
              <AftImage
                {...media.featWide}
                className="h-64 w-full lg:mb-5 lg:h-[300px] lg:min-w-0 lg:flex-1"
              />
            </div>

            {/* BOTTOM: thumbnails — pinned to the very bottom, fit within container */}
            <div className="grid grid-cols-4 gap-[10px] px-8 lg:mt-auto lg:pl-[38px] lg:pr-0">
              <AftImage {...media.featThumb1} tone="ocean" className="h-[174px] w-full" />
              <AftImage {...media.featThumb2} className="h-[174px] w-full" />
              <AftImage {...media.featThumb3} className="h-[174px] w-full" />
              <AftImage {...media.featThumb4} className="h-[174px] w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO — 4 photo-top cards */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("whatWeDo.eyebrow")} title="Create · Connect · Act · Change" centered />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(["create", "connect", "act", "change"] as const).map((k, i) => {
              const slot = [
                media.wwdCreate,
                media.wwdConnect,
                media.wwdAct,
                media.wwdChange,
              ][i];
              return (
                <div key={k} className="flex h-full flex-col bg-white">
                  <AftImage {...slot} className="aspect-[4/3] w-full" />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold uppercase text-ink">
                      {t(`whatWeDo.items.${k}.title`)}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {t(`whatWeDo.items.${k}.body`)}
                    </p>
                    <div className="mt-auto pt-4">
                      <CtaLink href={routes.about} variant="text">
                        {t(`whatWeDo.items.${k}.cta`)}
                      </CtaLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AFT YOUTH — text left + image right */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:flex-1">
            <SectionHeading
              eyebrow={t("youthCommunity.eyebrow")}
              title={(() => {
                const title = t("youthCommunity.title");
                const i = title.indexOf(" of ");
                return i === -1 ? (
                  title
                ) : (
                  <>
                    {title.slice(0, i)}
                    <br />
                    {title.slice(i + 1)}
                  </>
                );
              })()}
            />
            <p className="mt-5 text-lg text-muted">{t("youthCommunity.body")}</p>
            <div className="mt-8">
              <CtaLink href={routes.join} variant="primary" event="join_click">
                {t("youthCommunity.cta")}
              </CtaLink>
            </div>
          </div>
          <AftImage
            {...media.homeCommunity}
            className="aspect-[4/3] w-full lg:aspect-auto lg:h-[360px] lg:w-[846px] lg:shrink-0"
          />
        </div>
      </section>

      {/* YOUTH CREATIVE LAB — big image left · text · two stacked images right */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
          {/* LEFT big image */}
          <AftImage
            {...media.homeLab}
            className="aspect-[4/3] w-full lg:aspect-auto lg:h-[400px] lg:w-[38%] lg:shrink-0"
          />
          {/* MIDDLE text */}
          <div className="lg:flex-1">
            <SectionHeading
              eyebrow={t("youthLab.eyebrow")}
              title={t("youthLab.title")}
            />
            <p className="mt-5 text-lg text-muted">{t("youthLab.body")}</p>
            <div className="mt-8">
              <CtaLink href={routes.projects} variant="text">
                {t("youthLab.cta")}
              </CtaLink>
            </div>
          </div>
          {/* RIGHT two images stacked vertically */}
          <div className="grid grid-cols-2 gap-4 lg:flex lg:w-[280px] lg:shrink-0 lg:flex-col">
            <AftImage
              {...media.labImg1}
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-[192px]"
            />
            <AftImage
              {...media.labImg2}
              className="aspect-[4/3] w-full lg:aspect-auto lg:h-[192px]"
            />
          </div>
        </div>
      </section>

      {/* YOUTH STORIES — testimonial cards */}
      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <SectionHeading eyebrow={t("stories.eyebrow")} title="" centered />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(["s1", "s2", "s3"] as const).map((k, i) => {
              const slot = [media.homeStory1, media.homeStory2, media.homeStory3][i];
              return (
                <div
                  key={k}
                  className="flex overflow-hidden rounded-md border border-line bg-white shadow-sm"
                >
                  {/* left 50% image */}
                  <AftImage
                    {...slot}
                    className="w-1/2 shrink-0 self-stretch"
                  />
                  {/* right 50% text */}
                  <div className="w-1/2 p-6">
                    <h3 className="font-bold text-ink">
                      {t(`stories.items.${k}.name`)}
                    </h3>
                    <p className="text-sm text-accent-hover">
                      {t(`stories.items.${k}.role`)}
                    </p>
                    <blockquote className="mt-3 text-sm text-muted">
                      “{t(`stories.items.${k}.quote`)}”
                    </blockquote>
                    <div className="mt-4">
                      <CtaLink href={routes.stories} variant="text">
                        {t("stories.readStory")}
                      </CtaLink>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SUPPORT — background image band with text + icon buttons overlaid */}
      <section className="relative isolate flex items-center overflow-hidden bg-navy py-16 text-white lg:min-h-[440px]">
        {media.homeSupport.src && (
          <>
            <AftImage
              src={media.homeSupport.src}
              alt={media.homeSupport.alt}
              sizes="100vw"
              className="absolute inset-0 -z-10 h-full w-full rounded-none"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
          </>
        )}
        <div className="container-aft">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              {t("support.title")}
            </h2>
            <p className="mt-4 max-w-lg text-white/80">{t("support.body")}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href={routes.support} variant="primary" event="donate_start">
                <HeartIcon />
                {t("support.ctaDonate")}
              </CtaLink>
              <CtaLink href={routes.sponsor} variant="secondary">
                <StarIcon />
                {t("support.ctaSponsor")}
              </CtaLink>
              <CtaLink href={routes.venue} variant="secondary">
                <PinIcon />
                {t("support.ctaVenue")}
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PARTNERS — logo strip */}
      <section className="bg-white py-14">
        <div className="container-aft flex flex-col items-center gap-8 md:flex-row md:gap-12">
          <p className="eyebrow whitespace-nowrap">{t("partners.eyebrow")}</p>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between">
            {PARTNERS.map((p) =>
              p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  className="h-8 w-auto object-contain opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <span
                  key={p.name}
                  className="text-lg font-bold tracking-tight text-muted/60 grayscale"
                >
                  {p.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* LATEST NEWS + newsletter */}
      <section className="bg-surface py-24 md:py-28">
        <div className="container-aft">
          <SectionHeading eyebrow={t("news.eyebrow")} title="" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="grid gap-6 sm:grid-cols-3">
              {(["n1", "n2", "n3"] as const).map((k, i) => {
                const slot = [media.news1, media.news2, media.news3][i];
                return (
                  <article
                    key={k}
                    className="overflow-hidden rounded-xl border border-line bg-white shadow-sm"
                  >
                    <AftImage {...slot} className="aspect-[16/10] w-full rounded-none" />
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent-hover">
                        {t(`news.items.${k}.date`)}
                      </p>
                      <h3 className="mt-2 font-bold leading-snug text-ink">
                        {t(`news.items.${k}.title`)}
                      </h3>
                      <div className="mt-3">
                        <CtaLink href={routes.stories} variant="text">
                          {t("news.readMore")}
                        </CtaLink>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Newsletter */}
            <div className="flex flex-col justify-center rounded-2xl bg-navy p-8 text-white">
              <h3 className="text-xl font-bold">{t("news.newsletter.title")}</h3>
              <p className="mt-3 text-sm text-white/70">
                {t("news.newsletter.body")}
              </p>
              <form className="mt-5 flex flex-col gap-3 sm:flex-row" action="#">
                <input
                  type="email"
                  placeholder={t("news.newsletter.placeholder")}
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
                />
                <button type="button" className="btn-primary whitespace-nowrap">
                  {t("news.newsletter.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function StatIcon({ i }: { i: number }) {
  const common = {
    width: 48,
    height: 48,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (i === 0)
    // group of people
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  if (i === 1)
    // heart
    return (
      <svg viewBox="0 0 24 24" {...common} aria-hidden>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  // shopping bag
  return (
    <svg viewBox="0 0 24 24" {...common} aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
