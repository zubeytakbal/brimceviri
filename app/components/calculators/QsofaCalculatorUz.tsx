"use client";

import { useMemo, useState } from "react";
import { calculateQsofa } from "../../converter/qsofaCalculator";

export default function QsofaCalculatorUz() {
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
          <span>Sistolik Qon Bosimi ≤ 100 mmHg</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={lowBloodPressure}
              onChange={(event) => setLowBloodPressure(event.target.checked)}
            />
            Bor (+1)
          </span>
        </label>
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Nafas Olish Soni ≥ 22/daq</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={highRespiratoryRate}
              onChange={(event) =>
                setHighRespiratoryRate(event.target.checked)
              }
            />
            Bor (+1)
          </span>
        </label>
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Ong O&apos;zgarishi (GKS &lt; 15)</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={alteredMentation}
              onChange={(event) => setAlteredMentation(event.target.checked)}
            />
            Bor (+1)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>qSOFA Balli</span>
            <strong>{total} / 3</strong>
          </div>
          <div>
            <span>Talqin</span>
            <strong>
              {total >= 2 ? "Yuqori xavf (≥2)" : "Past xavf (<2)"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
