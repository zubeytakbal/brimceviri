import type { SiteIconName } from "../components/siteIcons";

export type HomeShellLocale = "tr" | "en" | "uz";

type LocalizedText = Record<HomeShellLocale, string>;

type UniversalHomeCard = {
  id: string;
  iconName: SiteIconName;
  label: LocalizedText;
  href: Partial<Record<HomeShellLocale, string>>;
};

type UniversalHomeSection = {
  heading: LocalizedText;
  description: LocalizedText;
  cards: UniversalHomeCard[];
};

const universalHomeSections = {
  science: {
    heading: {
      tr: "Bilim hesaplayıcıları",
      en: "Science calculators",
      uz: "Fan kalkulyatorlari",
    },
    description: {
      tr: "Kimya ve matematik araç kategorileri.",
      en: "Tool categories for chemistry and mathematics.",
      uz: "Kimyo va matematika uchun vosita turkumlari.",
    },
    cards: [
      {
        id: "chemistry",
        iconName: "chemistryCalculator",
        label: { tr: "Kimya", en: "Chemistry", uz: "Kimyo" },
        href: { tr: "/bilim-hesaplayicilari/kimya" },
      },
      {
        id: "mathematics",
        iconName: "mathCalculator",
        label: { tr: "Matematik", en: "Mathematics", uz: "Matematika" },
        href: { tr: "/bilim-hesaplayicilari/matematik" },
      },
    ],
  },
} as const satisfies Record<string, UniversalHomeSection>;

export type UniversalHomeSectionKey = keyof typeof universalHomeSections;

export function getUniversalHomeSection(
  locale: HomeShellLocale,
  sectionKey: UniversalHomeSectionKey
) {
  const section = universalHomeSections[sectionKey];

  return {
    heading: section.heading[locale],
    description: section.description[locale],
    cards: section.cards.map((card) => ({
      id: card.id,
      iconName: card.iconName,
      label: card.label[locale],
      href: (card.href as Partial<Record<HomeShellLocale, string>>)[locale],
    })),
  };
}
