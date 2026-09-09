"use client";

import { useState } from "react";
import { calculateProjectileMotion } from "../converter/projectileMotionCalculator";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export default function ProjectileMotionCalculator() {
  const [velocity, setVelocity] = useState("20");
  const [angle, setAngle] = useState("45");
  const [height, setHeight] = useState("0");

  const result = calculateProjectileMotion({
    initialVelocityMs: parseNumericValue(velocity),
    launchAngleDegrees: parseNumericValue(angle),
    initialHeightM: parseNumericValue(height),
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Başlangıç Hızı (m/s)</span>
          <input
            type="text"
            inputMode="decimal"
            value={velocity}
            onChange={(event) => setVelocity(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Atış Açısı (derece, 0-90)</span>
          <input
            type="text"
            inputMode="decimal"
            value={angle}
            onChange={(event) => setAngle(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Başlangıç Yüksekliği (m)</span>
          <input
            type="text"
            inputMode="decimal"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Menzil (Yatay Mesafe)</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result.rangeM)} m</strong>
                  </td>
                </tr>
                <tr>
                  <td>Maksimum Yükseklik</td>
                  <td>{formatNumber(result.maxHeightM)} m</td>
                </tr>
                <tr>
                  <td>Uçuş Süresi</td>
                  <td>{formatNumber(result.flightTimeS)} s</td>
                </tr>
                <tr>
                  <td>Yatay Hız Bileşeni (vₓ)</td>
                  <td>{formatNumber(result.horizontalVelocityMs)} m/s</td>
                </tr>
                <tr>
                  <td>Dikey Hız Bileşeni (vᵧ)</td>
                  <td>{formatNumber(result.verticalVelocityMs)} m/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Hesaplama hava direnci ihmal edilerek,
        yerçekimi ivmesi g = 9,81 m/s² alınarak yapılır. Açıyı 0
        girip başlangıç yüksekliğini pozitif bırakırsan, bu
        hesaplayıcı klasik <strong>yatay atış</strong> problemine
        dönüşür.
      </p>
    </div>
  );
}
