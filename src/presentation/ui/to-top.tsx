"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/** Round control, shown once the page has moved. Click returns to the top. */
export function ToTop() {
  const t = useTranslations("common");
  const [on, setOn] = useState(false);

  useEffect(() => {
    let shown = false;
    const onScroll = () => {
      const next = window.scrollY > 520;
      if (next === shown) return;
      shown = next;
      setOn(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!on) return null;

  return (
    <button
      type="button"
      aria-label={t("toTop")}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid size-12 place-items-center rounded-full bg-white text-[#6b6b6b] shadow-[0_8px_18px_-8px_rgba(12,12,12,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red dark:bg-[#1a1a1a] dark:text-[#d5d0c6]"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
