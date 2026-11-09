import {
  boardRepository,
  eventRepository,
  memberRepository,
  newsRepository,
} from "@/infrastructure/repositories/catalog";

export function getHomePageData() {
  return {
    stats: {
      years: 35,
      members: memberRepository.all().length,
    },
    chair: boardRepository.chair(),
    board: boardRepository.byBoard("yonetim").slice(0, 8),
    companies: memberRepository.companies(),
    tuesday: eventRepository.nextTuesday(),
    stories: newsRepository.byKind("haber").slice(0, 4),
    notices: newsRepository.notices().slice(0, 3),
    membersPreview: memberRepository.all().slice(0, 8),
  };
}
