import type { Locale } from "@/i18n/routing";
import { representatives } from "./team";

// Countries our youth members come from — this is an "origin" list (individual
// members), NOT chapters/branches. Add a country here as real members join.
// `flag` is an ISO 3166-1 alpha-2 code → /images/flags/<flag>.svg.
// `lng`/`lat` place the flag on the world map (representative point per country).
type LocalizedText = Record<Locale, string>;

// Each country carries the youth member behind it. The student *name* is the
// single source of truth in team.ts (the org chart's `representatives`), matched
// by `flag` — so renaming there updates the map too. `photo` is a face image
// under /public (convention: /images/students/<flag>.jpg).
export type OriginCountry = {
  flag: string;
  name: LocalizedText;
  lng: number;
  lat: number;
  photo: string;
};

export const originCountries: OriginCountry[] = [
  { flag: "kr", name: { en: "Korea", ko: "한국" }, lng: 126.98, lat: 37.57, photo: "/images/students/안도은-한국.png" },
  { flag: "us", name: { en: "USA", ko: "미국" }, lng: -98, lat: 39.5, photo: "/images/students/정윤-미국.png" },
  { flag: "ae", name: { en: "Dubai", ko: "두바이" }, lng: 55.27, lat: 25.2, photo: "/images/students/김서연-두바이.png" },
  // No photo yet for Australia / Austria → marker shows flag + country name only.
  { flag: "au", name: { en: "Australia", ko: "호주" }, lng: 151.2, lat: -33.87, photo: "" },
  { flag: "at", name: { en: "Austria", ko: "오스트리아" }, lng: 16.37, lat: 48.21, photo: "" },
];

export const originCountryCount = originCountries.length;

export function getOriginCountries(locale: Locale) {
  return originCountries.map((c) => {
    // Pull the student's name from the org chart by flag; undefined if that
    // country has no representative there yet (e.g. Australia).
    const rep = representatives.find((r) => r.flag === c.flag);
    return {
      flag: c.flag,
      name: c.name[locale],
      lng: c.lng,
      lat: c.lat,
      student: { name: rep?.name[locale], photo: c.photo },
    };
  });
}
