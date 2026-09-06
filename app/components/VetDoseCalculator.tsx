"use client";

import { useMemo, useState } from "react";
import { calculateVetDose } from "../converter/vetDoseCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function VetDoseCalculator() {
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
          <span>Hayvan Ağırlığı (kg)</span>
          <input
            inputMode="decimal"
            type="text"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Reçete Edilen Doz (mg/kg)</span>
          <input
            inputMode="decimal"
            type="text"
            value={dosePerKg}
            onChange={(event) => setDosePerKg(event.target.value)}
            placeholder="örn. 5"
          />
        </label>
        <label className="category-general-converter-field">
          <span>İlaç Konsantrasyonu (mg/mL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={concentration}
            onChange={(event) => setConcentration(event.target.value)}
            placeholder="örn. 50"
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam Doz</span>
              <strong>{formatNumber(result.totalDoseMg)} mg</strong>
            </div>
            <div>
              <span>Uygulanacak Hacim</span>
              <strong>{formatNumber(result.volumeMl)} mL</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Önemli:</strong> Bu araç yalnızca birim/hacim çevirimi
        yapar — hangi mg/kg dozunun uygun olduğunu belirlemez veya
        önermez. Doz değerini her zaman bir veteriner hekimden veya
        resmi ilaç prospektüsünden al; sonucu hekim talimatıyla
        karşılaştır.
      </p>
    </div>
  );
}
