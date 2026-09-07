"use client";

import { useState } from "react";
import {
  calculateTheoreticalLatency,
  cityLocations,
} from "../converter/theoreticalLatency";

const sortedCities = [...cityLocations].sort((a, b) =>
  a.nameTr.localeCompare(b.nameTr, "tr"),
);

function formatMs(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 1 });
}

export default function TheoreticalLatencyCalculator() {
  const [fromId, setFromId] = useState("istanbul");
  const [toId, setToId] = useState("frankfurt");

  const result = calculateTheoreticalLatency(fromId, toId);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Senin Konumun / Sunucu 1</span>
          <select value={fromId} onChange={(event) => setFromId(event.target.value)}>
            {sortedCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameTr}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Oyun Sunucusu / Hedef Konum</span>
          <select value={toId} onChange={(event) => setToId(event.target.value)}>
            {sortedCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.nameTr}
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
                  <td>Mesafe (büyük daire)</td>
                  <td>{formatMs(result.distanceKm)} km</td>
                </tr>
                <tr>
                  <td>Fiziksel Alt Sınır (tek yön)</td>
                  <td>{formatMs(result.oneWayMs)} ms</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Teorik Minimum Ping (RTT)</strong>
                  </td>
                  <td>
                    <strong>{formatMs(result.theoreticalRttMs)} ms</strong>
                  </td>
                </tr>
                <tr>
                  <td>Gerçekte Muhtemelen</td>
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
        <strong>Not:</strong> Bu hesaplama, ışığın fiber optik kablodaki
        hızına (~200.000 km/s) dayanan FİZİKSEL ALT SINIRDIR — hiçbir
        internet bağlantısı bundan daha düşük gecikme sunamaz. Gerçek
        ping değeri her zaman bu sayının üzerindedir; çünkü kablo
        güzergahı düz bir hat değildir ve veri yolda birden fazla
        yönlendirici/anahtardan geçer. &quot;Gerçekte muhtemelen&quot;
        aralığı, benzer mesafelerdeki gerçek ölçümlere dayanan kaba bir
        tahmindir, garanti değildir.
      </p>
    </div>
  );
}
