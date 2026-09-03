import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";
import { getProjects } from "@/content/projects";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.hero" });
  return {
    title: t("eyebrow"),
    description: t("subtitle"),
  };
}

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
      <PageHero
        image={media.homeFeatured}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <Breadcrumb />

      <section className="bg-white section">
        <div className="container-aft">
          <ProjectsExplorer items={items} />
        </div>
      </section>
    </>
  );
}
