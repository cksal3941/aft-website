import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { YouthApplicationForm } from "@/components/forms/YouthApplicationForm";

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
      <section className="bg-navy py-16 md:py-24 text-white">
        <div className="container-aft">
          <p className="eyebrow">Join AFT</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-white/75">{t("intro")}</p>
          <p className="mt-1 text-sm text-white/50">{t("privacy")}</p>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="container-aft">
          <YouthApplicationForm />
        </div>
      </section>
    </>
  );
}
