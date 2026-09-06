"use client";

import { useState } from "react";
import { bulbEquivalents, calculateLedSavings } from "../converter/ledVsIncandescent";
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

export default function LedSavingsCalculator() {
  const [equivalentId, setEquivalentId] = useState(bulbEquivalents[1].id);
  const [bulbCount, setBulbCount] = useState("10");
  const [dailyUsageHours, setDailyUsageHours] = useState("5");
  const [newWattage, setNewWattage] = useState(String(bulbEquivalents[1].ledW));
  const [electricityPrice, setElectricityPrice] = useState(
    String(manualElectricityPriceDefault.priceTl)
  );
  const [ledTotalCostTl, setLedTotalCostTl] = useState("");

  const equivalent =
    bulbEquivalents.find((item) => item.id === equivalentId) ?? bulbEquivalents[1];

  const result = calculateLedSavings({
    bulbCount: parseNumericValue(bulbCount),
    dailyUsageHours: parseNumericValue(dailyUsageHours),
    oldWattage: equivalent.incandescentW,
    newWattage: parseNumericValue(newWattage),
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    ledTotalCostTl: ledTotalCostTl.trim() ? parseNumericValue(ledTotalCostTl) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Ampul Sayısı (adet)</span>
          <input
            type="text"
            inputMode="decimal"
            value={bulbCount}
            onChange={(event) => setBulbCount(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Günlük Kullanım Süresi (saat)</span>
          <input
            type="text"
            inputMode="decimal"
            value={dailyUsageHours}
            onChange={(event) => setDailyUsageHours(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mevcut (Akkor/Halojen) Ampul Gücü</span>
          <select
            value={equivalentId}
            onChange={(event) => {
              const nextId = event.target.value;
              setEquivalentId(nextId);
              const nextEquivalent = bulbEquivalents.find((item) => item.id === nextId);
              if (nextEquivalent) setNewWattage(String(nextEquivalent.ledW));
            }}
          >
            {bulbEquivalents.map((item) => (
              <option key={item.id} value={item.id}>
                {item.incandescentW} W
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Yeni LED Ampul Gücü (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={newWattage}
            onChange={(event) => setNewWattage(event.target.value)}
          />
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
            kWh/ay üstü mesken dilimi, KDV dahil) — faturandan bakıp
            güncelleyebilirsin.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>LED Ampullerin Toplam Maliyeti (₺)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Örn. 500"
            value={ledTotalCostTl}
            onChange={(event) => setLedTotalCostTl(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>Geçerli değerler girerek tasarrufu gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Mevcut Ampullerin Yıllık Tüketimi</td>
                  <td>{formatNumber(result.annualOldKwh)} kWh</td>
                </tr>
                <tr>
                  <td>LED Ampullerin Yıllık Tüketimi</td>
                  <td>{formatNumber(result.annualNewKwh)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Tasarruf</strong>
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
                      ? "LED maliyeti girilmedi"
                      : result.breakEvenYears < 1
                        ? `${formatNumber(result.breakEvenYears * 365, 0)} gün`
                        : `${result.breakEvenYears.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} yıl`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> LED güç eşdeğerleri, akkor ampulle aynı
        lümen (parlaklık) çıktısını veren tipik LED gücüne dayanan
        genel referanstır — ürüne göre birkaç watt farklılık
        gösterebilir, ambalajdaki lümen değerine bakarak kendi LED
        gücünü güncelleyebilirsin.
      </p>
    </div>
  );
}
