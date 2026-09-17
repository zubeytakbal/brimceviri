// 29 sayfa (popularEmbedSlugs listesindeki ciftler) icin elle arastirilmis,
// gercek dunya degerleri ve sektor notlari. Amac: bu ciftlerde sayfayi
// Wikipedia/rakip cevirici sitelerden ayristirmak. Genis (~800 sayfa) veri
// setine cikarilmiyor cunku her deger elle dogrulanmis olmali -- otomatik
// uretim burada anlam tasimiyor.
//
// ONEMLI: anchorUnit degerleri unitRegistry id'si degil, ConversionPage.
// fromUnit/toUnit alanlarinin gercekte tuttugu unit SYMBOL degeridir (bkz.
// conversionPages.ts: fromUnit: first.symbol). Kategori de anahtara dahil,
// cunku bazi kategoriler sembolu paylasiyor (F: fahrenhayt/farad, C:
// santigrat/coulomb) -- kategorisiz anahtar yanlis eslesme riski tasirdi.

export type RealWorldValue = {
  label: string;
  // deger, anchorUnit (sembol) cinsinden ifade edilir; sayfa hangi yonde
  // olursa olsun convert() ile dogru birime cevrilir.
  value: number;
  anchorUnit: string;
};

export type FlagshipPairInsight = {
  realWorldValues?: RealWorldValue[];
  sectorNote?: string;
};

function pairKey(category: string, symbolA: string, symbolB: string): string {
  return `${category}::${[symbolA, symbolB].sort().join("::")}`;
}

