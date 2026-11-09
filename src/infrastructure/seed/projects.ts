import type { Project } from "@/domain/types";

// Yalnızca sitede zaten yer alan, kaynaklı bilgiler. Yeşil Dönüşüm verileri
// projeler sayfasından taşındı (kaynaklar: ADSİAD Instagram, Referans Türk, Gündem Adana).
export const projects: Project[] = [
  {
    slug: "adana-yesil-donusum-koordinasyon-merkezi",
    status: "current",
    period: "2025–2026",
    detail: true,
    title: { tr: "Adana Yeşil Dönüşüm Koordinasyon Merkezi", en: "Adana Green Transition Coordination Centre" },
    lead: {
      tr: "İşletmelerin yeşil dönüşüm süreçlerine rehberlik etmeyi ve sürdürülebilirlik yolunda destek sağlamayı amaçlayan proje.",
      en: "A project that aims to guide businesses through their green transition and support them on the road to sustainability.",
    },
    image: "/archive/sosyal/2026-01-yesil-donusum/sonmez-01.webp",
    imageAlt: { tr: "Yeşil Dönüşüm Paneli açılışı, Ocak 2026", en: "Opening of the Green Transition Panel, January 2026" },
    facts: [
      {
        label: { tr: "Finansman", en: "Funding" },
        value: {
          tr: "Avrupa Birliği tarafından finanse edilen, Birleşmiş Milletler Kalkınma Programı (UNDP) tarafından uygulanan Sivil Katılım Hibe Programı",
          en: "Civic Engagement Grant Programme, financed by the European Union and implemented by the United Nations Development Programme (UNDP)",
        },
      },
      { label: { tr: "Başvuru sahibi", en: "Applicant" }, value: { tr: "ADSİAD", en: "ADSİAD" } },
      {
        label: { tr: "Ortaklar", en: "Partners" },
        value: { tr: "Adana Büyükşehir Belediyesi, Adana Ticaret Odası", en: "Adana Metropolitan Municipality, Adana Chamber of Commerce" },
      },
      {
        label: { tr: "Proje koordinatörü", en: "Project coordinator" },
        value: { tr: "Dr. Öğr. Üyesi Kamuran Öztop", en: "Asst. Prof. Dr. Kamuran Öztop" },
      },
      {
        label: { tr: "Çıktı", en: "Output" },
        value: {
          tr: "Adana’daki teknik uzman açığını kapatmak için 20 kişiye ISO 14064 sera gazı doğrulayıcı eğitimi verildi; katılımcılar sınavda başarılı oldu.",
          en: "To close the gap in technical experts in Adana, 20 people received ISO 14064 greenhouse gas verifier training and passed the exam.",
        },
      },
    ],
    numbers: [
      { value: 20, label: { tr: "ISO 14064 sera gazı doğrulayıcısı yetişti", en: "ISO 14064 greenhouse gas verifiers trained" } },
      { value: 3, label: { tr: "kurumlu ortaklık: ADSİAD, ABB, ATO", en: "partner institutions: ADSİAD, ABB, ATO" } },
    ],
    timeline: [
      {
        when: { tr: "Ocak 2025", en: "January 2025" },
        what: {
          tr: "Lansman toplantısı. ABB, TÜSİAD, TÜRKONFED, Adana OSB ve ATO başkanları ile Çukurova Üniversitesi ve Alparslan Türkeş Üniversitesi rektörleri katıldı.",
          en: "Launch meeting, attended by the heads of Adana Metropolitan Municipality, TÜSİAD, TÜRKONFED, Adana Organised Industrial Zone and the Adana Chamber of Commerce, and the rectors of Çukurova University and Alparslan Türkeş University.",
        },
        source: "https://www.instagram.com/p/DFSMVpjuNZW/",
      },
      {
        when: { tr: "Şubat 2025", en: "February 2025" },
        what: {
          tr: "Yeşil dönüşümün iş dünyasına etkileri ve proje ayrıntılarının paylaşıldığı bilgilendirme toplantısı, Adana Hacı Sabancı OSB.",
          en: "Briefing on the effects of the green transition on business and on the project, at Adana Hacı Sabancı Organised Industrial Zone.",
        },
        source: "https://www.instagram.com/p/DGAZIoVOiHM/",
      },
      {
        when: { tr: "13–14 Ocak 2026", en: "13–14 January 2026" },
        what: {
          tr: "Adana’nın Yeşil Dönüşüm Yol Haritası Paneli ve Yerel İklim Değişikliği Eylem Planı Hazırlık Çalıştayı, Çukurova Kalkınma Ajansı.",
          en: "Adana Green Transition Roadmap Panel and Local Climate Change Action Plan Preparatory Workshop, Çukurova Development Agency.",
        },
        source: "https://www.instagram.com/reel/DTe7cMnAmEw/",
      },
    ],
    galleryId: "g-2026-01-yesil",
    related: [
      { href: "/gundem/adana-yesil-donusum-paneli-ve-calistayi", label: { tr: "Panel ve çalıştay haberi", en: "Panel and workshop news" } },
      { href: "/faaliyetler/takvim", label: { tr: "Takvimde: 13–14 Ocak 2026", en: "In the calendar: 13–14 January 2026" } },
    ],
    sources: [
      { href: "https://www.referansturk.com.tr/haber/27217934/adananin-yesil-donusum-yol-haritasi-masaya-yatiriliyor", label: "Referans Türk" },
      { href: "https://www.gundemadana.com/adana-yesil-donusumde-turkiye-liderligine-aday/", label: "Gündem Adana" },
    ],
  },
  {
    slug: "adananin-gelinleri",
    status: "archive",
    period: "2018",
    detail: true,
    title: { tr: "Adana’nın Gelinleri", en: "Adana’s Brides" },
    lead: {
      tr: "Eski sitede adı geçen imza proje. Portakal Çiçeği Karnavalı kortejinde, yaklaşık 100 bin kişiyle.",
      en: "Named on the old site. Walked the Orange Blossom Carnival with ~100,000 people.",
    },
    image: "/archive/promo/adana-gelinleri.jpg",
    imageAlt: { tr: "Adana’nın Gelinleri, Portakal Çiçeği Karnavalı", en: "Adana’s Brides at the Orange Blossom Carnival" },
    facts: [
      { label: { tr: "Tarih", en: "Date" }, value: { tr: "14 Nisan 2018", en: "14 April 2018" } },
      {
        label: { tr: "Etkinlik", en: "Event" },
        value: {
          tr: "Adana’da üçüncüsü düzenlenen Portakal Çiçeği Karnavalı korteji",
          en: "The cortege of the third Orange Blossom Carnival in Adana",
        },
      },
      { label: { tr: "Kent hattı", en: "Civic line" }, value: { tr: "Adana’yı Seviyorum", en: "I Love Adana" } },
    ],
    numbers: [{ value: 100, label: { tr: "bin kişilik karnaval (yaklaşık)", en: "thousand people at the carnival (approx.)" } }],
    related: [{ href: "/gundem/adananin-gelinleri", label: { tr: "Haberi oku", en: "Read the story" } }],
  },
  {
    slug: "adanayi-seviyorum",
    status: "archive",
    period: "2018",
    detail: false,
    href: "/faaliyetler/projeler/adananin-gelinleri",
    title: { tr: "Adana’yı Seviyorum", en: "I Love Adana" },
    lead: {
      tr: "Gelinler’i karnaval kortejine taşıyan kent hattı.",
      en: "The civic line that carried Adana’s Brides into the carnival cortege.",
    },
  },
  {
    slug: "taider-kuzey-yildizi",
    status: "archive",
    period: "2018",
    detail: true,
    title: { tr: "TAİDER Kuzey Yıldızı — aile şirketlerinde sürdürülebilirlik", en: "TAİDER North Star — sustainability in family firms" },
    lead: {
      tr: "ADSİAD, Aile İşletmeleri Derneği (TAİDER) ile birlikte ‘Aile Şirketlerinde Sürdürülebilirlik’ konulu toplantı düzenledi.",
      en: "ADSİAD hosted a family-business sustainability meeting with TAİDER.",
    },
    image: "/archive/promo/523_adsiad-taider_aile_isletmeleri_14.jpg",
    imageAlt: { tr: "TAİDER Kuzey Yıldızı toplantısı", en: "TAİDER North Star meeting" },
    facts: [
      { label: { tr: "Tarih", en: "Date" }, value: { tr: "21 Eylül 2018", en: "21 September 2018" } },
      { label: { tr: "Ortak", en: "Partner" }, value: { tr: "Aile İşletmeleri Derneği (TAİDER)", en: "Family Business Association (TAİDER)" } },
    ],
    related: [{ href: "/gundem/kuzey-yildizi", label: { tr: "Duyuruyu oku", en: "Read the announcement" } }],
  },
  {
    slug: "adsiad-akademi",
    status: "archive",
    period: "",
    detail: false,
    href: "/faaliyetler/akademi",
    title: { tr: "ADSİAD Akademi", en: "ADSİAD Academy" },
    lead: {
      tr: "Tarım modelleri, TAİDER ile aile şirketleri, kente açık liderlik.",
      en: "Agricultural models, family firms with TAİDER, leadership opened to the city.",
    },
    image: "/archive/sosyal/2026-02-patronluktan-liderlige/01.webp",
    imageAlt: { tr: "Patronluktan Liderliğe Geçiş semineri afişi", en: "Poster of the From Boss to Leader seminar" },
  },
  {
    slug: "cukurova-sifed-turkonfed",
    status: "archive",
    period: "",
    detail: false,
    title: { tr: "ÇUKUROVA SİFED / TÜRKONFED", en: "ÇUKUROVA SİFED / TÜRKONFED" },
    lead: {
      tr: "Bölge ve ülke çatısı: Adana’nın konfederasyondaki sesi.",
      en: "The regional and national roof: Adana’s voice in the confederation.",
    },
  },
];
