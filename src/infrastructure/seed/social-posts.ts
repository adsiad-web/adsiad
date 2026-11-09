export type SocialPost = {
  id: string;
  network: string;
  href: string;
  date?: string;
  image?: string;
  /** Posters should show whole; photos can crop from the top. */
  imageFit?: "cover" | "contain";
  text: { tr: string; en: string };
};

const networks = ["Instagram", "LinkedIn", "Facebook", "X"] as const;

/** Public posts we can point at. Images stay in /archive. Not a live feed. */
export const socialPosts: SocialPost[] = [
  {
    id: "ig-turkonfed",
    network: "Instagram",
    href: "https://www.instagram.com/p/DYg-Rtkguae/",
    date: "2026-05-19",
    image: "/archive/sosyal/2026-05-turkonfed-ziyaret/01.webp",
    text: {
      tr: "TÜRKONFED Başkanı Süleyman Sönmez’e nezaket ziyareti.",
      en: "A courtesy visit to TÜRKONFED Chair Süleyman Sönmez.",
    },
  },
  {
    id: "ig-ozan-diren",
    network: "Instagram",
    href: "https://www.instagram.com/p/DYSqdryERsT/",
    date: "2026-05-13",
    image: "/archive/sosyal/2026-05-tusiad-ozan-diren/02.webp",
    text: {
      tr: "TÜSİAD Başkanı Ozan Diren’e tebrik ziyareti.",
      en: "A congratulatory visit to TÜSİAD Chair Ozan Diren.",
    },
  },
  {
    id: "li-ayca",
    network: "LinkedIn",
    href: "https://tr.linkedin.com/posts/adsi%CC%87ad_kimtex-tekstil-y%C3%B6netim-kurulu-%C3%BCyesi-say%C4%B1n-activity-7447912662958755840-vnrI",
    date: "2026-04-09",
    image: "/archive/sosyal/2026-04-ayca-celik/01.webp",
    text: {
      tr: "Kimtex Tekstil Yönetim Kurulu Üyesi Ayça Çelik ADSİAD’a katıldı.",
      en: "Ayça Çelik, board member of Kimtex Tekstil, joined ADSİAD.",
    },
  },
  {
    id: "ig-ayca",
    network: "Instagram",
    href: "https://www.instagram.com/p/DW5x9nhgiHC/",
    date: "2026-04-09",
    image: "/archive/sosyal/2026-04-ayca-celik/01.webp",
    text: {
      tr: "Kimtex Tekstil Yönetim Kurulu Üyesi Ayça Çelik ADSİAD’a katıldı.",
      en: "Ayça Çelik, board member of Kimtex Tekstil, joined ADSİAD.",
    },
  },
  {
    id: "ig-ikiz",
    network: "Instagram",
    href: "https://www.instagram.com/p/DUP0G3yAqw1/",
    date: "2026-02-02",
    image: "/archive/sosyal/2026-02-ikiz-donusum/01.webp",
    text: {
      tr: "İkiz Dönüşümde Yeni Ufuklar Projesi Adana’da.",
      en: "The New Horizons in the Twin Transition project in Adana.",
    },
  },
  {
    id: "ig-yesil",
    network: "Instagram",
    href: "https://www.instagram.com/reel/DTe7cMnAmEw/",
    date: "2026-01-14",
    image: "/archive/sosyal/2026-01-yesil-donusum/reel-kapak.webp",
    text: {
      tr: "Adana’nın yeşil dönüşüm yol haritası ADSİAD ev sahipliğinde konuşuldu.",
      en: "Adana’s green transition roadmap discussed at an ADSİAD-hosted panel and workshop.",
    },
  },
  {
    id: "x-is-hukuku",
    network: "X",
    href: "https://x.com/adsiad1991/status/1851557855289094628",
    date: "2024-10-30",
    image: "/archive/sosyal/2024-10-is-hukuku/01.jpg",
    imageFit: "contain",
    text: {
      tr: "İşverenler Açısından İş Hukuku semineri, 5 Kasım’da Adana Sanayi Odası’nda.",
      en: "Employment law seminar for employers, 5 November, at the Adana Chamber of Industry.",
    },
  },
  {
    id: "fb-zafer",
    network: "Facebook",
    href: "https://www.facebook.com/adsiad/posts/pfbid02ivehu64j6L8E2cjccnmD6pobUwzvVM1bQuFDtnB4XPTHrEKVeduwBJ9boFA2gMCsl",
    date: "2022-08-30",
    image: "/archive/sosyal/2022-08-zafer/01.jpg",
    imageFit: "contain",
    text: {
      tr: "Büyük Zafer’in 100. yılında Atatürk’ü, silah arkadaşlarını, şehit ve gazilerimizi anıyoruz.",
      en: "On the 100th anniversary of the Great Victory we remember Atatürk, his comrades, and our martyrs and veterans.",
    },
  },
];

/** Newest post from each account, in a stable order. The homepage carousel uses this. */
export function latestByNetwork(posts: SocialPost[] = socialPosts): SocialPost[] {
  return networks.flatMap((network) => {
    const found = posts
      .filter((post) => post.network === network)
      .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
    return found[0] ? [found[0]] : [];
  });
}
