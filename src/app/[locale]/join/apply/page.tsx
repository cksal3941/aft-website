import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { YouthApplicationForm } from "@/components/forms/YouthApplicationForm";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apply" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default function YouthApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("apply");

  return (
    <>
      <PageHero
        image={media.joinYouth}
        eyebrow="Join AFT"
        title={t("title")}
        subtitle={t("intro")}
      >
        <p className="text-sm text-white/60">{t("privacy")}</p>
      </PageHero>

      <Breadcrumb />

      <section className="bg-surface py-16 md:py-24">
        <div className="container-aft">
          <YouthApplicationForm />
        </div>
      </section>
    </>
  );
}
