"use client";

import { useState } from "react";
import {
  calculateMassFromVolumeCm3,
  calculateVolumeCm3FromMass,
  materialDensityTable,
} from "../converter/materialDensity";
import { materialDensityTableDe } from "../converter/materialDensityDe";
import { numberLocales, type ContentLocale } from "./contentLocale";

type Target = "mass" | "volume";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, locale: ContentLocale, maximumFractionDigits = 2): string {
  return value.toLocaleString(numberLocales[locale], { maximumFractionDigits });
}

const copy = {
  tr: {
    table: materialDensityTable,
    targetLabel: "Neyi hesaplamak istiyorsun?",
    calculateWeight: "Ağırlığı Hesapla",
    calculateVolume: "Hacmi Hesapla",
    material: "Malzeme",
    volumeInput: "Hacim (cm³)",
    weightInput: "Ağırlık (kg)",
    weightPlaceholder: "örn. 5",
    invalid: "Geçerli değerler girerek sonucu görebilirsin.",
    weightPrefix: "Ağırlık: ",
    volumePrefix: "Hacim: ",
    tableCaption: "Malzeme Yoğunlukları Tablosu",
    densityColumn: "Yoğunluk (kg/m³)",
  },
  de: {
    table: materialDensityTableDe,
    targetLabel: "Was möchtest du berechnen?",
    calculateWeight: "Gewicht berechnen",
    calculateVolume: "Volumen berechnen",
    material: "Material",
    volumeInput: "Volumen (cm³)",
    weightInput: "Gewicht (kg)",
    weightPlaceholder: "z. B. 5",
    invalid: "Gib gültige Werte ein, um das Ergebnis zu sehen.",
    weightPrefix: "Gewicht: ",
    volumePrefix: "Volumen: ",
    tableCaption: "Tabelle der Materialdichten",
    densityColumn: "Dichte (kg/m³)",
  },
};

type MaterialWeightCalculatorProps = {
  locale?: ContentLocale;
};

export default function MaterialWeightCalculator({ locale = "tr" }: MaterialWeightCalculatorProps = {}) {
  const t = copy[locale];
  const table = t.table;
  const [materialId, setMaterialId] = useState(table[0].id);
  const [target, setTarget] = useState<Target>("mass");
  const [volumeInput, setVolumeInput] = useState("1000");
  const [massInput, setMassInput] = useState("");

  const material =
    table.find((row) => row.id === materialId) ??
    table[0];

  const volume = parseNumericValue(volumeInput);
  const mass = parseNumericValue(massInput);

  const result =
    target === "mass"
      ? volume !== null
        ? calculateMassFromVolumeCm3(material.densityKgM3, volume)
        : null
      : mass !== null
        ? calculateVolumeCm3FromMass(material.densityKgM3, mass)
        : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{t.targetLabel}</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "mass" ? " is-active" : ""}`}
              onClick={() => setTarget("mass")}
            >
              {t.calculateWeight}
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "volume" ? " is-active" : ""}`}
              onClick={() => setTarget("volume")}
            >
              {t.calculateVolume}
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{t.material}</span>
            <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
              {table.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </label>

          {target === "mass" ? (
            <label className="category-general-converter-field">
              <span>{t.volumeInput}</span>
              <input
                type="text"
                inputMode="decimal"
                value={volumeInput}
                onChange={(event) => setVolumeInput(event.target.value)}
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>{t.weightInput}</span>
              <input
                type="text"
                inputMode="decimal"
                value={massInput}
                onChange={(event) => setMassInput(event.target.value)}
                placeholder={t.weightPlaceholder}
              />
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>{t.invalid}</strong>
        ) : target === "mass" ? (
          <strong>{t.weightPrefix}{formatValue(result, locale)} kg</strong>
        ) : (
          <strong>{t.volumePrefix}{formatValue(result, locale)} cm³</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>{t.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{t.material}</th>
              <th scope="col">{t.densityColumn}</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>{row.label}</td>
                <td>{row.densityKgM3.toLocaleString(numberLocales[locale])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
