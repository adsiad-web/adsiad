import { createHash, createHmac, randomBytes, timingSafeEqual } from "crypto";

/** Yönetim paneli oturum çerezi. Değeri sabit “1” değil; imzalı jeton. */
export const DESK_COOKIE = "adsiad_desk";

/** Oturum süresi: 12 saat. */
export const DESK_MAX_AGE_SEC = 60 * 60 * 12;

type DeskCookieOpts = {
  httpOnly: true;
  sameSite: "lax";
  path: "/";
  secure: boolean;
  maxAge: number;
};

export function deskCookieOptions(): DeskCookieOpts {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  return {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production" || site.startsWith("https://"),
    maxAge: DESK_MAX_AGE_SEC,
  };
}

function adminPassword(): string | null {
  const pwd = process.env.ADMIN_PASSWORD?.trim() ?? "";
  return pwd.length > 0 ? pwd : null;
}

/** Şifreden türetilmiş HMAC anahtarı (çerezde ham şifre kullanılmaz). */
function sessionKey(): Buffer | null {
  const pwd = adminPassword();
  if (!pwd) return null;
  return createHmac("sha256", "adsiad-desk-v1").update(pwd).digest();
}

function sign(payload: string, key: Buffer): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/** Boş veya tanımsız ADMIN_PASSWORD ile giriş kapalı. */
export function passwordMatches(input: string): boolean {
  const expected = adminPassword();
  if (!expected) return false;
  const a = createHash("sha256").update(`adsiad-pw:${input}`).digest();
  const b = createHash("sha256").update(`adsiad-pw:${expected}`).digest();
  return timingSafeEqual(a, b);
}

/** `exp.nonce.sig` — süre dolmuş veya imza bozuksa null. */
export function mintDeskToken(): string | null {
  const key = sessionKey();
  if (!key) return null;
  const exp = Math.floor(Date.now() / 1000) + DESK_MAX_AGE_SEC;
  const nonce = randomBytes(16).toString("base64url");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${sign(payload, key)}`;
}

export function verifyDeskToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const key = sessionKey();
  if (!key) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expRaw, nonce, sig] = parts;
  if (!expRaw || !nonce || !sig) return false;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  if (!/^[A-Za-z0-9_-]+$/.test(nonce)) return false;
  const payload = `${expRaw}.${nonce}`;
  const expected = sign(payload, key);
  return safeEqual(sig, expected);
}
