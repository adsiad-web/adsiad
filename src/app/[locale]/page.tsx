import { setRequestLocale } from "next-intl/server";
import { DIR } from "@/presentation/ui/direction";
import { EditorialHome } from "@/presentation/home/editorial";
import { BoldHome } from "@/presentation/home/bold";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return DIR === "bold" ? <BoldHome locale={locale} /> : <EditorialHome locale={locale} />;
}
