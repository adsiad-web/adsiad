import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { galleryRepository, projectRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro } from "@/presentation/ui/page-intro";
import { Kicker } from "@/presentation/ui/chrome";
import { CountUp } from "@/presentation/ui/count-up";
import { ProjectStatus } from "@/presentation/ui/project-ui";
import { PhotoStrip } from "@/presentation/ui/gallery-grid";
import { groupPhotos } from "@/presentation/ui/gallery-data";
import { meta } from "@/presentation/seo";

export function generateStaticParams() {
  return projectRepository.withDetail().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const p = projectRepository.bySlug(slug);
  return p ? meta(locale, loc(p.title, locale), loc(p.lead, locale), p.image) : {};
}

const linkCls = "inline-flex min-h-11 items-center underline decoration-red decoration-2 underline-offset-4 hover:text-red";

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const p = projectRepository.bySlug(slug);
  if (!p) notFound();
  const group = p.galleryId ? galleryRepository.byId(p.galleryId) : undefined;
  const photos = group ? groupPhotos(group, locale) : [];
  return (
    <>
      <PageIntro
        title={loc(p.title, locale)}
        lead={loc(p.lead, locale)}
        before={
          <>
            <Link href="/faaliyetler/projeler" className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--muted)] hover:text-red">
              <span aria-hidden>←</span> {en ? "Projects" : "Projeler"}
            </Link>
            <div className="mt-6">
              <ProjectStatus project={p} locale={locale} />
            </div>
          </>
        }
      />
      {p.image ? (
        <img src={p.image} alt={p.imageAlt ? loc(p.imageAlt, locale) : loc(p.title, locale)} className="mx-auto mt-12 max-h-[60svh] w-full max-w-7xl object-cover px-5 sm:mt-16 lg:mt-20 lg:px-8" />
      ) : null}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-12 pt-10 lg:grid-cols-[1fr_22rem] lg:gap-16 lg:px-8 lg:pt-14">
        <div className="min-w-0">
          {p.numbers?.length ? (
            <section aria-labelledby="impact">
              <Kicker>{en ? "Impact" : "Etki"}</Kicker>
              <h2 id="impact" className="sr-only">{en ? "Impact in numbers" : "Rakamlarla etki"}</h2>
              <dl className="mt-4 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
                {p.numbers.map((n) => (
                  <div key={n.value} className="bg-[var(--bg)] p-5 sm:p-7">
                    <dt className="sr-only">{loc(n.label, locale)}</dt>
                    <dd>
                      <span className="block font-serif text-[3rem] leading-none text-red sm:text-6xl">
                        <CountUp value={n.value} />
                      </span>
                      <span aria-hidden className="mt-3 block leading-6 text-[var(--muted)]">{loc(n.label, locale)}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}
          {p.timeline?.length ? (
            <section aria-labelledby="timeline" className="mt-12">
              <Kicker>{en ? "Timeline" : "Zaman çizelgesi"}</Kicker>
              <h2 id="timeline" className="mt-3 font-serif text-[1.9rem] leading-none sm:text-4xl">{en ? "How it unfolded" : "Adım adım"}</h2>
              <ol className="mt-6 border-l-2 border-red">
                {p.timeline.map((t) => (
                  <li key={t.when.tr} className="relative pb-8 pl-6 last:pb-0">
                    <span aria-hidden className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-red bg-[var(--bg)]" />
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-red">{loc(t.when, locale)}</p>
                    <p className="mt-2 max-w-2xl leading-7">{loc(t.what, locale)}</p>
                    {t.source ? (
                      <a href={t.source} target="_blank" rel="noopener noreferrer" className={`${linkCls} text-sm text-[var(--muted)] decoration-1`}>
                        {en ? "Source post" : "Kaynak paylaşım"}
                        <span className="sr-only"> — {loc(t.when, locale)}</span>
                      </a>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
        <aside aria-label={en ? "Project facts" : "Proje künyesi"} className="self-start border-t-2 border-[var(--fg)] pt-4 lg:sticky lg:top-28">
          {p.facts?.length ? (
            <dl className="divide-y divide-[var(--line)] text-sm">
              {p.facts.map((f) => (
                <div key={f.label.tr} className="py-3">
                  <dt className="text-[0.66rem] uppercase tracking-[0.16em] text-[var(--muted)]">{loc(f.label, locale)}</dt>
                  <dd className="mt-1 leading-6">{loc(f.value, locale)}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {p.related?.length ? (
            <ul className="mt-4 border-t border-[var(--line)] pt-2 text-sm">
              {p.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className={linkCls}>
                    {loc(r.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {p.sources?.length ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              {en ? "Press (in Turkish): " : "Basında: "}
              {p.sources.map((s, i) => (
                <span key={s.href}>
                  {i ? " · " : ""}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-red lg:min-h-0">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          ) : null}
        </aside>
      </div>
      {photos.length ? (
        <section aria-labelledby="photos" className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
          <h2 id="photos" className="border-t border-[var(--line)] pt-8 font-serif text-[1.6rem] leading-none sm:text-3xl">
            {en ? "Photos" : "Fotoğraflar"}
          </h2>
          <div className="mt-6">
            <PhotoStrip photos={photos} locale={locale} />
          </div>
          {group?.credit ? <p className="mt-3 text-xs text-[var(--muted)]">{loc(group.credit, locale)}</p> : null}
        </section>
      ) : (
        <div className="pb-24" />
      )}
    </>
  );
}
