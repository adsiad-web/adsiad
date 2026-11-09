import type { GalleryGroup } from "@/domain/types";
import { formatDate, loc } from "./cn";
import type { Photo } from "./lightbox";
import type { PhotoGroup } from "./gallery-grid";

/** Localized, serializable photos of one gallery group. */
export function groupPhotos(g: GalleryGroup, locale: string): Photo[] {
  return g.images.map((img) => ({
    src: img.src,
    alt: loc(img.alt, locale),
    group: loc(g.short ?? g.title, locale),
    title: loc(g.title, locale),
    date: formatDate(g.date, locale),
    href: g.href,
    source: g.source,
    video: g.video && img.src.includes("reel") ? g.video : undefined,
    credit: g.credit ? loc(g.credit, locale) : undefined,
  }));
}

export function toPhotoGroups(groups: GalleryGroup[], locale: string): PhotoGroup[] {
  return groups.map((g) => ({ id: g.id, label: loc(g.short ?? g.title, locale), photos: groupPhotos(g, locale) }));
}
