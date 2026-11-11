"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { formatWithCurrency } from "./localeCurrency";
import {
  calculateElectricityConsumption,
  type ElectricityConsumptionInput,
} from "../converter/electricityConsumptionCalculator";

const copyByLocale: Record<
  Exclude<Locale, "ru">,
  {
    labels: {
      power: string;
      hours: string;
      days: string;
      price: string;
    };
    placeholder: string;
    emptyState: string;
    resultLabels: {
      monthly: string;
      daily: string;
      yearly: string;
      yearlyCost: string;
      costHint: string;
    };
  }
> = {
  tr: {
    labels: {
      power: "Cihaz Gücü (Watt)",
      hours: "Günlük Kullanım Süresi (saat)",
      days: "Ayda Kaç Gün Kullanılıyor",
      price: "Elektrik Birim Fiyatı (TL/kWh) - isteğe bağlı",
    },
    placeholder: "Faturandaki kWh fiyatı",
    emptyState: "Geçerli değerler girerek sonucu görebilirsin.",
    resultLabels: {
      monthly: "Aylık tüketim",
      daily: "Günlük tüketim",
      yearly: "Yıllık tüketim",
      yearlyCost: "Yıllık maliyet",
      costHint: "Maliyeti de görmek için faturandaki kWh birim fiyatını gir.",
    },
  },
  en: {
    labels: {
      power: "Appliance Power (Watt)",
      hours: "Daily Usage Time (hours)",
      days: "Days Used Per Month",
      price: "Electricity rate ($ per kWh, optional)",
    },
    placeholder: "Price per kWh from your bill",
    emptyState: "Enter valid values to see the result.",
    resultLabels: {
      monthly: "Monthly consumption",
      daily: "Daily consumption",
      yearly: "Yearly consumption",
      yearlyCost: "Yearly cost",
      costHint: "Enter your electricity price per kWh to see the cost estimate.",
    },
  },
  de: {
    labels: {
      power: "Geräteleistung (Watt)",
      hours: "Tägliche Nutzungsdauer (Stunden)",
      days: "Nutzungstage pro Monat",
      price: "Strompreis (EUR/kWh) - optional",
    },
    placeholder: "Preis pro kWh aus Ihrer Rechnung",
    emptyState: "Geben Sie gültige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      monthly: "Monatlicher Verbrauch",
      daily: "Täglicher Verbrauch",
      yearly: "Jährlicher Verbrauch",
      yearlyCost: "Jährliche Kosten",
      costHint: "Geben Sie Ihren Strompreis pro kWh ein, um die Kosten zu sehen.",
    },
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatKwh(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} kWh`;
}

function formatCurrency(value: number, locale: Locale) {
  return formatWithCurrency(formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 }), locale);
}

export default function ElectricityConsumptionCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
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
          <span>{copy.labels.power}</span>
          <input
            inputMode="decimal"
            type="text"
            value={powerWatt}
            onChange={(event) => setPowerWatt(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.hours}</span>
          <input
            inputMode="decimal"
            type="text"
            value={hoursPerDay}
            onChange={(event) => setHoursPerDay(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.days}</span>
          <input
            inputMode="numeric"
            type="text"
            value={daysPerMonth}
            onChange={(event) => setDaysPerMonth(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.price}</span>
          <input
            inputMode="decimal"
            type="text"
            placeholder={copy.placeholder}
            value={kwhPrice}
            onChange={(event) => setKwhPrice(event.target.value)}
          />
        </label>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <>
            <p className="paint-calculator-liters">
              {copy.resultLabels.monthly}: <strong>{formatKwh(result.monthlyKwh, locale)}</strong>
              {result.monthlyCost !== null && (
                <>
                  {" "}
                  ~ <strong>{formatCurrency(result.monthlyCost, locale)}</strong>
                </>
              )}
            </p>

            <div className="paint-calculator-result-grid">
              <div>
                <span>{copy.resultLabels.daily}</span>
                <strong>{formatKwh(result.dailyKwh, locale)}</strong>
              </div>
              <div>
                <span>{copy.resultLabels.yearly}</span>
                <strong>{formatKwh(result.yearlyKwh, locale)}</strong>
              </div>
              {result.yearlyCost !== null && (
                <div>
                  <span>{copy.resultLabels.yearlyCost}</span>
                  <strong>{formatCurrency(result.yearlyCost, locale)}</strong>
                </div>
              )}
            </div>

            {result.monthlyCost === null && (
              <p className="category-general-converter-equality">
                {copy.resultLabels.costHint}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
