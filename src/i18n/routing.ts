import { defineRouting } from "next-intl/routing";

// AFT is English-first with a Korean toggle (기획서 §0, §11).
// URLs are always locale-prefixed: /en/... and /ko/...
// `localeDetection: false` → visiting "/" always lands on English regardless of
// the browser's Accept-Language (no auto-redirect to /ko for Korean browsers).
// Users switch to Korean via the in-site language toggle.
export const routing = defineRouting({
  locales: ["en", "ko"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
