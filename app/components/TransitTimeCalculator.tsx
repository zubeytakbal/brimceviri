"use client";

import { useMemo, useState } from "react";
import {
  calculateTransitTime,
  type DistanceUnit,
  type SpeedUnit,
  type TransitTimeInput,
} from "../converter/transitTimeCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

const distanceUnitLabels: Record<DistanceUnit, string> = {
  nm: "Deniz Mili (nm)",
  km: "Kilometre (km)",
  mi: "Kara Mili (mi)",
};

const speedUnitLabels: Record<SpeedUnit, string> = {
  knot: "Knot (nm/saat)",
  "km-h": "km/saat",
  mph: "mph",
};

export default function TransitTimeCalculator() {
  const [distanceValue, setDistanceValue] = useState("120");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("nm");
  const [speedValue, setSpeedValue] = useState("15");
  const [speedUnit, setSpeedUnit] = useState<SpeedUnit>("knot");

  const input: TransitTimeInput = useMemo(
    () => ({
      distanceValue: parseNumericValue(distanceValue),
      distanceUnit,
      speedValue: parseNumericValue(speedValue),
      speedUnit,
    }),
    [distanceValue, distanceUnit, speedValue, speedUnit]
  );

  const result = useMemo(() => calculateTransitTime(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Mesafe</span>
          <input
            inputMode="decimal"
            type="text"
            value={distanceValue}
            onChange={(event) => setDistanceValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Mesafe Birimi</span>
          <select
            value={distanceUnit}
            onChange={(event) =>
              setDistanceUnit(event.target.value as DistanceUnit)
            }
          >
            {(Object.keys(distanceUnitLabels) as DistanceUnit[]).map(
              (unit) => (
                <option key={unit} value={unit}>
                  {distanceUnitLabels[unit]}
                </option>
              )
            )}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Hız</span>
          <input
            inputMode="decimal"
            type="text"
            value={speedValue}
            onChange={(event) => setSpeedValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Hız Birimi</span>
          <select
            value={speedUnit}
            onChange={(event) => setSpeedUnit(event.target.value as SpeedUnit)}
          >
            {(Object.keys(speedUnitLabels) as SpeedUnit[]).map((unit) => (
              <option key={unit} value={unit}>
                {speedUnitLabels[unit]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli mesafe ve hız girerek seyir süresini görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Seyir Süresi</span>
              <strong>
                {result.hours} saat {result.minutes} dakika
              </strong>
            </div>
            <div>
              <span>Toplam Saat (ondalık)</span>
              <strong>
                {result.totalHours.toLocaleString("tr-TR", {
                  maximumFractionDigits: 2,
                })}{" "}
                saat
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
