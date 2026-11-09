import { getTranslations, setRequestLocale } from "next-intl/server";
import { seedMeta } from "@/presentation/seo";
import { boardRepository, pageRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro, Prose } from "@/presentation/ui/page-intro";
import { Btn, Card, SectionHead, container, sectionY } from "@/presentation/ui/system";
import { DIR } from "@/presentation/ui/direction";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return seedMeta(locale, "taniyin");
}

export default async function CorporatePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const nav = await getTranslations("nav");
  const page = pageRepository.bySlug("taniyin")!;
  const [first, ...body] = loc(page.body, locale).split("\n\n");
  const board = boardRepository.byBoard("yonetim");
  const bold = DIR === "bold";
  const tiles = [
    {
      href: "/kurumsal/baskan",
      img: "baskan",
      t: en ? "Chair" : "Başkan",
      x: en ? "Chair of the Board and their duties." : "Yönetim Kurulu Başkanı ve görevleri.",
    },
    {
      href: "/kurumsal/kurullar",
      img: "kurullar",
      t: en ? "Boards" : "Kurullar",
      x: en ? "Board of Directors, Audit Board and High Advisory Board." : "Yönetim, Denetim ve Yüksek İstişare Kurulu.",
    },
    {
      href: "/kurumsal/tarihce",
      img: "tarihce",
      t: en ? "History" : "Tarihçe",
      x: en ? "Goals and signature work over the years." : "Derneğin hedefleri ve yıllar içindeki imza işleri.",
    },
    {
      href: "/kurumsal/vizyon",
      img: "vizyon",
      t: en ? "Vision and mission" : "Vizyon ve misyon",
      x: en ? "Goals and general policy principles." : "Hedefler ve genel politika ilkeleri.",
    },
    {
      href: "/kurumsal/eski-baskanlar",
      img: "eski-baskanlar",
      t: en ? "Past chairs" : "Eski başkanlar",
      x: en ? "Those who have chaired the association." : "Derneğe başkanlık etmiş isimler.",
    },
    {
      href: "/kurumsal/tuzuk",
      img: "tuzuk",
      t: en ? "Bylaws" : "Tüzük",
      x: en
        ? "Summary of the bylaws under Associations Law No. 5253."
        : "5253 sayılı Dernekler Kanunu çerçevesindeki tüzük özeti.",
    },
  ];

  return (
    <>
      <PageIntro kicker={nav("corporate")} title={loc(page.title, locale)} lead={nav("leadCorporate")} />
      <section className={`${container} ${sectionY} grid gap-12 lg:grid-cols-12`}>
        <p className={`font-serif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.2] lg:col-span-7 ${bold ? "" : "border-t border-[var(--fg)] pt-6"}`}>{first}</p>
        <div className="lg:col-span-5">
          <Prose bare>{body.join("\n\n")}</Prose>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn href="/kurumsal/vizyon">{en ? "Vision and mission" : "Vizyon ve misyon"}</Btn>
            <Btn href="/kurumsal/basin-kiti" kind="secondary">
              {en ? "Press kit" : "Basın kiti"}
            </Btn>
          </div>
        </div>
      </section>
      <section className={bold ? "bg-paper py-16 text-ink dark:bg-[#151312] dark:text-paper sm:py-24" : `border-t border-[var(--line)] ${sectionY}`}>
        <div className={container}>
          <SectionHead
            no="01"
            kicker={en ? "About pages" : "Kurumsal sayfalar"}
            title={en ? "Get to know the association." : "Derneği yakından tanıyın."}
          />
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((x) => (
              <Card
                key={x.href}
                href={x.href}
                image={`/archive/nav/${x.img}.webp`}
                ratio="aspect-[16/10]"
                kicker={bold ? nav("corporate") : undefined}
                title={x.t}
                text={x.x}
              />
            ))}
          </div>
        </div>
      </section>
      <section className={`${container} ${sectionY}`}>
        <SectionHead
          no="02"
          kicker={en ? "Board of Directors" : "Yönetim Kurulu"}
          title={en ? `${board.length}-member board of directors.` : `${board.length} kişilik yönetim kurulu.`}
          action={
            <Btn href="/kurumsal/kurullar" kind="quiet">
              {en ? "All boards" : "Tüm kurullar"}
            </Btn>
          }
        />
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {board.slice(0, 8).map((p) => (
            <li key={p.id} className={bold ? "rounded-2xl bg-[var(--card)] p-5 ring-1 ring-[var(--line)]" : "border-t border-[var(--fg)] pt-4"}>
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-red">{loc(p.role, locale)}</p>
              <p className="mt-2 font-serif text-xl leading-tight">{p.name}</p>
              {p.company ? <p className="mt-1 text-sm text-[var(--muted)]">{p.company}</p> : null}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
