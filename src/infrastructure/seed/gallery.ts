import type { GalleryGroup } from "@/domain/types";

// Görseller ADSİAD’ın herkese açık Instagram paylaşımlarından alındı (≤1600 px, webp).
// Ortak paylaşımlardaki fotoğraflar ilgili hesaplara aittir; bkz. credit.
const dir = "/archive/sosyal";

export const galleryGroups: GalleryGroup[] = [
  {
    id: "g-2026-10-aosb",
    short: { tr: "AOSB ziyareti", en: "AOSB visit" },
    date: "2026-10-19",
    title: {
      tr: "Adana Hacı Sabancı Organize Sanayi Bölgesi ziyareti",
      en: "Visit to the Adana Hacı Sabancı Organised Industrial Zone",
    },
    caption: {
      tr: "19 Ekim 2026, saat 14.30. Adana Hacı Sabancı Organize Sanayi Bölgesi Yönetim Kurulu Başkanı Bekir Sütçü ziyaret edildi.",
      en: "19 October 2026, 14:30. A visit to Bekir Sütçü, Chair of the Board of the Adana Hacı Sabancı Organised Industrial Zone.",
    },
    images: [
      {
        src: "/archive/faaliyet/2026-10-19-aosb/01.webp",
        alt: {
          tr: "Adana Hacı Sabancı OSB ziyareti, toplu fotoğraf",
          en: "Visit to Adana Hacı Sabancı OSB, group photo",
        },
      },
      {
        src: "/archive/faaliyet/2026-10-19-aosb/02.webp",
        alt: {
          tr: "Adana Hacı Sabancı OSB ziyareti, toplantı",
          en: "Visit to Adana Hacı Sabancı OSB, meeting",
        },
      },
    ],
  },
  {
    id: "g-2026-05-turkonfed",
    short: { tr: "TÜRKONFED ziyareti", en: "TÜRKONFED visit" },
    date: "2026-05-19",
    title: { tr: "TÜRKONFED Başkanı Süleyman Sönmez’e nezaket ziyareti", en: "Courtesy visit to TÜRKONFED Chair Süleyman Sönmez" },
    caption: {
      tr: "ADSİAD ve ÇUKUROVA SİFED Başkanı Vedat Gizer ile yönetim kurulu üyeleri, TÜRKONFED Başkanı Süleyman Sönmez ve yönetim kurulu üyelerini ziyaret etti.",
      en: "ADSİAD and ÇUKUROVA SİFED Chair Vedat Gizer and board members visited TÜRKONFED Chair Süleyman Sönmez and members of the TÜRKONFED board.",
    },
    images: [1, 2, 3, 4, 5].map((n) => ({
      src: `${dir}/2026-05-turkonfed-ziyaret/0${n}.webp`,
      alt: {
        tr: `TÜRKONFED ziyareti, ADSİAD heyeti ve TÜRKONFED yönetimi (${n}/5)`,
        en: `TÜRKONFED visit, the ADSİAD delegation and the TÜRKONFED board (${n}/5)`,
      },
    })),
    source: "https://www.instagram.com/p/DYg-Rtkguae/",
    href: "/gundem/turkonfed-baskani-suleyman-sonmez-nezaket-ziyareti",
  },
  {
    id: "g-2026-05-tusiad",
    short: { tr: "TÜSİAD ziyareti", en: "TÜSİAD visit" },
    date: "2026-05-13",
    title: { tr: "TÜSİAD Başkanı Ozan Diren’e tebrik ziyareti", en: "Congratulatory visit to TÜSİAD Chair Ozan Diren" },
    caption: {
      tr: "Başkan Vedat Gizer ve yönetim kurulu, TÜSİAD Başkanı seçilen Ozan Diren’i yeni görevinde tebrik etti.",
      en: "Chair Vedat Gizer and the board congratulated Ozan Diren on his election as Chair of TÜSİAD.",
    },
    images: [
      { src: `${dir}/2026-05-tusiad-ozan-diren/01.webp`, alt: { tr: "TÜSİAD ziyaretinde Atatürk portresi takdimi", en: "Presentation of an Atatürk portrait during the TÜSİAD visit" } },
      { src: `${dir}/2026-05-tusiad-ozan-diren/02.webp`, alt: { tr: "ADSİAD yönetim kurulu ve TÜSİAD Başkanı Ozan Diren, toplu fotoğraf", en: "The ADSİAD board with TÜSİAD Chair Ozan Diren, group photo" } },
      { src: `${dir}/2026-05-tusiad-ozan-diren/03.webp`, alt: { tr: "TÜSİAD ziyareti, toplu fotoğraf", en: "TÜSİAD visit, group photo" } },
      { src: `${dir}/2026-05-tusiad-ozan-diren/04.webp`, alt: { tr: "TÜSİAD ziyareti, ADSİAD heyeti", en: "TÜSİAD visit, the ADSİAD delegation" } },
    ],
    source: "https://www.instagram.com/p/DYSqdryERsT/",
    href: "/gundem/tusiad-baskani-ozan-diren-tebrik-ziyareti",
  },
  {
    id: "g-2026-04-ayca-celik",
    short: { tr: "Yeni üye", en: "New member" },
    date: "2026-04-09",
    title: { tr: "Yeni üyemiz Ayça Çelik, Kimtex Tekstil", en: "New member Ayça Çelik, Kimtex Tekstil" },
    caption: {
      tr: "Kimtex Tekstil Yönetim Kurulu Üyesi Ayça Çelik ADSİAD’a katıldı. Adana Hacı Sabancı OSB.",
      en: "Kimtex Tekstil Board Member Ayça Çelik joined ADSİAD. Adana Hacı Sabancı Organised Industrial Zone.",
    },
    images: [
      { src: `${dir}/2026-04-ayca-celik/01.webp`, alt: { tr: "Ayça Çelik ve ADSİAD yönetim kurulu üyeleri, Kimtex Tekstil önünde", en: "Ayça Çelik with ADSİAD board members in front of Kimtex Tekstil" } },
    ],
    source: "https://www.instagram.com/p/DW5x9nhgiHC/",
    href: "/gundem/yeni-uyemiz-ayca-celik",
  },
  {
    id: "g-2026-02-liderlik",
    short: { tr: "Akademi semineri", en: "Academy seminar" },
    date: "2026-02-17",
    title: { tr: "Patronluktan Liderliğe Geçiş semineri", en: "From Boss to Leader seminar" },
    caption: {
      tr: "Caner Palandökenler moderatörlüğünde, 17 Şubat 2026, Adana Sanayi Odası.",
      en: "Moderated by Caner Palandökenler, 17 February 2026, Adana Chamber of Industry.",
    },
    images: [
      { src: `${dir}/2026-02-patronluktan-liderlige/01.webp`, alt: { tr: "Patronluktan Liderliğe Geçiş semineri afişi", en: "Poster for the From Boss to Leader seminar" } },
    ],
    source: "https://www.instagram.com/p/DUkgBEtggeL/",
    href: "/faaliyetler/akademi",
  },
  {
    id: "g-2026-02-ikiz",
    short: { tr: "İkiz Dönüşüm", en: "Twin Transition" },
    date: "2026-02-05",
    title: { tr: "İkiz Dönüşümde Yeni Ufuklar, Adana", en: "New Horizons in the Twin Transition, Adana" },
    caption: {
      tr: "TÜRKONFED ve Garanti BBVA iş birliğinde, ÇUKUROVA SİFED ev sahipliğinde; davetiye ve program.",
      en: "Run by TÜRKONFED with Garanti BBVA and hosted by ÇUKUROVA SİFED; invitation and programme.",
    },
    images: [
      { src: `${dir}/2026-02-ikiz-donusum/01.webp`, alt: { tr: "İkiz Dönüşümde Yeni Ufuklar Adana etkinliği davetiyesi", en: "Invitation to the New Horizons in the Twin Transition Adana event" } },
      { src: `${dir}/2026-02-ikiz-donusum/02.webp`, alt: { tr: "Program: açılış konuşmaları, Vedat Gizer ve Haluk Bekmez", en: "Programme: opening speeches by Vedat Gizer and Haluk Bekmez" } },
      { src: `${dir}/2026-02-ikiz-donusum/03.webp`, alt: { tr: "Program: İkiz Dönüşüm Vizyon Oturumu", en: "Programme: Twin Transition Vision Session" } },
      { src: `${dir}/2026-02-ikiz-donusum/04.webp`, alt: { tr: "Program: Üretimden Finansmana Yeşil Dönem Paneli", en: "Programme: From Production to Finance, the Green Era panel" } },
      { src: `${dir}/2026-02-ikiz-donusum/05.webp`, alt: { tr: "Program: Ivy Decarb Marketplace oturumu", en: "Programme: Ivy Decarb Marketplace session" } },
      { src: `${dir}/2026-02-ikiz-donusum/06.webp`, alt: { tr: "Program: Dijital Bankacılık Çözümleriyle Dönüşen İş Dünyası Paneli", en: "Programme: Business Transformed by Digital Banking Solutions panel" } },
    ],
    source: "https://www.instagram.com/p/DUP0G3yAqw1/",
    href: "/gundem/ikiz-donusumde-yeni-ufuklar-adana",
  },
  {
    id: "g-2026-01-yesil",
    short: { tr: "Yeşil Dönüşüm", en: "Green Transition" },
    date: "2026-01-13",
    title: { tr: "Adana Yeşil Dönüşüm Paneli ve Çalıştayı", en: "Adana Green Transition Panel and Workshop" },
    caption: {
      tr: "13–14 Ocak 2026, Çukurova Kalkınma Ajansı. Adana Yeşil Dönüşüm Koordinasyon Merkezi projesi.",
      en: "13–14 January 2026, Çukurova Development Agency. Adana Green Transition Coordination Centre project.",
    },
    images: [
      { src: `${dir}/2026-01-yesil-donusum/sonmez-01.webp`, alt: { tr: "Yeşil Dönüşüm Paneli açılışı, protokol toplu fotoğrafı", en: "Opening of the Green Transition Panel, group photo of the guests" } },
      { src: `${dir}/2026-01-yesil-donusum/sonmez-02.webp`, alt: { tr: "Yeşil Dönüşüm Paneli açılışında kürsüden konuşma", en: "A speech from the podium at the opening of the Green Transition Panel" } },
      { src: `${dir}/2026-01-yesil-donusum/turkonfed-01.webp`, alt: { tr: "“Adana’da Yeşil Dönüşümü Konuştuk”, açılış ve protokol", en: "“We discussed the green transition in Adana”, opening and guests" } },
      { src: `${dir}/2026-01-yesil-donusum/turkonfed-02.webp`, alt: { tr: "“Adana’da Yeşil Dönüşümü Konuştuk”, salondan kareler", en: "“We discussed the green transition in Adana”, views of the hall" } },
      { src: `${dir}/2026-01-yesil-donusum/reel-kapak.webp`, alt: { tr: "Çalıştay oturumu, katılımcılar masa başında (video kapağı)", en: "Workshop session, participants at the tables (video still)" } },
    ],
    credit: {
      tr: "İlk dört fotoğraf Süleyman Sönmez ve TÜRKONFED’in ADSİAD ile ortak paylaşımlarındandır.",
      en: "The first four photos come from joint posts by Süleyman Sönmez and TÜRKONFED with ADSİAD.",
    },
    source: "https://www.instagram.com/p/DTc3UkGiHCg/",
    video: "https://www.instagram.com/reel/DTe7cMnAmEw/",
    href: "/gundem/adana-yesil-donusum-paneli-ve-calistayi",
  },
  {
    id: "g-2025-10-akalin",
    short: { tr: "Sohbet toplantısı", en: "Conversation meeting" },
    date: "2025-10-21",
    title: {
      tr: "Ekim ayı sohbet toplantısı",
      en: "October conversation meeting",
    },
    caption: {
      tr: "21 Ekim 2025. Akalın Yaşam Merkezi’nde sohbet toplantısı. Yüksek İstişare Kurulu üyesi ve merkezin kurucusu Mustafa Akalın ile ekibine misafirperverlikleri için teşekkür edildi.",
      en: "21 October 2025. Conversation meeting at Akalın Yaşam Merkezi. Thanks were given to Mustafa Akalın, member of the High Advisory Board and founder of the centre, and to his team for their hospitality.",
    },
    images: [
      {
        src: "/archive/faaliyet/2025-10-21-akalin-sohbet/01.webp",
        alt: {
          tr: "Ekim ayı sohbet toplantısı, toplu fotoğraf",
          en: "October conversation meeting, group photo",
        },
      },
      {
        src: "/archive/faaliyet/2025-10-21-akalin-sohbet/02.webp",
        alt: {
          tr: "Ekim ayı sohbet toplantısı, toplantı",
          en: "October conversation meeting, the meeting",
        },
      },
    ],
  },
];
