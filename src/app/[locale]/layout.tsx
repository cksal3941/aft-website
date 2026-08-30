import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingQuickMenu } from "@/components/layout/FloatingQuickMenu";
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
  return {
    // TODO: replace with the real production domain once live — this resolves
    // the OG image and other relative URLs to absolute for link previews.
    metadataBase: new URL("https://aft.org"),
    title: {
      default: t("siteName"),
      template: `%s · AFT`,
    },
    description: t("tagline"),
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

  return (
    <html lang={locale} className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#f8fafc] text-ink">
        <NextIntlClientProvider>
          <Header />
          {/* pt clears the fixed header; the home hero cancels it with -mt-20 */}
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
          <FloatingQuickMenu />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
