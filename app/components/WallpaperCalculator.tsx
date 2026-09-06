"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateWallpaperNeeds,
  type WallpaperCalculatorInput,
} from "../converter/wallpaperCalculator";

type SupportedLocale = "tr" | "en";

type WallpaperCopy = {
  fieldWallWidth: (index: number) => string;
  fieldCeilingHeight: string;
  fieldRollWidth: string;
  fieldRollLength: string;
  fieldWaste: string;
  emptyState: string;
  resultTotalWallArea: string;
  resultRollArea: string;
  resultTotalWithWaste: string;
  rollCountLabel: (count: number) => string;
};

const copyByLocale: Record<SupportedLocale, WallpaperCopy> = {
  tr: {
    fieldWallWidth: (index) => `Duvar ${index} Genişliği (m)`,
    fieldCeilingHeight: "Tavan Yüksekliği (m)",
    fieldRollWidth: "Rulo Eni (cm)",
    fieldRollLength: "Rulo Uzunluğu (m)",
    fieldWaste: "Fire Payı (%)",
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultTotalWallArea: "Toplam Duvar Alanı",
    resultRollArea: "1 Rulonun Alanı",
    resultTotalWithWaste: "Fire Dahil Toplam Alan",
    rollCountLabel: (count) => `Gereken rulo sayısı: ${count} rulo`,
  },
  en: {
    fieldWallWidth: (index) => `Wall ${index} Width (m)`,
    fieldCeilingHeight: "Ceiling Height (m)",
    fieldRollWidth: "Roll Width (cm)",
    fieldRollLength: "Roll Length (m)",
    fieldWaste: "Waste Allowance (%)",
    emptyState: "Enter valid values to see the result.",
    resultTotalWallArea: "Total Wall Area",
    resultRollArea: "Area per Roll",
    resultTotalWithWaste: "Total Area Including Waste",
    rollCountLabel: (count) => `Rolls needed: ${count}`,
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

function formatArea(value: number, locale: SupportedLocale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} m²`;
}

export default function WallpaperCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [wallWidth1, setWallWidth1] = useState("4");
  const [wallWidth2, setWallWidth2] = useState("3");
  const [wallWidth3, setWallWidth3] = useState("4");
  const [wallWidth4, setWallWidth4] = useState("3");
  const [wallHeight, setWallHeight] = useState("2.5");
  const [rollWidthCm, setRollWidthCm] = useState("53");
  const [rollLengthM, setRollLengthM] = useState("10.05");
  const [wastePercent, setWastePercent] = useState("15");

  const input: WallpaperCalculatorInput = useMemo(
    () => ({
      wallWidthsM: [wallWidth1, wallWidth2, wallWidth3, wallWidth4].map(
        parseNumericValue
      ),
      wallHeightM: parseNumericValue(wallHeight),
      rollWidthCm: parseNumericValue(rollWidthCm),
      rollLengthM: parseNumericValue(rollLengthM),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [wallWidth1, wallWidth2, wallWidth3, wallWidth4, wallHeight, rollWidthCm, rollLengthM, wastePercent]
  );

  const result = useMemo(() => calculateWallpaperNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.fieldWallWidth(1)}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth1}
            onChange={(event) => setWallWidth1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldWallWidth(2)}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth2}
            onChange={(event) => setWallWidth2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldWallWidth(3)}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth3}
            onChange={(event) => setWallWidth3(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldWallWidth(4)}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallWidth4}
            onChange={(event) => setWallWidth4(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldCeilingHeight}</span>
          <input
            inputMode="decimal"
            type="text"
            value={wallHeight}
            onChange={(event) => setWallHeight(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldRollWidth}</span>
          <input
            inputMode="decimal"
            type="text"
            value={rollWidthCm}
            onChange={(event) => setRollWidthCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldRollLength}</span>
          <input
            inputMode="decimal"
            type="text"
            value={rollLengthM}
            onChange={(event) => setRollLengthM(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>{copy.fieldWaste}</span>
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
                <span>{copy.resultTotalWallArea}</span>
                <strong>{formatArea(result.totalWallAreaM2, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultRollArea}</span>
                <strong>{formatArea(result.rollAreaM2, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultTotalWithWaste}</span>
                <strong>
                  {formatArea(result.requiredAreaWithWaste, locale)}
                </strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              <strong>{copy.rollCountLabel(result.requiredRollCount)}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
