import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Cloud Run은 컨테이너로 돌아가므로 self-host용 standalone 번들을 만든다.
  // (.next/standalone 안에 server.js + 필요한 node_modules만 남는다)
  output: "standalone",
};

export default withNextIntl(nextConfig);
