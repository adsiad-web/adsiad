import { setRequestLocale } from "next-intl/server";
import { eventRepository, todayIso } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker, TextLink } from "@/presentation/ui/chrome";
import { toEventView } from "@/presentation/ui/event-ui";
import { EventRow } from "@/presentation/ui/event-row";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Every Tuesday, the same table." : "Her salı, aynı masa.",
    locale === "en" ? "Guests, ideas and the city’s questions. ADSİAD’s signature programme." : "Konuklar, fikirler ve kentin meseleleri. ADSİAD’ın imza programı.",
  );
}

export const revalidate = 3600;

export default async function TuesdayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const today = todayIso();
  const next = eventRepository.upcoming(today, "sali").map((e) => toEventView(e, locale));
  const past = eventRepository.past(today, "sali").map((e) => toEventView(e, locale));
  const guests = past.filter((e) => e.speaker);
  return (
    <>
      <PageIntro
        kicker={en ? "Traditional Tuesday Meetings" : "Geleneksel Salı Toplantıları"}
        title={en ? "Every Tuesday, the same table." : "Her salı, aynı masa."}
        lead={en ? "Guests, ideas and the city’s questions. ADSİAD’s signature programme." : "Konuklar, fikirler ve kentin meseleleri. ADSİAD’ın imza programı."}
      >
        <SectionTabs section="faaliyetler" current="/faaliyetler/sali" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 pb-24 pt-10 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:pt-14">
          <section aria-labelledby="next">
            <Kicker>{en ? "Next meeting" : "Sıradaki toplantı"}</Kicker>
            {next.length ? (
              <div className="mt-4 border-t-2 border-red">
                <h2 id="next" className="sr-only">{en ? "Next meeting" : "Sıradaki toplantı"}</h2>
                {next.map((e) => (
                  <EventRow key={e.id} event={e} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border-l-4 border-red bg-[var(--card)] px-5 py-6 ring-1 ring-[var(--line)] sm:px-8">
                <h2 id="next" className="font-serif text-[1.5rem] leading-tight sm:text-[1.8rem]">
                  {en ? "The next meeting has not been announced yet" : "Sıradaki toplantı henüz duyurulmadı"}
                </h2>
                <TextLink href="/gundem/duyurular" className="mt-3">
                  {en ? "Announcements" : "Duyurular"}
                </TextLink>
              </div>
            )}
            <h2 className="mt-12 border-b-2 border-[var(--fg)] pb-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
              {en ? "Past meetings" : "Geçmiş toplantılar"}
            </h2>
            {past.map((e) => (
              <EventRow key={e.id} event={e} locale={locale} />
            ))}
          </section>
          {guests.length ? (
            <aside aria-labelledby="guests" className="self-start bg-[var(--fg)] p-6 text-[var(--bg)] sm:p-8 lg:sticky lg:top-28">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-red">{en ? "At the table" : "Masada"}</p>
              <h2 id="guests" className="mt-3 font-serif text-[1.7rem] leading-tight">
                {en ? "Past guests" : "Geçmiş konuklar"}
              </h2>
              <ol className="mt-5 divide-y divide-[var(--bg)]/20">
                {guests.map((g) => (
                  <li key={g.id} className="py-3">
                    <p className="font-serif text-lg leading-snug">{g.speaker}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] opacity-70">{g.badge.full}</p>
                  </li>
                ))}
              </ol>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
