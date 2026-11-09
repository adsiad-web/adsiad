import { setRequestLocale } from "next-intl/server";
import { boardRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro } from "@/presentation/ui/page-intro";
import { DIR } from "@/presentation/ui/direction";
import { SectionHead, container } from "@/presentation/ui/system";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Boards" : "Kurullar",
    locale === "en"
      ? "Current principal and substitute members of the Board, the Audit Board and the High Advisory Board."
      : "Yönetim Kurulu, Denetim Kurulu ve Yüksek İstişare Kurulunun güncel asil ve yedek üyeleri.",
  );
}

const groups = [
  { key: "yonetim" as const, tr: "Yönetim Kurulu", en: "Board" },
  { key: "yonetimYedek" as const, tr: "Yönetim Kurulu Yedek Üyeleri", en: "Board — substitute members" },
  { key: "denetim" as const, tr: "Denetim Kurulu", en: "Audit board" },
  { key: "denetimYedek" as const, tr: "Denetim Kurulu Yedek Üyeleri", en: "Audit board — substitute members" },
  { key: "danisma" as const, tr: "Yüksek İstişare Kurulu", en: "High Advisory Board" },
];

export default async function BoardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageIntro
        kicker={locale === "en" ? "About" : "Kurumsal"}
        title={locale === "en" ? "Boards" : "Kurullar"}
        lead={
          locale === "en"
            ? "Current principal and substitute members of the Board, the Audit Board and the High Advisory Board."
            : "Yönetim Kurulu, Denetim Kurulu ve Yüksek İstişare Kurulunun güncel asil ve yedek üyeleri."
        }
      />
      <div className={`${container} space-y-20 pb-24 pt-14 sm:space-y-28 sm:pt-20`}>
        {groups.map((g, gi) => {
          const people = boardRepository.byBoard(g.key);
          if (!people.length) return null;
          const main = g.key === "yonetim";
          const bold = DIR === "bold";
          return (
            <section key={g.key}>
              <SectionHead no={String(gi + 1).padStart(2, "0")} kicker={`${people.length} üye`} title={locale === "en" ? g.en : g.tr} />
              {main ? (
                <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                  {people.filter((p) => p.image).map((p) => (
                    <li key={p.id} className={bold ? "overflow-hidden rounded-2xl bg-[var(--card)] ring-1 ring-[var(--line)]" : ""}>
                      <img src={p.image} alt={p.name} className={`aspect-[4/5] w-full object-cover object-top ${bold ? "" : "grayscale transition hover:grayscale-0"}`} />
                      <div className={bold ? "p-5" : "mt-4 border-t border-[var(--fg)] pt-4"}>
                        <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-red">{loc(p.role, locale)}</p>
                        <p className="mt-2 font-serif text-xl leading-tight sm:text-2xl">{p.name}</p>
                        {p.company ? <p className="mt-1 text-sm text-[var(--muted)]">{p.company}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="mt-10 grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                {people.filter((p) => !main || !p.image).map((p) => (
                  <li key={p.id} className={bold ? "rounded-2xl bg-[var(--card)] p-5 ring-1 ring-[var(--line)]" : "border-t border-[var(--line)] pt-4"}>
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-red">{loc(p.role, locale)}</p>
                    <p className="mt-2 font-serif text-xl leading-tight sm:text-2xl">{p.name}</p>
                    {p.company ? <p className="mt-1 text-sm text-[var(--muted)]">{p.company}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
