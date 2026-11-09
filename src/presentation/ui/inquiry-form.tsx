"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type Field = "name" | "email" | "message" | "kvkk";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InquiryForm({ kind }: { kind: "contact" | "membership" }) {
  const t = useTranslations(kind === "membership" ? "join" : "contact");
  const c = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err" | "rate">("idle");
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function clear(field: Field) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const next: Partial<Record<Field, string>> = {};
    if (!String(data.name ?? "").trim()) next.name = c("needName");
    const email = String(data.email ?? "").trim();
    if (!email) next.email = c("needEmail");
    else if (!EMAIL.test(email)) next.email = c("badEmail");
    if (!String(data.message ?? "").trim()) next.message = c("needMessage");
    if (data.kvkk !== "on") next.kvkk = c("needKvkk");
    setErrors(next);
    const first = (["name", "email", "message", "kvkk"] as const).find((key) => next[key]);
    if (first) {
      const el = form.elements.namedItem(first);
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data, kvkk: "on" }),
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else if (res.status === 429) {
        setStatus("rate");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  const field =
    "mt-3 block w-full rounded-xl border-0 bg-[var(--bg)] px-4 py-3 ring-1 ring-[var(--line)] focus:ring-2 focus:ring-red text-base max-lg:normal-case max-lg:tracking-normal text-[var(--fg)] outline-none focus:border-red";

  function note(fieldName: Field) {
    const text = errors[fieldName];
    if (!text) return null;
    return (
      <p id={`${fieldName}-error`} className="mt-2 text-sm text-red">
        {text}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="max-w-xl space-y-6 rounded-3xl bg-[var(--card)] p-6 ring-1 ring-[var(--line)] sm:p-9">
      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-name">
          {c("name")}
        </label>
        <input
          id="inquiry-name"
          name="name"
          autoComplete="name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={() => clear("name")}
          className={field}
        />
        {note("name")}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-email">
          {c("email")}
        </label>
        <input
          id="inquiry-email"
          type="email"
          name="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={() => clear("email")}
          className={field}
        />
        {note("email")}
      </div>
      {kind === "membership" ? (
        <>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-company">
              {t("company")}
            </label>
            <input id="inquiry-company" name="company" autoComplete="organization" className={field} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-sector">
              {t("sector")}
            </label>
            <input id="inquiry-sector" name="sector" className={field} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-phone">
              {t("phone")}
            </label>
            <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" className={field} />
          </div>
        </>
      ) : (
        <div>
          <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-subject">
            {c("subject")}
          </label>
          <input id="inquiry-subject" name="subject" className={field} />
        </div>
      )}
      <div>
        <label className="block text-xs uppercase tracking-[0.18em] text-[var(--muted)]" htmlFor="inquiry-message">
          {c("message")}
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clear("message")}
          className={`${field} resize-none`}
        />
        {note("message")}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-[var(--muted)]">
          <span className="relative mt-0.5 grid h-4 w-4 shrink-0 place-items-center border border-[var(--fg)]">
            <input
              type="checkbox"
              name="kvkk"
              aria-invalid={errors.kvkk ? true : undefined}
              aria-describedby={errors.kvkk ? "kvkk-error" : undefined}
              onChange={() => clear("kvkk")}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span className="pointer-events-none h-2 w-2 scale-0 bg-red transition peer-checked:scale-100" />
          </span>
          <span>{c("kvkk")}</span>
        </label>
        {note("kvkk")}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-12 rounded-full bg-red px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-red-deep disabled:opacity-60 lg:min-h-0"
      >
        {t("send")}
      </button>
      <div aria-live="polite" role="status" className="empty:-mt-7">
        {status === "ok" ? <p className="border-l-2 border-[var(--fg)] py-1 pl-3 text-base">{t("sent")}</p> : null}
        {status === "rate" ? <p className="border-l-2 border-red py-1 pl-3 text-base text-red">{c("rateLimited")}</p> : null}
        {status === "err" ? <p className="border-l-2 border-red py-1 pl-3 text-base text-red">{c("error")}</p> : null}
      </div>
    </form>
  );
}
