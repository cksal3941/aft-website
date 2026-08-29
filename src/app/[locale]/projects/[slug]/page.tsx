import { use } from "react";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AftImage } from "@/components/ui/AftImage";
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
      {/* HERO */}
      <section className="bg-navy text-white">
        <div className="container-aft grid gap-10 py-24 md:py-32 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mb-4">
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/75">
              {project.oneLiner}
            </p>
            <ProjectActions status={project.status} slug={project.slug} />
          </div>
          <AftImage
            src={project.cover}
            alt={project.title}
            label={project.title}
            tone={project.coverTone}
            className="aspect-[16/10] w-full"
            priority
          />
        </div>
      </section>

      {/* PROJECT FACTS */}
      <section className="border-b border-line bg-white py-10">
        <div className="container-aft grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label={t("facts.status")} value={tStatus(project.status)} />
          <Fact label={t("facts.duration")} value={detail?.facts.duration ?? "—"} />
          <Fact label={t("facts.location")} value={detail?.facts.location ?? project.city} />
          <Fact label={t("facts.audience")} value={detail?.facts.audience ?? project.ageRange} />
        </div>
      </section>

      {detail && (
        <>
          {/* THE CHALLENGE */}
          <section className="bg-white py-24 md:py-32">
            <div className="container-aft max-w-3xl">
              <SectionHeading eyebrow="01" title={t("sections.challenge")} />
              <p className="mt-4 text-lg text-muted">{detail.challenge}</p>
            </div>
          </section>

          {/* YOUNG IDEAS */}
          <section className="bg-surface py-24 md:py-32">
            <div className="container-aft max-w-3xl">
              <SectionHeading eyebrow="02" title={t("sections.youngIdeas")} />
              <ul className="mt-6 space-y-3">
                {detail.youngIdeas.map((idea, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-xs font-bold text-ink">
                      {i + 1}
                    </span>
                    <span className="text-muted">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CREATIVE ACTION */}
          <section className="bg-white py-24 md:py-32">
            <div className="container-aft">
              <SectionHeading eyebrow="03" title={t("sections.creativeAction")} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {detail.creativeAction.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-line bg-white p-5 text-sm font-semibold text-ink"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section className="bg-surface py-24 md:py-32">
            <div className="container-aft">
              <SectionHeading eyebrow="04" title={t("sections.gallery")} />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: detail.galleryCount }).map((_, i) => (
                  <AftImage
                    key={i}
                    className="aspect-[4/3] w-full"
                    tone={project.coverTone}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* THE IMPACT */}
          <section id="impact" className="scroll-mt-20 bg-navy py-24 md:py-32 text-white">
            <div className="container-aft">
              <SectionHeading eyebrow="05" title={t("sections.impact")} />
              <p className="mt-4 max-w-2xl text-white/75">{detail.impactSummary}</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {detail.impactStats.map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-extrabold text-accent">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm font-semibold uppercase tracking-wide text-white/80">
                      {s.label}
                    </div>
                    {s.note && (
                      <div className="mt-1 text-xs text-white/50">{s.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* RELATED PROJECTS */}
      {related.length > 0 && (
        <section id="related" className="scroll-mt-20 bg-white py-24 md:py-32">
          <div className="container-aft">
            <SectionHeading title={t("sections.related")} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-ink">{value}</dd>
    </div>
  );
}
