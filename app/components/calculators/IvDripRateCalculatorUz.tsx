"use client";

import { useMemo, useState } from "react";
import { calculateIvDripRate } from "../../converter/ivDripRateCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function IvDripRateCalculatorUz() {
  const [volume, setVolume] = useState("1000");
  const [time, setTime] = useState("480");
  const [dropFactor, setDropFactor] = useState("20");

  const result = useMemo(
    () =>
      calculateIvDripRate({
        volumeMl: parseNumericValue(volume),
        timeMinutes: parseNumericValue(time),
        dropFactorGttPerMl: parseNumericValue(dropFactor),
      }),
    [volume, time, dropFactor]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Jami Hajm (mL)</span>
          <input
            inputMode="decimal"
            type="text"
            value={volume}
            onChange={(event) => setVolume(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Vaqt (daqiqa)</span>
          <input
            inputMode="decimal"
            type="text"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Tomchi Koeffitsienti (gtt/mL)</span>
          <select
            value={dropFactor}
            onChange={(event) => setDropFactor(event.target.value)}
          >
            <option value="10">10 (makro)</option>
            <option value="15">15 (makro)</option>
            <option value="20">20 (makro)</option>
            <option value="60">60 (mikro/pediatrik)</option>
          </select>
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
              <span>Tomchi Tezligi</span>
              <strong>{formatNumber(result.dropsPerMinute)} tomchi/daq</strong>
            </div>
            <div>
              <span>Pompa Tezligi Ko&apos;rinishi</span>
              <strong>{formatNumber(result.mlPerHour)} mL/soat</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Muhim:</strong> Bu vosita faqat birlik aylantirishini
        amalga oshiradi — retsept qilingan hajm/tezlikni o&apos;zgartirmaydi.
        Natijani har doim shifokor ko&apos;rsatmasi va muassasa
        protokoli bilan solishtiring.
      </p>
    </div>
  );
}
