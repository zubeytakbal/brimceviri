"use client";

import { useMemo, useState } from "react";
import {
  calculateAlloyMix,
  calculateRequiredGrossWeight,
  findNearestStandardGrade,
  getStandardGrades,
  type MetalType,
} from "../converter/hasHesaplamaCalculator";

type ComponentRow = {
  id: number;
  weightInput: string;
  milyemInput: string;
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 3) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

let nextRowId = 3;

export default function HasHesaplamaCalculator() {
  const [metal, setMetal] = useState<MetalType>("altin");
  const [rows, setRows] = useState<ComponentRow[]>([
    { id: 1, weightInput: "10", milyemInput: "916" },
    { id: 2, weightInput: "5", milyemInput: "750" },
  ]);

  const [pureNeededInput, setPureNeededInput] = useState("5");
  const [reverseMilyemInput, setReverseMilyemInput] = useState("916");

  const standardGrades = getStandardGrades(metal);

  const components = useMemo(
    () =>
      rows.map((row) => ({
        weightGrams: parseNumericValue(row.weightInput),
        milyem: parseNumericValue(row.milyemInput),
      })),
    [rows]
  );

  const result = useMemo(
    () => calculateAlloyMix(components),
    [components]
  );

  const nearestGrade = useMemo(
    () =>
      result ? findNearestStandardGrade(result.resultMilyem, metal) : null,
    [result, metal]
  );

  const requiredGross = useMemo(
    () =>
      calculateRequiredGrossWeight({
        pureGramsNeeded: parseNumericValue(pureNeededInput),
        milyem: parseNumericValue(reverseMilyemInput),
      }),
    [pureNeededInput, reverseMilyemInput]
  );

  function updateRow(
    id: number,
    field: "weightInput" | "milyemInput",
    value: string
  ) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextRowId++, weightInput: "", milyemInput: "" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) =>
      prev.length > 1 ? prev.filter((row) => row.id !== id) : prev
    );
  }

  const steps = useMemo(() => {
    if (result === null) {
      return null;
    }

    const componentLines = components.map(
      (component, index) =>
        `Bileşen ${index + 1}: ${formatNumber(component.weightGrams)} g × (${formatNumber(component.milyem, 0)} / 1000) = ${formatNumber(component.weightGrams * (component.milyem / 1000))} g has`
    );

    return [
      {
        title: "1. Adım — Her bileşenin has içeriği",
        lines: componentLines,
      },
      {
        title: "2. Adım — Toplam ve sonuç ayar",
        lines: [
          "Sonuç Milyem = Toplam Has Gram / Toplam Ağırlık × 1000",
          `Sonuç Milyem = ${formatNumber(result.totalPureGrams)} / ${formatNumber(result.totalWeightGrams)} × 1000`,
          `Sonuç Milyem ≈ ${formatNumber(result.resultMilyem, 1)}`,
        ],
      },
    ];
  }, [result, components]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Nasıl çalışır: metal türünü seç, elindeki her parça/hurda için
          ağırlığını (gram) ve ayarını (milyem) gir. Tek bir bileşen
          girersen bu bir "has hesaplama" (saf metal içeriği) olur; birden
          fazla bileşen eklersen (farklı ayarlarda hurda/parça karıştırma)
          sonuç ayarı otomatik hesaplanır.
        </p>

        <label className="category-general-converter-field has-hesaplama-metal-field">
          <span>Metal Türü</span>
          <select
            value={metal}
            onChange={(event) => setMetal(event.target.value as MetalType)}
          >
            <option value="altin">Altın</option>
            <option value="gumus">Gümüş</option>
          </select>
        </label>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="atomic-mass-isotope-row has-hesaplama-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>Bileşen {index + 1}: ağırlık (g)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.weightInput}
                  onChange={(event) =>
                    updateRow(row.id, "weightInput", event.target.value)
                  }
                />
              </label>
              <label className="category-general-converter-field">
                <span>Ayar (milyem)</span>
                <input
                  inputMode="decimal"
                  type="text"
                  value={row.milyemInput}
                  onChange={(event) =>
                    updateRow(row.id, "milyemInput", event.target.value)
                  }
                />
              </label>
              <label className="category-general-converter-field">
                <span>Hızlı seç</span>
                <select
                  value=""
                  onChange={(event) => {
                    if (event.target.value) {
                      updateRow(row.id, "milyemInput", event.target.value);
                    }
                  }}
                >
                  <option value="">Standart ayar seç</option>
                  {standardGrades.map((grade) => (
                    <option key={grade.milyem} value={grade.milyem}>
                      {grade.label}
                    </option>
                  ))}
                </select>
              </label>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="atomic-mass-remove-button"
                  onClick={() => removeRow(row.id)}
                  aria-label={`Bileşen ${index + 1}'i kaldır`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="engineering-target-button atomic-mass-add-button"
          onClick={addRow}
        >
          + Bileşen Ekle
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>
            Geçerli ağırlık (g) ve ayar (0-1000 milyem) girerek sonucu
            görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam Ağırlık</span>
              <strong>{formatNumber(result.totalWeightGrams)} g</strong>
            </div>
            <div>
              <span>Toplam Has (Saf) Ağırlık</span>
              <strong>{formatNumber(result.totalPureGrams)} g</strong>
            </div>
            <div>
              <span>Sonuç Ayar</span>
              <strong>
                {formatNumber(result.resultMilyem, 1)} milyem (%
                {formatNumber(result.resultPercent, 2)})
                {nearestGrade ? ` — ${nearestGrade.label}'a yakın` : ""}
              </strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Adım Adım Çözüm</h3>
          {steps.map((step) => (
            <div className="calculator-step" key={step.title}>
              <p className="calculator-step-title">{step.title}</p>
              {step.lines.map((line) => (
                <p className="calculator-step-line" key={line}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="has-hesaplama-reverse-section">
        <h3>Tersten Hesap: Ne Kadar Alaşım Eritmelisin?</h3>
        <p className="calculator-usage-hint">
          Elde etmek istediğin saf (has) miktarı ve hangi ayarda alaşım
          eriteceğini gir; kaç gram brüt alaşıma ihtiyacın olduğunu
          hesaplayalım.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>İstenen Has (Saf) Miktar (g)</span>
            <input
              inputMode="decimal"
              type="text"
              value={pureNeededInput}
              onChange={(event) => setPureNeededInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Ayar (milyem)</span>
            <input
              inputMode="decimal"
              type="text"
              value={reverseMilyemInput}
              onChange={(event) => setReverseMilyemInput(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Hızlı seç</span>
            <select
              value=""
              onChange={(event) => {
                if (event.target.value) {
                  setReverseMilyemInput(event.target.value);
                }
              }}
            >
              <option value="">Standart ayar seç</option>
              {standardGrades.map((grade) => (
                <option key={grade.milyem} value={grade.milyem}>
                  {grade.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="category-general-converter-equality">
          {requiredGross === null
            ? "Geçerli değerler girerek gerekli brüt ağırlığı görebilirsin."
            : `Gerekli brüt ağırlık: ${formatNumber(requiredGross)} g`}
        </p>
      </div>
    </div>
  );
}
