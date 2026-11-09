import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { DESK_COOKIE, deskCookieOptions, mintDeskToken, passwordMatches } from "@/infrastructure/desk-auth";
import { clientIpFromHeaders, rateLimit } from "@/infrastructure/rate-limit";

/** IP başına 15 dakikada 8 deneme. */
const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const h = await headers();
    const ip = clientIpFromHeaders(h);
    const gate = rateLimit(`desk-login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
    if (!gate.ok) {
      redirect("/studio-k7m2?e=2");
    }

    const password = String(formData.get("password") ?? "");
    if (!passwordMatches(password)) {
      redirect("/studio-k7m2?e=1");
    }
    const token = mintDeskToken();
    if (!token) {
      redirect("/studio-k7m2?e=1");
    }
    const jar = await cookies();
    jar.set(DESK_COOKIE, token, deskCookieOptions());
    redirect("/studio-k7m2/inbox");
  }

  const err =
    e === "2" ? "Çok fazla deneme. Bir süre sonra yeniden deneyin." : e === "1" ? "Giriş reddedildi." : null;

  return (
    <div className="grid min-h-dvh place-items-center bg-[#070707] text-[#f4efe6]">
      <form action={login} className="w-full max-w-sm space-y-6 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#e31e24]">ADSİAD</p>
        <h1 className="font-serif text-4xl">Desk</h1>
        {err ? <p className="text-sm text-[#e31e24]">{err}</p> : null}
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full border-0 border-b border-white/20 bg-transparent py-3 outline-none"
          placeholder="••••••••"
        />
        <button type="submit" className="rounded-full bg-[#e31e24] px-6 py-2 text-xs uppercase tracking-[0.2em] text-white">
          Giriş
        </button>
      </form>
    </div>
  );
}
