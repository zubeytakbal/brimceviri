"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateNaturalGasCost,
  type NaturalGasCalculatorInput,
} from "../converter/naturalGasCalculator";

type SupportedLocale = "tr" | "en";

type NaturalGasCopy = {
  fieldConsumption: string;
  fieldPrice: string;
  emptyState: string;
  resultTotalCost: string;
  resultEnergy: string;
  note: string;
};

const copyByLocale: Record<SupportedLocale, NaturalGasCopy> = {
  tr: {
    fieldConsumption: "Tüketim (m³)",
    fieldPrice: "Birim Fiyat (₺/m³)",
    emptyState: "Geçerli tüketim ve fiyat girerek sonucu görebilirsin.",
    resultTotalCost: "Toplam Maliyet",
    resultEnergy: "Yaklaşık Enerji Karşılığı",
    note: "Not: kWh karşılığı Türkiye ortalamasına göre yaklaşık bir değerdir; gerçek katsayı dağıtım bölgesine ve faturana göre değişebilir.",
  },
  en: {
    fieldConsumption: "Consumption (m³)",
    fieldPrice: "Unit Price (EUR/m³)",
    emptyState: "Enter a valid consumption and price to see the result.",
    resultTotalCost: "Total Cost",
    resultEnergy: "Approximate Energy Equivalent",
    note: "Note: the kWh equivalent is an approximate value; the actual conversion factor can vary by region and supplier.",
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

function formatCurrency(value: number, locale: SupportedLocale) {
  const formatted = formatLocalizedNumber(value, locale, {
    maximumFractionDigits: 2,
  });

  return locale === "tr" ? `${formatted} ₺` : `${formatted} EUR`;
}

export default function NaturalGasCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [consumptionM3, setConsumptionM3] = useState("100");
  const [pricePerM3, setPricePerM3] = useState("20");

  const input: NaturalGasCalculatorInput = useMemo(
    () => ({
      consumptionM3: parseNumericValue(consumptionM3),
      pricePerM3: parseNumericValue(pricePerM3),
    }),
    [consumptionM3, pricePerM3]
  );

  const result = useMemo(() => calculateNaturalGasCost(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.fieldConsumption}</span>
          <input
            inputMode="decimal"
            type="text"
            value={consumptionM3}
            onChange={(event) => setConsumptionM3(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.fieldPrice}</span>
          <input
            inputMode="decimal"
            type="text"
            value={pricePerM3}
            onChange={(event) => setPricePerM3(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultTotalCost}</span>
              <strong>{formatCurrency(result.totalCost, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultEnergy}</span>
              <strong>
                {formatLocalizedNumber(result.approximateKwh, locale, {
                  maximumFractionDigits: 0,
                })}{" "}
                kWh
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="paint-calculator-liters">{copy.note}</p>
    </div>
  );
}
