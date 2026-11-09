import { redirect } from "next/navigation";

export default async function FormerPressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(locale === "en" ? "/en/kurumsal/basin-kiti" : "/kurumsal/basin-kiti");
}
