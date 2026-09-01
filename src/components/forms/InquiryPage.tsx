import { useTranslations } from "next-intl";
import { InquiryForm } from "./InquiryForm";
import type { InquiryConfig } from "./inquiryConfigs";
import { PageHero } from "@/components/ui/PageHero";
import { media } from "@/config/media";

// Shared hero + form shell for every inquiry route (기획서 §7.1).
export function InquiryPage({ config }: { config: InquiryConfig }) {
  const t = useTranslations(config.namespace);
  return (
    <>
      <PageHero
        image={media.joinPartners}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      >
        <p className="text-sm text-white/60">{t("hero.time")}</p>
      </PageHero>
      <section className="bg-surface py-16 md:py-24">
        <div className="container-aft">
          <InquiryForm config={config} />
        </div>
      </section>
    </>
  );
}
