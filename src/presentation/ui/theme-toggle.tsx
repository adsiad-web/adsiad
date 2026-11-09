"use client";

import { useTheme } from "@/presentation/theme/providers";

/**
 * Always rendered (also on the server), so the switch is visible even before hydration.
 * Its look follows the `dark` class that the boot script puts on <html>, via `dark:` variants.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label={dark ? "Light" : "Dark"}
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
      className="flex h-11 items-center gap-1.5"
    >
      <Moon className="text-[#2a2724] dark:text-[var(--fg)]" />
      <span className="relative h-5 w-10 rounded-full bg-[#b7b2aa] shadow-[inset_0_1px_2px_rgba(12,12,12,0.18)] dark:bg-[#3c3a36]">
        <span className="absolute left-[calc(100%-18px)] top-0.5 size-4 rounded-full bg-[#5e5a54] shadow-[0_1px_2px_rgba(12,12,12,0.28)] transition-[left] duration-200 ease-out dark:left-0.5 dark:bg-[#cfc8bc]" />
      </span>
      <Sun className="text-[#e2b12a] dark:text-[#6f6a62]" />
    </button>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-3.5 w-3.5 ${className ?? ""}`} fill="currentColor">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`h-4 w-4 ${className ?? ""}`} fill="currentColor">
      <circle cx="12" cy="12" r="4" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12 1.6v2.2M12 20.2v2.2M1.6 12h2.2M20.2 12h2.2M4.4 4.4l1.6 1.6M18 18l1.6 1.6M19.6 4.4 18 6M6 18l-1.6 1.6"
      />
    </svg>
  );
}
