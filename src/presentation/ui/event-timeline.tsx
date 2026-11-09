"use client";

import { useState } from "react";
import type { EventItem } from "@/domain/types";
import { cn } from "./cn";
import { kindLabel, type EventView } from "./event-ui";
import { EventRow } from "./event-row";
import { pillCls, pillOff, pillOn } from "./pill";

type Filter = "all" | EventItem["kind"];

/** Past events grouped by year, with type filters. Works without JS (all shown). */
export function EventTimeline({ events, locale }: { events: EventView[]; locale: string }) {
  const en = locale === "en";
  const [filter, setFilter] = useState<Filter>("all");
  const kinds = (["sali", "akademi", "proje", "diger"] as const).filter((k) => events.some((e) => e.kind === k));
  const shown = filter === "all" ? events : events.filter((e) => e.kind === filter);
  const years = [...new Set(shown.map((e) => e.year))];
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: en ? "All" : "Tümü", count: events.length },
    ...kinds.map((k) => ({ id: k, label: kindLabel[k][en ? "en" : "tr"], count: events.filter((e) => e.kind === k).length })),
  ];
  return (
    <section aria-labelledby="timeline-title" className="pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[var(--fg)] pb-4">
        <h2 id="timeline-title" className="font-serif text-[1.9rem] leading-none sm:text-4xl">
          {en ? "Past events" : "Geçmiş etkinlikler"}
        </h2>
        <div role="group" aria-label={en ? "Filter by type" : "Türe göre süz"} className="flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className={cn(pillCls, filter === o.id ? pillOn : pillOff)}
            >
              {o.label}
              <span className="opacity-60">{o.count}</span>
            </button>
          ))}
        </div>
      </div>
      <p aria-live="polite" className="sr-only">
        {en ? `${shown.length} events shown` : `${shown.length} etkinlik gösteriliyor`}
      </p>
      {years.map((y, i) => (
        <div key={y} className="grid gap-2 pt-6 md:grid-cols-[8rem_1fr] md:gap-8 md:pt-8">
          <h3 className={cn("font-serif text-[2.6rem] leading-none md:sticky md:top-28 md:self-start md:text-[3.4rem]", i === 0 ? "text-red" : "text-red/50")}>
            {y}
          </h3>
          <div>
            {shown
              .filter((e) => e.year === y)
              .map((e) => (
                <EventRow key={e.id} event={e} locale={locale} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
