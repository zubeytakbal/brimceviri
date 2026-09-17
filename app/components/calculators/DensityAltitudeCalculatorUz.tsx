"use client";

import { useMemo, useState } from "react";
import {
  calculateDensityAltitude,
  type DensityAltitudeInput,
} from "../../converter/densityAltitudeCalculator";

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

export default function DensityAltitudeCalculatorUz() {
  const [pressureAltitude, setPressureAltitude] = useState("2000");
  const [outsideAirTemp, setOutsideAirTemp] = useState("30");

  const input: DensityAltitudeInput = useMemo(
    () => ({
      pressureAltitudeFt: parseNumericValue(pressureAltitude),
      outsideAirTempC: parseNumericValue(outsideAirTemp),
    }),
    [pressureAltitude, outsideAirTemp]
  );

  const result = useMemo(() => calculateDensityAltitude(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Bosim Balandligi (ft)</span>
          <input
            inputMode="decimal"
            type="text"
            value={pressureAltitude}
            onChange={(event) => setPressureAltitude(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Tashqi Havo Harorati - OAT (°C)</span>
          <input
            inputMode="decimal"
            type="text"
            value={outsideAirTemp}
            onChange={(event) => setOutsideAirTemp(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri qiymatlar kiritib zichlik balandligini ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>ISA Standart Harorati</span>
              <strong>{formatNumber(result.isaTempC, 1)} °C</strong>
            </div>
            <div>
              <span>Zichlik Balandligi</span>
              <strong>{formatNumber(result.densityAltitudeFt)} ft</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Bosim balandligini topish uchun altimetrni standart bosimga
        (1013,25 hPa / 29,92 inHg) sozlaganingizda o&apos;qilgan
        qiymatdan foydalanishingiz mumkin; maydonda bu odatda
        joyning balandligiga yaqin qiymat bo&apos;ladi.
      </p>
    </div>
  );
}
