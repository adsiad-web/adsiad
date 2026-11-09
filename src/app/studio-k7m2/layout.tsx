import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Sans, Newsreader } from "next/font/google";

const sans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "ADSİAD desk",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" className={`dark ${sans.variable} ${serif.variable}`}>
      <body className="min-h-dvh bg-[#070707] antialiased">{children}</body>
    </html>
  );
}
