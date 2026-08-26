import { useTranslations } from "next-intl";
import type { ProjectStatus } from "@/content/projects";

const styles: Record<ProjectStatus, string> = {
  open: "bg-accent text-ink",
  ongoing: "bg-navy text-white",
  completed: "bg-white/90 text-navy",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const t = useTranslations("projects.status");
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${styles[status]}`}
    >
      {t(status)}
    </span>
  );
}
