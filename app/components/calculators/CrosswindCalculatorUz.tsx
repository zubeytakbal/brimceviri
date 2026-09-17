"use client";

import { useMemo, useState } from "react";
import {
  calculateCrosswind,
  type CrosswindInput,
} from "../../converter/crosswindCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

const sideLabelsUz = {
  sag: "o'ngdan",
  sol: "chapdan",
  yok: "yo'q (to'liq bosh/quyruq shamoli)",
};

const headwindLabelsUz = {
  bas: "bosh shamoli",
  kuyruk: "quyruq shamoli",
  yok: "yo'q (to'liq yon shamol)",
};

export default function CrosswindCalculatorUz() {
  const [windDirection, setWindDirection] = useState("270");
  const [windSpeed, setWindSpeed] = useState("15");
  const [runwayHeading, setRunwayHeading] = useState("240");

  const input: CrosswindInput = useMemo(
    () => ({
      windDirectionDeg: parseNumericValue(windDirection),
      windSpeedKnot: parseNumericValue(windSpeed),
      runwayHeadingDeg: parseNumericValue(runwayHeading),
    }),
    [windDirection, windSpeed, runwayHeading]
  );

  const result = useMemo(() => calculateCrosswind(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Shamol Yo&apos;nalishi (daraja)</span>
          <input
            inputMode="decimal"
            type="text"
            value={windDirection}
            onChange={(event) => setWindDirection(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Shamol Tezligi (uzel)</span>
          <input
            inputMode="decimal"
            type="text"
            value={windSpeed}
            onChange={(event) => setWindSpeed(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Piste Yo&apos;nalishi / Parvoz Boshi (daraja)</span>
          <input
            inputMode="decimal"
            type="text"
            value={runwayHeading}
            onChange={(event) => setRunwayHeading(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri qiymatlar kiritib yon shamol komponentini ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yon Shamol Komponenti</span>
              <strong>
                {formatNumber(result.crosswindKnot)} uzel (
                {sideLabelsUz[result.crosswindSide]})
              </strong>
            </div>
            <div>
              <span>Bosh/Quyruq Shamol Komponenti</span>
              <strong>
                {formatNumber(result.headwindKnot)} uzel (
                {headwindLabelsUz[result.headwindType]})
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Piste yo&apos;nalishi piste raqamining 10 barobariga teng
        (masalan Piste 24 → 240°). Uchayotgan vositangizning haqiqiy
        yon shamol chegarasini har doim ishlab chiqaruvchining
        samaradorlik qo&apos;llanmasidan (POH/AFM) tasdiqlang.
      </p>
    </div>
  );
}
