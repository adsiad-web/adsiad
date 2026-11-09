import {
  boardRepository,
  eventRepository,
  memberRepository,
  newsRepository,
  todayIso,
} from "@/infrastructure/repositories/catalog";

/** Live content shown in the navbar's section panels. */
export function getNavigationData() {
  const today = todayIso();
  const next = eventRepository.upcoming(today)[0];
  return {
    chair: boardRepository.chair(),
    members: memberRepository.all().length,
    sectors: memberRepository.sectors().length,
    event: next ?? eventRepository.past(today)[0],
    eventIsUpcoming: Boolean(next),
    news: newsRepository.latest(1)[0],
  };
}
