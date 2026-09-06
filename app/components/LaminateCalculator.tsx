"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateLaminateNeeds,
  type LaminateCalculatorInput,
} from "../converter/laminateCalculator";

type SupportedLocale = "tr" | "en";

type LaminateCopy = {
  fieldArea: string;
  fieldPackageArea: string;
  fieldWaste: string;
  emptyState: string;
  resultTotalArea: string;
  packageCountLabel: (count: number) => string;
};

const copyByLocale: Record<SupportedLocale, LaminateCopy> = {
  tr: {
    fieldArea: "Kaplanacak Alan (m²)",
    fieldPackageArea: "Paket İçi Alan (m²)",
    fieldWaste: "Fire Payı (%)",
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultTotalArea: "Fire dahil toplam alan",
    packageCountLabel: (count) => `Gereken paket sayısı: ${count} paket`,
  },
  en: {
    fieldArea: "Area to Cover (m²)",
    fieldPackageArea: "Area per Package (m²)",
    fieldWaste: "Waste Allowance (%)",
    emptyState: "Enter valid values to see the result.",
    resultTotalArea: "Total area including waste",
    packageCountLabel: (count) => `Packages needed: ${count}`,
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

export default function LaminateCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [area, setArea] = useState("20");
  const [packageAreaM2, setPackageAreaM2] = useState("2.222");
  const [wastePercent, setWastePercent] = useState("10");

  const input: LaminateCalculatorInput = useMemo(
    () => ({
      area: parseNumericValue(area),
      packageAreaM2: parseNumericValue(packageAreaM2),
      wastePercent: parseNumericValue(wastePercent),
    }),
    [area, packageAreaM2, wastePercent]
  );

  const result = useMemo(() => calculateLaminateNeeds(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.fieldArea}</span>
          <input
            inputMode="decimal"
            type="text"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.fieldPackageArea}</span>
          <input
            inputMode="decimal"
            type="text"
            value={packageAreaM2}
            onChange={(event) => setPackageAreaM2(event.target.value)}
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
                <span>{copy.resultTotalArea}</span>
                <strong>
                  {formatArea(result.requiredAreaWithWaste, locale)}
                </strong>
              </div>
            </div>

            <p className="paint-calculator-liters">
              <strong>{copy.packageCountLabel(result.requiredPackageCount)}</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
