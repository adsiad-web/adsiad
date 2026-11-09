import { setRequestLocale } from "next-intl/server";
import { eventRepository, todayIso } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker, TextLink } from "@/presentation/ui/chrome";
import { toEventView } from "@/presentation/ui/event-ui";
import { EventRow } from "@/presentation/ui/event-row";
import { EventTimeline } from "@/presentation/ui/event-timeline";
import { meta } from "@/presentation/seo";

/** Re-render hourly so "upcoming" follows the calendar. */
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Events calendar" : "Etkinlik takvimi",
    locale === "en"
      ? "Tuesday meetings, Academy seminars, projects and partner events on one timeline."
      : "Salı toplantıları, Akademi seminerleri, projeler ve paydaş etkinlikleri tek zaman çizelgesinde.",
  );
}

export default async function CalendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const today = todayIso();
  const upcoming = eventRepository.upcoming(today).map((e) => toEventView(e, locale));
  const past = eventRepository.past(today).map((e) => toEventView(e, locale));
  return (
    <>
      <PageIntro
        kicker={en ? "Activities" : "Faaliyetler"}
        title={en ? "Events calendar" : "Etkinlik takvimi"}
        lead={
          en
            ? "Tuesday meetings, Academy seminars, projects and partner events on one timeline."
            : "Salı toplantıları, Akademi seminerleri, projeler ve paydaş etkinlikleri tek zaman çizelgesinde."
        }
      >
        <SectionTabs section="faaliyetler" current="/faaliyetler/takvim" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <section aria-labelledby="upcoming" className="my-10 lg:my-14">
          <Kicker>{en ? "Upcoming" : "Yaklaşan"}</Kicker>
          {upcoming.length ? (
            <>
              <h2 id="upcoming" className="mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
                {en ? "Coming up" : "Sıradaki etkinlikler"}
              </h2>
              <div className="mt-4 border-t-2 border-red">
                {upcoming.map((e) => (
                  <EventRow key={e.id} event={e} locale={locale} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-4 flex flex-col gap-5 rounded-3xl border-l-4 border-red bg-[var(--card)] px-5 py-6 ring-1 ring-[var(--line)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <h2 id="upcoming" className="font-serif text-[1.5rem] leading-tight sm:text-[1.8rem]">
                  {en ? "No event is scheduled at the moment" : "Şu an planlanmış bir etkinlik yok"}
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {en ? "New dates will appear here with a date badge as soon as they are announced." : "Yeni tarihler duyurulduğunda burada tarih rozetiyle öne çıkar."}
                </p>
              </div>
              <TextLink href="/gundem/duyurular" className="shrink-0">
                {en ? "Announcements" : "Duyurular"}
              </TextLink>
            </div>
          )}
        </section>
        <EventTimeline events={past} locale={locale} />
      </div>
    </>
  );
}
