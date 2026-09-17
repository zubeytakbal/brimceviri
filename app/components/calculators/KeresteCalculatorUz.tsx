"use client";

import { useMemo, useState } from "react";
import {
  calculateKerestehacmi,
  type KerestePieceInput,
} from "../../converter/keresteCalculator";

type PieceRow = {
  id: number;
  lengthInput: string;
  widthInput: string;
  thicknessInput: string;
  quantityInput: string;
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

let nextRowId = 2;

export default function KeresteCalculatorUz() {
  const [rows, setRows] = useState<PieceRow[]>([
    {
      id: 1,
      lengthInput: "3",
      widthInput: "10",
      thicknessInput: "5",
      quantityInput: "10",
    },
  ]);
  const [wastePercentInput, setWastePercentInput] = useState("5");

  const pieces: KerestePieceInput[] = useMemo(
    () =>
      rows.map((row) => ({
        lengthM: parseNumericValue(row.lengthInput),
        widthCm: parseNumericValue(row.widthInput),
        thicknessCm: parseNumericValue(row.thicknessInput),
        quantity: parseNumericValue(row.quantityInput),
      })),
    [rows]
  );

  const wastePercent = parseNumericValue(wastePercentInput);

  const result = useMemo(
    () => calculateKerestehacmi(pieces, wastePercent),
    [pieces, wastePercent]
  );

  function updateRow(
    id: number,
    field: keyof Omit<PieceRow, "id">,
    value: string
  ) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      {
        id: nextRowId++,
        lengthInput: "",
        widthInput: "",
        thicknessInput: "",
        quantityInput: "1",
      },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) =>
      prev.length > 1 ? prev.filter((row) => row.id !== id) : prev
    );
  }

  return (
    <div className="category-general-converter">
      <label className="category-general-converter-field">
        <span>Zaxira Ulushi (%)</span>
        <input
          inputMode="decimal"
          type="text"
          value={wastePercentInput}
          onChange={(event) => setWastePercentInput(event.target.value)}
        />
      </label>

      <div className="atomic-mass-isotope-list">
        {rows.map((row, index) => (
          <div className="atomic-mass-isotope-row" key={row.id}>
            <label className="category-general-converter-field">
              <span>Uzunlik (m)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.lengthInput}
                onChange={(event) =>
                  updateRow(row.id, "lengthInput", event.target.value)
                }
              />
            </label>
            <label className="category-general-converter-field">
              <span>Kenglik (sm)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.widthInput}
                onChange={(event) =>
                  updateRow(row.id, "widthInput", event.target.value)
                }
              />
            </label>
            <label className="category-general-converter-field">
              <span>Qalinlik (sm)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.thicknessInput}
                onChange={(event) =>
                  updateRow(row.id, "thicknessInput", event.target.value)
                }
              />
            </label>
            <label className="category-general-converter-field">
              <span>Soni</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.quantityInput}
                onChange={(event) =>
                  updateRow(row.id, "quantityInput", event.target.value)
                }
              />
            </label>
            {rows.length > 1 && (
              <button
                type="button"
                className="atomic-mass-remove-button"
                onClick={() => removeRow(row.id)}
                aria-label={`${index + 1}-yog'ochni o'chirish`}
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
        + Yog&apos;och Qo&apos;shish
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri o&apos;lcham va son qiymatlarini kiritib
            jami hajmni ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami Hajm</span>
              <strong>{formatNumber(result.totalVolumeM3)} m³</strong>
            </div>
            <div>
              <span>Zaxira Miqdori</span>
              <strong>{formatNumber(result.wasteVolumeM3)} m³</strong>
            </div>
            <div>
              <span>Zaxira Dahil Jami</span>
              <strong>{formatNumber(result.totalVolumeWithWasteM3)} m³</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Hisoblash, har bir yog&apos;och bo&apos;lagining uzunlik ×
        kenglik × qalinlik hajmini topib sonlariga ko&apos;paytiradi.
        Zaxira ulushi, kesish va ishlov berish yo&apos;qotishlarini
        qoplash uchun jami hajmga qo&apos;shiladi; keng
        qo&apos;llaniladigan nisbat %5-10 oralig&apos;ida, o&apos;z
        ishingizga qarab o&apos;zgartirishingiz mumkin.
      </p>
    </div>
  );
}
