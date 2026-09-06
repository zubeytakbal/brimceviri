"use client";

import { useMemo, useState } from "react";
import {
  calculateDescentRate,
  type DescentRateInput,
} from "../converter/descentRateCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function DescentRateCalculator() {
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
          <span>Yer Hızı - Ground Speed (knot)</span>
          <input
            inputMode="decimal"
            type="text"
            value={groundSpeed}
            onChange={(event) => setGroundSpeed(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>İniş Açısı (derece)</span>
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
            Geçerli değerler girerek iniş oranını görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>İniş Gradyanı</span>
              <strong>
                {formatNumber(result.descentGradientFtPerNm)} ft/nm
              </strong>
            </div>
            <div>
              <span>İniş Oranı (Rate of Descent)</span>
              <strong>
                {formatNumber(result.rateOfDescentFtPerMin)} ft/dk
              </strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Yaygın kısayol kuralı: standart 3° yaklaşmada iniş oranı
        (ft/dk) ≈ yer hızı (knot) × 5. Bu araç herhangi bir açı için
        tam trigonometrik sonucu hesaplar.
      </p>
    </div>
  );
}
