import { KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT } from "./engineeringUnits";

export type UnitPage = {
  slug: string;
  category: string;
  unit: string;
  name: string;
  symbol: string;
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

export const unitPages: UnitPage[] = [
  {
    slug: "metre",
    category: "uzunluk",
    unit: "m",
    name: "Metre",
    symbol: "m",
    shortDescription:
      "Metre, Uluslararası Birim Sistemi'nde uzunluğun temel birimidir. Günlük yaşamdan mühendisliğe kadar mesafe ve boyut ölçümünde kullanılır.",
    historySummary:
      "Metre, 18. yüzyılın sonunda evrensel bir ölçü standardı oluşturma amacıyla geliştirildi. Günümüzde tanımı ışığın boşlukta belirli bir zaman aralığında aldığı yola dayanır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI uzunluk birimi",
    commonUses: "İnşaat, bilim, üretim, geometri ve genel ölçüm",
  },
  {
    slug: "kilometre",
    category: "uzunluk",
    unit: "km",
    name: "Kilometre",
    symbol: "km",
    shortDescription:
      "Kilometre, 1000 metreye eşit bir uzunluk birimidir. Şehirler arası ve coğrafi mesafeleri ifade etmekte kullanılır.",
    historySummary:
      "Kilometre, metrik sistemin ondalık yapısı içinde metrenin katı olarak yerleşti. Kara yolları ve harita ölçeklerinde standart bir gösterim hâline geldi.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 km = 1000 m",
    commonUses: "Karayolu mesafeleri, coğrafya, haritacılık ve altyapı",
  },
  {
    slug: "santimetre",
    category: "uzunluk",
    unit: "cm",
    name: "Santimetre",
    symbol: "cm",
    shortDescription:
      "Santimetre, metrenin yüzde birine eşit bir uzunluk birimidir. Küçük nesnelerin ve günlük ölçülerin ifade edilmesinde yaygındır.",
    historySummary:
      "Santimetre, metrik sistemde ondalık alt birim olarak gelişti. Ölçümleri pratik ve hızlı hesaplanabilir hâle getirdiği için geniş kullanım kazandı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 cm = 0,01 m",
    commonUses: "Mobilya, tekstil, antropometri ve günlük ölçümler",
  },
  {
    slug: "milimetre",
    category: "uzunluk",
    unit: "mm",
    name: "Milimetre",
    symbol: "mm",
    shortDescription:
      "Milimetre, metrenin binde birine eşit bir uzunluk birimidir. Hassas teknik ölçümlerde sık kullanılır.",
    historySummary:
      "Milimetre, sanayi ve mühendislikte daha küçük toleransların ölçülmesi ihtiyacıyla yaygınlaştı. Özellikle üretim ve çizim standartlarında temel bir alt birim oldu.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 mm = 0,001 m",
    commonUses: "Mekanik üretim, teknik resim, işleme toleransları",
  },
  {
    slug: "mil",
    category: "uzunluk",
    unit: "mi",
    name: "Mil",
    symbol: "mi",
    shortDescription:
      "Mil, özellikle Amerika Birleşik Devletleri ve Birleşik Krallık'ta kullanılan bir uzunluk birimidir. Bir uluslararası mil 1609,344 metreye eşittir.",
    historySummary:
      "Milin kökeni Roma dönemindeki bin adımlık mesafe anlayışına uzanır. Modern uluslararası mil 1959 yılında tam olarak 1609,344 metre olarak standartlaştırıldı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 mi = 1609,344 m",
    commonUses: "Karayolu mesafeleri, navigasyon ve saha ölçekleri",
  },
  {
    slug: "fit",
    category: "uzunluk",
    unit: "ft",
    name: "Fit",
    symbol: "ft",
    shortDescription:
      "Fit, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir uluslararası fit tam olarak 0,3048 metreye eşittir.",
    historySummary:
      "Fit, eski ölçü geleneklerinde insan ayağına dayalı bir yaklaşımdan doğdu. Farklı bölgesel değerler zamanla bırakıldı ve uluslararası fit 1959'da standartlaştırıldı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 ft = 0,3048 m",
    commonUses: "Mimarlık, bina kotları, havacılık ve saha ölçüleri",
  },
  {
    slug: "inc",
    category: "uzunluk",
    unit: "in",
    name: "İnç",
    symbol: "in",
    shortDescription:
      "İnç, İngiliz ve Amerikan ölçü sistemlerinde kullanılan kısa bir uzunluk birimidir. Bir inç tam olarak 2,54 santimetreye eşittir.",
    historySummary:
      "İnç, tarih boyunca insan bedenine dayalı yerel ölçülerden türedi. Modern uluslararası inç 1959 yılından beri tam olarak 25,4 milimetre olarak tanımlanır.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 in = 25,4 mm = 2,54 cm",
    commonUses: "Ekran boyutları, borulama, bağlantı elemanları ve teknik kataloglar",
  },
  {
    slug: "yarda",
    category: "uzunluk",
    unit: "yd",
    name: "Yarda",
    symbol: "yd",
    shortDescription:
      "Yarda, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir yarda tam olarak 0,9144 metreye eşittir.",
    historySummary:
      "Yarda, tarihsel olarak insan adımı ve beden ölçüleriyle ilişkilendirilen bir uzunluk yaklaşımından gelişti. Modern değeri uluslararası anlaşmalarla sabitlendi.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 yd = 0,9144 m",
    commonUses: "Spor sahaları, tekstil, peyzaj ve saha planlaması",
  },
  {
    slug: "kilogram",
    category: "kutle",
    unit: "kg",
    name: "Kilogram",
    symbol: "kg",
    shortDescription:
      "Kilogram, Uluslararası Birim Sistemi'nde kütlenin temel birimidir. Ticaret, laboratuvar ve mühendislikte yaygın olarak kullanılır.",
    historySummary:
      "Kilogram önce su kütlesine, sonra fiziksel bir prototipe dayalıydı. 2019'dan itibaren Planck sabitinin sabitlenmiş değeri üzerinden tanımlanmaktadır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI kütle birimi",
    commonUses: "Ticaret, taşıma, laboratuvar ve proses hesapları",
  },
  {
    slug: "gram",
    category: "kutle",
    unit: "g",
    name: "Gram",
    symbol: "g",
    shortDescription:
      "Gram, kilogramın binde birine eşit bir kütle birimidir. Gıda, laboratuvar ve küçük maddesel miktarları ifade etmekte kullanılır.",
    historySummary:
      "Gram, metrik sistemin erken döneminde su kütlesi temelli yaklaşımlardan gelişti ve daha sonra kilogramın alt birimi olarak standartlaştı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 g = 0,001 kg",
    commonUses: "Gıda, kimya, eczacılık ve hassas ölçüm",
  },
  {
    slug: "miligram",
    category: "kutle",
    unit: "mg",
    name: "Miligram",
    symbol: "mg",
    shortDescription:
      "Miligram, gramın binde birine eşit çok küçük bir kütle birimidir. İlaç ve laboratuvar ölçümlerinde kritik öneme sahiptir.",
    historySummary:
      "Miligram, hassas terazilerin ve analitik laboratuvarların gelişmesiyle birlikte özellikle sağlık ve kimya alanlarında öne çıktı.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
    siEquivalent: "1 mg = 0,000001 kg",
    commonUses: "İlaç dozları, analizler ve hassas formülasyonlar",
  },
  {
    slug: "pound",
    category: "kutle",
    unit: "lb",
    name: "Pound",
    symbol: "lb",
    shortDescription:
      "Pound, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir kütle birimidir. Bir uluslararası pound tam olarak 0,45359237 kilograma eşittir.",
    historySummary:
      "Pound ve lb sembolü Roma dönemindeki libra biriminden gelir. Modern avoirdupois pound 1959 yılında uluslararası olarak sabitlenmiştir.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 lb = 0,45359237 kg",
    commonUses: "Perakende, taşımacılık, beslenme ve endüstriyel kataloglar",
  },
  {
    slug: "ton",
    category: "kutle",
    unit: "ton",
    name: "Ton",
    symbol: "t",
    shortDescription:
      "Metrik ton, 1000 kilograma eşit büyük bir kütle birimidir. Ağır yüklerin ve endüstriyel miktarların ifade edilmesinde kullanılır.",
    historySummary:
      "Ton, büyük yükleri ve ticari kütleleri daha kısa ifade etmek için metrik sistem içinde yerleşti. Lojistik ve endüstride yaygın kullanım kazandı.",
    measurementSystem: "Metrik sistem, SI ile uyumlu",
    siEquivalent: "1 t = 1000 kg",
    commonUses: "Lojistik, üretim, hammadde ticareti ve ağır sanayi",
  },
  {
    slug: "ons",
    category: "kutle",
    unit: "oz",
    name: "Ons",
    symbol: "oz",
    shortDescription:
      "Ons, İngiliz ve Amerikan ölçü sistemlerinde kullanılan küçük bir kütle birimidir. Bir avoirdupois ons 28,349523125 grama eşittir.",
    historySummary:
      "Ons, tarih boyunca farklı ticari ve tıbbi sistemlerde kullanıldı. Modern avoirdupois ons, pound ile olan 1/16 ilişkisi üzerinden standartlaştı.",
    measurementSystem: "İngiliz ve ABD ölçü sistemleri",
    siEquivalent: "1 oz = 28,349523125 g",
    commonUses: "Paketleme, gıda, mücevher dışı hafif ticari ölçüler",
  },
  {
    slug: "pascal",
    category: "basinc",
    unit: "Pa",
    name: "Pascal",
    symbol: "Pa",
    shortDescription:
      "Pascal, Uluslararası Birim Sistemi'nde basıncın türetilmiş birimidir. 1 Pa = 1 N/m² ilişkisiyle tanımlanır.",
    historySummary:
      "Birim adını Blaise Pascal'dan alır. Akışkanlar ve basınç çalışmalarındaki bilimsel gelişmelerle birlikte SI içinde standart basınç referansı oldu.",
    measurementSystem: "Uluslararası Birim Sistemi (SI)",
    siEquivalent: "Temel SI basınç birimi, 1 Pa = 1 N/m²",
    commonUses: "Bilimsel hesaplar, malzeme analizi ve referans dönüşümler",
  },
  {
    slug: "kilopascal",
    category: "basinc",
    unit: "kPa",
    name: "Kilopascal",
    symbol: "kPa",
    shortDescription:
      "Kilopascal, 1000 pascala eşit bir basınç birimidir. Pratik mühendislikte pascaldan daha okunabilir sonuçlar sağlar.",
    historySummary:
      "Kilopascal, özellikle saha ölçümleri ve mühendislik belgelerinde sayısal okunabilirliği artırdığı için yaygınlaşmıştır.",
    measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
    siEquivalent: "1 kPa = 1000 Pa",
    commonUses: "HVAC, yapı mühendisliği, lastik basıncı ve proses verileri",
  },
  {
    slug: "bar",
    category: "basinc",
    unit: "bar",
    name: "Bar",
    symbol: "bar",
    shortDescription:
      "Bar, 100000 pascala eşit bir basınç birimidir. Sanayi ve ekipman göstergelerinde çok yaygın bir pratik gösterimdir.",
    historySummary:
      "Bar, atmosferik büyüklüklere yakın basınçları daha kısa ifade edebilmek için teknik uygulamalarda yaygınlık kazandı. SI dışı olsa da endüstride güçlü şekilde yaşamaya devam etti.",
    measurementSystem: "SI dışı metrik mühendislik birimi",
    siEquivalent: "1 bar = 100000 Pa",
    commonUses: "Kompresörler, hidrolik, pnömatik ve servis manometreleri",
  },
  {
    slug: "psi",
    category: "basinc",
    unit: "psi",
    name: "PSI",
    symbol: "psi",
    shortDescription:
      "PSI, pound-force per square inch ifadesinin kısaltmasıdır. Anglo-Amerikan teknik sistemlerde kullanılan yaygın bir basınç birimidir.",
    historySummary:
      "PSI özellikle otomotiv, hidrolik ve saha servis geleneği içinde yerleşti. SI birimleri yaygınlaşsa da birçok ekipman etiketi ve katalogta kullanılmaya devam etmektedir.",
    measurementSystem: "İngiliz ve ABD mühendislik kullanımı",
    siEquivalent: "1 psi = 6894,757293168 Pa",
    commonUses: "Lastik basıncı, hidrolik sistemler ve teknik servis",
  },
  {
    slug: "milimetre-civa",
    category: "basinc",
    unit: "mmHg",
    name: "Milimetre Cıva",
    symbol: "mmHg",
    shortDescription:
      "Milimetre cıva, bir cıva sütununun yüksekliğine dayanan bir basınç birimidir. Tıbbi ve laboratuvar ölçümlerinde tarihsel önem taşır.",
    historySummary:
      "mmHg, cıvalı manometrelerin yaygın olduğu dönemde yerleşti. Özellikle tansiyon ölçümleri ve vakum/atmosfer referansları için kalıcı bir teknik kullanım alanı oluşturdu.",
    measurementSystem: "SI dışı tarihsel mühendislik ve tıbbi birim",
    siEquivalent: "1 mmHg = 133,322387415 Pa",
    commonUses: "Tansiyon ölçümleri, laboratuvar manometreleri ve vakum referansları",
  },
  {
    slug: "kilogram-kuvvet-santimetrekare",
    category: "basinc",
    unit: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
    name: "Kilogram-kuvvet/Santimetrekare",
    symbol: KILOGRAM_FORCE_PER_SQUARE_CENTIMETRE_UNIT,
    shortDescription:
      "Kilogram-kuvvet/santimetrekare, kuvvet ve alan ilişkisine dayanan SI dışı bir basınç birimidir. Eski göstergelerde ve bazı servis belgelerinde görülür.",
    historySummary:
      "Bu birim, kilogram-kuvvet kavramının teknik çizelgelerde yaygın kullanıldığı dönemde özellikle pompa, kazan ve mekanik gösterge dünyasında yerleşti.",
    measurementSystem: "SI dışı metrik mühendislik birimi",
    siEquivalent: "1 kgf/cm² = 98066,5 Pa = 0,980665 bar",
    commonUses: "Eski pompa ve kazan göstergeleri, servis kitapçıkları ve analog cihazlar",
  },
];

export function findUnitPage(category: string, unit: string) {
  return unitPages.find(
    (unitPage) =>
      unitPage.category === category && unitPage.unit === unit
  );
}
