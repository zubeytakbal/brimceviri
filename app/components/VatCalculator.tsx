"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import {
  calculateVat,
  type VatCalculatorInput,
  type VatDirection,
} from "../converter/vatCalculator";

const rateOptions = ["1", "10", "20", "custom"] as const;

type VatCopy = {
  labels: {
    direction: string;
    amount: string;
    rate: string;
    customRate: string;
  };
  directions: Record<VatDirection, string>;
  rateOptions: Record<(typeof rateOptions)[number], string>;
  resultLabels: {
    baseAmount: string;
    vatAmount: string;
    totalAmount: string;
  };
  emptyState: string;
};

const copyByLocale: Record<Locale, VatCopy> = {
  tr: {
    labels: {
      direction: "Hesap Yonu",
      amount: "Tutar (EUR)",
      rate: "KDV Orani",
      customRate: "Ozel Oran (%)",
    },
    directions: {
      "exclusive-to-inclusive": "KDV Haric -> KDV Dahil",
      "inclusive-to-exclusive": "KDV Dahil -> KDV Haric",
    },
    rateOptions: {
      "1": "%1",
      "10": "%10",
      "20": "%20",
      custom: "Ozel oran",
    },
    resultLabels: {
      baseAmount: "KDV Haric Tutar (Matrah)",
      vatAmount: "KDV Tutari",
      totalAmount: "KDV Dahil Tutar",
    },
    emptyState: "Gecerli tutar ve oran girerek sonucu gorebilirsin.",
  },
  en: {
    labels: {
      direction: "Calculation Direction",
      amount: "Amount (EUR)",
      rate: "VAT Rate",
      customRate: "Custom Rate (%)",
    },
    directions: {
      "exclusive-to-inclusive": "VAT exclusive -> VAT inclusive",
      "inclusive-to-exclusive": "VAT inclusive -> VAT exclusive",
    },
    rateOptions: {
      "1": "1%",
      "10": "10%",
      "20": "20%",
      custom: "Custom rate",
    },
    resultLabels: {
      baseAmount: "Base Amount",
      vatAmount: "VAT Amount",
      totalAmount: "Total with VAT",
    },
    emptyState: "Enter a valid amount and rate to see the result.",
  },
  de: {
    labels: {
      direction: "Berechnungsrichtung",
      amount: "Betrag (EUR)",
      rate: "MwSt.-Satz",
      customRate: "Eigener Satz (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Netto -> Brutto",
      "inclusive-to-exclusive": "Brutto -> Netto",
    },
    rateOptions: {
      "1": "1 %",
      "10": "10 %",
      "20": "20 %",
      custom: "Eigener Satz",
    },
    resultLabels: {
      baseAmount: "Nettobetrag",
      vatAmount: "MwSt.-Betrag",
      totalAmount: "Bruttobetrag",
    },
    emptyState: "Geben Sie einen gueltigen Betrag und Steuersatz ein.",
  },
  ar: {
    labels: {
      direction: "اتجاه الحساب",
      amount: "المبلغ (EUR)",
      rate: "نسبة الضريبة",
      customRate: "نسبة مخصصة (%)",
    },
    directions: {
      "exclusive-to-inclusive": "من الصافي إلى الإجمالي",
      "inclusive-to-exclusive": "من الإجمالي إلى الصافي",
    },
    rateOptions: {
      "1": "1%",
      "10": "10%",
      "20": "20%",
      custom: "نسبة مخصصة",
    },
    resultLabels: {
      baseAmount: "المبلغ الصافي",
      vatAmount: "قيمة الضريبة",
      totalAmount: "المبلغ الإجمالي",
    },
    emptyState: "أدخل مبلغًا ونسبة صحيحة لعرض النتيجة.",
  },
uz: {
    labels: {
      direction: "Calculation Direction",
      amount: "Amount (EUR)",
      rate: "VAT Rate",
      customRate: "Custom Rate (%)",
    },
    directions: {
      "exclusive-to-inclusive": "VAT exclusive -> VAT inclusive",
      "inclusive-to-exclusive": "VAT inclusive -> VAT exclusive",
    },
    rateOptions: {
      "1": "1%",
      "10": "10%",
      "20": "20%",
      custom: "Custom rate",
    },
    resultLabels: {
      baseAmount: "Base Amount",
      vatAmount: "VAT Amount",
      totalAmount: "Total with VAT",
    },
    emptyState: "Enter a valid amount and rate to see the result.",
  },
bn: {
    labels: {
      direction: "Calculation Direction",
      amount: "Amount (EUR)",
      rate: "VAT Rate",
      customRate: "Custom Rate (%)",
    },
    directions: {
      "exclusive-to-inclusive": "VAT exclusive -> VAT inclusive",
      "inclusive-to-exclusive": "VAT inclusive -> VAT exclusive",
    },
    rateOptions: {
      "1": "1%",
      "10": "10%",
      "20": "20%",
      custom: "Custom rate",
    },
    resultLabels: {
      baseAmount: "Base Amount",
      vatAmount: "VAT Amount",
      totalAmount: "Total with VAT",
    },
    emptyState: "Enter a valid amount and rate to see the result.",
  },
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatCurrency(value: number, locale: Locale) {
  return `${formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 })} EUR`;
}

export default function VatCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const [amount, setAmount] = useState("1000");
  const [ratePreset, setRatePreset] = useState<(typeof rateOptions)[number]>("20");
  const [customRate, setCustomRate] = useState("20");
  const [direction, setDirection] = useState<VatDirection>(
    "exclusive-to-inclusive"
  );

  const ratePercent =
    ratePreset === "custom" ? parseNumericValue(customRate) : Number(ratePreset);

  const input: VatCalculatorInput = useMemo(
    () => ({
      amount: parseNumericValue(amount),
      ratePercent,
      direction,
    }),
    [amount, ratePercent, direction]
  );

  const result = useMemo(() => calculateVat(input), [input]);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>{copy.labels.direction}</span>
          <select
            value={direction}
            onChange={(event) =>
              setDirection(event.target.value as VatDirection)
            }
          >
            <option value="exclusive-to-inclusive">{copy.directions["exclusive-to-inclusive"]}</option>
            <option value="inclusive-to-exclusive">{copy.directions["inclusive-to-exclusive"]}</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.amount}</span>
          <input
            inputMode="decimal"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>{copy.labels.rate}</span>
          <select
            value={ratePreset}
            onChange={(event) =>
              setRatePreset(event.target.value as (typeof rateOptions)[number])
            }
          >
            {rateOptions.map((option) => (
              <option key={option} value={option}>
                {copy.rateOptions[option]}
              </option>
            ))}
          </select>
        </label>

        {ratePreset === "custom" && (
          <label className="category-general-converter-field">
            <span>{copy.labels.customRate}</span>
            <input
              inputMode="decimal"
              type="text"
              value={customRate}
              onChange={(event) => setCustomRate(event.target.value)}
            />
          </label>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultLabels.baseAmount}</span>
              <strong>{formatCurrency(result.baseAmount, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.vatAmount}</span>
              <strong>{formatCurrency(result.vatAmount, locale)}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.totalAmount}</span>
              <strong>{formatCurrency(result.totalAmount, locale)}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
