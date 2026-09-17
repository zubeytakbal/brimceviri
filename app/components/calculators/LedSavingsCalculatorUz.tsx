"use client";

import { useState } from "react";
import { bulbEquivalents, calculateLedSavings } from "../../converter/ledVsIncandescent";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function LedSavingsCalculatorUz() {
  const [equivalentId, setEquivalentId] = useState(bulbEquivalents[1].id);
  const [bulbCount, setBulbCount] = useState("10");
  const [dailyUsageHours, setDailyUsageHours] = useState("5");
  const [newWattage, setNewWattage] = useState(String(bulbEquivalents[1].ledW));
  const [electricityPrice, setElectricityPrice] = useState("650");
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
          <span>Lampochkalar Soni (dona)</span>
          <input
            type="text"
            inputMode="decimal"
            value={bulbCount}
            onChange={(event) => setBulbCount(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kunlik Foydalanish Muddati (soat)</span>
          <input
            type="text"
            inputMode="decimal"
            value={dailyUsageHours}
            onChange={(event) => setDailyUsageHours(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Mavjud (Cho&apos;g&apos;langan/Galogen) Lampochka Quvvati</span>
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
          <span>Yangi LED Lampochka Quvvati (W)</span>
          <input
            type="text"
            inputMode="decimal"
            value={newWattage}
            onChange={(event) => setNewWattage(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Elektr Narxi (so&apos;m/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Joriy narxni kiriting"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
          <small className="calculator-field-note">
            Standart tarif (650 so&apos;m/kWh, 0-200 kVt/soat ijtimoiy
            norma doirasida, 2026-yil iyun holatiga ko&apos;ra) oldindan
            to&apos;ldirilgan; hisobingizdagi aniq narxni kiritishingiz
            mumkin.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>LED Lampochkalarning Jami Narxi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 150000"
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
          <strong>To&apos;g&apos;ri qiymatlar kiritib tejamkorlikni ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Mavjud Lampochkalarning Yillik Sarfi</td>
                  <td>{formatNumber(result.annualOldKwh)} kWh</td>
                </tr>
                <tr>
                  <td>LED Lampochkalarning Yillik Sarfi</td>
                  <td>{formatNumber(result.annualNewKwh)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Tejamkorlik</strong>
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
                      ? "LED narxi kiritilmadi"
                      : result.breakEvenYears < 1
                        ? `${formatNumber(result.breakEvenYears * 365, 0)} kun`
                        : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> LED quvvat ekvivalentlari,
        cho&apos;g&apos;langan lampochka bilan bir xil lümen
        (yorqinlik) chiqishini beradigan odatiy LED quvvatiga
        asoslangan umumiy ma&apos;lumotnomadir — mahsulotga qarab bir
        necha vatt farq qilishi mumkin, qadoqdagi lümen qiymatiga
        qarab o&apos;z LED quvvatingizni yangilashingiz mumkin.
      </p>
    </div>
  );
}
