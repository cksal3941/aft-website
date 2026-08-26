import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { InquiryPage } from "@/components/forms/InquiryPage";
import { sponsorConfig } from "@/components/forms/inquiryConfigs";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <InquiryPage config={sponsorConfig} />;
}