const insights: Record<string, FlagshipPairInsight> = {
  [pairKey("uzunluk", "km", "mi")]: {
    realWorldValues: [
      { label: "Maraton mesafesi", value: 42.195, anchorUnit: "km" },
    ],
  },
  [pairKey("uzunluk", "cm", "in")]: {
    realWorldValues: [
      {
        label: "Standart kredi kartının uzun kenarı",
        value: 8.56,
        anchorUnit: "cm",
      },
    ],
  },
  [pairKey("uzunluk", "m", "ft")]: {
    realWorldValues: [
      {
        label: "Resmi basketbol potası yüksekliği",
        value: 3.048,
        anchorUnit: "m",
      },
    ],
  },
  [pairKey("kutle", "kg", "lb")]: {
    realWorldValues: [
      {
        label: "Ekonomi sınıfı uçak bagaj limiti (tipik)",
        value: 23,
        anchorUnit: "kg",
      },
    ],
  },
  [pairKey("kutle", "kg", "g")]: {
    sectorNote:
      "Mutfak tariflerinde ve eczacılıkta hassas malzeme ölçümü için gram, toplu/ticari miktarlar için kilogram kullanılır.",
  },
  [pairKey("hacim", "gal", "L")]: {
    realWorldValues: [
      { label: "Ortalama otomobil yakıt deposu", value: 50, anchorUnit: "L" },
    ],
  },
  [pairKey("sicaklik", "F", "C")]: {
    realWorldValues: [
      { label: "Tıbbi ateş eşiği", value: 38, anchorUnit: "C" },
    ],
  },
  [pairKey("uzunluk", "m", "cm")]: {
    sectorNote:
      "Terzilik, mühendislik çizimleri ve günlük boy/mesafe ölçümlerinde en sık başvurulan uzunluk dönüşümüdür.",
  },
  [pairKey("uzunluk", "cm", "mm")]: {
    sectorNote:
      "Hassas mühendislik ve teknik çizimlerde milimetre, günlük ölçümlerde santimetre tercih edilir.",
  },
  [pairKey("uzunluk", "km", "m")]: {
    sectorNote:
      "Şehirler arası mesafelerde kilometre, saha/bina ölçümlerinde metre kullanılır.",
  },
  [pairKey("kutle", "g", "mg")]: {
    sectorNote:
      "Eczacılık ve laboratuvar ölçümlerinde miligram, mutfak tariflerinde gram tercih edilir.",
  },
  [pairKey("kutle", "g", "oz")]: {
    sectorNote:
      "Ons, değerli metal (altın, gümüş) ticaretinde uluslararası standart ağırlık birimi olarak kullanılır.",
  },
  [pairKey("kutle", "kg", "ton")]: {
    realWorldValues: [
      {
        label: "Ortalama binek otomobil ağırlığı",
        value: 1.5,
        anchorUnit: "ton",
      },
    ],
  },
  [pairKey("kutle", "oz", "lb")]: {
    sectorNote:
      "İngiliz/ABD ölçü sisteminde küçük ağırlıklar ons, daha büyük ağırlıklar pound ile ifade edilir (1 pound = 16 ons).",
  },
  [pairKey("hacim", "L", "mL")]: {
    sectorNote:
      "İlaç dozları ve laboratuvar ölçümlerinde mililitre, günlük sıvı ölçümlerinde litre kullanılır.",
  },
  [pairKey("hiz", "km/h", "mph")]: {
    realWorldValues: [
      { label: "Türkiye otoyol hız sınırı", value: 120, anchorUnit: "km/h" },
    ],
  },
  [pairKey("basinc", "bar", "psi")]: {
    realWorldValues: [
      {
        label: "Standart otomobil lastik basıncı",
        value: 2.2,
        anchorUnit: "bar",
      },
    ],
  },
  [pairKey("veri", "MB", "GB")]: {
    realWorldValues: [
      { label: "Ortalama HD film dosyası", value: 4, anchorUnit: "GB" },
    ],
  },
  [pairKey("veri", "KB", "MB")]: {
    realWorldValues: [
      { label: "Ortalama MP3 şarkı dosyası", value: 4, anchorUnit: "MB" },
    ],
  },
  [pairKey("zaman", "h", "s")]: {
    sectorNote:
      "Bilimsel ve teknik hesaplamalarda saniye, günlük zaman planlamasında saat kullanılır.",
  },
  [pairKey("zaman", "min", "h")]: {
    sectorNote:
      "Spor, mutfak ve toplantı süresi gibi günlük planlamalarda dakika, uzun süreçlerde saat tercih edilir.",
  },
  [pairKey("alan", "ft²", "m²")]: {
    realWorldValues: [
      {
        label: "Ortalama 2+1 daire (net alan)",
        value: 90,
        anchorUnit: "m²",
      },
    ],
  },
  [pairKey("alan", "dekar", "dönüm")]: {
    sectorNote:
      "Türkiye'de tarım arazisi alım satımında ve tapu kayıtlarında dönüm ve dekar birbirinin yerine kullanılan resmi birimlerdir.",
  },
  [pairKey("alan", "dönüm", "ha")]: {
    sectorNote:
      "Tarım ve orman arazisi büyüklüğü Türkiye'de dönüm, uluslararası raporlamada hektar cinsinden ifade edilir.",
  },
  [pairKey("enerji", "J", "cal")]: {
    realWorldValues: [
      {
        label: "Kalori-joule bilimsel sabiti (1 kalori)",
        value: 1,
        anchorUnit: "cal",
      },
    ],
  },
  [pairKey("enerji", "kWh", "Wh")]: {
    realWorldValues: [
      {
        label: "Türkiye'de ortalama hane günlük elektrik tüketimi",
        value: 10,
        anchorUnit: "kWh",
      },
    ],
  },
  [pairKey("sicaklik", "K", "C")]: {
    realWorldValues: [
      { label: "Mutlak sıfır noktası", value: 0, anchorUnit: "K" },
    ],
  },
  [pairKey("uzunluk", "m", "yd")]: {
    realWorldValues: [
      {
        label: "Amerikan futbolu sahası uzunluğu",
        value: 91.44,
        anchorUnit: "m",
      },
    ],
  },
  [pairKey("uzunluk", "ft", "in")]: {
    sectorNote:
      "Marangozluk ve inşaatta sıkça kullanılan İngiliz ölçü biriminde 1 fit tam olarak 12 inçe eşittir.",
  },
};

export function getFlagshipPairInsight(
  category: string,
  fromUnit: string,
  toUnit: string
): FlagshipPairInsight | undefined {
  return insights[pairKey(category, fromUnit, toUnit)];
}
