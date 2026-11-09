import { members, featuredCompanies } from "@/infrastructure/seed/members";
import { boardMembers } from "@/infrastructure/seed/board";
import { news } from "@/infrastructure/seed/news";
import { events } from "@/infrastructure/seed/events";
import { pages } from "@/infrastructure/seed/pages";
import { projects } from "@/infrastructure/seed/projects";
import { galleryGroups } from "@/infrastructure/seed/gallery";
import type { Member, BoardMember, NewsItem, EventItem, StaticPage, Project, GalleryGroup } from "@/domain/types";

/** Bugünün tarihi, Türkiye saatiyle, YYYY-AA-GG. */
export function todayIso(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });
}

export const memberRepository = {
  all(): Member[] {
    return members;
  },
  featuredCompanies(): string[] {
    return featuredCompanies;
  },
  companies(): string[] {
    return [...new Set(members.map((m) => m.company))].sort((a, b) => a.localeCompare(b, "tr"));
  },
  sectors(): string[] {
    return [...new Set(members.map((m) => m.sector))].sort((a, b) => a.localeCompare(b, "tr"));
  },
  search(query: string, sector?: string): Member[] {
    const q = query.trim().toLocaleLowerCase("tr");
    return members.filter((m) => {
      const hit =
        !q ||
        m.name.toLocaleLowerCase("tr").includes(q) ||
        m.company.toLocaleLowerCase("tr").includes(q);
      const sec = !sector || sector === "all" || m.sector === sector;
      return hit && sec;
    });
  },
};

export const boardRepository = {
  all(): BoardMember[] {
    return boardMembers;
  },
  byBoard(board: BoardMember["board"]): BoardMember[] {
    return boardMembers.filter((m) => m.board === board);
  },
  chair(): BoardMember | undefined {
    return boardMembers.find((m) => m.id === "b1");
  },
};

export const newsRepository = {
  all(): NewsItem[] {
    return [...news].sort((a, b) => b.date.localeCompare(a.date));
  },
  byKind(kind: NewsItem["kind"]): NewsItem[] {
    return news.filter((n) => n.kind === kind).sort((a, b) => b.date.localeCompare(a.date));
  },
  bySlug(slug: string): NewsItem | undefined {
    return news.find((n) => n.slug === slug);
  },
  latest(count = 2): NewsItem[] {
    return newsRepository.all().slice(0, count);
  },
  /** Duyuru panosundaki kayıtlar: duyurular ve yeni üye duyuruları. */
  notices(): NewsItem[] {
    return newsRepository.all().filter((n) => n.kind === "duyuru" || n.kind === "uye");
  },
  /** Aynı listede (haber veya duyuru panosu) bir yeni ve bir eski kayıt. */
  adjacent(slug: string): { newer?: NewsItem; older?: NewsItem } {
    const item = newsRepository.bySlug(slug);
    if (!item) return {};
    const list = item.kind === "haber" ? newsRepository.byKind("haber") : item.kind === "duyuru" || item.kind === "uye" ? newsRepository.notices() : newsRepository.byKind(item.kind);
    const i = list.findIndex((n) => n.slug === slug);
    return { newer: list[i - 1], older: list[i + 1] };
  },
};

export const eventRepository = {
  all(): EventItem[] {
    return events;
  },
  byKind(kind: EventItem["kind"]): EventItem[] {
    return events.filter((e) => e.kind === kind);
  },
  nextTuesday(): EventItem | undefined {
    return events.find((e) => e.kind === "sali");
  },
  /** Yeniden eskiye sıralı tüm etkinlikler. */
  sorted(kind?: EventItem["kind"]): EventItem[] {
    return events.filter((e) => !kind || e.kind === kind).sort((a, b) => b.date.localeCompare(a.date));
  },
  /** Bugün ve sonrası, en yakın önce. */
  upcoming(today: string, kind?: EventItem["kind"]): EventItem[] {
    return eventRepository.sorted(kind).filter((e) => e.date >= today).reverse();
  },
  past(today: string, kind?: EventItem["kind"]): EventItem[] {
    return eventRepository.sorted(kind).filter((e) => e.date < today);
  },
  byHref(href: string): EventItem | undefined {
    return events.find((e) => e.href === href);
  },
};

export const projectRepository = {
  all(): Project[] {
    return projects;
  },
  withDetail(): Project[] {
    return projects.filter((p) => p.detail);
  },
  bySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug && p.detail);
  },
};

export const galleryRepository = {
  all(): GalleryGroup[] {
    return galleryGroups;
  },
  byId(id: string): GalleryGroup | undefined {
    return galleryGroups.find((g) => g.id === id);
  },
  byHref(href: string): GalleryGroup | undefined {
    return galleryGroups.find((g) => g.href === href);
  },
  photoCount(): number {
    return galleryGroups.reduce((sum, g) => sum + g.images.length, 0);
  },
};

export const pageRepository = {
  bySlug(slug: string): StaticPage | undefined {
    return pages.find((p) => p.slug === slug);
  },
};
