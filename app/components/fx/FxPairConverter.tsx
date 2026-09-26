"use client";

import { useState } from "react";
import { formatMoney, formatRate } from "../../converter/fx/fxMath";
import { fillTemplate, parseAmountInput } from "./fxClientHelpers";

export type FxPairConverterLabels = {
  amount: string;
  swap: string;
  // "{amount} {from} = {result} {to}"
  resultTemplate: string;
  // "Kur: 1 {from} = {rate} {to}"
  rateTemplate: string;
  invalid: string;
};

type Props = {
  from: string;
  to: string;
  rate: number;
  numberLocale: string;
  labels: FxPairConverterLabels;
};

export default function FxPairConverter({ from, to, rate, numberLocale, labels }: Props) {
  const [input, setInput] = useState("100");
  const [reversed, setReversed] = useState(false);

  const activeFrom = reversed ? to : from;
  const activeTo = reversed ? from : to;
  const activeRate = reversed ? 1 / rate : rate;
  const amount = parseAmountInput(input);
  const result = amount === null ? null : amount * activeRate;

  return (
    <section className="pair-converter fx-pair-converter">
      <label htmlFor="fx-pair-amount">{labels.amount}</label>

      <div className="pair-converter-row">
        <div className="pair-field">
          <input
            id="fx-pair-amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <span>{activeFrom}</span>
        </div>

        <button type="button" className="pair-swap-button" onClick={() => setReversed((value) => !value)} aria-label={labels.swap}>
          {"⇄"}
        </button>

        <div className="pair-field pair-result">
          <output aria-live="polite" htmlFor="fx-pair-amount">
            {result === null ? "—" : formatMoney(result, numberLocale)}
          </output>
          <span>{activeTo}</span>
        </div>
      </div>

      {result === null ? (
        input.trim() !== "" && <p className="pair-result-text">{labels.invalid}</p>
      ) : (
        <>
          <p className="pair-result-text">
            <strong>
              {fillTemplate(labels.resultTemplate, {
                amount: formatMoney(amount!, numberLocale),
                from: activeFrom,
                result: formatMoney(result, numberLocale),
                to: activeTo,
              })}
            </strong>
          </p>
          <p className="pair-result-text fx-pair-rate-line">
            {fillTemplate(labels.rateTemplate, { from: activeFrom, rate: formatRate(activeRate, numberLocale), to: activeTo })}
          </p>
        </>
      )}
    </section>
  );
}
