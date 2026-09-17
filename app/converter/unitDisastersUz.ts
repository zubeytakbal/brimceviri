import type { UnitDisasterCategory } from "./unitDisasters";

export const disasterCategoryLabelsUz: Record<UnitDisasterCategory, string> = {
  uzay: "Kosmos",
  havacilik: "Aviatsiya",
  denizcilik: "Dengizchilik",
  tip: "Tibbiyot",
  kargo: "Yuk tashish",
};

export type UnitDisasterStoryUz = {
  slug: string;
  title: string;
  shortTitle: string;
  year: number;
  category: UnitDisasterCategory;
  summary: string;
};

export const unitDisasterStoriesUz: UnitDisasterStoryUz[] = [
  {
    slug: "mars-climate-orbiter",
    title: "Mars Climate Orbiter: 327 Million Dollarlik Birlik Xatosi",
    shortTitle: "Mars Climate Orbiter",
    year: 1999,
    category: "uzay",
    summary:
      "NASA'ning Marsga yuborgan 327 million dollarlik sun'iy yo'ldoshi, bir muhandislik guruhi pound-force, ikkinchisi nyuton ishlatgani uchun orbitadan chiqib, Mars atmosferasida parchalanib ketdi.",
  },
  {
    slug: "gimli-glider",
    title: "Gimli Glider: Yoqilg'isiz Qolgan Boeing 767",
    shortTitle: "Gimli Glider",
    year: 1983,
    category: "havacilik",
    summary:
      "Air Canada'ning Boeing 767 samolyoti, yer xizmati yoqilg'ini litr uchun kilogram o'rniga litr uchun funt bilan hisoblagani uchun ehtiyojining yarmicha yoqilg'i bilan uchdi va 41 000 fut balandlikda ikkala dvigateli birdan to'xtadi.",
  },
  {
    slug: "vasa-gemisi",
    title: "Vasa Kemasi: Ikki Xil 'Fut' O'lchovi Bilan Qurilgan Jang Kemasi",
    shortTitle: "Vasa Kemasi",
    year: 1628,
    category: "denizcilik",
    summary:
      "Shvetsiyaning faxri Vasa jang kemasi, korpusning bir tomoni Shvetsiya futi (12 dyuym), ikkinchi tomoni Amsterdam futi (11 dyuym) bilan qurilgani uchun assimetrik chiqdi va birinchi safarida portda cho'kib ketdi.",
  },
  {
    slug: "kargo-ucagi-agirlik-hatasi",
    title: "Yuk Samolyoti: Kilogram-Funt Chalkashligi Bilan 15 Tonna Ortiqcha Yuk",
    shortTitle: "Yuk Samolyoti Og'irlik Xatosi",
    year: 1994,
    category: "kargo",
    summary:
      "American International Airways'ga tegishli yuk samolyoti, yuklash hisob-kitoblarida kilogram-funt aylantirilishi chalkashtirilgani uchun kerakligidan 15 tonna og'irroq yuk bilan qo'nishga majbur bo'ldi.",
  },
  {
    slug: "fenobarbital-doz-hatasi",
    title: "Fenobarbital Doza Xatosi: Gramm Bilan Grain Chalkashtirilganda",
    shortTitle: "Fenobarbital Doza Xatosi",
    year: 1999,
    category: "tip",
    summary:
      "Bemorga retseptdagi 'grain' (taxminan 0,065 gramm) birligi 'gramm' bilan chalkashtirilgani uchun kerakligidan taxminan 15 baravar ko'p fenobarbital dozasi berildi.",
  },
  {
    slug: "british-airways-5390",
    title: "British Airways 5390: 0,66 Millimetrlik Vint Xatosi",
    shortTitle: "British Airways 5390",
    year: 1990,
    category: "havacilik",
    summary:
      "Texnik xizmat ko'rsatuvchi mutaxassis kabina oynasining vintlarini to'g'ri o'lchamdan 0,66 mm ingichkaroq tanlaganida, oyna parvoz paytida portlab ketdi va kapitan yarim beligacha tashqariga uchib chiqdi.",
  },
];

export function getUzDisasterStories() {
  return unitDisasterStoriesUz;
}
