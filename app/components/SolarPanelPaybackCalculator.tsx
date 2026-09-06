"use client";

import { useState } from "react";
import { calculateSolarPayback, solarRegions } from "../converter/solarPanelPayback";
import { manualElectricityPriceDefault } from "../converter/evVsIceComparison";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function SolarPanelPaybackCalculator() {
  const [systemSizeKwp, setSystemSizeKwp] = useState("5");
  const [regionId, setRegionId] = useState(solarRegions[1].id);
  const [electricityPrice, setElectricityPrice] = useState(
    String(manualElectricityPriceDefault.priceTl)
  );
  const [systemCostTl, setSystemCostTl] = useState("");

  const region = solarRegions.find((item) => item.id === regionId) ?? solarRegions[1];

  const result = calculateSolarPayback({
    systemSizeKwp: parseNumericValue(systemSizeKwp),
    regionYieldKwhPerKwp: region.yieldKwhPerKwp,
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    systemCostTl: systemCostTl.trim() ? parseNumericValue(systemCostTl) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Sistem Gücü (kWp)</span>
          <input
            type="text"
            inputMode="decimal"
            value={systemSizeKwp}
            onChange={(event) => setSystemSizeKwp(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Bölge</span>
          <select value={regionId} onChange={(event) => setRegionId(event.target.value)}>
            {solarRegions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Elektrik Fiyatı (₺/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
          <small className="calculator-field-note">
            Son güncelleme: {manualElectricityPriceDefault.lastUpdatedLabel} (240
            kWh/ay üstü mesken dilimi, KDV dahil).
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Sistem Kurulum Maliyeti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 150000"
            value={systemCostTl}
            onChange={(event) => setSystemCostTl(event.target.value)}
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
                  <td>Yıllık Üretim</td>
                  <td>{formatNumber(result.annualProductionKwh)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Tasarruf</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result.annualSavingsTl)} ₺</strong>
                  </td>
                </tr>
                <tr>
                  <td>Amortisman Süresi</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Kurulum maliyeti girilmedi"
                      : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama, üretilen elektriğin
        tamamının kendi tüketimini karşıladığını varsayar. Gerçekte
        fazla üretim şebekeye mahsuplaşma yoluyla genellikle daha
        düşük bir fiyattan satılır; bu durumda gerçek amortisman
        süresi burada hesaplanandan biraz daha uzun olabilir.
        Bölgesel verim değerleri genel referanstır, çatı yönü ve
        gölgelenme gerçek üretimi etkiler.
      </p>
    </div>
  );
}
