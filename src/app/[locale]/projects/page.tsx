import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { getProjects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export default function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("projects.hero");
  const items = getProjects(locale as Locale);

  return (
    <>
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">{t("subtitle")}</p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-aft">
          <ProjectsExplorer items={items} />
        </div>
      </section>
    </>
  );
}
