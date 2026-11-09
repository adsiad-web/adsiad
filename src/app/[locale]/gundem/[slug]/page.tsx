import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { eventRepository, galleryRepository, newsRepository } from "@/infrastructure/repositories/catalog";
import { formatDate, loc } from "@/presentation/ui/cn";
import { PageIntro, Prose } from "@/presentation/ui/page-intro";
import { newsKindLabel } from "@/presentation/ui/news-cards";
import { PhotoStrip } from "@/presentation/ui/gallery-grid";
import { groupPhotos } from "@/presentation/ui/gallery-data";
import type { NewsItem } from "@/domain/types";
import { meta } from "@/presentation/seo";

export function generateStaticParams() {
  return newsRepository.all().map((n) => ({ slug: n.slug }));
}

const SOURCE_LINE = /^(Kaynak|Kaynaklar|Source|Sources)\b[^:]*:/i;
const LINK = /\[([^\]]+)\]\((https?:[^)\s]+)\)/g;

/** Moves the "Kaynak:" / "Sources:" line of a body into a list of links. */
function splitSources(body: string) {
  const sources: { label: string; href: string }[] = [];
  const kept = body
    .split("\n")
    .filter((line) => {
      if (!SOURCE_LINE.test(line.trim())) return true;
      const found = [...line.matchAll(LINK)];
      if (!found.length) return true;
      for (const m of found) sources.push({ label: m[1], href: m[2] });
      return false;
    })
    .join("\n")
    .trimEnd();
  return { body: kept, sources };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const item = newsRepository.bySlug(slug);
  if (!item) return {};
  return meta(locale, loc(item.title, locale), loc(item.excerpt, locale), item.image);
}

function listFor(item: NewsItem) {
  if (item.kind === "haber") return { href: "/gundem/haberler", tr: "Haberler", en: "News" };
  if (item.kind === "duyuru" || item.kind === "uye") return { href: "/gundem/duyurular", tr: "Duyurular", en: "Announcements" };
  return { href: "/gundem", tr: "Gündem", en: "Agenda" };
}

const linkCls = "underline decoration-red decoration-2 underline-offset-4 hover:text-red";

export default async function NewsDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const item = newsRepository.bySlug(slug);
  if (!item) notFound();
  const path = `/gundem/${item.slug}`;
  const { body, sources } = splitSources(loc(item.body, locale));
  const event = eventRepository.byHref(path);
  const group = galleryRepository.byHref(path);
  const photos = group ? groupPhotos(group, locale) : [];
  const { newer, older } = newsRepository.adjacent(item.slug);
  const list = listFor(item);
  const kind = newsKindLabel[item.kind][en ? "en" : "tr"];
  return (
    <>
      <PageIntro
        kicker={`${kind} · ${formatDate(item.date, locale)}`}
        title={loc(item.title, locale)}
        lead={loc(item.excerpt, locale)}
        before={
          <Link href={list.href} className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)] hover:text-red">
            <span aria-hidden>←</span> {en ? list.en : list.tr}
          </Link>
        }
      />
      {item.image ? (
        <img src={item.image} alt={loc(item.title, locale)} className="mx-auto mt-12 h-auto w-full max-w-7xl object-contain px-5 sm:mt-16 lg:mt-20 lg:px-8" />
      ) : null}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 lg:px-8">
        <Prose bare>{body}</Prose>
        <aside aria-label={en ? "Facts" : "Künye"} className="self-start border-t-2 border-[var(--fg)] pt-4 lg:sticky lg:top-28">
          <dl className="divide-y divide-[var(--line)] text-sm">
            <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
              <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "Date" : "Tarih"}</dt>
              <dd>
                <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
              </dd>
            </div>
            <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
              <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "Type" : "Tür"}</dt>
              <dd>{kind}</dd>
            </div>
            {event ? (
              <div className="grid grid-cols-[6rem_1fr] gap-3 py-3">
                <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "Event" : "Etkinlik"}</dt>
                <dd>
                  {event.venue ? <span className="block">{loc(event.venue, locale)}</span> : null}
                  <Link href="/faaliyetler/takvim" className={`${linkCls} mt-1 inline-flex min-h-11 items-center lg:min-h-0`}>
                    {en ? "See in the calendar" : "Takvimde gör"}
                  </Link>
                </dd>
              </div>
            ) : null}
            {sources.length ? (
              <div className="py-3">
                <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {en ? (sources.length > 1 ? "Sources (in Turkish)" : "Source (in Turkish)") : sources.length > 1 ? "Kaynaklar" : "Kaynak"}
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-1">
                    {sources.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkCls} inline-flex min-h-11 items-center leading-snug lg:min-h-0 lg:py-1`}>
                          {s.label} <span aria-hidden className="ml-1">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </div>
      {photos.length ? (
        <section aria-labelledby="photos" className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-[var(--line)] pt-8">
            <h2 id="photos" className="font-serif text-[1.6rem] leading-none sm:text-3xl">
              {en ? "Photos" : "Fotoğraflar"}
            </h2>
            <Link href="/faaliyetler/galeri" className={`${linkCls} text-sm`}>
              {en ? "Gallery" : "Galeri"}
            </Link>
          </div>
          <div className="mt-6">
            <PhotoStrip photos={photos} locale={locale} />
          </div>
          {group?.credit ? <p className="mt-3 text-xs text-[var(--muted)]">{loc(group.credit, locale)}</p> : null}
        </section>
      ) : null}
      <nav aria-label={en ? "More stories" : "Diğer kayıtlar"} className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-px border-y border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {[
            { it: newer, label: en ? "← Newer" : "← Daha yeni", align: "" },
            { it: older, label: en ? "Older →" : "Daha eski →", align: "sm:text-right" },
          ].map(({ it, label, align }) =>
            it ? (
              <Link key={label} href={`/gundem/${it.slug}`} className={`group bg-[var(--bg)] py-6 sm:px-6 ${align}`}>
                <span className="block text-[0.66rem] uppercase tracking-[0.18em] text-red">{label}</span>
                <span className="mt-2 block font-serif text-[1.25rem] leading-snug transition-colors group-hover:text-red">{loc(it.title, locale)}</span>
                <span className="mt-1 block text-xs text-[var(--muted)]">{formatDate(it.date, locale)}</span>
              </Link>
            ) : (
              <span key={label} className="hidden bg-[var(--bg)] sm:block" />
            ),
          )}
        </div>
      </nav>
    </>
  );
}
