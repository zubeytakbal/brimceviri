// Almanca dönüşüm sayfalarının başlık, açıklama, giriş cümlesi, ek SSS ve
// tablo değerleri. Genel şablon tüm sayfalara uygulanır; Search Console'da en
// çok gösterim alan sayfalar için (Ekim 2026 dışa aktarımı) gerçek aramalara
// göre yazılmış özel içerik GERMAN_SEO_OVERRIDES'ta durur.
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

// Sitenin iç sembolleri (F, C, knot, ton) Almancada yazıldığı gibi gösterilir.
const GERMAN_SYMBOLS: Record<string, string> = {
  C: "°C",
  F: "°F",
  Re: "°Ré",
  knot: "kn",
  ton: "t",
  in: "Zoll",
  // Sitede "hp" metrik beygir (735,5 W), "HP" mekanik beygir (745,7 W).
  hp: "PS",
  HP: "hp (mech.)",
};

export function germanSymbol(unit: string) {
  return GERMAN_SYMBOLS[unit] ?? unit;
}

export function formatGermanNumber(value: number) {
  if (!Number.isFinite(value)) return "—";
  if (value !== 0 && (Math.abs(value) >= 1e15 || Math.abs(value) < 1e-6)) {
    return value.toExponential(4).replace(".", ",");
  }
  return Number(value.toPrecision(10)).toLocaleString("de-DE", { maximumFractionDigits: 6 });
}

/** Arama sonucunda okunur kalsın: 1'den büyükse 2 ondalık (273,15 K; 9,84 Zoll), küçükse 4 anlamlı basamak. */
function readableRound(value: number) {
  if (value === 0 || !Number.isFinite(value)) return value;
  if (Math.abs(value) >= 1e6) return Number(value.toPrecision(6));
  return Math.abs(value) >= 1 ? Math.round(value * 100) / 100 : Number(value.toPrecision(4));
}

/** Tabloda ve açıklamada gösterilecek "x sembol = y sembol" ifadesi. */
export function germanPair(page: PageLike, value: number, readable = false) {
  const raw = convert(page.category, value, page.fromUnit, page.toUnit);
  const result = readable ? readableRound(raw) : raw;
  return `${formatGermanNumber(value)} ${germanSymbol(page.fromUnit)} = ${formatGermanNumber(result)} ${germanSymbol(page.toUnit)}`;
}

type Override = {
  /** seoTitle'a sırayla verilecek adaylar (uzundan kısaya). */
  titles?: string[];
  description?: string;
  /** Hero'daki giriş cümlesi; aramadaki soruya doğrudan cevap verir. */
  intro?: string;
  faq?: FaqItem[];
  exampleValues?: number[];
};

const TEMPERATURE_FORMULA: Record<string, string> = {
  "fahrenheit-celsius": "°C = (°F − 32) × 5/9",
  "celsius-fahrenheit": "°F = °C × 9/5 + 32",
  "kelvin-celsius": "°C = K − 273,15",
  "celsius-kelvin": "K = °C + 273,15",
};

