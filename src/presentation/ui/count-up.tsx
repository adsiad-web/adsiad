"use client";

import { useEffect, useRef } from "react";

/**
 * Renders the real number on the server and without JS. The count-up animation
 * only runs when the figure starts below the fold and later scrolls into view;
 * if it is already visible (or scrolled past) or motion is reduced, the final
 * value simply stays.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    let frame = 0;
    node.textContent = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1100;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          node.textContent = String(Math.round(eased * value));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = String(value);
    };
  }, [value]);

  return (
    <span ref={ref} aria-label={String(value)}>
      {value}
    </span>
  );
}
