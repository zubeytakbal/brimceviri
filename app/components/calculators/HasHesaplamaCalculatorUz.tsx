"use client";

import { useMemo, useState } from "react";
import {
  calculateAlloyMix,
  calculateRequiredGrossWeight,
  findNearestStandardGrade,
  getStandardGrades,
  type MetalType,
} from "../../converter/hasHesaplamaCalculator";

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

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

let nextRowId = 3;

export default function HasHesaplamaCalculatorUz() {
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
        `Tarkib ${index + 1}: ${formatNumber(component.weightGrams)} g × (${formatNumber(component.milyem, 0)} / 1000) = ${formatNumber(component.weightGrams * (component.milyem / 1000))} g sof`
    );

    return [
      {
        title: "1-Qadam — Har bir tarkibning sof miqdori",
        lines: componentLines,
      },
      {
        title: "2-Qadam — Jami va natija ayar",
        lines: [
          "Natija Milyem = Jami Sof Gramm / Jami Og'irlik × 1000",
          `Natija Milyem = ${formatNumber(result.totalPureGrams)} / ${formatNumber(result.totalWeightGrams)} × 1000`,
          `Natija Milyem ≈ ${formatNumber(result.resultMilyem, 1)}`,
        ],
      },
    ];
  }, [result, components]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">
          Qanday ishlaydi: metal turini tanlang, qo&apos;lingizdagi har
          bir bo&apos;lak/qoldiq uchun og&apos;irligini (gramm) va
          ayarini (milyem) kiriting. Faqat bitta tarkib kiritsangiz bu
          &quot;sof hisoblash&quot; (sof metall miqdori) bo&apos;ladi;
          bir nechta tarkib qo&apos;shsangiz (turli ayardagi
          qoldiq/bo&apos;lakni aralashtirish) natija ayari avtomatik
          hisoblanadi.
        </p>

        <label className="category-general-converter-field has-hesaplama-metal-field">
          <span>Metal Turi</span>
          <select
            value={metal}
            onChange={(event) => setMetal(event.target.value as MetalType)}
          >
            <option value="altin">Oltin</option>
            <option value="gumus">Kumush</option>
          </select>
        </label>

        <div className="atomic-mass-isotope-list">
          {rows.map((row, index) => (
            <div className="atomic-mass-isotope-row has-hesaplama-row" key={row.id}>
              <label className="category-general-converter-field">
                <span>Tarkib {index + 1}: og&apos;irlik (g)</span>
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
                <span>Tez tanlash</span>
                <select
                  value=""
                  onChange={(event) => {
                    if (event.target.value) {
                      updateRow(row.id, "milyemInput", event.target.value);
                    }
                  }}
                >
                  <option value="">Standart ayar tanlang</option>
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
                  aria-label={`${index + 1}-tarkibni o'chirish`}
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
          + Tarkib Qo&apos;shish
        </button>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>
            To&apos;g&apos;ri og&apos;irlik (g) va ayar (0-1000 milyem)
            kiritib natijani ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami Og&apos;irlik</span>
              <strong>{formatNumber(result.totalWeightGrams)} g</strong>
            </div>
            <div>
              <span>Jami Sof Og&apos;irlik</span>
              <strong>{formatNumber(result.totalPureGrams)} g</strong>
            </div>
            <div>
              <span>Natija Ayar</span>
              <strong>
                {formatNumber(result.resultMilyem, 1)} milyem (%
                {formatNumber(result.resultPercent, 2)})
                {nearestGrade ? ` — ${nearestGrade.label}ga yaqin` : ""}
              </strong>
            </div>
          </div>
        )}
      </div>

      {steps && (
        <div className="calculator-steps">
          <h3>Qadam-baqadam Yechim</h3>
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
        <h3>Teskari Hisob: Qancha Qotishma Eritishingiz Kerak?</h3>
        <p className="calculator-usage-hint">
          Olmoqchi bo&apos;lgan sof miqdoringizni va qaysi ayarda
          qotishma eritishingizni kiriting; necha gramm brutto
          qotishmaga muhtoj ekaningizni hisoblaymiz.
        </p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Xohlagan Sof Miqdor (g)</span>
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
            <span>Tez tanlash</span>
            <select
              value=""
              onChange={(event) => {
                if (event.target.value) {
                  setReverseMilyemInput(event.target.value);
                }
              }}
            >
              <option value="">Standart ayar tanlang</option>
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
            ? "To'g'ri qiymatlar kiritib kerakli brutto og'irlikni ko'rishingiz mumkin."
            : `Kerakli brutto og'irlik: ${formatNumber(requiredGross)} g`}
        </p>
      </div>
    </div>
  );
}
