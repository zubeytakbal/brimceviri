"use client";

import { useMemo, useState } from "react";
import {
  calculateFromKmPerLiter,
  calculateFromLitersPer100Km,
  calculateTripCost,
  type FuelConsumptionResult,
} from "../converter/fuelConsumptionCalculator";

type InputMode = "km-per-liter" | "liters-per-100km";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

function formatCurrency(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺`;
}

export default function FuelConsumptionCalculator() {
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
          <span>Hangi değeri biliyorsun?</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${mode === "liters-per-100km" ? " is-active" : ""}`}
              onClick={() => setMode("liters-per-100km")}
            >
              100 km&apos;de Kaç Litre
            </button>
            <button
              type="button"
              className={`engineering-target-button${mode === "km-per-liter" ? " is-active" : ""}`}
              onClick={() => setMode("km-per-liter")}
            >
              1 Litreyle Kaç km
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {mode === "liters-per-100km" ? (
            <label className="category-general-converter-field">
              <span>Yakıt Tüketimi (lt/100km)</span>
              <input
                inputMode="decimal"
                type="text"
                value={litersPer100KmInput}
                onChange={(event) => setLitersPer100KmInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Yakıt Tüketimi (km/lt)</span>
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
          <strong>Geçerli bir yakıt tüketimi değeri girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>km/lt</span>
              <strong>{formatNumber(result.kmPerLiter)} km/lt</strong>
            </div>
            <div>
              <span>lt/100km</span>
              <strong>{formatNumber(result.litersPer100Km)} lt/100km</strong>
            </div>
            <div>
              <span>mpg (ABD)</span>
              <strong>{formatNumber(result.mpgUs, 1)} mpg</strong>
            </div>
            <div>
              <span>mpg (İngiltere)</span>
              <strong>{formatNumber(result.mpgUk, 1)} mpg</strong>
            </div>
          </div>
        )}
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Yolculuk maliyeti hesapla</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Yolculuk Mesafesi (km)</span>
            <input
              inputMode="decimal"
              type="text"
              value={tripDistance}
              onChange={(event) => setTripDistance(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Yakıt Fiyatı (₺/lt)</span>
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
            <strong>Geçerli mesafe ve fiyat girerek maliyeti görebilirsin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Gereken Yakıt</span>
                <strong>{formatNumber(tripResult.litersNeeded)} lt</strong>
              </div>
              <div>
                <span>Toplam Maliyet</span>
                <strong>{formatCurrency(tripResult.totalCost)}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
