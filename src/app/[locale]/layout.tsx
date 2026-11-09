import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getNavigationData } from "@/application/get-navigation";
import { Providers, ThemeBoot } from "@/presentation/theme/providers";
import { formatDate, loc } from "@/presentation/ui/cn";
import { Navbar, type NavbarData } from "@/presentation/ui/navbar";
import { Footer } from "@/presentation/ui/footer";
import { ToTop } from "@/presentation/ui/to-top";
import { siteOrigin } from "@/infrastructure/site";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3efe6" },
    { media: "(prefers-color-scheme: dark)", color: "#070707" },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteOrigin()),
    title: { default: t("title"), template: "%s — ADSİAD" },
    description: t("description"),
    icons: { icon: "/brand/favicon.svg" },
    // iOS turns bare phone numbers into links before hydration and the tree no longer matches.
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: {
      type: "website",
      siteName: "ADSİAD",
      locale: locale === "en" ? "en_GB" : "tr_TR",
      title: t("title"),
      description: t("description"),
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const nav = getNavigationData();
  const navData: NavbarData = {
    chair: nav.chair ? { name: nav.chair.name, image: nav.chair.image } : undefined,
    members: nav.members,
    sectors: nav.sectors,
    event: nav.event
      ? {
          title: loc(nav.event.title, locale),
          date: formatDate(nav.event.date, locale),
          image: nav.event.image,
          href: nav.event.href ?? "/faaliyetler/takvim",
          upcoming: nav.eventIsUpcoming,
        }
      : undefined,
    news: nav.news
      ? {
          title: loc(nav.news.title, locale),
          date: formatDate(nav.news.date, locale),
          image: nav.news.image,
          href: `/gundem/${nav.news.slug}`,
        }
      : undefined,
  };

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh antialiased">
        <ThemeBoot />
        <div className="grain" />
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navbar data={navData} />
            <main>{children}</main>
            <Footer />
            <ToTop />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
