"use client";

import { useState } from "react";
import { bankMarkup, formatMoney, formatPercent, formatRate, type MarkupDirection } from "../../converter/fx/fxMath";
import { fillTemplate, parseAmountInput } from "./fxClientHelpers";

export type FxMarkupLabels = {
  directionLabel: string;
  buy: string; // "{from} alıyorum"
  sell: string; // "{from} bozduruyorum"
  amount: string; // "Miktar ({from})"
  bankRate: string; // "Bankanın kuru (1 {from} = ? {to})"
  midRate: string; // "Referans ara kur"
  prompt: string;
  cost: string; // "Kur farkı maliyeti"
  markup: string; // "Ara kura göre fark"
  midTotal: string; // "Ara kurla tutar"
  bankTotal: string; // "Banka kuruyla tutar"
  favorable: string; // banka kuru kullanicinin lehine gorunuyorsa
  bands: [string, string, string, string]; // <0,5 / <1,5 / <3 / >=3
  note: string;
  percentTemplate: string; // "%{v}" veya "{v}%"
};

type Props = {
  from: string;
  to: string;
  midRate: number;
  numberLocale: string;
  labels: FxMarkupLabels;
};

function band(percent: number, bands: FxMarkupLabels["bands"]) {
  if (percent < 0.5) return bands[0];
  if (percent < 1.5) return bands[1];
  if (percent < 3) return bands[2];
  return bands[3];
}

export default function FxMarkupCalculator({ from, to, midRate, numberLocale, labels }: Props) {
  const [direction, setDirection] = useState<MarkupDirection>("buy");
  const [amountInput, setAmountInput] = useState("1000");
  const [bankInput, setBankInput] = useState("");

  const amount = parseAmountInput(amountInput);
  const bankRate = parseAmountInput(bankInput);
  const result = amount !== null && bankRate !== null ? bankMarkup(midRate, bankRate, amount, direction) : null;
  const vars = { from, to };
  // Isaret sablonun disina konur: TR "+%2,98", EN "+2.98%".
  const percent = (value: number) => {
    const sign = value > 0 ? "+" : value < 0 ? "\u2212" : "";
    return sign + fillTemplate(labels.percentTemplate, { v: formatPercent(Math.abs(value), numberLocale) });
  };

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{labels.directionLabel}</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            {(["buy", "sell"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={direction === option}
                className={`engineering-target-button${direction === option ? " is-active" : ""}`}
                onClick={() => setDirection(option)}
              >
                {fillTemplate(option === "buy" ? labels.buy : labels.sell, vars)}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid fx-grid-2">
          <label className="category-general-converter-field">
            <span>{fillTemplate(labels.amount, vars)}</span>
            <input inputMode="decimal" type="text" autoComplete="off" value={amountInput} onChange={(event) => setAmountInput(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>{fillTemplate(labels.bankRate, vars)}</span>
            <input
              inputMode="decimal"
              type="text"
              autoComplete="off"
              placeholder={formatRate(midRate * (direction === "buy" ? 1.02 : 0.98), numberLocale)}
              value={bankInput}
              onChange={(event) => setBankInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {!result ? (
          <strong>{fillTemplate(labels.prompt, vars)}</strong>
        ) : (
          <>
            <div className="paint-calculator-result-grid fx-markup-grid">
              <div>
                <span>{labels.cost}</span>
                <strong>
                  {formatMoney(Math.max(result.costInTo, 0), numberLocale)} {to}
                </strong>
              </div>
              <div>
                <span>{labels.markup}</span>
                <strong>{percent(result.markupPercent)}</strong>
              </div>
              <div>
                <span>{labels.midTotal}</span>
                <strong>
                  {formatMoney(result.midTotalInTo, numberLocale)} {to}
                </strong>
              </div>
              <div>
                <span>{labels.bankTotal}</span>
                <strong>
                  {formatMoney(result.bankTotalInTo, numberLocale)} {to}
                </strong>
              </div>
            </div>
            <p className="fx-markup-verdict">{result.costInTo <= 0 ? labels.favorable : band(result.markupPercent, labels.bands)}</p>
          </>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>{labels.midRate}:</strong> 1 {from} = {formatRate(midRate, numberLocale)} {to}. {labels.note}
      </p>
    </div>
  );
}
