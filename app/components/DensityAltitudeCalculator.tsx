"use client";

import { useMemo, useState } from "react";
import {
  calculateDensityAltitude,
  type DensityAltitudeInput,
} from "../converter/densityAltitudeCalculator";

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

export default function DensityAltitudeCalculator() {
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
          <span>Basınç İrtifası (ft)</span>
          <input
            inputMode="decimal"
            type="text"
            value={pressureAltitude}
            onChange={(event) => setPressureAltitude(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Dış Hava Sıcaklığı - OAT (°C)</span>
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
            Geçerli değerler girerek yoğunluk irtifasını görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>ISA Standart Sıcaklığı</span>
              <strong>{formatNumber(result.isaTempC, 1)} °C</strong>
            </div>
            <div>
              <span>Yoğunluk İrtifası</span>
              <strong>{formatNumber(result.densityAltitudeFt)} ft</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Basınç irtifasını bulmak için altimetreyi standart basınca
        (1013,25 hPa / 29,92 inHg) ayarladığında okunan değeri
        kullanabilirsin; sahada bu genellikle alan yüksekliğine yakın
        bir değerdir.
      </p>
    </div>
  );
}
