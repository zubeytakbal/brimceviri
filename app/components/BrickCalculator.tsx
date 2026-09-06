"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateBrickNeeds,
  type BrickCalculatorInput,
} from "../converter/brickCalculator";

const copyByLocale: Record<
  Locale,
  {
    labels: {
      wallArea: string;
      brickWidth: string;
      brickHeight: string;
      joint: string;
      waste: string;
    };
    resultLabels: {
      brickArea: string;
      totalArea: string;
      count: string;
    };
    emptyState: string;
  }
> = {
  tr: {
    labels: {
      wallArea: "Duvar Alani (m2)",
      brickWidth: "Tugla Eni (cm)",
      brickHeight: "Tugla Yuksekligi (cm)",
      joint: "Derz Kalinligi (mm)",
      waste: "Fire Payi (%)",
    },
    resultLabels: {
      brickArea: "1 tuglanin derzli alani",
      totalArea: "Fire dahil toplam alan",
      count: "Gereken tugla adedi",
    },
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
  },
  en: {
    labels: {
      wallArea: "Wall Area (m2)",
      brickWidth: "Brick Width (cm)",
      brickHeight: "Brick Height (cm)",
      joint: "Joint Thickness (mm)",
      waste: "Waste Allowance (%)",
    },
    resultLabels: {
      brickArea: "Area of one brick with joint",
      totalArea: "Total area with waste",
      count: "Required brick count",
    },
    emptyState: "Enter valid values to see the result.",
  },
  de: {
    labels: {
      wallArea: "Wandflaeche (m2)",
      brickWidth: "Ziegelbreite (cm)",
      brickHeight: "Ziegelhoehe (cm)",
      joint: "Fugenstaerke (mm)",
      waste: "Verschnitt (%)",
    },
    resultLabels: {
      brickArea: "Flaeche eines Ziegels mit Fuge",
      totalArea: "Gesamtflaeche inklusive Verschnitt",
      count: "Benoetigte Anzahl Ziegel",
    },
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
  },
  ar: {
    labels: {
      wallArea: "مساحة الجدار (م2)",
      brickWidth: "عرض الطوبة (سم)",
      brickHeight: "ارتفاع الطوبة (سم)",
      joint: "سماكة الفاصل (مم)",
      waste: "نسبة الهدر (%)",
    },
    resultLabels: {
      brickArea: "مساحة الطوبة مع الفاصل",
      totalArea: "إجمالي المساحة مع الهدر",
      count: "عدد الطوب المطلوب",
    },
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
  },
uz: {
    labels: {
      wallArea: "Wall Area (m2)",
      brickWidth: "Brick Width (cm)",
      brickHeight: "Brick Height (cm)",
      joint: "Joint Thickness (mm)",
      waste: "Waste Allowance (%)",
    },
    resultLabels: {
      brickArea: "Area of one brick with joint",
      totalArea: "Total area with waste",
      count: "Required brick count",
    },
    emptyState: "Enter valid values to see the result.",
  },
bn: {
    labels: {
      wallArea: "Wall Area (m2)",
      brickWidth: "Brick Width (cm)",
      brickHeight: "Brick Height (cm)",
      joint: "Joint Thickness (mm)",
      waste: "Waste Allowance (%)",
    },
    resultLabels: {
      brickArea: "Area of one brick with joint",
      totalArea: "Total area with waste",
      count: "Required brick count",
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
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 3 })} m2`;
}

export default function BrickCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [wallArea, setWallArea] = useState("20");
  const [brickWidthCm, setBrickWidthCm] = useState("19");
  const [brickHeightCm, setBrickHeightCm] = useState("13.5");
  const [jointMm, setJointMm] = useState("10");
  const [wastePercent, setWastePercent] = useState("5");

  const input: BrickCalculatorInput = useMemo(
    () => ({
      wallArea: parseNumericValue(wallArea),
      brickWidthCm: parseNumericValue(brickWidthCm),
      brickHeightCm: parseNumericValue(brickHeightCm),
      jointMm: parseNumericValue(jointMm),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [wallArea, brickWidthCm, brickHeightCm, jointMm, wastePercent]
  );

  const result = useMemo(() => calculateBrickNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.wallArea}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallArea}
            onChange={(event) => setWallArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.brickWidth}</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickWidthCm}
            onChange={(event) => setBrickWidthCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.brickHeight}</span>
          <input
            inputMode="decimal"
            type="text"
            value={brickHeightCm}
            onChange={(event) => setBrickHeightCm(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.joint}</span>
          <input
            inputMode="decimal"
            type="text"
            value={jointMm}
            onChange={(event) => setJointMm(event.target.value)}
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
                <span>{copy.resultLabels.brickArea}</span>
                <strong>{formatArea(result.brickUnitAreaM2, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.totalArea}</span>
                <strong>{formatArea(result.requiredAreaWithWaste, locale)}</strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              {copy.resultLabels.count}: <strong>{result.requiredBrickCount}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
