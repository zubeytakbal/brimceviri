"use client";

import { useMemo, useState } from "react";
import { convert } from "../converter/convert";
import { getCategoryUnitOptions } from "./categoryUnitOptions";

type UnitOption = {
  value: string;
  label: string;
  symbol: string;
};

type CategoryUnitConverterProps = {
  category: string;
  locale: "tr" | "en" | "de";
  // Verilmezse getCategoryUnitOptions(category, locale) kullanilir (kategori
  // sayfalarindaki standart davranis). Verilirse, ayni convert() motoru
  // (ayni category/symbol eslesmesi) uzerinde SADECE bu birimler secilebilir
  // olur -- ornegin bir sayfanin "tarihi" birimlerle sinirli bir alt kume
  // gostermesi icin (tam kategori listesini tekrarlamadan).
  unitOptions?: UnitOption[];
};

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue
    .trim()
    .replace(/\s+/g, "")
    .replace(/,/g, ".");

  if (!normalizedValue) {
    return null;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue)
    ? numericValue
    : Number.NaN;
}

function formatDisplayNumber(
  locale: "tr" | "en" | "de",
  value: number
) {
  if (!Number.isFinite(value)) {
    return "\u2014";
  }

  const localeName =
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : "en-US";
  const absoluteValue = Math.abs(value);

  if (absoluteValue === 0) {
    return new Intl.NumberFormat(localeName).format(0);
  }

  if (absoluteValue >= 1_000_000_000 || absoluteValue < 0.0001) {
    return new Intl.NumberFormat(localeName, {
      maximumSignificantDigits: 8,
      notation: "scientific",
    }).format(value);
  }

  return new Intl.NumberFormat(localeName, {
    maximumSignificantDigits: absoluteValue >= 1 ? 12 : 10,
  }).format(value);
}

export default function CategoryUnitConverter({
  category,
  locale,
  unitOptions: unitOptionsOverride,
}: CategoryUnitConverterProps) {
  const derivedUnitOptions = useMemo(
    () => getCategoryUnitOptions(category, locale),
    [category, locale]
  );
  const unitOptions = unitOptionsOverride ?? derivedUnitOptions;
  const defaultFromUnit = unitOptions[0]?.value ?? "";
  const defaultToUnit =
    unitOptions[1]?.value ?? unitOptions[0]?.value ?? "";

  const [inputValue, setInputValue] = useState("1");
  const [fromUnit, setFromUnit] = useState(defaultFromUnit);
  const [toUnit, setToUnit] = useState(defaultToUnit);
  const activeFromUnit = unitOptions.some(
    (unitOption) => unitOption.value === fromUnit
  )
    ? fromUnit
    : defaultFromUnit;
  const activeToUnit = unitOptions.some(
    (unitOption) => unitOption.value === toUnit
  )
    ? toUnit
    : defaultToUnit;

  const parsedInputValue = parseNumericValue(inputValue);
  const fromUnitOption = unitOptions.find(
    (unitOption) => unitOption.value === activeFromUnit
  );
  const toUnitOption = unitOptions.find(
    (unitOption) => unitOption.value === activeToUnit
  );
  const resultValue =
    parsedInputValue === null
      ? null
      : convert(
          category,
          parsedInputValue,
          activeFromUnit,
          activeToUnit
        );
  const equalityValue =
    activeFromUnit && activeToUnit
      ? convert(category, 1, activeFromUnit, activeToUnit)
      : Number.NaN;

  const labels =
    locale === "tr"
      ? {
          value: "De\u011Fer",
          from: "Kaynak birim",
          to: "Hedef birim",
          result: "Anl\u0131k sonu\u00E7",
          swap: "Y\u00F6n\u00FC de\u011Fi\u015Ftir",
          invalid:
            "Ge\u00E7erli bir say\u0131 girerek sonucu g\u00F6rebilirsiniz.",
        }
      : locale === "de"
        ? {
            value: "Wert",
            from: "Ausgangseinheit",
            to: "Zieleinheit",
            result: "Direktes Ergebnis",
            swap: "Richtung wechseln",
            invalid:
              "Geben Sie eine g\u00FCltige Zahl ein, um das Ergebnis zu sehen.",
          }
        : {
            value: "Value",
            from: "From unit",
            to: "To unit",
            result: "Live result",
            swap: "Swap direction",
            invalid:
              "Enter a valid number to view the result.",
          };

  if (unitOptions.length === 0) {
    return null;
  }

  return (
    <div className="category-general-converter">
      <div className="category-general-converter-grid">
        <label className="category-general-converter-field">
          <span>{labels.value}</span>
          <input
            inputMode="decimal"
            type="text"
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.target.value)
            }
          />
        </label>

        <label className="category-general-converter-field">
          <span>{labels.from}</span>
          <select
            value={activeFromUnit}
            onChange={(event) =>
              setFromUnit(event.target.value)
            }
          >
            {unitOptions.map((unitOption) => (
              <option
                key={`from-${unitOption.value}`}
                value={unitOption.value}
              >
                {unitOption.label}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>{labels.to}</span>
          <select
            value={activeToUnit}
            onChange={(event) =>
              setToUnit(event.target.value)
            }
          >
            {unitOptions.map((unitOption) => (
              <option
                key={`to-${unitOption.value}`}
                value={unitOption.value}
              >
                {unitOption.label}
              </option>
            ))}
          </select>
        </label>

        <div className="category-general-converter-actions">
          <button
            className="category-general-converter-swap"
            type="button"
            onClick={() => {
              setFromUnit(activeToUnit);
              setToUnit(activeFromUnit);
            }}
          >
            {labels.swap}
          </button>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result"
      >
        <p>{labels.result}</p>

        {parsedInputValue === null ||
        Number.isNaN(parsedInputValue) ||
        !Number.isFinite(resultValue ?? Number.NaN) ? (
          <strong>{labels.invalid}</strong>
        ) : (
          <strong>
            {formatDisplayNumber(locale, resultValue ?? 0)}{" "}
            {toUnitOption?.symbol ?? toUnit}
          </strong>
        )}

        <span className="category-general-converter-equality">
          {`1 ${fromUnitOption?.symbol ?? activeFromUnit} = ${formatDisplayNumber(locale, equalityValue)} ${toUnitOption?.symbol ?? activeToUnit}`}
        </span>
      </div>
    </div>
  );
}
