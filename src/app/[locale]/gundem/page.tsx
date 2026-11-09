import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { Kicker, TextLink } from "@/presentation/ui/chrome";
import { formatDate } from "@/presentation/ui/cn";
import { FeatureStory, NoticeRow, StoryCard } from "@/presentation/ui/news-cards";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return meta(locale, locale === "en" ? "What’s on the agenda" : "Gündemde ne var", t("leadAgenda"));
}

export default async function AgendaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const news = newsRepository.byKind("haber");
  const notices = newsRepository.notices();
  const [lead, ...more] = news;
  const rooms = [
    {
      href: "/gundem/haberler",
      title: en ? "News" : "Haberler",
      meta: `${news.length} ${en ? "stories" : "haber"}${news[0] ? ` · ${en ? "latest" : "son"} ${formatDate(news[0].date, locale)}` : ""}`,
    },
    {
      href: "/gundem/duyurular",
      title: en ? "Announcements" : "Duyurular",
      meta: `${notices.length} ${en ? "notices" : "duyuru"}${notices[0] ? ` · ${en ? "latest" : "son"} ${formatDate(notices[0].date, locale)}` : ""}`,
    },
  ];
  return (
    <>
      <PageIntro kicker={en ? "Agenda" : "Gündem"} title={en ? "What’s on the agenda" : "Gündemde ne var"}>
        <SectionTabs section="gundem" current="/gundem" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 border-b border-[var(--line)] py-10 lg:grid-cols-[1.5fr_1fr] lg:py-14">
          {lead ? (
            <section aria-label={en ? "Latest story" : "Son haber"}>
              <Kicker className="mb-5">{en ? "Latest story" : "Son haber"}</Kicker>
              <FeatureStory item={lead} locale={locale} />
            </section>
          ) : null}
          <section aria-labelledby="latest-notices" className="lg:border-l lg:border-[var(--line)] lg:pl-10">
            <Kicker>{en ? "Announcements" : "Duyurular"}</Kicker>
            <h2 id="latest-notices" className="mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">
              {en ? "Latest announcements" : "Son duyurular"}
            </h2>
            <ul className="mt-4">
              {notices.slice(0, 3).map((n) => (
                <NoticeRow key={n.id} item={n} locale={locale} compact />
              ))}
            </ul>
            <TextLink href="/gundem/duyurular" className="mt-4">
              {en ? "All announcements" : "Tüm duyurular"}
            </TextLink>
          </section>
        </div>
        <nav aria-label={en ? "Agenda rooms" : "Gündem bölümleri"} className="grid gap-px border-b border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {rooms.map((r) => (
            <Link key={r.href} href={r.href} className="group bg-[var(--bg)] px-1 py-7 sm:px-6 sm:py-9">
              <span className="block font-serif text-[1.6rem] leading-tight transition-colors group-hover:text-red sm:text-3xl">{r.title} →</span>
              <span className="mt-2 block text-sm text-[var(--muted)]">{r.meta}</span>
            </Link>
          ))}
        </nav>
        {more.length ? (
          <section aria-labelledby="recent" className="py-10 pb-24 lg:py-14 lg:pb-28">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="recent" className="font-serif text-[1.9rem] leading-none sm:text-4xl">
                {en ? "Recent stories" : "Son gelişmeler"}
              </h2>
              <TextLink href="/gundem/haberler" className="shrink-0">
                {en ? "All news" : "Tüm haberler"}
              </TextLink>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.slice(0, 3).map((n) => (
                <StoryCard key={n.id} item={n} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
