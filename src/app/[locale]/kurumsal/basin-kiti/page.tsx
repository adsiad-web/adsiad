import { setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/presentation/ui/page-intro";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Press kit" : "Basın kiti",
    locale === "en"
      ? "Download the 35th-year lockup and the TÜRKONFED special supplement."
      : "35. yıl kilidini ve TÜRKONFED özel ekini indirin.",
  );
}

export default async function PressKitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const kits = [
    { href: "/brand/logo-png-01.png", label: en ? "PNG — full lockup" : "PNG — tam kilit", src: "/brand/logo-png-01.png" },
    { href: "/brand/logo-png-02.png", label: en ? "PNG — 35th year" : "PNG — 35. yıl", src: "/brand/logo-png-02.png" },
    { href: "/brand/logo-jpg-01.jpg", label: en ? "JPEG — light background" : "JPEG — açık zemin", src: "/brand/logo-jpg-01.jpg" },
    { href: "/brand/logo-jpg-02.jpg", label: en ? "JPEG — dark background" : "JPEG — koyu zemin", src: "/brand/logo-jpg-02.jpg" },
  ];
  return (
    <>
      <PageIntro
        kicker={en ? "About" : "Kurumsal"}
        title={en ? "Press kit" : "Basın kiti"}
        lead={
          en
            ? "Download the 35th-year lockup and the TÜRKONFED special supplement."
            : "35. yıl kilidini ve TÜRKONFED özel ekini indirin."
        }
      />
      <div className="mx-auto grid max-w-7xl gap-4 px-5 pb-10 pt-12 sm:px-8 sm:pt-16 md:grid-cols-2 lg:px-10 lg:pt-20">
        {kits.map((k) => (
          <a key={k.href} href={k.href} download className="group rounded-3xl bg-[var(--card)] p-6 ring-1 ring-[var(--line)] transition hover:-translate-y-1 hover:ring-red sm:p-10">
            <img
              src={k.src}
              alt={k.label}
              className={`mx-auto h-20 w-auto max-w-full object-contain sm:h-28 ${k.src.endsWith(".png") ? "mix-blend-multiply dark:mix-blend-plus-lighter" : ""}`}
            />
            <p className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5 text-sm font-medium"><span>{k.label}</span><span aria-hidden className="text-red transition-transform group-hover:translate-y-0.5">↓</span></p>
          </a>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <a href="/docs/turkonfed-adsiad.pdf" className="inline-flex min-h-12 items-center rounded-full bg-red px-6 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white hover:bg-red-deep">
          {locale === "en" ? "TÜRKONFED × ADSİAD special supplement (PDF)" : "TÜRKONFED × ADSİAD özel eki (PDF)"}
        </a>
      </div>
    </>
  );
}
