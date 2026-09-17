"use client";

import { useState } from "react";
import {
  calculateTheoreticalLatencyUz,
  cityLocationsUz,
} from "../../converter/theoreticalLatencyUz";

const sortedCitiesUz = [...cityLocationsUz].sort((a, b) =>
  a.nameUz.localeCompare(b.nameUz, "tr"),
);

function formatMs(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 1 });
}

export default function TheoreticalLatencyCalculatorUz() {
  const [fromId, setFromId] = useState("toshkent");
  const [toId, setToId] = useState("frankfurt");

  const result = calculateTheoreticalLatencyUz(fromId, toId);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Sizning Joylashuvingiz / Server 1</span>
          <select value={fromId} onChange={(event) => setFromId(event.target.value)}>
            {sortedCitiesUz.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameUz}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;yin Serveri / Maqsadli Joylashuv</span>
          <select value={toId} onChange={(event) => setToId(event.target.value)}>
            {sortedCitiesUz.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameUz}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result && (
        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Masofa (katta doira)</td>
                  <td>{formatMs(result.distanceKm)} km</td>
                </tr>
                <tr>
                  <td>Fizik Quyi Chegara (bir tomon)</td>
                  <td>{formatMs(result.oneWayMs)} ms</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Nazariy Minimal Ping (RTT)</strong>
                  </td>
                  <td>
                    <strong>{formatMs(result.theoreticalRttMs)} ms</strong>
                  </td>
                </tr>
                <tr>
                  <td>Haqiqatda Ehtimol</td>
                  <td>
                    {formatMs(result.realisticRttLowMs)} - {formatMs(result.realisticRttHighMs)} ms
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu hisob, yorug&apos;likning tola-optik
        kabeldagi tezligiga (~200.000 km/s) asoslangan FIZIK QUYI
        CHEGARADIR — hech qanday internet ulanishi bundan past
        kechikish taklif qila olmaydi. Haqiqiy ping qiymati har doim
        bu sondan yuqori bo&apos;ladi; chunki kabel yo&apos;nalishi
        to&apos;g&apos;ri chiziq emas va ma&apos;lumot yo&apos;lda
        bir nechta yo&apos;naltirgich/kalitdan o&apos;tadi.
        &quot;Haqiqatda ehtimol&quot; oralig&apos;i, o&apos;xshash
        masofalardagi haqiqiy o&apos;lchovlarga asoslangan taxminiy
        qiymat, kafolat emas.
      </p>
    </div>
  );
}
