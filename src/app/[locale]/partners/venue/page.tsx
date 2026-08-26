import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { VenueSupportForm } from "@/components/forms/VenueSupportForm";

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
      <section className="bg-navy py-12 text-white">
        <div className="container-aft">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-white/75">{t("hero.subtitle")}</p>
          <p className="mt-1 text-sm text-white/50">{t("hero.time")}</p>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="container-aft">
          <VenueSupportForm />
        </div>
      </section>
    </>
  );
}
