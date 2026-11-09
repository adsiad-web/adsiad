import { setRequestLocale } from "next-intl/server";
import { memberRepository } from "@/infrastructure/repositories/catalog";
import { meta } from "@/presentation/seo";
import { PageIntro } from "@/presentation/ui/page-intro";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const n = memberRepository.companies().length;
  return meta(locale, locale === "en" ? "Member firms" : "Üye firmalar", locale === "en" ? `${n} names under one roof.` : `${n} isim, aynı çatı.`);
}

export default async function FirmsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const firms = memberRepository.companies();
  const all = memberRepository.search("");
  const sectorOf = (f: string) => [...new Set(all.filter((m) => m.company === f).map((m) => m.sector))].join(" · ");
  return (
    <>
      <PageIntro
        kicker={locale === "en" ? "Members" : "Üyeler"}
        title={locale === "en" ? "Member firms" : "Üye firmalar"}
        lead={locale === "en" ? `${firms.length} names under one roof.` : `${firms.length} isim, aynı çatı.`}
      />
      <ul className="mx-auto grid max-w-7xl gap-3 px-5 pb-24 pt-12 sm:grid-cols-2 sm:px-8 sm:pt-16 md:grid-cols-3 lg:grid-cols-4 lg:px-10 lg:pt-20">
        {firms.map((f) => (
          <li key={f} className="ink-flip flex min-h-32 min-w-0 flex-col justify-between rounded-2xl bg-[var(--card)] p-5 ring-1 ring-[var(--line)] sm:min-h-36">
            <span aria-hidden className="h-0.5 w-8 bg-red" />
            <span className="mt-5 break-words font-serif text-[1.25rem] leading-snug">{f}</span>
            {sectorOf(f) ? <span className="mt-2 text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{sectorOf(f)}</span> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
