"use client";

import { useState } from "react";
import { cn } from "./cn";

/** Hero seal. Strokes split on arrival and again when the pointer enters. */
export function LivingSeal({ className, onDark }: { className?: string; onDark?: boolean }) {
  const [spin, setSpin] = useState(0);

  return (
    <span className={cn("seal relative inline-block", onDark && "seal-on-dark", className)} onMouseEnter={() => setSpin((n) => n + 1)} onPointerDown={(e) => { if (e.pointerType !== "mouse") setSpin((n) => n + 1); }}>
      <span className="seal-art">
        <img key={`ink-${spin}`} src="/brand/logo-png-02.png" alt="" aria-hidden className="seal-band seal-band-ink" />
        <img key={`red-${spin}`} src="/brand/logo-png-02.png" alt="" aria-hidden className="seal-band seal-band-red" />
        <img
          src="/brand/logo-png-02.png"
          alt="ADSİAD 35. yıl"
          className={cn("seal-face h-auto w-full mix-blend-multiply dark:hidden", onDark && "!hidden")}
        />
        <img
          src="/brand/logo-png-02-dark.png"
          alt="ADSİAD 35. yıl"
          className={cn("seal-face hidden h-auto w-full dark:block", onDark && "!block")}
        />
      </span>
    </span>
  );
}
