// Kur'an-ı Kerim'in 114 suresi: sıra, Türkçe ad, ayet sayısı (Hafs rivayeti,
// Kûfe sayımı: toplam 6.236) ve surenin başladığı/bittiği cüz. Sayfa numarası
// mushaf baskısına göre değiştiği için bilerek yok.
// Kaynak: quran-meta 7.0.0 (MIT, Hafs listeleri); cüz başlangıçları ayrıca
// standart listeyle karşılaştırıldı (tests/sureler.test.ts).

export type Sure = {
  no: number;
  ad: string;
  slug: string;
  ayet: number;
  /** Surenin ilk ayetinin bulunduğu cüz */
  cuzBas: number;
  /** Surenin son ayetinin bulunduğu cüz */
  cuzSon: number;
};

export const SURELER: Sure[] = [
  { no: 1, ad: "Fatiha", slug: "fatiha", ayet: 7, cuzBas: 1, cuzSon: 1 },
  { no: 2, ad: "Bakara", slug: "bakara", ayet: 286, cuzBas: 1, cuzSon: 3 },
  { no: 3, ad: "Al-i İmran", slug: "al-i-imran", ayet: 200, cuzBas: 3, cuzSon: 4 },
  { no: 4, ad: "Nisa", slug: "nisa", ayet: 176, cuzBas: 4, cuzSon: 6 },
  { no: 5, ad: "Maide", slug: "maide", ayet: 120, cuzBas: 6, cuzSon: 7 },
  { no: 6, ad: "En'am", slug: "enam", ayet: 165, cuzBas: 7, cuzSon: 8 },
  { no: 7, ad: "A'raf", slug: "araf", ayet: 206, cuzBas: 8, cuzSon: 9 },
  { no: 8, ad: "Enfal", slug: "enfal", ayet: 75, cuzBas: 9, cuzSon: 10 },
  { no: 9, ad: "Tevbe", slug: "tevbe", ayet: 129, cuzBas: 10, cuzSon: 11 },
  { no: 10, ad: "Yunus", slug: "yunus", ayet: 109, cuzBas: 11, cuzSon: 11 },
  { no: 11, ad: "Hud", slug: "hud", ayet: 123, cuzBas: 11, cuzSon: 12 },
  { no: 12, ad: "Yusuf", slug: "yusuf", ayet: 111, cuzBas: 12, cuzSon: 13 },
  { no: 13, ad: "Ra'd", slug: "rad", ayet: 43, cuzBas: 13, cuzSon: 13 },
  { no: 14, ad: "İbrahim", slug: "ibrahim", ayet: 52, cuzBas: 13, cuzSon: 13 },
  { no: 15, ad: "Hicr", slug: "hicr", ayet: 99, cuzBas: 14, cuzSon: 14 },
  { no: 16, ad: "Nahl", slug: "nahl", ayet: 128, cuzBas: 14, cuzSon: 14 },
  { no: 17, ad: "İsra", slug: "isra", ayet: 111, cuzBas: 15, cuzSon: 15 },
  { no: 18, ad: "Kehf", slug: "kehf", ayet: 110, cuzBas: 15, cuzSon: 16 },
  { no: 19, ad: "Meryem", slug: "meryem", ayet: 98, cuzBas: 16, cuzSon: 16 },
  { no: 20, ad: "Taha", slug: "taha", ayet: 135, cuzBas: 16, cuzSon: 16 },
  { no: 21, ad: "Enbiya", slug: "enbiya", ayet: 112, cuzBas: 17, cuzSon: 17 },
  { no: 22, ad: "Hac", slug: "hac", ayet: 78, cuzBas: 17, cuzSon: 17 },
  { no: 23, ad: "Mü'minun", slug: "muminun", ayet: 118, cuzBas: 18, cuzSon: 18 },
  { no: 24, ad: "Nur", slug: "nur", ayet: 64, cuzBas: 18, cuzSon: 18 },
  { no: 25, ad: "Furkan", slug: "furkan", ayet: 77, cuzBas: 18, cuzSon: 19 },
  { no: 26, ad: "Şuara", slug: "suara", ayet: 227, cuzBas: 19, cuzSon: 19 },
  { no: 27, ad: "Neml", slug: "neml", ayet: 93, cuzBas: 19, cuzSon: 20 },
  { no: 28, ad: "Kasas", slug: "kasas", ayet: 88, cuzBas: 20, cuzSon: 20 },
  { no: 29, ad: "Ankebut", slug: "ankebut", ayet: 69, cuzBas: 20, cuzSon: 21 },
  { no: 30, ad: "Rum", slug: "rum", ayet: 60, cuzBas: 21, cuzSon: 21 },
  { no: 31, ad: "Lokman", slug: "lokman", ayet: 34, cuzBas: 21, cuzSon: 21 },
  { no: 32, ad: "Secde", slug: "secde", ayet: 30, cuzBas: 21, cuzSon: 21 },
  { no: 33, ad: "Ahzab", slug: "ahzab", ayet: 73, cuzBas: 21, cuzSon: 22 },
  { no: 34, ad: "Sebe", slug: "sebe", ayet: 54, cuzBas: 22, cuzSon: 22 },
  { no: 35, ad: "Fatır", slug: "fatir", ayet: 45, cuzBas: 22, cuzSon: 22 },
  { no: 36, ad: "Yasin", slug: "yasin", ayet: 83, cuzBas: 22, cuzSon: 23 },
  { no: 37, ad: "Saffat", slug: "saffat", ayet: 182, cuzBas: 23, cuzSon: 23 },
  { no: 38, ad: "Sad", slug: "sad", ayet: 88, cuzBas: 23, cuzSon: 23 },
  { no: 39, ad: "Zümer", slug: "zumer", ayet: 75, cuzBas: 23, cuzSon: 24 },
  { no: 40, ad: "Mü'min", slug: "mumin", ayet: 85, cuzBas: 24, cuzSon: 24 },
  { no: 41, ad: "Fussilet", slug: "fussilet", ayet: 54, cuzBas: 24, cuzSon: 25 },
  { no: 42, ad: "Şura", slug: "sura", ayet: 53, cuzBas: 25, cuzSon: 25 },
  { no: 43, ad: "Zuhruf", slug: "zuhruf", ayet: 89, cuzBas: 25, cuzSon: 25 },
  { no: 44, ad: "Duhan", slug: "duhan", ayet: 59, cuzBas: 25, cuzSon: 25 },
  { no: 45, ad: "Casiye", slug: "casiye", ayet: 37, cuzBas: 25, cuzSon: 25 },
  { no: 46, ad: "Ahkaf", slug: "ahkaf", ayet: 35, cuzBas: 26, cuzSon: 26 },
  { no: 47, ad: "Muhammed", slug: "muhammed", ayet: 38, cuzBas: 26, cuzSon: 26 },
  { no: 48, ad: "Fetih", slug: "fetih", ayet: 29, cuzBas: 26, cuzSon: 26 },
  { no: 49, ad: "Hucurat", slug: "hucurat", ayet: 18, cuzBas: 26, cuzSon: 26 },
  { no: 50, ad: "Kaf", slug: "kaf", ayet: 45, cuzBas: 26, cuzSon: 26 },
  { no: 51, ad: "Zariyat", slug: "zariyat", ayet: 60, cuzBas: 26, cuzSon: 27 },
  { no: 52, ad: "Tur", slug: "tur", ayet: 49, cuzBas: 27, cuzSon: 27 },
  { no: 53, ad: "Necm", slug: "necm", ayet: 62, cuzBas: 27, cuzSon: 27 },
  { no: 54, ad: "Kamer", slug: "kamer", ayet: 55, cuzBas: 27, cuzSon: 27 },
  { no: 55, ad: "Rahman", slug: "rahman", ayet: 78, cuzBas: 27, cuzSon: 27 },
  { no: 56, ad: "Vakıa", slug: "vakia", ayet: 96, cuzBas: 27, cuzSon: 27 },
  { no: 57, ad: "Hadid", slug: "hadid", ayet: 29, cuzBas: 27, cuzSon: 27 },
  { no: 58, ad: "Mücadele", slug: "mucadele", ayet: 22, cuzBas: 28, cuzSon: 28 },
  { no: 59, ad: "Haşr", slug: "hasr", ayet: 24, cuzBas: 28, cuzSon: 28 },
  { no: 60, ad: "Mümtehine", slug: "mumtehine", ayet: 13, cuzBas: 28, cuzSon: 28 },
  { no: 61, ad: "Saf", slug: "saf", ayet: 14, cuzBas: 28, cuzSon: 28 },
  { no: 62, ad: "Cuma", slug: "cuma", ayet: 11, cuzBas: 28, cuzSon: 28 },
  { no: 63, ad: "Münafikun", slug: "munafikun", ayet: 11, cuzBas: 28, cuzSon: 28 },
  { no: 64, ad: "Tegabün", slug: "tegabun", ayet: 18, cuzBas: 28, cuzSon: 28 },
  { no: 65, ad: "Talak", slug: "talak", ayet: 12, cuzBas: 28, cuzSon: 28 },
  { no: 66, ad: "Tahrim", slug: "tahrim", ayet: 12, cuzBas: 28, cuzSon: 28 },
  { no: 67, ad: "Mülk", slug: "mulk", ayet: 30, cuzBas: 29, cuzSon: 29 },
  { no: 68, ad: "Kalem", slug: "kalem", ayet: 52, cuzBas: 29, cuzSon: 29 },
  { no: 69, ad: "Hakka", slug: "hakka", ayet: 52, cuzBas: 29, cuzSon: 29 },
  { no: 70, ad: "Mearic", slug: "mearic", ayet: 44, cuzBas: 29, cuzSon: 29 },
  { no: 71, ad: "Nuh", slug: "nuh", ayet: 28, cuzBas: 29, cuzSon: 29 },
  { no: 72, ad: "Cin", slug: "cin", ayet: 28, cuzBas: 29, cuzSon: 29 },
  { no: 73, ad: "Müzzemmil", slug: "muzzemmil", ayet: 20, cuzBas: 29, cuzSon: 29 },
  { no: 74, ad: "Müddessir", slug: "muddessir", ayet: 56, cuzBas: 29, cuzSon: 29 },
  { no: 75, ad: "Kıyamet", slug: "kiyamet", ayet: 40, cuzBas: 29, cuzSon: 29 },
  { no: 76, ad: "İnsan", slug: "insan", ayet: 31, cuzBas: 29, cuzSon: 29 },
  { no: 77, ad: "Mürselat", slug: "murselat", ayet: 50, cuzBas: 29, cuzSon: 29 },
  { no: 78, ad: "Nebe", slug: "nebe", ayet: 40, cuzBas: 30, cuzSon: 30 },
  { no: 79, ad: "Naziat", slug: "naziat", ayet: 46, cuzBas: 30, cuzSon: 30 },
  { no: 80, ad: "Abese", slug: "abese", ayet: 42, cuzBas: 30, cuzSon: 30 },
  { no: 81, ad: "Tekvir", slug: "tekvir", ayet: 29, cuzBas: 30, cuzSon: 30 },
  { no: 82, ad: "İnfitar", slug: "infitar", ayet: 19, cuzBas: 30, cuzSon: 30 },
  { no: 83, ad: "Mutaffifin", slug: "mutaffifin", ayet: 36, cuzBas: 30, cuzSon: 30 },
  { no: 84, ad: "İnşikak", slug: "insikak", ayet: 25, cuzBas: 30, cuzSon: 30 },
  { no: 85, ad: "Büruc", slug: "buruc", ayet: 22, cuzBas: 30, cuzSon: 30 },
  { no: 86, ad: "Tarık", slug: "tarik", ayet: 17, cuzBas: 30, cuzSon: 30 },
  { no: 87, ad: "A'la", slug: "ala", ayet: 19, cuzBas: 30, cuzSon: 30 },
  { no: 88, ad: "Gaşiye", slug: "gasiye", ayet: 26, cuzBas: 30, cuzSon: 30 },
  { no: 89, ad: "Fecr", slug: "fecr", ayet: 30, cuzBas: 30, cuzSon: 30 },
  { no: 90, ad: "Beled", slug: "beled", ayet: 20, cuzBas: 30, cuzSon: 30 },
  { no: 91, ad: "Şems", slug: "sems", ayet: 15, cuzBas: 30, cuzSon: 30 },
  { no: 92, ad: "Leyl", slug: "leyl", ayet: 21, cuzBas: 30, cuzSon: 30 },
  { no: 93, ad: "Duha", slug: "duha", ayet: 11, cuzBas: 30, cuzSon: 30 },
  { no: 94, ad: "İnşirah", slug: "insirah", ayet: 8, cuzBas: 30, cuzSon: 30 },
  { no: 95, ad: "Tin", slug: "tin", ayet: 8, cuzBas: 30, cuzSon: 30 },
  { no: 96, ad: "Alak", slug: "alak", ayet: 19, cuzBas: 30, cuzSon: 30 },
  { no: 97, ad: "Kadir", slug: "kadir", ayet: 5, cuzBas: 30, cuzSon: 30 },
  { no: 98, ad: "Beyyine", slug: "beyyine", ayet: 8, cuzBas: 30, cuzSon: 30 },
  { no: 99, ad: "Zilzal", slug: "zilzal", ayet: 8, cuzBas: 30, cuzSon: 30 },
  { no: 100, ad: "Adiyat", slug: "adiyat", ayet: 11, cuzBas: 30, cuzSon: 30 },
  { no: 101, ad: "Karia", slug: "karia", ayet: 11, cuzBas: 30, cuzSon: 30 },
  { no: 102, ad: "Tekasür", slug: "tekasur", ayet: 8, cuzBas: 30, cuzSon: 30 },
  { no: 103, ad: "Asr", slug: "asr", ayet: 3, cuzBas: 30, cuzSon: 30 },
  { no: 104, ad: "Hümeze", slug: "humeze", ayet: 9, cuzBas: 30, cuzSon: 30 },
  { no: 105, ad: "Fil", slug: "fil", ayet: 5, cuzBas: 30, cuzSon: 30 },
  { no: 106, ad: "Kureyş", slug: "kureys", ayet: 4, cuzBas: 30, cuzSon: 30 },
  { no: 107, ad: "Maun", slug: "maun", ayet: 7, cuzBas: 30, cuzSon: 30 },
  { no: 108, ad: "Kevser", slug: "kevser", ayet: 3, cuzBas: 30, cuzSon: 30 },
  { no: 109, ad: "Kafirun", slug: "kafirun", ayet: 6, cuzBas: 30, cuzSon: 30 },
  { no: 110, ad: "Nasr", slug: "nasr", ayet: 3, cuzBas: 30, cuzSon: 30 },
  { no: 111, ad: "Tebbet", slug: "tebbet", ayet: 5, cuzBas: 30, cuzSon: 30 },
  { no: 112, ad: "İhlas", slug: "ihlas", ayet: 4, cuzBas: 30, cuzSon: 30 },
  { no: 113, ad: "Felak", slug: "felak", ayet: 5, cuzBas: 30, cuzSon: 30 },
  { no: 114, ad: "Nas", slug: "nas", ayet: 6, cuzBas: 30, cuzSon: 30 },
];

