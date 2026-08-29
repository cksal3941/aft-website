import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DonationFlow } from "@/components/forms/DonationFlow";

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
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* DONATION FLOW */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <DonationFlow />
        </div>
      </section>

      {/* IMPACT EXAMPLES */}
      <section className="bg-white py-24 md:py-32">
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
                className="rounded-xl border border-line bg-white p-6 text-center shadow-sm"
              >
                <p className="font-semibold text-ink">{t(`impact.items.${k}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="bg-surface py-24 md:py-32">
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
