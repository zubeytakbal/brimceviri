"use client";

import { useState } from "react";
import {
  calculateInsulationPayback,
  insulationMaterials,
  wallMaterials,
} from "../../converter/insulationPayback";

const wallMaterialLabelsUz: Record<string, string> = {
  brick: "G'isht (kovakli)",
  "aerated-concrete": "Gazobeton",
  concrete: "Beton",
  wood: "Yog'och",
};

const insulationMaterialLabelsUz: Record<string, string> = {
  glassWool: "Shisha Jun",
  rockWool: "Tosh Jun",
  eps: "EPS (Kengaytirilgan Polistirol)",
  xps: "XPS (Ekstruziyalangan Polistirol)",
  pur: "Poliuretan Ko'pik (PUR)",
};

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function InsulationPaybackCalculatorUz() {
  const [wallAreaM2, setWallAreaM2] = useState("100");
  const [wallMaterialId, setWallMaterialId] = useState(wallMaterials[0].id);
  const [existingWallThicknessCm, setExistingWallThicknessCm] = useState("20");
  const [insulationMaterialId, setInsulationMaterialId] = useState(insulationMaterials[1].id);
  const [insulationThicknessCm, setInsulationThicknessCm] = useState("5");
  const [avgTempDifferenceC, setAvgTempDifferenceC] = useState("15");
  const [heatingDaysPerYear, setHeatingDaysPerYear] = useState("150");
  const [heatingEnergyPrice, setHeatingEnergyPrice] = useState("650");
  const [insulationCostTl, setInsulationCostTl] = useState("");

  const wallMaterial =
    wallMaterials.find((material) => material.id === wallMaterialId) ?? wallMaterials[0];
  const insulationMaterial =
    insulationMaterials.find((material) => material.id === insulationMaterialId) ??
    insulationMaterials[0];

  const result = calculateInsulationPayback({
    wallAreaM2: parseNumericValue(wallAreaM2),
    existingWallThicknessCm: parseNumericValue(existingWallThicknessCm),
    existingWallConductivityWmK: wallMaterial.conductivityWmK,
    insulationThicknessCm: parseNumericValue(insulationThicknessCm),
    insulationConductivityWmK: insulationMaterial.conductivityWmK,
    avgTempDifferenceC: parseNumericValue(avgTempDifferenceC),
    heatingDaysPerYear: parseNumericValue(heatingDaysPerYear),
    heatingEnergyPriceTlPerKwh: parseNumericValue(heatingEnergyPrice),
    insulationCostTl: insulationCostTl.trim() ? parseNumericValue(insulationCostTl) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Izolyatsiya Qilinadigan Devor Maydoni (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={wallAreaM2}
            onChange={(event) => setWallAreaM2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mavjud Devor Materiali</span>
          <select value={wallMaterialId} onChange={(event) => setWallMaterialId(event.target.value)}>
            {wallMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {wallMaterialLabelsUz[material.id] ?? material.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Mavjud Devor Qalinligi (sm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={existingWallThicknessCm}
            onChange={(event) => setExistingWallThicknessCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Qo&apos;shiladigan Izolyatsiya Materiali</span>
          <select
            value={insulationMaterialId}
            onChange={(event) => setInsulationMaterialId(event.target.value)}
          >
            {insulationMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {insulationMaterialLabelsUz[material.id] ?? material.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Izolyatsiya Qalinligi (sm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={insulationThicknessCm}
            onChange={(event) => setInsulationThicknessCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;rtacha Ichki-Tashqi Harorat Farqi (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            value={avgTempDifferenceC}
            onChange={(event) => setAvgTempDifferenceC(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Yillik Isitish Muddati (kun)</span>
          <input
            type="text"
            inputMode="decimal"
            value={heatingDaysPerYear}
            onChange={(event) => setHeatingDaysPerYear(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Isitish Energiyasi Birlik Narxi (so&apos;m/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Joriy narxni kiriting"
            value={heatingEnergyPrice}
            onChange={(event) => setHeatingEnergyPrice(event.target.value)}
          />
          <small className="calculator-field-note">
            Standart elektr tarifi (650 so&apos;m/kWh, 2026-yil iyun
            holatiga ko&apos;ra) oldindan to&apos;ldirilgan. Gaz bilan
            isitish uchun gaz narxini (so&apos;m/m³) 10,64ga bo&apos;lib
            kWh narxiga aylantiring, yoki hisobingizdagi aniq narxni
            kiriting.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Izolyatsiya Qildirish Narxi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 8000000"
            value={insulationCostTl}
            onChange={(event) => setInsulationCostTl(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib qoplanish muddatini ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Izolyatsiyadan Oldingi Yillik Issiqlik Yo&apos;qotilishi</td>
                  <td>{formatNumber(result.annualHeatLossKwhBefore)} kWh</td>
                </tr>
                <tr>
                  <td>Izolyatsiyadan Keyingi Yillik Issiqlik Yo&apos;qotilishi</td>
                  <td>{formatNumber(result.annualHeatLossKwhAfter)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Energiya Tejamkorligi</strong>
                  </td>
                  <td>
                    <strong>
                      {formatNumber(result.annualSavingsKwh)} kWh (
                      {formatNumber(result.annualSavingsTl)} so&apos;m)
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Qoplanish Muddati</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Izolyatsiya narxi kiritilmadi"
                      : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu hisob faqat devordan issiqlik
        o&apos;tkazish (konduksiya) orqali bo&apos;ladigan yo&apos;qotishni
        modellashtiradi; deraza/eshik bo&apos;shliqlari, havo
        o&apos;tkazmasligi va boshqa yuzalar hisobga kiritilmagan.
        O&apos;rtacha harorat farqi va isitish muddati hududingizga
        qarab o&apos;zgaradi.
      </p>
    </div>
  );
}
