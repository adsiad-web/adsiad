"use client";

import { useServerInsertedHTML } from "next/navigation";
import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";

const themeBoot = `(function(){try{var t=localStorage.getItem("theme");var dark=t==="dark"||((t==null||t==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);var el=document.documentElement;el.classList.toggle("dark",dark);el.style.colorScheme=dark?"dark":"light";document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",dark?"#070707":"#f3efe6")});}catch(e){}})();`;

export function ThemeBoot() {
  useServerInsertedHTML(() => <script dangerouslySetInnerHTML={{ __html: themeBoot }} />);
  return null;
}

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
  resolvedTheme?: "light" | "dark";
  setTheme: (theme: Theme) => void;
}>({ setTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function resolve(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

function apply(theme: Theme) {
  const resolved = resolve(theme);
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", resolved === "dark" ? "#070707" : "#f3efe6");
  });
  return resolved;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [resolvedTheme, setResolved] = useState<"light" | "dark" | undefined>(undefined);

  useLayoutEffect(() => {
    const stored = (localStorage.getItem("theme") as Theme | null) ?? "system";
    setResolved(apply(stored));
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = (localStorage.getItem("theme") as Theme | null) ?? "system";
      if (current === "system") setResolved(apply("system"));
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode("*,*::before,*::after{transition:none!important}"));
    document.head.appendChild(style);
    localStorage.setItem("theme", theme);
    setResolved(apply(theme));
    window.getComputedStyle(document.body);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => style.remove());
    });
  }, []);

  return <ThemeContext.Provider value={{ resolvedTheme, setTheme }}>{children}</ThemeContext.Provider>;
}
