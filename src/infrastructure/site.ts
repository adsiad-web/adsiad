/** Absolute origin for sitemap, robots and social cards. Set NEXT_PUBLIC_SITE_URL in production. */
export function siteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
