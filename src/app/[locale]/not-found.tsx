import { Wordmark } from "@/presentation/ui/logo";
import { ButtonLink } from "@/presentation/ui/chrome";

export default function NotFound() {
  return (
    <div className="relative isolate grid min-h-[70dvh] place-items-center overflow-hidden px-5 text-center">
      <span aria-hidden className="absolute -z-10 select-none font-serif text-[clamp(14rem,40vw,30rem)] leading-none text-red/[0.07]">404</span>
      <div className="rounded-3xl bg-[var(--card)] px-8 py-12 ring-1 ring-[var(--line)] sm:px-16">
        <Wordmark className="text-5xl" />
        <p className="mt-10 font-serif text-7xl text-red">404</p>
        <p className="mt-4 text-[var(--muted)]">Bu sayfa yok.</p>
        <ButtonLink href="/" variant="red" className="mt-8">
          ADSİAD
        </ButtonLink>
      </div>
    </div>
  );
}
