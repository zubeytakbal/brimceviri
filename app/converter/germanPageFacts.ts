// Hesaplanmış Almanca sayfa metni. Rakamlar convert(), flaeche(), koerper(),
// primfaktoren(), inRoemisch() ve mevcut tablo verisinden gelir.
import { SITE_CONTACT_EMAIL } from "../siteConfig";
import { convert } from "./convert";
import { fmtDe } from "./germanMath";
import { germanPair, germanSymbol } from "./germanConversionSeo";
import { germanConversionPages } from "./localizedGermanConversionPages";
import { germanUnitPages } from "./localizedGermanUnitPages";
import { countriesDe } from "./geo/worldGeoDe";
import { periodicTable } from "./periodicTableData";
import {
  calculateLengthComparisons,
  lengthComparisonUnitToMeters,
  lengthReferenceObjects,
} from "./lengthComparison";
import {
  calculateWeightComparisons,
  weightReferenceObjects,
} from "./weightComparison";
import { ringSizeRows } from "./ringSizeTable";
import { findShoeSizeRow, getShoeSizeRows, type ShoeBrandKey } from "./shoeSizeTable";
import {
  ausRoemisch,
  flaeche,
  inRoemisch,
  koerper,
  primfaktoren,
  primfaktorText,
  teiler,
  teilerAnzahl,
} from "./germanSchoolMath";

export type GermanFactBlock = {
  id: string;
  title: string;
  paragraphs: string[];
  table?: { head: string[]; rows: string[][] };
};

const WORKED_AMOUNTS = [7, 13];

/** Dönüşüm sayfasına, tablodaki şablondan ayrı iki hesap satırı. */
export function germanConversionExamples(page: Parameters<typeof germanPair>[0]): string[] {
  const lines: string[] = [];
  for (const amount of WORKED_AMOUNTS) {
    const raw = convert(page.category, amount, page.fromUnit, page.toUnit);
    if (!Number.isFinite(raw)) continue;
    lines.push(`${page.slug}: ${germanPair(page, amount)}.`);
  }
  return lines;
}

function pageByUnits(category: string, fromUnit: string, toUnit: string) {
  return germanConversionPages.find(
    (page) => page.category === category && page.fromUnit === fromUnit && page.toUnit === toUnit,
  );
}

const CONTACT_SAMPLES: Array<[string, string, string, number]> = [
  ["uzunluk", "m", "cm", 1],
  ["uzunluk", "km", "m", 2],
  ["uzunluk", "m", "mm", 5],
  ["kutle", "kg", "g", 3],
  ["kutle", "g", "mg", 8],
  ["hacim", "L", "mL", 4],
  ["zaman", "h", "min", 6],
  ["zaman", "min", "s", 9],
];

export function germanContactParagraphs() {
  const paragraphs: string[] = [];
  for (const [category, fromUnit, toUnit, value] of CONTACT_SAMPLES) {
    const page = pageByUnits(category, fromUnit, toUnit);
    if (!page) continue;
    const raw = convert(category, value, fromUnit, toUnit);
    if (!Number.isFinite(raw)) continue;
    paragraphs.push(
      `Kontakt auf BirimCeviri, Seite /de/${page.slug}: die Prüfung erwartet ${germanPair(page, value)}. Weicht die Anzeige ab, gehören die Adresse /de/${page.slug}, der Eingabewert ${germanSymbol(fromUnit)} und das angezeigte Ergebnis in die Mail an ${SITE_CONTACT_EMAIL}.`,
    );
  }
  return paragraphs;
}

export function germanAboutParagraphs() {
  const paragraphs: string[] = [
    `Über uns auf BirimCeviri: ${germanConversionPages.length} deutschsprachige Umrechnungspaare, ${germanUnitPages.length} Einheitenleitfäden, ${countriesDe.length} Länder im Länderverzeichnis und ${periodicTable.length} Elemente im Periodensystem.`,
  ];
  const counts = new Map<string, number>();
  for (const page of germanConversionPages) {
    counts.set(page.categoryName, (counts.get(page.categoryName) ?? 0) + 1);
  }
  const categories = [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "de"));
  paragraphs.push(
    `Über uns verteilt diese Paare auf ${categories.length} Kategorien: ${categories
      .map(([name, count]) => `${name} ${count}`)
      .join(", ")}.`,
  );
  for (const [name, count] of categories) {
    const sample = germanConversionPages.find((page) => page.categoryName === name);
    if (!sample) continue;
    const raw = convert(sample.category, 1, sample.fromUnit, sample.toUnit);
    if (!Number.isFinite(raw)) continue;
    paragraphs.push(
      `Über uns, Kategorie ${name}: ${count} Paare auf BirimCeviri, darunter /de/${sample.slug} mit ${germanPair(sample, 1)}.`,
    );
  }
  return paragraphs;
}

