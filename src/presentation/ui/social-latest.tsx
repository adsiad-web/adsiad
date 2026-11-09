"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { cn, formatDate, loc } from "@/presentation/ui/cn";
import type { SocialPost } from "@/infrastructure/seed/social-posts";

/** One social post at a time, in the slot the homepage news card used. Arrows and a sideways drag move it. */
export function SocialLatest({ posts, className }: { posts: SocialPost[]; className?: string }) {
  const locale = useLocale();
  const t = useTranslations("home");
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [live, setLive] = useState(true);
  const origin = useRef<number | null>(null);
  const moved = useRef(false);
  const count = posts.length;

  function go(next: number) {
    if (count < 2) return;
    setLive(true);
    setDrag(0);
    setIndex(((next % count) + count) % count);
  }

  function onDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || count < 2) return;
    origin.current = event.clientX;
    moved.current = false;
    setLive(false);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    if (origin.current === null) return;
    const dx = event.clientX - origin.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  }

  function onUp(event: React.PointerEvent<HTMLDivElement>) {
    if (origin.current === null) return;
    const dx = event.clientX - origin.current;
    origin.current = null;
    setLive(true);
    setDrag(0);
    if (dx <= -56) go(index + 1);
    else if (dx >= 56) go(index - 1);
  }

  if (count === 0) return null;
  const current = posts[index];

  const n = String(index + 1).padStart(2, "0");

  return (
    <article className={cn("min-w-0", className)} aria-roledescription="carousel" aria-label={t("followSocial")}>
      <div
        className="overflow-hidden"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={cn("flex", live && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none")}
          style={{ width: `${count * 100}%`, transform: `translateX(calc(${(-index * 100) / count}% + ${drag}px))` }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noreferrer"
              aria-hidden={post.id === current.id ? undefined : true}
              tabIndex={post.id === current.id ? undefined : -1}
              className="grid shrink-0 grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] md:grid-cols-[7.5rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)]"
              style={{ width: `${100 / count}%` }}
              onClick={(event) => {
                if (moved.current) event.preventDefault();
              }}
            >
              <span className="relative block h-36 overflow-hidden bg-[var(--bg)] sm:h-44">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    draggable={false}
                    className={cn("absolute inset-0 h-full w-full", post.imageFit === "contain" ? "object-contain" : "object-cover object-center")}
                  />
                ) : (
                  <span className="grid h-full min-h-44 place-items-center px-6 text-center font-serif text-3xl text-[var(--muted)]">{post.network}</span>
                )}
              </span>
              <span className="flex min-w-0 flex-col justify-center px-4 py-3">
                <span className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-red">{post.network}</span>
                <span className="mt-2 line-clamp-3 font-serif text-xl leading-snug">{loc(post.text, locale)}</span>
                {post.date ? <span className="mt-2 block text-xs text-[var(--muted)]">{formatDate(post.date, locale)}</span> : null}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="font-serif text-sm tabular-nums leading-none">{n}</span>
        <div className="relative flex h-8 min-w-0 flex-1 items-center pointer-coarse:h-11">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--line)]" />
          <span
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-red transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
            style={{ width: `${((index + 1) / count) * 100}%` }}
          />
          <span className="relative flex w-full">
            {posts.map((post, i) => (
              <button
                key={post.id}
                type="button"
                aria-label={t("socialGo", { n: String(i + 1) })}
                aria-current={i === index ? "true" : undefined}
                onClick={() => go(i)}
                className="h-8 flex-1"
              />
            ))}
          </span>
        </div>
        <div className="flex">
          <button
            type="button"
            aria-label={t("socialPrev")}
            onClick={() => go(index - 1)}
            className="grid size-8 place-items-center text-sm text-[var(--muted)] transition-colors hover:text-red pointer-coarse:size-11"
          >
            ←
          </button>
          <button
            type="button"
            aria-label={t("socialNext")}
            onClick={() => go(index + 1)}
            className="grid size-8 place-items-center text-sm text-[var(--muted)] transition-colors hover:text-red pointer-coarse:size-11"
          >
            →
          </button>
        </div>
      </div>
    </article>
  );
}
