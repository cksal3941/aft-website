import { defineRouting } from "next-intl/routing";

// AFT is English-first with a Korean toggle (기획서 §0, §11).
// URLs are always locale-prefixed: /en/... and /ko/...
export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