export const GERMAN_SEO_OVERRIDES: Record<string, Override> = {
  "kubikmeter-liter": {
    titles: ["Kubikmeter in Liter (m³ in l) umrechnen – mit Tabelle", "Kubikmeter in Liter (m³ in l) umrechnen"],
    description:
      "1 m³ = 1.000 Liter. Kubikmeter in Liter umrechnen: 0,5 m³ = 500 l, 2 m³ = 2.000 l, 10 m³ = 10.000 l. Rechner und Tabelle für Wasser, Heizöl, Pool und Gas.",
    intro: "1 Kubikmeter (m³) sind genau 1.000 Liter – ein Würfel mit 1 m Kantenlänge.",
    exampleValues: [0.001, 0.01, 0.1, 0.25, 0.5, 1, 1.5, 2, 3, 5, 10, 20, 50],
    faq: [
      {
        question: "Wie viele Liter Wasser passen in einen Kubikmeter?",
        answer: "In einen Kubikmeter passen 1.000 Liter Wasser. Das wiegt bei 4 °C rund 1.000 kg, also etwa eine Tonne.",
      },
    ],
  },
  "liter-kubikmeter": {
    titles: ["Liter in Kubikmeter (l in m³) umrechnen – mit Tabelle", "Liter in Kubikmeter (l in m³) umrechnen"],
    description:
      "1.000 Liter = 1 m³. Liter in Kubikmeter umrechnen: 100 l = 0,1 m³, 500 l = 0,5 m³, 10.000 l = 10 m³. Rechner mit Formel (Liter ÷ 1.000) und Tabelle.",
    intro: "Liter durch 1.000 teilen: 1.000 Liter sind 1 Kubikmeter (m³).",
    exampleValues: [1, 10, 50, 100, 200, 250, 500, 750, 1000, 2000, 5000, 10000],
  },
  "fuss-meter": {
    titles: ["Fuß in Meter umrechnen (ft in m) – Tabelle bis 1.000 Fuß", "Fuß in Meter umrechnen (ft in m)"],
    description:
      "1 Fuß = 0,3048 Meter. Fuß in Meter umrechnen: 6 ft = 1,83 m, 10 ft = 3,05 m, 100 ft = 30,48 m. Rechner für Körpergröße, Flughöhe und Bootslänge.",
    intro: "1 Fuß (ft) ist genau 0,3048 Meter, also 30,48 cm.",
    exampleValues: [1, 2, 3, 5, 6, 10, 20, 30, 50, 100, 500, 1000, 10000],
    faq: [
      {
        question: "Wie viel Meter sind 100 Fuß?",
        answer: "100 Fuß sind 30,48 Meter.",
      },
      {
        question: "Wie groß ist man mit 6 Fuß?",
        answer: "6 Fuß sind 1,83 Meter. Mit Zoll: 6 Fuß 2 Zoll sind 1,88 m.",
      },
    ],
  },
  "tonne-kilogramm": {
    titles: ["Tonne in Kilogramm (t in kg) umrechnen – mit Tabelle", "Tonne in Kilogramm (t in kg) umrechnen"],
    description:
      "1 Tonne = 1.000 kg. Tonnen in Kilogramm umrechnen: 0,5 t = 500 kg, 2,5 t = 2.500 kg, 3,5 t = 3.500 kg. Rechner mit Tabelle, z. B. für Anhänger und Führerschein.",
    intro: "1 Tonne (t) sind 1.000 Kilogramm.",
    exampleValues: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3.5, 7.5, 10, 40],
  },
  "hektar-quadratmeter": {
    titles: ["Hektar in Quadratmeter (ha in m²/qm) umrechnen", "Hektar in Quadratmeter (ha in m²)"],
    description:
      "1 Hektar = 10.000 m² (qm). Hektar in Quadratmeter umrechnen: 0,5 ha = 5.000 m², 2 ha = 20.000 m². Mit Vergleich zum Fußballfeld und Tabelle.",
    intro: "1 Hektar (ha) sind 10.000 Quadratmeter – eine Fläche von 100 m × 100 m.",
    exampleValues: [0.01, 0.1, 0.25, 0.5, 1, 1.5, 2, 5, 10, 50, 100],
    faq: [
      {
        question: "Wie groß ist 1 Hektar?",
        answer: "1 Hektar ist ein Quadrat mit 100 m Seitenlänge, also 10.000 m². Ein Fußballfeld (105 × 68 m) hat 7.140 m², ein Hektar ist damit etwa 1,4 Fußballfelder.",
      },
    ],
  },
  "knoten-kilometer-pro-stunde": {
    titles: ["Knoten in km/h umrechnen (kn in kmh) – Tabelle", "Knoten in km/h umrechnen (kn in kmh)"],
    description:
      "1 Knoten = 1,852 km/h. Knoten in km/h umrechnen: 10 kn = 18,5 km/h, 20 kn = 37 km/h, 30 kn = 55,6 km/h. Tabelle für Wind, Segeln und Schifffahrt.",
    intro: "1 Knoten (kn) ist eine Seemeile pro Stunde, also genau 1,852 km/h.",
    exampleValues: [1, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 100],
    faq: [
      {
        question: "Wie schnell sind 30 Knoten in km/h?",
        answer: "30 Knoten sind 55,56 km/h.",
      },
      {
        question: "Warum misst man auf See in Knoten?",
        answer: "Ein Knoten ist eine Seemeile (1.852 m) pro Stunde. Eine Seemeile entspricht einer Bogenminute am Meridian, deshalb lassen sich Strecken auf Seekarten direkt ablesen.",
      },
    ],
  },
  "gramm-milligramm": {
    titles: ["Gramm in Milligramm (g in mg) umrechnen – mit Tabelle", "Gramm in Milligramm (g in mg) umrechnen"],
    description:
      "1 g = 1.000 mg. Gramm in Milligramm umrechnen: 0,5 g = 500 mg, 0,1 g = 100 mg, 0,005 g = 5 mg. Rechner mit Tabelle für Medikamente und Nahrungsergänzung.",
    intro: "Gramm mal 1.000: 1 Gramm (g) sind 1.000 Milligramm (mg).",
    exampleValues: [0.001, 0.005, 0.01, 0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10],
  },
  "milligramm-gramm": {
    titles: ["Milligramm in Gramm (mg in g) umrechnen – mit Tabelle", "Milligramm in Gramm (mg in g) umrechnen"],
    description:
      "1.000 mg = 1 g. Milligramm in Gramm umrechnen: 500 mg = 0,5 g, 100 mg = 0,1 g, 5 mg = 0,005 g. Rechner mit Tabelle für Medikamente und Nahrungsergänzung.",
    intro: "Milligramm durch 1.000 teilen: 1.000 mg sind 1 Gramm.",
    exampleValues: [1, 5, 10, 50, 100, 200, 250, 400, 500, 800, 1000, 5000],
  },
  "gallone-liter": {
    titles: ["Gallone in Liter umrechnen (gal in l) – US und UK", "Gallone in Liter umrechnen (gal in l)"],
    description:
      "1 US-Gallone = 3,785 Liter, 1 britische Gallone = 4,546 Liter. Gallonen in Liter umrechnen mit Rechner und Tabelle: 5 gal = 18,9 l, 10 gal = 37,9 l.",
    intro: "1 US-Gallone (gal) sind 3,785 Liter. Achtung: Die britische (imperiale) Gallone ist mit 4,546 Litern größer.",
    exampleValues: [0.5, 1, 2, 3, 5, 10, 15, 20, 50, 100],
    faq: [
      {
        question: "Ist eine Gallone in den USA und in Großbritannien gleich groß?",
        answer: "Nein. Die US-Gallone hat 3,785 Liter, die britische (imperiale) Gallone 4,546 Liter. Dieser Rechner verwendet die US-Gallone, die z. B. bei Benzinpreisen in den USA gilt.",
      },
    ],
  },
  "milliliter-liter": {
    titles: ["Milliliter in Liter (ml in l) umrechnen – mit Tabelle", "Milliliter in Liter (ml in l) umrechnen"],
    description:
      "1.000 ml = 1 Liter. Milliliter in Liter umrechnen: 250 ml = 0,25 l, 500 ml = 0,5 l, 750 ml = 0,75 l. Rechner mit Tabelle für Küche und Getränke.",
    intro: "Milliliter durch 1.000 teilen: 1.000 ml sind 1 Liter.",
    exampleValues: [1, 10, 100, 200, 250, 330, 500, 750, 1000, 1500, 2000, 5000],
  },
  "liter-milliliter": {
    titles: ["Liter in Milliliter (l in ml) umrechnen – 1 Liter wie viel ml?", "Liter in Milliliter (l in ml) umrechnen"],
    description:
      "1 Liter = 1.000 ml. Liter in Milliliter umrechnen: 0,5 l = 500 ml, 0,25 l = 250 ml, 1,5 l = 1.500 ml. Rechner mit Tabelle für Rezepte und Getränke.",
    intro: "Ein Liter hat 1.000 Milliliter (ml).",
    exampleValues: [0.01, 0.1, 0.2, 0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 5],
    faq: [
      {
        question: "Wie viel ml hat ein Liter?",
        answer: "Ein Liter hat genau 1.000 Milliliter.",
      },
    ],
  },
  "meile-kilometer": {
    titles: ["Meilen in Kilometer umrechnen (mi in km) – Tabelle", "Meilen in Kilometer (mi in km)"],
    description:
      "1 Meile = 1,609 km. Meilen in Kilometer umrechnen: 5 mi = 8 km, 26,2 mi (Marathon) = 42,2 km, 100 mi = 161 km. Mit Unterschied zur Seemeile.",
    intro: "1 Meile (mi) sind 1,609344 Kilometer.",
    exampleValues: [1, 2, 3, 5, 10, 13.1, 20, 26.2, 50, 60, 70, 100, 500],
    faq: [
      {
        question: "Was ist der Unterschied zwischen Meile und Seemeile?",
        answer: "Eine (Land-)Meile hat 1,609 km, eine Seemeile 1,852 km. In der Luft- und Schifffahrt wird die Seemeile verwendet.",
      },
    ],
  },
  "psi-bar": {
    titles: ["PSI in Bar umrechnen – Reifendruck-Tabelle", "PSI in Bar umrechnen"],
    description:
      "1 psi = 0,0689 bar. PSI in Bar umrechnen: 30 psi = 2,07 bar, 32 psi = 2,21 bar, 35 psi = 2,41 bar. Tabelle für Reifendruck, Kompressor und Fahrrad.",
    intro: "1 psi sind 0,0689 bar – 14,5 psi ergeben rund 1 bar.",
    exampleValues: [1, 10, 14.5, 20, 25, 28, 30, 32, 33, 35, 36, 40, 50, 60, 100, 150],
    faq: [
      {
        question: "Wie viel bar sind 32 psi Reifendruck?",
        answer: "32 psi sind 2,21 bar. Der richtige Reifendruck steht meist in der Fahrertür oder im Tankdeckel.",
      },
    ],
  },
  "fahrenheit-celsius": {
    titles: ["Fahrenheit in Celsius umrechnen: Formel & Tabelle (°F in °C)", "Fahrenheit in Celsius: Formel & Tabelle"],
    description:
      "Formel: °C = (°F − 32) × 5/9. 100 °F = 37,8 °C, 50 °F = 10 °C, 0 °F = −17,8 °C. Rechner und Tabelle für Wetter, Fieber und Backofen.",
    intro: "Von Fahrenheit 32 abziehen und mit 5/9 malnehmen: °C = (°F − 32) × 5/9.",
    exampleValues: [-40, -10, 0, 10, 20, 32, 40, 50, 59, 68, 77, 86, 95, 98.6, 100, 104, 212, 350, 400, 450],
    faq: [
      {
        question: "Wie rechnet man Fahrenheit im Kopf in Celsius um?",
        answer: "Faustregel: 30 abziehen und halbieren. Aus 80 °F werden so etwa 25 °C (genau 26,7 °C). Für Fieber oder Backofen besser den Rechner nutzen.",
      },
      {
        question: "Wie viel Grad Celsius sind 350 °F im Backofen?",
        answer: "350 °F sind 176,7 °C, im Rezept also etwa 175 °C Ober-/Unterhitze.",
      },
      {
        question: "Ab wie viel Fahrenheit hat man Fieber?",
        answer: "Ab etwa 100,4 °F (38 °C) spricht man von Fieber. Normal sind rund 98,6 °F (37 °C).",
      },
    ],
  },
  "celsius-fahrenheit": {
    titles: ["Celsius in Fahrenheit umrechnen: Formel & Tabelle (°C in °F)", "Celsius in Fahrenheit: Formel & Tabelle"],
    description:
      "Formel: °F = °C × 9/5 + 32. 0 °C = 32 °F, 20 °C = 68 °F, 37 °C = 98,6 °F, 180 °C = 356 °F. Rechner und Tabelle für Wetter, Fieber und Backofen.",
    intro: "Celsius mit 9/5 (1,8) malnehmen und 32 addieren: °F = °C × 1,8 + 32.",
    exampleValues: [-40, -20, -10, 0, 5, 10, 15, 20, 25, 30, 35, 37, 38, 40, 100, 180, 200, 220],
    faq: [
      {
        question: "Wie rechnet man Celsius im Kopf in Fahrenheit um?",
        answer: "Faustregel: verdoppeln und 30 addieren. Aus 20 °C werden so etwa 70 °F (genau 68 °F).",
      },
    ],
  },
  "kelvin-celsius": {
    titles: ["Kelvin in Celsius umrechnen: Formel & Tabelle (K in °C)", "Kelvin in Celsius: Formel & Tabelle"],
    description:
      "Formel: °C = K − 273,15. 0 K = −273,15 °C, 273,15 K = 0 °C, 300 K = 26,85 °C. Rechner mit Tabelle und Erklärung des absoluten Nullpunkts.",
    intro: "Von Kelvin 273,15 abziehen: °C = K − 273,15.",
    exampleValues: [0, 100, 200, 233.15, 250, 273.15, 293.15, 300, 310.15, 373.15, 500, 1000],
  },
  "stunde-sekunde": {
    titles: ["Stunden in Sekunden umrechnen (h in s) – Tabelle", "Stunden in Sekunden (h in s)"],
    description:
      "Eine Stunde hat 3.600 Sekunden (60 × 60). Stunden in Sekunden umrechnen: 2 h = 7.200 s, 24 h = 86.400 s. Rechner mit Tabelle.",
    intro: "Eine Stunde hat 60 Minuten mit je 60 Sekunden, also 3.600 Sekunden.",
    exampleValues: [0.25, 0.5, 1, 1.5, 2, 3, 5, 8, 10, 12, 24, 48],
    faq: [
      {
        question: "Wie viele Sekunden hat eine Stunde?",
        answer: "Eine Stunde hat 3.600 Sekunden, ein Tag 86.400 Sekunden.",
      },
    ],
  },
  "lichtgeschwindigkeit-meter-pro-sekunde": {
    titles: ["Lichtgeschwindigkeit in m/s und km/h umrechnen", "Lichtgeschwindigkeit in m/s"],
    description:
      "Die Lichtgeschwindigkeit beträgt genau 299.792.458 m/s, rund 300.000 km/s oder 1,08 Milliarden km/h. Rechner für Bruchteile von c.",
    intro: "Licht ist im Vakuum genau 299.792.458 Meter pro Sekunde schnell – dieser Wert ist seit 1983 festgelegt.",
  },
  "lichtjahr-kilometer": {
    titles: ["Lichtjahr in Kilometer umrechnen (ly in km)", "Lichtjahr in Kilometer"],
    description:
      "1 Lichtjahr = 9,46 Billionen km. Lichtjahre in Kilometer umrechnen: 4,24 ly (Proxima Centauri) = 40 Billionen km. Rechner mit Tabelle.",
    intro: "Ein Lichtjahr ist die Strecke, die Licht in einem Jahr zurücklegt: rund 9,46 Billionen Kilometer.",
    exampleValues: [0.001, 0.1, 1, 4.24, 8.6, 10, 25, 64, 100, 1000, 2500000],
  },
  "meter-zentimeter": {
    titles: ["Meter in Zentimeter (m in cm) umrechnen – mit Tabelle", "Meter in Zentimeter (m in cm)"],
    description:
      "1 m = 100 cm. Meter in Zentimeter umrechnen: 1,75 m = 175 cm, 0,5 m = 50 cm, 2,5 m = 250 cm. Rechner mit Tabelle für Körpergröße und Möbel.",
    intro: "Meter mal 100: 1 Meter sind 100 Zentimeter.",
    exampleValues: [0.01, 0.1, 0.5, 1, 1.5, 1.6, 1.7, 1.75, 1.8, 1.9, 2, 2.5, 5, 10],
  },
  "millimeter-meter": {
    titles: ["Millimeter in Meter (mm in m) umrechnen – mit Tabelle", "Millimeter in Meter (mm in m)"],
    description:
      "1.000 mm = 1 m. Millimeter in Meter umrechnen: 500 mm = 0,5 m, 1.500 mm = 1,5 m, 2.400 mm = 2,4 m. Rechner mit Formel (mm ÷ 1.000) und Tabelle.",
    intro: "Millimeter durch 1.000 teilen: 1.000 mm sind 1 Meter.",
    exampleValues: [1, 10, 100, 250, 500, 1000, 1500, 2000, 2400, 3000, 5000],
  },
  "mikrometer-millimeter": {
    titles: ["Mikrometer in Millimeter (µm in mm) umrechnen", "Mikrometer in Millimeter (µm in mm)"],
    description:
      "1.000 µm = 1 mm. Mikrometer in Millimeter umrechnen: 100 µm = 0,1 mm, 50 µm = 0,05 mm. Rechner mit Tabelle für Folienstärke, Lack und Fertigung.",
    intro: "Mikrometer durch 1.000 teilen: 1.000 µm sind 1 Millimeter.",
    exampleValues: [1, 5, 10, 20, 50, 80, 100, 200, 500, 1000],
  },
  "barrel-liter": {
    titles: ["Barrel in Liter umrechnen (bbl in l) – Öl-Barrel", "Barrel in Liter (bbl in l)"],
    description:
      "1 Barrel Rohöl = 158,99 Liter (42 US-Gallonen). Barrel in Liter umrechnen mit Rechner und Tabelle: 10 bbl = 1.590 l, 100 bbl = 15.899 l.",
    intro: "1 Barrel (bbl) Rohöl sind 42 US-Gallonen, also 158,987 Liter.",
    exampleValues: [1, 2, 5, 10, 50, 100, 1000, 1000000],
  },
};

