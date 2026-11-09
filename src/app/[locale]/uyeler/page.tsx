import { getTranslations, setRequestLocale } from "next-intl/server";
import { memberRepository } from "@/infrastructure/repositories/catalog";
import { PageIntro } from "@/presentation/ui/page-intro";
import { MemberDirectory } from "@/presentation/ui/member-directory";
import { meta } from "@/presentation/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return meta(
    locale,
    locale === "en" ? "Directory — this is who we are." : "Rehber — işte kimiz.",
    locale === "en" ? "Names and firms, searchable." : "Adlar ve firmalar. Arayın.",
  );
}

export default async function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("common");
  const members = memberRepository.all();
  const sectors = memberRepository.sectors();

  return (
    <>
      <PageIntro
        kicker={locale === "en" ? "Members" : "Üyeler"}
        title={locale === "en" ? "Directory — this is who we are." : "Rehber — işte kimiz."}
        lead={locale === "en" ? "Names and firms, searchable." : "Adlar ve firmalar. Arayın."}
        tight
      />
      <div className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <MemberDirectory
          members={members}
          sectors={sectors}
          labels={{
            search: t("search"),
            all: t("all"),
            sector: t("sector"),
            empty: locale === "en" ? "No names match." : "Eşleşen üye yok.",
          }}
        />
      </div>
    </>
  );
}
