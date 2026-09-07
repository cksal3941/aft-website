import type { Metadata } from "next";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { InquiryPage } from "@/components/forms/InquiryPage";
import { partnershipConfig } from "@/components/forms/inquiryConfigs";
import { pageMeta } from "@/lib/pageMeta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "nav.sub.partnerWith");
}

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <InquiryPage config={partnershipConfig} />;
}
