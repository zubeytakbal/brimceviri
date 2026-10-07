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
  /** Bu iki birim günlük hayatta nerede karşılaşılır (tek paragraf). */
  where?: string;
  /** Bu çiftte sık yapılan hatalar ve karışan ölçüler. */
  mistakes?: string[];
  /** inç–cm: 16:9 ekranların köşegen, genişlik ve yükseklik tablosu. */
  screenTable?: boolean;
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
      { label: "Standart kredi kartının uzun kenarı", value: 8.56, anchorUnit: "cm" },
      { label: "6,1 inç telefon ekranı (köşegen)", value: 6.1, anchorUnit: "in" },
      { label: "15,6 inç dizüstü bilgisayar ekranı (köşegen)", value: 15.6, anchorUnit: "in" },
      { label: "Kot pantolon W32 (bel ölçüsü)", value: 32, anchorUnit: "in" },
      { label: "Otomobil jantı (205/55 R16 lastikteki 16)", value: 16, anchorUnit: "in" },
      { label: "Dağ bisikleti tekeri", value: 29, anchorUnit: "in" },
    ],
    where:
      "İnç Türkiye'de en çok ekran boyutlarında (televizyon, monitör, telefon, tablet), otomobil jantlarında, bisiklet tekerlerinde, kot pantolon bedenlerinde (W bel, L boy) ve tesisat borularında karşına çıkar. ABD'den alınan ürünlerin ölçüleri de çoğunlukla inçtir. 1 inç 1959'dan beri tam olarak 2,54 cm kabul edilir; yani bu dönüşüm yaklaşık değil, kesindir.",
    mistakes: [
      "Ekran boyutu köşegendir, genişlik değil: 55 inç bir televizyonun köşegeni 139,7 cm, ama 16:9 ekranın genişliği yaklaşık 121,8 cm'dir. Duvara ya da TV ünitesine sığıp sığmayacağına genişliğe bakarak karar verin.",
      "Tesisattaki \"1/2 inç boru\" nominal (anma) ölçüdür: borunun dış çapı 12,7 mm değil, yaklaşık 21,3 mm'dir. Boru ve fitting alırken dış çap tablosuna bakın.",
      "Kesirli inçler ondalığa çevrilmeden hesaplanmamalı: 1/4 inç = 0,635 cm, 1/8 inç = 3,175 mm, 3/8 inç = 9,525 mm.",
      "Kot pantolonda W32 bel çevresi yaklaşık 81 cm demektir; ama markalar etiket ölçüsünü farklı kestiği için gerçek bel ölçüsü 1-3 cm sapabilir.",
    ],
    screenTable: true,
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
