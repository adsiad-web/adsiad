import { Link } from "@/i18n/navigation";
import { cn } from "./cn";
import { DateBadge, KindTag, type EventView } from "./event-ui";

const linkCls =
  "inline-flex min-h-11 items-center underline decoration-red decoration-2 underline-offset-4 hover:text-red sm:min-h-0";

/** One dated entry of the calendar timeline (also used on the hub and Salı pages). */
export function EventRow({ event, locale, headingLevel = 3 }: { event: EventView; locale: string; headingLevel?: 2 | 3 }) {
  const en = locale === "en";
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 border-b border-[var(--line)] py-6 sm:gap-x-6 md:grid-cols-[auto_1fr_13rem] md:py-7">
      {event.image ? (
        <span className="reveal-frame col-span-2 block rounded-2xl aspect-[16/9] overflow-hidden bg-[var(--line)] md:order-3 md:col-span-1 md:aspect-[4/3]">
          <img src={event.image} alt={event.title} loading="lazy" decoding="async" className="reveal-photo h-full w-full object-cover object-top" />
        </span>
      ) : null}
      <span className="self-start"><DateBadge parts={event.badge} /></span>
      <div className={cn("min-w-0", !event.image && "md:col-span-2")}>
        <KindTag kind={event.kind} locale={locale} />
        <H className="mt-2 text-balance break-words font-serif text-[1.35rem] leading-[1.15] sm:text-[1.65rem]">{event.title}</H>
        {event.speaker ? (
          <p className="mt-2 text-sm">
            <span className="text-[var(--muted)]">{en ? "Speaker: " : "Konuk: "}</span>
            {event.speaker}
          </p>
        ) : null}
        {event.venue ? <p className="mt-1 text-sm text-[var(--muted)]">{event.venue}</p> : null}
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-[var(--muted)]">{event.excerpt}</p>
        {event.href || event.source ? (
          <p className="mt-2 flex flex-wrap gap-x-6 text-sm">
            {event.href ? (
              <Link href={event.href} className={linkCls}>
                {en ? "Details" : "Ayrıntılar"}
                <span className="sr-only">: {event.title}</span>
              </Link>
            ) : null}
            {event.source ? (
              <a href={event.source} target="_blank" rel="noopener noreferrer" className={cn(linkCls, "text-[var(--muted)] decoration-1")}>
                {en ? "Source post" : "Kaynak paylaşım"}
                <span className="sr-only"> ({en ? "opens in a new tab" : "yeni sekmede açılır"})</span>
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  );
}