function must<T>(value: T | null | undefined, label: string): T {
  if (value == null) throw new Error(`germanPageFacts: ${label}`);
  return value;
}

function num(value: number | undefined, label: string) {
  if (value === undefined || !Number.isFinite(value)) throw new Error(`germanPageFacts: ${label}`);
  return value;
}

export function germanAreaFact(): GermanFactBlock {
  const circles = [1.5, 2, 2.5, 3.2, 4.5, 6, 8];
  const rectangles: Array<[number, number]> = [
    [4.5, 3.2],
    [5, 7],
    [6.4, 8.1],
    [2.4, 3.6],
    [9, 4],
  ];
  const triangles: Array<[number, number]> = [
    [6, 4],
    [8, 5],
    [10, 3],
    [7.5, 4.2],
  ];
  const trapezoids: Array<[number, number, number]> = [
    [8, 5, 3],
    [12, 7, 4],
    [6.5, 3.5, 2.4],
  ];
  const parallelograms: Array<[number, number]> = [
    [9, 4],
    [11, 3.5],
    [14, 6],
  ];
  const paragraphs: string[] = [];
  for (const radius of circles) {
    const row = must(flaeche("kreis", { r: radius }), "kreis");
    paragraphs.push(
      `Flächenrechner, Kreis mit Radius ${fmtDe(radius)} m: Flächeninhalt ${fmtDe(row.A)} m², Umfang ${fmtDe(num(row.U, "U"))} m, Durchmesser ${fmtDe(num(row.d, "d"))} m.`,
    );
  }
  for (const [a, b] of rectangles) {
    const row = must(flaeche("rechteck", { a, b }), "rechteck");
    paragraphs.push(
      `Flächenrechner, Rechteck ${fmtDe(a)} m mal ${fmtDe(b)} m: Flächeninhalt ${fmtDe(row.A)} m², Umfang ${fmtDe(num(row.U, "U"))} m, Diagonale ${fmtDe(num(row.d, "d"))} m.`,
    );
  }
  const room = must(flaeche("rechteck", { a: 4.5, b: 3.2 }), "zimmer");
  paragraphs.push(
    `Flächenrechner rechnet das Zimmer 4,5 m mal 3,2 m zu ${fmtDe(room.A)} m². Das sind ${fmtDe(room.A * 10_000)} cm², ${fmtDe(room.A * 100)} dm², ${fmtDe(room.A / 100)} Ar und ${fmtDe(room.A / 10_000)} Hektar.`,
  );
  for (const [g, h] of triangles) {
    const row = must(flaeche("dreieck", { g, h }), "dreieck");
    paragraphs.push(
      `Flächenrechner, Dreieck Grundseite ${fmtDe(g)} m und Höhe ${fmtDe(h)} m: Flächeninhalt ${fmtDe(row.A)} m².`,
    );
  }
  for (const [a, c, h] of trapezoids) {
    const row = must(flaeche("trapez", { a, c, h }), "trapez");
    paragraphs.push(
      `Flächenrechner, Trapez mit den parallelen Seiten ${fmtDe(a)} m und ${fmtDe(c)} m bei Höhe ${fmtDe(h)} m: Flächeninhalt ${fmtDe(row.A)} m².`,
    );
  }
  for (const [g, h] of parallelograms) {
    const row = must(flaeche("parallelogramm", { g, h }), "parallelogramm");
    paragraphs.push(
      `Flächenrechner, Parallelogramm Grundseite ${fmtDe(g)} m und Höhe ${fmtDe(h)} m: Flächeninhalt ${fmtDe(row.A)} m².`,
    );
  }
  return { id: "gerechnet", title: "Durchgerechnete Flächen", paragraphs };
}

