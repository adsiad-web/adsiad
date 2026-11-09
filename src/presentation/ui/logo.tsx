import { cn } from "./cn";

export function Wordmark({ className, showDot = true }: { className?: string; showDot?: boolean }) {
  return (
    <span className={cn("inline-flex items-baseline font-extrabold tracking-[-0.06em]", className)}>
      <span>ADS</span>
      <span className="relative inline-block px-[0.02em]">
        <span>I</span>
        {showDot ? (
          <span
            aria-hidden
            className="absolute left-1/2 top-[0.02em] h-[0.2em] w-[0.2em] -translate-x-1/2 rounded-full bg-red"
          />
        ) : null}
      </span>
      <span>AD</span>
    </span>
  );
}

/** Official 35th-year mark from the brand pack (PNG-02). */
export function Mark35({ className }: { className?: string }) {
  return (
    <span className={cn("seal relative inline-block", className)}>
      <span className="seal-art">
        <img
          src="/brand/logo-png-02.png"
          alt="ADSİAD 35. yıl"
          className="seal-face h-auto w-full mix-blend-multiply dark:hidden"
        />
        <img
          src="/brand/logo-png-02-dark.png"
          alt="ADSİAD 35. yıl"
          className="seal-face hidden h-auto w-full dark:block"
        />
      </span>
    </span>
  );
}

/** Official horizontal lockup: wordmark, 35, and the legal name. */
export function BrandLockup({ className }: { className?: string }) {
  // Lazy: only the variant for the active theme is displayed, so the other is never fetched.
  const size = className ?? "h-11 w-auto sm:h-12 lg:h-14";
  return (
    <>
      <img
        src="/brand/logo-lockup.png"
        alt="ADSİAD — Adana Sanayici ve İş İnsanları Derneği"
        loading="lazy"
        decoding="async"
        className={cn(size, "object-contain object-left dark:hidden")}
      />
      <img
        src="/brand/logo-lockup-dark.png"
        alt="ADSİAD — Adana Sanayici ve İş İnsanları Derneği"
        loading="lazy"
        decoding="async"
        className={cn(size, "hidden object-contain object-left dark:block")}
      />
    </>
  );
}

export function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3 text-[var(--fg)]">
      <span className="flex flex-col">
        <Wordmark className={compact ? "text-[1.35rem] leading-none" : "text-3xl leading-none"} />
        {!compact ? (
          <span className="mt-1 max-w-[16rem] text-[0.62rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
            Adana Sanayici ve İş İnsanları Derneği
          </span>
        ) : null}
      </span>
      {!compact ? (
        <span className="w-16">
          <Mark35 />
        </span>
      ) : null}
    </span>
  );
}

export function initials(name: string) {
  const skip = /^(prof\.?|dr\.?|doç\.?|doc\.?|öğretim|üyesi|ve)$/i;
  const parts = name.split(/\s+/).filter((p) => p && !skip.test(p.replace(/\./g, "")));
  return parts
    .slice(-2)
    .map((p) => p[0])
    .join("")
    .toLocaleUpperCase("tr");
}

export function Portrait({ name, image, className }: { name: string; image?: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative grid aspect-[3/4] place-items-center overflow-hidden bg-[var(--paper-deep,#e7e1d4)] text-red dark:bg-[#121212]",
        className,
      )}
    >
      {image ? (
        <img src={image} alt={name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="font-serif text-4xl tracking-tight md:text-5xl">{initials(name)}</span>
      )}
    </div>
  );
}
