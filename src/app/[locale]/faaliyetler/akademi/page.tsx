import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { eventRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { DateBadge, toEventView } from "@/presentation/ui/event-ui";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    "ADSİAD Akademi",
    locale === "en"
      ? "Open the Academy to the city — programmes on agriculture, industry and leadership."
      : "Akademi’yi kente açmak: tarım, sanayi ve liderlik programları.",
  );
}

const linkCls = "inline-flex min-h-11 items-center underline decoration-red decoration-2 underline-offset-4 hover:text-red";

export default async function AcademyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const items = eventRepository.sorted("akademi").map((e) => toEventView(e, locale));
  const years = items.map((e) => e.year);
  return (
    <>
      <PageIntro
        kicker={en ? "Academy" : "Akademi"}
        title="ADSİAD Akademi"
        lead={
          en
            ? "Open the Academy to the city — programmes on agriculture, industry and leadership."
            : "Akademi’yi kente açmak: tarım, sanayi ve liderlik programları."
        }
      >
        <SectionTabs section="faaliyetler" current="/faaliyetler/akademi" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <dl className="my-10 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:my-14">
          <div className="bg-[var(--bg)] p-5 sm:p-6">
            <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">{en ? "Seminars on record" : "Kayıtlı seminer"}</dt>
            <dd className="mt-2 font-serif text-4xl">{items.length}</dd>
          </div>
          <div className="bg-[var(--bg)] p-5 sm:p-6">
            <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">{en ? "Years" : "Yıllar"}</dt>
            <dd className="mt-2 font-serif text-4xl">{years.length ? `${years[years.length - 1]}–${years[0]}` : "—"}</dd>
          </div>
          <div className="col-span-2 bg-[var(--bg)] p-5 sm:col-span-1 sm:p-6">
            <dt className="text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">{en ? "Topics" : "Konular"}</dt>
            <dd className="mt-2 font-serif text-2xl leading-tight">{en ? "Agriculture, industry, leadership" : "Tarım, sanayi, liderlik"}</dd>
          </div>
        </dl>
        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2">
          {items.map((e) => (
            <li key={e.id}>
              <article className="grid h-full grid-rows-[auto_1fr] border border-[var(--line)]">
                <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--line)]">
                  {e.image ? <img src={e.image} alt={e.title} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" /> : null}
                  <span className="absolute left-4 top-4">
                    <DateBadge parts={e.badge} />
                  </span>
                </span>
                <div className="flex flex-col p-5 sm:p-7">
                  <h2 className="text-balance break-words font-serif text-[1.6rem] leading-[1.1] sm:text-[1.9rem]">{e.title}</h2>
                  <dl className="mt-4 grid gap-2 text-sm">
                    {e.speaker ? (
                      <div className="grid grid-cols-[6.5rem_1fr] gap-3">
                        <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "Speaker" : "Konuşmacı"}</dt>
                        <dd>{e.speaker}</dd>
                      </div>
                    ) : null}
                    <div className="grid grid-cols-[6.5rem_1fr] gap-3">
                      <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "Topic" : "Konu"}</dt>
                      <dd className="text-[var(--muted)]">{e.excerpt}</dd>
                    </div>
                    {e.venue ? (
                      <div className="grid grid-cols-[6.5rem_1fr] gap-3">
                        <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{en ? "When, where" : "Yer, saat"}</dt>
                        <dd>{e.venue}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="mt-auto flex flex-wrap gap-x-6 pt-4 text-sm">
                    {e.href ? (
                      <Link href={e.href} className={linkCls}>
                        {en ? "Read the story" : "Haberi oku"}
                        <span className="sr-only">: {e.title}</span>
                      </Link>
                    ) : null}
                    {e.source ? (
                      <a href={e.source} target="_blank" rel="noopener noreferrer" className={`${linkCls} text-[var(--muted)] decoration-1`}>
                        {en ? "Source post" : "Kaynak paylaşım"}
                      </a>
                    ) : null}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
