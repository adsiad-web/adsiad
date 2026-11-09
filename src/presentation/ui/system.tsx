import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";
import { DIR } from "./direction";

/** Spacing scale: one section rhythm for every page. */
export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10";
export const sectionY = "py-16 sm:py-20 lg:py-28";

/** One button system: primary, secondary, quiet (text + arrow), onDark. */
export function Btn({
  href,
  children,
  kind = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  kind?: "primary" | "secondary" | "quiet" | "light" | "lightLine" | "heroLine";
  className?: string;
}) {
  if (kind === "quiet")
    return (
      <Link href={href} className={cn("group inline-flex items-center gap-3 text-sm font-medium", className)}>
        <span className="border-b border-current pb-0.5 transition-colors group-hover:text-red">{children}</span>
        <span aria-hidden className="text-red transition-transform duration-200 group-hover:translate-x-1">→</span>
      </Link>
    );
  const look = {
    primary: DIR === "bold" ? "bg-red text-white hover:bg-red-deep" : "bg-ink text-paper hover:bg-red dark:bg-paper dark:text-ink dark:hover:bg-red dark:hover:text-white",
    secondary: "border border-[var(--fg)]/25 hover:border-[var(--fg)]",
    light: "bg-white text-ink hover:bg-paper",
    lightLine: "border border-white/40 text-white hover:border-white",
    heroLine: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-white dark:border-white/40 dark:text-white dark:hover:border-white dark:hover:bg-transparent",
  }[kind];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-200",
        DIR === "bold" ? "rounded-full" : "rounded-none",
        look,
        className,
      )}
    >
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** One section header: number, kicker, title, optional lead and action. */
export function SectionHead({
  no,
  kicker,
  title,
  lead,
  action,
  tone = "auto",
  className,
}: {
  no?: string;
  kicker: string;
  title: ReactNode;
  lead?: string;
  action?: ReactNode;
  tone?: "auto" | "light";
  className?: string;
}) {
  const muted = tone === "light" ? "text-white/70" : "text-[var(--muted)]";
  return (
    <header className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-8">
        <p className={cn("flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em]", tone === "light" ? "text-white" : "text-red")}>
          {no ? <span className="tabular-nums">{no}</span> : null}
          {no ? <span aria-hidden className={cn("h-px w-10", tone === "light" ? "bg-white/50" : "bg-red/60")} /> : null}
          <span>{kicker}</span>
        </p>
        <h2 className={cn("mt-5 text-balance font-serif leading-[1.02] tracking-tight", DIR === "bold" ? "text-[clamp(2.4rem,5.4vw,4.75rem)]" : "text-[clamp(2.2rem,4.6vw,4rem)]")}>{title}</h2>
        {lead ? <p className={cn("mt-5 max-w-2xl text-pretty text-base leading-7 sm:text-lg sm:leading-8", muted)}>{lead}</p> : null}
      </div>
      {action ? <div className="md:col-span-4 md:justify-self-end md:pb-2">{action}</div> : null}
    </header>
  );
}

/** One card system: image, kicker/meta, serif title, short text. */
export function Card({
  href,
  image,
  kicker,
  title,
  text,
  meta,
  ratio = "aspect-[4/3]",
  big,
  className,
}: {
  href: string;
  image?: string;
  kicker?: string;
  title: string;
  text?: string;
  meta?: string;
  ratio?: string;
  big?: boolean;
  className?: string;
}) {
  const bold = DIR === "bold";
  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col",
        bold && "overflow-hidden rounded-2xl bg-[var(--card)] shadow-[0_1px_0_var(--line)] ring-1 ring-[var(--line)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {image ? (
        <span className={cn("relative block overflow-hidden bg-[var(--line)]", ratio)}>
          <img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          {bold && kicker ? (
            <span className="absolute left-4 top-4 rounded-full bg-red px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">{kicker}</span>
          ) : null}
        </span>
      ) : null}
      <span className={cn("flex flex-1 flex-col", bold ? "p-6" : "border-t border-[var(--fg)] pt-5 mt-5")}>
        {kicker && !(bold && image) ? <span className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-red">{kicker}</span> : null}
        <span className={cn("block font-serif leading-[1.1] transition-colors group-hover:text-red", kicker && !(bold && image) ? "mt-3" : "", big ? "text-[clamp(1.8rem,2.8vw,2.6rem)]" : "text-[1.55rem] sm:text-[1.7rem]")}>
          {title}
        </span>
        {text ? <span className="mt-3 block text-[0.95rem] leading-7 text-[var(--muted)]">{text}</span> : null}
        {meta ? <span className="mt-auto block pt-5 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--muted)]">{meta}</span> : null}
      </span>
    </Link>
  );
}
