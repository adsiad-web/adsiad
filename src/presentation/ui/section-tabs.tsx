import { Link } from "@/i18n/navigation";
import { cn } from "./cn";
import { pillCls, pillOff, pillOn } from "./pill";

type Tab = { href: string; tr: string; en: string; count?: number };

const sets: Record<"gundem" | "faaliyetler", Tab[]> = {
  gundem: [
    { href: "/gundem", tr: "Genel bakış", en: "Overview" },
    { href: "/gundem/haberler", tr: "Haberler", en: "News" },
    { href: "/gundem/duyurular", tr: "Duyurular", en: "Announcements" },
    { href: "/gundem/sosyal", tr: "Sosyal", en: "Social" },
  ],
  faaliyetler: [
    { href: "/faaliyetler", tr: "Genel bakış", en: "Overview" },
    { href: "/faaliyetler/takvim", tr: "Takvim", en: "Calendar" },
    { href: "/faaliyetler/sali", tr: "Salı", en: "Tuesday" },
    { href: "/faaliyetler/akademi", tr: "Akademi", en: "Academy" },
    { href: "/faaliyetler/projeler", tr: "Projeler", en: "Projects" },
    { href: "/faaliyetler/galeri", tr: "Galeri", en: "Gallery" },
  ],
};

/** Section sub-navigation as pills; horizontally scrollable on small screens. */
export function SectionTabs({ section, current, locale }: { section: keyof typeof sets; current: string; locale: string }) {
  const sharedSubNav: boolean = true; // v2: replaced by shared SubNav in PageIntro
  if (sharedSubNav) return null;
  const en = locale === "en";
  return (
    <nav aria-label={en ? "Section pages" : "Bölüm sayfaları"} className="-mx-5 mt-8 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:px-0">
      <ul className="flex w-max gap-2">
        {sets[section].map((t) => {
          const on = t.href === current;
          return (
            <li key={t.href}>
              <Link href={t.href} aria-current={on ? "page" : undefined} className={cn(pillCls, on ? pillOn : pillOff)}>
                {en ? t.en : t.tr}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
