import { setRequestLocale } from "next-intl/server";
import { socialPosts } from "@/infrastructure/seed/social-posts";
import { PageIntro } from "@/presentation/ui/page-intro";
import { SectionTabs } from "@/presentation/ui/section-tabs";
import { formatDate, loc } from "@/presentation/ui/cn";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Social" : "Sosyal",
    locale === "en"
      ? "Posts from the ADSİAD accounts on Instagram, LinkedIn, Facebook and X."
      : "Instagram, LinkedIn, Facebook ve X hesaplarımızdaki paylaşımlar.",
  );
}

export default async function SocialPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const posts = [...socialPosts].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <>
      <PageIntro
        kicker={en ? "Agenda" : "Gündem"}
        title={en ? "Social" : "Sosyal"}
        lead={
          en
            ? "Posts from the ADSİAD accounts on Instagram, LinkedIn, Facebook and X."
            : "Instagram, LinkedIn, Facebook ve X hesaplarımızdaki paylaşımlar."
        }
      >
        <SectionTabs section="gundem" current="/gundem/sosyal" locale={locale} />
      </PageIntro>
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-4 lg:px-8">
        <ul className="divide-y divide-[var(--line)] border-b border-[var(--line)]">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-5 py-8 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-center sm:gap-8 sm:py-10"
              >
                <span className="relative block h-44 overflow-hidden bg-[var(--bg)] sm:h-36">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={loc(post.text, locale)}
                      className={
                        post.imageFit === "contain"
                          ? "absolute inset-0 h-full w-full object-contain"
                          : "absolute inset-0 h-full w-full object-cover object-center"
                      }
                    />
                  ) : null}
                </span>
                <span className="min-w-0">
                  <span className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-red">{post.network}</span>
                  <span className="mt-2 block font-serif text-2xl leading-snug transition-colors group-hover:text-red sm:text-3xl">
                    {loc(post.text, locale)}
                  </span>
                  {post.date ? (
                    <time dateTime={post.date} className="mt-3 block text-sm text-[var(--muted)]">
                      {formatDate(post.date, locale)}
                    </time>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
