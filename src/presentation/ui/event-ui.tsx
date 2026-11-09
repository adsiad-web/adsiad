import type { EventItem } from "@/domain/types";
import { cn, formatDate, loc } from "./cn";

export const kindLabel: Record<EventItem["kind"], { tr: string; en: string }> = {
  sali: { tr: "Salı", en: "Tuesday" },
  akademi: { tr: "Akademi", en: "Academy" },
  proje: { tr: "Proje", en: "Project" },
  diger: { tr: "Etkinlik", en: "Event" },
};

/** Dot style per type: filled ink, filled red, hollow red, hollow ink. */
const dot: Record<EventItem["kind"], string> = {
  sali: "bg-[var(--fg)]",
  akademi: "bg-red",
  proje: "border-2 border-red",
  diger: "border-2 border-[var(--fg)]",
};

export function KindTag({ kind, locale, className }: { kind: EventItem["kind"]; locale: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[0.64rem] font-medium uppercase tracking-[0.2em]", className)}>
      <span aria-hidden className={cn("h-2 w-2 rounded-full", dot[kind])} />
      {kindLabel[kind][locale === "en" ? "en" : "tr"]}
    </span>
  );
}

export type BadgeParts = { month: string; day: string; weekday: string; year: string; full: string };

/** Computed on the server so client components get stable strings. */
export function badgeParts(iso: string, locale: string): BadgeParts {
  const bits = iso.split("-");
  const y = Number(bits[0]);
  const m = Number(bits[1]);
  const hasDay = bits.length >= 3 && bits[2] !== "";
  const d = hasDay ? Number(bits[2]) : 1;
  const date = new Date(y, (m ?? 1) - 1, d);
  const tag = locale === "en" ? "en-GB" : "tr-TR";
  return {
    month: new Intl.DateTimeFormat(tag, { month: "short" }).format(date).replace(".", ""),
    day: hasDay ? String(d) : "",
    weekday: hasDay ? new Intl.DateTimeFormat(tag, { weekday: "short" }).format(date).replace(".", "") : "",
    year: String(y),
    full: formatDate(iso, locale),
  };
}

export function DateBadge({ parts, size = "md" }: { parts: BadgeParts; size?: "md" | "sm" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 flex-col border border-[var(--fg)] bg-[var(--bg)] text-center",
        size === "md" ? "w-[4.25rem] sm:w-[4.75rem]" : "w-14",
      )}
    >
      <span className="sr-only">{parts.full}</span>
      <span aria-hidden className="bg-[var(--fg)] py-1 text-[0.6rem] uppercase tracking-[0.2em] text-[var(--bg)]">
        {parts.month}
      </span>
      <span aria-hidden className={cn("font-serif leading-none", size === "md" ? "pb-1 pt-2 text-[2rem] sm:text-[2.2rem]" : "py-1.5 text-2xl", !parts.day && "text-[1.05rem] sm:text-[1.15rem]")}>
        {parts.day || parts.year}
      </span>
      {size === "md" && parts.weekday ? (
        <span aria-hidden className="pb-1.5 text-[0.58rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          {parts.weekday}
        </span>
      ) : null}
    </span>
  );
}

/** Serializable event for client components. */
export type EventView = {
  id: string;
  kind: EventItem["kind"];
  year: string;
  badge: BadgeParts;
  title: string;
  excerpt: string;
  speaker?: string;
  venue?: string;
  image?: string;
  href?: string;
  source?: string;
};

export function toEventView(e: EventItem, locale: string): EventView {
  return {
    id: e.id,
    kind: e.kind,
    year: e.date.slice(0, 4),
    badge: badgeParts(e.date, locale),
    title: loc(e.title, locale),
    excerpt: loc(e.excerpt, locale),
    speaker: e.speaker ? loc(e.speaker, locale) : undefined,
    venue: e.venue ? loc(e.venue, locale) : undefined,
    image: e.image,
    href: e.href,
    source: e.source,
  };
}
