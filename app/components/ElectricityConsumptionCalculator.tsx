"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateElectricityConsumption,
  type ElectricityConsumptionInput,
} from "../converter/electricityConsumptionCalculator";

const copyByLocale: Record<
  Locale,
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
      power: "Cihaz Gucu (Watt)",
      hours: "Gunluk Kullanim Suresi (saat)",
      days: "Ayda Kac Gun Kullaniliyor",
      price: "Elektrik Birim Fiyati (EUR/kWh) - istege bagli",
    },
    placeholder: "Faturandaki kWh fiyati",
    emptyState: "Gecerli degerler girerek sonucu gorebilirsin.",
    resultLabels: {
      monthly: "Aylik tuketim",
      daily: "Gunluk tuketim",
      yearly: "Yillik tuketim",
      yearlyCost: "Yillik maliyet",
      costHint: "Maliyeti de gormek icin faturandaki kWh birim fiyatini gir.",
    },
  },
  en: {
    labels: {
      power: "Appliance Power (Watt)",
      hours: "Daily Usage Time (hours)",
      days: "Days Used Per Month",
      price: "Electricity Rate (EUR/kWh) - optional",
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
      power: "Geraeteleistung (Watt)",
      hours: "Taegliche Nutzungsdauer (Stunden)",
      days: "Nutzungstage pro Monat",
      price: "Strompreis (EUR/kWh) - optional",
    },
    placeholder: "Preis pro kWh aus Ihrer Rechnung",
    emptyState: "Geben Sie gueltige Werte ein, um das Ergebnis zu sehen.",
    resultLabels: {
      monthly: "Monatlicher Verbrauch",
      daily: "Taeglicher Verbrauch",
      yearly: "Jaehrlicher Verbrauch",
      yearlyCost: "Jaehrliche Kosten",
      costHint: "Geben Sie Ihren Strompreis pro kWh ein, um die Kosten zu sehen.",
    },
  },
  ar: {
    labels: {
      power: "قدرة الجهاز (واط)",
      hours: "مدة الاستخدام اليومية (ساعة)",
      days: "عدد أيام الاستخدام شهريًا",
      price: "سعر الكهرباء (EUR/kWh) - اختياري",
    },
    placeholder: "سعر الكيلوواط ساعة من فاتورتك",
    emptyState: "أدخل قيمًا صحيحة لعرض النتيجة.",
    resultLabels: {
      monthly: "الاستهلاك الشهري",
      daily: "الاستهلاك اليومي",
      yearly: "الاستهلاك السنوي",
      yearlyCost: "التكلفة السنوية",
      costHint: "أدخل سعر الكهرباء لكل kWh لعرض تقدير التكلفة.",
    },
  },
uz: {
    labels: {
      power: "Appliance Power (Watt)",
      hours: "Daily Usage Time (hours)",
      days: "Days Used Per Month",
      price: "Electricity Rate (EUR/kWh) - optional",
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
bn: {
    labels: {
      power: "Appliance Power (Watt)",
      hours: "Daily Usage Time (hours)",
      days: "Days Used Per Month",
      price: "Electricity Rate (EUR/kWh) - optional",
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
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} EUR`;
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
