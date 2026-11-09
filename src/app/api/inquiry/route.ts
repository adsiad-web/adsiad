import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import type { Inquiry } from "@/domain/types";
import { DESK_COOKIE, verifyDeskToken } from "@/infrastructure/desk-auth";
import { clientIpFromHeaders, rateLimit } from "@/infrastructure/rate-limit";

const file = path.join(process.cwd(), "data", "inquiries.json");

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = {
  name: 120,
  email: 160,
  message: 4000,
  subject: 200,
  company: 200,
  sector: 120,
  phone: 40,
} as const;

/** IP başına 15 dakikada 5 gönderim. */
const POST_LIMIT = 5;
const POST_WINDOW_MS = 15 * 60 * 1000;

async function load(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}

function clip(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

function optional(value: unknown, max: number): string | undefined {
  const s = clip(value, max);
  return s ? s : undefined;
}

export async function POST(request: Request) {
  const h = await headers();
  const ip = clientIpFromHeaders(h);
  const gate = rateLimit(`inquiry:${ip}`, POST_LIMIT, POST_WINDOW_MS);
  if (!gate.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(gate.retryAfterSec) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = clip(body.name, MAX.name);
  const email = clip(body.email, MAX.email).toLowerCase();
  const message = clip(body.message, MAX.message);
  if (!name || !email || !message || body.kvkk !== "on") {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ ok: false, error: "bad_email" }, { status: 400 });
  }

  const item: Inquiry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    kind: body.kind === "membership" ? "membership" : "contact",
    name,
    email,
    subject: optional(body.subject, MAX.subject),
    company: optional(body.company, MAX.company),
    sector: optional(body.sector, MAX.sector),
    phone: optional(body.phone, MAX.phone),
    message,
  };

  const all = await load();
  all.unshift(item);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(all, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  if (!verifyDeskToken(jar.get(DESK_COOKIE)?.value)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await load());
}
