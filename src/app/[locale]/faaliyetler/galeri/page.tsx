import { setRequestLocale } from "next-intl/server";
import { galleryRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker } from "@/presentation/ui/chrome";
import { loc } from "@/presentation/ui/cn";
import { GalleryGrid, PhotoStrip } from "@/presentation/ui/gallery-grid";
import { toPhotoGroups } from "@/presentation/ui/gallery-data";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Gallery" : "Galeri",
    locale === "en"
      ? "Recent photographs from the association’s social media accounts. Each photo links to its story."
      : "Derneğin sosyal medya hesaplarından son kareler. Her fotoğraf ilgili haberine bağlanır.",
  );
}

const frames = [
  { src: "/archive/promo/185_adsiad-genel_kurul_3.jpg", alt: { tr: "Olağan genel kurul", en: "Ordinary general assembly" } },
  { src: "/archive/promo/523_adsiad-taider_aile_isletmeleri_14.jpg", alt: { tr: "TAİDER Kuzey Yıldızı toplantısı", en: "TAİDER North Star meeting" } },
  { src: "/archive/promo/634_adsiad_akademi-tarim_2_1.jpg", alt: { tr: "ADSİAD Akademi, tarım", en: "ADSİAD Academy, agriculture" } },
  { src: "/archive/promo/435_adsiad-ato-adaso_2.jpg", alt: { tr: "ATO ve ADASO ziyareti", en: "Visit to ATO and ADASO" } },
  { src: "/archive/promo/adana-gelinleri.jpg", alt: { tr: "Adana’nın Gelinleri", en: "Adana’s Brides" } },
  { src: "/archive/promo/501_adsiad-altinoran-imza-sergi_2_1.jpg", alt: { tr: "Toroslar ve Nadide Çiçekleri", en: "Toroslar ve Nadide Çiçekleri" } },
  { src: "/archive/promo/422_adsiad-halkbank_2.jpg", alt: { tr: "Salı toplantısı, Halkbank", en: "Tuesday meeting, Halkbank" } },
  { src: "/archive/promo/adsiad-belarus.jpg", alt: { tr: "Belarus iş dünyası", en: "Belarusian business community" } },
  { src: "/archive/promo/878_adsiad_3.jpg", alt: { tr: "İş dünyasının gündemi Çukurova", en: "Çukurova on the business agenda" } },
  { src: "/archive/promo/260_yonetim2016.jpg", alt: { tr: "2016 yönetim kurulu", en: "The 2016 board" } },
  { src: "/archive/news/386_sonmez-ogrenci.jpg", alt: { tr: "Başkan Sönmez, öğretmenler günü", en: "Chair Sönmez, Teachers’ Day" } },
  { src: "/archive/promo/adana-adsiad-gelecek.jpg", alt: { tr: "Adana’nın ekonomik geleceği", en: "Adana’s economic future" } },
];

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const groups = galleryRepository.all();
  const credits = groups.filter((g) => g.credit);
  return (
    <>
      <PageIntro
        kicker={en ? "Activities" : "Faaliyetler"}
        title={en ? "Gallery" : "Galeri"}
        lead={
          en
            ? "Recent photographs from the association’s social media accounts. Each photo links to its story."
            : "Derneğin sosyal medya hesaplarından son kareler. Her fotoğraf ilgili haberine bağlanır."
        }
      >
        <SectionTabs section="faaliyetler" current="/faaliyetler/galeri" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 pt-12 sm:pt-16 lg:px-8 lg:pt-20">
        <GalleryGrid groups={toPhotoGroups(groups, locale)} locale={locale} />
        {credits.map((g) => (
          <p key={g.id} className="mt-2 text-xs text-[var(--muted)]">
            {loc(g.short ?? g.title, locale)}: {loc(g.credit!, locale)}
          </p>
        ))}
        <section aria-labelledby="archive" className="mt-12 border-t-2 border-[var(--fg)] pb-24 pt-8">
          <Kicker>{en ? "Archive" : "Arşiv"}</Kicker>
          <h2 id="archive" className="mb-6 mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
            {en ? "From the previous site" : "Önceki siteden"}
          </h2>
          <PhotoStrip
            variant="archive"
            locale={locale}
            photos={frames.map((f) => ({ src: f.src, alt: loc(f.alt, locale), group: en ? "Archive" : "Arşiv" }))}
          />
        </section>
      </div>
    </>
  );
}
