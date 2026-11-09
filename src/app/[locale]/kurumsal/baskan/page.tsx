import { seedMeta } from "@/presentation/seo";
import { StaticSeedPage } from "@/presentation/ui/static-seed-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seedMeta(locale, "baskan");
}

export default StaticSeedPage({
  slug: "baskan",
  kicker: { tr: "Kurumsal", en: "About" },
  image: "/archive/other/vedat-gizer.jpg",
  imageAlt: "Vedat Gizer",
  portrait: {
    tr: "Vedat Gizer · ADSİAD Yönetim Kurulu Başkanı",
    en: "Vedat Gizer · Chair of the Board, ADSİAD",
  },
});
