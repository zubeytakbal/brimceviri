"use client";

import { useState } from "react";
import { crossRate, formatMoney, formatRate } from "../../converter/fx/fxMath";
import { fillTemplate, parseAmountInput } from "./fxClientHelpers";

export type FxMultiConverterLabels = {
  amount: string;
  from: string;
  to: string;
  swap: string;
  resultTemplate: string; // "{amount} {from} = {result} {to}"
  rateTemplate: string; // "1 {from} = {rate} {to}"
  invalid: string;
};

type Props = {
  // yalnizca secilebilir para birimlerinin USD bazli kurlari
  rates: Record<string, number>;
  options: Array<{ code: string; label: string }>;
  defaultFrom: string;
  defaultTo: string;
  numberLocale: string;
  labels: FxMultiConverterLabels;
};

// Hub sayfasi ve gomulebilir widget icin coklu para birimi cevirici.
export default function FxMultiConverter({ rates, options, defaultFrom, defaultTo, numberLocale, labels }: Props) {
  const [input, setInput] = useState("100");
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);

  const amount = parseAmountInput(input);
  const rate = crossRate(rates, from, to);
  const result = amount !== null && rate !== null ? amount * rate : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="paint-calculator-grid fx-grid-3">
          <label className="category-general-converter-field">
            <span>{labels.amount}</span>
            <input type="text" inputMode="decimal" autoComplete="off" value={input} onChange={(event) => setInput(event.target.value)} />
          </label>
          <label className="category-general-converter-field">
            <span>{labels.from}</span>
            <select value={from} onChange={(event) => setFrom(event.target.value)}>
              {options.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>{labels.to}</span>
            <select value={to} onChange={(event) => setTo(event.target.value)}>
              {options.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="engineering-targets">
          <div className="engineering-target-grid">
            <button
              type="button"
              className="engineering-target-button"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
            >
              {"⇄"} {labels.swap}
            </button>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {result === null || rate === null ? (
          <strong>{labels.invalid}</strong>
        ) : (
          <>
            <strong>
              {fillTemplate(labels.resultTemplate, {
                amount: formatMoney(amount!, numberLocale),
                from,
                result: formatMoney(result, numberLocale),
                to,
              })}
            </strong>
            <p className="fx-markup-verdict">{fillTemplate(labels.rateTemplate, { from, rate: formatRate(rate, numberLocale), to })}</p>
          </>
        )}
      </div>
    </div>
  );
}
