// "Tum birimler" panelinde birimleri olcu sistemine gore gruplamak icin.
// unitRegistry'de sistem bilgisi olmadigindan gruplar burada tutulur.
// Listede olmayan bir birim "metric" grubuna duser; gruplanmamis
// kategoriler (hiz, basinc, veri ...) tek bir liste olarak gosterilir.

export type UnitSystemGroup =
  | "metric"
  | "imperial"
  | "kitchen"
  | "traditional"
  | "scientific";

export const UNIT_SYSTEM_GROUP_ORDER: UnitSystemGroup[] = [
  "metric",
  "imperial",
  "kitchen",
  "traditional",
  "scientific",
];

const groupedCategories: Record<
  string,
  Partial<Record<UnitSystemGroup, string[]>>
> = {
  uzunluk: {
    imperial: ["ft", "in", "yd", "mi", "fur", "ftm", "nmi"],
    // "mil": İsveç/Norveç mili (10 km), yalnızca sv/no/da sayfalarında.
    traditional: ["mil", "arşın", "endaze", "pus", "orgyia", "çığ"],
    scientific: ["AU", "ly", "pc", "Å"],
  },
  alan: {
    imperial: ["ft²", "in²", "yd²", "ac"],
    traditional: [
      "dönüm",
      "decimal",
      "killa",
      "kanal",
      "marla",
      "guntha",
      "cent",
      "ground",
      "biswa",
      "katha",
      "bigha",
      "tsubo",
    ],
  },
  hacim: {
    imperial: [
      "ft³",
      "in³",
      "gal",
      "qt",
      "imp qt",
      "fl oz",
      "imp fl oz",
      "pt",
      "imp pt",
      "pk",
      "bu",
      "imp gal",
      "bbl",
    ],
    kitchen: ["yk", "çk", "sb"],
    traditional: ["kile", "şinik"],
  },
  kutle: {
    imperial: ["lb", "st", "gr", "oz", "ozt"],
    traditional: [
      "pond",
      "@",
      "okka",
      "dirhem",
      "miskal",
      "batman",
      "litra",
      "ounkia",
    ],
    scientific: ["Da"],
  },
};

export function hasUnitSystemGroups(category: string) {
  return category in groupedCategories;
}

export function getUnitSystemGroup(
  category: string,
  unit: string
): UnitSystemGroup {
  const groups = groupedCategories[category];

  if (!groups) {
    return "metric";
  }

  for (const group of UNIT_SYSTEM_GROUP_ORDER) {
    if (groups[group]?.includes(unit)) {
      return group;
    }
  }

  return "metric";
}
