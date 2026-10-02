// Türkçe dönüşüm sayfalarının başlık, açıklama, giriş cümlesi, ek SSS ve
// tablo değerleri. Genel şablon (1 X Kaç Y?) korunur, yalnızca açıklamaya
// örnek değerler eklenir. Search Console'da en çok gösterim alan sayfalar
// (Ekim 2026 dışa aktarımı) için gerçek aramalara göre ("1 metre kaç cm",
// "1 kg kaç gr", "1 hektar kaç dönüm") özel içerik TURKISH_SEO_OVERRIDES'ta.
import { convert } from "./convert";
import type { FaqItem } from "./faqSchema";

type PageLike = {
  slug: string;
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  exampleValues: number[];
};

export function formatTrNumber(value: number) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  // Açıklamada okunur kalsın: 1'den büyükse en fazla 2 ondalık, küçükse 4 anlamlı basamak.
  const rounded = abs >= 1 ? Math.round(value * 100) / 100 : Number(value.toPrecision(4));
  return rounded.toLocaleString("tr-TR", { maximumFractionDigits: 6 });
}

export function trPair(page: PageLike, value: number) {
  const result = convert(page.category, value, page.fromUnit, page.toUnit);
  return `${formatTrNumber(value)} ${page.fromUnit} = ${formatTrNumber(result)} ${page.toUnit}`;
}

type Override = {
  titles: string[];
  description: string;
  intro?: string;
  faq?: FaqItem[];
  exampleValues?: number[];
};