/** Her cüzün başladığı [sure, ayet]; indeks 0 → 1. cüz. */
export const CUZ_BASLANGIC: Array<[number, number]> = [
  [1, 1],
  [2, 142],
  [2, 253],
  [3, 93],
  [4, 24],
  [4, 148],
  [5, 82],
  [6, 111],
  [7, 88],
  [8, 41],
  [9, 93],
  [11, 6],
  [12, 53],
  [15, 1],
  [17, 1],
  [18, 75],
  [21, 1],
  [23, 1],
  [25, 21],
  [27, 56],
  [29, 46],
  [33, 31],
  [36, 28],
  [39, 32],
  [41, 47],
  [46, 1],
  [51, 31],
  [58, 1],
  [67, 1],
  [78, 1],
];

export function findSure(slug: string) {
  return SURELER.find((sure) => sure.slug === slug) ?? null;
}

export type CuzBolumu = { sure: Sure; ilkAyet: number; sonAyet: number };

/** Bir cüzün içerdiği sure parçaları: 28. cüz → Mücadele 1–22 … Tahrim 1–12. */
export function cuzIcerigi(cuz: number): CuzBolumu[] {
  if (!(cuz >= 1 && cuz <= 30)) return [];
  const [bSure, bAyet] = CUZ_BASLANGIC[cuz - 1];
  const sonraki = CUZ_BASLANGIC[cuz];
  const parcalar: CuzBolumu[] = [];
  for (let no = bSure; no <= 114; no++) {
    const sure = SURELER[no - 1];
    const ilkAyet = no === bSure ? bAyet : 1;
    let sonAyet = sure.ayet;
    if (sonraki) {
      const [sSure, sAyet] = sonraki;
      if (no > sSure || (no === sSure && sAyet === 1)) break;
      if (no === sSure) sonAyet = sAyet - 1;
    }
    parcalar.push({ sure, ilkAyet, sonAyet });
  }
  return parcalar;
}

/** Bir surenin cüzlere göre bölümleri: Bakara → 1. cüz 1–141, 2. cüz 142–252, 3. cüz 253–286. */
export function sureCuzBolumleri(sure: Sure) {
  const bolumler: Array<{ cuz: number; ilkAyet: number; sonAyet: number }> = [];
  for (let cuz = sure.cuzBas; cuz <= sure.cuzSon; cuz++) {
    const parca = cuzIcerigi(cuz).find((item) => item.sure.no === sure.no);
    if (parca) bolumler.push({ cuz, ilkAyet: parca.ilkAyet, sonAyet: parca.sonAyet });
  }
  return bolumler;
}

export const TOPLAM_AYET = SURELER.reduce((sum, sure) => sum + sure.ayet, 0);
