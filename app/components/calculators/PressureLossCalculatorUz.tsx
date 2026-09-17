"use client";

import { useMemo, useState } from "react";
import { calculatePressureLoss } from "../../converter/pressureLossCalculator";

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

const materialPresetsUz: { label: string; c: number }[] = [
  { label: "PVC / PE (plastik)", c: 150 },
  { label: "Mis", c: 140 },
  { label: "Yangi po'lat quvur", c: 120 },
  { label: "Ishlatilgan / zanglagan po'lat quvur", c: 100 },
  { label: "Cho'yan", c: 100 },
  { label: "Beton quvur", c: 130 },
  { label: "Maxsus qiymat", c: 0 },
];

export default function PressureLossCalculatorUz() {
  const [lengthInput, setLengthInput] = useState("100");
  const [diameterInput, setDiameterInput] = useState("50");
  const [flowInput, setFlowInput] = useState("2");
  const [materialIndex, setMaterialIndex] = useState(0);
  const [customCInput, setCustomCInput] = useState("150");

  const selectedMaterial = materialPresetsUz[materialIndex];
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
          <span>Quvur Uzunligi (m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={lengthInput}
            onChange={(event) => setLengthInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Quvur Diametri (mm)</span>
          <input
            inputMode="decimal"
            type="text"
            value={diameterInput}
            onChange={(event) => setDiameterInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Sarf (L/s)</span>
          <input
            inputMode="decimal"
            type="text"
            value={flowInput}
            onChange={(event) => setFlowInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Quvur Materiali</span>
          <select
            value={materialIndex}
            onChange={(event) => setMaterialIndex(Number(event.target.value))}
          >
            {materialPresetsUz.map((preset, index) => (
              <option key={preset.label} value={index}>
                {preset.label}
                {preset.c > 0 ? ` (C=${preset.c})` : ""}
              </option>
            ))}
          </select>
        </label>
        {selectedMaterial.c === 0 && (
          <label className="category-general-converter-field">
            <span>Hazen-Uilyams C Koeffitsienti</span>
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib bosim yo&apos;qotilishini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yuk Yo&apos;qotilishi (Jami)</span>
              <strong>{formatNumber(result.headLossM)} m suv ustuni</strong>
            </div>
            <div>
              <span>Yuk Yo&apos;qotilishi (km uchun)</span>
              <strong>{formatNumber(result.headLossPerKm)} m/km</strong>
            </div>
            <div>
              <span>Bosim Yo&apos;qotilishi</span>
              <strong>{formatNumber(result.pressureLossBar)} bar</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Hisoblash bosimli suv liniyalari uchun amal qiluvchi
        Hazen-Uilyams formulasiga asoslangan: hf = 10,67×L×Q^1,852 /
        (C^1,852×D^4,87). C koeffitsienti quvur materiali va yuza
        notekisligiga qarab o&apos;zgaradi; yuqoridagi qiymatlar
        odatiy ma&apos;lumotnoma qiymatlaridir, o&apos;z
        quvuringizning haqiqiy C qiymatini bilsangiz &quot;Maxsus
        qiymat&quot; varianti bilan kiritishingiz mumkin.
      </p>
    </div>
  );
}
