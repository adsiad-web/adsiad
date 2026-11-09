"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";

export type StoryBeat = {
  id: string;
  href: string;
  index: string;
  title: string;
  excerpt: string;
  image?: string;
};

export function StoryStage({ stories }: { stories: StoryBeat[] }) {
  const [active, setActive] = useState(0);
  const story = stories[active];
  if (!story) return null;

  return (
    <div className="mt-6 grid items-stretch gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
      <Link href={story.href} className="block">
        <span className="relative block aspect-[4/3] overflow-hidden bg-[#e7e1d4] dark:bg-[#121212]">
          {story.image ? (
            <img key={story.id} src={story.image} alt={story.title} loading="lazy" decoding="async" className="firm-in h-full w-full object-cover" />
          ) : null}
        </span>
      </Link>
      <ul className="flex flex-col justify-between divide-y divide-[var(--line)] border-y border-[var(--line)] lg:h-full">
        {stories.map((item, index) => {
          const on = index === active;
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={(event) => {
                  if (on) return;
                  if (window.matchMedia("(hover: none)").matches) {
                    event.preventDefault();
                    setActive(index);
                  }
                }}
                className={`block py-3 ${on ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}
              >
                <span className="text-[0.68rem] uppercase tracking-[0.18em] text-red">{item.index}</span>
                <span className="mt-1 block font-serif text-xl leading-snug">{item.title}</span>
                {on ? <span className="mt-1.5 line-clamp-2 block max-w-md text-sm leading-5">{item.excerpt}</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
