"use client";

import { useState } from "react";
import {
  calculateElongation,
  elasticModulusTable,
} from "../converter/elasticModulus";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function ElongationCalculator() {
  const [materialId, setMaterialId] = useState(elasticModulusTable[0].id);
  const [forceInput, setForceInput] = useState("10000");
  const [areaInput, setAreaInput] = useState("100");
  const [lengthInput, setLengthInput] = useState("1000");

  const material =
    elasticModulusTable.find((row) => row.id === materialId) ??
    elasticModulusTable[0];

  const force = parseNumericValue(forceInput);
  const area = parseNumericValue(areaInput);
  const length = parseNumericValue(lengthInput);

  const result =
    force !== null && area !== null && length !== null
      ? calculateElongation(force, area, length, material.modulusGPa)
      : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Malzeme</span>
          <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
            {elasticModulusTable.map((row) => (
              <option key={row.id} value={row.id}>
                {row.label}
                {row.isVariable ? " (değişken)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Kuvvet (N)</span>
          <input
            type="text"
            inputMode="decimal"
            value={forceInput}
            onChange={(event) => setForceInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kesit Alanı (mm²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Başlangıç Uzunluğu (mm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={lengthInput}
            onChange={(event) => setLengthInput(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek uzamayı görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Gerilme (σ)</span>
              <strong>{formatValue(result.stressMPa)} MPa</strong>
            </div>
            <div>
              <span>Uzama (ΔL)</span>
              <strong>{formatValue(result.elongationMm)} mm</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Elastisite Modülü (Young Modülü) Tablosu</caption>
          <thead>
            <tr>
              <th scope="col">Malzeme</th>
              <th scope="col">E (GPa)</th>
            </tr>
          </thead>
          <tbody>
            {elasticModulusTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>
                  {row.label}
                  {row.isVariable ? " *" : ""}
                </td>
                <td>{row.modulusGPa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Metal değerleri dar bir aralıkta, iyi
        bilinen sabitlerdir. (*) işaretli beton gibi malzemelerde
        gerçek değer, karışım oranına ve kürlenme süresine göre önemli
        ölçüde değişebilir. Bu araç yalnızca elastik (kalıcı olmayan)
        şekil değiştirme aralığı için geçerlidir.
      </p>
    </div>
  );
}
