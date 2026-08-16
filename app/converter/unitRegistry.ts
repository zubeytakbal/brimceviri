export type UnitCategory = string;

export type LocalizedUnitName = {
  name: string;
  slug: string;
};

export type UnitDescription = {
  shortDescription: string;
  historySummary: string;
  measurementSystem: string;
  siEquivalent: string;
  commonUses: string;
};

export type UnitRegistryEntry = {
  id: string;
  category: UnitCategory;
  symbol: string;
  siFactor?: number;
  isTemperature?: boolean;
  tr?: LocalizedUnitName;
  en?: LocalizedUnitName;
  de?: LocalizedUnitName;
  enConversionSlug?: string;
  description?: {
    tr?: UnitDescription;
    en?: UnitDescription;
    de?: UnitDescription;
  };
};

export const unitRegistry: UnitRegistryEntry[] = [
  // ---- uzunluk / length / Länge ----
  {
    id: "metre",
    category: "uzunluk",
    symbol: "m",
    siFactor: 1,
    tr: { name: "Metre", slug: "metre" },
    en: { name: "Meter", slug: "meter" },
    de: { name: "Meter", slug: "meter" },
    enConversionSlug: "meters",
    description: {
      tr: {
        shortDescription:
          "Metre, Uluslararası Birim Sistemi'nde uzunluğun temel birimidir. Günlük yaşamdan mühendisliğe kadar mesafe ve boyut ölçümünde kullanılır.",
        historySummary:
          "Metre, 18. yüzyılın sonunda evrensel bir ölçü standardı oluşturma amacıyla geliştirildi. Günümüzde tanımı ışığın boşlukta belirli bir zaman aralığında aldığı yola dayanır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI uzunluk birimi",
        commonUses: "İnşaat, bilim, üretim, geometri ve genel ölçüm",
      },
    },
  },
  {
    id: "kilometre",
    category: "uzunluk",
    symbol: "km",
    siFactor: 1000,
    tr: { name: "Kilometre", slug: "kilometre" },
    en: { name: "Kilometer", slug: "kilometer" },
    de: { name: "Kilometer", slug: "kilometer" },
    enConversionSlug: "kilometers",
    description: {
      tr: {
        shortDescription:
          "Kilometre, 1000 metreye eşit bir uzunluk birimidir. Şehirler arası ve coğrafi mesafeleri ifade etmekte kullanılır.",
        historySummary:
          "Kilometre, metrik sistemin ondalık yapısı içinde metrenin katı olarak yerleşti. Kara yolları ve harita ölçeklerinde standart bir gösterim hâline geldi.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
        siEquivalent: "1 km = 1000 m",
        commonUses: "Karayolu mesafeleri, coğrafya, haritacılık ve altyapı",
      },
    },
  },
  {
    id: "santimetre",
    category: "uzunluk",
    symbol: "cm",
    siFactor: 0.01,
    tr: { name: "Santimetre", slug: "santimetre" },
    en: { name: "Centimeter", slug: "centimeter" },
    de: { name: "Zentimeter", slug: "zentimeter" },
    enConversionSlug: "centimeters",
    description: {
      tr: {
        shortDescription:
          "Santimetre, metrenin yüzde birine eşit bir uzunluk birimidir. Küçük nesnelerin ve günlük ölçülerin ifade edilmesinde yaygındır.",
        historySummary:
          "Santimetre, metrik sistemde ondalık alt birim olarak gelişti. Ölçümleri pratik ve hızlı hesaplanabilir hâle getirdiği için geniş kullanım kazandı.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
        siEquivalent: "1 cm = 0,01 m",
        commonUses: "Mobilya, tekstil, antropometri ve günlük ölçümler",
      },
    },
  },
  {
    id: "milimetre",
    category: "uzunluk",
    symbol: "mm",
    siFactor: 0.001,
    tr: { name: "Milimetre", slug: "milimetre" },
    en: { name: "Millimeter", slug: "millimeter" },
    de: { name: "Millimeter", slug: "millimeter" },
    enConversionSlug: "millimeters",
    description: {
      tr: {
        shortDescription:
          "Milimetre, metrenin binde birine eşit bir uzunluk birimidir. Hassas teknik ölçümlerde sık kullanılır.",
        historySummary:
          "Milimetre, sanayi ve mühendislikte daha küçük toleransların ölçülmesi ihtiyacıyla yaygınlaştı. Özellikle üretim ve çizim standartlarında temel bir alt birim oldu.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
        siEquivalent: "1 mm = 0,001 m",
        commonUses: "Mekanik üretim, teknik resim, işleme toleransları",
      },
    },
  },
  {
    id: "mikrometre",
    category: "uzunluk",
    symbol: "µm",
    siFactor: 0.000001,
    tr: { name: "Mikrometre", slug: "mikrometre" },
    en: { name: "Micrometer", slug: "micrometer" },
    de: { name: "Mikrometer", slug: "mikrometer" },
  },
  {
    id: "nanometre",
    category: "uzunluk",
    symbol: "nm",
    siFactor: 1e-9,
    tr: { name: "Nanometre", slug: "nanometre" },
    en: { name: "Nanometer", slug: "nanometer" },
    de: { name: "Nanometer", slug: "nanometer" },
  },
  {
    id: "fit",
    category: "uzunluk",
    symbol: "ft",
    siFactor: 0.3048,
    tr: { name: "Fit", slug: "fit" },
    en: { name: "Foot", slug: "foot" },
    de: { name: "Fuß", slug: "fuss" },
    enConversionSlug: "feet",
    description: {
      tr: {
        shortDescription:
          "Fit, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir uluslararası fit tam olarak 0,3048 metreye eşittir.",
        historySummary:
          "Fit, eski ölçü geleneklerinde insan ayağına dayalı bir yaklaşımdan doğdu. Farklı bölgesel değerler zamanla bırakıldı ve uluslararası fit 1959'da standartlaştırıldı.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 ft = 0,3048 m",
        commonUses: "Mimarlık, bina kotları, havacılık ve saha ölçüleri",
      },
    },
  },
  {
    id: "inc",
    category: "uzunluk",
    symbol: "in",
    siFactor: 0.0254,
    tr: { name: "İnç", slug: "inc" },
    en: { name: "Inch", slug: "inch" },
    de: { name: "Zoll", slug: "zoll" },
    enConversionSlug: "inches",
    description: {
      tr: {
        shortDescription:
          "İnç, İngiliz ve Amerikan ölçü sistemlerinde kullanılan kısa bir uzunluk birimidir. Bir inç tam olarak 2,54 santimetreye eşittir.",
        historySummary:
          "İnç, tarih boyunca insan bedenine dayalı yerel ölçülerden türedi. Modern uluslararası inç 1959 yılından beri tam olarak 25,4 milimetre olarak tanımlanır.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 in = 25,4 mm = 2,54 cm",
        commonUses:
          "Ekran boyutları, borulama, bağlantı elemanları ve teknik kataloglar",
      },
    },
  },
  {
    id: "yarda",
    category: "uzunluk",
    symbol: "yd",
    siFactor: 0.9144,
    tr: { name: "Yarda", slug: "yarda" },
    en: { name: "Yard", slug: "yard" },
    de: { name: "Yard", slug: "yard" },
    enConversionSlug: "yards",
    description: {
      tr: {
        shortDescription:
          "Yarda, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir uzunluk birimidir. Bir yarda tam olarak 0,9144 metreye eşittir.",
        historySummary:
          "Yarda, tarihsel olarak insan adımı ve beden ölçüleriyle ilişkilendirilen bir uzunluk yaklaşımından gelişti. Modern değeri uluslararası anlaşmalarla sabitlendi.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 yd = 0,9144 m",
        commonUses: "Spor sahaları, tekstil, peyzaj ve saha planlaması",
      },
    },
  },
  {
    id: "mil",
    category: "uzunluk",
    symbol: "mi",
    siFactor: 1609.344,
    tr: { name: "Mil", slug: "mil" },
    en: { name: "Mile", slug: "mile" },
    de: { name: "Meile", slug: "meile" },
    enConversionSlug: "miles",
    description: {
      tr: {
        shortDescription:
          "Mil, özellikle Amerika Birleşik Devletleri ve Birleşik Krallık'ta kullanılan bir uzunluk birimidir. Bir uluslararası mil 1609,344 metreye eşittir.",
        historySummary:
          "Milin kökeni Roma dönemindeki bin adımlık mesafe anlayışına uzanır. Modern uluslararası mil 1959 yılında tam olarak 1609,344 metre olarak standartlaştırıldı.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 mi = 1609,344 m",
        commonUses: "Karayolu mesafeleri, navigasyon ve saha ölçekleri",
      },
    },
  },
  {
    id: "deniz-mili",
    category: "uzunluk",
    symbol: "nmi",
    siFactor: 1852,
    tr: { name: "Deniz mili", slug: "deniz-mili" },
    en: { name: "Nautical mile", slug: "nautical-mile" },
    de: { name: "Seemeile", slug: "seemeile" },
  },

  // ---- alan / area / Fläche ----
  {
    id: "metrekare",
    category: "alan",
    symbol: "m²",
    siFactor: 1,
    tr: { name: "Metrekare", slug: "metrekare" },
    en: { name: "Square Meter", slug: "square-meter" },
    de: { name: "Quadratmeter", slug: "quadratmeter" },
    enConversionSlug: "square-meters",
    description: {
      tr: {
        shortDescription:
          "Metrekare, alanın SI türetilmiş birimidir. Zemin, kesit ve yüzey hesaplarında temel referans olarak kullanılır.",
        historySummary:
          "Metrekare, metrenin iki boyutlu uzantısı olarak metrik sistem içinde yerleşti. Yapı, arazi ve mühendislik çizimlerinde standart alan dili hâline geldi.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI alan birimi",
        commonUses: "Mimarlık, iç mekân, panel yüzeyleri ve kesit alanları",
      },
    },
  },
  {
    id: "santimetrekare",
    category: "alan",
    symbol: "cm²",
    siFactor: 0.0001,
    tr: { name: "Santimetrekare", slug: "santimetrekare" },
    en: { name: "Square Centimeter", slug: "square-centimeter" },
    de: { name: "Quadratzentimeter", slug: "quadratzentimeter" },
  },
  {
    id: "milimetrekare",
    category: "alan",
    symbol: "mm²",
    siFactor: 0.000001,
    tr: { name: "Milimetrekare", slug: "milimetrekare" },
    en: { name: "Square Millimeter", slug: "square-millimeter" },
    de: { name: "Quadratmillimeter", slug: "quadratmillimeter" },
  },
  {
    id: "kilometrekare",
    category: "alan",
    symbol: "km²",
    siFactor: 1_000_000,
    tr: { name: "Kilometrekare", slug: "kilometrekare" },
    en: { name: "Square Kilometer", slug: "square-kilometer" },
    de: { name: "Quadratkilometer", slug: "quadratkilometer" },
  },
  {
    id: "hektar",
    category: "alan",
    symbol: "ha",
    siFactor: 10_000,
    tr: { name: "Hektar", slug: "hektar" },
    en: { name: "Hectare", slug: "hectare" },
    de: { name: "Hektar", slug: "hektar" },
    enConversionSlug: "hectares",
    description: {
      tr: {
        shortDescription:
          "Hektar, özellikle arazi ölçümünde kullanılan büyük bir alan birimidir. 1 hektar tam olarak 10000 metrekareye eşittir.",
        historySummary:
          "Hektar, geniş tarımsal ve coğrafi alanları daha kısa ifade etmek için metrik sistem içinde yaygınlaşmıştır.",
        measurementSystem: "Metrik sistem, SI ile uyumlu",
        siEquivalent: "1 ha = 10000 m²",
        commonUses: "Tarım arazileri, imar planları ve büyük arsa kayıtları",
      },
    },
  },
  {
    id: "fitkare",
    category: "alan",
    symbol: "ft²",
    siFactor: 0.092903,
    tr: { name: "Fitkare", slug: "fitkare" },
    en: { name: "Square Foot", slug: "square-foot" },
    de: { name: "Quadratfuß", slug: "quadratfuss" },
    enConversionSlug: "square-feet",
    description: {
      tr: {
        shortDescription:
          "Fitkare, İngiliz ve ABD ölçü sistemlerinde kullanılan bir alan birimidir. Bir kare fit yaklaşık 0,092903 metrekareye eşittir.",
        historySummary:
          "Fitkare, fit biriminin yapı ve emlak alanındaki yaygın kullanımıyla birlikte yerleşmiştir.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 ft² = 0,092903 m²",
        commonUses: "Emlak ilanları, döşeme alanları ve bazı yapı katalogları",
      },
    },
  },
  {
    id: "incare",
    category: "alan",
    symbol: "in²",
    siFactor: 0.00064516,
    tr: { name: "İnçkare", slug: "incare" },
    en: { name: "Square Inch", slug: "square-inch" },
    de: { name: "Quadratzoll", slug: "quadratzoll" },
  },
  {
    id: "akre",
    category: "alan",
    symbol: "ac",
    siFactor: 4046.8564224,
    tr: { name: "Akre", slug: "akre" },
    en: { name: "Acre", slug: "acre" },
    de: { name: "Acre", slug: "acre" },
  },

  // ---- hacim / volume / Volumen ----
  {
    id: "metrekup",
    category: "hacim",
    symbol: "m³",
    siFactor: 1,
    tr: { name: "Metreküp", slug: "metrekup" },
    en: { name: "Cubic Meter", slug: "cubic-meter" },
    de: { name: "Kubikmeter", slug: "kubikmeter" },
    enConversionSlug: "cubic-meters",
    description: {
      tr: {
        shortDescription:
          "Metreküp, hacmin SI türetilmiş birimidir. Büyük hacimler ve teknik kapasiteler için temel referanstır.",
        historySummary:
          "Metreküp, metrenin üç boyutlu uzantısı olarak bilim ve mühendislikte temel hacim birimi hâline geldi.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI hacim birimi",
        commonUses:
          "Depolama hacmi, bina iç hacmi, proses tankları ve akış hesapları",
      },
    },
  },
  {
    id: "litre",
    category: "hacim",
    symbol: "L",
    siFactor: 0.001,
    tr: { name: "Litre", slug: "litre" },
    en: { name: "Liter", slug: "liter" },
    de: { name: "Liter", slug: "liter" },
    enConversionSlug: "liters",
    description: {
      tr: {
        shortDescription:
          "Litre, sıvı ve kapasiteleri ifade etmek için çok yaygın kullanılan bir hacim birimidir. 1 litre, 0,001 metreküpe eşittir.",
        historySummary:
          "Litre, metrik sistem içinde günlük kullanım ile teknik ihtiyacı birleştiren pratik bir hacim birimi olarak yaygınlaşmıştır.",
        measurementSystem: "Metrik sistem, SI ile uyumlu",
        siEquivalent: "1 L = 0,001 m³",
        commonUses:
          "Sıvılar, tank hacimleri, laboratuvar kapları ve günlük ölçüler",
      },
    },
  },
  {
    id: "mililitre",
    category: "hacim",
    symbol: "mL",
    siFactor: 0.000001,
    tr: { name: "Mililitre", slug: "mililitre" },
    en: { name: "Milliliter", slug: "milliliter" },
    de: { name: "Milliliter", slug: "milliliter" },
    enConversionSlug: "milliliters",
    description: {
      tr: {
        shortDescription:
          "Mililitre, litrenin binde birine eşit küçük bir hacim birimidir. Hassas sıvı ölçümlerinde kullanılır.",
        historySummary:
          "Mililitre, ilaç, laboratuvar ve mutfak ölçülerinde küçük hacimlerin güvenilir biçimde ifade edilmesi için yaygınlaşmıştır.",
        measurementSystem: "Metrik sistem, SI ile uyumlu",
        siEquivalent: "1 mL = 0,000001 m³",
        commonUses: "İlaç dozları, laboratuvar örnekleri ve küçük sıvı hacimleri",
      },
    },
  },
  {
    id: "santimetrekup",
    category: "hacim",
    symbol: "cm³",
    siFactor: 0.000001,
    tr: { name: "Santimetreküp", slug: "santimetrekup" },
    en: { name: "Cubic Centimeter", slug: "cubic-centimeter" },
    de: { name: "Kubikzentimeter", slug: "kubikzentimeter" },
  },
  {
    id: "fitkup",
    category: "hacim",
    symbol: "ft³",
    siFactor: 0.0283168,
    tr: { name: "Fitküp", slug: "fitkup" },
    en: { name: "Cubic Foot", slug: "cubic-foot" },
    de: { name: "Kubikfuß", slug: "kubikfuss" },
  },
  {
    id: "inckup",
    category: "hacim",
    symbol: "in³",
    siFactor: 0.0000163871,
    tr: { name: "İnçküp", slug: "inckup" },
    en: { name: "Cubic Inch", slug: "cubic-inch" },
    de: { name: "Kubikzoll", slug: "kubikzoll" },
  },
  {
    id: "galon",
    category: "hacim",
    symbol: "gal",
    siFactor: 0.00378541,
    tr: { name: "Galon", slug: "galon" },
    en: { name: "Gallon", slug: "gallon" },
    de: { name: "Gallone", slug: "gallone" },
  },

  // ---- kutle / mass / Masse ----
  {
    id: "kilogram",
    category: "kutle",
    symbol: "kg",
    siFactor: 1,
    tr: { name: "Kilogram", slug: "kilogram" },
    en: { name: "Kilogram", slug: "kilogram" },
    de: { name: "Kilogramm", slug: "kilogramm" },
    enConversionSlug: "kilograms",
    description: {
      tr: {
        shortDescription:
          "Kilogram, Uluslararası Birim Sistemi'nde kütlenin temel birimidir. Ticaret, laboratuvar ve mühendislikte yaygın olarak kullanılır.",
        historySummary:
          "Kilogram önce su kütlesine, sonra fiziksel bir prototipe dayalıydı. 2019'dan itibaren Planck sabitinin sabitlenmiş değeri üzerinden tanımlanmaktadır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI kütle birimi",
        commonUses: "Ticaret, taşıma, laboratuvar ve proses hesapları",
      },
    },
  },
  {
    id: "gram",
    category: "kutle",
    symbol: "g",
    siFactor: 0.001,
    tr: { name: "Gram", slug: "gram" },
    en: { name: "Gram", slug: "gram" },
    de: { name: "Gramm", slug: "gramm" },
    enConversionSlug: "grams",
    description: {
      tr: {
        shortDescription:
          "Gram, kilogramın binde birine eşit bir kütle birimidir. Gıda, laboratuvar ve küçük maddesel miktarları ifade etmekte kullanılır.",
        historySummary:
          "Gram, metrik sistemin erken döneminde su kütlesi temelli yaklaşımlardan gelişti ve daha sonra kilogramın alt birimi olarak standartlaştı.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
        siEquivalent: "1 g = 0,001 kg",
        commonUses: "Gıda, kimya, eczacılık ve hassas ölçüm",
      },
    },
  },
  {
    id: "miligram",
    category: "kutle",
    symbol: "mg",
    siFactor: 0.000001,
    tr: { name: "Miligram", slug: "miligram" },
    en: { name: "Milligram", slug: "milligram" },
    de: { name: "Milligramm", slug: "milligramm" },
    enConversionSlug: "milligrams",
    description: {
      tr: {
        shortDescription:
          "Miligram, gramın binde birine eşit çok küçük bir kütle birimidir. İlaç ve laboratuvar ölçümlerinde kritik öneme sahiptir.",
        historySummary:
          "Miligram, hassas terazilerin ve analitik laboratuvarların gelişmesiyle birlikte özellikle sağlık ve kimya alanlarında öne çıktı.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
        siEquivalent: "1 mg = 0,000001 kg",
        commonUses: "İlaç dozları, analizler ve hassas formülasyonlar",
      },
    },
  },
  {
    id: "ton",
    category: "kutle",
    symbol: "ton",
    siFactor: 1000,
    tr: { name: "Ton", slug: "ton" },
    en: { name: "Tonne", slug: "tonne" },
    de: { name: "Tonne", slug: "tonne" },
    enConversionSlug: "tonnes",
    description: {
      tr: {
        shortDescription:
          "Metrik ton, 1000 kilograma eşit büyük bir kütle birimidir. Ağır yüklerin ve endüstriyel miktarların ifade edilmesinde kullanılır.",
        historySummary:
          "Ton, büyük yükleri ve ticari kütleleri daha kısa ifade etmek için metrik sistem içinde yerleşti. Lojistik ve endüstride yaygın kullanım kazandı.",
        measurementSystem: "Metrik sistem, SI ile uyumlu",
        siEquivalent: "1 t = 1000 kg",
        commonUses: "Lojistik, üretim, hammadde ticareti ve ağır sanayi",
      },
    },
  },
  {
    id: "pound",
    category: "kutle",
    symbol: "lb",
    siFactor: 0.45359237,
    tr: { name: "Pound", slug: "pound" },
    en: { name: "Pound", slug: "pound" },
    de: { name: "Pfund", slug: "pfund" },
    enConversionSlug: "pounds",
    description: {
      tr: {
        shortDescription:
          "Pound, İngiliz ve Amerikan ölçü sistemlerinde kullanılan bir kütle birimidir. Bir uluslararası pound tam olarak 0,45359237 kilograma eşittir.",
        historySummary:
          "Pound ve lb sembolü Roma dönemindeki libra biriminden gelir. Modern avoirdupois pound 1959 yılında uluslararası olarak sabitlenmiştir.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 lb = 0,45359237 kg",
        commonUses: "Perakende, taşımacılık, beslenme ve endüstriyel kataloglar",
      },
    },
  },
  {
    id: "ons",
    category: "kutle",
    symbol: "oz",
    siFactor: 0.028349523125,
    tr: { name: "Ons", slug: "ons" },
    en: { name: "Ounce", slug: "ounce" },
    de: { name: "Unze", slug: "unze" },
    enConversionSlug: "ounces",
    description: {
      tr: {
        shortDescription:
          "Ons, İngiliz ve Amerikan ölçü sistemlerinde kullanılan küçük bir kütle birimidir. Bir avoirdupois ons 28,349523125 grama eşittir.",
        historySummary:
          "Ons, tarih boyunca farklı ticari ve tıbbi sistemlerde kullanıldı. Modern avoirdupois ons, pound ile olan 1/16 ilişkisi üzerinden standartlaştı.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 oz = 28,349523125 g",
        commonUses: "Paketleme, gıda, mücevher dışı hafif ticari ölçüler",
      },
    },
  },

  // ---- yoğunluk / density (engine-only, no public pages) ----
  { id: "kg-m3", category: "yogunluk", symbol: "kg/m³", siFactor: 1 },
  { id: "g-cm3", category: "yogunluk", symbol: "g/cm³", siFactor: 1000 },
  { id: "g-ml", category: "yogunluk", symbol: "g/mL", siFactor: 1000 },
  { id: "kg-l", category: "yogunluk", symbol: "kg/L", siFactor: 1000 },
  { id: "g-l", category: "yogunluk", symbol: "g/L", siFactor: 1 },
  { id: "mg-l", category: "yogunluk", symbol: "mg/L", siFactor: 0.001 },
  { id: "lb-ft3", category: "yogunluk", symbol: "lb/ft³", siFactor: 16.01846337 },
  { id: "lb-in3", category: "yogunluk", symbol: "lb/in³", siFactor: 27679.90471 },
  { id: "lb-gal-us", category: "yogunluk", symbol: "lb/gal (US)", siFactor: 119.826427 },
  { id: "slug-ft3", category: "yogunluk", symbol: "slug/ft³", siFactor: 515.378818 },

  // ---- hız / speed / Geschwindigkeit ----
  {
    id: "metre-saniye",
    category: "hiz",
    symbol: "m/s",
    siFactor: 1,
    tr: { name: "Metre/Saniye", slug: "metre-saniye" },
    en: { name: "Meter per Second", slug: "meter-per-second" },
    de: { name: "Meter pro Sekunde", slug: "meter-pro-sekunde" },
    enConversionSlug: "meters-per-second",
    description: {
      tr: {
        shortDescription:
          "Metre/saniye, hızın SI türetilmiş birimidir. Mühendislik ve fizikte temel referans kabul edilir.",
        historySummary:
          "Metre ve saniyenin birleşiminden türeyen bu gösterim, modern bilimsel hız ölçümünün standart dilidir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI hız birimi",
        commonUses: "Akışkanlar, mekanik hareket ve bilimsel ölçümler",
      },
    },
  },
  {
    id: "kilometre-saat",
    category: "hiz",
    symbol: "km/h",
    siFactor: 1000 / 3600,
    tr: { name: "Kilometre/Saat", slug: "kilometre-saat" },
    en: { name: "Kilometer per Hour", slug: "kilometer-per-hour" },
    de: { name: "Kilometer pro Stunde", slug: "kilometer-pro-stunde" },
    enConversionSlug: "kilometers-per-hour",
    description: {
      tr: {
        shortDescription:
          "Kilometre/saat, kara taşımacılığında yaygın kullanılan pratik bir hız birimidir.",
        historySummary:
          "Yol ve ulaşım sistemlerinin yaygınlaşmasıyla kilometre/saat gösterimi sürüş ve seyahat için standartlaşmıştır.",
        measurementSystem: "Metrik pratik kullanım",
        siEquivalent: "1 km/h ≈ 0,277778 m/s",
        commonUses: "Araç hızları, trafik işaretleri ve saha ölçümleri",
      },
    },
  },
  { id: "km-s", category: "hiz", symbol: "km/s", siFactor: 1000 },
  {
    id: "mil-saat",
    category: "hiz",
    symbol: "mph",
    siFactor: 1609.344 / 3600,
    tr: { name: "Mil/Saat", slug: "mil-saat" },
    en: { name: "Mile per Hour", slug: "mile-per-hour" },
    de: { name: "Meilen pro Stunde", slug: "meilen-pro-stunde" },
    enConversionSlug: "miles-per-hour",
    description: {
      tr: {
        shortDescription:
          "Mil/saat, özellikle ABD ve Birleşik Krallık uygulamalarında kullanılan bir hız birimidir.",
        historySummary:
          "Mil ve saat birimlerinin birleşimi, kara ulaşımında Anglo-Amerikan ölçü geleneğinin temel hız dilini oluşturmuştur.",
        measurementSystem: "İngiliz ve ABD ölçü sistemleri",
        siEquivalent: "1 mph = 1,609344 km/h",
        commonUses: "Karayolu hızları, otomotiv ve saha raporları",
      },
    },
  },
  { id: "knot", category: "hiz", symbol: "knot", siFactor: 1852 / 3600 },
  { id: "ft-s", category: "hiz", symbol: "ft/s", siFactor: 0.3048 },
  { id: "m-min", category: "hiz", symbol: "m/min", siFactor: 1 / 60 },
  { id: "km-min", category: "hiz", symbol: "km/min", siFactor: 1000 / 60 },
  { id: "cm-s", category: "hiz", symbol: "cm/s", siFactor: 0.01 },
  { id: "isik-hizi", category: "hiz", symbol: "c", siFactor: 299792458 },

  // ---- ivme / acceleration (engine-only) ----
  { id: "m-s2", category: "ivme", symbol: "m/s²", siFactor: 1 },
  { id: "cm-s2", category: "ivme", symbol: "cm/s²", siFactor: 0.01 },
  { id: "mm-s2", category: "ivme", symbol: "mm/s²", siFactor: 0.001 },
  { id: "km-s2", category: "ivme", symbol: "km/s²", siFactor: 1000 },
  { id: "ft-s2", category: "ivme", symbol: "ft/s²", siFactor: 0.3048 },
  { id: "in-s2", category: "ivme", symbol: "in/s²", siFactor: 0.0254 },
  { id: "m-min2", category: "ivme", symbol: "m/min²", siFactor: 1 / 3600 },
  { id: "ft-min2", category: "ivme", symbol: "ft/min²", siFactor: 0.3048 / 3600 },
  { id: "ivme-gal", category: "ivme", symbol: "gal", siFactor: 0.01 },
  { id: "g0", category: "ivme", symbol: "g0", siFactor: 9.80665 },

  // ---- zaman / time / Zeit ----
  {
    id: "saniye",
    category: "zaman",
    symbol: "s",
    siFactor: 1,
    tr: { name: "Saniye", slug: "saniye" },
    en: { name: "Second", slug: "second" },
    de: { name: "Sekunde", slug: "sekunde" },
    enConversionSlug: "seconds",
    description: {
      tr: {
        shortDescription:
          "Saniye, zamanın SI temel birimidir. Tüm süre ve hız hesaplarının temelinde yer alır.",
        historySummary:
          "Modern saniye tanımı atomik geçiş frekansına bağlanarak evrensel ve yüksek hassasiyetli hâle getirilmiştir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI zaman birimi",
        commonUses: "Deney süreleri, hareket analizi, veri kayıtları ve zamanlama",
      },
    },
  },
  { id: "milisaniye", category: "zaman", symbol: "ms", siFactor: 0.001 },
  {
    id: "dakika",
    category: "zaman",
    symbol: "min",
    siFactor: 60,
    tr: { name: "Dakika", slug: "dakika" },
    en: { name: "Minute", slug: "minute" },
    de: { name: "Minute", slug: "minute" },
    enConversionSlug: "minutes",
    description: {
      tr: {
        shortDescription: "Dakika, 60 saniyeye eşit pratik bir zaman birimidir.",
        historySummary:
          "Dakika, günlük planlama ile bilimsel olmayan süre takibinde tarihsel olarak yaygınlaşmış bir ara birimdir.",
        measurementSystem: "SI dışı, SI ile birlikte kullanılan zaman birimi",
        siEquivalent: "1 min = 60 s",
        commonUses: "Toplantılar, kısa süreler, egzersiz ve proses çevrimleri",
      },
    },
  },
  {
    id: "saat",
    category: "zaman",
    symbol: "h",
    siFactor: 3600,
    tr: { name: "Saat", slug: "saat" },
    en: { name: "Hour", slug: "hour" },
    de: { name: "Stunde", slug: "stunde" },
    enConversionSlug: "hours",
    description: {
      tr: {
        shortDescription: "Saat, 3600 saniyeye eşit yaygın bir zaman birimidir.",
        historySummary:
          "Saat birimi, göksel ve mekanik zaman ölçüm geleneklerinden modern takvim ve vardiya sistemlerine taşınmıştır.",
        measurementSystem: "SI dışı, SI ile birlikte kullanılan zaman birimi",
        siEquivalent: "1 h = 3600 s",
        commonUses: "Çalışma süreleri, seyahat, enerji tüketimi ve günlük planlama",
      },
    },
  },
  { id: "gun", category: "zaman", symbol: "day", siFactor: 86400 },

  // ---- açısal hız (engine-only) ----
  { id: "rad-s", category: "acisal_hiz", symbol: "rad/s", siFactor: 1 },
  { id: "rad-min", category: "acisal_hiz", symbol: "rad/min", siFactor: 1 / 60 },
  { id: "rad-h", category: "acisal_hiz", symbol: "rad/h", siFactor: 1 / 3600 },
  { id: "rpm", category: "acisal_hiz", symbol: "rpm", siFactor: (2 * Math.PI) / 60 },
  { id: "hz", category: "acisal_hiz", symbol: "Hz", siFactor: 2 * Math.PI },
  { id: "deg-s", category: "acisal_hiz", symbol: "°/s", siFactor: Math.PI / 180 },
  { id: "deg-min", category: "acisal_hiz", symbol: "°/min", siFactor: Math.PI / (180 * 60) },
  { id: "deg-h", category: "acisal_hiz", symbol: "°/h", siFactor: Math.PI / (180 * 3600) },

  // ---- kuvvet / tork / momentum (engine-only) ----
  { id: "newton", category: "kuvvet", symbol: "N", siFactor: 1 },
  { id: "kilonewton", category: "kuvvet", symbol: "kN", siFactor: 1000 },
  { id: "dyn", category: "kuvvet", symbol: "dyn", siFactor: 0.00001 },
  { id: "lbf", category: "kuvvet", symbol: "lbf", siFactor: 4.4482216 },
  { id: "newton-metre", category: "tork", symbol: "N·m", siFactor: 1 },
  { id: "kilonewton-metre", category: "tork", symbol: "kN·m", siFactor: 1000 },
  { id: "lb-ft", category: "tork", symbol: "lb·ft", siFactor: 1.355817948 },
  { id: "kg-m-s", category: "momentum", symbol: "kg·m/s", siFactor: 1 },
  { id: "n-s", category: "momentum", symbol: "N·s", siFactor: 1 },
  { id: "lb-ft-s", category: "momentum", symbol: "lb·ft/s", siFactor: 0.138255 },

  // ---- basınç / pressure / Druck ----
  {
    id: "pascal",
    category: "basinc",
    symbol: "Pa",
    siFactor: 1,
    tr: { name: "Pascal", slug: "pascal" },
    en: { name: "Pascal", slug: "pascal" },
    de: { name: "Pascal", slug: "pascal" },
    enConversionSlug: "pascals",
    description: {
      tr: {
        shortDescription:
          "Pascal, Uluslararası Birim Sistemi'nde basıncın türetilmiş birimidir. 1 Pa = 1 N/m² ilişkisiyle tanımlanır.",
        historySummary:
          "Birim adını Blaise Pascal'dan alır. Akışkanlar ve basınç çalışmalarındaki bilimsel gelişmelerle birlikte SI içinde standart basınç referansı oldu.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI basınç birimi, 1 Pa = 1 N/m²",
        commonUses: "Bilimsel hesaplar, malzeme analizi ve referans dönüşümler",
      },
    },
  },
  {
    id: "kilopascal",
    category: "basinc",
    symbol: "kPa",
    siFactor: 1000,
    tr: { name: "Kilopascal", slug: "kilopascal" },
    en: { name: "Kilopascal", slug: "kilopascal" },
    de: { name: "Kilopascal", slug: "kilopascal" },
    enConversionSlug: "kilopascals",
    description: {
      tr: {
        shortDescription:
          "Kilopascal, 1000 pascala eşit bir basınç birimidir. Pratik mühendislikte pascaldan daha okunabilir sonuçlar sağlar.",
        historySummary:
          "Kilopascal, özellikle saha ölçümleri ve mühendislik belgelerinde sayısal okunabilirliği artırdığı için yaygınlaşmıştır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
        siEquivalent: "1 kPa = 1000 Pa",
        commonUses: "HVAC, yapı mühendisliği, lastik basıncı ve proses verileri",
      },
    },
  },
  {
    id: "bar",
    category: "basinc",
    symbol: "bar",
    siFactor: 100000,
    tr: { name: "Bar", slug: "bar" },
    en: { name: "Bar", slug: "bar" },
    de: { name: "Bar", slug: "bar" },
    enConversionSlug: "bars",
    description: {
      tr: {
        shortDescription:
          "Bar, 100000 pascala eşit bir basınç birimidir. Sanayi ve ekipman göstergelerinde çok yaygın bir pratik gösterimdir.",
        historySummary:
          "Bar, atmosferik büyüklüklere yakın basınçları daha kısa ifade edebilmek için teknik uygulamalarda yaygınlık kazandı. SI dışı olsa da endüstride güçlü şekilde yaşamaya devam etti.",
        measurementSystem: "SI dışı metrik mühendislik birimi",
        siEquivalent: "1 bar = 100000 Pa",
        commonUses: "Kompresörler, hidrolik, pnömatik ve servis manometreleri",
      },
    },
  },
  { id: "milibar", category: "basinc", symbol: "mbar", siFactor: 100 },
  {
    id: "atmosfer",
    category: "basinc",
    symbol: "atm",
    siFactor: 101325,
    tr: { name: "Atmosfer", slug: "atmosfer" },
    en: { name: "Atmosphere", slug: "atmosphere" },
    de: { name: "Atmosphäre", slug: "atmosphaere" },
    enConversionSlug: "atmospheres",
  },
  { id: "teknik-atmosfer", category: "basinc", symbol: "at", siFactor: 98066.5 },
  {
    id: "psi",
    category: "basinc",
    symbol: "psi",
    siFactor: 6894.757293168,
    tr: { name: "PSI", slug: "psi" },
    en: { name: "PSI", slug: "psi" },
    de: { name: "PSI", slug: "psi" },
    enConversionSlug: "psi",
    description: {
      tr: {
        shortDescription:
          "PSI, pound-force per square inch ifadesinin kısaltmasıdır. Anglo-Amerikan teknik sistemlerde kullanılan yaygın bir basınç birimidir.",
        historySummary:
          "PSI özellikle otomotiv, hidrolik ve saha servis geleneği içinde yerleşti. SI birimleri yaygınlaşsa da birçok ekipman etiketi ve katalogta kullanılmaya devam etmektedir.",
        measurementSystem: "İngiliz ve ABD mühendislik kullanımı",
        siEquivalent: "1 psi = 6894,757293168 Pa",
        commonUses: "Lastik basıncı, hidrolik sistemler ve teknik servis",
      },
    },
  },
  {
    id: "milimetre-civa",
    category: "basinc",
    symbol: "mmHg",
    siFactor: 133.322387415,
    tr: { name: "Milimetre Cıva", slug: "milimetre-civa" },
    en: { name: "Millimeter of Mercury", slug: "millimeter-of-mercury" },
    de: { name: "Millimeter Quecksilbersäule", slug: "millimeter-quecksilbersaeule" },
    enConversionSlug: "millimeters-of-mercury",
    description: {
      tr: {
        shortDescription:
          "Milimetre cıva, bir cıva sütununun yüksekliğine dayanan bir basınç birimidir. Tıbbi ve laboratuvar ölçümlerinde tarihsel önem taşır.",
        historySummary:
          "mmHg, cıvalı manometrelerin yaygın olduğu dönemde yerleşti. Özellikle tansiyon ölçümleri ve vakum/atmosfer referansları için kalıcı bir teknik kullanım alanı oluşturdu.",
        measurementSystem: "SI dışı tarihsel mühendislik ve tıbbi birim",
        siEquivalent: "1 mmHg = 133,322387415 Pa",
        commonUses:
          "Tansiyon ölçümleri, laboratuvar manometreleri ve vakum referansları",
      },
    },
  },
  { id: "mmh2o", category: "basinc", symbol: "mmH2O", siFactor: 9.80665 },
  {
    id: "kilogram-kuvvet-santimetrekare",
    category: "basinc",
    symbol: "kgf/cm²",
    siFactor: 98066.5,
    tr: { name: "Kilogram-kuvvet/Santimetrekare", slug: "kilogram-kuvvet-santimetrekare" },
    en: {
      name: "Kilogram-Force per Square Centimeter",
      slug: "kilogram-force-per-square-centimeter",
    },
    de: {
      name: "Kilogramm-Kraft pro Quadratzentimeter",
      slug: "kilogramm-kraft-pro-quadratzentimeter",
    },
    enConversionSlug: "kilogram-force-per-square-centimeter",
    description: {
      tr: {
        shortDescription:
          "Kilogram-kuvvet/santimetrekare, kuvvet ve alan ilişkisine dayanan SI dışı bir basınç birimidir. Eski göstergelerde ve bazı servis belgelerinde görülür.",
        historySummary:
          "Bu birim, kilogram-kuvvet kavramının teknik çizelgelerde yaygın kullanıldığı dönemde özellikle pompa, kazan ve mekanik gösterge dünyasında yerleşti.",
        measurementSystem: "SI dışı metrik mühendislik birimi",
        siEquivalent: "1 kgf/cm² = 98066,5 Pa = 0,980665 bar",
        commonUses:
          "Eski pompa ve kazan göstergeleri, servis kitapçıkları ve analog cihazlar",
      },
    },
  },

  // ---- viskozite (engine-only) ----
  { id: "pascal-saniye", category: "viskozite_dinamik", symbol: "Pa·s", siFactor: 1 },
  { id: "milipascal-saniye", category: "viskozite_dinamik", symbol: "mPa·s", siFactor: 0.001 },
  { id: "poise", category: "viskozite_dinamik", symbol: "P", siFactor: 0.1 },
  { id: "centipoise", category: "viskozite_dinamik", symbol: "cP", siFactor: 0.001 },
  { id: "m2-s", category: "viskozite_kinematik", symbol: "m²/s", siFactor: 1 },
  { id: "mm2-s", category: "viskozite_kinematik", symbol: "mm²/s", siFactor: 0.000001 },
  { id: "centistoke", category: "viskozite_kinematik", symbol: "cSt", siFactor: 0.000001 },

  // ---- debi_hacimsel / debi_kutlesel (engine-only) ----
  { id: "m3-s", category: "debi_hacimsel", symbol: "m³/s", siFactor: 1 },
  { id: "l-s", category: "debi_hacimsel", symbol: "L/s", siFactor: 0.001 },
  { id: "m3-h-hacimsel", category: "debi_hacimsel", symbol: "m³/h", siFactor: 1 / 3600 },
  { id: "l-min-hacimsel", category: "debi_hacimsel", symbol: "L/min", siFactor: 0.001 / 60 },
  { id: "cfm", category: "debi_hacimsel", symbol: "cfm", siFactor: 0.0283168 / 60 },
  { id: "gpm", category: "debi_hacimsel", symbol: "gpm", siFactor: 0.00378541 / 60 },
  { id: "kg-s", category: "debi_kutlesel", symbol: "kg/s", siFactor: 1 },
  { id: "kg-h", category: "debi_kutlesel", symbol: "kg/h", siFactor: 1 / 3600 },
  { id: "g-s", category: "debi_kutlesel", symbol: "g/s", siFactor: 0.001 },
  { id: "g-h", category: "debi_kutlesel", symbol: "g/h", siFactor: 0.001 / 3600 },

  // ---- enerji / energy / Energie ----
  {
    id: "joule",
    category: "enerji",
    symbol: "J",
    siFactor: 1,
    tr: { name: "Joule", slug: "joule" },
    en: { name: "Joule", slug: "joule" },
    de: { name: "Joule", slug: "joule" },
    enConversionSlug: "joules",
    description: {
      tr: {
        shortDescription:
          "Joule, enerjinin SI türetilmiş birimidir. İş, ısı ve enerji miktarlarını ifade etmek için kullanılır.",
        historySummary:
          "Joule birimi, mekanik iş ve enerji kavramlarının bilimsel standardizasyonuyla birlikte SI içinde temel enerji referansı hâline gelmiştir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI enerji birimi",
        commonUses: "Termodinamik, enerji dengeleri ve bilimsel hesaplar",
      },
    },
  },
  { id: "kilojoule", category: "enerji", symbol: "kJ", siFactor: 1000 },
  { id: "megajoule", category: "enerji", symbol: "MJ", siFactor: 1_000_000 },
  { id: "watt-saat", category: "enerji", symbol: "Wh", siFactor: 3600 },
  {
    id: "kilovatsaat",
    category: "enerji",
    symbol: "kWh",
    siFactor: 3_600_000,
    tr: { name: "Kilovat-saat", slug: "kilovatsaat" },
    en: { name: "Kilowatt-hour", slug: "kilowatt-hour" },
    de: { name: "Kilowattstunde", slug: "kilowattstunde" },
    enConversionSlug: "kilowatt-hours",
    description: {
      tr: {
        shortDescription:
          "Kilovat-saat, elektrik tüketiminde yaygın kullanılan bir enerji birimidir.",
        historySummary:
          "Elektrik sayaçları ve faturalandırma sistemleri nedeniyle kilovat-saat, pratik enerji kullanımının en tanınan birimlerinden biri olmuştur.",
        measurementSystem: "Teknik ve ticari enerji birimi",
        siEquivalent: "1 kWh = 3,6 MJ",
        commonUses: "Elektrik faturaları, batarya kapasitesi ve tüketim karşılaştırmaları",
      },
    },
  },
  {
    id: "watt",
    category: "enerji",
    symbol: "W",
    siFactor: 1,
    tr: { name: "Watt", slug: "watt" },
    en: { name: "Watt", slug: "watt" },
    de: { name: "Watt", slug: "watt" },
    enConversionSlug: "watts",
    description: {
      tr: {
        shortDescription: "Watt, gücün SI türetilmiş birimidir. Enerjinin aktarım hızını ifade eder.",
        historySummary:
          "Watt, endüstri ve elektrik mühendisliğinde güç seviyelerini ifade eden temel standart birim hâline gelmiştir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI güç birimi",
        commonUses: "Cihaz gücü, motor etiketleri ve enerji sistemleri",
      },
    },
  },
  {
    id: "kilowatt",
    category: "enerji",
    symbol: "kW",
    siFactor: 1000,
    tr: { name: "Kilowatt", slug: "kilowatt" },
    en: { name: "Kilowatt", slug: "kilowatt" },
    de: { name: "Kilowatt", slug: "kilowatt" },
    enConversionSlug: "kilowatts",
    description: {
      tr: {
        shortDescription:
          "Kilowatt, 1000 watt’a eşit güç birimidir. Tesisat ve ekipman kapasitesinde çok kullanılır.",
        historySummary:
          "Kilowatt, watt biriminin büyük güç değerlerinde daha okunabilir kullanımı için mühendislik belgelerinde yaygınlaşmıştır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
        siEquivalent: "1 kW = 1000 W",
        commonUses: "Elektrik panoları, HVAC ekipmanı, jeneratör ve makine gücü",
      },
    },
  },
  { id: "kalori", category: "enerji", symbol: "cal", siFactor: 4.184 },
  { id: "kilokalori", category: "enerji", symbol: "kcal", siFactor: 4184 },
  { id: "btu", category: "enerji", symbol: "Btu", siFactor: 1055.056 },
  { id: "therm", category: "enerji", symbol: "th", siFactor: 1.05506e8 },
  { id: "quad-btu", category: "enerji", symbol: "quad BTU", siFactor: 1.05506e18 },

  // ---- güç (engine-only, separate from enerji's W/kW) ----
  { id: "guc-watt", category: "guc", symbol: "W", siFactor: 1 },
  { id: "guc-kilowatt", category: "guc", symbol: "kW", siFactor: 1000 },
  { id: "megawatt", category: "guc", symbol: "MW", siFactor: 1_000_000 },
  { id: "beygirgucu-metric", category: "guc", symbol: "hp", siFactor: 745.7 },
  { id: "beygirgucu-mechanical", category: "guc", symbol: "HP", siFactor: 745.7 },
  { id: "cheval-vapeur", category: "guc", symbol: "CV", siFactor: 735.49875 },

  // ---- sıcaklık / temperature / Temperatur (non-linear, no siFactor) ----
  {
    id: "santigrat",
    category: "sicaklik",
    symbol: "C",
    isTemperature: true,
    tr: { name: "Santigrat", slug: "santigrat" },
    en: { name: "Celsius", slug: "celsius" },
    de: { name: "Celsius", slug: "celsius" },
    enConversionSlug: "celsius",
    description: {
      tr: {
        shortDescription:
          "Santigrat ölçeği, günlük yaşam ve mühendislikte en yaygın sıcaklık gösterimlerinden biridir.",
        historySummary:
          "Santigrat ölçeği, suyun donma ve kaynama noktalarına dayalı pratik bir sıcaklık sistemi olarak yerleşti.",
        measurementSystem: "SI ile birlikte kullanılan sıcaklık ölçeği",
        siEquivalent: "Sıcaklık farkında 1 °C = 1 K",
        commonUses: "Hava durumu, HVAC, proses takibi ve günlük sıcaklık değerleri",
      },
    },
  },
  {
    id: "fahrenhayt",
    category: "sicaklik",
    symbol: "F",
    isTemperature: true,
    tr: { name: "Fahrenheit", slug: "fahrenhayt" },
    en: { name: "Fahrenheit", slug: "fahrenheit" },
    de: { name: "Fahrenheit", slug: "fahrenheit" },
    enConversionSlug: "fahrenheit",
    description: {
      tr: {
        shortDescription: "Fahrenheit, özellikle ABD’de yaygın olan bir sıcaklık ölçeğidir.",
        historySummary:
          "Fahrenheit ölçeği tarihsel olarak Anglo-Amerikan ölçüm pratiğinde yerleşmiş ve günümüzde de geniş kullanıcı tabanını korumuştur.",
        measurementSystem: "İngiliz ve ABD ölçüm geleneği",
        siEquivalent: "Sıcaklık farkında 1 °F = 5/9 K",
        commonUses: "ABD hava durumu verileri, ev içi sıcaklıklar ve bazı teknik kataloglar",
      },
    },
  },
  {
    id: "kelvin",
    category: "sicaklik",
    symbol: "K",
    isTemperature: true,
    tr: { name: "Kelvin", slug: "kelvin" },
    en: { name: "Kelvin", slug: "kelvin" },
    de: { name: "Kelvin", slug: "kelvin" },
    enConversionSlug: "kelvin",
    description: {
      tr: {
        shortDescription:
          "Kelvin, sıcaklığın SI temel birimidir ve mutlak sıcaklık ölçeğini temsil eder.",
        historySummary:
          "Kelvin ölçeği termodinamik sıcaklığı sıfırdan başlatan bilimsel yaklaşımın sonucu olarak geliştirilmiştir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI sıcaklık birimi",
        commonUses: "Termodinamik, bilimsel hesaplar ve mutlak sıcaklık gerektiren analizler",
      },
    },
  },

  // ---- ısıl iletkenlik / ısı akısı / özgül ısı (engine-only) ----
  { id: "w-mk", category: "isil_iletkenlik", symbol: "W/m·K", siFactor: 1 },
  { id: "kw-mk", category: "isil_iletkenlik", symbol: "kW/m·K", siFactor: 1000 },
  { id: "w-cmk", category: "isil_iletkenlik", symbol: "W/cm·K", siFactor: 100 },
  { id: "btu-hftf", category: "isil_iletkenlik", symbol: "Btu/h·ft·°F", siFactor: 1.730735 },
  { id: "w-m2", category: "isi_akisi", symbol: "W/m²", siFactor: 1 },
  { id: "kw-m2", category: "isi_akisi", symbol: "kW/m²", siFactor: 1000 },
  { id: "cal-cm2s", category: "isi_akisi", symbol: "cal/cm²·s", siFactor: 41840 },
  { id: "j-kgk", category: "ozgul_isi", symbol: "J/kg·K", siFactor: 1 },
  { id: "kj-kgk", category: "ozgul_isi", symbol: "kJ/kg·K", siFactor: 1000 },
  { id: "cal-gk", category: "ozgul_isi", symbol: "cal/g·K", siFactor: 4.184 },
  { id: "btu-lbf", category: "ozgul_isi", symbol: "Btu/lb·°F", siFactor: 4186.8 },

  // ---- debi / elektrik ("core" categories, distinct from *_hacimsel/*_kutlesel/*_gerilim/*_akim) ----
  {
    id: "metrekup-saat",
    category: "debi",
    symbol: "m³/h",
    siFactor: 1 / 3600,
    tr: { name: "Metreküp/Saat", slug: "metrekup-saat" },
    en: { name: "Cubic Meter per Hour", slug: "cubic-meter-per-hour" },
    de: { name: "Kubikmeter pro Stunde", slug: "kubikmeter-pro-stunde" },
    enConversionSlug: "cubic-meters-per-hour",
    description: {
      tr: {
        shortDescription: "Metreküp/saat, hacimsel debiyi ifade eden pratik bir akış birimidir.",
        historySummary:
          "Bina tesisatı ve proses akışlarında saat tabanlı okuma ihtiyacı nedeniyle bu gösterim geniş kullanım kazanmıştır.",
        measurementSystem: "Teknik hacimsel debi birimi",
        siEquivalent: "1 m³/h ≈ 0,000277778 m³/s",
        commonUses: "Pompa seçimi, HVAC, su ve proses akışları",
      },
    },
  },
  {
    id: "litre-dakika",
    category: "debi",
    symbol: "L/min",
    siFactor: 0.001 / 60,
    tr: { name: "Litre/Dakika", slug: "litre-dakika" },
    en: { name: "Liter per Minute", slug: "liter-per-minute" },
    de: { name: "Liter pro Minute", slug: "liter-pro-minute" },
    enConversionSlug: "liters-per-minute",
    description: {
      tr: {
        shortDescription:
          "Litre/dakika, küçük ve orta ölçekli akış sistemlerinde okunabilir debi gösterimi sağlar.",
        historySummary:
          "Dakika bazlı daha küçük akışları izlemek için laboratuvar, servis ve saha uygulamalarında yaygınlaşmıştır.",
        measurementSystem: "Teknik hacimsel debi birimi",
        siEquivalent: "1 L/min ≈ 0,0000166667 m³/s",
        commonUses: "Su hatları, cihaz beslemeleri ve küçük proses akışları",
      },
    },
  },
  {
    id: "volt",
    category: "elektrik",
    symbol: "V",
    siFactor: 1,
    tr: { name: "Volt", slug: "volt" },
    en: { name: "Volt", slug: "volt" },
    de: { name: "Volt", slug: "volt" },
    enConversionSlug: "volts",
    description: {
      tr: {
        shortDescription: "Volt, elektrik geriliminin SI türetilmiş birimidir.",
        historySummary:
          "Elektrik potansiyel farkını standartlaştıran volt birimi, modern elektrik ve elektronik sistemlerin temel gösterimlerinden biridir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI gerilim birimi",
        commonUses: "Elektronik devreler, güç kaynakları ve şebeke gerilimleri",
      },
    },
  },
  {
    id: "kilovolt",
    category: "elektrik",
    symbol: "kV",
    siFactor: 1000,
    tr: { name: "Kilovolt", slug: "kilovolt" },
    en: { name: "Kilovolt", slug: "kilovolt" },
    de: { name: "Kilovolt", slug: "kilovolt" },
    enConversionSlug: "kilovolts",
    description: {
      tr: {
        shortDescription: "Kilovolt, 1000 volt’a eşit gerilim birimidir. Yüksek gerilim sistemlerinde kullanılır.",
        historySummary:
          "Büyük iletim ve dağıtım seviyelerinin daha kısa ifade edilmesi için kilovolt yaygın teknik kullanıma girmiştir.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, kat birim)",
        siEquivalent: "1 kV = 1000 V",
        commonUses: "Şebeke, trafo ve yüksek gerilim ekipmanları",
      },
    },
  },
  {
    id: "amper",
    category: "elektrik",
    symbol: "A",
    siFactor: 1,
    tr: { name: "Amper", slug: "amper" },
    en: { name: "Ampere", slug: "ampere" },
    de: { name: "Ampere", slug: "ampere" },
    enConversionSlug: "amperes",
    description: {
      tr: {
        shortDescription: "Amper, elektrik akımının SI temel büyüklüklerinden biri olan standart birimidir.",
        historySummary:
          "Amper birimi, elektrik yükünün akış hızını ölçmek için geliştirilen uluslararası standardın parçasıdır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI)",
        siEquivalent: "Temel SI akım birimi",
        commonUses: "Akım ölçümleri, koruma elemanları ve cihaz etiketleri",
      },
    },
  },
  {
    id: "miliamper",
    category: "elektrik",
    symbol: "mA",
    siFactor: 0.001,
    tr: { name: "Miliamper", slug: "miliamper" },
    en: { name: "Milliampere", slug: "milliampere" },
    de: { name: "Milliampere", slug: "milliampere" },
    enConversionSlug: "milliamperes",
    description: {
      tr: {
        shortDescription: "Miliamper, amperin binde birine eşit küçük akım birimidir.",
        historySummary:
          "Elektronik ve ölçüm cihazlarında düşük akımların rahat okunabilmesi için miliamper gösterimi yaygınlaşmıştır.",
        measurementSystem: "Uluslararası Birim Sistemi (SI, alt birim)",
        siEquivalent: "1 mA = 0,001 A",
        commonUses: "Elektronik devreler, sensörler ve düşük akım testleri",
      },
    },
  },

  // ---- elektrik_direnc / gerilim / akım / kapasitans / enduktans / yük / manyetik (engine-only) ----
  { id: "ohm", category: "elektrik_direnc", symbol: "Ω", siFactor: 1 },
  { id: "kiloohm", category: "elektrik_direnc", symbol: "kΩ", siFactor: 1000 },
  { id: "megaohm", category: "elektrik_direnc", symbol: "MΩ", siFactor: 1_000_000 },
  { id: "gerilim-volt", category: "elektrik_gerilim", symbol: "V", siFactor: 1 },
  { id: "gerilim-kilovolt", category: "elektrik_gerilim", symbol: "kV", siFactor: 1000 },
  { id: "milivolt", category: "elektrik_gerilim", symbol: "mV", siFactor: 0.001 },
  { id: "akim-amper", category: "elektrik_akim", symbol: "A", siFactor: 1 },
  { id: "akim-miliamper", category: "elektrik_akim", symbol: "mA", siFactor: 0.001 },
  { id: "kiloamper", category: "elektrik_akim", symbol: "kA", siFactor: 1000 },
  { id: "farad", category: "kapasitans", symbol: "F", siFactor: 1 },
  { id: "milifarad", category: "kapasitans", symbol: "mF", siFactor: 0.001 },
  { id: "mikrofarad", category: "kapasitans", symbol: "µF", siFactor: 0.000001 },
  { id: "nanofarad", category: "kapasitans", symbol: "nF", siFactor: 1e-9 },
  { id: "pikofarad", category: "kapasitans", symbol: "pF", siFactor: 1e-12 },
  { id: "henry", category: "enduktans", symbol: "H", siFactor: 1 },
  { id: "milihenry", category: "enduktans", symbol: "mH", siFactor: 0.001 },
  { id: "mikrohenry", category: "enduktans", symbol: "µH", siFactor: 0.000001 },
  { id: "coulomb", category: "elektrik_yuk", symbol: "C", siFactor: 1 },
  { id: "milicoulomb", category: "elektrik_yuk", symbol: "mC", siFactor: 0.001 },
  { id: "mikrocoulomb", category: "elektrik_yuk", symbol: "µC", siFactor: 0.000001 },
  { id: "nanocoulomb", category: "elektrik_yuk", symbol: "nC", siFactor: 1e-9 },
  { id: "a-m", category: "manyetik_alan", symbol: "A/m", siFactor: 1 },
  { id: "ka-m", category: "manyetik_alan", symbol: "kA/m", siFactor: 1000 },
  { id: "oersted", category: "manyetik_alan", symbol: "Oe", siFactor: 79.5775 },
  { id: "weber", category: "manyetik_aki", symbol: "Wb", siFactor: 1 },
  { id: "miliweber", category: "manyetik_aki", symbol: "mWb", siFactor: 0.001 },
  { id: "mikroweber", category: "manyetik_aki", symbol: "µWb", siFactor: 0.000001 },
  { id: "nanoweber", category: "manyetik_aki", symbol: "nWb", siFactor: 1e-9 },
  { id: "weber-alias", category: "manyetik_aki", symbol: "weber", siFactor: 1 },
];

export function findUnit(category: string, symbol: string) {
  return unitRegistry.find(
    (unit) => unit.category === category && unit.symbol === symbol
  );
}

export function getUnitsForCategory(category: string) {
  return unitRegistry.filter((unit) => unit.category === category);
}

export function getUnitCategories() {
  return Array.from(new Set(unitRegistry.map((unit) => unit.category)));
}
