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
  en: { rates: ["1", "10", "20"], defaultRate: "20" },
  de: { rates: ["7", "19"], defaultRate: "19" },
  fr: { rates: ["5.5", "10", "20"], defaultRate: "20" },
  es: { rates: ["4", "10", "21"], defaultRate: "21" },
  "es-419": { rates: ["16", "19", "21"], defaultRate: "16" },
  pt: { rates: ["12", "17", "18"], defaultRate: "18" },
  it: { rates: ["4", "5", "10", "22"], defaultRate: "22" },
  nl: { rates: ["9", "21"], defaultRate: "21" },
  sv: { rates: ["6", "12", "25"], defaultRate: "25" },
  no: { rates: ["12", "15", "25"], defaultRate: "25" },
  da: { rates: ["25"], defaultRate: "25" },
  ar: { rates: ["5", "15"], defaultRate: "15" },
  uz: { rates: ["12"], defaultRate: "12" },
  bn: { rates: ["5", "7.5", "10", "15"], defaultRate: "15" },
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
      direction: "Hesap Yonu",
      amount: "Tutar (TL)",
      rate: "KDV Orani",
      customRate: "Ozel Oran (%)",
    },
    directions: {
      "exclusive-to-inclusive": "KDV Haric -> KDV Dahil",
      "inclusive-to-exclusive": "KDV Dahil -> KDV Haric",
    },
    rateOptions: {
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
      custom: "Custom rate",
    },
    resultLabels: {
      baseAmount: "Base Amount",
      vatAmount: "VAT Amount",
      totalAmount: "Total with VAT",
    },
    emptyState: "Enter a valid amount and rate to see the result.",
  },
  fr: {
    labels: {
      direction: "Sens du calcul",
      amount: "Montant (EUR)",
      rate: "Taux de TVA",
      customRate: "Taux personnalisé (%)",
    },
    directions: {
      "exclusive-to-inclusive": "HT -> TTC",
      "inclusive-to-exclusive": "TTC -> HT",
    },
    rateOptions: {
      custom: "Taux personnalisé",
    },
    resultLabels: {
      baseAmount: "Montant HT",
      vatAmount: "Montant de la TVA",
      totalAmount: "Total TTC",
    },
    emptyState: "Saisissez un montant et un taux valides pour voir le résultat.",
  },
  es: {
    labels: {
      direction: "Tipo de cálculo",
      amount: "Importe (EUR)",
      rate: "Tipo de IVA",
      customRate: "Tipo personalizado (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Sin IVA -> Con IVA",
      "inclusive-to-exclusive": "Con IVA -> Sin IVA",
    },
    rateOptions: {
      custom: "Tipo personalizado",
    },
    resultLabels: {
      baseAmount: "Base imponible",
      vatAmount: "Cuota de IVA",
      totalAmount: "Total con IVA",
    },
    emptyState: "Introduce un importe y un tipo válidos para ver el resultado.",
  },
  "es-419": {
    labels: {
      direction: "Tipo de cálculo",
      amount: "Monto ($)",
      rate: "Tasa de IVA",
      customRate: "Tasa personalizada (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Sin IVA -> Con IVA",
      "inclusive-to-exclusive": "Con IVA -> Sin IVA",
    },
    rateOptions: {
      custom: "Tasa personalizada",
    },
    resultLabels: {
      baseAmount: "Monto base",
      vatAmount: "Monto del IVA",
      totalAmount: "Total con IVA",
    },
    emptyState: "Ingresa un monto y una tasa válidos para ver el resultado.",
  },
  pt: {
    labels: {
      direction: "Tipo de cálculo",
      amount: "Valor (R$)",
      rate: "Alíquota do imposto",
      customRate: "Alíquota personalizada (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Sem imposto -> Com imposto",
      "inclusive-to-exclusive": "Com imposto -> Sem imposto",
    },
    rateOptions: {
      custom: "Alíquota personalizada",
    },
    resultLabels: {
      baseAmount: "Valor base",
      vatAmount: "Valor do imposto",
      totalAmount: "Total com imposto",
    },
    emptyState: "Digite um valor e uma alíquota válidos para ver o resultado.",
  },
  it: {
    labels: {
      direction: "Direzione del calcolo",
      amount: "Importo (EUR)",
      rate: "Aliquota IVA",
      customRate: "Aliquota personalizzata (%)",
    },
    directions: {
      "exclusive-to-inclusive": "IVA esclusa -> IVA inclusa",
      "inclusive-to-exclusive": "IVA inclusa -> IVA esclusa",
    },
    rateOptions: {
      custom: "Aliquota personalizzata",
    },
    resultLabels: {
      baseAmount: "Imponibile",
      vatAmount: "Importo IVA",
      totalAmount: "Totale IVA inclusa",
    },
    emptyState: "Inserisci un importo e un'aliquota validi per vedere il risultato.",
  },
  nl: {
    labels: {
      direction: "Berekeningsrichting",
      amount: "Bedrag (EUR)",
      rate: "Btw-tarief",
      customRate: "Eigen tarief (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Exclusief btw -> inclusief btw",
      "inclusive-to-exclusive": "Inclusief btw -> exclusief btw",
    },
    rateOptions: {
      custom: "Eigen tarief",
    },
    resultLabels: {
      baseAmount: "Bedrag excl. btw",
      vatAmount: "Btw-bedrag",
      totalAmount: "Totaal incl. btw",
    },
    emptyState: "Voer een geldig bedrag en tarief in om het resultaat te zien.",
  },
  sv: {
    labels: {
      direction: "Beräkningsriktning",
      amount: "Belopp (kr)",
      rate: "Momssats",
      customRate: "Egen sats (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Exkl. moms -> inkl. moms",
      "inclusive-to-exclusive": "Inkl. moms -> exkl. moms",
    },
    rateOptions: {
      custom: "Egen sats",
    },
    resultLabels: {
      baseAmount: "Belopp exkl. moms",
      vatAmount: "Momsbelopp",
      totalAmount: "Totalt inkl. moms",
    },
    emptyState: "Ange ett giltigt belopp och en giltig sats för att se resultatet.",
  },
  no: {
    labels: {
      direction: "Beregningsretning",
      amount: "Beløp (kr)",
      rate: "Mva-sats",
      customRate: "Egen sats (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Eks. mva -> inkl. mva",
      "inclusive-to-exclusive": "Inkl. mva -> eks. mva",
    },
    rateOptions: {
      custom: "Egen sats",
    },
    resultLabels: {
      baseAmount: "Beløp eks. mva",
      vatAmount: "Mva-beløp",
      totalAmount: "Totalt inkl. mva",
    },
    emptyState: "Angi et gyldig beløp og en gyldig sats for å se resultatet.",
  },
  da: {
    labels: {
      direction: "Beregningsretning",
      amount: "Beløb (kr.)",
      rate: "Momssats",
      customRate: "Egen sats (%)",
    },
    directions: {
      "exclusive-to-inclusive": "Ekskl. moms -> inkl. moms",
      "inclusive-to-exclusive": "Inkl. moms -> ekskl. moms",
    },
    rateOptions: {
      custom: "Egen sats",
    },
    resultLabels: {
      baseAmount: "Beløb ekskl. moms",
      vatAmount: "Momsbeløb",
      totalAmount: "I alt inkl. moms",
    },
    emptyState: "Indtast et gyldigt beløb og en gyldig sats for at se resultatet.",
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
    emptyState: "Geben Sie einen gueltigen Betrag und Steuersatz ein.",
  },
  ar: {
    labels: {
      direction: "اتجاه الحساب",
      amount: "المبلغ",
      rate: "نسبة الضريبة",
      customRate: "نسبة مخصصة (%)",
    },
    directions: {
      "exclusive-to-inclusive": "من الصافي إلى الإجمالي",
      "inclusive-to-exclusive": "من الإجمالي إلى الصافي",
    },
    rateOptions: {
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
      direction: "Hisoblash Yo'nalishi",
      amount: "Miqdor (so'm)",
      rate: "QQS Stavkasi",
      customRate: "O'zgacha Stavka (%)",
    },
    directions: {
      "exclusive-to-inclusive": "QQS siz -> QQS bilan",
      "inclusive-to-exclusive": "QQS bilan -> QQS siz",
    },
    rateOptions: {
      custom: "O'zgacha stavka",
    },
    resultLabels: {
      baseAmount: "Asosiy Summa",
      vatAmount: "QQS Summasi",
      totalAmount: "QQS bilan Jami",
    },
    emptyState: "Natijani ko'rish uchun to'g'ri miqdor va stavka kiriting.",
  },
bn: {
    labels: {
      direction: "হিসাবের দিক",
      amount: "পরিমাণ (৳)",
      rate: "ভ্যাটের হার",
      customRate: "নিজস্ব হার (%)",
    },
    directions: {
      "exclusive-to-inclusive": "ভ্যাট ছাড়া -> ভ্যাটসহ",
      "inclusive-to-exclusive": "ভ্যাটসহ -> ভ্যাট ছাড়া",
    },
    rateOptions: {
      custom: "নিজস্ব হার",
    },
    resultLabels: {
      baseAmount: "মূল পরিমাণ",
      vatAmount: "ভ্যাটের পরিমাণ",
      totalAmount: "ভ্যাটসহ মোট",
    },
    emptyState: "ফলাফল দেখতে একটি বৈধ পরিমাণ ও হার লিখুন।",
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
  const copy = copyByLocale[locale === "ru" ? "en" : locale];
  const settings = vatSettingsByLocale[locale === "ru" ? "en" : locale];
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
