import type { Locale } from "@/i18n/routing";

// Countries our youth members come from — this is an "origin" list (individual
// members), NOT chapters/branches. Add a country here as real members join.
// `flag` is an ISO 3166-1 alpha-2 code → /images/flags/<flag>.svg.
// `lng`/`lat` place the flag on the world map (representative point per country).
type LocalizedText = Record<Locale, string>;

export type OriginCountry = {
  flag: string;
  name: LocalizedText;
  lng: number;
  lat: number;
};

export const originCountries: OriginCountry[] = [
  { flag: "kr", name: { en: "Korea", ko: "한국" }, lng: 126.98, lat: 37.57 },
  { flag: "us", name: { en: "USA", ko: "미국" }, lng: -98, lat: 39.5 },
  { flag: "ae", name: { en: "Dubai", ko: "두바이" }, lng: 55.27, lat: 25.2 },
  { flag: "au", name: { en: "Australia", ko: "호주" }, lng: 151.2, lat: -33.87 },
];

export const originCountryCount = originCountries.length;

export function getOriginCountries(locale: Locale) {
  return originCountries.map((c) => ({
    flag: c.flag,
    name: c.name[locale],
    lng: c.lng,
    lat: c.lat,
  }));
}
