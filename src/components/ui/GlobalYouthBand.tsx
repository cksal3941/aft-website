import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { getOriginCountries, originCountryCount } from "@/content/globalYouth";

// "Global youth" band: a headline + a row of country flags, expressing that AFT's
// young members come from many countries. Data-driven from globalYouth.ts, so
// adding a country is a one-line change. Reused on the org chart, home and
// global-network pages.
export function GlobalYouthBand({ centered = true }: { centered?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("globalYouth");
  const countries = getOriginCountries(locale);

  return (
    <div className={centered ? "text-center" : ""}>
      <p className="eyebrow">{t("eyebrow")}</p>
      <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
        {t("title", { count: originCountryCount })}
      </h2>
      <ul
        className={`mt-8 flex flex-wrap gap-x-6 gap-y-4 ${
          centered ? "justify-center" : ""
        }`}
      >
        {countries.map((c) => (
          <li key={c.flag} className="flex items-center gap-2">
            <Image
              src={`/images/flags/${c.flag}.svg`}
              alt=""
              width={36}
              height={24}
              unoptimized
              className="h-6 w-9 rounded-sm object-cover shadow-sm ring-1 ring-line"
            />
            <span className="text-sm font-semibold text-ink">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
