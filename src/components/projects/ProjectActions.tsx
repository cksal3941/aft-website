"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routes } from "@/config/nav";
import { track } from "@/lib/analytics";
import type { ProjectStatus } from "@/content/projects";

// Renders the primary + secondary buttons for a project by status (기획서 §5.1).
export function ProjectActions({
  status,
  slug,
}: {
  status: ProjectStatus;
  slug: string;
}) {
  const t = useTranslations("projectDetail.actions");
  const base = `${routes.projects}/${slug}`;

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {status === "open" && (
        <>
          <Link
            href={`${base}#apply`}
            onClick={() => track("apply_start", { slug })}
            className="btn-primary"
          >
            {t("apply")}
          </Link>
          <Link href={routes.contact} className="btn-secondary-dark">
            {t("ask")}
          </Link>
          <ShareButton />
        </>
      )}

      {status === "ongoing" && (
        <>
          <Link href={routes.contact} className="btn-primary">
            {t("follow")}
          </Link>
          <Link
            href={routes.support}
            onClick={() => track("donate_start", { slug, type: "sponsor" })}
            className="btn-secondary-dark"
          >
            {t("sponsor")}
          </Link>
          <ShareButton />
        </>
      )}

      {status === "completed" && (
        <>
          <Link href={`${base}#impact`} className="btn-primary">
            {t("viewResults")}
          </Link>
          <button
            type="button"
            onClick={() => track("report_download", { slug })}
            className="btn-secondary-dark"
          >
            {t("downloadReport")}
          </button>
          <Link href={`${base}#related`} className="btn-secondary-dark">
            {t("related")}
          </Link>
        </>
      )}
    </div>
  );
}

function ShareButton() {
  const t = useTranslations("projectDetail.actions");
  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url, title: document.title });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled — no-op */
    }
  }
  return (
    <button type="button" onClick={share} className="btn-secondary-dark">
      {t("share")}
    </button>
  );
}
