import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { VenueSupportForm } from "@/components/forms/VenueSupportForm";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "venueForm" });
  return {
    title: t("hero.title"),
    description: t("hero.subtitle"),
  };
}

export default function VenuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("venueForm");

  return (
    <>
      <PageHero image={media.joinPartners} eyebrow={t("hero.title")} animate={false} />

      <Breadcrumb />

      <section className="bg-white section-sm">
        <div className="container-aft">
          <VenueSupportForm />
        </div>
      </section>
    </>
  );
}
