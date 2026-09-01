import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { media } from "@/config/media";
import { routes } from "@/config/nav";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("hero.eyebrow"),
    description: t("hero.subtitle"),
  };
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contact");

  return (
    <>
      {/* HERO */}
      <PageHero
        image={media.impactImg2}
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <Breadcrumb />

      {/* FORM + INFO */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm />

          <aside className="rounded-sm border border-line bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-ink">{t("info.title")}</h2>
            <dl className="mt-5 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-muted">
                  {t("info.emailLabel")}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="text-navy hover:text-accent-hover"
                  >
                    {t("info.email")}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">
                  {t("info.joinLabel")}
                </dt>
                <dd className="mt-1">
                  <Link href={routes.apply} className="btn-text">
                    {t("info.join")} <span className="cta-arrow" aria-hidden>→</span>
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">
                  {t("info.partnerLabel")}
                </dt>
                <dd className="mt-1">
                  <Link href={routes.partners} className="btn-text">
                    {t("info.partner")} <span className="cta-arrow" aria-hidden>→</span>
                  </Link>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
