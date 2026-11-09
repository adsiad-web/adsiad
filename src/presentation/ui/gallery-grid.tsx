"use client";

import { useState } from "react";
import { cn } from "./cn";
import { Lightbox, type Photo } from "./lightbox";
import { pillCls, pillOff, pillOn } from "./pill";

export type PhotoGroup = { id: string; label: string; photos: Photo[] };

/** Round-robin across groups so the "all" view mixes events. */
function interleave(groups: PhotoGroup[]): Photo[] {
  const queues = groups.map((g) => [...g.photos]);
  const out: Photo[] = [];
  while (queues.some((q) => q.length)) for (const q of queues) if (q.length) out.push(q.shift()!);
  return out;
}

/** Masonry grid with event filters and a keyboard-accessible lightbox. */
export function GalleryGrid({ groups, locale }: { groups: PhotoGroup[]; locale: string }) {
  const en = locale === "en";
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const photos = filter === "all" ? interleave(groups) : (groups.find((g) => g.id === filter)?.photos ?? []);
  const total = groups.reduce((n, g) => n + g.photos.length, 0);
  const videos = groups.filter((g) => g.photos.some((p) => p.video)).length;
  return (
    <>
      <div className="sticky top-[4.3125rem] z-10 -mx-5 border-b border-[var(--line)] bg-[var(--bg)] px-5 py-3 sm:top-[4.8rem] lg:top-[5.3rem] lg:mx-0 lg:px-0">
        <div className="flex items-center justify-between gap-4">
          <div role="group" aria-label={en ? "Filter by event" : "Etkinliğe göre süz"} className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
            {[{ id: "all", label: en ? "All" : "Tümü", n: total }, ...groups.map((g) => ({ id: g.id, label: g.label, n: g.photos.length }))].map((o) => (
              <button
                key={o.id}
                type="button"
                aria-pressed={filter === o.id}
                onClick={() => setFilter(o.id)}
                className={cn(pillCls, filter === o.id ? pillOn : pillOff)}
              >
                {o.label}
                <span className="opacity-60">{o.n}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="hidden shrink-0 text-sm text-[var(--muted)] lg:block">
            {en ? `${photos.length} photos` : `${photos.length} fotoğraf`}
            {videos ? (en ? ` · ${videos} video` : ` · ${videos} video`) : ""}
          </p>
        </div>
      </div>
      <ul className="columns-2 gap-2 pt-5 sm:gap-3 md:columns-3 lg:columns-4 lg:gap-4">
        {photos.map((p, i) => {
          const firstOfGroup = photos.findIndex((q) => q.group === p.group) === i;
          return (
            <li key={p.src} className="mb-2 break-inside-avoid sm:mb-3 lg:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden bg-[var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
                aria-label={`${p.alt}${en ? " — enlarge" : " — büyüt"}`}
              >
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="block h-auto w-full" />
                {p.video ? (
                  <span aria-hidden className="absolute left-2 top-2 bg-red px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-white">
                    ▶ Reel
                  </span>
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-0 flex justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-8 text-left text-[0.7rem] text-[#f3efe6] transition-opacity",
                    firstOfGroup ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  <span className="truncate font-medium">{p.group}</span>
                  <span className="hidden shrink-0 sm:inline">{p.date}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {open !== null ? <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} locale={locale} /> : null}
    </>
  );
}

/** A row of thumbnails that open in the lightbox (articles, projects, archive). */
export function PhotoStrip({ photos, locale, variant = "default" }: { photos: Photo[]; locale: string; variant?: "default" | "archive" }) {
  const en = locale === "en";
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <ul className={cn("grid gap-2 sm:gap-3", variant === "archive" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5")}>
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
              aria-label={`${p.alt}${en ? " — enlarge" : " — büyüt"}`}
            >
              <span className="block aspect-square overflow-hidden bg-[var(--line)]">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className={cn("h-full w-full object-cover", variant === "archive" && "grayscale")}
                />
              </span>
              {variant === "archive" ? <span aria-hidden className="mt-2 block text-xs leading-5 text-[var(--muted)]">{p.alt}</span> : null}
            </button>
          </li>
        ))}
      </ul>
      {open !== null ? <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} locale={locale} /> : null}
    </>
  );
}
