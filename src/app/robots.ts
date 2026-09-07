import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// /robots.txt — allow every crawler (Google, Naver/Whale, Bing, …) and point
// them at the sitemap so the whole site is discoverable.
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
