"use client";

import { useMemo, useState } from "react";
import {
  calculateDescentRate,
  type DescentRateInput,
} from "../../converter/descentRateCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function DescentRateCalculatorUz() {
  const [groundSpeed, setGroundSpeed] = useState("140");
  const [descentAngle, setDescentAngle] = useState("3");

  const input: DescentRateInput = useMemo(
    () => ({
      groundSpeedKnot: parseNumericValue(groundSpeed),
      descentAngleDeg: parseNumericValue(descentAngle),
    }),
    [groundSpeed, descentAngle]
  );

  const result = useMemo(() => calculateDescentRate(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Yer Tezligi - Ground Speed (uzel)</span>
          <input
            inputMode="decimal"
            type="text"
            value={groundSpeed}
            onChange={(event) => setGroundSpeed(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Pasayish Burchagi (daraja)</span>
          <input
            inputMode="decimal"
            type="text"
            value={descentAngle}
            onChange={(event) => setDescentAngle(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri qiymatlar kiritib pasayish tezligini ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Pasayish Gradienti</span>
              <strong>
                {formatNumber(result.descentGradientFtPerNm)} ft/nm
              </strong>
            </div>
            <div>
              <span>Pasayish Tezligi (Rate of Descent)</span>
              <strong>
                {formatNumber(result.rateOfDescentFtPerMin)} ft/daq
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Keng tarqalgan qisqa yo&apos;l qoidasi: standart 3° yaqinlashishda
        pasayish tezligi (ft/daq) ≈ yer tezligi (uzel) × 5. Bu vosita
        har qanday burchak uchun to&apos;liq trigonometrik natijani
        hisoblaydi.
      </p>
    </div>
  );
}
