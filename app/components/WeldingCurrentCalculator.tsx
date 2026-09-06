"use client";

import { useState } from "react";
import {
  calculateWeldingCurrent,
  electrodeCoatingLabels,
  type ElectrodeCoating,
} from "../converter/weldingCalculator";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatAmps(value: number): string {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} A`;
}

export default function WeldingCurrentCalculator() {
  const [diameterInput, setDiameterInput] = useState("3.25");
  const [coating, setCoating] = useState<ElectrodeCoating>("kalin");

  const diameter = parseNumericValue(diameterInput);
  const result = diameter !== null ? calculateWeldingCurrent(diameter, coating) : null;
  const invalid = diameterInput.trim().length > 0 && !result;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Elektrot Örtüsü</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(electrodeCoatingLabels) as ElectrodeCoating[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${coating === key ? " is-active" : ""}`}
                onClick={() => setCoating(key)}
              >
                {electrodeCoatingLabels[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Elektrot Çekirdek Çapı (mm)</span>
            <input
              type="text"
              inputMode="decimal"
              value={diameterInput}
              onChange={(event) => setDiameterInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>Geçerli bir elektrot çapı gir.</strong>
        ) : !result ? (
          <strong>Bir elektrot çapı girerek önerilen amperaj aralığını görebilirsin.</strong>
        ) : (
          <strong>Önerilen Amperaj Aralığı: {formatAmps(result.min)} - {formatAmps(result.max)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu aralık, kaba bir başlangıç noktasıdır.
        Gerçek amperaj; malzeme kalınlığı, kaynak pozisyonu ve makine
        özelliklerine göre kaynakçı tarafından ark izlenerek ince ayar
        yapılmalıdır.
      </p>
    </div>
  );
}
