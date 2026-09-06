"use client";

import { useMemo, useState } from "react";
import { calculatePressureLoss } from "../converter/pressureLossCalculator";

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

const materialPresets: { label: string; c: number }[] = [
  { label: "PVC / PE (plastik)", c: 150 },
  { label: "Bakır", c: 140 },
  { label: "Yeni çelik boru", c: 120 },
  { label: "Kullanılmış / paslı çelik boru", c: 100 },
  { label: "Dökme demir", c: 100 },
  { label: "Beton boru", c: 130 },
  { label: "Özel değer", c: 0 },
];

export default function PressureLossCalculator() {
  const [lengthInput, setLengthInput] = useState("100");
  const [diameterInput, setDiameterInput] = useState("50");
  const [flowInput, setFlowInput] = useState("2");
  const [materialIndex, setMaterialIndex] = useState(0);
  const [customCInput, setCustomCInput] = useState("150");

  const selectedMaterial = materialPresets[materialIndex];
  const hazenWilliamsC =
    selectedMaterial.c > 0
      ? selectedMaterial.c
      : parseNumericValue(customCInput);

  const result = useMemo(
    () =>
      calculatePressureLoss({
        lengthM: parseNumericValue(lengthInput),
        diameterMm: parseNumericValue(diameterInput),
        flowLps: parseNumericValue(flowInput),
        hazenWilliamsC,
      }),
    [lengthInput, diameterInput, flowInput, hazenWilliamsC]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Boru Uzunluğu (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lengthInput}
            onChange={(event) => setLengthInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Boru Çapı (mm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={diameterInput}
            onChange={(event) => setDiameterInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Debi (L/s)</span>
          <input
            inputMode="decimal"
            type="text"
            value={flowInput}
            onChange={(event) => setFlowInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Boru Malzemesi</span>
          <select
            value={materialIndex}
            onChange={(event) => setMaterialIndex(Number(event.target.value))}
          >
            {materialPresets.map((preset, index) => (
              <option key={preset.label} value={index}>
                {preset.label}
                {preset.c > 0 ? ` (C=${preset.c})` : ""}
              </option>
            ))}
          </select>
        </label>
        {selectedMaterial.c === 0 && (
          <label className="category-general-converter-field">
            <span>Hazen-Williams C Katsayısı</span>
            <input
              inputMode="decimal"
              type="text"
              value={customCInput}
              onChange={(event) => setCustomCInput(event.target.value)}
            />
          </label>
        )}
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Geçerli değerler girerek basınç kaybını görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yük Kaybı (Toplam)</span>
              <strong>{formatNumber(result.headLossM)} m su sütunu</strong>
            </div>
            <div>
              <span>Yük Kaybı (km başına)</span>
              <strong>{formatNumber(result.headLossPerKm)} m/km</strong>
            </div>
            <div>
              <span>Basınç Kaybı</span>
              <strong>{formatNumber(result.pressureLossBar)} bar</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Hesaplama, basınçlı su hatları için geçerli Hazen-Williams
        formülüne dayanır: hf = 10,67×L×Q^1,852 / (C^1,852×D^4,87). C
        katsayısı boru malzemesi ve yüzey pürüzlülüğüne göre değişir;
        yukarıdaki değerler tipik referans değerlerdir, kendi
        borunun gerçek C değerini biliyorsan &quot;Özel değer&quot;
        seçeneğiyle girebilirsin.
      </p>
    </div>
  );
}
