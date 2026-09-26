"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateTileNeeds,
  type TileCalculatorInput,
} from "../converter/tileCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    labels: {
      area: string;
      width: string;
      height: string;
      waste: string;
    };
    resultLabels: {
      tileArea: string;
      totalArea: string;
      count: string;
    };
    emptyState: string;
  }
> = {
  tr: {
    labels: {
      area: "Kaplanacak Alan (m2)",
      width: "Fayans Eni (cm)",
      height: "Fayans Boyu (cm)",
      waste: "Fire Payi (%)",
    },
    resultLabels: {
      tileArea: "1 fayansin alani",
      totalArea: "Fire dahil toplam alan",
      count: "Gereken fayans adedi",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
  },
  en: {
    labels: {
      area: "Area to Cover (m2)",
      width: "Tile Width (cm)",
      height: "Tile Height (cm)",
      waste: "Waste Allowance (%)",
    },
    resultLabels: {
      tileArea: "Area of one tile",
      totalArea: "Total area with waste",
      count: "Required tile count",
    },
    emptyState: "Enter valid values to see the result.",
  },
  fr: {
    labels: {
      area: "Surface à couvrir (m²)",
      width: "Largeur du carreau (cm)",
      height: "Hauteur du carreau (cm)",
      waste: "Marge de perte (%)",
    },
    resultLabels: {
      tileArea: "Surface d'un carreau",
      totalArea: "Surface totale avec perte",
      count: "Nombre de carreaux nécessaire",
    },
    emptyState: "Saisissez des valeurs valides pour voir le résultat.",
  },
  es: {
    labels: {
      area: "Superficie a cubrir (m²)",
      width: "Ancho de la baldosa (cm)",
      height: "Alto de la baldosa (cm)",
      waste: "Margen de desperdicio (%)",
    },
    resultLabels: {
      tileArea: "Superficie de una baldosa",
      totalArea: "Superficie total con desperdicio",
      count: "Cantidad de baldosas necesaria",
    },
    emptyState: "Introduce valores válidos para ver el resultado.",
  },
  "es-419": {
    labels: {
      area: "Superficie a cubrir (m²)",
      width: "Ancho de la baldosa (cm)",
      height: "Alto de la baldosa (cm)",
      waste: "Margen de desperdicio (%)",
    },
    resultLabels: {
      tileArea: "Superficie de una baldosa",
      totalArea: "Superficie total con desperdicio",
      count: "Cantidad de baldosas necesaria",
    },
    emptyState: "Ingresa valores válidos para ver el resultado.",
  },
  pt: {
    labels: {
      area: "Área a revestir (m²)",
      width: "Largura do piso (cm)",
      height: "Altura do piso (cm)",
      waste: "Margem de perda (%)",
    },
    resultLabels: {
      tileArea: "Área de uma peça",
      totalArea: "Área total com perda",
      count: "Quantidade de peças necessária",
    },
    emptyState: "Digite valores válidos para ver o resultado.",
  },
  it: {
    labels: {
      area: "Superficie da rivestire (m²)",
      width: "Larghezza della piastrella (cm)",
      height: "Altezza della piastrella (cm)",
      waste: "Margine di sfrido (%)",
    },
    resultLabels: {
      tileArea: "Superficie di una piastrella",
      totalArea: "Superficie totale con sfrido",
      count: "Numero di piastrelle necessarie",
    },
    emptyState: "Inserisci valori validi per vedere il risultato.",
  },
  nl: {
    labels: {
      area: "Te betegelen oppervlak (m²)",
      width: "Breedte van de tegel (cm)",
      height: "Hoogte van de tegel (cm)",
      waste: "Snijverlies (%)",
    },
    resultLabels: {
      tileArea: "Oppervlak van één tegel",
      totalArea: "Totaal oppervlak inclusief verlies",
      count: "Benodigd aantal tegels",
    },
    emptyState: "Voer geldige waarden in om het resultaat te zien.",
  },
  sv: {
    labels: {
      area: "Yta att täcka (m²)",
      width: "Plattans bredd (cm)",
      height: "Plattans höjd (cm)",
      waste: "Spillmarginal (%)",
    },
    resultLabels: {
      tileArea: "Yta för en platta",
      totalArea: "Total yta inklusive spill",
      count: "Antal plattor som behövs",
    },
    emptyState: "Ange giltiga värden för att se resultatet.",
  },
  no: {
    labels: {
      area: "Areal som skal dekkes (m²)",
      width: "Flisens bredde (cm)",
      height: "Flisens høyde (cm)",
      waste: "Svinnmargin (%)",
    },
    resultLabels: {
      tileArea: "Areal for én flis",
      totalArea: "Totalt areal med svinn",
      count: "Antall fliser som trengs",
    },
    emptyState: "Angi gyldige verdier for å se resultatet.",
  },
  da: {
    labels: {
      area: "Areal der skal dækkes (m²)",
      width: "Flisens bredde (cm)",
      height: "Flisens højde (cm)",
      waste: "Spildmargin (%)",
    },
    resultLabels: {
      tileArea: "Areal af én flise",
      totalArea: "Samlet areal inkl. spild",
      count: "Antal fliser der skal bruges",
    },
    emptyState: "Indtast gyldige værdier for at se resultatet.",
  },
  de: {
    labels: {
      area: "Zu belegende Flaeche (m2)",
      width: "Fliesenbreite (cm)",
      height: "Fliesenhoehe (cm)",
      waste: "Verschnitt (%)",
    },
    resultLabels: {
      tileArea: "Flaeche einer Fliese",
      totalArea: "Gesamtflaeche inklusive Verschnitt",
      count: "Benoetigte Anzahl Fliesen",
    },
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
  },
  ar: {
    labels: {
      area: "المساحة المطلوب تغطيتها (م2)",
      width: "عرض البلاطة (سم)",
      height: "طول البلاطة (سم)",
      waste: "نسبة الهدر (%)",
    },
    resultLabels: {
      tileArea: "مساحة البلاطة الواحدة",
      totalArea: "إجمالي المساحة مع الهدر",
      count: "عدد البلاط المطلوب",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
  },
uz: {
    labels: {
      area: "Qoplanadigan Maydon (m2)",
      width: "Kafel Eni (sm)",
      height: "Kafel Bo'yi (sm)",
      waste: "Zaxira Foizi (%)",
    },
    resultLabels: {
      tileArea: "1 kafelning maydoni",
      totalArea: "Zaxira bilan jami maydon",
      count: "Kerakli kafel soni",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri qiymatlar kiriting.",
  },
bn: {
    labels: {
      area: "যে ক্ষেত্রফল ঢাকতে হবে (বর্গমিটার)",
      width: "টাইলের প্রস্থ (সেমি)",
      height: "টাইলের উচ্চতা (সেমি)",
      waste: "অপচয়ের মার্জিন (%)",
    },
    resultLabels: {
      tileArea: "একটি টাইলের ক্ষেত্রফল",
      totalArea: "অপচয়সহ মোট ক্ষেত্রফল",
      count: "প্রয়োজনীয় টাইলের সংখ্যা",
    },
    emptyState: "ফলাফল দেখতে বৈধ মান লিখুন।",
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

function formatArea(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} m2`;
}

export default function TileCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const [area, setArea] = useState("20");
  const [tileWidthCm, setTileWidthCm] = useState("60");
  const [tileHeightCm, setTileHeightCm] = useState("60");
  const [wastePercent, setWastePercent] = useState("10");

  const input: TileCalculatorInput = useMemo(
    () => ({
      area: parseNumericValue(area),
      tileWidthCm: parseNumericValue(tileWidthCm),
      tileHeightCm: parseNumericValue(tileHeightCm),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [area, tileWidthCm, tileHeightCm, wastePercent]
  );

  const result = useMemo(() => calculateTileNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.area}</span>
          <input
            inputMode="decimal"
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.width}</span>
          <input
            inputMode="decimal"
            type="text"
            value={tileWidthCm}
            onChange={(event) => setTileWidthCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.height}</span>
          <input
            inputMode="decimal"
            type="text"
            value={tileHeightCm}
            onChange={(event) => setTileHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.waste}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wastePercent}
            onChange={(event) => setWastePercent(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.tileArea}</span>
                <strong>{formatArea(result.tileAreaM2, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalArea}</span>
                <strong>{formatArea(result.requiredAreaWithWaste, locale)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              {copy.resultLabels.count}: <strong>{result.requiredTileCount}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
