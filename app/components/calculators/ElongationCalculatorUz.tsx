"use client";

import { useState } from "react";
import {
  calculateElongation,
  elasticModulusTable,
} from "../../converter/elasticModulus";

const materialLabelsUz: Record<string, string> = {
  steel: "Po'lat (Qurilish Po'lati)",
  "stainless-steel": "Zanglamaydigan Po'lat",
  titanium: "Titan",
  copper: "Mis",
  brass: "Latun (Bronza)",
  aluminum: "Alyuminiy",
  glass: "Shisha",
  concrete: "Beton",
  zinc: "Rux",
  nickel: "Nikel",
  tin: "Qalay",
  gold: "Oltin",
  silver: "Kumush",
  platinum: "Platina",
  iron: "Temir",
  "cast-iron": "Cho'yan",
  chromium: "Xrom",
  magnesium: "Magniy",
  tungsten: "Volfram",
  molybdenum: "Molibden",
  niobium: "Niobiy",
  palladium: "Palladiy",
  vanadium: "Vanadiy",
  antimony: "Surma",
  bismuth: "Vismut",
  cadmium: "Kadmiy",
  bronze: "Bronza",
  mahogany: "Mahogani Yog'ochi",
  walnut: "Yong'oq Yog'ochi",
  teak: "Tik Yog'ochi",
  birch: "Qayin Yog'ochi",
  beech: "Buk Yog'ochi",
  ldpe: "LDPE",
  polystyrene: "Polistirol",
};

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function ElongationCalculatorUz() {
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
          <span>Material</span>
          <select value={materialId} onChange={(event) => setMaterialId(event.target.value)}>
            {elasticModulusTable.map((row) => (
              <option key={row.id} value={row.id}>
                {materialLabelsUz[row.id] ?? row.label}
                {row.isVariable ? " (o'zgaruvchan)" : ""}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Kuch (N)</span>
          <input
            type="text"
            inputMode="decimal"
            value={forceInput}
            onChange={(event) => setForceInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kesim Maydoni (mm²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={areaInput}
            onChange={(event) => setAreaInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Boshlang&apos;ich Uzunlik (mm)</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib cho&apos;zilishni ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Kuchlanish (σ)</span>
              <strong>{formatValue(result.stressMPa)} MPa</strong>
            </div>
            <div>
              <span>Cho&apos;zilish (ΔL)</span>
              <strong>{formatValue(result.elongationMm)} mm</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Elastisiya Moduli (Yung Moduli) Jadvali</caption>
          <thead>
            <tr>
              <th scope="col">Material</th>
              <th scope="col">E (GPa)</th>
            </tr>
          </thead>
          <tbody>
            {elasticModulusTable.map((row) => (
              <tr key={row.id} className={row.id === materialId ? "is-active" : undefined}>
                <td>
                  {materialLabelsUz[row.id] ?? row.label}
                  {row.isVariable ? " *" : ""}
                </td>
                <td>{row.modulusGPa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Metall qiymatlari tor oraliqda,
        yaxshi ma&apos;lum sobit qiymatlardir. (*) belgili beton kabi
        materiallarda haqiqiy qiymat aralashma nisbati va qotish
        vaqtiga qarab sezilarli darajada o&apos;zgarishi mumkin. Bu
        vosita faqat elastik (doimiy bo&apos;lmagan) shakl o&apos;zgarish
        oralig&apos;i uchun amal qiladi.
      </p>
    </div>
  );
}
