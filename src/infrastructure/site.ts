/** Absolute origin for sitemap, robots and social cards. Set NEXT_PUBLIC_SITE_URL in production. */
export function siteOrigin() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "")
    .trim()
    .replace(/^['"`]+|['"`]+$/g, "")
    .replace(/\/$/, "");

  try {
    const url = new URL(raw || "http://localhost:3000");
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("unsupported protocol");
    }
    return url.origin;
  } catch {
    return "http://localhost:3000";
  }
}
