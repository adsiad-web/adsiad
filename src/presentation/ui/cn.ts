export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function loc(value: { tr: string; en: string }, locale: string) {
  return locale === "en" ? value.en || value.tr : value.tr;
}

export function formatDate(iso: string, locale: string) {
  const bits = iso.split("-");
  const y = Number(bits[0]);
  const m = Number(bits[1]);
  const hasDay = bits.length >= 3 && bits[2] !== "";
  const d = hasDay ? Number(bits[2]) : 1;
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "tr-TR", {
    ...(hasDay ? { day: "numeric" as const } : {}),
    month: "long",
    year: "numeric",
  }).format(new Date(y, (m ?? 1) - 1, d));
}
