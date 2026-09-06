"use client";

import { useState } from "react";
import {
  boltTorqueTable,
  calculateClampForce,
  type BoltGrade,
} from "../converter/boltTorque";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const grades: BoltGrade[] = ["8.8", "10.9", "12.9"];

export default function BoltTorqueCalculator() {
  const [size, setSize] = useState(boltTorqueTable[4].size);
  const [grade, setGrade] = useState<BoltGrade>("8.8");
  const [kFactorInput, setKFactorInput] = useState("0.2");

  const row = boltTorqueTable.find((item) => item.size === size) ?? boltTorqueTable[0];
  const recommendedTorque = row.torqueByGrade[grade];

  const kFactor = parseNumericValue(kFactorInput);
  const clampForce =
    kFactor !== null ? calculateClampForce(recommendedTorque, row.diameterMm, kFactor) : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Cıvata Ölçüsü</span>
            <select value={size} onChange={(event) => setSize(event.target.value)}>
              {boltTorqueTable.map((item) => (
                <option key={item.size} value={item.size}>
                  {item.size}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>Dayanım Sınıfı</span>
            <select value={grade} onChange={(event) => setGrade(event.target.value as BoltGrade)}>
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          <strong>
            Önerilen Başlangıç Torku: {formatValue(recommendedTorque, 2)} Nm
          </strong>
        </div>
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Tahmini Sıkma Kuvveti (K-faktör Yöntemi)</span>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>K Faktörü</span>
            <input
              type="text"
              inputMode="decimal"
              value={kFactorInput}
              onChange={(event) => setKFactorInput(event.target.value)}
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {!clampForce ? (
            <strong>Geçerli bir K faktörü girerek tahmini sıkma kuvvetini görebilirsin.</strong>
          ) : (
            <strong>Tahmini Sıkma Kuvveti: {formatValue(clampForce)} N (~{formatValue(clampForce / 1000, 2)} kN)</strong>
          )}
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Cıvata Sıkma Torku Tablosu (DIN 13, Nm)</caption>
          <thead>
            <tr>
              <th scope="col">Ölçü</th>
              <th scope="col">8.8</th>
              <th scope="col">10.9</th>
              <th scope="col">12.9</th>
            </tr>
          </thead>
          <tbody>
            {boltTorqueTable.map((item) => (
              <tr key={item.size} className={item.size === size ? "is-active" : undefined}>
                <td>{item.size}</td>
                <td>{item.torqueByGrade["8.8"]}</td>
                <td>{item.torqueByGrade["10.9"]}</td>
                <td>{item.torqueByGrade["12.9"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Önemli:</strong> Bu değerler genel, kaba başlangıç
        referanslarıdır — kuru/hafif yağlı, standart yüzey kaplı
        cıvatalar için geçerlidir. Kritik veya standarda tabi montajlarda
        her zaman tasarımcının veya cıvata üreticisinin belirttiği kesin
        tork değeri esas alınmalıdır.
      </p>
    </div>
  );
}
