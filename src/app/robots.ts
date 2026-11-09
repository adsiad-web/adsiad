import type { MetadataRoute } from "next";
import { siteOrigin } from "@/infrastructure/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio-k7m2", "/api/"],
    },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
