"use client";

import { useMemo, useState } from "react";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateFromKmPerLiter,
  calculateFromLitersPer100Km,
  calculateTripCost,
  type FuelConsumptionResult,
} from "../converter/fuelConsumptionCalculator";

type SupportedLocale = "tr" | "en";

type FuelCopy = {
  modeLabel: string;
  modeLiters100km: string;
  modeKmPerLiter: string;
  fieldLiters100km: string;
  fieldKmPerLiter: string;
  emptyState: string;
  resultLabels: {
    kmPerLiter: string;
    litersPer100km: string;
    mpgUs: string;
    mpgUk: string;
  };
  tripHeading: string;
  fieldDistance: string;
  fieldPrice: string;
  tripEmptyState: string;
  tripResultLabels: {
    litersNeeded: string;
    totalCost: string;
  };
};

const copyByLocale: Record<SupportedLocale, FuelCopy> = {
  tr: {
    modeLabel: "Hangi değeri biliyorsun?",
    modeLiters100km: "100 km'de Kaç Litre",
    modeKmPerLiter: "1 Litreyle Kaç km",
    fieldLiters100km: "Yakıt Tüketimi (lt/100km)",
    fieldKmPerLiter: "Yakıt Tüketimi (km/lt)",
    emptyState:
      "Geçerli bir yakıt tüketimi değeri girerek sonucu görebilirsin.",
    resultLabels: {
      kmPerLiter: "km/lt",
      litersPer100km: "lt/100km",
      mpgUs: "mpg (ABD)",
      mpgUk: "mpg (İngiltere)",
    },
    tripHeading: "Yolculuk maliyeti hesapla",
    fieldDistance: "Yolculuk Mesafesi (km)",
    fieldPrice: "Yakıt Fiyatı (₺/lt)",
    tripEmptyState: "Geçerli mesafe ve fiyat girerek maliyeti görebilirsin.",
    tripResultLabels: {
      litersNeeded: "Gereken Yakıt",
      totalCost: "Toplam Maliyet",
    },
  },
  en: {
    modeLabel: "Which value do you know?",
    modeLiters100km: "Liters per 100 km",
    modeKmPerLiter: "km per Liter",
    fieldLiters100km: "Fuel Consumption (L/100km)",
    fieldKmPerLiter: "Fuel Consumption (km/L)",
    emptyState: "Enter a valid fuel consumption value to see the result.",
    resultLabels: {
      kmPerLiter: "km/L",
      litersPer100km: "L/100km",
      mpgUs: "mpg (US)",
      mpgUk: "mpg (UK)",
    },
    tripHeading: "Calculate trip cost",
    fieldDistance: "Trip Distance (km)",
    fieldPrice: "Fuel Price (EUR/L)",
    tripEmptyState: "Enter a valid distance and price to see the cost.",
    tripResultLabels: {
      litersNeeded: "Fuel Needed",
      totalCost: "Total Cost",
    },
  },
};

type InputMode = "km-per-liter" | "liters-per-100km";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(
  value: number,
  locale: SupportedLocale,
  maximumFractionDigits = 2
) {
  return formatLocalizedNumber(value, locale, { maximumFractionDigits });
}

function formatCurrency(value: number, locale: SupportedLocale) {
  const formatted = formatLocalizedNumber(value, locale, {
    maximumFractionDigits: 2,
  });

  return locale === "tr" ? `${formatted} ₺` : `${formatted} EUR`;
}

export default function FuelConsumptionCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [mode, setMode] = useState<InputMode>("liters-per-100km");
  const [kmPerLiterInput, setKmPerLiterInput] = useState("14");
  const [litersPer100KmInput, setLitersPer100KmInput] = useState("7");

  const [tripDistance, setTripDistance] = useState("500");
  const [pricePerLiter, setPricePerLiter] = useState("45");

  const result: FuelConsumptionResult | null = useMemo(() => {
    if (mode === "km-per-liter") {
      return calculateFromKmPerLiter(parseNumericValue(kmPerLiterInput));
    }

    return calculateFromLitersPer100Km(parseNumericValue(litersPer100KmInput));
  }, [mode, kmPerLiterInput, litersPer100KmInput]);

  const tripResult = useMemo(() => {
    if (!result) {
      return null;
    }

    return calculateTripCost({
      distanceKm: parseNumericValue(tripDistance),
      litersPer100Km: result.litersPer100Km,
      pricePerLiter: parseNumericValue(pricePerLiter),
    });
  }, [result, tripDistance, pricePerLiter]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.modeLabel}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "liters-per-100km" ? " is-active" : ""}`}
              onClick={() => setMode("liters-per-100km")}
            >
              {copy.modeLiters100km}
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "km-per-liter" ? " is-active" : ""}`}
              onClick={() => setMode("km-per-liter")}
            >
              {copy.modeKmPerLiter}
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {mode === "liters-per-100km" ? (
            <label className="category-general-converter-field">
              <span>{copy.fieldLiters100km}</span>
              <input
                inputMode="decimal"
                type="text"
                value={litersPer100KmInput}
                onChange={(event) => setLitersPer100KmInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>{copy.fieldKmPerLiter}</span>
              <input
                inputMode="decimal"
                type="text"
                value={kmPerLiterInput}
                onChange={(event) => setKmPerLiterInput(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultLabels.kmPerLiter}</span>
              <strong>
                {formatNumber(result.kmPerLiter, locale)}{" "}
                {copy.resultLabels.kmPerLiter}
              </strong>
            </div>
            <div>
              <span>{copy.resultLabels.litersPer100km}</span>
              <strong>
                {formatNumber(result.litersPer100Km, locale)}{" "}
                {copy.resultLabels.litersPer100km}
              </strong>
            </div>
            <div>
              <span>{copy.resultLabels.mpgUs}</span>
              <strong>{formatNumber(result.mpgUs, locale, 1)} mpg</strong>
            </div>
            <div>
              <span>{copy.resultLabels.mpgUk}</span>
              <strong>{formatNumber(result.mpgUk, locale, 1)} mpg</strong>
            </div>
          </div>
        )}
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.tripHeading}</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{copy.fieldDistance}</span>
            <input
              inputMode="decimal"
              type="text"
              value={tripDistance}
              onChange={(event) => setTripDistance(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>{copy.fieldPrice}</span>
            <input
              inputMode="decimal"
              type="text"
              value={pricePerLiter}
              onChange={(event) => setPricePerLiter(event.target.value)}
            />
          </label>
        </div>

        <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
          {!tripResult ? (
            <strong>{copy.tripEmptyState}</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.tripResultLabels.litersNeeded}</span>
                <strong>
                  {formatNumber(tripResult.litersNeeded, locale)}{" "}
                  {locale === "tr" ? "lt" : "L"}
                </strong>
              </div>
              <div>
                <span>{copy.tripResultLabels.totalCost}</span>
                <strong>{formatCurrency(tripResult.totalCost, locale)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
