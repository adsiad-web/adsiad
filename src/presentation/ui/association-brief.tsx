import { Link } from "@/i18n/navigation";
import { SocialLinks } from "./social-links";

type Tile = { href: string; kicker: string; title: string; ink?: boolean };

/** Compact association card: chair, then two signature programmes. */
export function AssociationBrief({
  chair,
  detailsLabel,
  note,
  tiles,
}: {
  chair?: { name: string; role: string; image?: string; href: string };
  detailsLabel: string;
  note: string;
  tiles: [Tile, Tile];
}) {
  return (
    <div className="overflow-hidden border border-[var(--line)]">
      {chair ? (
        <div className="flex items-stretch">
          <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
            <p className="text-[0.64rem] font-medium uppercase tracking-[0.2em] text-red">{chair.role}</p>
            <p className="mt-2 font-serif text-[1.55rem] leading-tight sm:text-[1.7rem]">{chair.name}</p>
            <p className="mt-3 text-pretty text-sm leading-6 text-[var(--muted)]">{note}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-5">
              <Link
                href={chair.href}
                className="inline-flex items-center gap-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-red"
              >
                <span aria-hidden className="grid size-5 place-items-center rounded-full border border-current text-[0.6rem]">
                  →
                </span>
                {detailsLabel}
              </Link>
              <SocialLinks className="-ml-1" />
            </div>
          </div>
          {chair.image ? (
            <span className="w-24 shrink-0 overflow-hidden bg-[var(--line)] sm:w-[7.5rem] md:w-36">
              <img src={chair.image} alt={chair.name} className="h-full w-full object-cover object-top" />
            </span>
          ) : null}
        </div>
      ) : null}
      <div className="grid grid-cols-2">
        {tiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={
              tile.ink
                ? "group/tile bg-ink p-4 text-paper transition-opacity hover:opacity-90 dark:bg-[#141414] sm:p-5"
                : "group/tile bg-red p-4 text-white transition-colors hover:bg-red-deep sm:p-5"
            }
          >
            <span className="block text-[0.6rem] font-medium uppercase tracking-[0.2em] opacity-70">{tile.kicker}</span>
            <span className="mt-2 flex items-end justify-between gap-2 font-serif text-[1.15rem] leading-tight sm:text-[1.25rem]">
              {tile.title}
              <span aria-hidden className="translate-y-px text-sm opacity-80 transition-transform group-hover/tile:translate-x-0.5">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
