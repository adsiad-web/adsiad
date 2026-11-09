import type { Metadata } from "next";
import { pageRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";

export function blurb(text: string, max = 155) {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return `${(last > 80 ? cut.slice(0, last) : cut).replace(/[.,;:–—-]+$/, "")}…`;
}

/** Page title stays short; the layout template appends “— ADSİAD”. */
export function meta(locale: string, title: string, description: string, image?: string): Metadata {
  const descriptionText = blurb(description);
  const full = `${title} — ADSİAD`;
  return {
    title,
    description: descriptionText,
    openGraph: {
      title: full,
      description: descriptionText,
      locale: locale === "en" ? "en_GB" : "tr_TR",
      images: image
        ? [{ url: image, alt: title }]
        : [{ url: "/brand/og.png", width: 1200, height: 630, alt: "ADSİAD — Adana Sanayici ve İş İnsanları Derneği" }],
    },
  };
}

/** Title and the first real paragraph of a seeded static page. */
export function seedMeta(locale: string, slug: string): Metadata {
  const page = pageRepository.bySlug(slug);
  if (!page) return {};
  const parts = loc(page.body, locale)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  const line =
    parts.find((part) => !/^son güncelleme|^last updated/i.test(part) && !/^[A-ZÇĞİÖŞÜ0-9 .’']{3,40}$/.test(part)) ??
    parts[0] ??
    "";
  return meta(locale, loc(page.title, locale), line);
}
