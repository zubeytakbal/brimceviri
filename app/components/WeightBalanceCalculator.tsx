"use client";

import { useMemo, useState } from "react";
import {
  calculateWeightBalance,
  type WeightBalanceItem,
} from "../converter/weightBalanceCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

let nextRowId = 5;

export default function WeightBalanceCalculator() {
  const [rows, setRows] = useState<ItemRow[]>([
    { id: 1, label: "Boş Uçak", weightInput: "1500", armInput: "90" },
    { id: 2, label: "Pilot + Yolcu", weightInput: "170", armInput: "80" },
    { id: 3, label: "Bagaj", weightInput: "40", armInput: "120" },
    { id: 4, label: "Yakıt", weightInput: "150", armInput: "95" },
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
              <span>Kalem Adı</span>
              <input
                type="text"
                value={row.label}
                placeholder={`Kalem ${index + 1}`}
                onChange={(event) =>
                  updateRow(row.id, "label", event.target.value)
                }
              />
            </label>
            <label className="category-general-converter-field">
              <span>Ağırlık (kg)</span>
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
              <span>Kol / Arm (cm)</span>
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
                aria-label={`${row.label || `Kalem ${index + 1}`} kaldır`}
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
        + Kalem Ekle
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli ağırlık ve kol (arm) değerleri girerek ağırlık
            merkezini görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam Ağırlık</span>
              <strong>{formatNumber(result.totalWeight)} kg</strong>
            </div>
            <div>
              <span>Toplam Moment</span>
              <strong>{formatNumber(result.totalMoment)} kg·cm</strong>
            </div>
            <div>
              <span>Ağırlık Merkezi (CG)</span>
              <strong>{formatNumber(result.centerOfGravity)} cm</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Kol (arm) değerleri, aracın kendi referans noktasına (datum)
        göre üreticinin belge/POH&apos;undaki değerlerdir; birim
        olarak kg/cm veya lb/inç tutarlı kullanılmalıdır. Hesaplanan
        CG&apos;nin güvenli aralıkta olup olmadığını her zaman aracın
        kendi POH/AFM belgesindeki CG zarfıyla (envelope)
        karşılaştır.
      </p>
    </div>
  );
}
