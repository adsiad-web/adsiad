export type Locale = "tr" | "en";

export type Localized = {
  tr: string;
  en: string;
};

export type Member = {
  id: string;
  name: string;
  title: string;
  company: string;
  sector: string;
};

export type BoardMember = {
  id: string;
  name: string;
  role: Localized;
  company?: string;
  image?: string;
  board: "yonetim" | "yonetimYedek" | "denetim" | "denetimYedek" | "danisma" | "personel";
};

export type NewsItem = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  body: Localized;
  date: string;
  kind: "haber" | "duyuru" | "uye" | "basin" | "ilan";
  image?: string;
};

export type EventItem = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  date: string;
  kind: "sali" | "akademi" | "proje" | "diger";
  /** Saat ve yer, ör. "16.00 · Adana Sanayi Odası". */
  venue?: Localized;
  image?: string;
  /** İlgili haber veya sayfa (site içi yol). */
  href?: string;
  /** Kaynak gönderi (dış bağlantı). */
  source?: string;
  /** Konuk, konuşmacı veya moderatör. */
  speaker?: Localized;
};

export type GalleryImage = {
  src: string;
  alt: Localized;
};

export type GalleryGroup = {
  id: string;
  date: string;
  title: Localized;
  /** Filtre düğmeleri için kısa ad. */
  short?: Localized;
  caption: Localized;
  images: GalleryImage[];
  /** Fotoğrafların sahibi ADSİAD değilse kısa not. */
  credit?: Localized;
  /** Instagram veya kaynak paylaşım URL’si. Yoksa lightbox’ta kaynak linki çıkmaz. */
  source?: string;
  video?: string;
  href?: string;
};

export type ProjectFact = { label: Localized; value: Localized };

export type Project = {
  slug: string;
  status: "current" | "archive";
  /** Ör. "2025–2026" veya "2018". */
  period: string;
  title: Localized;
  lead: Localized;
  image?: string;
  imageAlt?: Localized;
  /** false ise ayrıntı sayfası yoktur; kart href'e gider. */
  detail: boolean;
  href?: string;
  facts?: ProjectFact[];
  numbers?: { value: number; label: Localized }[];
  timeline?: { when: Localized; what: Localized; source?: string }[];
  /** İlgili galeri grubu kimliği. */
  galleryId?: string;
  related?: { href: string; label: Localized }[];
  sources?: { href: string; label: string }[];
};

export type Inquiry = {
  id: string;
  createdAt: string;
  kind: "contact" | "membership";
  name: string;
  email: string;
  subject?: string;
  company?: string;
  sector?: string;
  phone?: string;
  message: string;
};

export type StaticPage = {
  slug: string;
  title: Localized;
  body: Localized;
};
