import { use } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AftImage } from "@/components/ui/AftImage";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ProjectActions } from "@/components/projects/ProjectActions";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  getProject,
  getProjectDetail,
  getProjects,
  getProjectSlugs,
} from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  setRequestLocale(locale);
  const loc = locale as Locale;

  const project = getProject(slug, loc);
  if (!project) notFound();

  const detail = getProjectDetail(slug, loc);
  const related = getProjects(loc).filter((p) => p.slug !== slug);

  return <DetailView project={project} detail={detail} related={related} />;
}

function DetailView({
  project,
  detail,
  related,
}: {
  project: NonNullable<ReturnType<typeof getProject>>;
  detail: ReturnType<typeof getProjectDetail>;
  related: ReturnType<typeof getProjects>;
}) {
  const t = useTranslations("projectDetail");
  const tStatus = useTranslations("projects.status");

  return (
    <>
      {/* HERO BANNER — clean cover image, sitting behind the transparent header
          (kept separate from the title) */}
      <section className="relative -mt-20 bg-navy">
        <AftImage
          src={project.cover}
          alt={project.title}
          tone={project.coverTone}
          priority
          sizes="100vw"
          className="h-[46vh] min-h-[360px] w-full rounded-none md:h-[56vh]"
        />
        {/* Top gradient keeps the transparent header legible over the photo */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent"
          aria-hidden
        />
      </section>

      {/* TITLE — separate block, same centered type scale as the other sub-page heroes */}
      <section className="bg-white">
        <div className="container-aft py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            {/* Status label sits above the title */}
            <div className="mb-4">
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-base font-light leading-snug text-muted sm:text-lg">
              {project.oneLiner}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ProjectActions status={project.status} slug={project.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT FACTS */}
      <section className="border-b border-line bg-white py-10">
        <div className="container-aft grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-3 lg:gap-6">
          <Fact icon="status" label={t("facts.status")} value={tStatus(project.status)} />
          <Fact icon="duration" label={t("facts.duration")} value={detail?.facts.duration ?? "—"} />
          <Fact icon="location" label={t("facts.location")} value={detail?.facts.location ?? project.city} />
          <Fact icon="audience" label={t("facts.audience")} value={detail?.facts.audience ?? project.ageRange} />
          <Fact icon="cost" label={t("facts.cost")} value={project.cost ?? t("facts.free")} />
          {project.deadline && (
            <Fact icon="deadline" label={t("facts.deadline")} value={project.deadline} />
          )}
        </div>
      </section>

      {/* COMPETITION OVERVIEW — centered to echo the hero/facts rhythm above:
          centered heading + a centered lead intro, then the steps as a 3-column
          process row (mirrors the 3-column facts bar). */}
      {project.overview && (
        <section className="bg-white section">
          <div className="container-aft">
            <SectionHeading title={t("sections.overview")} centered />
            <div className="mx-auto mt-6 max-w-3xl space-y-4 text-center text-base leading-relaxed text-muted sm:text-lg">
              {project.overview.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {project.howToApply && project.howToApply.length > 0 && (
              <div className="mt-28 md:mt-40">
                <h3 className="text-center text-xl font-bold text-ink sm:text-2xl">
                  {t("sections.howToApply")}
                </h3>
                <ol className="mx-auto mt-10 grid max-w-5xl gap-10 sm:grid-cols-3">
                  {project.howToApply.map((step, i) => (
                    <li key={i} className="flex flex-col items-center text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{step}</p>
                    </li>
                  ))}
                </ol>
                {/* Contextual CTA — repeated here (also in the hero) because
                    this is the peak-intent moment, right after the reader has
                    seen exactly how to take part. */}
                <div className="mt-12 flex justify-center md:mt-14">
                  <ProjectActions status={project.status} slug={project.slug} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {detail && (
        <>
          {/* THE CHALLENGE — two-column editorial layout (heading left, body
              right) so the block fills the full width and stays balanced with
              the wider sections below, instead of a narrow left-aligned column. */}
          <section className="bg-white section">
            <div className="container-aft grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <SectionHeading
                  eyebrow="01"
                  title={t("sections.challenge")}
                  centerOnMobile
                />
              </div>
              <div className="md:col-span-8">
                <p className="text-base leading-relaxed text-muted md:text-xl">
                  {detail.challenge}
                </p>
              </div>
            </div>
          </section>

          {/* YOUNG IDEAS */}
          <section className="bg-surface section">
            <div className="container-aft grid gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-4">
                <SectionHeading
                  eyebrow="02"
                  title={t("sections.youngIdeas")}
                  centerOnMobile
                />
              </div>
              <ul className="space-y-4 md:col-span-8">
                {detail.youngIdeas.map((idea, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-base text-muted md:text-lg">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CREATIVE ACTION */}
          <section className="bg-white section">
            <div className="container-aft">
              <SectionHeading
                eyebrow="03"
                title={t("sections.creativeAction")}
                centerOnMobile
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {detail.creativeAction.map((item, i) => (
                  <div
                    key={i}
                    className="card flex items-center gap-4"
                  >
                    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-teal/10 text-teal">
                      <ActionIcon index={i} />
                    </span>
                    <span className="font-semibold text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section className="bg-surface section">
            <div className="container-aft">
              <SectionHeading
                eyebrow="04"
                title={t("sections.gallery")}
                centerOnMobile
              />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
                {detail.gallery.length > 0
                  ? detail.gallery.map((g, i) => (
                      <figure
                        key={i}
                        className="card !p-0 overflow-hidden"
                      >
                        <AftImage
                          src={g.src}
                          alt={g.alt}
                          className="aspect-[4/3] w-full rounded-none"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </figure>
                    ))
                  : Array.from({ length: detail.galleryCount }).map((_, i) => (
                      <AftImage
                        key={i}
                        className="aspect-[4/3] w-full rounded-lg"
                        tone={project.coverTone}
                      />
                    ))}
              </div>
            </div>
          </section>

          {/* THE IMPACT */}
          <section id="impact" className="scroll-mt-20 bg-white section">
            <div className="container-aft">
              <SectionHeading
                eyebrow="05"
                title={t("sections.impact")}
                centerOnMobile
              />
              <p className="mt-4 text-center text-base text-muted sm:text-left sm:text-[20px]">
                {detail.impactSummary}
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {detail.impactStats.map((s, i) => (
                  <div key={i} className="text-center">
                    <CountUp
                      value={s.value}
                      className="text-3xl font-extrabold text-teal sm:text-4xl"
                    />
                    <div className="mt-1 text-sm font-semibold uppercase tracking-wide text-teal">
                      {s.label}
                    </div>
                    {s.note && (
                      <div className="mt-1 text-xs text-slate-500">{s.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* RELATED PROJECTS — kept as a secondary footer block so it doesn't
          compete with the project's own content: tighter padding, smaller
          heading, and the card cluster capped in width. */}
      {related.length > 0 && (
        <section id="related" className="scroll-mt-20 bg-white section-sm">
          <div className="container-aft">
            <h2 className="text-center text-xl font-bold tracking-tight text-ink sm:text-left sm:text-2xl">
              {t("sections.related")}
            </h2>
            <div className="mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* Icon + label (small, light gray) + value (larger, dark, bold):
          colour + weight + size + icon give a clear label/value hierarchy. */}
      <span className="mb-2 text-teal">
        <FactIcon name={icon} />
      </span>
      <dt className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1.5 text-lg font-bold text-ink">{value}</dd>
    </div>
  );
}

// Line icons for the project facts. Feather-style, stroke = currentColor so the
// wrapper's colour (teal) applies.
function FactIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 22,
    height: 22,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "status": // flag
      return (
        <svg {...common}>
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
      );
    case "duration": // calendar
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18M8 2v4M16 2v4" />
        </svg>
      );
    case "location": // map pin
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "audience": // people
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "cost": // price tag
      return (
        <svg {...common}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      );
    case "deadline": // clock
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    default:
      return null;
  }
}

// Line icons for the Creative Action cards. Keyed by position to match the
// standard creative-action sequence: exhibition · publishing · campaign ·
// film · performance · goods. Extra items fall back to a generic spark.
function ActionIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (index) {
    case 0: // exhibition & space — framed picture
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 15l5-5 4 4 3-3 6 6" />
          <circle cx="8.5" cy="8.5" r="1.5" />
        </svg>
      );
    case 1: // publishing — open book
      return (
        <svg {...common}>
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      );
    case 2: // campaign — megaphone
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6L7 10H4a1 1 0 0 0-1 1z" />
          <path d="M18 8a4 4 0 0 1 0 8" />
        </svg>
      );
    case 3: // film — video camera
      return (
        <svg {...common}>
          <rect x="2" y="6" width="14" height="12" rx="2" />
          <path d="M16 10l6-3v10l-6-3z" />
        </svg>
      );
    case 4: // performance — music notes
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case 5: // goods & donation — shopping bag
      return (
        <svg {...common}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    default: // spark
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
        </svg>
      );
  }
}
