import type { Locale } from "@/i18n/routing";

// Team roster shown on the About page. Follows the same {en, ko} localized-field
// pattern as stories.ts / projects.ts. Two groups: per-country student
// representatives, and functional departments with their members.
type LocalizedText = Record<Locale, string>;

export type Representative = {
  /** ISO 3166-1 alpha-2 code → /images/flags/<flag>.svg (Dubai → UAE = "ae"). */
  flag: string;
  country: LocalizedText;
  name: LocalizedText;
};

export type Department = {
  /** 3D icon under /public (3dicons.co, premium style, CC0). */
  icon: string;
  name: LocalizedText;
  members: LocalizedText[];
};

export const representatives: Representative[] = [
  {
    flag: "kr",
    country: { en: "Korea", ko: "한국" },
    name: { en: "Doeun Ahn", ko: "안도은" },
  },
  {
    flag: "us",
    // Has an English name → English name in EN, Korean name in KO.
    country: { en: "USA", ko: "미국" },
    name: { en: "Katie", ko: "정윤" },
  },
  {
    flag: "ae",
    // Has an English name → English name in EN, Korean name in KO.
    country: { en: "Dubai", ko: "두바이" },
    name: { en: "Sophia", ko: "김서연" },
  },
];

export const departments: Department[] = [
  {
    icon: "/images/icon-video.png",
    name: { en: "Editing & Video", ko: "편집 영상부" },
    members: [
      { en: "Seoha Kim", ko: "김서하" },
      { en: "Seoin Park", ko: "박서인" },
      { en: "Seoyeon Kong", ko: "공서연" },
    ],
  },
  {
    icon: "/images/icon-megaphone.png",
    name: { en: "Event Planning", ko: "이벤트 기획부" },
    members: [
      { en: "Eunwoo Kim", ko: "김은우" },
      { en: "Jiwoo Lee", ko: "이지우" },
      { en: "Jueun Lee", ko: "이주은" },
    ],
  },
];

export type LocalizedRepresentative = {
  flag: string;
  country: string;
  name: string;
};
export type LocalizedDepartment = {
  icon: string;
  name: string;
  members: string[];
};

export function getRepresentatives(locale: Locale): LocalizedRepresentative[] {
  return representatives.map((r) => ({
    flag: r.flag,
    country: r.country[locale],
    name: r.name[locale],
  }));
}

export function getDepartments(locale: Locale): LocalizedDepartment[] {
  return departments.map((d) => ({
    icon: d.icon,
    name: d.name[locale],
    members: d.members.map((m) => m[locale]),
  }));
}
