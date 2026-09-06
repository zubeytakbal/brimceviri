"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateTileNeeds,
  type TileCalculatorInput,
} from "../converter/tileCalculator";

const copyByLocale: Record<
  Locale,
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
bn: {
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
  const copy = copyByLocale[locale];
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
