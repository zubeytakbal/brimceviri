"use client";

import { useState } from "react";
import {
  calculateWeldingCurrent,
  type ElectrodeCoating,
} from "../../converter/weldingCalculator";

const electrodeCoatingLabelsUz: Record<ElectrodeCoating, string> = {
  ince: "Yupqa Qoplamali",
  kalin: "Qalin Qoplamali",
  "demir-tozu": "Temir Kukuni bilan Qalin Qoplamali",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatAmps(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 })} A`;
}

export default function WeldingCurrentCalculatorUz() {
  const [diameterInput, setDiameterInput] = useState("3.25");
  const [coating, setCoating] = useState<ElectrodeCoating>("kalin");

  const diameter = parseNumericValue(diameterInput);
  const result = diameter !== null ? calculateWeldingCurrent(diameter, coating) : null;
  const invalid = diameterInput.trim().length > 0 && !result;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Elektrod Qoplamasi</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(electrodeCoatingLabelsUz) as ElectrodeCoating[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`engineering-target-button${coating === key ? " is-active" : ""}`}
                onClick={() => setCoating(key)}
              >
                {electrodeCoatingLabelsUz[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Elektrod O&apos;zagi Diametri (mm)</span>
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
          <strong>To&apos;g&apos;ri elektrod diametrini kiriting.</strong>
        ) : !result ? (
          <strong>Elektrod diametrini kiritib tavsiya etilgan amperaj oralig&apos;ini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>Tavsiya Etilgan Amperaj Oralig&apos;i: {formatAmps(result.min)} - {formatAmps(result.max)}</strong>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu oraliq dag&apos;al boshlang&apos;ich
        nuqtadir. Haqiqiy amperaj material qalinligi, payvandlash
        holati va mashina xususiyatlariga qarab payvandchi tomonidan
        yoyni kuzatib nozik sozlanishi kerak.
      </p>
    </div>
  );
}
