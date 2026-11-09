import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandLockup } from "./logo";
import { SocialLinks } from "./social-links";

type Column = { heading: string; links: { href: string; label: string }[] };

const linkCls =
  "inline-flex min-h-11 items-center text-[0.875rem] leading-snug text-[var(--muted)] transition-colors hover:text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red lg:min-h-0 lg:py-1";
const legalCls = linkCls.replace("text-[0.875rem]", "text-[0.75rem] md:text-[0.8rem]");
const legalLinks = [
  ["/gizlilik-politikasi", "privacyPolicy"],
  ["/cerez-politikasi", "cookiePolicy"],
  ["/kvkk", "privacyFull"],
] as const;
const headingCls = "text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg)]";

export async function Footer() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");

  // Only routes that exist under app/[locale].
  const columns: Column[] = [
    {
      heading: nav("corporate"),
      links: [
        { href: "/kurumsal", label: nav("about") },
        { href: "/kurumsal/tarihce", label: nav("history") },
        { href: "/kurumsal/vizyon", label: nav("vision") },
        { href: "/kurumsal/baskan", label: nav("president") },
        { href: "/kurumsal/kurullar", label: nav("boards") },
        { href: "/kurumsal/eski-baskanlar", label: nav("pastPresidents") },
        { href: "/kurumsal/tuzuk", label: nav("bylaws") },
        { href: "/kurumsal/basin-kiti", label: nav("press") },
      ],
    },
    {
      heading: nav("agenda"),
      links: [
        { href: "/gundem/haberler", label: nav("news") },
        { href: "/gundem/duyurular", label: nav("announcements") },
        { href: "/gundem/sosyal", label: nav("social") },
      ],
    },
    {
      heading: nav("activity"),
      links: [
        { href: "/faaliyetler/takvim", label: nav("calendar") },
        { href: "/faaliyetler/sali", label: nav("tuesday") },
        { href: "/faaliyetler/akademi", label: nav("academy") },
        { href: "/faaliyetler/projeler", label: nav("projects") },
        { href: "/faaliyetler/galeri", label: nav("gallery") },
      ],
    },
    {
      heading: t("membership"),
      links: [
        { href: "/uyeler/neden", label: nav("whyJoin") },
        { href: "/uyeler", label: nav("directory") },
        { href: "/uyeler/firmalar", label: nav("companies") },
        { href: "/uye-ol", label: nav("join") },
      ],
    },
  ];
  const tel = t("phone").replace(/\s/g, "");
  const contactItems = (
    <>
      <li>
        <Link href="/iletisim" className={linkCls}>
          {t("contactForm")}
        </Link>
      </li>
      <li>
        <a href={`tel:${tel}`} className={linkCls}>
          {t("phoneLabel")} {t("phone")}
        </a>
      </li>
      <li>
        <a href={`mailto:${t("email")}`} className={linkCls}>
          {t("email")}
        </a>
      </li>
      <li className="pt-2 text-[0.875rem] leading-6 text-[var(--muted)] lg:pt-1">
        {t("faxLabel")} {t("fax")}
      </li>
      <li className="pt-1 text-[0.875rem] leading-6 text-[var(--muted)]">
        <address className="not-italic">{t("address")}</address>
      </li>
    </>
  );
  const summaryCls =
    "flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-red [&::-webkit-details-marker]:hidden";
  const chevron = (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4 shrink-0 text-[var(--muted)] transition-transform duration-200 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <footer className="border-t border-[var(--line)]">
      <nav aria-label={t("navLabel")} className="mx-auto max-w-7xl px-5 py-1 md:py-16 lg:px-8">
        {/* Mobile (< md): collapsed accordion, native details/summary, works without JS. */}
        <div className="divide-y divide-[var(--line)] md:hidden">
          {columns.map((col) => (
            <details key={col.heading} className="group">
              <summary className={summaryCls}>
                {col.heading}
                {chevron}
              </summary>
              <ul className="grid grid-cols-2 gap-x-4 pb-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <details className="group">
            <summary className={summaryCls}>
              {nav("contact")}
              {chevron}
            </summary>
            <ul className="pb-4">{contactItems}</ul>
          </details>
        </div>
        {/* Tablet and desktop (md+): columns. */}
        <div className="hidden gap-x-8 gap-y-10 md:grid md:grid-cols-3 lg:grid-cols-5 lg:gap-y-12">
          {columns.map((col, i) => (
            <section key={col.heading} aria-labelledby={`footer-col-${i}`}>
              <h2 id={`footer-col-${i}`} className={headingCls}>
                {col.heading}
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:mt-4 sm:grid-cols-1 lg:gap-y-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className={headingCls}>
              {nav("contact")}
            </h2>
            <ul className="mt-3 sm:mt-4 lg:space-y-1">{contactItems}</ul>
          </section>
        </div>
      </nav>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pb-2 pt-5 text-center md:py-12 lg:px-8">
          <Link href="/" aria-label="ADSİAD" className="inline-flex justify-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red">
            <BrandLockup className="h-9 w-auto md:h-16" />
          </Link>
          <p className="mt-2 max-w-2xl text-pretty text-[0.7rem] leading-5 text-[var(--muted)] md:mt-5 md:text-[0.8rem] md:leading-6">
            © {new Date().getFullYear()} ADSİAD — {t("tagline")}. {t("rights")}
          </p>
        </div>
      </div>
      {/* Mobile: social icons on one row, legal links below; md+: two separate bordered rows. */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 px-5 pb-3 md:block md:max-w-none md:p-0">
        <div className="md:border-t md:border-[var(--line)]">
          <div className="md:mx-auto md:flex md:max-w-7xl md:justify-center md:px-5 md:py-5 lg:px-8">
            <SocialLinks tone="neutral" label={t("social")} className="justify-center gap-0 md:gap-5" />
          </div>
        </div>
        <div className="md:border-t md:border-[var(--line)]">
          <nav aria-label={t("legal")} className="w-full md:mx-auto md:flex md:max-w-7xl md:justify-center md:px-5 md:py-4 lg:px-8">
            <ul className="flex flex-wrap justify-center gap-x-5 md:gap-x-8">
              {legalLinks.map(([href, key]) => (
                <li key={href}>
                  <Link href={href} className={legalCls}>
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
