"use client";

import { useMemo, useState } from "react";
import type { Member } from "@/domain/types";

export function MemberDirectory({
  members,
  sectors,
  labels,
}: {
  members: Member[];
  sectors: string[];
  labels: { search: string; all: string; sector: string; empty: string };
}) {
  const [q, setQ] = useState("");
  const [sector, setSector] = useState("all");

  const filtered = useMemo(() => {
    const query = q.trim().toLocaleLowerCase("tr");
    return members.filter((m) => {
      const hit =
        !query ||
        m.name.toLocaleLowerCase("tr").includes(query) ||
        m.company.toLocaleLowerCase("tr").includes(query);
      return hit && (sector === "all" || m.sector === sector);
    });
  }, [members, q, sector]);

  const chips = [{ value: "all", label: labels.all }, ...sectors.map((s) => ({ value: s, label: s }))];

  return (
    <div className="pt-10 sm:pt-14">
      <div className="rounded-3xl bg-[var(--card)] p-5 ring-1 ring-[var(--line)] sm:p-8">
        <div>
          <label htmlFor="member-search" className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-red">
            {labels.search}
          </label>
          <div className="mt-3 flex min-h-16 max-w-2xl items-center gap-3 rounded-full bg-[var(--bg)] px-5 ring-1 ring-[var(--line)] focus-within:ring-2 focus-within:ring-red sm:px-6">
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[var(--muted)]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              id="member-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 border-0 bg-transparent py-4 text-lg text-[var(--fg)] outline-none placeholder:text-[var(--muted)]"
            />
          </div>
        </div>
        <div className="mt-7">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{labels.sector}</p>
          <div className="mt-3 flex flex-wrap gap-2" role="listbox" aria-label={labels.sector}>
            {chips.map((chip) => {
              const on = sector === chip.value;
              return (
                <button
                  key={chip.value}
                  type="button"
                  role="option"
                  aria-selected={on}
                  onClick={() => setSector(chip.value)}
                  className={
                    on
                      ? "rounded-full bg-red px-4 py-2 text-sm leading-5 text-white"
                      : "rounded-full px-4 py-2 text-sm leading-5 text-[var(--muted)] ring-1 ring-[var(--line)] transition-colors hover:text-[var(--fg)] hover:ring-[var(--fg)]"
                  }
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">
        {filtered.length} / {members.length}
      </p>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-serif text-2xl text-[var(--muted)]">{labels.empty}</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <li
              key={m.id}
              className="ink-flip flex min-w-0 flex-col rounded-2xl bg-[var(--card)] p-5 ring-1 ring-[var(--line)] sm:p-6"
            >
              <p className="w-fit rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-red ring-1 ring-red/30">{m.sector}</p>
              <p className="mt-4 break-words font-serif text-[1.45rem] leading-tight sm:text-[1.6rem]">{m.name}</p>
              <p className="mt-1.5 break-words leading-6 text-[var(--muted)]">{m.company}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
