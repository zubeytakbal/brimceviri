"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculatePaintNeeds,
  type PaintCalculatorInput,
  type PaintCanSuggestion,
} from "../converter/paintCalculator";

type PaintCalculatorCopy = {
  labels: {
    length: string;
    width: string;
    height: string;
    doors: string;
    windows: string;
    coats: string;
    coverage: string;
    ceilingQuestion: string;
    ceilingCheckbox: string;
  };
  coatOptions: Record<1 | 2, string>;
  emptyState: string;
  resultLabels: {
    netWallArea: string;
    ceilingArea: string;
    totalPaintedArea: string;
    litersNeeded: string;
    suggestedCans: string;
  };
  units: {
    area: string;
    liters: string;
  };
};

const copyByLocale: Record<Exclude<Locale, "ru">, PaintCalculatorCopy> = {
  tr: {
    labels: {
      length: "Oda Uzunlugu (m)",
      width: "Oda Genisligi (m)",
      height: "Duvar Yuksekligi (m)",
      doors: "Kapi Sayisi",
      windows: "Pencere Sayisi",
      coats: "Kat Sayisi",
      coverage: "Boya Verimi (m2/litre)",
      ceilingQuestion: "Tavan da boyanacak mi?",
      ceilingCheckbox: "Evet, tavani da hesaba kat",
    },
    coatOptions: {
      1: "Tek kat",
      2: "Iki kat (onerilen)",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
    resultLabels: {
      netWallArea: "Net duvar alani",
      ceilingArea: "Tavan alani",
      totalPaintedArea: "Toplam boyanacak alan",
      litersNeeded: "Gereken boya miktari",
      suggestedCans: "Onerilen kutu kombinasyonu",
    },
    units: {
      area: "m2",
      liters: "litre",
    },
  },
  en: {
    labels: {
      length: "Room Length (m)",
      width: "Room Width (m)",
      height: "Wall Height (m)",
      doors: "Door Count",
      windows: "Window Count",
      coats: "Number of Coats",
      coverage: "Paint Coverage (m2/liter)",
      ceilingQuestion: "Paint the ceiling too?",
      ceilingCheckbox: "Yes, include the ceiling",
    },
    coatOptions: {
      1: "Single coat",
      2: "Two coats (recommended)",
    },
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      netWallArea: "Net wall area",
      ceilingArea: "Ceiling area",
      totalPaintedArea: "Total painted area",
      litersNeeded: "Required paint",
      suggestedCans: "Suggested can combination",
    },
    units: {
      area: "m2",
      liters: "liters",
    },
  },
  fr: {
    labels: {
      length: "Longueur de la pièce (m)",
      width: "Largeur de la pièce (m)",
      height: "Hauteur des murs (m)",
      doors: "Nombre de portes",
      windows: "Nombre de fenêtres",
      coats: "Nombre de couches",
      coverage: "Rendement de la peinture (m²/litre)",
      ceilingQuestion: "Peindre aussi le plafond ?",
      ceilingCheckbox: "Oui, inclure le plafond",
    },
    coatOptions: {
      1: "Une couche",
      2: "Deux couches (recommandé)",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
    resultLabels: {
      netWallArea: "Surface nette des murs",
      ceilingArea: "Surface du plafond",
      totalPaintedArea: "Surface totale à peindre",
      litersNeeded: "Peinture nécessaire",
      suggestedCans: "Combinaison de pots conseillée",
    },
    units: {
      area: "m2",
      liters: "litres",
    },
  },
  es: {
    labels: {
      length: "Largo de la habitación (m)",
      width: "Ancho de la habitación (m)",
      height: "Altura de las paredes (m)",
      doors: "Número de puertas",
      windows: "Número de ventanas",
      coats: "Número de capas",
      coverage: "Rendimiento de la pintura (m²/litro)",
      ceilingQuestion: "¿Pintar también el techo?",
      ceilingCheckbox: "Sí, incluir el techo",
    },
    coatOptions: {
      1: "Una capa",
      2: "Dos capas (recomendado)",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
    resultLabels: {
      netWallArea: "Superficie neta de paredes",
      ceilingArea: "Superficie del techo",
      totalPaintedArea: "Superficie total a pintar",
      litersNeeded: "Pintura necesaria",
      suggestedCans: "Combinación de botes recomendada",
    },
    units: {
      area: "m2",
      liters: "litros",
    },
  },
  "es-419": {
    labels: {
      length: "Largo de la habitación (m)",
      width: "Ancho de la habitación (m)",
      height: "Altura de las paredes (m)",
      doors: "Número de puertas",
      windows: "Número de ventanas",
      coats: "Número de manos",
      coverage: "Rendimiento de la pintura (m²/litro)",
      ceilingQuestion: "¿Pintar también el techo?",
      ceilingCheckbox: "Sí, incluir el techo",
    },
    coatOptions: {
      1: "Una mano",
      2: "Dos manos (recomendado)",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
    resultLabels: {
      netWallArea: "Superficie neta de paredes",
      ceilingArea: "Superficie del techo",
      totalPaintedArea: "Superficie total a pintar",
      litersNeeded: "Pintura necesaria",
      suggestedCans: "Combinación de galones sugerida",
    },
    units: {
      area: "m2",
      liters: "litros",
    },
  },
  pt: {
    labels: {
      length: "Comprimento do cômodo (m)",
      width: "Largura do cômodo (m)",
      height: "Altura das paredes (m)",
      doors: "Número de portas",
      windows: "Número de janelas",
      coats: "Número de demãos",
      coverage: "Rendimento da tinta (m²/litro)",
      ceilingQuestion: "Pintar também o teto?",
      ceilingCheckbox: "Sim, incluir o teto",
    },
    coatOptions: {
      1: "Uma demão",
      2: "Duas demãos (recomendado)",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
    resultLabels: {
      netWallArea: "Área líquida das paredes",
      ceilingArea: "Área do teto",
      totalPaintedArea: "Área total a pintar",
      litersNeeded: "Tinta necessária",
      suggestedCans: "Combinação de latas sugerida",
    },
    units: {
      area: "m2",
      liters: "litros",
    },
  },
  it: {
    labels: {
      length: "Lunghezza della stanza (m)",
      width: "Larghezza della stanza (m)",
      height: "Altezza delle pareti (m)",
      doors: "Numero di porte",
      windows: "Numero di finestre",
      coats: "Numero di mani",
      coverage: "Resa della pittura (m²/litro)",
      ceilingQuestion: "Dipingere anche il soffitto?",
      ceilingCheckbox: "Sì, includi il soffitto",
    },
    coatOptions: {
      1: "Una mano",
      2: "Due mani (consigliato)",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
    resultLabels: {
      netWallArea: "Superficie netta delle pareti",
      ceilingArea: "Superficie del soffitto",
      totalPaintedArea: "Superficie totale da dipingere",
      litersNeeded: "Pittura necessaria",
      suggestedCans: "Combinazione di barattoli consigliata",
    },
    units: {
      area: "m2",
      liters: "litri",
    },
  },
  nl: {
    labels: {
      length: "Lengte van de kamer (m)",
      width: "Breedte van de kamer (m)",
      height: "Wandhoogte (m)",
      doors: "Aantal deuren",
      windows: "Aantal ramen",
      coats: "Aantal lagen",
      coverage: "Dekkend vermogen (m²/liter)",
      ceilingQuestion: "Ook het plafond verven?",
      ceilingCheckbox: "Ja, plafond meenemen",
    },
    coatOptions: {
      1: "Eén laag",
      2: "Twee lagen (aanbevolen)",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
    resultLabels: {
      netWallArea: "Netto wandoppervlak",
      ceilingArea: "Plafondoppervlak",
      totalPaintedArea: "Totaal te verven oppervlak",
      litersNeeded: "Benodigde verf",
      suggestedCans: "Aanbevolen combinatie van blikken",
    },
    units: {
      area: "m2",
      liters: "liter",
    },
  },
  sv: {
    labels: {
      length: "Rummets längd (m)",
      width: "Rummets bredd (m)",
      height: "Vägghöjd (m)",
      doors: "Antal dörrar",
      windows: "Antal fönster",
      coats: "Antal strykningar",
      coverage: "Färgåtgång (m²/liter)",
      ceilingQuestion: "Måla även taket?",
      ceilingCheckbox: "Ja, ta med taket",
    },
    coatOptions: {
      1: "En strykning",
      2: "Två strykningar (rekommenderas)",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
    resultLabels: {
      netWallArea: "Nettoväggyta",
      ceilingArea: "Takyta",
      totalPaintedArea: "Total yta att måla",
      litersNeeded: "Färg som behövs",
      suggestedCans: "Föreslagen burkkombination",
    },
    units: {
      area: "m2",
      liters: "liter",
    },
  },
  no: {
    labels: {
      length: "Romlengde (m)",
      width: "Rombredde (m)",
      height: "Vegghøyde (m)",
      doors: "Antall dører",
      windows: "Antall vinduer",
      coats: "Antall strøk",
      coverage: "Maling per liter (m²/liter)",
      ceilingQuestion: "Male taket også?",
      ceilingCheckbox: "Ja, ta med taket",
    },
    coatOptions: {
      1: "Ett strøk",
      2: "To strøk (anbefalt)",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
    resultLabels: {
      netWallArea: "Netto veggareal",
      ceilingArea: "Takareal",
      totalPaintedArea: "Totalt areal å male",
      litersNeeded: "Maling som trengs",
      suggestedCans: "Foreslått spannkombinasjon",
    },
    units: {
      area: "m2",
      liters: "liter",
    },
  },
  da: {
    labels: {
      length: "Rummets længde (m)",
      width: "Rummets bredde (m)",
      height: "Væghøjde (m)",
      doors: "Antal døre",
      windows: "Antal vinduer",
      coats: "Antal lag",
      coverage: "Malingens rækkeevne (m²/liter)",
      ceilingQuestion: "Skal loftet også males?",
      ceilingCheckbox: "Ja, medtag loftet",
    },
    coatOptions: {
      1: "Ét lag",
      2: "To lag (anbefales)",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
    resultLabels: {
      netWallArea: "Netto vægareal",
      ceilingArea: "Loftsareal",
      totalPaintedArea: "Samlet areal der skal males",
      litersNeeded: "Nødvendig maling",
      suggestedCans: "Foreslået kombination af spande",
    },
    units: {
      area: "m2",
      liters: "liter",
    },
  },
  de: {
    labels: {
      length: "Raumlänge (m)",
      width: "Raumbreite (m)",
      height: "Wandhöhe (m)",
      doors: "Anzahl Tueren",
      windows: "Anzahl Fenster",
      coats: "Anzahl Anstriche",
      coverage: "Deckkraft (m2/Liter)",
      ceilingQuestion: "Soll die Decke mitgestrichen werden?",
      ceilingCheckbox: "Ja, Decke einbeziehen",
    },
    coatOptions: {
      1: "Ein Anstrich",
      2: "Zwei Anstriche (empfohlen)",
    },
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      netWallArea: "Netto-Wandfläche",
      ceilingArea: "Deckenfläche",
      totalPaintedArea: "Gesamte Streichfläche",
      litersNeeded: "Benötigte Farbmenge",
      suggestedCans: "Empfohlene Eimerkombination",
    },
    units: {
      area: "m2",
      liters: "Liter",
    },
  },
  ar: {
    labels: {
      length: "طول الغرفة (م)",
      width: "عرض الغرفة (م)",
      height: "ارتفاع الجدار (م)",
      doors: "عدد الأبواب",
      windows: "عدد النوافذ",
      coats: "عدد الطبقات",
      coverage: "تغطية الطلاء (م2/لتر)",
      ceilingQuestion: "هل يشمل الحساب السقف أيضًا؟",
      ceilingCheckbox: "نعم، أضف السقف إلى الحساب",
    },
    coatOptions: {
      1: "طبقة واحدة",
      2: "طبقتان (موصى به)",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      netWallArea: "صافي مساحة الجدران",
      ceilingArea: "مساحة السقف",
      totalPaintedArea: "إجمالي المساحة المطلية",
      litersNeeded: "كمية الطلاء المطلوبة",
      suggestedCans: "تشكيلة العبوات المقترحة",
    },
    units: {
      area: "م2",
      liters: "لتر",
    },
  },
uz: {
    labels: {
      length: "Xona Uzunligi (m)",
      width: "Xona Kengligi (m)",
      height: "Devor Balandligi (m)",
      doors: "Eshiklar Soni",
      windows: "Derazalar Soni",
      coats: "Qatlamlar Soni",
      coverage: "Bo'yoq Qamrovi (m2/litr)",
      ceilingQuestion: "Shift ham bo'yaladimi?",
      ceilingCheckbox: "Ha, shiftni ham qo'shing",
    },
    coatOptions: {
      1: "Bitta qatlam",
      2: "Ikki qatlam (tavsiya etiladi)",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
    resultLabels: {
      netWallArea: "Sof devor maydoni",
      ceilingArea: "Shift maydoni",
      totalPaintedArea: "Jami bo'yaladigan maydon",
      litersNeeded: "Kerakli bo'yoq",
      suggestedCans: "Tavsiya etilgan bank kombinatsiyasi",
    },
    units: {
      area: "m2",
      liters: "litr",
    },
  },
bn: {
    labels: {
      length: "রুমের দৈর্ঘ্য (মি)",
      width: "রুমের প্রস্থ (মি)",
      height: "দেয়ালের উচ্চতা (মি)",
      doors: "দরজার সংখ্যা",
      windows: "জানালার সংখ্যা",
      coats: "কোটের সংখ্যা",
      coverage: "রং এর আবরণ ক্ষমতা (মি²/লিটার)",
      ceilingQuestion: "ছাদও রং করা হবে?",
      ceilingCheckbox: "হ্যাঁ, ছাদও হিসাবে যুক্ত করুন",
    },
    coatOptions: {
      1: "এক কোট",
      2: "দুই কোট (প্রস্তাবিত)",
    },
    emptyState: "ফলাফল দেখতে সঠিক মান লিখুন।",
    resultLabels: {
      netWallArea: "নিট দেয়ালের ক্ষেত্রফল",
      ceilingArea: "ছাদের ক্ষেত্রফল",
      totalPaintedArea: "মোট রং করার ক্ষেত্রফল",
      litersNeeded: "প্রয়োজনীয় রং",
      suggestedCans: "প্রস্তাবিত ক্যানের সংমিশ্রণ",
    },
    units: {
      area: "মি²",
      liters: "লিটার",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function parseIntegerValue(rawValue: string) {
  const numericValue = parseNumericValue(rawValue);

  return Number.isFinite(numericValue) ? Math.max(0, Math.round(numericValue)) : Number.NaN;
}

function formatArea(value: number, locale: Locale, unitLabel: string) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 1 })} ${unitLabel}`;
}

function formatLiters(value: number, locale: Locale, unitLabel: string) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 1 })} ${unitLabel}`;
}

function formatCanList(cans: PaintCanSuggestion[], locale: Locale) {
  if (!cans || cans.length === 0) {
    return "-";
  }

  return cans
    .map(
      (can) =>
        `${can.count} x ${formatLocalizedNumber(can.size, locale, {
          maximumFractionDigits: 1,
        })} L`
    )
    .join(" + ");
}

export default function PaintCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [length, setLength] = useState("4");
  const [width, setWidth] = useState("3.5");
  const [height, setHeight] = useState("2.7");
  const [doorCount, setDoorCount] = useState("1");
  const [windowCount, setWindowCount] = useState("1");
  const [coats, setCoats] = useState<1 | 2>(2);
  const [coverage, setCoverage] = useState("10");
  const [includeCeiling, setIncludeCeiling] = useState(false);

  const input: PaintCalculatorInput = useMemo(
    () => ({
      length: parseNumericValue(length),
      width: parseNumericValue(width),
      height: parseNumericValue(height),
      doorCount: parseIntegerValue(doorCount),
      windowCount: parseIntegerValue(windowCount),
      coats,
      coverage: parseNumericValue(coverage),
      includeCeiling,
    }),
    [length, width, height, doorCount, windowCount, coats, coverage, includeCeiling]
  );

  const result = useMemo(() => calculatePaintNeeds(input), [input]);

  return (
    <div className="category-general-converter paint-calculator">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.length}</span>
          <input
            inputMode="decimal"
            type="text"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.width}</span>
          <input
            inputMode="decimal"
            type="text"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.height}</span>
          <input
            inputMode="decimal"
            type="text"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.doors}</span>
          <input
            inputMode="numeric"
            type="text"
            value={doorCount}
            onChange={(event) => setDoorCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.windows}</span>
          <input
            inputMode="numeric"
            type="text"
            value={windowCount}
            onChange={(event) => setWindowCount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.coats}</span>
          <select
            value={coats}
            onChange={(event) => setCoats(Number(event.target.value) as 1 | 2)}
          >
            <option value={1}>{copy.coatOptions[1]}</option>
            <option value={2}>{copy.coatOptions[2]}</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.coverage}</span>
          <input
            inputMode="decimal"
            type="text"
            value={coverage}
            onChange={(event) => setCoverage(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>{copy.labels.ceilingQuestion}</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={includeCeiling}
              onChange={(event) => setIncludeCeiling(event.target.checked)}
            />
            {copy.labels.ceilingCheckbox}
          </span>
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.netWallArea}</span>
                <strong>{formatArea(result.netWallArea, locale, copy.units.area)}</strong>
              </div>
              {includeCeiling && (
                <div>
                  <span>{copy.resultLabels.ceilingArea}</span>
                  <strong>{formatArea(result.ceilingArea, locale, copy.units.area)}</strong>
                </div>
              )}
              <div>
                <span>{`${copy.resultLabels.totalPaintedArea} (${coats})`}</span>
                <strong>{formatArea(result.totalPaintedArea, locale, copy.units.area)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              {copy.resultLabels.litersNeeded}:{" "}
              <strong>{formatLiters(result.litersNeeded, locale, copy.units.liters)}</strong>
            </p>
            <p className="category-general-converter-equality">
              {copy.resultLabels.suggestedCans}: {formatCanList(result.suggestedCans, locale)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
