import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Dev server only (ignored by `next build`/`next start`): let phones and other devices on the
// local network load the dev-only JS/HMR resources when opening http://<PC-LAN-IP>:3000.
// Without this, Next.js blocks them and the page never hydrates (menu, theme and language
// buttons do nothing).
const privateLanOrigins = [
  "192.168.*.*",
  "10.*.*.*",
  ...Array.from({ length: 16 }, (_, i) => `172.${16 + i}.*.*`),
];

const nextConfig: NextConfig = {
  allowedDevOrigins: privateLanOrigins,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/gundem/basin", destination: "/kurumsal/basin-kiti", permanent: true },
      { source: "/en/gundem/basin", destination: "/en/kurumsal/basin-kiti", permanent: true },
      { source: "/gundem/ilan", destination: "/gundem", permanent: true },
      { source: "/en/gundem/ilan", destination: "/en/gundem", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
