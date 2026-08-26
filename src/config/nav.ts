// Canonical route + nav definitions, mapped 1:1 to 기획서 §1.1 and §11.
// `key` matches a messages `nav.*` entry; `href` is a locale-agnostic path
// (the next-intl <Link> prepends the active locale).

export type NavItem = { key: string; href: string };

export const mainNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "youth", href: "/join" },
  { key: "impact", href: "/impact" },
  { key: "partners", href: "/partners" },
];

// Mobile menu adds News and Contact after the main items (기획서 §1.2).
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
  impact: "/impact",
  partners: "/partners",
  venue: "/partners/venue",
  partnership: "/partners/inquiry",
  sponsor: "/partners/sponsor",
  inkind: "/partners/in-kind",
  expert: "/partners/expert",
  support: "/support",
  stories: "/stories",
  contact: "/contact",
} as const;
