import type { MetadataRoute } from "next";
import { newsRepository, projectRepository } from "@/infrastructure/repositories/catalog";
import { siteOrigin } from "@/infrastructure/site";

const paths = [
  "/",
  "/kurumsal",
  "/kurumsal/tarihce",
  "/kurumsal/vizyon",
  "/kurumsal/baskan",
  "/kurumsal/kurullar",
  "/kurumsal/eski-baskanlar",
  "/kurumsal/tuzuk",
  "/kurumsal/basin-kiti",
  "/uyeler",
  "/uyeler/neden",
  "/uyeler/firmalar",
  "/uye-ol",
  "/faaliyetler",
  "/faaliyetler/takvim",
  "/faaliyetler/sali",
  "/faaliyetler/akademi",
  "/faaliyetler/projeler",
  "/faaliyetler/galeri",
  "/gundem",
  "/gundem/haberler",
  "/gundem/duyurular",
  "/gundem/sosyal",
  "/iletisim",
  "/gizlilik-politikasi",
  "/cerez-politikasi",
  "/kvkk",
];

function href(locale: "tr" | "en", path: string) {
  const origin = siteOrigin();
  if (locale === "tr") return path === "/" ? `${origin}/` : `${origin}${path}`;
  return path === "/" ? `${origin}/en` : `${origin}/en${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamic = [
    ...newsRepository.all().map((item) => `/gundem/${item.slug}`),
    ...projectRepository.withDetail().map((item) => `/faaliyetler/projeler/${item.slug}`),
  ];
  return [...paths, ...dynamic].map((path) => {
    const tr = href("tr", path);
    const en = href("en", path);
    return {
      url: tr,
      alternates: { languages: { tr, en } },
    };
  });
}
