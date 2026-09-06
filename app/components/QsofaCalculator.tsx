"use client";

import { useMemo, useState } from "react";
import { calculateQsofa } from "../converter/qsofaCalculator";

export default function QsofaCalculator() {
  const [lowBloodPressure, setLowBloodPressure] = useState(false);
  const [highRespiratoryRate, setHighRespiratoryRate] = useState(false);
  const [alteredMentation, setAlteredMentation] = useState(false);

  const total = useMemo(
    () =>
      calculateQsofa({
        lowBloodPressure,
        highRespiratoryRate,
        alteredMentation,
      }),
    [lowBloodPressure, highRespiratoryRate, alteredMentation]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Sistolik Kan Basıncı ≤ 100 mmHg</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={lowBloodPressure}
              onChange={(event) => setLowBloodPressure(event.target.checked)}
            />
            Var (+1)
          </span>
        </label>
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Solunum Sayısı ≥ 22/dk</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={highRespiratoryRate}
              onChange={(event) =>
                setHighRespiratoryRate(event.target.checked)
              }
            />
            Var (+1)
          </span>
        </label>
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Bilinç Değişikliği (GKS &lt; 15)</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={alteredMentation}
              onChange={(event) => setAlteredMentation(event.target.checked)}
            />
            Var (+1)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>qSOFA Puanı</span>
            <strong>{total} / 3</strong>
          </div>
          <div>
            <span>Yorum</span>
            <strong>
              {total >= 2 ? "Yüksek risk (≥2)" : "Düşük risk (<2)"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
