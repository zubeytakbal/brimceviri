"use client";

import { useMemo, useState } from "react";
import {
  calculateWeightBalance,
  type WeightBalanceItem,
} from "../../converter/weightBalanceCalculator";

type ItemRow = {
  id: number;
  label: string;
  weightInput: string;
  armInput: string;
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

let nextRowId = 5;

export default function WeightBalanceCalculatorUz() {
  const [rows, setRows] = useState<ItemRow[]>([
    { id: 1, label: "Bo'sh Samolyot", weightInput: "1500", armInput: "90" },
    { id: 2, label: "Uchuvchi + Yo'lovchi", weightInput: "170", armInput: "80" },
    { id: 3, label: "Yuk", weightInput: "40", armInput: "120" },
    { id: 4, label: "Yoqilg'i", weightInput: "150", armInput: "95" },
  ]);

  const items: WeightBalanceItem[] = useMemo(
    () =>
      rows.map((row) => ({
        weight: parseNumericValue(row.weightInput),
        arm: parseNumericValue(row.armInput),
      })),
    [rows]
  );

  const result = useMemo(() => calculateWeightBalance(items), [items]);

  function updateRow(
    id: number,
    field: "label" | "weightInput" | "armInput",
    value: string
  ) {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { id: nextRowId++, label: "", weightInput: "", armInput: "" },
    ]);
  }

  function removeRow(id: number) {
    setRows((prev) =>
      prev.length > 1 ? prev.filter((row) => row.id !== id) : prev
    );
  }

  return (
    <div className="category-general-converter">
      <div className="atomic-mass-isotope-list">
        {rows.map((row, index) => (
          <div className="atomic-mass-isotope-row weight-balance-row" key={row.id}>
            <label className="category-general-converter-field">
              <span>Band Nomi</span>
              <input
                type="text"
                value={row.label}
                placeholder={`Band ${index + 1}`}
                onChange={(event) =>
                  updateRow(row.id, "label", event.target.value)
                }
              />
            </label>
            <label className="category-general-converter-field">
              <span>Og&apos;irlik (kg)</span>
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
              <span>Yelka / Arm (sm)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.armInput}
                onChange={(event) =>
                  updateRow(row.id, "armInput", event.target.value)
                }
              />
            </label>
            {rows.length > 1 && (
              <button
                type="button"
                className="atomic-mass-remove-button"
                onClick={() => removeRow(row.id)}
                aria-label={`${row.label || `Band ${index + 1}`} olib tashlash`}
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
        + Band Qo&apos;shish
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri og&apos;irlik va yelka (arm) qiymatlarini kiritib og&apos;irlik markazini ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami Og&apos;irlik</span>
              <strong>{formatNumber(result.totalWeight)} kg</strong>
            </div>
            <div>
              <span>Jami Moment</span>
              <strong>{formatNumber(result.totalMoment)} kg·sm</strong>
            </div>
            <div>
              <span>Og&apos;irlik Markazi (CG)</span>
              <strong>{formatNumber(result.centerOfGravity)} sm</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Yelka (arm) qiymatlari, vositaning o&apos;z bosh nuqtasiga
        (datum) nisbatan ishlab chiqaruvchining hujjati/POH&apos;idagi
        qiymatlardir; birlik sifatida kg/sm yoki lb/dyuym izchil
        ishlatilishi kerak. Hisoblangan CG&apos;ning xavfsiz oraliqda
        ekanligini har doim vositangizning o&apos;z POH/AFM
        hujjatidagi CG zarfi (envelope) bilan solishtiring.
      </p>
    </div>
  );
}
