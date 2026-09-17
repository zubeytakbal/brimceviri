"use client";

import { useMemo, useState } from "react";
import {
  calculateCbm,
  type CbmPackageInput,
  type FreightMode,
} from "../../converter/cbmCalculator";

type PackageRow = {
  id: number;
  lengthInput: string;
  widthInput: string;
  heightInput: string;
  quantityInput: string;
  weightInput: string;
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

const modeLabelsUz: Record<FreightMode, string> = {
  deniz: "Dengiz Yo'li (1 m³ = 1000 kg)",
  kara: "Quruqlik Yo'li (1 m³ ≈ 333 kg)",
  hava: "Havo Yo'li (1 m³ ≈ 167 kg)",
  ozel: "Maxsus koeffitsiyent",
};

let nextRowId = 2;

export default function CbmCalculatorUz() {
  const [rows, setRows] = useState<PackageRow[]>([
    {
      id: 1,
      lengthInput: "80",
      widthInput: "60",
      heightInput: "50",
      quantityInput: "1",
      weightInput: "30",
    },
  ]);
  const [mode, setMode] = useState<FreightMode>("hava");
  const [customDivisorInput, setCustomDivisorInput] = useState("4000");

  const packages: CbmPackageInput[] = useMemo(
    () =>
      rows.map((row) => ({
        lengthCm: parseNumericValue(row.lengthInput),
        widthCm: parseNumericValue(row.widthInput),
        heightCm: parseNumericValue(row.heightInput),
        quantity: parseNumericValue(row.quantityInput),
        actualWeightKg: parseNumericValue(row.weightInput),
      })),
    [rows]
  );

  const customDivisor = parseNumericValue(customDivisorInput);

  const result = useMemo(
    () => calculateCbm(packages, mode, customDivisor),
    [packages, mode, customDivisor]
  );

  function updateRow(
    id: number,
    field: keyof Omit<PackageRow, "id">,
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
        heightInput: "",
        quantityInput: "1",
        weightInput: "",
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
        <span>Tashish Turi</span>
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as FreightMode)}
        >
          <option value="deniz">{modeLabelsUz.deniz}</option>
          <option value="kara">{modeLabelsUz.kara}</option>
          <option value="hava">{modeLabelsUz.hava}</option>
          <option value="ozel">{modeLabelsUz.ozel}</option>
        </select>
      </label>

      {mode === "ozel" && (
        <label className="category-general-converter-field">
          <span>Maxsus Koeffitsiyent (kg = sm³ / koeffitsiyent)</span>
          <input
            inputMode="decimal"
            type="text"
            value={customDivisorInput}
            onChange={(event) => setCustomDivisorInput(event.target.value)}
          />
        </label>
      )}

      <div className="atomic-mass-isotope-list">
        {rows.map((row, index) => (
          <div className="atomic-mass-isotope-row" key={row.id}>
            <label className="category-general-converter-field">
              <span>Uzunlik (sm)</span>
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
              <span>Balandlik (sm)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.heightInput}
                onChange={(event) =>
                  updateRow(row.id, "heightInput", event.target.value)
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
            <label className="category-general-converter-field">
              <span>Haqiqiy Og&apos;irlik (kg/dona)</span>
              <input
                inputMode="decimal"
                type="text"
                value={row.weightInput}
                onChange={(event) =>
                  updateRow(row.id, "weightInput", event.target.value)
                }
              />
            </label>
            {rows.length > 1 && (
              <button
                type="button"
                className="atomic-mass-remove-button"
                onClick={() => removeRow(row.id)}
                aria-label={`${index + 1}-koli o'chirish`}
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
        + Koli Qo&apos;shish
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            To&apos;g&apos;ri o&apos;lcham va son qiymatlarini kiritib
            CBM va hajmiy og&apos;irlikni ko&apos;rishingiz mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Jami CBM</span>
              <strong>{formatNumber(result.totalCbm, 4)} m³</strong>
            </div>
            <div>
              <span>Jami Haqiqiy Og&apos;irlik</span>
              <strong>{formatNumber(result.totalActualWeight)} kg</strong>
            </div>
            <div>
              <span>Jami Hajmiy Og&apos;irlik</span>
              <strong>{formatNumber(result.totalVolumetricWeight)} kg</strong>
            </div>
            <div>
              <span>To&apos;lovga Asos Og&apos;irlik</span>
              <strong>{formatNumber(result.chargeableWeight)} kg</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Hajmiy og&apos;irlik koeffitsiyentlari (dengiz 1000, quruqlik
        3000, havo 6000) sohada keng qo&apos;llaniladigan standart
        qiymatlardir; lekin tashuvchi firmaga qarab farq qilishi
        mumkin (ayniqsa havo yo&apos;lida ba&apos;zi tashuvchilar 5000
        koeffitsiyentini ishlatadi). Aniq navlun hisobi uchun tashuvchi
        firmaning qo&apos;llaydigan koeffitsiyentini &quot;Maxsus
        koeffitsiyent&quot; bandi orqali kiritishingiz mumkin.
        To&apos;lovga asos og&apos;irlik — haqiqiy og&apos;irlik bilan
        hajmiy og&apos;irlikning kattasidir.
      </p>
    </div>
  );
}
