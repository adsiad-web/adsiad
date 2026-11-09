import { setRequestLocale } from "next-intl/server";
import { pageRepository } from "@/infrastructure/repositories/catalog";
import { loc } from "@/presentation/ui/cn";
import { PageIntro, Prose } from "@/presentation/ui/page-intro";
import { notFound } from "next/navigation";

export function StaticSeedPage({
  slug,
  kicker,
  image,
  imageAlt,
  portrait,
}: {
  slug: string;
  kicker?: string | { tr: string; en: string };
  image?: string;
  imageAlt?: string;
  /** Render the image as a small portrait instead of a full-width banner. */
  portrait?: { tr: string; en: string };
}) {
  return async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const page = pageRepository.bySlug(slug);
    if (!page) notFound();
    return (
      <>
        <PageIntro kicker={typeof kicker === "string" ? kicker : kicker && loc(kicker, locale)} title={loc(page.title, locale)} />
        {image && portrait ? (
          <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14 lg:px-10">
            <figure className="flex max-w-xl items-center gap-5 overflow-hidden rounded-3xl bg-[var(--card)] p-3 pr-6 ring-1 ring-[var(--line)] sm:gap-7">
              <span className="relative shrink-0">
                <span aria-hidden className="absolute -bottom-2 -left-2 h-full w-full rounded-2xl bg-red" />
                <img src={image} alt={imageAlt ?? ""} className="relative aspect-[3/4] w-28 rounded-2xl object-cover object-top sm:w-40" />
              </span>
              <figcaption className="font-serif text-lg leading-snug sm:text-2xl">{loc(portrait, locale)}</figcaption>
            </figure>
          </div>
        ) : image ? (
          <img src={image} alt={imageAlt ?? ""} className="mx-auto mt-12 max-h-[50svh] w-[calc(100%-2.5rem)] max-w-[78rem] rounded-3xl object-cover sm:mt-16 sm:max-h-[70svh] lg:mt-20" />
        ) : null}
        <Prose>{loc(page.body, locale)}</Prose>
      </>
    );
  };
}
