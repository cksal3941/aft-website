import type { Metadata } from "next";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaLink } from "@/components/ui/CtaLink";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { WorldMap } from "@/components/home/WorldMap";
import { media } from "@/config/media";
import { routes } from "@/config/nav";
import { networkNodes } from "@/content/globalNetwork";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "globalNetwork" });
  return {
    title: t("eyebrow"),
    description: t("body"),
  };
}

// GLOBAL NETWORK — expandable structure (Country · City · Youth Members ·
// Projects · Partners). Only REAL nodes are listed (see src/content/globalNetwork.ts).
export default function GlobalNetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("globalNetwork");

  return (
    <>
      {/* Hero */}
      <PageHero
        image={media.homeCommunity}
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
      >
        <CtaLink href={routes.join} variant="primary" event="join_click">
          {t("cta")} <span className="cta-arrow" aria-hidden>→</span>
        </CtaLink>
      </PageHero>

      <Breadcrumb />

      {/* Open network map */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-aft">
          <WorldMap seoulLabel={t("mapLabel")} />
        </div>
      </section>

      {/* The network so far — real nodes only */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-aft">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {t("table.title")}
          </h2>
          <div className="mt-8 overflow-x-auto rounded-sm border border-line bg-white">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-bold uppercase tracking-wide text-muted">
                  <th className="px-5 py-4">{t("table.country")}</th>
                  <th className="px-5 py-4">{t("table.city")}</th>
                  <th className="px-5 py-4 text-right">{t("table.members")}</th>
                  <th className="px-5 py-4 text-right">{t("table.projects")}</th>
                  <th className="px-5 py-4 text-right">{t("table.partners")}</th>
                  <th className="px-5 py-4" />
                </tr>
              </thead>
              <tbody>
                {networkNodes.map((n) => (
                  <tr
                    key={`${n.country}-${n.city}`}
                    className="border-b border-line last:border-0"
                  >
                    <td className="px-5 py-4 font-semibold text-ink">
                      {n.country}
                    </td>
                    <td className="px-5 py-4 text-ink">
                      {n.city}
                      {n.founded && (
                        <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-hover">
                          {t("table.founding")} · {n.founded}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-ink">
                      {n.youthMembers}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-ink">
                      {n.projects}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-ink">
                      {n.partners}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          n.status === "active"
                            ? "bg-teal-soft text-teal-hover"
                            : "bg-surface text-muted"
                        }`}
                      >
                        {t(`status.${n.status}`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">{t("openNote")}</p>
        </div>
      </section>
    </>
  );
}
