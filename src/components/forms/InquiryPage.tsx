import { useTranslations } from "next-intl";
import { InquiryForm } from "./InquiryForm";
import type { InquiryConfig } from "./inquiryConfigs";

// Shared hero + form shell for every inquiry route (기획서 §7.1).
export function InquiryPage({ config }: { config: InquiryConfig }) {
  const t = useTranslations(config.namespace);
  return (
    <>
      <section className="bg-navy py-16 md:py-24 text-white">
        <div className="container-aft">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-2xl text-white/75">{t("hero.subtitle")}</p>
          <p className="mt-1 text-sm text-white/50">{t("hero.time")}</p>
        </div>
      </section>
      <section className="bg-surface py-16 md:py-24">
        <div className="container-aft">
          <InquiryForm config={config} />
        </div>
      </section>
    </>
  );
}
