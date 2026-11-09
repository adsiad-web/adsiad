/** Every member firm, entering at the right edge and leaving at the left. */
const nameType = "font-serif text-lg leading-none text-white sm:text-xl";

export function FirmWall({
  names,
  label,
  lead,
  className = "mt-8 w-full px-8 sm:mt-10 sm:px-14 lg:px-20",
}: {
  names: string[];
  label: string;
  lead: string;
  className?: string;
}) {
  if (names.length === 0) return null;

  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      className="flex shrink-0 items-baseline gap-x-8 pr-8 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:gap-y-3 motion-reduce:pr-0"
    >
      <li className={nameType}>{lead}</li>
      {names.map((name) => (
        <li key={name} className="flex items-baseline gap-8">
          <span className={nameType}>{name}</span>
          <span aria-hidden className="font-serif text-lg text-white/45">
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={className}>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]">
        <div className="ticker flex w-max motion-reduce:w-full motion-reduce:flex-wrap" style={{ animationDuration: `${Math.max(70, names.length * 1.15)}s` }}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
