"use client";

import { useMemo, useState } from "react";
import {
  calculateCrosswind,
  type CrosswindInput,
} from "../converter/crosswindCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const sideLabels = {
  sag: "sağdan",
  sol: "soldan",
  yok: "yok (tam baş/kuyruk rüzgarı)",
};

const headwindLabels = {
  bas: "baş rüzgarı",
  kuyruk: "kuyruk rüzgarı",
  yok: "yok (tam yan rüzgar)",
};

export default function CrosswindCalculator() {
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
          <span>Rüzgar Yönü (derece)</span>
          <input
            inputMode="decimal"
            type="text"
            value={windDirection}
            onChange={(event) => setWindDirection(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Rüzgar Hızı (knot)</span>
          <input
            inputMode="decimal"
            type="text"
            value={windSpeed}
            onChange={(event) => setWindSpeed(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Pist Yönü / Uçuş Başı (derece)</span>
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
            Geçerli değerler girerek yan rüzgar bileşenini görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yan Rüzgar Bileşeni</span>
              <strong>
                {formatNumber(result.crosswindKnot)} knot (
                {sideLabels[result.crosswindSide]})
              </strong>
            </div>
            <div>
              <span>Baş/Kuyruk Rüzgar Bileşeni</span>
              <strong>
                {formatNumber(result.headwindKnot)} knot (
                {headwindLabels[result.headwindType]})
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Pist yönü, pist numarasının 10 katıdır (örn. Pist 24 → 240°).
        Uçağının/uçtuğun aracın gerçek yan rüzgar limitini her zaman
        üreticinin performans el kitabından (POH/AFM) teyit et.
      </p>
    </div>
  );
}
