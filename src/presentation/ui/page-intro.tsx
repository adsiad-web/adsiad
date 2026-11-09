import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { DIR } from "./direction";
import { Breadcrumb, HeaderArt, SubNav } from "./subnav";

export function PageIntro({
  kicker,
  title,
  lead,
  before,
  tight,
  children,
}: {
  kicker?: string;
  title: string;
  lead?: string;
  before?: ReactNode;
  tight?: boolean;
  children?: ReactNode;
}) {
  void tight;
  void children; // old per-page tabs replaced by the shared SubNav
  if (DIR === "bold") {
    return (
      <header className="relative isolate overflow-hidden bg-paper text-ink dark:bg-ink dark:text-white">
        <HeaderArt />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 pt-10 sm:px-8 sm:pt-14 lg:px-10 lg:pt-20">
          {before ? <div className="mb-6 [&_a]:text-ink/75 dark:[&_a]:text-white/80">{before}</div> : <Breadcrumb title={title} light />}
          <div className="mt-8 max-w-4xl">
            {kicker ? <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-red">{kicker}</p> : null}
            <h1 className="mt-4 text-balance break-words font-serif text-[clamp(2.6rem,6.6vw,5.8rem)] leading-[0.96] tracking-tight">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-ink/70 dark:text-white/75 sm:text-lg sm:leading-8">{lead}</p> : null}
          </div>
          <div className="mt-10 border-t border-ink/10 pt-5 dark:border-white/15 sm:mt-14">
            <SubNav light />
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="border-b border-[var(--line)]">
      <div className="mx-auto w-full max-w-7xl px-5 pt-8 sm:px-8 sm:pt-12 lg:px-10 lg:pt-16">
        {before ? <div className="mb-6">{before}</div> : <Breadcrumb title={title} />}
        <div className="mt-10 grid gap-6 border-t border-[var(--fg)] pt-6 md:grid-cols-12 md:gap-10 lg:mt-14">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-red md:col-span-3 md:pt-4">{kicker ?? ""}</p>
          <div className="md:col-span-9">
            <h1 className="text-balance break-words font-serif text-[clamp(2.6rem,6.2vw,5.4rem)] leading-[0.98] tracking-tight [hyphens:auto]">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">{lead}</p> : null}
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--line)] sm:mt-14">
          <SubNav />
        </div>
      </div>
    </header>
  );
}

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const [, label, href] = m;
    const cls = "underline decoration-red decoration-2 underline-offset-4 hover:text-red";
    out.push(
      href.startsWith("/") ? (
        <Link key={start} href={href} className={cls}>
          {label}
        </Link>
      ) : (
        <a key={start} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {label}
        </a>
      ),
    );
    last = start + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** A short line with capital letters and no lowercase letters, e.g. "GENEL POLİTİKA". */
function isHeading(line: string) {
  return line.length <= 80 && /\p{Lu}/u.test(line) && !/\p{Ll}/u.test(line);
}

/**
 * Plain-text body renderer. Supports, line by line:
 * ALL-CAPS lines as section headings, "- " lines as bullet lists,
 * and [label](/path) links. Everything else renders as a paragraph.
 */
export function Prose({ children, bare = false }: { children: string; bare?: boolean }) {
  const lines = children.split("\n");
  const blocks: ReactNode[] = [];
  const toc: { id: string; label: string }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const p = lines[i].trim();
    if (!p) {
      blocks.push(<br key={i} />);
    } else if (p.startsWith("- ")) {
      const items: string[] = [];
      const key = i;
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      i--;
      blocks.push(
        <ul key={key} className="mb-5 list-disc space-y-2 pl-5 text-base leading-7 sm:pl-6 sm:text-lg sm:leading-8 text-[var(--fg)] marker:text-red">
          {items.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>,
      );
    } else if (isHeading(p)) {
      const id = `b-${toc.length + 1}`;
      toc.push({ id, label: p });
      blocks.push(
        <h2 key={i} id={id} className="mb-5 mt-14 scroll-mt-28 border-t border-[var(--line)] pt-8 break-words font-serif text-[1.3rem] leading-tight tracking-[0.02em] text-[var(--fg)] sm:text-[1.6rem] md:text-[1.85rem]">
          <span aria-hidden className="mb-3 block font-sans text-[0.66rem] font-semibold tracking-[0.22em] text-red">{String(toc.length).padStart(2, "0")}</span>
          {p}
        </h2>,
      );
    } else {
      blocks.push(
        <p key={i} className="mb-5 break-words text-base leading-7 text-[var(--fg)] sm:text-lg sm:leading-8">
          {inline(p)}
        </p>,
      );
    }
  }
  if (bare) return <div className="max-w-3xl">{blocks}</div>;
  return (
    <div className="mx-auto grid w-full max-w-7xl px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 md:grid-cols-12 md:gap-10 lg:px-10 lg:pt-20">
      {toc.length >= 3 ? (
        <nav aria-label="İçindekiler" className="hidden md:col-span-3 md:block">
          <ol className="sticky top-28 space-y-1 border-l border-[var(--line)] text-[0.8rem] leading-5">
            {toc.map((h, n) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-[var(--muted)] transition-colors hover:border-red hover:text-[var(--fg)]">
                  <span className="mr-2 tabular-nums text-red">{String(n + 1).padStart(2, "0")}</span>
                  {h.label.charAt(0) + h.label.slice(1).toLocaleLowerCase("tr")}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className={`max-w-[44rem] md:col-span-9 ${toc.length >= 3 ? "" : "md:col-start-4"}`}>{blocks}</div>
    </div>
  );
}
