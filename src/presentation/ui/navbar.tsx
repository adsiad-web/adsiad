"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandLockup } from "./logo";
import { LocaleSwitch } from "./locale-switch";
import { SocialLinks } from "./social-links";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "./cn";

const subscribe = () => () => {};

export type NavbarData = {
  chair?: { name: string; image?: string };
  members: number;
  sectors: number;
  event?: { title: string; date: string; image?: string; href: string; upcoming: boolean };
  news?: { title: string; date: string; image?: string; href: string };
};

type Item = {
  href: string;
  label: string;
  lead?: string;
  children?: { href: string; label: string; image?: string }[];
  feature?: ReactNode;
};

const thumb = (slug: string) => `/archive/nav/${slug}.webp`;

export function Navbar({ data }: { data: NavbarData }) {
  const t = useTranslations("nav");
  const f = useTranslations("footer");
  const pathname = usePathname();
  // The menu remembers the path it was opened on, so any navigation closes it.
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt !== null && openedAt === pathname;
  const setOpen = (next: boolean | ((value: boolean) => boolean)) => {
    const value = typeof next === "function" ? next(open) : next;
    setOpenedAt(value ? pathname : null);
  };
  const menuButton = useRef<HTMLButtonElement>(null);
  // false during SSR/hydration, true afterwards.
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  // Desktop panel: `href` outlives `open` so the closing panel keeps its content while it fades.
  const [panel, setPanel] = useState<{ href: string; at: string; open: boolean } | null>(null);
  const active = panel?.open && panel.at === pathname ? panel.href : null;
  const timer = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const toggles = useRef<Record<string, HTMLButtonElement | null>>({});
  // Hovered sub-link whose photo replaces the section card; panel photos mount on first open.
  const [preview, setPreview] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const closePanel = () => {
    setPreview(null);
    setPanel((p) => (p ? { ...p, open: false } : p));
  };
  const showPanel = (href: string, now = false) => {
    window.clearTimeout(timer.current);
    const run = () => {
      if (active === href) return;
      setPreview(null);
      setPanel({ href, at: pathname, open: true });
      setVisited((v) => (v.includes(href) ? v : [...v, href]));
    };
    if (now || active) run();
    else timer.current = window.setTimeout(run, 90);
  };
  const hidePanel = (delay = 160) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(closePanel, delay);
  };

  const tel = f("phone").replace(/\s/g, "");
  /** Cesur Modern panel card: full-bleed real photo, dark gradient, text and extras overlaid. */
  const card = (href: string, kicker: string, title: string, image?: string, extra?: ReactNode, avatar?: string) => (
    <div className="group/card relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white">
      {image ? (
        <img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_35%] transition-transform duration-700 group-hover/card:scale-[1.04]" />
      ) : null}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red" />
      <div className="relative p-5">
        {extra}
        <Link href={href} className="flex items-end gap-3 after:absolute after:inset-0 after:content-['']">
          {avatar ? <img src={avatar} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-2 ring-white/80" /> : null}
          <span className="min-w-0">
            <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#ff6a6e]">{kicker}</span>
            <span className="mt-1.5 line-clamp-2 block font-serif text-[1.25rem] leading-snug">{title}</span>
          </span>
        </Link>
      </div>
    </div>
  );

  const items: Item[] = [
    {
      href: "/kurumsal",
      label: t("corporate"),
      lead: t("leadCorporate"),
      children: [
        { href: "/kurumsal", label: t("about"), image: thumb("kurumsal") },
        { href: "/kurumsal/tarihce", label: t("history"), image: thumb("tarihce") },
        { href: "/kurumsal/vizyon", label: t("vision"), image: thumb("vizyon") },
        { href: "/kurumsal/baskan", label: t("president"), image: thumb("baskan") },
        { href: "/kurumsal/kurullar", label: t("boards"), image: thumb("kurullar") },
        { href: "/kurumsal/eski-baskanlar", label: t("pastPresidents"), image: thumb("eski-baskanlar") },
        { href: "/kurumsal/tuzuk", label: t("bylaws"), image: thumb("tuzuk") },
        { href: "/kurumsal/basin-kiti", label: t("press"), image: thumb("basin") },
      ],
      feature: data.chair
        ? card("/kurumsal/baskan", t("featureChair"), data.chair.name, "/nav/kurumsal-genel-kurul.webp", null, data.chair.image)
        : card("/kurumsal", t("corporate"), t("leadCorporate"), "/nav/kurumsal-genel-kurul.webp"),
    },
    {
      href: "/uyeler",
      label: t("members"),
      lead: t("leadMembers"),
      children: [
        { href: "/uyeler", label: t("directory"), image: thumb("uyeler") },
        { href: "/uyeler/firmalar", label: t("companies"), image: thumb("firmalar") },
        { href: "/uyeler/neden", label: t("whyJoin"), image: thumb("neden") },
        { href: "/uye-ol", label: t("apply"), image: thumb("uye-ol") },
      ],
      feature: card(
        "/uye-ol",
        t("join"),
        t("leadMembers"),
        "/nav/uyeler-sohbet.webp",
        <div className="relative z-10 mb-auto flex gap-6 pb-4">
          {[
            [data.members, t("unitMembers")],
            [data.sectors, t("unitSectors")],
          ].map(([n, label]) => (
            <p key={String(label)} className="flex flex-col">
              <span className="font-serif text-[2.4rem] leading-none tabular-nums">{n}</span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.22em] text-white/70">{label}</span>
            </p>
          ))}
        </div>,
      ),
    },
    {
      href: "/faaliyetler",
      label: t("activity"),
      lead: t("leadActivity"),
      children: [
        { href: "/faaliyetler/sali", label: t("tuesday"), image: thumb("sali") },
        { href: "/faaliyetler/takvim", label: t("calendar"), image: thumb("takvim") },
        { href: "/faaliyetler/akademi", label: t("academy"), image: thumb("akademi") },
        { href: "/faaliyetler/projeler", label: t("projects"), image: thumb("projeler") },
        { href: "/faaliyetler/galeri", label: t("gallery"), image: thumb("galeri") },
      ],
      feature: data.event
        ? card(
            data.event.href,
            `${t(data.event.upcoming ? "featureNext" : "featureLast")} · ${data.event.date}`,
            data.event.title,
            data.event.image,
          )
        : null,
    },
    {
      href: "/gundem",
      label: t("agenda"),
      lead: t("leadAgenda"),
      children: [
        { href: "/gundem/haberler", label: t("news"), image: thumb("haberler") },
        { href: "/gundem/duyurular", label: t("announcements"), image: thumb("duyurular") },
        { href: "/gundem/sosyal", label: t("social"), image: thumb("sosyal") },
      ],
      feature: data.news ? card(data.news.href, `${t("featureNews")} · ${data.news.date}`, data.news.title, data.news.image) : null,
    },
    { href: "/iletisim", label: t("contact") },
  ];
  const shown = items.find((item) => item.href === panel?.href);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    const previousBody = document.body.style.overflow;
    root.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenedAt(null);
      menuButton.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) setOpenedAt(null);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = previous;
      document.body.style.overflow = previousBody;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setPanel((p) => (p ? { ...p, open: false } : p));
      toggles.current[active]?.focus();
    };
    const onDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setPanel((p) => (p ? { ...p, open: false } : p));
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [active]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function isOn(href: string) {
    if (!ready) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  /** A child that shares its parent’s address only lights on that page itself. */
  function childOn(href: string, parent: string) {
    if (!ready) return false;
    if (href === parent) return pathname === href;
    return isOn(href);
  }

  return (
    <>
      <div className="hidden border-b border-[var(--line)] lg:block">
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-6 px-8 text-[0.75rem] text-[var(--muted)]">
          <p className="flex items-center gap-6">
            <span>{t("address")}</span>
            <a href={`tel:${tel}`} className="transition-colors hover:text-[var(--fg)]">
              {f("phone")}
            </a>
            <a href={`mailto:${f("email")}`} className="transition-colors hover:text-[var(--fg)]">
              {f("email")}
            </a>
          </p>
          <SocialLinks className="gap-0" />
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--nav)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-3.5 lg:px-8">
          <Link href="/" className="flex min-h-11 min-w-0 shrink items-center" onClick={() => setOpen(false)}>
            <BrandLockup className="h-9 w-auto max-w-full sm:h-12 lg:h-14" />
          </Link>

          <nav
            ref={navRef}
            className="hidden self-stretch lg:-my-3.5 lg:flex"
            onMouseLeave={() => hidePanel()}
            onBlur={(event) => {
              const next = event.relatedTarget as Node | null;
              if (next && !event.currentTarget.contains(next)) closePanel();
            }}
          >
            <ul className="flex items-stretch xl:gap-2">
              {items.map((item, i) => {
                const lit = isOn(item.href) || active === item.href;
                return (
                  <li
                    key={item.href}
                    className="flex items-stretch"
                    onMouseEnter={() => (item.children ? showPanel(item.href) : hidePanel(60))}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center px-3 text-[0.94rem] font-medium tracking-[0.01em] transition-colors",
                        lit ? "text-red" : "text-[var(--fg)] hover:text-red",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 origin-left bg-red transition-transform duration-300 ease-out",
                          lit ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                    {item.children ? (
                      <button
                        ref={(el) => {
                          toggles.current[item.href] = el;
                        }}
                        type="button"
                        aria-expanded={active === item.href}
                        aria-controls={`nav-panel-${i}`}
                        aria-label={t("open", { section: item.label })}
                        onClick={() => (active === item.href ? closePanel() : showPanel(item.href, true))}
                        className={cn(
                          "-ml-2.5 mr-1 grid w-5 place-items-center transition-colors hover:text-red",
                          lit ? "text-red" : "text-[var(--muted)]",
                        )}
                      >
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={cn("size-3 transition-transform duration-200", active === item.href && "rotate-180")}
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            {active && shown?.children ? (
            <div className="absolute inset-x-0 top-full">
              <div className="border-b border-[var(--line)] bg-[var(--bg)]">
                <div className="mx-auto grid max-w-7xl px-8">
                  {items.map((item, i) =>
                    item.href === active && item.children ? (
                      <div key={item.href} id={`nav-panel-${i}`} className="grid grid-cols-12 gap-10 py-10">
                        <div className="col-span-4 flex flex-col" onMouseEnter={() => setPreview(null)}>
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-red">
                            {String(i + 1).padStart(2, "0")} — {item.label}
                          </p>
                          <p className="mt-5 max-w-xs text-balance font-serif text-[1.85rem] leading-[1.12]">{item.lead}</p>
                          <Link
                            href={item.href}
                            className="mt-auto inline-flex items-center gap-2 self-start pt-8 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-red"
                          >
                            {t("goTo", { section: item.label })}
                            <span aria-hidden className="text-red">
                              →
                            </span>
                          </Link>
                        </div>
                        <ul className="col-span-5 grid grid-cols-2 content-start gap-x-8">
                          {item.children.map((child) => (
                            <li key={child.href} className="border-t border-[var(--line)]">
                              <Link
                                href={child.href}
                                onMouseEnter={() => setPreview(child.href)}
                                onFocus={() => setPreview(child.href)}
                                className={cn(
                                  "group/link flex items-center justify-between gap-3 py-3.5 font-serif text-[1.2rem] leading-tight transition-colors hover:text-red",
                                  (childOn(child.href, item.href) || preview === child.href) && "text-red",
                                )}
                              >
                                {child.label}
                                <span
                                  aria-hidden
                                  className={cn(
                                    "text-sm text-red transition duration-200",
                                    preview === child.href ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                                  )}
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <SubPreview
                          kicker={item.label}
                          feature={item.feature}
                          items={visited.includes(item.href) ? item.children : []}
                          active={item.children.find((child) => child.href === preview && child.image)}
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </div>
            ) : null}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <span aria-hidden className="hidden h-4 w-px bg-[var(--line)] lg:block" />
            <LocaleSwitch />
            <ThemeToggle />
            <Link
              href="/uye-ol"
              className="hidden rounded-full bg-red px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-deep sm:inline-flex lg:px-5 lg:py-2.5"
            >
              {t("join")}
            </Link>
            <button
              ref={menuButton}
              type="button"
              className="-mr-2 grid h-11 w-11 place-items-center lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <span className="flex flex-col gap-1.5">
                <span className={cn("block h-px w-5 bg-[var(--fg)] transition", open && "translate-y-2 rotate-45")} />
                <span className={cn("block h-px w-5 bg-[var(--fg)] transition", open && "opacity-0")} />
                <span className={cn("block h-px w-5 bg-[var(--fg)] transition", open && "-translate-y-2 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* Without JavaScript the menu button cannot work: show the main sections as plain links. */}
        <noscript>
          <style>{'button[aria-controls="mobile-menu"]{display:none!important}'}</style>
          <nav
            aria-label="Menu"
            className="flex flex-wrap gap-x-5 border-t border-[var(--line)] px-4 text-xs uppercase tracking-[0.14em] sm:px-5 lg:hidden"
          >
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center">
                {item.label}
              </Link>
            ))}
          </nav>
        </noscript>

        {open ? (
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-t border-[var(--line)] bg-[var(--bg)] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-8 lg:hidden"
          >
            {items.map((item, i) => (
              <div key={item.href} className="border-b border-[var(--line)] py-3">
                <Link
                  href={item.href}
                  className={cn("flex min-h-11 items-baseline gap-3 font-serif text-[1.6rem] leading-none", isOn(item.href) && "text-red")}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-sans text-[0.66rem] tabular-nums tracking-[0.22em] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mt-1 grid grid-cols-2 gap-x-6 pl-8">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={cn(
                            "flex min-h-11 items-center text-[0.95rem]",
                            childOn(child.href, item.href) ? "text-red" : "text-[var(--muted)]",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="flex flex-col gap-1 pt-4 text-sm text-[var(--muted)]">
              <a href={`tel:${tel}`} className="flex min-h-11 items-center">
                {f("phone")}
              </a>
              <a href={`mailto:${f("email")}`} className="flex min-h-11 items-center">
                {f("email")}
              </a>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <SocialLinks className="-ml-3" />
                <Link
                  href="/uye-ol"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center rounded-full bg-red px-6 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white sm:hidden"
                >
                  {t("join")}
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

/** Panel's right column: the section card, or the hovered sub-link's photo. */
function SubPreview({
  kicker,
  feature,
  items,
  active,
}: {
  kicker: string;
  feature: ReactNode;
  items: { href: string; label: string; image?: string }[];
  active?: { href: string; label: string };
}) {
  if (!active) return <div className="col-span-3">{feature}</div>;
  const photo = items.find((item) => item.href === active.href)?.image;
  if (!photo) return <div className="col-span-3">{feature}</div>;
  return (
    <div className="col-span-3">
      <Link href={active.href} tabIndex={-1} aria-hidden className="relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-2xl bg-ink text-white">
        <img src={photo} alt="" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <span className="absolute inset-x-0 top-0 h-1 bg-red" />
        <span className="relative p-5">
          <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#ff6a6e]">{kicker}</span>
          <span className="mt-1.5 block font-serif text-[1.25rem] leading-snug">{active.label}</span>
        </span>
      </Link>
    </div>
  );
}
