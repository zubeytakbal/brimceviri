type ArabicUnitNameInput = {
  englishName: string;
  slug?: string;
  symbol?: string;
};

const arabicCategoryLabels: Record<string, string> = {
  alan: "المساحة",
  hacim: "الحجم",
  uzunluk: "الطول",
  kutle: "الكتلة",
  sicaklik: "الحرارة",
  zaman: "الزمن",
  hiz: "السرعة",
  basinc: "الضغط",
  enerji: "الطاقة والقدرة",
  debi: "معدل التدفق",
  elektrik: "الكهرباء",
  yogunluk: "الكثافة",
  kuvvet: "القوة",
  tork: "العزم",
  momentum: "الزخم",
  viskozite_dinamik: "اللزوجة الديناميكية",
  veri: "تخزين البيانات",
  elektrik_direnc: "المقاومة الكهربائية",
  kapasitans: "السعة الكهربائية",
  enduktans: "الحث",
  elektrik_yuk: "الشحنة الكهربائية",
  altin_ayar: "عيار الذهب",
  gumus_ayar: "عيار الفضة",
};

const baseUnitByCategory: Record<string, string> = {
  alan: "المتر المربع",
  hacim: "المتر المكعب",
  uzunluk: "المتر",
  kutle: "الكيلوغرام",
  sicaklik: "الكلفن أو الدرجة حسب السياق",
  zaman: "الثانية",
  hiz: "المتر لكل ثانية",
  basinc: "الباسكال",
  enerji: "الجول أو الواط",
  debi: "المتر المكعب لكل ثانية أو لكل ساعة",
  elektrik: "الفولت أو الأمبير",
  yogunluk: "الكيلوغرام لكل متر مكعب",
  kuvvet: "النيوتن",
  tork: "نيوتن متر",
  momentum: "كيلوغرام متر لكل ثانية",
  viskozite_dinamik: "باسكال ثانية",
  veri: "البايت",
  elektrik_direnc: "الأوم",
  kapasitans: "الفاراد",
  enduktans: "الهنري",
  elektrik_yuk: "الكولوم",
  altin_ayar: "24 قيراط",
  gumus_ayar: "999 فضة",
};

const categoryUsageByCategory: Record<string, string> = {
  alan: "المخططات، الأراضي، المساحات المعمارية والمقاطع الهندسية",
  hacim: "الخزانات، السوائل، التخزين والحسابات المخبرية",
  uzunluk: "الأبعاد، المسافات، البناء والقياسات اليومية",
  kutle: "الوزن التجاري، المختبرات، الشحن والتصنيع",
  sicaklik: "الطقس، العمليات الحرارية، المختبرات والتبريد",
  zaman: "الجداول الزمنية، الحسابات العلمية والمدة التشغيلية",
  hiz: "النقل، الجريان، الأداء والقياس الحركي",
  basinc: "الأنظمة الميكانيكية، الموائع، الإطارات والتطبيقات الصناعية",
  enerji: "الحرارة، الاستهلاك الكهربائي والقدرة العملية",
  debi: "المضخات، الأنابيب، أنظمة المياه والتهوية",
  elektrik: "الدوائر، التغذية، القياس والأجهزة",
  yogunluk: "المواد، الخلطات، الموائع والخصائص الفيزيائية",
  kuvvet: "الميكانيكا، التحميل، الرفع والاختبارات",
  tork: "المحركات، الربط الميكانيكي والعناصر الدوارة",
  momentum: "الحركة، التصادمات والتحليل الميكانيكي",
  viskozite_dinamik:
    "الجريان، الزيوت، السوائل الصناعية والتحليل المختبري",
  veri: "الملفات، السعات الرقمية، الشبكات والتخزين",
  elektrik_direnc: "الدوائر والمكونات والقياسات الكهربائية",
  kapasitans: "المكثفات والإلكترونيات والدوائر",
  enduktans: "الملفات والدوائر والتحكم في الطاقة",
  elektrik_yuk: "الفيزياء الكهربائية والأساسيات التعليمية",
  altin_ayar: "المجوهرات، النقاوة، التقييم والمقارنة",
  gumus_ayar: "المجوهرات، أواني الفضة، النقاوة والمقارنة",
};

