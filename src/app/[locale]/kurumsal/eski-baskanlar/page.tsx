import { setRequestLocale } from "next-intl/server";
import { pastPresidents } from "@/infrastructure/seed/board";
import { loc } from "@/presentation/ui/cn";
import { PageIntro } from "@/presentation/ui/page-intro";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Past presidents" : "Eski başkanlar",
    locale === "en" ? "The old page said “being updated.” We publish what is documented." : "Eski sitede sayfa “güncellenmektedir” idi. Belgelenen kadro burada.",
  );
}

export default async function PastPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <PageIntro
        kicker={locale === "en" ? "About" : "Kurumsal"}
        title={locale === "en" ? "Past presidents" : "Eski başkanlar"}
        lead={
          locale === "en"
            ? "The old page said “being updated.” We publish what is documented."
            : "Eski sitede sayfa “güncellenmektedir” idi. Belgelenen kadro burada."
        }
      />
      <ol className="mx-auto grid max-w-7xl gap-4 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 md:grid-cols-2 lg:px-10 lg:pt-20">
        {pastPresidents.map((p, i) => (
          <li key={p.name} className="relative isolate overflow-hidden rounded-3xl bg-[var(--card)] p-7 ring-1 ring-[var(--line)] sm:p-10">
            <span aria-hidden className="absolute -right-4 -top-10 -z-10 select-none font-serif text-[11rem] leading-none text-red/[0.08]">{String(i + 1).padStart(2, "0")}</span>
            <span aria-hidden className="block h-0.5 w-10 bg-red" />
            <p className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">{p.name}</p>
            <p className="mt-3 max-w-md leading-7 text-[var(--muted)]">{loc(p.note, locale)}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
