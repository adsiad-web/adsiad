import { cn } from "./cn";

const links = [
  {
    href: "https://www.instagram.com/adanasiad/",
    label: "Instagram",
    icon: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.2" cy="6.8" r="1.15" />
      </>
    ),
  },
  {
    href: "https://tr.linkedin.com/company/adsi%CC%87ad",
    label: "LinkedIn",
    icon: (
      <path d="M6.2 9.2H3.1V21h3.1V9.2zM4.65 4A1.8 1.8 0 1 0 4.66 7.6 1.8 1.8 0 0 0 4.65 4zM20.9 21h-3.1v-5.7c0-1.36-.02-3.1-1.89-3.1-1.9 0-2.19 1.48-2.19 3V21H10.6V9.2h2.98v1.61h.04c.42-.79 1.43-1.62 2.95-1.62 3.15 0 3.73 2.07 3.73 4.77V21z" />
    ),
  },
  {
    href: "https://www.facebook.com/adsiad",
    label: "Facebook",
    icon: (
      <path d="M14 8.16V6.45c0-.64.13-1 .98-1H17V2h-2.72C11.2 2 10 3.7 10 6.24v1.92H8v3.34h2V22h4V11.5h2.85l.37-3.34H14z" />
    ),
  },
  {
    href: "https://twitter.com/adsiad1991",
    label: "X",
    icon: (
      <path d="M17.76 3H20.5l-6.66 7.61L21.5 21h-5.7l-4.46-5.82L6.2 21H3.44l7.13-8.15L2.5 3h5.84l4.03 5.33L17.76 3zm-1 16.2h1.58L7.3 4.7H5.6l11.16 14.5z" />
    ),
  },
] as const;

export function SocialLinks({
  className,
  tone = "muted",
  label,
  named = false,
}: {
  className?: string;
  tone?: "muted" | "red" | "neutral";
  /** When set, the row renders as a labelled list (e.g. in the footer). */
  label?: string;
  /** Show the network name under each icon. */
  named?: boolean;
}) {
  const Wrapper = label ? "ul" : "p";
  return (
    <Wrapper aria-label={label} className={cn("flex flex-wrap items-center gap-1", className)}>
      {links.map((item) => {
        const link = (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
          className={cn(
            "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red",
            named ? "inline-flex min-w-0 flex-col items-center gap-2 px-1" : "inline-grid size-11 place-items-center rounded-full",
            !named && tone !== "neutral" && "lg:size-9",
            tone === "red"
              ? "text-red hover:bg-red/10"
              : tone === "neutral"
                ? "text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--fg)]"
                : "text-[var(--fg)] hover:text-red",
            !named && tone !== "red" && "hover:bg-[var(--line)]",
          )}
        >
          <svg viewBox="0 0 24 24" className={tone === "neutral" ? "size-[1.35rem]" : "size-5"} aria-hidden fill="currentColor">
            {item.icon}
          </svg>
          {named ? <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em]">{item.label}</span> : null}
        </a>
        );
        return label ? <li key={item.href}>{link}</li> : link;
      })}
    </Wrapper>
  );
}
