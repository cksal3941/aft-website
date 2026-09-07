import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { pageMeta } from "@/lib/pageMeta";
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
  return pageMeta(locale, "nav.sub.youthApply", "apply.intro");
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
        imageObjectPosition="center 30%"
        eyebrow="Join AFT"
        title={t("title")}
        subtitle={t("intro")}
      >
        <p className="text-sm text-white/60">{t("privacy")}</p>
      </PageHero>

      <Breadcrumb />

      <section className="bg-white section-sm">
        <div className="container-aft">
          <YouthApplicationForm />
        </div>
      </section>
    </>
  );
}
