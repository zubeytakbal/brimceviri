"use client";

import { useMemo, useState } from "react";
import {
  calculateGreatCircle,
  type GreatCircleInput,
} from "../../converter/greatCircleCalculator";

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

export default function GreatCircleCalculatorUz() {
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
          <span>1-Nuqta Kenglik (°, Sh/J uchun +/−)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lat1}
            onChange={(event) => setLat1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>1-Nuqta Uzunlik (°, Sh/G uchun +/−)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lon1}
            onChange={(event) => setLon1(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>2-Nuqta Kenglik (°)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lat2}
            onChange={(event) => setLat2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>2-Nuqta Uzunlik (°)</span>
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
            To&apos;g&apos;ri kenglik (-90 dan 90° gacha) va uzunlik
            (-180 dan 180° gacha) qiymatlarini kiritib masofani
            ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Katta Doira Masofasi</span>
              <strong>{formatNumber(result.distanceNm)} dengiz mili</strong>
            </div>
            <div>
              <span>Kilometr Ko&apos;rinishi</span>
              <strong>{formatNumber(result.distanceKm)} km</strong>
            </div>
            <div>
              <span>Boshlang&apos;ich Yo&apos;nalish (Initial Bearing)</span>
              <strong>{formatNumber(result.initialBearingDeg)}°</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Shimoliy kengliklar va sharqiy uzunliklar musbat, janubiy
        kengliklar va g&apos;arbiy uzunliklar manfiy sifatida
        kiriting (masalan 40,19°Sh = 40.19, 29,06°Sh = 29.06).
        Boshlang&apos;ich yo&apos;nalish katta doira bo&apos;ylab
        harakatlanganda doimiy o&apos;zgaradi; bu qiymat faqat
        jo&apos;nash paytidagi yo&apos;nalishdir.
      </p>
    </div>
  );
}
