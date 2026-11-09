import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { pageRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro, Prose } from "@/presentation/ui/page-intro";
import { YearRecord } from "@/presentation/ui/year-record";
import { seedMeta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seedMeta(locale, "tarihce");
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = pageRepository.bySlug("tarihce");
  if (!page) notFound();

  return (
    <>
      <PageIntro kicker={locale === "en" ? "About" : "Kurumsal"} title={loc(page.title, locale)} />
      <YearRecord locale={locale === "en" ? "en" : "tr"} />
      <Prose>{loc(page.body, locale)}</Prose>
    </>
  );
}
