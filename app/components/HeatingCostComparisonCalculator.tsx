"use client";

import { useState } from "react";
import {
  boilerEfficiencyOptions,
  calculateHeatingCostComparison,
} from "../converter/heatingCostComparison";
import { manualElectricityPriceDefault } from "../converter/evVsIceComparison";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function HeatingCostComparisonCalculator() {
  const [gasPrice, setGasPrice] = useState("");
  const [boilerId, setBoilerId] = useState(boilerEfficiencyOptions[0].id);
  const [electricityPrice, setElectricityPrice] = useState(
    String(manualElectricityPriceDefault.priceTl)
  );
  const [acScop, setAcScop] = useState("3.5");
  const [annualHeatNeed, setAnnualHeatNeed] = useState("");

  const boiler =
    boilerEfficiencyOptions.find((option) => option.id === boilerId) ??
    boilerEfficiencyOptions[0];

  const result = calculateHeatingCostComparison({
    gasPriceTlPerM3: parseNumericValue(gasPrice),
    boilerEfficiencyPercent: boiler.efficiencyPercent,
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    acScop: parseNumericValue(acScop),
    annualHeatNeedKwh: annualHeatNeed.trim() ? parseNumericValue(annualHeatNeed) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Güncel Doğalgaz Fiyatı (₺/m³)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Faturandan bak"
            value={gasPrice}
            onChange={(event) => setGasPrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kombi Tipi</span>
          <select value={boilerId} onChange={(event) => setBoilerId(event.target.value)}>
            {boilerEfficiencyOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
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
          <span>Klimanın Isıtma SCOP Değeri</span>
          <input
            type="text"
            inputMode="decimal"
            value={acScop}
            onChange={(event) => setAcScop(event.target.value)}
          />
          <small className="calculator-field-note">
            Cihazın enerji etiketinde belirtilir; A sınıfı inverter
            klimalarda genelde 3,5-4 arası, ürüne göre değişir.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yıllık Isı İhtiyacı (kWh, opsiyonel)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Biliyorsan gir, toplam TL farkını göster"
            value={annualHeatNeed}
            onChange={(event) => setAnnualHeatNeed(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek karşılaştırmayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Kombi ile 1 kWh Isı Maliyeti</td>
                  <td>{formatNumber(result.gasCostPerKwhHeat)} ₺</td>
                </tr>
                <tr>
                  <td>Klima ile 1 kWh Isı Maliyeti</td>
                  <td>{formatNumber(result.acCostPerKwhHeat)} ₺</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Sonuç</strong>
                  </td>
                  <td>
                    <strong>
                      {result.cheaperOption === "gas" ? "Kombi" : "Klima"} yaklaşık %
                      {formatNumber(result.percentCheaper, 0)} daha ucuz
                    </strong>
                  </td>
                </tr>
                {result.annualGasCostTl !== null && result.annualAcCostTl !== null && (
                  <>
                    <tr>
                      <td>Yıllık Kombi Maliyeti</td>
                      <td>{formatNumber(result.annualGasCostTl, 0)} ₺</td>
                    </tr>
                    <tr>
                      <td>Yıllık Klima Maliyeti</td>
                      <td>{formatNumber(result.annualAcCostTl, 0)} ₺</td>
                    </tr>
                    <tr>
                      <td>Yıllık Fark</td>
                      <td>{formatNumber(result.annualDifferenceTl ?? 0, 0)} ₺</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Doğalgaz-kWh dönüşümü EPDK&apos;nın resmi
        standart değerine (1 Sm³ = 10,64 kWh) dayanır. Kombi verimi ve
        klima SCOP değeri cihazdan cihaza değişir; kendi cihazının
        teknik özelliklerine bakarak bu değerleri güncelleyebilirsin.
        Klima SCOP değeri özellikle 0°C altı dış sıcaklıklarda düşer,
        bu hesaplama sezonluk bir ortalama varsayar.
      </p>
    </div>
  );
}
