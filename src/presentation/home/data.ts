import { getHomePageData } from "@/application/get-home";
import { eventRepository, memberRepository, projectRepository } from "@/infrastructure/repositories/catalog";
import { latestByNetwork } from "@/infrastructure/seed/social-posts";
import type { Localized } from "@/domain/types";

export function homeV2() {
  const base = getHomePageData();
  return {
    ...base,
    sectors: memberRepository.sectors().length,
    projects: projectRepository.all(),
    akademi: eventRepository.sorted("akademi"),
    sali: eventRepository.sorted("sali"),
    social: latestByNetwork(),
  };
}

/** Activity pillars — copy taken from existing site texts (taniyin / tarihce / home). */
export const pillars: Array<{
  no: string;
  href: string;
  title: Localized;
  text: Localized;
  image: string;
}> = [
  {
    no: "01",
    href: "/faaliyetler/sali",
    title: { tr: "Salı Toplantıları", en: "Tuesday Meetings" },
    text: {
      tr: "Konuklar, fikirler ve kentin meseleleri. ADSİAD’ın imza programı.",
      en: "Guests, ideas and the city’s questions. ADSİAD’s signature programme.",
    },
    image: "/archive/nav/sali.webp",
  },
  {
    no: "02",
    href: "/faaliyetler/akademi",
    title: { tr: "ADSİAD Akademi", en: "ADSİAD Academy" },
    text: {
      tr: "Üyelere ve kente açık eğitim programları ve seminerler.",
      en: "Training programmes and seminars open to members and the city.",
    },
    image: "/archive/nav/akademi.webp",
  },
  {
    no: "03",
    href: "/faaliyetler/projeler",
    title: { tr: "Projeler", en: "Projects" },
    text: {
      tr: "Yeşil dönüşümden aile şirketlerine, kent için yürütülen projeler.",
      en: "Projects for the city, from the green transition to family firms.",
    },
    image: "/archive/nav/projeler.webp",
  },
  {
    no: "04",
    href: "/kurumsal/tarihce",
    title: { tr: "Politika ve temsil", en: "Policy and representation" },
    text: {
      tr: "İş dünyasının ortak sorunlarına çözüm önerir; ÇUKUROVA SİFED ve TÜRKONFED çatısında temsil eder.",
      en: "It proposes solutions to shared business issues and represents members under ÇUKUROVA SİFED and TÜRKONFED.",
    },
    image: "/archive/promo/turkonfed-adana.jpg",
  },
];

export const mission: Localized = {
  tr: "Üyeleri arasında iş ve güç birliğini büyüten, Adana’nın ulusal ve uluslararası pazarlardan aldığı payı artırmayı amaçlayan gönüllü bir iş ailesi.",
  en: "A voluntary business family that grows cooperation among members and seeks to increase Adana’s share of national and international markets.",
};
