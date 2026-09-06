export type UnitDisasterCategory =
  | "uzay"
  | "havacilik"
  | "denizcilik"
  | "tip"
  | "kargo";

export interface UnitDisasterStory {
  slug: string;
  title: string;
  shortTitle: string;
  year: number;
  category: UnitDisasterCategory;
  summary: string;
  isPublished: boolean;
}

export const disasterCategoryLabels: Record<UnitDisasterCategory, string> = {
  uzay: "Uzay",
  havacilik: "Havacılık",
  denizcilik: "Denizcilik",
  tip: "Tıp",
  kargo: "Kargo",
};

export const unitDisasterStories: UnitDisasterStory[] = [
  {
    slug: "mars-climate-orbiter",
    title: "Mars Climate Orbiter: 327 Milyon Dolarlık Birim Hatası",
    shortTitle: "Mars Climate Orbiter",
    year: 1999,
    category: "uzay",
    summary:
      "NASA'nın Mars'a gönderdiği 327 milyon dolarlık uydu, bir mühendislik ekibi pound-force, diğeri newton kullandığı için yörüngeden çıktı ve Mars atmosferinde parçalandı.",
    isPublished: true,
  },
  {
    slug: "gimli-glider",
    title: "Gimli Glider: Yakıtsız Kalan Boeing 767",
    shortTitle: "Gimli Glider",
    year: 1983,
    category: "havacilik",
    summary:
      "Air Canada'nın Boeing 767'si, yer ekibi yakıtı litre başına kilogram yerine pound ile hesapladığı için ihtiyacının yarısı kadar yakıtla havalandı ve 41.000 fitte iki motoru birden durdu.",
    isPublished: true,
  },
  {
    slug: "vasa-gemisi",
    title: "Vasa Gemisi: İki Farklı 'Ayak' Ölçüsüyle İnşa Edilen Savaş Gemisi",
    shortTitle: "Vasa Gemisi",
    year: 1628,
    category: "denizcilik",
    summary:
      "İsveç'in gururu Vasa savaş gemisi, tekne bir yanı İsveç ayağı (12 inç) diğer yanı Amsterdam ayağı (11 inç) ile inşa edildiği için asimetrik çıktı ve ilk seferinde limanda battı.",
    isPublished: true,
  },
  {
    slug: "kargo-ucagi-agirlik-hatasi",
    title: "Kargo Uçağı: Kilogram-Pound Karışıklığıyla 15 Ton Fazla Yük",
    shortTitle: "Kargo Uçağı Ağırlık Hatası",
    year: 1994,
    category: "kargo",
    summary:
      "American International Airways'e ait bir kargo uçağı, yükleme hesaplarında kilogram-pound dönüşümü karıştırıldığı için gerekenden 15 ton daha ağır bir yükle iniş yaptı.",
    isPublished: true,
  },
  {
    slug: "fenobarbital-doz-hatasi",
    title: "Fenobarbital Doz Hatası: Gram ile Grain Karıştırılınca",
    shortTitle: "Fenobarbital Doz Hatası",
    year: 1999,
    category: "tip",
    summary:
      "Bir hastaya, reçetedeki 'grain' (yaklaşık 0,065 gram) birimi 'gram' ile karıştırıldığı için gerekenin yaklaşık 15 katı fenobarbital dozu verildi.",
    isPublished: true,
  },
  {
    slug: "british-airways-5390",
    title: "British Airways 5390: 0,66 Milimetrelik Vida Hatası",
    shortTitle: "British Airways 5390",
    year: 1990,
    category: "havacilik",
    summary:
      "Bir bakım teknisyeni kokpit camının vidalarını doğru ölçüden 0,66 mm daha ince seçince, cam uçuş sırasında patladı ve kaptan yarı beline kadar dışarı fırladı.",
    isPublished: true,
  },
];

export function getPublishedDisasterStories() {
  return unitDisasterStories.filter((story) => story.isPublished);
}
