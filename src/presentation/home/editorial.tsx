import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { formatDate, loc } from "@/presentation/ui/cn";
import { CountUp } from "@/presentation/ui/count-up";
import { FirmWall } from "@/presentation/ui/firm-wall";
import { NoticeRow } from "@/presentation/ui/news-cards";
import { SocialLatest } from "@/presentation/ui/social-latest";
import { LivingSeal } from "@/presentation/ui/living-seal";
import { Btn, Card, SectionHead, container, sectionY } from "@/presentation/ui/system";
import { homeV2, mission, pillars } from "./data";

export async function EditorialHome({ locale }: { locale: string }) {
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const d = homeV2();
  const [lead, ...rest] = d.stories;
  const stats = [
    { n: d.stats.years, label: t("statYears"), note: t("statYearsNote") },
    { n: d.stats.members, label: t("statMembers"), note: t("statMembersNote") },
    { n: d.sectors, label: t("statSectors"), note: t("statSectorsNote") },
  ];

  return (
    <>
      {/* HERO — who we are + what we do */}
      <section className={container}>
        <div className="grid gap-10 pb-14 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-red">
              <span>Adana Sanayici ve İş İnsanları Derneği</span>
            </p>
            <h1 className="mt-6 font-serif text-[clamp(3rem,7.4vw,6.6rem)] leading-[0.95] tracking-tight">
              35 yıldır Çukurova’nın <em className="not-italic text-red">üreten</em> aklı.
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">{loc(mission, locale)}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Btn href="/kurumsal">{t("meetUs")}</Btn>
              <Btn href="/uye-ol" kind="secondary">{t("joinCta")}</Btn>
            </div>
          </div>
          <figure className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--line)] sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
              <img src="/archive/promo/185_adsiad-genel_kurul_3.jpg" alt="ADSİAD olağan genel kurul" className="h-full w-full object-cover object-[50%_40%]" />
            </div>
            <div className="absolute -bottom-8 -left-4 w-28 bg-[var(--bg)] p-3 sm:w-36 lg:-left-10 lg:w-44 lg:p-4">
              <LivingSeal className="w-full" />
            </div>
            <figcaption className="mt-3 pl-28 text-right text-xs uppercase tracking-[0.16em] text-[var(--muted)] sm:pl-0">Olağan genel kurul · Arşiv</figcaption>
          </figure>
        </div>

        {/* pillars: what we do, linked */}
        <div className="border-t border-[var(--fg)]">
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <li key={p.no} className={`border-b border-[var(--line)] lg:border-b-0 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "sm:border-l" : ""} border-[var(--line)]`}>
                <Link href={p.href} className="group flex h-full flex-col gap-3 py-6 sm:px-6 lg:py-8 lg:pl-6 lg:pr-6">
                  <span className="text-xs tabular-nums text-red">{p.no}</span>
                  <span className="font-serif text-2xl leading-tight transition-colors group-hover:text-red">{loc(p.title, locale)}</span>
                  <span className="text-[0.95rem] leading-7 text-[var(--muted)]">{loc(p.text, locale)}</span>
                  <span aria-hidden className="mt-auto pt-2 text-red transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROOF numbers */}
      <section className="border-y border-[var(--line)] bg-paper/60 dark:bg-white/[0.02]">
        <dl className={`${container} grid grid-cols-2 lg:grid-cols-3`}>
          {stats.map((s, i) => (
            <div key={s.label} className={`py-10 sm:py-14 ${i % 2 ? "border-l pl-5 sm:pl-8" : "pr-5"} ${i === 2 ? "lg:border-l lg:pl-8" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} border-[var(--line)]`}>
              <dd className="font-serif text-[clamp(3.2rem,6vw,5.5rem)] leading-none tabular-nums">
                <CountUp value={s.n} />
              </dd>
              <dt className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">{s.label}</dt>
              <p className="mt-1 text-xs text-[var(--muted)]">{s.note}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* 01 WHO */}
      <section className={`${container} ${sectionY}`}>
        <SectionHead no="01" kicker="Biz kimiz" title={<>Gönüllü bir iş ailesi, <span className="text-[var(--muted)]">tek çatı altında.</span></>} />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <blockquote className="lg:col-span-7">
            <p className="font-serif text-[clamp(1.7rem,3.2vw,2.8rem)] leading-[1.15]"><span className="text-red">“</span>{t("presidentQuote")}<span className="text-red">”</span></p>
            <footer className="mt-8 flex flex-wrap items-center gap-6">
              <span className="text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">{d.chair?.name} · {t("briefChair")}</span>
              <Btn href="/gundem/ikiz-donusumde-yeni-ufuklar-adana" kind="quiet">{t("presidentCta")}</Btn>
            </footer>
          </blockquote>
          {d.chair ? (
            <Link href="/kurumsal/baskan" className="group grid grid-cols-[8rem_1fr] gap-6 border-t border-[var(--fg)] pt-6 sm:grid-cols-[11rem_1fr] lg:col-span-5">
              <img src={d.chair.image} alt={d.chair.name} className="aspect-[3/4] w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0" />
              <span className="flex flex-col">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-red">{t("briefChair")}</span>
                <span className="mt-3 font-serif text-3xl leading-tight group-hover:text-red">{d.chair.name}</span>
                <span className="mt-2 text-sm text-[var(--muted)]">{d.chair.company}</span>
                <span className="mt-auto text-sm">Kurullar ve yönetim →</span>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      {/* 02 WHAT — programmes with real images */}
      <section className={`border-t border-[var(--line)] ${sectionY}`}>
        <div className={container}>
          <SectionHead no="02" kicker="Ne yapıyoruz" title="Salıdan akademiye, kent için üretilen işler." lead={nav("leadActivity")} action={<Btn href="/faaliyetler" kind="quiet">Tüm faaliyetler</Btn>} />
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
            {d.projects[0] ? (
              <Card className="md:col-span-7" big href={`/faaliyetler/projeler/${d.projects[0].slug}`} image={d.projects[0].image} ratio="aspect-[16/10]" kicker={`Proje · ${d.projects[0].period}`} title={loc(d.projects[0].title, locale)} text={loc(d.projects[0].lead, locale)} />
            ) : null}
            <div className="grid gap-14 md:col-span-5">
              {d.akademi[0] ? <Card href="/faaliyetler/akademi" image={d.akademi[0].image} ratio="aspect-[16/9]" kicker={`Akademi · ${formatDate(d.akademi[0].date, locale)}`} title={loc(d.akademi[0].title, locale)} /> : null}
              {d.sali[0] ? <Card href="/faaliyetler/sali" image={d.sali[0].image} ratio="aspect-[16/9]" kicker={`Salı · ${formatDate(d.sali[0].date, locale)}`} title={loc(d.sali[0].title, locale)} /> : null}
            </div>
          </div>
          <ul className="mt-14 grid border-t border-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {d.projects.slice(1, 4).map((p) => (
              <li key={p.slug} className="border-b border-[var(--line)]">
                <Link href={p.detail ? `/faaliyetler/projeler/${p.slug}` : (p.href ?? "/faaliyetler/projeler")} className="group flex items-baseline justify-between gap-4 py-5 pr-4">
                  <span className="font-serif text-xl leading-snug group-hover:text-red">{loc(p.title, locale)}</span>
                  <span className="shrink-0 text-xs tabular-nums text-[var(--muted)]">{p.period}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 LATEST */}
      <section className={`border-t border-[var(--line)] ${sectionY}`}>
        <div className={container}>
          <SectionHead no="03" kicker="Gündem" title={t("storiesTitle")} action={<Btn href="/gundem/haberler" kind="quiet">{t("allNews")}</Btn>} />
          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {lead ? <Card className="min-w-0 lg:col-span-7" big href={`/gundem/${lead.slug}`} image={lead.image} ratio="aspect-[3/2]" kicker={formatDate(lead.date, locale)} title={loc(lead.title, locale)} text={loc(lead.excerpt, locale)} /> : null}
            <ul className="min-w-0 border-t border-[var(--fg)] lg:col-span-5">
              {rest.map((s) => (
                <li key={s.id} className="border-b border-[var(--line)]">
                  <Link href={`/gundem/${s.slug}`} className="group grid grid-cols-[1fr_7rem] items-center gap-5 py-5">
                    <span>
                      <span className="text-[0.66rem] uppercase tracking-[0.2em] text-red">{formatDate(s.date, locale)}</span>
                      <span className="mt-2 block font-serif text-xl leading-snug group-hover:text-red">{loc(s.title, locale)}</span>
                    </span>
                    {s.image ? <img src={s.image} alt="" className="aspect-[4/3] w-full object-cover" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-12 border-t border-[var(--line)] pt-12 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-8">
              <div className="flex items-baseline justify-between"><p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-red">{t("noticesTitle")}</p><Btn href="/gundem/duyurular" kind="quiet">{t("allNotices")}</Btn></div>
              <ul className="mt-2">{d.notices.map((n) => <NoticeRow key={n.id} item={n} locale={locale} spread />)}</ul>
            </div>
            <div className="min-w-0 lg:col-span-4">
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-red">Sosyal medya</p>
              <SocialLatest posts={d.social} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 04 MEMBERS */}
      <section className="bg-ink py-16 text-white sm:py-20 lg:py-28">
        <div className={container}>
          <SectionHead tone="light" no="04" kicker="Üyeler" title={<>{d.stats.members} üye, {d.sectors} sektör.</>} lead={t("proofLead")} action={<Btn href="/uyeler/firmalar" kind="light">{t("allMembers")}</Btn>} />
        </div>
        <FirmWall names={d.companies} label={nav("companies")} lead={t("firmLead")} className="mt-14 w-full px-5 sm:px-10" />
      </section>

      {/* 05 JOIN */}
      <section className="relative isolate overflow-hidden">
        <img src="/archive/promo/746_adsiad25.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-red/90 mix-blend-multiply" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-black/35" />
        <div className={`${container} grid gap-10 py-20 text-white sm:py-28 lg:grid-cols-12 lg:py-36`}>
          <div className="lg:col-span-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em]">05 — Katılın</p>
            <h2 className="mt-5 font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.95]">{t("joinTitle")}</h2>
            <p className="mt-6 max-w-md text-lg text-white/85">{t("joinLead")}</p>
          </div>
          <div className="flex flex-wrap items-end gap-3 lg:col-span-4 lg:flex-col lg:items-end lg:justify-end">
            <Btn href="/uye-ol" kind="light">{t("joinCta")}</Btn>
            <Btn href="/uyeler/neden" kind="lightLine">Neden üye olmalı</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
