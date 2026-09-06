"use client";

import { useState } from "react";
import {
  convertCurrency,
  currencyLabels,
  type CurrencyCode,
  type ExchangeRatesSnapshot,
} from "../converter/exchangeRates";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatAmount(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
}

function formatTrDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const currencyCodes: CurrencyCode[] = ["TRY", "USD", "EUR", "GBP"];

type CurrencyConverterCalculatorProps = {
  rates: ExchangeRatesSnapshot | null;
};

export default function CurrencyConverterCalculator({
  rates,
}: CurrencyConverterCalculatorProps) {
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
          Güncel döviz kuru şu anda alınamadı, lütfen daha sonra tekrar
          dene.
        </p>
      ) : (
        <>
          <div className="paint-calculator-grid">
            <label className="category-general-converter-field">
              <span>Miktar</span>
              <input
                type="text"
                inputMode="decimal"
                value={amountInput}
                onChange={(event) => setAmountInput(event.target.value)}
              />
            </label>
            <label className="category-general-converter-field">
              <span>Hangi Para Biriminden</span>
              <select
                value={fromCurrency}
                onChange={(event) => setFromCurrency(event.target.value as CurrencyCode)}
              >
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {currencyLabels[code]}
                  </option>
                ))}
              </select>
            </label>
            <label className="category-general-converter-field">
              <span>Hangi Para Birimine</span>
              <select
                value={toCurrency}
                onChange={(event) => setToCurrency(event.target.value as CurrencyCode)}
              >
                {currencyCodes.map((code) => (
                  <option key={code} value={code}>
                    {currencyLabels[code]}
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
              <strong>Geçerli bir miktar girerek sonucu gör.</strong>
            ) : (
              <strong>
                {formatAmount(amount)} {fromCurrency} = {formatAmount(result)} {toCurrency}
              </strong>
            )}
          </div>

          <p className="calculator-usage-hint">
            <strong>Kur bilgisi:</strong> {rates.source}, {formatTrDate(rates.dateIso)}{" "}
            itibarıyla. Kurlar günlük olarak güncellenir; bankalar ve
            döviz büroları alım-satımda küçük bir marj (spread)
            uygular, bu yüzden gerçek işlem kuru burada gösterilenden
            biraz farklı olabilir.
          </p>
        </>
      )}
    </div>
  );
}
