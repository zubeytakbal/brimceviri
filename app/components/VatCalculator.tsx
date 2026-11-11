"use client";

import { useMemo, useState } from "react";
import type { Locale } from "../i18n/config";
import { formatLocalizedNumber } from "../i18n/toolLocales";
import { formatWithCurrency } from "./localeCurrency";
import {
  calculateVat,
  type VatCalculatorInput,
  type VatDirection,
} from "../converter/vatCalculator";

// Her dilin hitap ettigi ulkenin standart KDV oranlari (para birimi: localeCurrency.ts).
// Brezilya'da KDV yerine eyalete gore degisen ICMS, Latin Amerika'da ise
// ulkeye gore farkli oranlar var; bu dillerde yaygin oranlar verildi,
// "ozel oran" secenegi her dilde acik.
type VatSettings = { rates: string[]; defaultRate: string };

const vatSettingsByLocale: Record<Exclude<Locale, "ru">, VatSettings> = {
  tr: { rates: ["1", "10", "20"], defaultRate: "20" },
  // Ingilizce: Birlesik Krallik oranlari (standart %20, indirimli %5, sifir %0);
  // para birimi yazilmaz, arac her para birimiyle calisir.
  en: { rates: ["0", "5", "20"], defaultRate: "20" },
  de: { rates: ["7", "19"], defaultRate: "19" },
};

type VatCopy = {
  labels: {
    direction: string;
    amount: string;
    rate: string;
    customRate: string;
  };
  directions: Record<VatDirection, string>;
  rateOptions: { custom: string };
  resultLabels: {
    baseAmount: string;
    vatAmount: string;
    totalAmount: string;
  };
  emptyState: string;
};

const copyByLocale: Record<Exclude<Locale, "ru">, VatCopy> = {
  tr: {
    labels: {
      direction: "Hesap Yönü",
      amount: "Tutar (TL)",
      rate: "KDV Oranı",
      customRate: "Özel Oran (%)",
    },
    directions: {
      "exclusive-to-inclusive": "KDV Hariç -> KDV Dahil",
      "inclusive-to-exclusive": "KDV Dahil -> KDV Hariç",
    },
    rateOptions: {
      custom: "Özel oran",
    },
    resultLabels: {
      baseAmount: "KDV Hariç Tutar (Matrah)",
      vatAmount: "KDV Tutarı",
      totalAmount: "KDV Dahil Tutar",
    },
    emptyState: "Geçerli tutar ve oran girerek sonucu görebilirsin.",
  },
  en: {
    labels: {
      direction: "Calculation Direction",
      amount: "Amount",
      rate: "VAT Rate",
      customRate: "Custom Rate (%)",
    },
    directions: {
      "exclusive-to-inclusive": "VAT exclusive -> VAT inclusive",
      "inclusive-to-exclusive": "VAT inclusive -> VAT exclusive",
    },
    rateOptions: {
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
      custom: "Eigener Satz",
    },
    resultLabels: {
      baseAmount: "Nettobetrag",
      vatAmount: "MwSt.-Betrag",
      totalAmount: "Bruttobetrag",
    },
    emptyState: "Geben Sie einen gültigen Betrag und Steuersatz ein.",
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
  // Ingilizce sayfa tek bir ulkeye bagli degil (UK, IE, BAE ...): para birimi
  // eklenmez, tutar her zaman 2 ondalikla gosterilir.
  if (locale === "en") return formatLocalizedNumber(value, locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return formatWithCurrency(formatLocalizedNumber(value, locale, { maximumFractionDigits: 2 }), locale);
}

function formatRate(rate: string, locale: Locale) {
  const formatted = formatLocalizedNumber(Number(rate), locale, { maximumFractionDigits: 2 });
  return locale === "tr" ? `%${formatted}` : `${formatted}%`;
}

export default function VatCalculator({
  locale = "tr",
}: {
  locale?: Locale;
}) {
  const copy = copyByLocale[locale];
  const settings = vatSettingsByLocale[locale];
  const rateOptions = [...settings.rates, "custom"];
  const [amount, setAmount] = useState("1000");
  const [ratePreset, setRatePreset] = useState(settings.defaultRate);
  const [customRate, setCustomRate] = useState(settings.defaultRate);
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
              setRatePreset(event.target.value)
            }
          >
            {rateOptions.map((option) => (
              <option key={option} value={option}>
                {option === "custom" ? copy.rateOptions.custom : formatRate(option, locale)}
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