export const TURKISH_SEO_OVERRIDES: Record<string, Override> = {
  "metre-santimetre": {
    titles: ["1 Metre Kaç cm? Metre Santimetre Çevirme Tablosu", "1 Metre Kaç cm? Metre Santimetre Çevirme"],
    description: "1 metre = 100 cm. 1,5 m = 150 cm, 1,75 m = 175 cm, 2 m = 200 cm. Boy, kumaş ve mobilya ölçüleri için metre-santimetre tablosu ve hesaplama aracı.",
    intro: "1 metre 100 santimetredir (cm): metreyi 100 ile çarpın.",
    exampleValues: [0.01, 0.1, 0.25, 0.5, 1, 1.5, 1.6, 1.7, 1.75, 1.8, 1.9, 2, 2.5, 3, 5, 10],
  },
  "santimetre-milimetre": {
    titles: ["1 cm Kaç mm? Santimetre Milimetre Çevirme Tablosu", "1 cm Kaç mm? Santimetre Milimetre Çevirme"],
    description: "1 cm = 10 mm. 0,5 cm = 5 mm, 2,5 cm = 25 mm, 15 cm = 150 mm. Cetvel ve teknik çizim ölçüleri için cm-mm tablosu ve hesaplama aracı.",
    intro: "1 santimetre 10 milimetredir (mm): santimetreyi 10 ile çarpın.",
    exampleValues: [0.1, 0.5, 1, 1.5, 2, 2.5, 3, 5, 10, 15, 20, 30, 50, 100],
  },
  "kilometre-metre": {
    titles: ["1 km Kaç m? Kilometre Metre Çevirme Tablosu", "1 km Kaç Metre? Kilometre Metre Çevirme"],
    description: "1 km = 1.000 metre. 0,5 km = 500 m, 2,5 km = 2.500 m, 10 km = 10.000 m. Yürüyüş, koşu ve yol mesafeleri için kilometre-metre tablosu.",
    intro: "1 kilometre 1.000 metredir: kilometreyi 1.000 ile çarpın.",
    exampleValues: [0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 5, 10, 21.0975, 42.195, 100],
  },
  "kilogram-gram": {
    titles: ["1 kg Kaç Gram? Kilogram Gram Çevirme Tablosu", "1 kg Kaç Gram? Kilogram Gram Çevirme"],
    description: "1 kg (1 kilo) = 1.000 gram. Yarım kilo 500 gr, çeyrek kilo 250 gr, 1,5 kg = 1.500 gr. Mutfak ve alışveriş için kilogram-gram tablosu.",
    intro: "1 kilogram (1 kilo) 1.000 gramdır: kiloyu 1.000 ile çarpın.",
    exampleValues: [0.1, 0.125, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 5, 10, 25],
    faq: [{ question: "Yarım kilo kaç gram?", answer: "Yarım kilo 500 gram, çeyrek kilo 250 gramdır." }],
  },
  "gram-miligram": {
    titles: ["1 Gram Kaç mg? Gram Miligram Çevirme Tablosu", "1 Gram Kaç Miligram (mg)?"],
    description: "1 gram = 1.000 mg. 0,5 g = 500 mg, 0,1 g = 100 mg, 0,025 g = 25 mg. İlaç ve takviye dozları için gram-miligram tablosu ve hesaplama aracı.",
    intro: "1 gram 1.000 miligramdır (mg): gramı 1.000 ile çarpın.",
    exampleValues: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
  },
  "ton-kilogram": {
    titles: ["1 Ton Kaç kg? Ton Kilogram Çevirme Tablosu", "1 Ton Kaç Kilogram?"],
    description: "1 ton = 1.000 kg. Yarım ton 500 kg, 2,5 ton = 2.500 kg, 3,5 ton = 3.500 kg. Nakliye ve tonaj hesapları için ton-kilogram tablosu.",
    intro: "1 ton 1.000 kilogramdır: tonu 1.000 ile çarpın.",
    exampleValues: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3.5, 5, 10, 25, 40],
  },
  "hektar-donum": {
    titles: ["1 Hektar Kaç Dönüm? Hektar Dönüm Çevirme ve Tablo", "1 Hektar Kaç Dönüm?"],
    description: "1 hektar = 10 dönüm = 10.000 m². 0,5 ha = 5 dönüm, 2,5 ha = 25 dönüm, 10 ha = 100 dönüm. Tapu ve tarla ölçüleri için hektar-dönüm tablosu.",
    intro: "1 hektar 10 dönümdür: dönüm (dekar) 1.000 m², hektar 10.000 m².",
    exampleValues: [0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 5, 10, 20, 50, 100],
    faq: [
      {
        question: "Dönüm kaç metrekare?",
        answer: "Türkiye'de bugün kullanılan dönüm (dekar) 1.000 m²'dir. Eski Osmanlı dönümü yaklaşık 919,3 m² idi; tapu kayıtlarında 1.000 m²'lik dönüm esas alınır.",
      },
    ],
  },
  "dekar-donum": {
    titles: ["1 Dekar Kaç Dönüm? Dekar ve Dönüm Farkı", "1 Dekar Kaç Dönüm?"],
    description: "1 dekar = 1 dönüm = 1.000 m². Dekar ve dönüm bugün aynı alanı anlatır; eski Osmanlı dönümü ise yaklaşık 919,3 m² idi. Dekar-dönüm tablosu ve hesaplama.",
    intro: "Dekar ile dönüm aynıdır: 1 dekar = 1 dönüm = 1.000 metrekare.",
    faq: [
      {
        question: "Dekar ne demek?",
        answer: "Dekar, 1.000 metrekarelik alan birimidir; deka (10) ile ar (100 m²) birleşiminden gelir. Türkiye'de günlük dilde dönüm ile aynı anlamda kullanılır.",
      },
    ],
  },
  "dekar-metrekare": {
    titles: ["1 Dekar Kaç Metrekare (m²)? Dekar m² Çevirme", "1 Dekar Kaç Metrekare?"],
    description: "1 dekar = 1.000 m². 0,5 dekar = 500 m², 2,5 dekar = 2.500 m², 10 dekar = 10.000 m² (1 hektar). Arsa ve tarla ölçüleri için dekar-metrekare tablosu.",
    intro: "1 dekar 1.000 metrekaredir; 10 dekar 1 hektar eder.",
  },
  "donum-metrekare": {
    titles: ["1 Dönüm Kaç Metrekare (m²)? Dönüm m² Çevirme", "1 Dönüm Kaç Metrekare?"],
    description: "1 dönüm = 1.000 m². Yarım dönüm 500 m², 2,5 dönüm = 2.500 m², 10 dönüm = 10.000 m². Eski dönüm (919,3 m²) farkı ve dönüm-metrekare tablosu.",
    intro: "1 dönüm 1.000 metrekaredir (bugünkü dönüm = dekar).",
    faq: [
      {
        question: "Eski dönüm kaç metrekare?",
        answer: "Eski Osmanlı dönümü 40 × 40 arşın, yaklaşık 919,3 m²'dir. Bugünkü dönüm ise 1.000 m²'dir.",
      },
    ],
  },
  "metrekare-donum": {
    titles: ["Metrekare Dönüm Çevirme: Kaç m² Kaç Dönüm?", "Metrekare Kaç Dönüm?"],
    description: "1.000 m² = 1 dönüm. 500 m² = yarım dönüm, 2.500 m² = 2,5 dönüm, 10.000 m² = 10 dönüm. Arsa ve tarla ölçüleri için metrekare-dönüm tablosu ve hesaplama.",
    intro: "Metrekareyi 1.000'e bölün: 1.000 m² = 1 dönüm.",
  },
  "fit-metre": {
    titles: ["1 Fit Kaç Metre? Feet Metre Çevirme Tablosu", "1 Fit (Feet) Kaç Metre?"],
    description: "1 fit (feet, ft) = 0,3048 metre. 5 ft = 1,52 m, 6 ft = 1,83 m, 10 ft = 3,05 m. Boy ve konteyner ölçüleri için fit-metre tablosu ve hesaplama.",
    intro: "1 fit (feet) tam olarak 0,3048 metre, yani 30,48 cm'dir.",
    exampleValues: [1, 2, 3, 5, 5.5, 6, 10, 20, 40, 100, 1000],
    faq: [{ question: "20 ve 40 feet konteyner kaç metre?", answer: "20 ft yaklaşık 6,1 m, 40 ft yaklaşık 12,2 m dış uzunluğa karşılık gelir." }],
  },
  "inc-santimetre": {
    titles: ["1 İnç Kaç cm? İnç Santimetre Çevirme Tablosu", "1 İnç Kaç Santimetre?"],
    description: "1 inç = 2,54 cm. 24 inç = 60,96 cm, 32 inç = 81,28 cm, 55 inç = 139,7 cm. Ekran, jant ve boru ölçüleri için inç-cm tablosu.",
    intro: "1 inç tam olarak 2,54 santimetredir.",
    exampleValues: [1, 2, 5, 10, 12, 15.6, 17, 24, 27, 32, 43, 55, 65],
    faq: [
      {
        question: "Televizyon inç ölçüsü neyi gösterir?",
        answer: "Ekranın köşeden köşeye (çapraz) uzunluğunu. 55 inç bir televizyonun çaprazı 139,7 cm'dir; genişliği bundan kısadır.",
      },
    ],
  },
  "yarda-metre": {
    titles: ["1 Yarda Kaç Metre? Yarda Metre Çevirme Tablosu", "1 Yarda Kaç Metre?"],
    description: "1 yarda = 0,9144 metre = 3 feet. 10 yd = 9,14 m, 100 yd = 91,44 m. Futbol ve golf mesafeleri için yarda-metre tablosu ve hesaplama.",
    intro: "1 yarda tam olarak 0,9144 metredir (3 fit, 36 inç).",
  },
  "mil-kilometre": {
    titles: ["1 Mil Kaç km? Mil Kilometre Çevirme Tablosu", "1 Mil Kaç Kilometre?"],
    description: "1 mil = 1,609 km. 5 mil = 8,05 km, 26,2 mil (maraton) = 42,16 km, 60 mil/saat ≈ 96,6 km/saat. Deniz mili (1,852 km) farkıyla mil-km tablosu.",
    intro: "1 kara mili 1,609344 kilometredir. Denizcilikte kullanılan deniz mili ise 1,852 km'dir.",
    exampleValues: [1, 2, 5, 10, 13.1, 20, 26.2, 50, 60, 100, 500],
  },
  "deniz-mili-kilometre": {
    titles: ["1 Deniz Mili Kaç km? Deniz Mili Kilometre Çevirme", "1 Deniz Mili Kaç Kilometre?"],
    description: "1 deniz mili = 1,852 km (kara milinden uzundur: 1,609 km). 10 nmi = 18,52 km, 100 nmi = 185,2 km. Denizcilik ve havacılık için tablo.",
    intro: "1 deniz mili tam olarak 1.852 metredir; kara mili (1.609 m) ile karıştırılmamalıdır.",
  },
  "varil-litre": {
    titles: ["1 Varil Petrol Kaç Litre? Varil Litre Çevirme", "1 Varil Kaç Litre?"],
    description: "1 varil petrol = 158,99 litre (42 ABD galonu). 10 varil = 1.590 litre, 100 varil = 15.899 litre. Petrol fiyatları için varil-litre tablosu.",
    intro: "1 varil (petrol varili) 42 ABD galonu, yani 158,987 litredir.",
  },
  "galon-litre": {
    titles: ["1 Galon Kaç Litre? ABD ve İngiliz Galonu", "1 Galon Kaç Litre?"],
    description: "1 ABD galonu = 3,785 litre, 1 İngiliz galonu = 4,546 litre. 5 galon = 18,93 L, 10 galon = 37,85 L. Galon-litre tablosu ve hesaplama aracı.",
    intro: "Bu çevirici ABD galonunu kullanır: 1 galon = 3,785 litre. İngiliz (imperial) galonu ise 4,546 litredir.",
    faq: [
      {
        question: "ABD galonu ile İngiliz galonu aynı mı?",
        answer: "Hayır. ABD galonu 3,785 litre, İngiliz (imperial) galonu 4,546 litredir; aradaki fark yaklaşık %20'dir.",
      },
    ],
  },
  "litre-mililitre": {
    titles: ["1 Litre Kaç ml? Litre Mililitre Çevirme Tablosu", "1 Litre Kaç Mililitre?"],
    description: "1 litre = 1.000 ml. Yarım litre 500 ml, 1,5 litre = 1.500 ml, 0,33 litre = 330 ml. Mutfak ve içecek ölçüleri için litre-ml tablosu.",
    intro: "1 litre 1.000 mililitredir (ml).",
    exampleValues: [0.1, 0.2, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 2.5, 5],
  },
  "metrekup-litre": {
    titles: ["1 Metreküp Kaç Litre? m³ Litre Çevirme Tablosu", "1 Metreküp (m³) Kaç Litre?"],
    description: "1 m³ = 1.000 litre. 0,5 m³ = 500 L, 2 m³ = 2.000 L, 10 m³ = 10.000 L. Su faturası, depo ve havuz hacmi için metreküp-litre tablosu.",
    intro: "1 metreküp (m³) 1.000 litredir; su faturasındaki 1 m³ = 1 ton su.",
    exampleValues: [0.001, 0.01, 0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 50],
  },
  "saat-saniye": {
    titles: ["1 Saat Kaç Saniye? Saat Saniye Çevirme Tablosu", "1 Saat Kaç Saniye?"],
    description: "1 saat = 3.600 saniye (60 dakika × 60 saniye). 2 saat = 7.200 sn, 24 saat = 86.400 sn. Saat-saniye tablosu ve hesaplama aracı.",
    intro: "1 saatte 60 dakika, her dakikada 60 saniye vardır: 1 saat = 3.600 saniye.",
    exampleValues: [0.25, 0.5, 1, 1.5, 2, 3, 5, 8, 12, 24, 48],
    faq: [{ question: "1 günde kaç saniye var?", answer: "1 günde 86.400 saniye vardır (24 × 3.600)." }],
  },
  "bar-psi": {
    titles: ["1 Bar Kaç PSI? Bar PSI Çevirme ve Lastik Basıncı", "1 Bar Kaç PSI?"],
    description: "1 bar = 14,5 psi. 2,2 bar = 31,9 psi, 2,5 bar = 36,3 psi. Lastik basıncı, kompresör ve hidrolik için bar-psi tablosu ve hesaplama aracı.",
    intro: "1 bar yaklaşık 14,5 psi'dir; lastik basıncında 2,2 bar ≈ 32 psi.",
    exampleValues: [0.5, 1, 1.8, 2, 2.2, 2.4, 2.5, 3, 5, 6, 8, 10, 100, 200],
  },
  "terabayt-gigabayt": {
    titles: ["1 TB Kaç GB? Terabayt Gigabayt Çevirme (1000 mi 1024 mü?)", "1 TB Kaç GB?"],
    description: "1 TB = 1.000 GB. Windows 1.024 tabanıyla hesapladığı için 1 TB disk yaklaşık 931 GB görünür (1 TiB = 1.024 GiB). Terabayt-gigabayt tablosu ve açıklama.",
    intro: "Disk üreticileri 1 TB = 1.000 GB hesaplar; Windows ise 1.024 tabanıyla gösterdiği için 1 TB disk yaklaşık 931 GB görünür.",
    faq: [
      {
        question: "1 TB disk neden 931 GB görünüyor?",
        answer: "Disk 1.000.000.000.000 bayttır. Windows bunu 1.024³ bayta (1 GiB) böler: 10¹² ÷ 1.073.741.824 ≈ 931 GB. Kayıp yoktur, sadece hesap tabanı farklıdır.",
      },
    ],
  },
  "gigabayt-megabayt": {
    titles: ["1 GB Kaç MB? Gigabayt Megabayt Çevirme (1000 mi 1024 mü?)", "1 GB Kaç MB?"],
    description: "1 GB = 1.000 MB; bilgisayarların ikili sisteminde 1 GiB = 1.024 MiB. Telefon paketi, dosya ve disk boyutları için gigabayt-megabayt tablosu ve açıklama.",
    intro: "Ondalık sistemde 1 GB = 1.000 MB; bilgisayarların kullandığı ikili sistemde 1 GiB = 1.024 MiB.",
  },
  "okka-kilogram": {
    titles: ["1 Okka Kaç Kilo? Okka Kilogram Çevirme Tablosu", "1 Okka Kaç Kilogram?"],
    description: "1 okka = 1,283 kg (400 dirhem). 40 okka = 51,3 kg, 10 okka = 12,8 kg. Osmanlı ağırlık ölçüsü okka için kilogram tablosu ve hesaplama.",
    intro: "1 okka 400 dirhemdir, yaklaşık 1,283 kilogram.",
    exampleValues: [0.25, 0.5, 1, 2, 5, 10, 20, 40, 44, 100],
  },
};

export function turkishConversionSeo(page: PageLike) {
  const override = TURKISH_SEO_OVERRIDES[page.slug];
  if (override) {
    return {
      titles: override.titles,
      description: override.description,
      intro: override.intro,
      extraFaq: override.faq ?? [],
      exampleValues: override.exampleValues,
    };
  }

  // Sayfanın kendi tablo değerlerinden 1 dışındaki son üçü (birime uygun örnekler).
  const sample = page.exampleValues
    .filter((value) => value !== 1)
    .slice(-4, -1)
    .map((value) => trPair(page, value))
    .join(", ");
  return {
    titles: [`1 ${page.fromName} Kaç ${page.toName}? – Çevirici`, `1 ${page.fromName} Kaç ${page.toName}?`],
    description:
      `1 ${page.fromName} kaç ${page.toName} eder? ${trPair(page, 1)}. ` +
      `${sample ? `Örnek: ${sample}. ` : ""}Hesaplama aracı, formül ve dönüşüm tablosu.`,
    intro: undefined,
    extraFaq: [] as FaqItem[],
    exampleValues: undefined,
  };
}
