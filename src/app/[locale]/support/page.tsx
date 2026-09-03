import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DonationFlow } from "@/components/forms/DonationFlow";
import { media } from "@/config/media";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "support" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

export default function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("support");

  const impactKeys = ["a", "b", "c"] as const;

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.homeSupport}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Breadcrumb />

      {/* DONATION FLOW */}
      <section className="bg-surface section">
        <div className="container-aft">
          <DonationFlow />
        </div>
      </section>

      {/* IMPACT EXAMPLES */}
      <section className="bg-white section">
        <div className="container-aft">
          <SectionHeading
            eyebrow={t("impact.eyebrow")}
            title={t("impact.title")}
            centered
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {impactKeys.map((k) => (
              <div
                key={k}
                className="card text-center"
              >
                <p className="font-semibold text-ink">{t(`impact.items.${k}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="bg-surface section">
        <div className="container-aft max-w-3xl">
          <SectionHeading
            eyebrow={t("transparency.eyebrow")}
            title={t("transparency.title")}
          />
          <p className="mt-4 text-muted">{t("transparency.body")}</p>
        </div>
      </section>
    </>
  );
}