const exactUnitNamesBySlug: Record<string, string> = {
  meter: "المتر",
  kilometer: "الكيلومتر",
  centimeter: "السنتيمتر",
  millimeter: "المليمتر",
  micrometer: "الميكرومتر",
  nanometer: "النانومتر",
  foot: "القدم",
  inch: "البوصة",
  yard: "الياردة",
  mile: "الميل",
  "nautical-mile": "الميل البحري",
  arshin: "الأرشين",
  endaze: "الإندازه",
  "byzantine-foot": "القدم البيزنطية",
  "byzantine-fathom": "الباع البيزنطي",
  cig: "الچيغ",
  "square-meter": "المتر المربع",
  "square-centimeter": "السنتيمتر المربع",
  "square-millimeter": "المليمتر المربع",
  "square-kilometer": "الكيلومتر المربع",
  hectare: "الهكتار",
  acre: "الأكر",
  "square-foot": "القدم المربعة",
  "square-inch": "البوصة المربعة",
  "square-yard": "الياردة المربعة",
  liter: "اللتر",
  milliliter: "الملليلتر",
  "cubic-meter": "المتر المكعب",
  "cubic-centimeter": "السنتيمتر المكعب",
  "cubic-foot": "القدم المكعبة",
  "cubic-inch": "البوصة المكعبة",
  gallon: "الجالون",
  "fluid-ounce": "الأونصة السائلة",
  kilogram: "الكيلوغرام",
  gram: "الغرام",
  milligram: "المليغرام",
  tonne: "الطن المتري",
  ounce: "الأونصة",
  pound: "الرطل",
  stone: "الستون",
  pascal: "الباسكال",
  kilopascal: "الكيلوباسكال",
  megapascal: "الميغاباسكال",
  bar: "البار",
  psi: "رطل لكل بوصة مربعة",
  atmosphere: "الضغط الجوي",
  mmhg: "مليمتر زئبق",
  "kilogram-force-per-square-centimeter":
    "كيلوغرام قوة لكل سنتيمتر مربع",
  celsius: "درجة مئوية",
  fahrenheit: "فهرنهايت",
  kelvin: "كلفن",
  second: "الثانية",
  minute: "الدقيقة",
  hour: "الساعة",
  day: "اليوم",
  "meter-per-second": "متر لكل ثانية",
  "kilometer-per-hour": "كيلومتر لكل ساعة",
  "mile-per-hour": "ميل لكل ساعة",
  knot: "العقدة",
  joule: "الجول",
  kilojoule: "الكيلوجول",
  calorie: "السعرة الحرارية",
  kilocalorie: "الكيلو سعرة حرارية",
  "watt-hour": "واط ساعة",
  "kilowatt-hour": "كيلوواط ساعة",
  watt: "الواط",
  kilowatt: "الكيلوواط",
  horsepower: "حصان ميكانيكي",
  "cubic-meter-per-hour": "متر مكعب لكل ساعة",
  "liter-per-minute": "لتر لكل دقيقة",
  "liter-per-second": "لتر لكل ثانية",
  "gallon-per-minute": "جالون لكل دقيقة",
  volt: "الفولت",
  kilovolt: "الكيلوفولت",
  ampere: "الأمبير",
  milliampere: "الميلي أمبير",
  ohm: "الأوم",
  kiloohm: "الكيلو أوم",
  megaohm: "الميغا أوم",
  farad: "الفاراد",
  microfarad: "الميكروفاراد",
  henry: "الهنري",
  coulomb: "الكولوم",
  "kilogram-per-cubic-meter": "كيلوغرام لكل متر مكعب",
  "gram-per-cubic-centimeter": "غرام لكل سنتيمتر مكعب",
  "pound-per-cubic-foot": "رطل لكل قدم مكعبة",
  newton: "النيوتن",
  kilonewton: "الكيلو نيوتن",
  "pound-force": "رطل قوة",
  "kilogram-force": "كيلوغرام قوة",
  "newton-meter": "نيوتن متر",
  "pound-foot": "رطل قدم",
  "kilogram-meter-per-second":
    "كيلوغرام متر لكل ثانية",
  "newton-second": "نيوتن ثانية",
  "pascal-second": "باسكال ثانية",
  poise: "بواز",
  centipoise: "سنتيبواز",
  byte: "بايت",
  kilobyte: "كيلوبايت",
  megabyte: "ميغابايت",
  gigabyte: "غيغابايت",
  terabyte: "تيرابايت",
  kibibyte: "كيبيبايت",
  mebibyte: "ميبيبايت",
  gibibyte: "جيبيبايت",
  tebibyte: "تيبيبايت",
  "24-karat": "24 قيراط",
  "22-karat": "22 قيراط",
  "18-karat": "18 قيراط",
  "14-karat": "14 قيراط",
  dirham: "الدرهم",
  "byzantine-litra": "اللترة البيزنطية",
  "byzantine-ounce": "الأونصة البيزنطية",
};

