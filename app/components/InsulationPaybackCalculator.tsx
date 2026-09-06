"use client";

import { useState } from "react";
import {
  calculateInsulationPayback,
  insulationMaterials,
  wallMaterials,
} from "../converter/insulationPayback";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function InsulationPaybackCalculator() {
  const [wallAreaM2, setWallAreaM2] = useState("100");
  const [wallMaterialId, setWallMaterialId] = useState(wallMaterials[0].id);
  const [existingWallThicknessCm, setExistingWallThicknessCm] = useState("20");
  const [insulationMaterialId, setInsulationMaterialId] = useState(insulationMaterials[1].id);
  const [insulationThicknessCm, setInsulationThicknessCm] = useState("5");
  const [avgTempDifferenceC, setAvgTempDifferenceC] = useState("15");
  const [heatingDaysPerYear, setHeatingDaysPerYear] = useState("150");
  const [heatingEnergyPrice, setHeatingEnergyPrice] = useState("");
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
          <span>Yalıtılacak Duvar Alanı (m²)</span>
          <input
            type="text"
            inputMode="decimal"
            value={wallAreaM2}
            onChange={(event) => setWallAreaM2(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mevcut Duvar Malzemesi</span>
          <select value={wallMaterialId} onChange={(event) => setWallMaterialId(event.target.value)}>
            {wallMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Mevcut Duvar Kalınlığı (cm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={existingWallThicknessCm}
            onChange={(event) => setExistingWallThicknessCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Eklenecek Yalıtım Malzemesi</span>
          <select
            value={insulationMaterialId}
            onChange={(event) => setInsulationMaterialId(event.target.value)}
          >
            {insulationMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Yalıtım Kalınlığı (cm)</span>
          <input
            type="text"
            inputMode="decimal"
            value={insulationThicknessCm}
            onChange={(event) => setInsulationThicknessCm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Ortalama İç-Dış Sıcaklık Farkı (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            value={avgTempDifferenceC}
            onChange={(event) => setAvgTempDifferenceC(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Yıllık Isıtma Süresi (gün)</span>
          <input
            type="text"
            inputMode="decimal"
            value={heatingDaysPerYear}
            onChange={(event) => setHeatingDaysPerYear(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Isıtma Enerjisi Birim Fiyatı (₺/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. doğalgaz için ~1,5"
            value={heatingEnergyPrice}
            onChange={(event) => setHeatingEnergyPrice(event.target.value)}
          />
          <small className="calculator-field-note">
            Doğalgaz kombi için yaklaşık 1-1,5 ₺/kWh, elektrikli ısıtma
            için elektrik faturandaki birim fiyat.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yalıtım Yaptırma Maliyeti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 30000"
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
          <strong>Geçerli değerler girerek amortisman süresini gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yalıtım Öncesi Yıllık Isı Kaybı</td>
                  <td>{formatNumber(result.annualHeatLossKwhBefore)} kWh</td>
                </tr>
                <tr>
                  <td>Yalıtım Sonrası Yıllık Isı Kaybı</td>
                  <td>{formatNumber(result.annualHeatLossKwhAfter)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Enerji Tasarrufu</strong>
                  </td>
                  <td>
                    <strong>
                      {formatNumber(result.annualSavingsKwh)} kWh (
                      {formatNumber(result.annualSavingsTl)} ₺)
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Amortisman Süresi</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Yalıtım maliyeti girilmedi"
                      : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama yalnızca ısı iletimi
        (kondüksiyon) yoluyla olan ısı kaybını modeller; pencere/kapı
        boşlukları, hava sızdırmazlığı ve diğer yüzeyler hesaba dahil
        değildir. Ortalama sıcaklık farkı ve ısıtma süresi bölgene göre
        değişir; varsayılanlar genel bir Türkiye ortalamasıdır.
      </p>
    </div>
  );
}
