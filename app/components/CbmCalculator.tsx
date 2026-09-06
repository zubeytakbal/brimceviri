"use client";

import { useMemo, useState } from "react";
import {
  calculateCbm,
  type CbmPackageInput,
  type FreightMode,
} from "../converter/cbmCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const modeLabels: Record<FreightMode, string> = {
  deniz: "Deniz Yolu (1 m³ = 1000 kg)",
  kara: "Kara Yolu (1 m³ ≈ 333 kg)",
  hava: "Hava Yolu (1 m³ ≈ 167 kg)",
  ozel: "Özel katsayı",
};

let nextRowId = 2;

export default function CbmCalculator() {
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
        <span>Taşıma Modu</span>
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as FreightMode)}
        >
          <option value="deniz">{modeLabels.deniz}</option>
          <option value="kara">{modeLabels.kara}</option>
          <option value="hava">{modeLabels.hava}</option>
          <option value="ozel">{modeLabels.ozel}</option>
        </select>
      </label>

      {mode === "ozel" && (
        <label className="category-general-converter-field">
          <span>Özel Katsayı (kg = cm³ / katsayı)</span>
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
              <span>Uzunluk (cm)</span>
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
              <span>Genişlik (cm)</span>
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
              <span>Yükseklik (cm)</span>
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
              <span>Adet</span>
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
              <span>Gerçek Ağırlık (kg/adet)</span>
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
                aria-label={`Koli ${index + 1} kaldır`}
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
        + Koli Ekle
      </button>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli boyut ve adet değerleri girerek CBM ve hacimsel
            ağırlığı görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Toplam CBM</span>
              <strong>{formatNumber(result.totalCbm, 4)} m³</strong>
            </div>
            <div>
              <span>Toplam Gerçek Ağırlık</span>
              <strong>{formatNumber(result.totalActualWeight)} kg</strong>
            </div>
            <div>
              <span>Toplam Hacimsel Ağırlık</span>
              <strong>{formatNumber(result.totalVolumetricWeight)} kg</strong>
            </div>
            <div>
              <span>Ücrete Esas Ağırlık</span>
              <strong>{formatNumber(result.chargeableWeight)} kg</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Hacimsel ağırlık katsayıları (deniz 1000, kara 3000, hava
        6000) sektörde yaygın kullanılan standart değerlerdir; ancak
        taşıyıcı firmaya göre değişebilir (özellikle hava yolunda
        bazı taşıyıcılar 5000 katsayısını kullanır). Kesin navlun
        hesabı için taşıyıcı firmanın uyguladığı katsayıyı &quot;Özel
        katsayı&quot; seçeneğiyle girebilirsin. Ücrete esas ağırlık,
        gerçek ağırlık ile hacimsel ağırlığın büyük olanıdır.
      </p>
    </div>
  );
}
