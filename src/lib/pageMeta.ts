import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

// Builds a page's browser-tab <title> (and optional <meta description>).
// The root layout applies the "%s · AFT" title template, so `titleKey` should
// resolve to a concise page name — we reuse the `nav.*` labels so each tab
// title matches the menu item for that page. Keys are full message paths
// (e.g. "nav.about", "about.hero.subtitle"). Omit `descriptionKey` to inherit
// the site-wide description from the layout.
export async function pageMeta(
  locale: string,
  titleKey: string,
  descriptionKey?: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    title: t(titleKey),
    ...(descriptionKey ? { description: t(descriptionKey) } : {}),
  };
}
