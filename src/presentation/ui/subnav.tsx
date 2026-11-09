"use client";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "./cn";
import { DIR } from "./direction";

export const SECTIONS: Record<string, { tr: string; en: string; tabs: { href: string; tr: string; en: string }[] }> = {
  kurumsal: { tr: "Kurumsal", en: "About", tabs: [
    { href: "/kurumsal", tr: "Genel bakış", en: "Overview" },
    { href: "/kurumsal/baskan", tr: "Başkan", en: "Chair" },
    { href: "/kurumsal/kurullar", tr: "Kurullar", en: "Boards" },
    { href: "/kurumsal/tarihce", tr: "Tarihçe", en: "History" },
    { href: "/kurumsal/vizyon", tr: "Vizyon ve misyon", en: "Vision" },
    { href: "/kurumsal/eski-baskanlar", tr: "Eski başkanlar", en: "Past chairs" },
    { href: "/kurumsal/tuzuk", tr: "Tüzük", en: "Statute" },
    { href: "/kurumsal/basin-kiti", tr: "Basın kiti", en: "Press kit" },
  ] },
  uyeler: { tr: "Üyeler", en: "Members", tabs: [
    { href: "/uyeler", tr: "Üye rehberi", en: "Directory" },
    { href: "/uyeler/firmalar", tr: "Üye firmalar", en: "Firms" },
    { href: "/uyeler/neden", tr: "Neden üye olmalı", en: "Why join" },
    { href: "/uye-ol", tr: "Başvuru", en: "Apply" },
  ] },
  faaliyetler: { tr: "Faaliyetler", en: "Activities", tabs: [
    { href: "/faaliyetler", tr: "Genel bakış", en: "Overview" },
    { href: "/faaliyetler/takvim", tr: "Takvim", en: "Calendar" },
    { href: "/faaliyetler/sali", tr: "Salı", en: "Tuesday" },
    { href: "/faaliyetler/akademi", tr: "Akademi", en: "Academy" },
    { href: "/faaliyetler/projeler", tr: "Projeler", en: "Projects" },
    { href: "/faaliyetler/galeri", tr: "Galeri", en: "Gallery" },
  ] },
  gundem: { tr: "Gündem", en: "News", tabs: [
    { href: "/gundem", tr: "Genel bakış", en: "Overview" },
    { href: "/gundem/haberler", tr: "Haberler", en: "News" },
    { href: "/gundem/duyurular", tr: "Duyurular", en: "Announcements" },
    { href: "/gundem/sosyal", tr: "Sosyal", en: "Social" },
  ] },
};

function useSection() {
  const raw = usePathname() || "/";
  const en = raw === "/en" || raw.startsWith("/en/");
  const path = en ? raw.slice(3) || "/" : raw;
  const first = path.split("/")[1] || "";
  const key = first === "uye-ol" ? "uyeler" : first;
  return { en, path, key, section: SECTIONS[key] };
}

export function Breadcrumb({ title, light }: { title: string; light?: boolean }) {
  const { en, key, section, path } = useSection();
  const muted = light ? "text-ink/60 dark:text-white/65" : "text-[var(--muted)]";
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.16em]", muted)}>
      <Link href="/" className="hover:text-red">{en ? "Home" : "Ana sayfa"}</Link>
      {section && path !== `/${key}` ? (
        <>
          <span aria-hidden>/</span>
          <Link href={section.tabs[0].href} className="hover:text-red">{en ? section.en : section.tr}</Link>
        </>
      ) : null}
      <span aria-hidden>/</span>
      <span className={light ? "text-ink dark:text-white" : "text-[var(--fg)]"} aria-current="page">{title}</span>
    </nav>
  );
}

export function SubNav({ light }: { light?: boolean }) {
  const { en, path, section } = useSection();
  if (!section) return null;
  return (
    <nav aria-label={en ? "Section pages" : "Bölüm sayfaları"} className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className={cn("flex w-max gap-1 sm:gap-2", DIR === "editorial" && "gap-6 sm:gap-8")}>
        {section.tabs.map((t) => {
          const on = path === t.href || (t.href !== section.tabs[0].href && path.startsWith(t.href + "/"));
          if (DIR === "editorial")
            return (
              <li key={t.href}>
                <Link href={t.href} aria-current={on ? "page" : undefined}
                  className={cn("relative block whitespace-nowrap py-4 text-[0.82rem] transition-colors", on ? "text-[var(--fg)] after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-red" : "text-[var(--muted)] hover:text-[var(--fg)]")}>
                  {en ? t.en : t.tr}
                </Link>
              </li>
            );
          return (
            <li key={t.href}>
              <Link href={t.href} aria-current={on ? "page" : undefined}
                className={cn("block whitespace-nowrap rounded-full px-4 py-2.5 text-[0.82rem] transition-colors", on ? "bg-ink text-white dark:bg-white dark:text-ink" : light ? "bg-white/60 text-ink/75 ring-1 ring-ink/12 hover:text-ink hover:ring-ink/50 dark:bg-transparent dark:text-white/75 dark:ring-white/20 dark:hover:text-white dark:hover:ring-white/60" : "ring-1 ring-[var(--line)]")}>
                {en ? t.en : t.tr}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Section photo for the bold page header (real nav images). */
export function HeaderArt() {
  const { key, path } = useSection();
  const last = path.split("/").filter(Boolean).pop() || key;
  const map: Record<string, string> = { neden: "neden", firmalar: "firmalar", "uye-ol": "uye-ol", baskan: "baskan", kurullar: "kurullar", tarihce: "tarihce", vizyon: "vizyon", tuzuk: "tuzuk", "eski-baskanlar": "eski-baskanlar", "basin-kiti": "basin", sali: "sali", akademi: "akademi", projeler: "projeler", galeri: "galeri", takvim: "takvim", haberler: "haberler", duyurular: "duyurular", sosyal: "sosyal" };
  const img = map[last] ?? (SECTIONS[key] ? (key === "faaliyetler" ? "sali" : key === "gundem" ? "haberler" : key) : "kurumsal");
  return (
    <>
      <img src={`/archive/nav/${img}.webp`} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-80 saturate-[0.8] dark:opacity-45 dark:saturate-100" />
      <span aria-hidden className="absolute inset-0 hidden bg-[linear-gradient(90deg,#0c0c0c_0%,rgba(12,12,12,0.88)_45%,rgba(12,12,12,0.55)_100%)] dark:block" />
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,#f3efe6_0%,rgba(243,239,230,0.94)_45%,rgba(243,239,230,0.6)_100%)] dark:hidden" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-red" />
      <span aria-hidden className="absolute -bottom-24 -right-10 select-none font-serif text-[22rem] leading-none text-ink/[0.04] dark:text-white/[0.04]">35</span>
    </>
  );
}
