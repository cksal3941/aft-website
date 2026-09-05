"use client";

import { useEffect, useState } from "react";
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

  // Open projects show a live D-day over the image instead of the "모집 중"
  // label. Computed on the client so it reflects the visitor's current date
  // (not the build/SSR time). Until mounted we fall back to the status badge,
  // so SSR and the first client render match — no hydration mismatch.
  const [dday, setDday] = useState<string | null>(null);
  useEffect(() => {
    if (project.status !== "open" || !project.deadline) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(`${project.deadline}T00:00:00`);
    const days = Math.round((end.getTime() - today.getTime()) / 86_400_000);
    setDday(days > 0 ? `D-${days}` : days === 0 ? t("dday") : t("closed"));
  }, [project.status, project.deadline, t]);

  // Coming-soon is a teaser placeholder — no image, no detail link. Just a
  // centered "Coming Soon" message.
  if (project.status === "coming-soon") {
    return (
      <article className="card flex min-h-[300px] flex-col items-center justify-center gap-3 border-dashed text-center">
        <span className="text-2xl font-extrabold tracking-tight text-teal sm:text-3xl">
          Coming Soon
        </span>
        {project.oneLiner && (
          <p className="max-w-[18rem] whitespace-pre-line text-sm text-muted">
            {project.oneLiner}
          </p>
        )}
      </article>
    );
  }

  return (
    <article className="card !p-0 group relative flex flex-col overflow-hidden">
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
          zoomOnGroupHover
          className="aspect-[16/10] w-full rounded-none"
        />
        <div className="absolute left-3 top-3">
          {dday ? (
            <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-white">
              {dday}
            </span>
          ) : (
            <StatusBadge status={project.status} />
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {/* Field label styled as a pill like the D-day badge: very light gray
            fill, soft-black text. Small explicit size (text-xs is raised to 16px
            project-wide) + medium weight, with a ~10px gap below. */}
        <span className="mb-2.5 self-start rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
          {project.field}
        </span>
        <h3 className="text-lg font-bold text-ink">
          {/* Stretched link: the ::before overlay makes the whole card a click
              target to the detail page. */}
          <Link
            href={href}
            onClick={() => track("project_view", { slug: project.slug })}
            className="transition-colors before:absolute before:inset-0 before:content-[''] group-hover:text-accent-hover"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted transition-colors group-hover:text-accent-hover">
          {project.oneLiner}
        </p>
      </div>
    </article>
  );
}