function defaultTitles(page: PageLike) {
  const fs = germanSymbol(page.fromUnit);
  const ts = germanSymbol(page.toUnit);
  const plain = `${page.fromName} in ${page.toName}`;
  const symbols = `${fs} in ${ts}`;
  const showSymbols = symbols.toLowerCase() !== plain.toLowerCase();

  if (page.category === "sicaklik") {
    return [`${plain} umrechnen: Formel & Tabelle (${symbols})`, `${plain} umrechnen: Formel & Tabelle`, `${plain} umrechnen`];
  }

  return [
    ...(showSymbols ? [`${plain} (${symbols}) umrechnen – mit Tabelle`, `${plain} (${symbols}) umrechnen`] : [`${plain} umrechnen – mit Tabelle`]),
    `1 ${page.fromName} in ${page.toName} umrechnen`,
    plain,
    // Çok uzun birim adlarında (kalorie pro Quadratzentimeter …) son çare.
    `${symbols} umrechnen`,
  ];
}

function defaultDescription(page: PageLike) {
  const formula = TEMPERATURE_FORMULA[page.slug];
  // Açıklamada 1'in yanında iki örnek: aramadaki "5 X in Y" gibi sorulara da cevap.
  const examples = page.exampleValues.filter((value) => value !== 1).slice(-4, -1);
  const lead = formula ? `Formel: ${formula}.` : `${germanPair(page, 1)}.`;
  const sample = examples.map((value) => germanPair(page, value, true)).join(", ");
  return `${lead} ${page.fromName} in ${page.toName} umrechnen${sample ? `: ${sample}` : ""}. Rechner mit Formel und Umrechnungstabelle.`;
}

export function germanConversionSeo(page: PageLike) {
  const override = GERMAN_SEO_OVERRIDES[page.slug] ?? {};
  return {
    titles: override.titles ?? defaultTitles(page),
    description: override.description ?? defaultDescription(page),
    intro: override.intro,
    extraFaq: override.faq ?? [],
    exampleValues: override.exampleValues ?? page.exampleValues,
  };
}
