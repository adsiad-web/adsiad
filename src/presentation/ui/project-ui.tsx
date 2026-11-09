import type { Project } from "@/domain/types";
import { cn } from "./cn";

export function projectHref(p: Project): string | undefined {
  return p.detail ? `/faaliyetler/projeler/${p.slug}` : p.href;
}

export function ProjectStatus({ project, locale }: { project: Project; locale: string }) {
  const en = locale === "en";
  const current = project.status === "current";
  return (
    <span className="flex flex-wrap items-center gap-3 text-[0.66rem] uppercase tracking-[0.18em]">
      <span className={cn("rounded-full border px-2.5 py-1 font-medium", current ? "border-red bg-red text-white" : "border-[var(--line)] text-[var(--muted)]")}>
        {current ? (en ? "Current" : "Güncel") : en ? "From the old site" : "Önceki siteden"}
      </span>
      {project.period ? <span className="text-[var(--muted)]">{project.period}</span> : null}
    </span>
  );
}