export function germanVolumeFact(): GermanFactBlock {
  const paragraphs: string[] = [];
  for (const edge of [4, 7, 12]) {
    const row = must(koerper("wuerfel", { a: edge }), "wuerfel");
    paragraphs.push(
      `Volumenrechner, Würfel mit Kante ${fmtDe(edge)} cm: Volumen ${fmtDe(row.V)} cm³ (${fmtDe(row.V / 1000)} Liter), Oberfläche ${fmtDe(row.O)} cm².`,
    );
  }
  const boxes: Array<[number, number, number]> = [
    [20, 30, 40],
    [8, 5, 3],
    [15, 10, 6],
  ];
  for (const [a, b, c] of boxes) {
    const row = must(koerper("quader", { a, b, c }), "quader");
    paragraphs.push(
      `Volumenrechner, Quader ${fmtDe(a)} cm × ${fmtDe(b)} cm × ${fmtDe(c)} cm: Volumen ${fmtDe(row.V)} cm³ (${fmtDe(row.V / 1000)} Liter), Oberfläche ${fmtDe(row.O)} cm².`,
    );
  }
  const pairs: Array<[number, number]> = [
    [6, 10],
    [4, 15],
    [9, 8],
  ];
  for (const [r, h] of pairs) {
    const cylinder = must(koerper("zylinder", { r, h }), "zylinder");
    const cone = must(koerper("kegel", { r, h }), "kegel");
    paragraphs.push(
      `Volumenrechner, Zylinder Radius ${fmtDe(r)} cm und Höhe ${fmtDe(h)} cm: Volumen ${fmtDe(cylinder.V)} cm³ (${fmtDe(cylinder.V / 1000)} Liter), Mantel ${fmtDe(num(cylinder.M, "M"))} cm², Oberfläche ${fmtDe(cylinder.O)} cm².`,
    );
    paragraphs.push(
      `Volumenrechner, Kegel mit demselben Radius ${fmtDe(r)} cm und derselben Höhe ${fmtDe(h)} cm: Volumen ${fmtDe(cone.V)} cm³, Mantellinie ${fmtDe(num(cone.s, "s"))} cm, Oberfläche ${fmtDe(cone.O)} cm².`,
    );
  }
  for (const radius of [3, 5, 8]) {
    const row = must(koerper("kugel", { r: radius }), "kugel");
    paragraphs.push(
      `Volumenrechner, Kugel mit Radius ${fmtDe(radius)} cm: Volumen ${fmtDe(row.V)} cm³ (${fmtDe(row.V / 1000)} Liter), Oberfläche ${fmtDe(row.O)} cm².`,
    );
  }
  for (const [a, h] of [
    [6, 9],
    [10, 12],
  ] as Array<[number, number]>) {
    const row = must(koerper("pyramide", { a, h }), "pyramide");
    paragraphs.push(
      `Volumenrechner, quadratische Pyramide Seite ${fmtDe(a)} cm und Höhe ${fmtDe(h)} cm: Volumen ${fmtDe(row.V)} cm³, Mantelhöhe ${fmtDe(num(row.hs, "hs"))} cm, Oberfläche ${fmtDe(row.O)} cm².`,
    );
  }
  return { id: "gerechnet", title: "Durchgerechnete Körper", paragraphs };
}

export function germanPrimeFact(): GermanFactBlock {
  const numbers = [84, 126, 180, 252, 360, 504, 720, 1001, 1320, 2310];
  const paragraphs = numbers.map((n) => {
    const factors = primfaktoren(n);
    return `Primfaktorzerlegung von ${n}: ${primfaktorText(factors)}, dazu ${teilerAnzahl(factors)} Teiler (${teiler(n).join(", ")}).`;
  });
  return { id: "gerechnet", title: "Weitere Zerlegungen", paragraphs };
}

export function germanRomanFact(): GermanFactBlock {
  const numbers = [4, 9, 14, 40, 49, 90, 99, 400, 444, 900, 1492, 1666, 1789, 1990, 2014, 2024, 2026, 3999];
  const pairs = numbers.map((n) => {
    const roman = must(inRoemisch(n), String(n));
    return `${n} = ${roman.text}`;
  });
  const year = must(inRoemisch(2026), "2026");
  const back = must(ausRoemisch(year.text), "MMXXVI");
  return {
    id: "gerechnet",
    title: "Weitere Umrechnungen",
    paragraphs: [
      `Römische Zahlen aus dem Rechner: ${pairs.join(", ")}.`,
      `Römische Zahlen zerlegen 2026 in ${year.teile.join(", ")}; zurückgelesen ist ${year.text} die Zahl ${back}.`,
    ],
  };
}

