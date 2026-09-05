import { useTranslations } from "next-intl";
import { InquiryForm } from "./InquiryForm";
import type { InquiryConfig } from "./inquiryConfigs";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";

// Shared hero + form shell for every inquiry route (기획서 §7.1).
// Hero shows only the page name (static — no staggered entrance); the fade-in
// belongs to the form card below (via ScrollReveal).
export function InquiryPage({ config }: { config: InquiryConfig }) {
  const t = useTranslations(config.namespace);
  return (
    <>
      <PageHero image={media.joinPartners} eyebrow={t("hero.title")} animate={false} />

      <Breadcrumb />

      <section className="bg-white section-sm">
        <div className="container-aft">
          <InquiryForm config={config} />
        </div>
      </section>
    </>
  );
}
