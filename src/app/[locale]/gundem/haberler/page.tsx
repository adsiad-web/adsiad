import { setRequestLocale } from "next-intl/server";
import { newsRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker } from "@/presentation/ui/chrome";
import { CompactRow, FeatureStory, StoryCard } from "@/presentation/ui/news-cards";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(locale, locale === "en" ? "News" : "Haberler", locale === "en" ? "Stories from the association." : "Dernekten haberler.");
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const items = newsRepository.byKind("haber");
  const [lead, ...rest] = items;
  const side = rest.slice(0, 2);
  const cards = rest.slice(2, 8);
  const archive = rest.slice(8);
  const years = [...new Set(archive.map((n) => n.date.slice(0, 4)))];
  return (
    <>
      <PageIntro kicker={en ? "Agenda" : "Gündem"} title={en ? "News" : "Haberler"}>
        <SectionTabs section="gundem" current="/gundem/haberler" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {lead ? (
          <section aria-label={en ? "Top stories" : "Öne çıkanlar"} className="grid gap-10 border-b border-[var(--line)] py-10 lg:grid-cols-[1.65fr_1fr] lg:gap-12 lg:py-14">
            <FeatureStory item={lead} locale={locale} />
            <div className="grid content-start gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-1">
              {side.map((n) => (
                <StoryCard key={n.id} item={n} locale={locale} variant="side" />
              ))}
            </div>
          </section>
        ) : null}
        {cards.length ? (
          <section aria-labelledby="more-news" className="py-10 lg:py-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="more-news" className="font-serif text-[1.9rem] leading-none sm:text-4xl">
                {en ? "More stories" : "Diğer haberler"}
              </h2>
              <span className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                {items.length} {en ? "stories" : "haber"}
              </span>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((n) => (
                <StoryCard key={n.id} item={n} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
        {archive.length ? (
          <section aria-labelledby="news-archive" className="border-t-2 border-[var(--fg)] pb-24 pt-8">
            <Kicker>{en ? "Archive" : "Arşiv"}</Kicker>
            <h2 id="news-archive" className="mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
              {en ? "Earlier stories" : "Önceki haberler"}
            </h2>
            {years.map((y) => (
              <div key={y} className="mt-8 grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
                <h3 className="font-serif text-[2.4rem] leading-none text-red/50">{y}</h3>
                <ul>
                  {archive
                    .filter((n) => n.date.startsWith(y))
                    .map((n) => (
                      <CompactRow key={n.id} item={n} locale={locale} />
                    ))}
                </ul>
              </div>
            ))}
          </section>
        ) : (
          <div className="pb-24" />
        )}
      </div>
    </>
  );
}
