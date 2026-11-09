/** Feriha Yalçın Apt, Toros Caddesi No: 22, Seyhan. */
const LAT = 37.0021382;
const LNG = 35.3289213;
const EMBED = `https://maps.google.com/maps?ll=${LAT},${LNG}&hl=tr&z=17&output=embed`;
const OPEN = `https://www.google.com/maps?q=${LAT},${LNG}`;

export function VenueMap({ locale }: { locale: string }) {
  const openLabel = locale === "en" ? "Open in Google Maps" : "Google Haritalar’da aç";

  return (
    <figure className="venue-map mt-10">
      <div className="relative aspect-[5/4] overflow-hidden border border-[var(--line)] bg-[var(--bg)] sm:aspect-[4/3]">
        <iframe
          title={locale === "en" ? "ADSİAD on the map" : "ADSİAD haritada"}
          src={EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
        <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full text-red">
          <svg width="36" height="46" viewBox="0 0 28 36" fill="none">
            <path fill="currentColor" d="M14 0C6.82 0 1 5.82 1 13c0 9.4 13 23 13 23s13-13.6 13-23C27 5.82 21.18 0 14 0z" />
            <circle cx="14" cy="13" r="4.5" className="fill-[var(--bg)]" />
          </svg>
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--line)]" />
      </div>
      <figcaption className="mt-3">
        <p className="text-sm leading-6 text-[var(--muted)]">
          {locale === "en"
            ? "22 Toros Avenue, Feriha Yalçın Apartment. The round marks are neighbouring businesses."
            : "Toros Caddesi No: 22, Feriha Yalçın Apt. Yuvarlak işaretler komşu iş yerleridir."}
        </p>
        <a
          href={OPEN}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-[0.7rem] uppercase tracking-[0.18em] text-red"
        >
          {openLabel} →
        </a>
      </figcaption>
    </figure>
  );
}
