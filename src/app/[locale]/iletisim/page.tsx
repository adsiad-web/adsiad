import { getTranslations, setRequestLocale } from "next-intl/server";
import { meta } from "@/presentation/seo";
import { PageIntro } from "@/presentation/ui/page-intro";
import { InquiryForm } from "@/presentation/ui/inquiry-form";
import { SocialLinks } from "@/presentation/ui/social-links";
import { VenueMap } from "@/presentation/ui/venue-map";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return meta(locale, t("title"), t("lead"));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const f = await getTranslations("footer");
  return (
    <>
      <PageIntro title={t("title")} lead={t("lead")} />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 pt-12 sm:gap-10 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-2 lg:px-10 lg:pt-20">
        <div className="min-w-0 rounded-3xl bg-ink p-6 text-white ring-1 ring-white/10 sm:p-9 [--fg:#f4efe6] [--muted:rgba(244,239,230,0.7)] [--line:rgba(244,239,230,0.14)]">
          <span aria-hidden className="mb-6 block h-0.5 w-10 bg-red" />
          <p className="font-serif text-2xl leading-snug sm:text-3xl md:text-4xl">{f("address")}</p>
          <p className="mt-6 text-xl">{f("phone")}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{f("faxLabel")} {f("fax")}</p>
          <SocialLinks className="mt-8 sm:mt-10" tone="red" />
          <VenueMap locale={locale} />
        </div>
        <InquiryForm kind="contact" />
      </div>
    </>
  );
}
