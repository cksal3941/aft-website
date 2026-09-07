import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingQuickMenu } from "@/components/layout/FloatingQuickMenu";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  // Search-engine ownership codes. Set these in the environment (Vercel → env, or
  // .env.local) to verify the site in Google Search Console and Naver Search
  // Advisor (also covers the Whale browser, which searches via Naver):
  //   GOOGLE_SITE_VERIFICATION=... / NAVER_SITE_VERIFICATION=...
  const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
  const naverVerification = process.env.NAVER_SITE_VERIFICATION;
  return {
    // Resolve OG image / relative URLs to absolute against the official domain
    // (src/lib/site.ts; override with NEXT_PUBLIC_SITE_URL).
    metadataBase: new URL(siteUrl()),
    title: {
      default: t("siteName"),
      template: `%s · AFT`,
    },
    description: t("tagline"),
    applicationName: t("siteName"),
    keywords: [
      "AFT",
      "Arts For Tomorrow",
      "youth arts",
      "youth nonprofit",
      "global youth network",
      "youth creators",
      "청소년 예술",
      "비영리 단체",
      "청소년 예술단체",
      "글로벌 청소년",
    ],
    // Explicitly allow indexing everywhere (Google, Naver, Bing, etc.) with rich
    // previews, so search engines surface the site with images and full snippets.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(naverVerification
        ? { other: { "naver-site-verification": naverVerification } }
        : {}),
    },
    // Suppress Chrome/Edge's "translate this page?" prompt — the site already
    // serves fully-localized KO/EN, so browser translation only double-translates.
    other: {
      google: "notranslate",
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("siteName"),
      description: t("tagline"),
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("siteName"),
      description: t("tagline"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // Neue Haas Grotesk lives on Adobe Fonts. Set NEXT_PUBLIC_TYPEKIT_ID to your
  // Web Project kit id to load it; until then the stack falls back to Inter.
  const typekitId = process.env.NEXT_PUBLIC_TYPEKIT_ID;

  return (
    // `lang` stays per-locale for SEO/a11y, but `translate="no"` (inherited by
    // every descendant, incl. dynamic client-rendered text) opts the whole
    // document out of Chrome/Edge/Safari auto-translation. The site's own KO/EN
    // toggle is unaffected. Paired with <meta name="google" content="notranslate">
    // (in generateMetadata) to suppress Chrome's translate prompt entirely.
    <html
      lang={locale}
      translate="no"
      className={`${inter.variable} notranslate h-full antialiased`}
    >
      {typekitId && (
        <>
          <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
          <link
            rel="stylesheet"
            href={`https://use.typekit.net/${typekitId}.css`}
          />
        </>
      )}
      <body className="flex min-h-full flex-col bg-white text-ink">
        <NextIntlClientProvider>
          {/* Skip link — first focusable element, visually hidden until focused,
              lets keyboard users jump past the nav to the page content. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {locale === "ko" ? "본문 바로가기" : "Skip to content"}
          </a>
          <Header />
          {/* pt clears the fixed header; the home hero cancels it with -mt-20 */}
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <FloatingQuickMenu />
          <ScrollReveal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
