import { setRequestLocale } from "next-intl/server";
import { newsRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { NoticeRow } from "@/presentation/ui/news-cards";
import { EmptyState } from "@/presentation/ui/chrome";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Announcements" : "Duyurular",
    locale === "en" ? "Meeting announcements and new members." : "Toplantı duyuruları ve yeni üyeler.",
  );
}

export default async function AnnouncementsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const items = newsRepository.notices();
  const years = [...new Set(items.map((n) => n.date.slice(0, 4)))];
  return (
    <>
      <PageIntro
        kicker={en ? "Agenda" : "Gündem"}
        title={en ? "Announcements" : "Duyurular"}
        lead={en ? "Meeting announcements and new members." : "Toplantı duyuruları ve yeni üyeler."}
      >
        <SectionTabs section="gundem" current="/gundem/duyurular" locale={locale} />
      </PageIntro>
      {items.length ? (
        <div className="mx-auto max-w-5xl px-5 pb-24 pt-12 sm:pt-16 lg:px-8 lg:pt-20">
          {years.map((y) => (
            <section key={y} aria-labelledby={`y-${y}`} className="mt-8">
              <h2 id={`y-${y}`} className="flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-red">
                {y}
                <span aria-hidden className="h-px flex-1 bg-[var(--line)]" />
              </h2>
              <ul className="mt-2 border border-[var(--line)] px-4 sm:px-6">
                {items
                  .filter((n) => n.date.startsWith(y))
                  .map((n) => (
                    <NoticeRow key={n.id} item={n} locale={locale} />
                  ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState title={en ? "Nothing posted." : "Yayımlanmış kayıt yok."} />
      )}
    </>
  );
}
