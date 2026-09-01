"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AftImage } from "@/components/ui/AftImage";
import { StatusBadge } from "./StatusBadge";
import { routes } from "@/config/nav";
import { track } from "@/lib/analytics";
import type { LocalizedProject } from "@/content/projects";

// Card CTA per status maps to 기획서 §4.1 / §4.2.
export function ProjectCard({ project }: { project: LocalizedProject }) {
  const t = useTranslations("projects.card");
  const href = `${routes.projects}/${project.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        href={href}
        className="relative block"
        onClick={() => track("project_view", { slug: project.slug })}
      >
        <AftImage
          src={project.cover}
          alt={project.title}
          label={project.title}
          tone={project.coverTone}
          className="aspect-[16/10] w-full rounded-none"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-hover">
          {project.field}
        </p>
        <h3 className="mt-1 text-lg font-bold text-ink">
          <Link href={href} onClick={() => track("project_view", { slug: project.slug })}>
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.oneLiner}</p>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted">
          <div>
            <dt className="font-semibold text-ink/70">{t("age")}</dt>
            <dd>{project.ageRange}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink/70">{t("cost")}</dt>
            <dd>{project.cost ?? t("free")}</dd>
          </div>
          {project.deadline && (
            <div className="col-span-2">
              <dt className="font-semibold text-ink/70">{t("deadline")}</dt>
              <dd>{project.deadline}</dd>
            </div>
          )}
        </dl>

        <div className="mt-5 flex items-center gap-3 pt-1">
          {project.status === "open" && (
            <Link
              href={`${routes.projects}/${project.slug}#apply`}
              onClick={() => track("apply_start", { slug: project.slug })}
              className="btn-primary px-4 py-2"
            >
              {t("applyNow")}
            </Link>
          )}
          {project.status === "completed" ? (
            <Link href={`${href}#impact`} className="btn-text">
              {t("viewResults")} <span className="cta-arrow" aria-hidden>→</span>
            </Link>
          ) : (
            <Link href={href} className="btn-text">
              {t("viewProject")} <span className="cta-arrow" aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
