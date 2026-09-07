import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getProjectSlugs } from "@/content/projects";

// /sitemap.xml — every locale-prefixed route, each with <xhtml:link hreflang>
// alternates so Google/Naver understand the EN↔KO pairing. Coming-soon projects
// are excluded (getProjectSlugs already filters them; their detail pages 404).
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  const paths = [
    "", // home
    "/about",
    "/about/team",
    "/projects",
    "/stories",
    "/impact",
    "/join",
    "/join/apply",
    "/join/advisor",
    "/global-network",
    "/partners",
    "/partners/inquiry",
    "/partners/sponsor",
    "/partners/venue",
    "/partners/in-kind",
    "/partners/expert",
    "/support",
    "/contact",
    "/privacy",
    "/terms",
    ...getProjectSlugs().map((slug) => `/projects/${slug}`),
  ];

  return paths.map((path) => {
    const languages: Record<string, string> = Object.fromEntries(
      routing.locales.map((l) => [l, `${base}/${l}${path}`]),
    );
    return {
      url: `${base}/${routing.defaultLocale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          ...languages,
          "x-default": `${base}/${routing.defaultLocale}${path}`,
        },
      },
    };
  });
}
