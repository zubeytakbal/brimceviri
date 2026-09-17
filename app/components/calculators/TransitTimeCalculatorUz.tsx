"use client";

import { useMemo, useState } from "react";
import {
  calculateTransitTime,
  type DistanceUnit,
  type SpeedUnit,
  type TransitTimeInput,
} from "../../converter/transitTimeCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

const distanceUnitLabelsUz: Record<DistanceUnit, string> = {
  nm: "Dengiz Mili (nm)",
  km: "Kilometr (km)",
  mi: "Quruqlik Mili (mi)",
};

const speedUnitLabelsUz: Record<SpeedUnit, string> = {
  knot: "Uzel (nm/soat)",
  "km-h": "km/soat",
  mph: "mph",
};

export default function TransitTimeCalculatorUz() {
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
          <span>Masofa</span>
          <input
            inputMode="decimal"
            type="text"
            value={distanceValue}
            onChange={(event) => setDistanceValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Masofa Birligi</span>
          <select
            value={distanceUnit}
            onChange={(event) =>
              setDistanceUnit(event.target.value as DistanceUnit)
            }
          >
            {(Object.keys(distanceUnitLabelsUz) as DistanceUnit[]).map(
              (unit) => (
                <option key={unit} value={unit}>
                  {distanceUnitLabelsUz[unit]}
                </option>
              )
            )}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Tezlik</span>
          <input
            inputMode="decimal"
            type="text"
            value={speedValue}
            onChange={(event) => setSpeedValue(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Tezlik Birligi</span>
          <select
            value={speedUnit}
            onChange={(event) => setSpeedUnit(event.target.value as SpeedUnit)}
          >
            {(Object.keys(speedUnitLabelsUz) as SpeedUnit[]).map((unit) => (
              <option key={unit} value={unit}>
                {speedUnitLabelsUz[unit]}
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
            To&apos;g&apos;ri masofa va tezlik kiritib seyr vaqtini ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Seyr Vaqti</span>
              <strong>
                {result.hours} soat {result.minutes} daqiqa
              </strong>
            </div>
            <div>
              <span>Jami Soat (o&apos;nlik)</span>
              <strong>
                {result.totalHours.toLocaleString("uz-UZ", {
                  maximumFractionDigits: 2,
                })}{" "}
                soat
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
