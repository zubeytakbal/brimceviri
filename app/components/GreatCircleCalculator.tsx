"use client";

import { useMemo, useState } from "react";
import {
  calculateGreatCircle,
  type GreatCircleInput,
} from "../converter/greatCircleCalculator";

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

export default function GreatCircleCalculator() {
  const [lat1, setLat1] = useState("41.0082");
  const [lon1, setLon1] = useState("28.9784");
  const [lat2, setLat2] = useState("40.1885");
  const [lon2, setLon2] = useState("29.0610");

  const input: GreatCircleInput = useMemo(
    () => ({
      lat1Deg: parseNumericValue(lat1),
      lon1Deg: parseNumericValue(lon1),
      lat2Deg: parseNumericValue(lat2),
      lon2Deg: parseNumericValue(lon2),
    }),
    [lat1, lon1, lat2, lon2]
  );

  const result = useMemo(() => calculateGreatCircle(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>1. Nokta Enlem (°, K/G için +/−)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lat1}
            onChange={(event) => setLat1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>1. Nokta Boylam (°, D/B için +/−)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lon1}
            onChange={(event) => setLon1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>2. Nokta Enlem (°)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lat2}
            onChange={(event) => setLat2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>2. Nokta Boylam (°)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lon2}
            onChange={(event) => setLon2(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli enlem (-90 ile 90°) ve boylam (-180 ile 180°)
            değerleri girerek mesafeyi görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Büyük Daire Mesafesi</span>
              <strong>{formatNumber(result.distanceNm)} deniz mili</strong>
            </div>
            <div>
              <span>Kilometre Karşılığı</span>
              <strong>{formatNumber(result.distanceKm)} km</strong>
            </div>
            <div>
              <span>Başlangıç Rotası (Initial Bearing)</span>
              <strong>{formatNumber(result.initialBearingDeg)}°</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Kuzey enlemleri ve doğu boylamları pozitif, güney enlemleri ve
        batı boylamları negatif olarak gir (örn. 40,19°K = 40.19,
        29,06°D = 29.06). Başlangıç rotası, büyük daire üzerinde
        seyrederken sürekli değişir; bu değer yalnızca kalkış anındaki
        rotadır.
      </p>
    </div>
  );
}
