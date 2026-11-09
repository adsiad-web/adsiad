"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "./cn";

const SLATS = 6;

/** Shutter reveal: paper slats lift in a wave once the photo is in view. Transform-only, plays once. */
export function ShutterPhoto({
  src,
  alt,
  className,
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: show the photo as rendered rather than covering it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.7) return;

    el.dataset.shutter = "armed";
    const img = el.querySelector("img");
    const play = () => {
      el.dataset.shutter = "open";
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (!img || img.complete) play();
        else {
          img.addEventListener("load", play, { once: true });
          img.addEventListener("error", play, { once: true });
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      img?.removeEventListener("load", play);
      img?.removeEventListener("error", play);
    };
  }, []);

  return (
    <div ref={ref} className={cn("shutter relative overflow-hidden", className)}>
      <img src={src} alt={alt} className={cn("shutter-img h-full w-full object-cover", imageClassName)} />
      <span aria-hidden className="shutter-slats">
        {Array.from({ length: SLATS }, (_, i) => (
          <span key={i} className="shutter-slat" style={{ "--i": i } as CSSProperties} />
        ))}
      </span>
    </div>
  );
}
