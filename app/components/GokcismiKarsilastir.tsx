"use client";

import { useEffect, useState } from "react";
import { getAllCelestialBodies } from "../converter/celestialBodiesHub";
import { celestialBodyComparisonDefinitions } from "../converter/celestialBodyComparisons";

const fmt = (value: number, digits = 1) => value.toLocaleString("tr-TR", { maximumFractionDigits: digits });

/** Gökcismi karşılaştırmaları tek sayfada: ?v= hazır çift, ya da iki gökcismi seç. */
export default function GokcismiKarsilastir() {
  const bodies = getAllCelestialBodies();
  const [a, setA] = useState("dunya");
  const [b, setB] = useState("ay");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const v = new URLSearchParams(window.location.search).get("v");
      const d = v ? celestialBodyComparisonDefinitions.find((x) => x.slug === v) : undefined;
      if (d) {
        setA(d.firstId);
        setB(d.secondId);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const first = bodies.find((x) => x.id === a)!;
  const second = bodies.find((x) => x.id === b)!;
  const same = first.id === second.id;
  const [big, small] = first.diameterKm >= second.diameterKm ? [first, second] : [second, first];
  const context = celestialBodyComparisonDefinitions.find(
    (d) => (d.firstId === a && d.secondId === b) || (d.firstId === b && d.secondId === a),
  )?.context;

  const rows: Array<[string, (x: typeof first) => string]> = [
    ["Çap", (x) => `${fmt(x.diameterKm, 0)} km`],
    ["Kütle", (x) => `${fmt(x.massKg / 1e24, 3)} × 10²⁴ kg`],
    ["Yoğunluk", (x) => `${fmt(x.densityKgM3, 0)} kg/m³`],
    ["Yüzey yerçekimi", (x) => `${fmt(x.gravityMs2)} m/s²`],
    ["Kaçış hızı", (x) => `${fmt(x.escapeVelocityKms)} km/s`],
    ["Gün uzunluğu (dönüş)", (x) => `${fmt(Math.abs(x.rotationPeriodHours))} saat`],
    ["Yörünge periyodu", (x) => `${fmt(x.orbitalPeriodDays, 0)} gün`],
    ["Uydu sayısı", (x) => String(x.moonCount)],
    ["Ortalama sıcaklık", (x) => `${fmt(x.meanTemperatureC, 0)} °C`],
  ];

  const options = bodies.map((x) => (
    <option key={x.id} value={x.id}>
      {x.nameTr}
    </option>
  ));

  return (
    <div className="date-calc" id="karsilastir">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>1. gökcismi</span>
            <select value={a} onChange={(e) => setA(e.target.value)}>
              {options}
            </select>
          </label>
          <label className="date-calc-field">
            <span>2. gökcismi</span>
            <select value={b} onChange={(e) => setB(e.target.value)}>
              {options}
            </select>
          </label>
        </div>
      </div>
      {same ? (
        <p className="date-calc-note">İki farklı gökcismi seçin.</p>
      ) : (
        <section className="category-article-content">
          <h2>
            {first.nameTr} ve {second.nameTr} karşılaştırması
          </h2>
          <p>
            Çap olarak büyük olan {big.nameTr}: {small.nameTr} ile karşılaştırıldığında çapı yaklaşık{" "}
            {fmt(big.diameterKm / small.diameterKm, 2)} kat, kütlesi yaklaşık {fmt(big.massKg / small.massKg, 2)} kat
            daha büyüktür; içine yaklaşık {fmt((big.diameterKm / small.diameterKm) ** 3, 0)} tane {small.nameTr} sığar.
            {context ? ` ${context}` : ""}
          </p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>Özellik</th>
                  <th>{first.nameTr}</th>
                  <th>{second.nameTr}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{value(first)}</td>
                    <td>{value(second)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Dünya&apos;da 70 kg gelen biri {first.nameTr} yüzeyinde {fmt((70 * first.gravityMs2) / 9.81)} kg, {second.nameTr}{" "}
            yüzeyinde {fmt((70 * second.gravityMs2) / 9.81)} kg gelir.
          </p>
        </section>
      )}
    </div>
  );
}
