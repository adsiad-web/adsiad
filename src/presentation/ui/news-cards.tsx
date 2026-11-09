import { Link } from "@/i18n/navigation";
import type { NewsItem } from "@/domain/types";
import { cn, formatDate, loc } from "./cn";

export const newsKindLabel: Record<NewsItem["kind"], { tr: string; en: string }> = {
  haber: { tr: "Haber", en: "News" },
  duyuru: { tr: "Duyuru", en: "Announcement" },
  uye: { tr: "Yeni üye", en: "New member" },
  basin: { tr: "Basın", en: "Press" },
  ilan: { tr: "İlan", en: "Notice" },
};

export function NewsTag({ kind, locale }: { kind: NewsItem["kind"]; locale: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em]",
        kind === "haber" ? "bg-[var(--fg)] text-[var(--bg)]" : "bg-red text-white",
      )}
    >
      {newsKindLabel[kind][locale === "en" ? "en" : "tr"]}
    </span>
  );
}

function Meta({ item, locale, tag = true }: { item: NewsItem; locale: string; tag?: boolean }) {
  return (
    <p className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
      {tag ? <NewsTag kind={item.kind} locale={locale} /> : null}
      <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
    </p>
  );
}

function Photo({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  if (!src) return null;
  // Framed tile: posters and portraits are never cropped; a blurred copy fills the frame.
  return (
    <span className={cn("relative block w-full overflow-hidden rounded-2xl bg-ink ring-1 ring-[var(--line)]", className)}>
      <img src={src} alt="" aria-hidden loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl" />
      <img src={src} alt={alt} loading="lazy" decoding="async" className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]" />
    </span>
  );
}

/** Large lead story for magazine layouts. */
export function FeatureStory({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <article>
      <Link href={`/gundem/${item.slug}`} className="group block">
        <Photo src={item.image} alt={loc(item.title, locale)} className="aspect-[16/11]" />
        <div className="mt-5">
          <Meta item={item} locale={locale} />
          <h2 className="mt-3 text-balance break-words font-serif text-[1.9rem] leading-[1.04] transition-colors group-hover:text-red sm:text-[2.4rem] lg:text-[3rem]">
            {loc(item.title, locale)}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">{loc(item.excerpt, locale)}</p>
        </div>
      </Link>
    </article>
  );
}

/** Image card; `side` is the compact variant next to a feature story. */
export function StoryCard({ item, locale, variant = "card" }: { item: NewsItem; locale: string; variant?: "card" | "side" }) {
  const side = variant === "side";
  return (
    <article className={cn(side && "border-b border-[var(--line)] pb-6 last:border-0 last:pb-0")}>
      <Link href={`/gundem/${item.slug}`} className={cn("group grid gap-4", side && "grid-cols-[7rem_1fr] sm:grid-cols-1 lg:grid-cols-1")}>
        <Photo src={item.image} alt={loc(item.title, locale)} className={side ? "aspect-[4/3]" : "aspect-[4/3]"} />
        <div className="min-w-0">
          <Meta item={item} locale={locale} />
          <h3 className={cn("mt-2 text-balance break-words font-serif leading-[1.15] transition-colors group-hover:text-red", side ? "text-[1.2rem] sm:text-[1.45rem]" : "text-[1.3rem]")}>
            {loc(item.title, locale)}
          </h3>
          {!side ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{loc(item.excerpt, locale)}</p> : null}
        </div>
      </Link>
    </article>
  );
}

/** Text-only row for archives. */
export function CompactRow({ item, locale }: { item: NewsItem; locale: string }) {
  return (
    <li className="border-b border-[var(--line)]">
      <Link href={`/gundem/${item.slug}`} className="group grid min-h-11 gap-1 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6">
        <time dateTime={item.date} className="text-[0.68rem] uppercase tracking-[0.16em] text-[var(--muted)]">
          {formatDate(item.date, locale)}
        </time>
        <span className="break-words font-serif text-[1.15rem] leading-snug transition-colors group-hover:text-red">{loc(item.title, locale)}</span>
        <span className="hidden text-[0.64rem] uppercase tracking-[0.16em] text-[var(--muted)] sm:inline">
          {newsKindLabel[item.kind][locale === "en" ? "en" : "tr"]}
        </span>
      </Link>
    </li>
  );
}

/** Notice-board row: date block, pills, title and one line. No image. */
export function NoticeRow({ item, locale, compact = false, spread = false }: { item: NewsItem; locale: string; compact?: boolean; spread?: boolean }) {
  const en = locale === "en";
  const [y, m, d] = item.date.split("-").map(Number);
  const month = new Intl.DateTimeFormat(en ? "en-GB" : "tr-TR", { month: "short" }).format(new Date(y, m - 1, d)).replace(".", "");
  return (
    <li className="border-b border-[var(--line)] last:border-0">
      <Link
        href={`/gundem/${item.slug}`}
        className={cn(
          "group grid grid-cols-[3.75rem_1fr] items-start gap-4 sm:gap-6",
          compact && "py-4",
          !compact && !spread && "py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:py-6",
          spread && "py-4 sm:grid-cols-[4.5rem_minmax(0,1.15fr)_minmax(12rem,0.85fr)] sm:gap-x-10 sm:py-5",
        )}
      >
        <time dateTime={item.date} className="flex flex-col items-center border-l-2 border-red py-1 leading-none">
          <span className="font-serif text-[1.9rem]">{d}</span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-[var(--muted)]">
            {month} {y}
          </span>
        </time>
        <span className="min-w-0">
          <span className="flex flex-wrap gap-2">
            <NewsTag kind={item.kind} locale={locale} />
          </span>
          <span className={cn("mt-2 block text-balance break-words font-serif leading-snug transition-colors group-hover:text-red", compact ? "text-[1.1rem]" : "text-[1.3rem] sm:text-[1.5rem]")}>
            {loc(item.title, locale)}
          </span>
          {!compact && !spread ? <span className="mt-1 block line-clamp-2 text-sm leading-6 text-[var(--muted)]">{loc(item.excerpt, locale)}</span> : null}
        </span>
        {spread ? <span className="col-start-2 line-clamp-2 text-sm leading-5 text-[var(--muted)] sm:col-start-auto sm:self-end">{loc(item.excerpt, locale)}</span> : null}
        {!compact && !spread ? (
          <span aria-hidden className="hidden self-center text-sm text-red transition-transform group-hover:translate-x-1 sm:inline">
            {en ? "Read →" : "Oku →"}
          </span>
        ) : null}
      </Link>
    </li>
  );
}