const exactEnglishNames: Record<string, string> = {
  Meter: "المتر",
  Kilometer: "الكيلومتر",
  Centimeter: "السنتيمتر",
  Millimeter: "المليمتر",
  Micrometer: "الميكرومتر",
  Nanometer: "النانومتر",
  Foot: "القدم",
  Inch: "البوصة",
  Yard: "الياردة",
  Mile: "الميل",
  "Nautical mile": "الميل البحري",
  "Square Meter": "المتر المربع",
  "Square Centimeter": "السنتيمتر المربع",
  "Square Millimeter": "المليمتر المربع",
  "Square Kilometer": "الكيلومتر المربع",
  Hectare: "الهكتار",
  Acre: "الأكر",
  "Square Foot": "القدم المربعة",
  "Square Inch": "البوصة المربعة",
  "Square Yard": "الياردة المربعة",
  Liter: "اللتر",
  Milliliter: "الملليلتر",
  "Cubic Meter": "المتر المكعب",
  "Cubic Centimeter": "السنتيمتر المكعب",
  "Cubic Foot": "القدم المكعبة",
  "Cubic Inch": "البوصة المكعبة",
  Gallon: "الجالون",
  "Fluid Ounce": "الأونصة السائلة",
  Kilogram: "الكيلوغرام",
  Gram: "الغرام",
  Milligram: "المليغرام",
  Tonne: "الطن المتري",
  Ounce: "الأونصة",
  Pound: "الرطل",
  Stone: "الستون",
  Pascal: "الباسكال",
  Kilopascal: "الكيلوباسكال",
  Megapascal: "الميغاباسكال",
  Bar: "البار",
  Atmosphere: "الضغط الجوي",
  Celsius: "درجة مئوية",
  Fahrenheit: "فهرنهايت",
  Kelvin: "كلفن",
  Second: "الثانية",
  Minute: "الدقيقة",
  Hour: "الساعة",
  Day: "اليوم",
  Joule: "الجول",
  Kilojoule: "الكيلوجول",
  Calorie: "السعرة الحرارية",
  Kilocalorie: "الكيلو سعرة حرارية",
  Watt: "الواط",
  Kilowatt: "الكيلوواط",
  Horsepower: "حصان ميكانيكي",
  Volt: "الفولت",
  Kilovolt: "الكيلوفولت",
  Ampere: "الأمبير",
  Milliampere: "الميلي أمبير",
  Ohm: "الأوم",
  Kiloohm: "الكيلو أوم",
  Megaohm: "الميغا أوم",
  Farad: "الفاراد",
  Microfarad: "الميكروفاراد",
  Henry: "الهنري",
  Coulomb: "الكولوم",
  Byte: "بايت",
  Kilobyte: "كيلوبايت",
  Megabyte: "ميغابايت",
  Gigabyte: "غيغابايت",
  Terabyte: "تيرابايت",
};

