"use client";

import { useMemo, useState } from "react";
import { calculateVetDose } from "../../converter/vetDoseCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function VetDoseCalculatorUz() {
  const [weight, setWeight] = useState("10");
  const [dosePerKg, setDosePerKg] = useState("");
  const [concentration, setConcentration] = useState("");

  const result = useMemo(
    () =>
      calculateVetDose({
        weightKg: parseNumericValue(weight),
        dosePerKg: parseNumericValue(dosePerKg),
        concentrationMgPerMl: parseNumericValue(concentration),
      }),
    [weight, dosePerKg, concentration]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Hayvon Og&apos;irligi (kg)</span>
          <input
            inputMode="decimal"
            type="text"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Retsept Qilingan Doza (mg/kg)</span>
          <input
            inputMode="decimal"
            type="text"
            value={dosePerKg}
            onChange={(event) => setDosePerKg(event.target.value)}
            placeholder="masalan 5"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Dori Konsentratsiyasi (mg/mL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={concentration}
            onChange={(event) => setConcentration(event.target.value)}
            placeholder="masalan 50"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami Doza</span>
              <strong>{formatNumber(result.totalDoseMg)} mg</strong>
            </div>
            <div>
              <span>Qo&apos;llaniladigan Hajm</span>
              <strong>{formatNumber(result.volumeMl)} mL</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Muhim:</strong> Bu vosita faqat birlik/hajm
        aylantirishini amalga oshiradi — qaysi mg/kg dozaning mos
        ekanligini belgilamaydi yoki tavsiya qilmaydi. Doza qiymatini
        har doim veterinar shifokordan yoki rasmiy dori annotatsiyasidan
        oling; natijani shifokor ko&apos;rsatmasi bilan solishtiring.
      </p>
    </div>
  );
}
