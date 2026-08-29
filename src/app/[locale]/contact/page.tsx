import { use } from "react";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { routes } from "@/config/nav";

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
      <section className="bg-navy py-24 md:py-32 text-white">
        <div className="container-aft">
          <p className="eyebrow">{t("hero.eyebrow")}</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">{t("hero.subtitle")}</p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ContactForm />

          <aside className="rounded-2xl border border-line bg-white p-6 shadow-sm">
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
                    {t("info.join")} <span aria-hidden>→</span>
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-muted">
                  {t("info.partnerLabel")}
                </dt>
                <dd className="mt-1">
                  <Link href={routes.partners} className="btn-text">
                    {t("info.partner")} <span aria-hidden>→</span>
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
