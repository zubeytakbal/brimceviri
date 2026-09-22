import type { Metadata } from "next";
import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import {
  getCategoryIconName,
  type SiteIconName,
} from "../../components/siteIcons";
import { uzbekCategoryPages } from "../../converter/localizedUzbekCategoryPages";
import { buildSiteUrl } from "../../siteConfig";
import { uzbekStaticCardGroups } from "./categoryCardCatalog";

export const metadata: Metadata = {
  title: "Barcha Turkumlar: O'lchov Birliklari Bo'yicha Aylantirish",
  description:
    "Uzunlik, massa, hajm, harorat va boshqa barcha o'lchov turkumlari bo'yicha aylantirish sahifalarini ko'ring.",
  alternates: {
    canonical: "/uz/turkumlar",
    languages: {
      "uz-UZ": "/uz/turkumlar",
      "x-default": "/uz/turkumlar",
    },
  },
  openGraph: {
    title: "Barcha Turkumlar | BirimCeviri.app",
    description:
      "Barcha o'lchov turkumlari bo'yicha aylantirish sahifalarini ko'ring.",
    url: buildSiteUrl("/uz/turkumlar"),
    siteName: "BirimCeviri.app",
    locale: "uz_UZ",
    type: "website",
  },
};

function normalizeSearchTextServer(value: string) {
  return value
    .toLocaleLowerCase("uz-UZ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

const uzbekCategoryIcons: Record<string, SiteIconName> = {
  gumus_ayar: "jewelerHub",
  kan_sekeri: "doctorHub",
  vitamin_d: "solarPanelPaybackCalculator",
};

const uzbekCategoryGroups = [
  {
    title: "Asosiy o'lchov birliklari",
    categories: [
      "uzunluk",
      "alan",
      "hacim",
      "kutle",
      "sicaklik",
      "zaman",
      "hiz",
    ],
  },
  {
    title: "Muhandislik va texnika birliklari",
    categories: [
      "basinc",
      "enerji",
      "debi",
      "debi_hacimsel",
      "debi_kutlesel",
      "yogunluk",
      "kuvvet",
      "tork",
      "aci",
      "frekans",
      "viskozite_kinematik",
      "viskozite_dinamik",
      "isil_iletkenlik",
      "isi_akisi",
      "ozgul_isi",
      "ivme",
      "acisal_hiz",
      "guc",
      "momentum",
    ],
  },
  {
    title: "Elektr, magnitlanish va ma'lumotlar",
    categories: [
      "elektrik",
      "elektrik_direnc",
      "kapasitans",
      "enduktans",
      "elektrik_yuk",
      "manyetik_alan",
      "manyetik_aki",
      "veri",
    ],
  },
  {
    title: "Sog'liq va zargarlik birliklari",
    categories: ["kan_sekeri", "vitamin_d", "altin_ayar", "gumus_ayar"],
  },
] as const;

export default function UzbekCategoriesPage() {
  const unitCategoryCards = uzbekCategoryGroups.flatMap((group) =>
    group.categories.flatMap((category) => {
      const page = uzbekCategoryPages.find(
        (candidate) => candidate.category === category,
      );

      return page
        ? [
            {
              id: page.category,
              title: page.title,
              description: page.description,
              iconName:
                uzbekCategoryIcons[page.category] ??
                getCategoryIconName(page.category),
              group: group.title,
              href: `/uz/turkumlar/${page.slug}` as string | undefined,
            },
          ]
        : [];
    }),
  );

  const calculatorCategoryCards = uzbekStaticCardGroups.flatMap((group) =>
    group.cards.map(([id, title, iconName, href]) => ({
      id,
      title,
      description: href
        ? "Ushbu vosita hozir mavjud."
        : "Ushbu vosita sahifasi keyin alohida tayyorlanadi.",
      iconName,
      group: group.title,
      groupId: group.id,
      href,
    })),
  );

  const cardSearchItems = [
    ...calculatorCategoryCards,
    ...unitCategoryCards,
  ].map((card) => ({
    id: card.id,
    href: card.href,
    label: card.title,
    description: card.group,
    searchText: normalizeSearchTextServer(
      `${card.title} ${card.group}`,
    ),
  }));

  return (
    <OtherCategoriesPage
      conversions={cardSearchItems}
      categories={[]}
      tools={[...calculatorCategoryCards, ...unitCategoryCards]}
      hideCategoryGrid
      locale="uz"
    />
  );
}
