import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { eventRepository, galleryRepository, projectRepository, todayIso } from "@/infrastructure/repositories/catalog";
import { formatDate } from "@/presentation/ui/cn";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker, TextLink } from "@/presentation/ui/chrome";
import { toEventView } from "@/presentation/ui/event-ui";
import { EventRow } from "@/presentation/ui/event-row";
import { meta } from "@/presentation/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const nav = await getTranslations({ locale, namespace: "nav" });
  return meta(locale, locale === "en" ? "Work, in public." : "İş, açıkta.", nav("leadActivity"));
}

export default async function ActivityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const today = todayIso();
  const tuesday = eventRepository.sorted("sali");
  const academy = eventRepository.sorted("akademi");
  const projects = projectRepository.all();
  const groups = galleryRepository.all();
  const latest = (d?: string) => (d ? ` · ${en ? "latest" : "son"} ${formatDate(d, locale)}` : "");
  const tiles = [
    {
      href: "/faaliyetler/sali",
      title: en ? "Tuesday Meetings" : "Salı Toplantıları",
      meta: `${tuesday.length} ${en ? "meetings" : "toplantı"}${latest(tuesday[0]?.date)}`,
      image: "/archive/promo/422_adsiad-halkbank_2.jpg",
    },
    {
      href: "/faaliyetler/akademi",
      title: en ? "Academy" : "Akademi",
      meta: `${academy.length} ${en ? "seminars" : "seminer"}${latest(academy[0]?.date)}`,
      image: "/archive/sosyal/2026-02-patronluktan-liderlige/01.webp",
    },
    {
      href: "/faaliyetler/projeler",
      title: en ? "Projects" : "Projeler",
      meta: `${projects.length} ${en ? "projects" : "proje"} · ${en ? "current: Green Transition Centre" : "güncel: Yeşil Dönüşüm Merkezi"}`,
      image: "/archive/sosyal/2026-01-yesil-donusum/sonmez-01.webp",
    },
    {
      href: "/faaliyetler/galeri",
      title: en ? "Gallery" : "Galeri",
      meta: `${galleryRepository.photoCount()} ${en ? "photos" : "fotoğraf"} · ${groups.length} ${en ? "events" : "etkinlik"}`,
      image: "/archive/sosyal/2026-05-turkonfed-ziyaret/02.webp",
    },
  ];
  const upcoming = eventRepository.upcoming(today);
  const spotlight = (upcoming[0] ?? eventRepository.past(today)[0]) || null;
  return (
    <>
      <PageIntro kicker={en ? "Activities" : "Faaliyetler"} title={en ? "Work, in public." : "İş, açıkta."}>
        <SectionTabs section="faaliyetler" current="/faaliyetler" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <nav aria-label={en ? "Activity areas" : "Faaliyet alanları"} className="grid gap-x-6 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
          {tiles.map((t) => (
            <Link key={t.href} href={t.href} className="group block">
              <span className="reveal-frame block rounded-2xl aspect-[4/3] overflow-hidden bg-[var(--line)]">
                <img src={t.image} alt={t.title} loading="lazy" decoding="async" className="reveal-photo h-full w-full object-cover object-top" />
              </span>
              <span className="mt-4 block font-serif text-[1.75rem] leading-tight transition-colors group-hover:text-red sm:text-3xl">{t.title} →</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">{t.meta}</span>
            </Link>
          ))}
        </nav>
        {spotlight ? (
          <section aria-labelledby="spotlight" className="border-t-2 border-[var(--fg)] pb-24 pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <Kicker>{upcoming.length ? (en ? "Next event" : "Sıradaki etkinlik") : en ? "Latest event" : "Son etkinlik"}</Kicker>
                <h2 id="spotlight" className="mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
                  {en ? "From the calendar" : "Takvimden"}
                </h2>
              </div>
              <TextLink href="/faaliyetler/takvim">{en ? "Full calendar" : "Tüm takvim"}</TextLink>
            </div>
            <div className="mt-2">
              <EventRow event={toEventView(spotlight, locale)} locale={locale} />
            </div>
            {!upcoming.length ? (
              <p className="mt-4 text-sm text-[var(--muted)]">
                {en ? "No event is scheduled at the moment." : "Şu an planlanmış bir etkinlik yok."}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>
    </>
  );
}
