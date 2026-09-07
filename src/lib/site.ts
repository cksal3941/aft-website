// Absolute production origin, shared by metadataBase, robots.txt and sitemap.
// Defaults to the official domain so canonical URLs, the sitemap and OG tags
// always point at production; override with NEXT_PUBLIC_SITE_URL if the domain
// changes (or to test against a preview URL).
export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aftyouth.org";
}
