"use client";

import { useState } from "react";
import { Portrait } from "@/presentation/ui/logo";

export type RosterPerson = {
  id: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
};

export function BoardRoster({ title, people }: { title: string; people: RosterPerson[] }) {
  const [active, setActive] = useState(0);
  const person = people[active] ?? people[0];
  if (!person) return null;

  return (
    <div>
      <h2 className="text-[0.68rem] uppercase tracking-[0.24em] text-red">{title}</h2>
      <div className="mt-6 grid items-start gap-6 sm:mt-8 sm:gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
        <div className="sticky top-[4.3125rem] z-20 border-b border-[var(--line)] bg-[var(--bg)] pb-4 sm:top-[4.8rem] sm:pb-5 lg:top-24 lg:z-auto lg:border-0 lg:bg-transparent lg:pb-0">
          <div key={person.id} className="firm-in grid grid-cols-[6.5rem_1fr] items-end gap-x-5 sm:grid-cols-[10rem_1fr] lg:block">
            <Portrait name={person.name} image={person.image} className="row-span-4 w-full lg:max-w-xs" />
            <p className="font-serif text-xl leading-tight sm:text-2xl lg:mt-4">{person.name}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{person.role}</p>
            {person.company ? (
              <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{person.company}</p>
            ) : null}
          </div>
        </div>
        <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {people.map((member, index) => {
            const on = index === active;
            return (
              <li key={member.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`flex w-full items-baseline justify-between gap-4 py-3 text-left sm:gap-6 sm:py-4 transition-colors ${on ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}
                >
                  <span className="min-w-0 break-words font-serif text-xl leading-tight sm:text-2xl md:text-3xl">{member.name}</span>
                  <span className="hidden shrink-0 text-sm sm:block">{member.role}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
