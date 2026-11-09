// Builds the small navbar panel images in public/archive/nav from photos already in the archive.
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const sources = {
  kurumsal: "news/logomanset.jpg",
  tarihce: "promo/746_adsiad25.jpg",
  vizyon: "promo/adana-adsiad-gelecek.jpg",
  baskan: ["other/vedat-gizer.jpg", "north"],
  kurullar: "promo/185_adsiad-genel_kurul_3.jpg",
  "eski-baskanlar": "sosyal/2026-01-yesil-donusum/sonmez-01.webp",
  tuzuk: "promo/807_adsiad-mali_genel_kurul_2_2.jpg",
  uyeler: "news/adsiad-kadinlar-1.jpg",
  firmalar: "promo/435_adsiad-ato-adaso_2.jpg",
  neden: "promo/523_adsiad-taider_aile_isletmeleri_14.jpg",
  "uye-ol": "sosyal/2026-04-ayca-celik/01.webp",
  sali: "promo/878_adsiad_3.jpg",
  takvim: ["sosyal/2026-01-yesil-donusum/turkonfed-01.webp", "north"],
  akademi: "promo/634_adsiad_akademi-tarim_2_1.jpg",
  projeler: "promo/adana-gelinleri.jpg",
  galeri: "promo/501_adsiad-altinoran-imza-sergi_2_1.jpg",
  haberler: ["sosyal/2026-05-tusiad-ozan-diren/03.webp", "centre"],
  duyurular: "sosyal/2026-02-ikiz-donusum/01.webp",
  basin: "promo/791_adsiadsacitac228177m228177229255_2.jpg",
  ilan: "promo/adsiad-belarus.jpg",
};

mkdirSync("public/archive/nav", { recursive: true });
for (const [slug, entry] of Object.entries(sources)) {
  const [src, position = sharp.strategy.attention] = Array.isArray(entry) ? entry : [entry];
  await sharp(`public/archive/${src}`)
    .resize(640, 480, { fit: "cover", position })
    .webp({ quality: 74 })
    .toFile(`public/archive/nav/${slug}.webp`);
  console.log(slug);
}
