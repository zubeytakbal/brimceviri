"use client";

import { useMemo, useState } from "react";
import {
  calculateElectricityConsumption,
  type ElectricityConsumptionInput,
} from "../converter/electricityConsumptionCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatKwh(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} kWh`;
}

function formatCurrency(value: number) {
  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺`;
}

export default function ElectricityConsumptionCalculator() {
  const [powerWatt, setPowerWatt] = useState("1500");
  const [hoursPerDay, setHoursPerDay] = useState("2");
  const [daysPerMonth, setDaysPerMonth] = useState("30");
  const [kwhPrice, setKwhPrice] = useState("");

  const input: ElectricityConsumptionInput = useMemo(
    () => ({
      powerWatt: parseNumericValue(powerWatt) ?? Number.NaN,
      hoursPerDay: parseNumericValue(hoursPerDay) ?? Number.NaN,
      daysPerMonth: parseNumericValue(daysPerMonth) ?? Number.NaN,
      kwhPrice: parseNumericValue(kwhPrice),
    }),
    [powerWatt, hoursPerDay, daysPerMonth, kwhPrice]
  );

  const result = useMemo(
    () => calculateElectricityConsumption(input),
    [input]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Cihaz Gücü (Watt)</span>
          <input
            inputMode="decimal"
            type="text"
            value={powerWatt}
            onChange={(event) => setPowerWatt(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Günlük Kullanım Süresi (saat)</span>
          <input
            inputMode="decimal"
            type="text"
            value={hoursPerDay}
            onChange={(event) => setHoursPerDay(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Ayda Kaç Gün Kullanılıyor</span>
          <input
            inputMode="numeric"
            type="text"
            value={daysPerMonth}
            onChange={(event) => setDaysPerMonth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>Elektrik Birim Fiyatı (₺/kWh) — isteğe bağlı</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder="Faturandaki kWh fiyatı"
            value={kwhPrice}
            onChange={(event) => setKwhPrice(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              Aylık tüketim: <strong>{formatKwh(result.monthlyKwh)}</strong>
              {result.monthlyCost !== null && (
                <>
                  {" "}
                  ≈ <strong>{formatCurrency(result.monthlyCost)}</strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>Günlük tüketim</span>
                <strong>{formatKwh(result.dailyKwh)}</strong>
              </div>
              <div>
                <span>Yıllık tüketim</span>
                <strong>{formatKwh(result.yearlyKwh)}</strong>
              </div>
              {result.yearlyCost !== null && (
                <div>
                  <span>Yıllık maliyet</span>
                  <strong>{formatCurrency(result.yearlyCost)}</strong>
                </div>
              )}
            </div>

            {result.monthlyCost === null && (
              <p className="category-general-converter-equality">
                Maliyeti de görmek için faturandaki kWh birim fiyatını gir.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
