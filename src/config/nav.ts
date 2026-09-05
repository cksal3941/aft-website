// Canonical route + nav definitions, mapped 1:1 to 기획서 §1.1 and §11.
// `key` matches a messages `nav.*` entry; `href` is a locale-agnostic path
// (the next-intl <Link> prepends the active locale).

export type NavChild = { key: string; href: string };
export type NavItem = { key: string; href: string; children?: NavChild[] };

// Header nav — flat top level (기획서 §1.1) + Global Network (수정 방향 §12),
// each with a hover dropdown of real sub-pages / home anchors.
// Sub-item labels live under messages `nav.sub.*`.
export const mainNav: NavItem[] = [
  {
    key: "about",
    href: "/about",
    children: [
      { key: "aboutAft", href: "/about" },
      { key: "ourStory", href: "/#story" },
    ],
  },
  {
    key: "projects",
    href: "/projects",
    children: [
      { key: "allProjects", href: "/projects" },
      { key: "newsStories", href: "/stories" },
    ],
  },
  {
    key: "youth",
    href: "/join",
    children: [
      { key: "joinYouth", href: "/join" },
      { key: "youthApply", href: "/join/apply" },
      { key: "advisor", href: "/join/advisor" },
    ],
  },
  {
    key: "impact",
    href: "/impact",
    children: [
      { key: "ourImpact", href: "/impact" },
      { key: "ecoAction", href: "/#donation" },
    ],
  },
  {
    key: "globalNetwork",
    href: "/global-network",
    children: [
      { key: "globalNetwork", href: "/global-network" },
      { key: "seoulWorld", href: "/#global" },
    ],
  },
  {
    key: "partners",
    href: "/partners",
    children: [
      { key: "partnerWith", href: "/partners/inquiry" },
      { key: "sponsor", href: "/partners/sponsor" },
      { key: "venue", href: "/partners/venue" },
      { key: "inkind", href: "/partners/in-kind" },
      { key: "expert", href: "/partners/expert" },
    ],
  },
];

// Mobile hamburger order per 기획서 §1.2: main items + News + Contact.
export const mobileNav: NavItem[] = [
  ...mainNav,
  { key: "news", href: "/stories" },
  { key: "contact", href: "/contact" },
];

export const routes = {
  home: "/",
  about: "/about",
  projects: "/projects",
  join: "/join",
  apply: "/join/apply",
  advisor: "/join/advisor",
  impact: "/impact",
  globalNetwork: "/global-network",
  partners: "/partners",
  venue: "/partners/venue",
  partnership: "/partners/inquiry",
  sponsor: "/partners/sponsor",
  inkind: "/partners/in-kind",
  expert: "/partners/expert",
  support: "/support",
  stories: "/stories",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;
