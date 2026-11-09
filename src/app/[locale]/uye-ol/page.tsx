import { getTranslations, setRequestLocale } from "next-intl/server";
import { meta } from "@/presentation/seo";
import { PageIntro } from "@/presentation/ui/page-intro";
import { InquiryForm } from "@/presentation/ui/inquiry-form";
import { Link } from "@/i18n/navigation";
import { getNavigationData } from "@/application/get-navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "join" });
  return meta(locale, t("title"), t("lead"));
}

// Benefit headings and lines are condensed from the "Neden üye olmalı" page (seed: neden-uye).
const benefits = [
  { tr: ["Geleneksel Salı Toplantıları", "Üyeleri kamu ve iş dünyasından konuklarla bir araya getiren imza programı."], en: ["Traditional Tuesday Meetings", "The signature programme that brings members together with guests from the public sector and business."] },
  { tr: ["ADSİAD Akademi", "Üyelerin ekonomik, sosyal ve kültürel gelişimine yönelik eğitim ve söyleşiler."], en: ["ADSİAD Academy", "Training sessions and talks for members’ economic, social and cultural development."] },
  { tr: ["Güçlü bir üye ağı", "Sanayiden tarıma, tekstilden enerjiye geniş bir yelpazede iş ve güç birliği."], en: ["A strong member network", "Cooperation across sectors, from industry and agriculture to textiles and energy."] },
  { tr: ["Bölgesel ve ulusal temsil", "ÇUKUROVA SİFED ve TÜRKONFED bağıyla üyelerin sesi daha geniş platformlarda."], en: ["Regional and national voice", "Through ÇUKUROVA SİFED and TÜRKONFED, members’ voice reaches wider platforms."] },
];

export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("join");
  const f = await getTranslations("footer");
  const en = locale === "en";
  const L = (x: { tr: string[]; en: string[] }) => (en ? x.en : x.tr);
  const nav = getNavigationData();

  const stats = (
    <div className="grid grid-cols-2 divide-x divide-white/15 border-y border-white/15">
      {[
        [nav.members, en ? "Members" : "Üye"],
        [nav.sectors, en ? "Sectors" : "Sektör"],
      ].map(([n, label]) => (
        <p key={String(label)} className="px-5 py-4 first:pl-0">
          <span className="block font-serif text-[2.6rem] leading-none tabular-nums">{n}</span>
          <span className="mt-1 block text-[0.62rem] uppercase tracking-[0.22em] text-white/60">{label}</span>
        </p>
      ))}
    </div>
  );
  const contact = (
    <p className="text-sm text-white/70">
      {en ? "Questions? " : "Sorunuz mu var? "}
      <a href={`tel:${f("phone").replace(/\s/g, "")}`} className="text-white underline-offset-4 hover:underline">{f("phone")}</a>
      {" · "}
      <a href={`mailto:${f("email")}`} className="text-white underline-offset-4 hover:underline">{f("email")}</a>
    </p>
  );

  const panelA = (
    <aside className="overflow-hidden rounded-3xl bg-ink text-white lg:sticky lg:top-28">
      <div className="relative aspect-[16/10]">
        <img src="/nav/uyeler-sohbet.webp" alt={en ? "ADSİAD members at the October conversation meeting" : "Ekim ayı sohbet toplantısında ADSİAD üyeleri"} className="absolute inset-0 h-full w-full object-cover" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-red" />
        <p className="absolute bottom-4 left-6 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#ff6a6e]">{en ? "Why ADSİAD?" : "Neden ADSİAD?"}</p>
      </div>
      <div className="space-y-6 p-6 pt-2 sm:p-8 sm:pt-3">
        <ol className="space-y-4">
          {benefits.map((b, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-1 font-sans text-[0.66rem] tabular-nums tracking-[0.2em] text-red">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="block font-serif text-[1.15rem] leading-snug">{L(b)[0]}</span>
                <span className="mt-1 block text-sm leading-relaxed text-white/65">{L(b)[1]}</span>
              </span>
            </li>
          ))}
        </ol>
        {stats}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {contact}
          <Link href="/uyeler/neden" className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white hover:text-[#ff6a6e]">{en ? "Why join →" : "Neden üye olmalı →"}</Link>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <PageIntro kicker={en ? "Members" : "Üyeler"} title={t("title")} lead={t("lead")} />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-12 lg:px-10 lg:pt-20">
        <div className="lg:col-span-7 [&_form]:max-w-none">
          <InquiryForm kind="membership" />
        </div>
        <div className="lg:col-span-5">{panelA}</div>
      </div>
    </>
  );
}
