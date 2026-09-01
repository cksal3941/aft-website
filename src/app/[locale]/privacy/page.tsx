import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PageStub } from "@/components/ui/PageStub";

// Sections rendered in order; each key maps to messages `privacy.sections.*`.
const SECTION_KEYS = [
  "collect",
  "use",
  "retention",
  "sharing",
  "rights",
  "contact",
] as const;

export default function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("privacy");

  return (
    <PageStub
      eyebrow={t("eyebrow")}
      title={t("title")}
      description={t("subtitle")}
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-sm border border-dashed border-line bg-surface p-5 text-sm text-muted">
          {t("note")}
        </div>
        <p className="mt-6 text-sm text-muted">{t("updated")}</p>

        <div className="mt-8 space-y-10">
          {SECTION_KEYS.map((key) => (
            <section key={key}>
              <h2 className="text-xl font-bold text-ink">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="mt-3 text-muted">{t(`sections.${key}.body`)}</p>
            </section>
          ))}
        </div>
      </div>
    </PageStub>
  );
}
