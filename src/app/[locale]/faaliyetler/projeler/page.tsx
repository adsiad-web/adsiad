import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { projectRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { CountUp } from "@/presentation/ui/count-up";
import { ProjectStatus, projectHref } from "@/presentation/ui/project-ui";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Projects" : "Projeler",
    locale === "en" ? "The current project first, then the work the old site named." : "Önce güncel proje, ardından eski sitenin adlandırdığı işler.",
  );
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const all = projectRepository.all();
  const featured = all.filter((p) => p.status === "current");
  const rest = all.filter((p) => p.status !== "current");
  return (
    <>
      <PageIntro
        kicker={en ? "Activities" : "Faaliyetler"}
        title={en ? "Projects" : "Projeler"}
        lead={en ? "The current project first, then the work the old site named." : "Önce güncel proje, ardından eski sitenin adlandırdığı işler."}
      >
        <SectionTabs section="faaliyetler" current="/faaliyetler/projeler" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        {featured.map((p) => {
          const href = projectHref(p);
          return (
            <article key={p.slug} className="grid gap-8 border-b border-[var(--line)] py-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:py-14">
              {p.image ? (
                <span className="reveal-frame block rounded-2xl aspect-[3/2] overflow-hidden bg-[var(--line)]">
                  <img src={p.image} alt={p.imageAlt ? loc(p.imageAlt, locale) : loc(p.title, locale)} className="reveal-photo h-full w-full object-cover" />
                </span>
              ) : null}
              <div className="flex flex-col">
                <ProjectStatus project={p} locale={locale} />
                <h2 className="mt-4 text-balance font-serif text-[2rem] leading-[1.04] sm:text-[2.6rem] lg:text-[3rem]">{loc(p.title, locale)}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">{loc(p.lead, locale)}</p>
                {p.numbers?.length ? (
                  <dl className="mt-6 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)]">
                    {p.numbers.map((n) => (
                      <div key={n.value} className="bg-[var(--bg)] p-4 sm:p-5">
                        <dt className="sr-only">{loc(n.label, locale)}</dt>
                        <dd>
                          <span className="block font-serif text-[2.6rem] leading-none text-red sm:text-5xl">
                            <CountUp value={n.value} />
                          </span>
                          <span aria-hidden className="mt-2 block text-sm leading-5 text-[var(--muted)]">{loc(n.label, locale)}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {href ? (
                  <Link href={href} className="mt-6 inline-flex min-h-11 items-center self-start rounded-full bg-[var(--fg)] px-6 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--bg)] hover:opacity-90">
                    {en ? "View the project" : "Projeyi incele"} →
                  </Link>
                ) : null}
              </div>
            </article>
          );
        })}
        <h2 className="mt-12 font-serif text-[1.9rem] leading-none sm:text-4xl">{en ? "From the old site" : "Önceki siteden"}</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => {
            const href = projectHref(p);
            const inner = (
              <>
                <span className="block aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--line)]">
                  {p.image ? (
                    <img src={p.image} alt={loc(p.title, locale)} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                  ) : (
                    <span aria-hidden className="relative flex h-full flex-col justify-between bg-[linear-gradient(135deg,#e31e24,#8c0a0e)] p-6 text-white">
                      <img src="/brand/logo-png-02.png" alt="" className="h-10 w-auto self-start opacity-90 brightness-0 invert" />
                      <span className="font-serif text-[1.7rem] leading-tight">{loc(p.title, locale)}</span>
                    </span>
                  )}
                </span>
                {p.period ? <span className="mt-4 block text-[0.66rem] uppercase tracking-[0.18em] text-[var(--muted)]">{p.period}</span> : null}
                <span className="mt-3 block font-serif text-[1.5rem] leading-tight transition-colors group-hover:text-red">
                  {loc(p.title, locale)}
                  {href ? " →" : ""}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{loc(p.lead, locale)}</span>
              </>
            );
            return (
              <li key={p.slug}>
                {href ? (
                  <Link href={href} className="group block">
                    {inner}
                  </Link>
                ) : (
                  <div className="group block">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
