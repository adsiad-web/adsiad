"use client";

import { useState } from "react";

const notes: Record<number, { tr: string; en: string }> = {
  1991: {
    tr: "Adana’nın üreten insanlarını aynı çatıda toplamak üzere kuruldu.",
    en: "Founded to gather Adana’s producers under one roof.",
  },
  2015: {
    tr: "Başkan Sönmez, Öğretmenler Günü’nde Doğa Koleji öğrencilerini ofisinde ağırladı.",
    en: "Chair Sönmez hosted Doğa College pupils on Teachers’ Day.",
  },
  2016: {
    tr: "25 Mayıs genel kurulunda Süleyman Sönmez oybirliğiyle yeniden başkan seçildi.",
    en: "On 25 May Süleyman Sönmez was re-elected chair unanimously.",
  },
  2018: {
    tr: "Olağan genel kurulda Süleyman Sönmez güven tazeledi. Akademi’nin halka açılması dönemin cümlesi oldu.",
    en: "Süleyman Sönmez was confirmed. Opening the Academy became the line of the term.",
  },
  2026: {
    tr: "35. yıl, bu birikimin mührüdür.",
    en: "The 35th year is the seal of that accumulation.",
  },
};

const decades = [
  { label: "1991–1999", years: [1991] },
  { label: "2000–2009", years: [] as number[] },
  { label: "2010–2019", years: [2015, 2016, 2018] },
  { label: "2020–2026", years: [2026] },
];

const years = Array.from({ length: 36 }, (_, index) => 1991 + index);

export function YearRecord({ locale }: { locale: "tr" | "en" }) {
  const [active, setActive] = useState(2026);
  const sentence = notes[active]?.[locale] ?? "";
  const unpublished =
    locale === "en"
      ? "This decade was not published year by year on the previous site."
      : "Bu on yıl eski sitede yıl yıl yayımlanmamıştı.";

  return (
    <div className="mx-auto max-w-7xl px-5 pt-14 lg:px-8">
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-red">1991 — 2026</p>
      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="grid grid-cols-6 gap-px bg-[var(--line)] sm:grid-cols-9">
          {years.map((year) => {
            const noted = Boolean(notes[year]);
            const on = year === active;
            const className = `bg-[var(--bg)] px-1 py-3 text-center text-sm tabular-nums ${
              on ? "text-red" : noted ? "text-[var(--fg)]" : "text-[var(--muted)]"
            }`;
            if (!noted) {
              return (
                <span key={year} className={className}>
                  {year}
                </span>
              );
            }
            return (
              <button
                key={year}
                type="button"
                className={className}
                onMouseEnter={() => setActive(year)}
                onFocus={() => setActive(year)}
                onClick={() => setActive(year)}
              >
                {year}
              </button>
            );
          })}
        </div>
        <p className="font-serif text-3xl leading-snug text-[var(--fg)] lg:sticky lg:top-28 lg:text-4xl">
          <span className="mb-3 block text-[0.7rem] uppercase tracking-[0.18em] text-red">{active}</span>
          {sentence}
        </p>
      </div>

      <div className="mt-10 border-t border-[var(--line)]">
        {decades.map((decade) => (
          <details key={decade.label} className="border-b border-[var(--line)]">
            <summary className="flex cursor-pointer list-none items-baseline justify-between py-5 font-serif text-3xl tracking-tight md:text-4xl">
              {decade.label}
              <span className="text-sm text-[var(--muted)]">+</span>
            </summary>
            <div className="max-w-2xl space-y-4 pb-6">
              {decade.years.length === 0 ? (
                <p className="text-sm leading-7 text-[var(--muted)]">{unpublished}</p>
              ) : (
                decade.years.map((year) => (
                  <p key={year} className="leading-7">
                    <span className="mr-3 text-[0.68rem] uppercase tracking-[0.16em] text-red">{year}</span>
                    {notes[year][locale]}
                  </p>
                ))
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