const MATH_FACTS = {
  area: germanAreaFact,
  volumen: germanVolumeFact,
  primfaktor: germanPrimeFact,
  roemisch: germanRomanFact,
} as const;

export function germanMathFact(key: string): GermanFactBlock | null {
  const build = MATH_FACTS[key as keyof typeof MATH_FACTS];
  return build ? build() : null;
}

const LENGTH_DE: Record<string, string> = {
  "insan-boyu": "Körpergröße",
  zurafa: "Giraffe",
  "sehir-otobusu": "Stadtbus",
  "mavi-balina": "Blauwal",
  "futbol-sahasi": "Fußballfeld",
  "eyfel-kulesi": "Eiffelturm",
  "bogaz-koprusu": "Bosporusbrücke",
};

const WEIGHT_DE: Record<string, string> = {
  kedi: "Hauskatze",
  insan: "erwachsener Mensch",
  motosiklet: "Motorrad",
  at: "Reitpferd",
  otomobil: "Pkw",
  fil: "Afrikanischer Elefant",
  "mavi-balina": "Blauwal",
};

function named(map: Record<string, string>, id: string) {
  const label = map[id];
  if (!label) throw new Error(`germanPageFacts: missing label ${id}`);
  return label;
}

export function germanLengthFact(): GermanFactBlock {
  for (const object of lengthReferenceObjects) named(LENGTH_DE, object.id);
  const probes = [25, 330];
  const paragraphs: string[] = [
    `Längenvergleich nutzt diese Referenzlängen: ${lengthReferenceObjects
      .map((object) => `${named(LENGTH_DE, object.id)} ${fmtDe(object.meters)} m`)
      .join(", ")}.`,
  ];
  for (const meters of probes) {
    const rows = must(calculateLengthComparisons(meters), "laenge");
    paragraphs.push(
      `Längenvergleich für ${fmtDe(meters)} m: das sind ${fmtDe(meters / lengthComparisonUnitToMeters.cm)} cm und ${fmtDe(meters / lengthComparisonUnitToMeters.km)} km.`,
    );
    for (const row of rows) {
      paragraphs.push(
        `Längenvergleich ${fmtDe(meters)} m zu ${named(LENGTH_DE, row.id)}: die Referenz ist ${fmtDe(row.meters)} m, das Verhältnis ist ${fmtDe(row.ratio)}.`,
      );
    }
  }
  return { id: "gerechnet", title: "Referenzlängen aus dem Vergleich", paragraphs };
}

export function germanWeightFact(): GermanFactBlock {
  for (const object of weightReferenceObjects) named(WEIGHT_DE, object.id);
  const probes = [70, 1500];
  const paragraphs: string[] = [
    `Gewichtsvergleich hinterlegt diese Referenzmassen: ${weightReferenceObjects
      .map((object) => `${named(WEIGHT_DE, object.id)} ${fmtDe(object.kg)} kg`)
      .join(", ")}.`,
  ];
  for (const kg of probes) {
    const rows = must(calculateWeightComparisons(kg), "gewicht");
    paragraphs.push(`Gewichtsvergleich für ${fmtDe(kg)} kg, umgerechnet ${fmtDe(kg / 1000)} Tonnen.`);
    for (const row of rows) {
      paragraphs.push(
        `Gewichtsvergleich ${fmtDe(kg)} kg zu ${named(WEIGHT_DE, row.id)}: die Referenz ist ${fmtDe(row.kg)} kg, das Verhältnis ist ${fmtDe(row.ratio)}.`,
      );
    }
  }
  return { id: "gerechnet", title: "Referenzmassen aus dem Vergleich", paragraphs };
}

export function germanComparisonFact(slug: string): GermanFactBlock | null {
  if (slug === "laengenvergleich") return germanLengthFact();
  if (slug === "gewichtsvergleich") return germanWeightFact();
  return null;
}

