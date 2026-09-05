import type { Metadata } from "next";
import Image from "next/image";
import { use } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GlobalYouthBand } from "@/components/ui/GlobalYouthBand";
import { media } from "@/config/media";
import type { Locale } from "@/i18n/routing";
import { getRepresentatives, getDepartments } from "@/content/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("team.eyebrow"),
    description: t("team.title"),
  };
}

export default function AboutTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");
  const reps = getRepresentatives(locale as Locale);
  const depts = getDepartments(locale as Locale);

  return (
    <>
      <PageHero
        image={media.aboutTeamHero}
        eyebrow={t("team.eyebrow")}
        title={t("team.title")}
      />

      <Breadcrumb />

      <section className="section bg-white">
        <div className="container-aft">
          {/* Global youth — youth come from many countries */}
          <GlobalYouthBand />

          {/* Per-country student representatives */}
          <h2 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-accent">
            {t("team.repsTitle")}
          </h2>
          <div className="mx-auto mt-6 grid max-w-4xl gap-6 sm:grid-cols-3">
            {reps.map((r) => (
              <div
                key={r.country}
                data-reveal
                className="flex flex-col items-center p-6 text-center"
              >
                <Image
                  src={`/images/flags/${r.flag}.svg`}
                  alt=""
                  width={48}
                  height={32}
                  unoptimized
                  className="mb-3 h-8 w-12 rounded-sm object-cover shadow-sm ring-1 ring-line"
                />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">
                  {r.country}
                </p>
                <p className="mt-2 text-lg font-bold text-ink">{r.name}</p>
              </div>
            ))}
          </div>

          {/* Functional departments */}
          <h2 className="mt-16 text-center text-sm font-bold uppercase tracking-[0.18em] text-accent">
            {t("team.deptsTitle")}
          </h2>
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
            {depts.map((d) => (
              <div
                key={d.name}
                data-reveal
                className="card flex flex-col items-center text-center"
              >
                <Image
                  src={d.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="h-16 w-16 flex-none"
                />
                <h3 className="mt-4 font-bold text-ink">{d.name}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {d.members.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
