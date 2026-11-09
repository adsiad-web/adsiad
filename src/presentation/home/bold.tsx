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

export async function BoldHome({ locale }: { locale: string }) {
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");
  const d = homeV2();
  const stats = [
    { n: d.stats.years, label: t("statYears") },
    { n: d.stats.members, label: t("statMembers") },
    { n: d.sectors, label: t("statSectors") },
  ];

  return (
    <>
      {/* HERO — full bleed photo, 35 integrated */}
      <section className="relative isolate z-10 bg-paper text-ink dark:bg-ink dark:text-white">
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="/archive/promo/185_adsiad-genel_kurul_3.jpg"
            alt=""
            className="absolute left-0 top-0 -z-20 w-[125%] max-w-none object-cover object-[60%_40%] opacity-70 saturate-[0.85] [mask-image:linear-gradient(180deg,#000_55%,transparent)] dark:opacity-60 dark:saturate-100 lg:inset-0 lg:h-full lg:w-full lg:[mask-image:none]"
          />
          <span aria-hidden className="absolute inset-0 -z-10 hidden bg-[linear-gradient(100deg,#0c0c0c_8%,rgba(12,12,12,0.86)_45%,rgba(140,10,14,0.55)_100%)] dark:block" />
          <span aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#f3efe6_12%,rgba(243,239,230,0.93)_42%,rgba(243,239,230,0.62)_72%,rgba(243,239,230,0.45)_100%)] dark:hidden" />
          <span aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-paper to-transparent dark:hidden" />
        </div>
        <div className={`${container} grid min-h-[min(92svh,56rem)] content-between gap-12 pb-0 pt-14 sm:pt-20`}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="order-2 max-w-4xl lg:order-1 lg:col-span-7">
              <p className="inline-flex items-center gap-3 rounded-full bg-white/90 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] ring-1 ring-ink/10 dark:bg-white/10 dark:ring-white/20">
                <img src="/brand/logo-png-02.png" alt="" className="h-5 w-auto dark:brightness-0 dark:invert" /> {t("badgeYears")}
              </p>
              <h1 className="mt-8 font-serif text-[clamp(3.2rem,8.6vw,8rem)] leading-[0.9] tracking-tight">
                {t("heroTitleBefore")} <span className="text-red">{t("heroTitleAccent")}</span> {t("heroTitleAfter")}
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-ink/75 dark:text-white/80 sm:text-xl sm:leading-9">
                {loc(mission, locale)}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Btn href="/kurumsal">{t("meetUs")}</Btn>
                <Btn href="/uye-ol" kind="heroLine">
                  {t("joinCta")}
                </Btn>
              </div>
            </div>
            <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
              <LivingSeal className="seal-lg w-[clamp(10rem,42vw,20rem)] dark:drop-shadow-[0_10px_40px_rgba(227,30,36,0.25)] lg:w-[min(100%,25rem)]" />
            </div>
          </div>
          <ol className="relative z-10 -mb-16 grid gap-3 sm:grid-cols-2 lg:-mb-24 lg:grid-cols-4">
            {pillars.map((p) => (
              <li key={p.no}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-2xl border-t-2 border-red bg-white p-6 text-ink shadow-[0_24px_60px_-28px_rgba(60,20,10,0.35)] ring-1 ring-ink/[0.08] transition-all duration-300 hover:-translate-y-1.5 hover:bg-red hover:text-white hover:ring-red dark:border-transparent dark:bg-[#161313] dark:text-white dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] dark:ring-white/10"
                >
                  <span className="flex items-center justify-between text-xs tabular-nums text-red group-hover:text-white dark:text-white/60">
                    {p.no}
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="mt-6 font-serif text-2xl leading-tight">{loc(p.title, locale)}</span>
                  <span className="mt-2 text-sm leading-6 text-ink/65 group-hover:text-white dark:text-white/75">{loc(p.text, locale)}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-red pb-14 pt-28 text-white lg:pb-20 lg:pt-40">
        <dl className={`${container} grid grid-cols-3`}>
          {stats.map((s) => (
            <div key={s.label} className="border-l border-white/30 pl-3 sm:pl-5">
              <dd className="font-serif text-[clamp(2.25rem,11vw,4.5rem)] leading-none tabular-nums lg:text-[clamp(3.4rem,7vw,6.5rem)]">
                <CountUp value={s.n} />
              </dd>
              <dt className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-[0.7rem] sm:tracking-[0.2em]">{s.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-[var(--bg)]">
        <div className={`${container} ${sectionY} grid items-center gap-12 lg:grid-cols-12`}>
          <div className="relative w-full max-w-sm justify-self-center lg:col-span-5 lg:max-w-none">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl bg-red sm:-left-5 sm:-top-5" aria-hidden />
            <img src={d.chair?.image} alt={d.chair?.name} className="relative aspect-[4/5] w-full rounded-3xl object-cover object-top" />
          </div>
          <div className="lg:col-span-7">
            <SectionHead no="01" kicker={t("whoKicker")} title={t("whoTitle")} />
            <blockquote className="mt-10 border-l-4 border-red pl-6 font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] leading-[1.2]">
              “{t("presidentQuote")}”
            </blockquote>
            <p className="mt-8 text-[0.72rem] uppercase tracking-[0.18em] text-[var(--muted)]">
              {d.chair?.name} · {t("briefChair")} · {d.chair?.company}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/gundem/ikiz-donusumde-yeni-ufuklar-adana" kind="secondary">
                {t("presidentCta")}
              </Btn>
              <Btn href="/kurumsal/kurullar" kind="quiet">
                {t("boards")}
              </Btn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink dark:bg-[#151312] dark:text-paper sm:py-20 lg:py-28">
        <div className={container}>
          <SectionHead
            no="02"
            kicker={t("whatKicker")}
            title={t("whatTitle")}
            lead={nav("leadActivity")}
            action={<Btn href="/faaliyetler">{t("allActivities")}</Btn>}
          />
          <div className="mt-14 grid auto-rows-[minmax(16rem,auto)] gap-4 md:grid-cols-6">
            {d.projects.slice(0, 1).map((p) => (
              <Link
                key={p.slug}
                href={`/faaliyetler/projeler/${p.slug}`}
                className="group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl p-8 text-white md:col-span-4 md:row-span-2"
              >
                <img src={p.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="w-fit rounded-full bg-red px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">
                  {t("projectTag")} · {p.period}
                </span>
                <span className="mt-4 max-w-xl font-serif text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02]">{loc(p.title, locale)}</span>
                <span className="mt-3 max-w-lg text-white/80">{loc(p.lead, locale)}</span>
              </Link>
            ))}
            <Link
              href="/faaliyetler/sali"
              className="group flex flex-col justify-between rounded-3xl bg-red p-7 text-white transition-transform hover:-translate-y-1 md:col-span-2"
            >
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em]">{t("tuesdayTag", { n: d.sali.length })}</span>
              <span className="font-serif text-[2rem] leading-tight">{t("tuesdayTitle")}</span>
              <span className="text-sm text-white/85">{d.sali[0] ? loc(d.sali[0].title, locale) : t("tuesdayLead")} →</span>
            </Link>
            <Link
              href="/faaliyetler/akademi"
              className="group flex flex-col justify-between rounded-3xl bg-ink p-7 text-white ring-1 ring-white/10 transition-transform hover:-translate-y-1 md:col-span-2"
            >
              <span className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-red">
                {t("academyTag", { n: d.akademi.length })}
              </span>
              <span className="font-serif text-[2rem] leading-tight">
                {d.akademi[0] ? loc(d.akademi[0].title, locale) : t("academyFallback")}
              </span>
              <span className="text-sm text-white/70">{d.akademi[0] ? formatDate(d.akademi[0].date, locale) : ""} →</span>
            </Link>
            {d.projects
              .filter((p) => p.image)
              .slice(1, 4)
              .map((p) => (
                <Card
                  key={p.slug}
                  className="md:col-span-2"
                  href={p.detail ? `/faaliyetler/projeler/${p.slug}` : (p.href ?? "/faaliyetler/projeler")}
                  image={p.image}
                  ratio="aspect-[16/10]"
                  kicker={p.period}
                  title={loc(p.title, locale)}
                />
              ))}
          </div>
        </div>
      </section>

      <section className={`${container} ${sectionY}`}>
        <SectionHead no="03" kicker={t("storiesKicker")} title={t("storiesTitle")} action={<Btn href="/gundem" kind="secondary">{t("goAgenda")}</Btn>} />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {d.stories.slice(0, 3).map((s) => (
            <Card
              key={s.id}
              className="min-w-0"
              href={`/gundem/${s.slug}`}
              image={s.image}
              ratio="aspect-[4/3]"
              kicker={formatDate(s.date, locale)}
              title={loc(s.title, locale)}
            />
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="min-w-0 rounded-2xl bg-[var(--card)] p-6 ring-1 ring-[var(--line)] sm:p-8 lg:col-span-2">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-red">{t("noticesTitle")}</p>
              <Btn href="/gundem/duyurular" kind="quiet">
                {t("allNotices")}
              </Btn>
            </div>
            <ul className="mt-2">
              {d.notices.map((n) => (
                <NoticeRow key={n.id} item={n} locale={locale} spread />
              ))}
            </ul>
          </div>
          <div className="min-w-0 rounded-2xl bg-[var(--card)] p-6 ring-1 ring-[var(--line)]">
            <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-red">{t("socialMedia")}</p>
            <SocialLatest posts={d.social} className="w-full" />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink py-16 text-white sm:py-24">
        <div className={container}>
          <SectionHead
            tone="light"
            no="04"
            kicker={nav("members")}
            title={t("membersBand", { members: d.stats.members, sectors: d.sectors })}
            lead={t("proofLead")}
            action={
              <Btn href="/uyeler/firmalar" kind="light">
                {t("allMembers")}
              </Btn>
            }
          />
        </div>
        <FirmWall names={d.companies} label={nav("companies")} lead={t("firmLead")} className="mt-14 w-full px-5 sm:px-10" />
      </section>

      <section className="relative isolate overflow-hidden bg-red text-white">
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-[0.2em] right-0 -z-10 select-none font-serif text-[clamp(14rem,40vw,36rem)] leading-[0.8] text-white/10"
        >
          35
        </span>
        <div className={`${container} py-20 sm:py-28 lg:py-36`}>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em]">{t("joinKicker")}</p>
          <h2 className="mt-5 max-w-3xl font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.9]">{t("joinTitle")}</h2>
          <p className="mt-6 max-w-md text-lg text-white/85">{t("joinLead")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/uye-ol" kind="light">
              {t("joinCta")}
            </Btn>
            <Btn href="/uyeler/neden" kind="lightLine">
              {t("whyJoin")}
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
