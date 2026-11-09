import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[0.68rem] font-medium uppercase tracking-[0.26em] text-red", className)}>
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "ink",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "ink" | "line" | "red";
  className?: string;
}) {
  const look = {
    ink: "bg-ink text-paper dark:bg-paper dark:text-ink hover:opacity-90",
    line: "border border-[var(--line)] hover:border-[var(--fg)]",
    red: "bg-red text-white hover:bg-red-deep",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center lg:min-h-0 rounded-full px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-200",
        look,
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group relative inline-flex items-center gap-2 text-sm text-red after:absolute after:inset-x-0 after:-inset-y-3", className)}>
      <span className="transition-opacity duration-200 group-hover:opacity-70">{children}</span>
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}

export function EmptyState({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:pt-16 lg:px-8 lg:pt-20">
      <div className="border border-[var(--line)] px-8 py-16 md:px-14 md:py-20">
        <p className="font-serif text-3xl md:text-4xl">{title}</p>
        {lead ? <p className="mt-4 max-w-lg text-[var(--muted)]">{lead}</p> : null}
      </div>
    </div>
  );
}

export function SoftLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("transition-colors duration-200 hover:text-red", className)}>
      {children}
    </Link>
  );
}
