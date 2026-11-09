import { seedMeta } from "@/presentation/seo";
import { StaticSeedPage } from "@/presentation/ui/static-seed-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seedMeta(locale, "cerez-politikasi");
}

export default StaticSeedPage({ slug: "cerez-politikasi", kicker: { tr: "Çerezler", en: "Cookies" } });
