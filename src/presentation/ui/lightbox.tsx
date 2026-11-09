"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";

/** A photo as shown in grids and the lightbox. Strings are already localized. */
export type Photo = {
  src: string;
  alt: string;
  group?: string;
  title?: string;
  date?: string;
  href?: string;
  source?: string;
  video?: string;
  credit?: string;
};

const btn =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-xl! text-white! transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";

/**
 * Modal photo viewer. Esc closes, ←/→ move, Tab stays inside the dialog,
 * and focus returns to the element that opened it.
 */
export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
  locale,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
  locale: string;
}) {
  const en = locale === "en";
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const photo = photos[index];
  const many = photos.length > 1;

  const go = useCallback((step: number) => onIndex((index + step + photos.length) % photos.length), [index, onIndex, photos.length]);

  useEffect(() => {
    opener.current = document.activeElement;
    closeBtn.current?.focus();
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
      if (opener.current instanceof HTMLElement) opener.current.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && many) {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" && many) {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab" && dialog.current) {
        const items = [...dialog.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, many, onClose]);

  if (!photo) return null;
  const linkCls = "inline-flex min-h-11 items-center underline decoration-red decoration-2 underline-offset-4 hover:text-white";

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title ? `${photo.title} — ${en ? "photo viewer" : "fotoğraf görüntüleyici"}` : en ? "Photo viewer" : "Fotoğraf görüntüleyici"}
      className="fixed inset-0 z-[70] grid grid-rows-[auto_1fr_auto] bg-[#070707] text-[#f3efe6]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <p aria-live="polite" className="min-w-0 truncate text-sm opacity-80">
          {many ? `${index + 1} / ${photos.length}` : null}
          {photo.group ? <span className="ml-3 hidden sm:inline">{photo.group}</span> : null}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className={btn} aria-label={en ? "Close (Esc)" : "Kapat (Esc)"}>
          ✕
        </button>
      </div>
      <div className="relative flex min-h-0 items-center justify-center px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={photo.src} src={photo.src} alt={photo.alt} className="max-h-full max-w-full object-contain" />
        {many ? (
          <>
            <button type="button" onClick={() => go(-1)} className={cn(btn, "absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 sm:left-5")} aria-label={en ? "Previous photo" : "Önceki fotoğraf"}>
              ‹
            </button>
            <button type="button" onClick={() => go(1)} className={cn(btn, "absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 sm:right-5")} aria-label={en ? "Next photo" : "Sonraki fotoğraf"}>
              ›
            </button>
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 px-4 pb-4 pt-3 sm:px-6 sm:pb-6">
        <div className="min-w-0 max-w-3xl">
          {photo.title ? <p className="font-serif text-lg leading-snug sm:text-xl">{photo.title}</p> : null}
          <p className="mt-1 text-sm opacity-75">{photo.alt}</p>
          <p className="flex flex-wrap gap-x-5 text-sm">
            {photo.date ? <span className="inline-flex min-h-11 items-center opacity-75">{photo.date}</span> : null}
            {photo.href ? (
              <Link href={photo.href} className={linkCls} onClick={onClose}>
                {en ? "Read the story" : "Haberi oku"}
              </Link>
            ) : null}
            {photo.video ? (
              <a href={photo.video} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {en ? "Watch the video on Instagram" : "Videoyu Instagram’da izle"}
              </a>
            ) : null}
            {photo.source ? (
              <a href={photo.source} target="_blank" rel="noopener noreferrer" className={cn(linkCls, "opacity-75")}>
                {en ? "Source post" : "Kaynak paylaşım"}
              </a>
            ) : null}
          </p>
          {photo.credit ? <p className="text-xs opacity-60">{photo.credit}</p> : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
