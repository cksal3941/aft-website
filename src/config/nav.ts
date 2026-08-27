// Canonical route + nav definitions, mapped 1:1 to 기획서 §1.1 and §11.
// `key` matches a messages `nav.*` entry; `href` is a locale-agnostic path
// (the next-intl <Link> prepends the active locale).

export type NavItem = { key: string; href: string };

// Header nav — redesign scroll narrative (구현이미지):
// ABOUT · OUR STORY · PROJECTS · YOUTH · GLOBAL NETWORK · SUPPORT
export const mainNav: NavItem[] = [
  { key: "about", href: "/about" },
  { key: "ourStory", href: "/#story" },
  { key: "projects", href: "/projects" },
  { key: "youth", href: "/join" },
  { key: "globalNetwork", href: "/global-network" },
  { key: "support", href: "/support" },
];

// Mobile menu adds Contact after the main items.
export const mobileNav: NavItem[] = [
  ...mainNav,
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
} as const;
