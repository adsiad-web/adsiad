import { cookies } from "next/headers";
import { readFile } from "fs/promises";
import path from "path";
import { redirect } from "next/navigation";
import type { Inquiry } from "@/domain/types";
import { DESK_COOKIE, verifyDeskToken } from "@/infrastructure/desk-auth";

export default async function InboxPage() {
  const jar = await cookies();
  if (!verifyDeskToken(jar.get(DESK_COOKIE)?.value)) redirect("/studio-k7m2");

  let items: Inquiry[] = [];
  try {
    const raw = await readFile(path.join(process.cwd(), "data", "inquiries.json"), "utf8");
    items = JSON.parse(raw) as Inquiry[];
  } catch {
    items = [];
  }

  async function logout() {
    "use server";
    const store = await cookies();
    store.delete(DESK_COOKIE);
    redirect("/studio-k7m2");
  }

  return (
    <div className="min-h-dvh bg-[#070707] p-8 text-[#f4efe6]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#e31e24]">ADSİAD desk</p>
          <h1 className="mt-4 font-serif text-4xl">Gelen kutusu</h1>
        </div>
        <form action={logout}>
          <button type="submit" className="text-xs uppercase tracking-[0.18em] text-white/50">
            Çıkış
          </button>
        </form>
      </div>
      <ul className="mt-10 space-y-6">
        {items.length === 0 ? <li className="text-white/50">Boş.</li> : null}
        {items.map((i) => (
          <li key={i.id} className="border-t border-white/10 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              {i.kind} · {new Date(i.createdAt).toLocaleString("tr-TR")}
            </p>
            <p className="mt-1 text-xl">
              {i.name} · {i.email}
            </p>
            {i.company ? <p className="mt-1 text-sm text-white/50">{i.company}</p> : null}
            <p className="mt-2 text-white/70">{i.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
