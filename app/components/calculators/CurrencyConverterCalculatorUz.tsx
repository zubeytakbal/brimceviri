"use client";

import { useState } from "react";
import {
  convertCurrency,
  type CurrencyCode,
  type ExchangeRatesSnapshot,
} from "../../converter/exchangeRates";

const currencyLabelsUz: Record<CurrencyCode, string> = {
  TRY: "Turk Lirasi (₺)",
  USD: "AQSH Dollari ($)",
  EUR: "Evro (€)",
  GBP: "Angliya Funt Sterlingi (£)",
};

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatAmount(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 4 });
}

function formatUzDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const currencyCodes: CurrencyCode[] = ["TRY", "USD", "EUR", "GBP"];

type CurrencyConverterCalculatorUzProps = {
  rates: ExchangeRatesSnapshot | null;
};

export default function CurrencyConverterCalculatorUz({
  rates,
}: CurrencyConverterCalculatorUzProps) {
  const [amountInput, setAmountInput] = useState("100");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("TRY");

  const amount = parseNumericValue(amountInput);
  const result =
    rates && Number.isFinite(amount)
      ? convertCurrency(amount, fromCurrency, toCurrency, rates.rates)
      : null;

  return (
    <div className="category-general-converter">
      {!rates ? (
        <p className="calculator-usage-hint">
          Joriy valyuta kursini hozircha olib bo&apos;lmadi, iltimos
          keyinroq qayta urinib ko&apos;ring.
        </p>
      ) : (
        <>
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Miqdor</span>
              <input
                type="text"
                inputMode="decimal"
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Qaysi Valyutadan</span>
              <select
                value={fromCurrency}
                onChange={(event) => setFromCurrency(event.target.value as CurrencyCode)}
              >
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {currencyLabelsUz[code]}
                  </option>
                ))}
              </select>
            </label>
            <label className="category-general-converter-field">
              <span>Qaysi Valyutaga</span>
              <select
                value={toCurrency}
                onChange={(event) => setToCurrency(event.target.value as CurrencyCode)}
              >
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {currencyLabelsUz[code]}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div
            aria-live="polite"
            className="category-general-converter-result paint-calculator-result"
          >
            {result === null ? (
              <strong>To&apos;g&apos;ri miqdor kiritib natijani ko&apos;ring.</strong>
            ) : (
              <strong>
                {formatAmount(amount)} {fromCurrency} = {formatAmount(result)} {toCurrency}
              </strong>
            )}
          </div>

          <p className="calculator-usage-hint">
            <strong>Kurs ma&apos;lumoti:</strong> {rates.source}, {formatUzDate(rates.dateIso)}{" "}
            holatiga ko&apos;ra. Kurslar kunlik yangilanadi; banklar va
            valyuta ayirboshlash shoxobchalari oldi-sotdida kichik
            farq (spread) qo&apos;llaydi, shuning uchun haqiqiy
            operatsiya kursi bu yerda ko&apos;rsatilgandan biroz
            farqli bo&apos;lishi mumkin.
          </p>
        </>
      )}
    </div>
  );
}
