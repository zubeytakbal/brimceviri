"use client";

import { useState } from "react";
import { manualElectricityPriceDefault } from "../converter/evVsIceComparison";
import {
  calculateHeatPumpVsBoilerPayback,
  heatPumpDefaults,
} from "../converter/heatPumpVsBoilerPayback";
import { boilerEfficiencyOptions } from "../converter/heatingCostComparison";
import { buildSiteUrl } from "../siteConfig";
import ShareResultButton from "./ShareResultButton";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

function formatTl(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export default function HeatPumpVsBoilerCalculator() {
  const [gasPrice, setGasPrice] = useState("");
  const [boilerId, setBoilerId] = useState(boilerEfficiencyOptions[0].id);
  const [electricityPrice, setElectricityPrice] = useState(
    String(manualElectricityPriceDefault.priceTl),
  );
  const [heatPumpCop, setHeatPumpCop] = useState(String(heatPumpDefaults.heatPumpCop));
  const [annualHeatNeed, setAnnualHeatNeed] = useState("");
  const [initialCostDifference, setInitialCostDifference] = useState("");

  const boiler =
    boilerEfficiencyOptions.find((option) => option.id === boilerId) ??
    boilerEfficiencyOptions[0];

  const result = calculateHeatPumpVsBoilerPayback({
    gasPriceTlPerM3: parseNumericValue(gasPrice),
    boilerEfficiencyPercent: boiler.efficiencyPercent,
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    heatPumpCop: parseNumericValue(heatPumpCop),
    annualHeatNeedKwh: parseNumericValue(annualHeatNeed),
    initialCostDifferenceTl: parseNumericValue(initialCostDifference),
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
          <span>Isı Pompasının COP Değeri</span>
          <input
            type="text"
            inputMode="decimal"
            value={heatPumpCop}
            onChange={(event) => setHeatPumpCop(event.target.value)}
          />
          <small className="calculator-field-note">
            Isı pompaları için tipik aralık 3,0-5,0; cihazın enerji
            etiketinde belirtilir, varsayılan 3,8 genel bir ortalamadır.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yıllık Isı İhtiyacı (kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 12000"
            value={annualHeatNeed}
            onChange={(event) => setAnnualHeatNeed(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Isı Pompası - Kombi Kurulum Maliyeti Farkı (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 150000"
            value={initialCostDifference}
            onChange={(event) => setInitialCostDifference(event.target.value)}
          />
          <small className="calculator-field-note">
            Isı pompası sisteminin, kombi kurulumuna göre ne kadar
            daha pahalıya mal olacağı — teklif aldığın firmadan öğren.
          </small>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Kombi ile 1 kWh Isı Maliyeti</td>
                  <td>{formatNumber(result.gasCostPerKwhHeat)} ₺</td>
                </tr>
                <tr>
                  <td>Isı Pompası ile 1 kWh Isı Maliyeti</td>
                  <td>{formatNumber(result.heatPumpCostPerKwhHeat)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık Kombi Maliyeti</td>
                  <td>{formatTl(result.annualGasCostTl)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık Isı Pompası Maliyeti</td>
                  <td>{formatTl(result.annualHeatPumpCostTl)} ₺</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Tasarruf</strong>
                  </td>
                  <td>
                    <strong>{formatTl(result.annualSavingsTl)} ₺</strong>
                  </td>
                </tr>
                <tr>
                  <td>Kurulum Farkının Amortismanı</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Bu rakamlarla ısı pompası daha pahalıya geliyor"
                      : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl`}
                  </td>
                </tr>
              </tbody>
            </table>
            <ShareResultButton
              shareText={
                result.breakEvenYears === null
                  ? `Isı pompası vs kombi hesapladım, bu rakamlarla avantajlı çıkmıyor. Sen de kendi rakamlarınla hesapla:`
                  : `Isı pompası yılda ${formatTl(result.annualSavingsTl)} ₺ tasarruf ettiriyor, kurulum farkını ${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yılda kapatıyor! Sen de kendi rakamlarınla hesapla:`
              }
              shareUrl={buildSiteUrl("/isi-pompasi-kombi-karsilastirma")}
            />
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Doğalgaz-kWh dönüşümü EPDK&apos;nın resmi
        standart değerine (1 Sm³ = 10,64 kWh) dayanır. Kombi verimi ve
        ısı pompası COP değeri cihazdan cihaza değişir; kendi
        cihazının teknik özelliklerine bakarak bu değerleri
        güncelleyebilirsin. Isı pompasının COP değeri dış hava
        sıcaklığı düştükçe azalır, bu hesaplama sezonluk bir ortalama
        varsayar. Kurulum maliyeti farkı, bakım ve ömür farkları gibi
        diğer faktörleri kapsamaz.
      </p>
    </div>
  );
}
