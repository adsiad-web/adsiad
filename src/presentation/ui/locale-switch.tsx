"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/** Real links (not buttons), so switching language also works before/without JavaScript. */
export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();

  const item = (next: "tr" | "en", label: string) => (
    <Link
      href={pathname}
      locale={next}
      replace
      scroll={false}
      hrefLang={next}
      aria-current={locale === next ? "page" : undefined}
      // Active locale in brand red (AA-tuned via .locale-on in globals.css); inactive inherits as before.
      className={`inline-flex h-11 min-w-7 items-center justify-center lg:min-w-0${locale === next ? " locale-on" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em]">
      {item("tr", "TR")}
      <span className="text-[var(--line)]">/</span>
      {item("en", "EN")}
    </div>
  );
}