const exactMeasurementSystems: Record<string, string> = {
  "International System of Units (SI)":
    "النظام الدولي للوحدات (SI)",
  "International System of Units (SI, multiple unit)":
    "النظام الدولي للوحدات (SI، وحدة مضاعفة)",
  "International System of Units (SI, subunit)":
    "النظام الدولي للوحدات (SI، وحدة جزئية)",
  "Imperial and US customary systems":
    "النظام الإمبراطوري ونظام الولايات المتحدة العرفي",
  "Metric system, accepted with SI":
    "النظام المتري، معتمد مع النظام الدولي",
};

function translateCompositeEnglishName(
  englishName: string
): string | null {
  if (englishName.startsWith("Square ")) {
    const baseName = englishName.replace("Square ", "");
    return `${getArabicUnitName({
      englishName: baseName,
    })} المربع`;
  }

  if (englishName.startsWith("Cubic ")) {
    const baseName = englishName.replace("Cubic ", "");
    return `${getArabicUnitName({
      englishName: baseName,
    })} المكعب`;
  }

  if (englishName.includes(" per ")) {
    const [left, right] = englishName.split(" per ");

    if (left && right) {
      return `${getArabicUnitName({
        englishName: left,
      })} لكل ${getArabicUnitName({
        englishName: right,
      })}`;
    }
  }

  return null;
}

export function getArabicCategoryLabel(category: string) {
  return arabicCategoryLabels[category] ?? "القياسات";
}

export function getArabicCategoryBaseUnit(category: string) {
  return baseUnitByCategory[category] ?? "الوحدة المرجعية";
}

export function getArabicCategoryUsage(category: string) {
  return (
    categoryUsageByCategory[category] ??
    "الاستخدامات العملية والتعليمية والهندسية"
  );
}

export function getArabicMeasurementSystem(system: string) {
  return exactMeasurementSystems[system] ?? system;
}

export function getArabicUnitName({
  englishName,
  slug,
  symbol,
}: ArabicUnitNameInput): string {
  if (slug && exactUnitNamesBySlug[slug]) {
    return exactUnitNamesBySlug[slug];
  }

  if (exactEnglishNames[englishName]) {
    return exactEnglishNames[englishName];
  }

  const compositeName =
    translateCompositeEnglishName(englishName);

  if (compositeName) {
    return compositeName;
  }

  if (symbol === "psi") {
    return "رطل لكل بوصة مربعة";
  }

  return englishName;
}

export function buildArabicCategoryFacts(
  category: string,
  unitCount: number,
  conversionCount: number
) {
  return [
    {
      label: "الفئة الفيزيائية",
      value: getArabicCategoryLabel(category),
    },
    {
      label: "الوحدة المرجعية",
      value: getArabicCategoryBaseUnit(category),
    },
    {
      label: "أدلة الوحدات",
      value: `${unitCount}`,
    },
    {
      label: "صفحات التحويل",
      value: `${conversionCount}`,
    },
    {
      label: "أشيع الاستخدامات",
      value: getArabicCategoryUsage(category),
    },
  ];
}

export function buildArabicConversionFormula(
  fromUnit: string,
  toUnit: string,
  factor: number,
  category: string
) {
  if (category === "sicaklik") {
    if (fromUnit === "C" && toUnit === "F") {
      return "القيمة بـ °F = (القيمة بـ °C × 9/5) + 32";
    }

    if (fromUnit === "F" && toUnit === "C") {
      return "القيمة بـ °C = (القيمة بـ °F − 32) × 5/9";
    }

    if (fromUnit === "C" && toUnit === "K") {
      return "القيمة بـ K = القيمة بـ °C + 273.15";
    }

    if (fromUnit === "K" && toUnit === "C") {
      return "القيمة بـ °C = القيمة بـ K − 273.15";
    }
  }

  if (factor >= 1) {
    return `القيمة بـ ${toUnit} = القيمة بـ ${fromUnit} × ${new Intl.NumberFormat(
      "ar",
      {
        maximumSignificantDigits: 12,
      }
    ).format(Number(factor.toPrecision(12)))}`;
  }

  return `القيمة بـ ${toUnit} = القيمة بـ ${fromUnit} ÷ ${new Intl.NumberFormat(
    "ar",
    {
      maximumSignificantDigits: 12,
    }
  ).format(Number((1 / factor).toPrecision(12)))}`;
}