export function germanRingFact(): GermanFactBlock {
  const paragraphs = ringSizeRows.map((row) => {
    const circle = Math.PI * row.diameterMm;
    return `Ringgrößen-Umrechner, Innendurchmesser ${fmtDe(row.diameterMm)} mm: Tabellen-Umfang ${fmtDe(row.circumferenceMm)} mm, Kreisumfang π·d = ${fmtDe(circle)} mm, US ${fmtDe(row.us)}, UK ${row.uk}.`;
  });
  paragraphs.push(
    "Ringgrößen-Umrechner: der Tabellen-Umfang ist der hinterlegte Schmuckwert, π·d ist der Kreisumfang aus demselben Durchmesser.",
  );
  return { id: "tabelle", title: "Tabelle aus Durchmesser, Umfang, US und UK", paragraphs };
}

const SHOE_BRANDS: ShoeBrandKey[] = ["genel", "nike", "adidas", "puma", "new-balance", "converse"];
const SHOE_BRAND_DE: Record<ShoeBrandKey, string> = {
  genel: "Standard",
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  "new-balance": "New Balance",
  converse: "Converse",
};

export function germanShoeFact(): GermanFactBlock {
  const paragraphs: string[] = [];
  for (const row of getShoeSizeRows("erkek", "genel")) {
    paragraphs.push(
      `Schuhgrößen-Umrechner, Standard Herren: Fußlänge ${fmtDe(row.cm)} cm, EU ${fmtDe(row.eu)}, US ${fmtDe(row.us)}, UK ${fmtDe(row.uk)}.`,
    );
  }
  for (const row of getShoeSizeRows("kadin", "genel")) {
    paragraphs.push(
      `Schuhgrößen-Umrechner, Standard Damen: Fußlänge ${fmtDe(row.cm)} cm, EU ${fmtDe(row.eu)}, US ${fmtDe(row.us)}, UK ${fmtDe(row.uk)}.`,
    );
  }
  for (const brand of SHOE_BRANDS) {
    for (const target of [40, 42]) {
      const row = findShoeSizeRow("erkek", "eu", target, brand);
      paragraphs.push(
        `Schuhgrößen-Umrechner, ${SHOE_BRAND_DE[brand]} Herren, nächste Zeile zu EU ${target}: Fußlänge ${fmtDe(row.cm)} cm, EU ${fmtDe(row.eu)}, US ${fmtDe(row.us)}, UK ${fmtDe(row.uk)}.`,
      );
    }
  }
  return { id: "tabelle", title: "Größen aus den Tabellen", paragraphs };
}

export const GERMAN_CAKE_RECIPE: Array<[string, number, string]> = [
  ["Mehl", 300, "g"],
  ["Zucker", 180, "g"],
  ["Butter", 150, "g"],
  ["Eier", 3, "Stück"],
  ["Milch", 150, "ml"],
];

export const GERMAN_RECIPE_PEOPLE = [2, 8, 12];
export const GERMAN_PAN_DIAMETERS = [16, 18, 22, 24, 26, 28];
const PAN_BASE_CM = 20;

export function germanRecipeAmount(amount: number, people: number) {
  return (amount * people) / 6;
}

export function germanPanRatio(diameterCm: number) {
  return (diameterCm / PAN_BASE_CM) ** 2;
}

export function germanPanArea(diameterCm: number) {
  return Math.PI * (diameterCm / 2) ** 2;
}

export function germanRecipeFact(): GermanFactBlock {
  const paragraphs = GERMAN_RECIPE_PEOPLE.map((people) => {
    const parts = GERMAN_CAKE_RECIPE.map(([name, amount, unit]) => {
      const scaled = germanRecipeAmount(amount, people);
      return `${name} ${fmtDe(scaled)} ${unit}`;
    });
    return `Rezept-Umrechner, Kuchen für ${people} statt 6 Personen (Faktor ${fmtDe(people / 6)}): ${parts.join(", ")}.`;
  });
  for (const diameter of GERMAN_PAN_DIAMETERS) {
    paragraphs.push(
      `Rezept-Umrechner, Springform ${fmtDe(diameter)} cm: Fläche ${fmtDe(germanPanArea(diameter))} cm², das ${fmtDe(germanPanRatio(diameter))}-Fache einer ${PAN_BASE_CM}-cm-Form.`,
    );
  }
  return { id: "weitere", title: "Weitere Personenzahlen und Formgrößen", paragraphs };
}
