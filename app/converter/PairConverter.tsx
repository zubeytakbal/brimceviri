"use client";

import { useMemo, useState } from "react";
import { convert } from "./convert";

type PairConverterProps = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  locale?: "tr" | "en" | "de" | "ar" | "uz" | "bn";
};

function getNumberLocale(
  locale: "tr" | "en" | "de" | "ar" | "uz" | "bn"
) {
  if (locale === "tr") {
    return "tr-TR";
  }

  if (locale === "de") {
    return "de-DE";
  }

  if (locale === "ar") {
    return "ar";
  }

  if (locale === "uz") {
    return "uz-UZ";
  }

  if (locale === "bn") {
    return "bn-BD";
  }

  return "en-US";
}

function formatResult(
  value: number,
  locale: "tr" | "en" | "de" | "ar" | "uz" | "bn"
) {
  if (!Number.isFinite(value)) {
    return "";
  }

  const numberLocale = getNumberLocale(locale);

  if (
    value !== 0 &&
    (Math.abs(value) >= 1_000_000_000 ||
      Math.abs(value) < 0.000001)
  ) {
    return new Intl.NumberFormat(numberLocale, {
      maximumSignificantDigits: 8,
      notation: "scientific",
    }).format(value);
  }

  return new Intl.NumberFormat(numberLocale, {
    maximumSignificantDigits: 12,
  }).format(Number(value.toPrecision(12)));
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
      ),
      locale
    );
  }, [
    inputValue,
    category,
    activeFromUnit,
    activeToUnit,
    locale,
  ]);

  const valueLabel =
    locale === "en"
      ? `${activeFromName} value`
      : locale === "de"
        ? `${activeFromName}-Wert`
        : locale === "ar"
          ? `قيمة ${activeFromName}`
          : locale === "uz"
            ? `${activeFromName} qiymati`
            : locale === "bn"
              ? `${activeFromName} \u09AE\u09BE\u09A8`
              : `${activeFromName} de\u011Feri`;

  const placeholder =
    locale === "en"
      ? "Enter a value"
      : locale === "de"
        ? "Wert eingeben"
        : locale === "ar"
          ? "أدخل قيمة"
          : locale === "uz"
            ? "Qiymat kiriting"
            : locale === "bn"
              ? "\u098F\u0995\u099F\u09BF \u09AE\u09BE\u09A8 \u09B2\u09BF\u0996\u09C1\u09A8"
              : "De\u011Fer girin";

  const swapLabel =
    locale === "en"
      ? "Reverse the conversion direction"
      : locale === "de"
        ? "Umrechnungsrichtung umkehren"
        : locale === "ar"
          ? "اعكس اتجاه التحويل"
          : locale === "uz"
            ? "O'zgartirish yo'nalishini teskari qiling"
            : locale === "bn"
              ? "\u09B0\u09C2\u09AA\u09BE\u09A8\u09CD\u09A4\u09B0\u09C7\u09B0 \u09A6\u09BF\u0995 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0\u09C1\u09A8"
              : "D\u00F6n\u00FC\u015F\u00FCm y\u00F6n\u00FCn\u00FC de\u011Fi\u015Ftir";

  const resultText =
    locale === "en"
      ? `${inputValue} ${activeFromUnit} = ${result} ${activeToUnit}`
      : locale === "de"
        ? `${inputValue} ${activeFromUnit} = ${result} ${activeToUnit}`
        : locale === "ar"
          ? `${inputValue} ${activeFromUnit} = ${result} ${activeToUnit}`
          : `${inputValue} ${activeFromUnit} = ${result} ${activeToUnit}`;

  return (
    <section
      className="pair-converter"
      dir={locale === "ar" ? "rtl" : undefined}
    >
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
          {resultText}
        </p>
      )}
    </section>
  );
}
