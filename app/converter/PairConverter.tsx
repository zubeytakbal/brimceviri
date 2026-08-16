"use client";

import { useMemo, useState } from "react";
import { convert } from "./convert";

type PairConverterProps = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  locale?: "tr" | "en" | "de";
};

function formatResult(value: number) {
  if (!Number.isFinite(value)) {
    return "";
  }

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 ||
      Math.abs(value) < 0.000001)
  ) {
    return value.toExponential(8);
  }

  return Number(value.toPrecision(12)).toString();
}

export default function PairConverter({
  category,
  fromUnit,
  toUnit,
  fromName,
  toName,
  locale = "tr",
}: PairConverterProps) {
  const [inputValue, setInputValue] = useState("1");
  const [isReversed, setIsReversed] = useState(false);

  const activeFromUnit = isReversed ? toUnit : fromUnit;
  const activeToUnit = isReversed ? fromUnit : toUnit;
  const activeFromName = isReversed ? toName : fromName;

  const result = useMemo(() => {
    if (!inputValue.trim()) {
      return "";
    }

    const numberValue = Number(inputValue.replace(",", "."));

    if (!Number.isFinite(numberValue)) {
      return "";
    }

    return formatResult(
      convert(
        category,
        numberValue,
        activeFromUnit,
        activeToUnit
      )
    );
  }, [
    inputValue,
    category,
    activeFromUnit,
    activeToUnit,
  ]);

  const valueLabel =
    locale === "en"
      ? `${activeFromName} value`
      : locale === "de"
        ? `${activeFromName}-Wert`
        : `${activeFromName} de\u011Feri`;

  const placeholder =
    locale === "en"
      ? "Enter a value"
      : locale === "de"
        ? "Wert eingeben"
        : "De\u011Fer girin";

  const swapLabel =
    locale === "en"
      ? "Reverse the conversion direction"
      : locale === "de"
        ? "Umrechnungsrichtung umkehren"
        : "D\u00F6n\u00FC\u015F\u00FCm y\u00F6n\u00FCn\u00FC de\u011Fi\u015Ftir";

  return (
    <section className="pair-converter">
      <label htmlFor="pair-converter-value">
        {valueLabel}
      </label>

      <div className="pair-converter-row">
        <div className="pair-field">
          <input
            id="pair-converter-value"
            type="text"
            inputMode="decimal"
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.target.value)
            }
            placeholder={placeholder}
          />

          <span>{activeFromUnit}</span>
        </div>

        <button
          type="button"
          className="pair-swap-button"
          onClick={() =>
            setIsReversed((current) => !current)
          }
          aria-label={swapLabel}
        >
          {"\u21C4"}
        </button>

        <div className="pair-field pair-result">
          <output aria-live="polite">
            {result || "\u2014"}
          </output>

          <span>{activeToUnit}</span>
        </div>
      </div>

      {result && (
        <p className="pair-result-text">
          {inputValue} {activeFromUnit} = {result}{" "}
          {activeToUnit}
        </p>
      )}
    </section>
  );
}
