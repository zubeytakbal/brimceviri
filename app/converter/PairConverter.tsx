"use client";

import { useEffect, useMemo, useState } from "react";
import { convert } from "./convert";
import { englishDisplaySymbol } from "./englishUnitDisplay";
import { formatNumber } from "./fx/fxMath";
import { smartDefaultInput } from "./smartDefaultInput";
import { publishConverterState } from "../components/converterSync";
import CopyResultButton from "../components/CopyResultButton";

type PairConverterProps = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  locale?: "tr" | "en" | "de";
  // Verilirse deger/birim "Tum birimler" paneliyle (AllUnitsPanel) paylasilir.
  syncKey?: string;
};

function getNumberLocale(
  locale: "tr" | "en" | "de"
) {
  if (locale === "tr") {
    return "tr-TR";
  }

  if (locale === "de") {
    return "de-DE";
  }













  return "en-US";
}

function formatResult(
  value: number,
  locale: "tr" | "en" | "de"
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
    return formatNumber(value, numberLocale, {
      maximumSignificantDigits: 8,
      notation: "scientific",
    });
  }

  return formatNumber(Number(value.toPrecision(12)), numberLocale, {
    maximumSignificantDigits: 12,
  });
}

function formatFeetAndInches(valueInFeet: number) {
  const sign = valueInFeet < 0 ? "-" : "";
  const totalInches = Math.abs(valueInFeet) * 12;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round((totalInches - feet * 12) * 100) / 100;

  if (inches >= 12) {
    feet += 1;
    inches = 0;
  }

  return `${sign}${feet} ft ${formatResult(inches, "en")} in`;
}

function formatFeetAndInchesToSixteenth(valueInFeet: number) {
  const sign = valueInFeet < 0 ? "-" : "";
  const totalSixteenths = Math.round(Math.abs(valueInFeet) * 12 * 16);
  const feet = Math.floor(totalSixteenths / (12 * 16));
  const remainingSixteenths = totalSixteenths % (12 * 16);
  const inches = Math.floor(remainingSixteenths / 16);
  const numerator = remainingSixteenths % 16;

  if (numerator === 0) {
    return `${sign}${feet} ft ${inches} in`;
  }

  const divisor =
    numerator % 8 === 0
      ? 8
      : numerator % 4 === 0
        ? 4
        : numerator % 2 === 0
          ? 2
          : 1;

  return `${sign}${feet} ft ${inches} ${numerator / divisor}/${16 / divisor} in`;
}

function getEnglishVolumeSystemNotice(
  category: string,
  unitNames: string[]
) {
  if (category !== "hacim") {
    return null;
  }

  if (unitNames.some((name) => name.startsWith("US "))) {
    return "This conversion uses the US customary measure, not the Imperial/UK measure.";
  }

  if (unitNames.some((name) => name.startsWith("Imperial "))) {
    return "This conversion uses the Imperial/UK measure, not the US customary measure.";
  }

  return null;
}

function getEnglishGallonSystemComparison(
  category: string,
  inputValue: string,
  activeFromUnit: string,
  activeToUnit: string
) {
  if (
    category !== "hacim" ||
    (activeFromUnit !== "gal" &&
      activeFromUnit !== "imp gal" &&
      activeToUnit !== "gal" &&
      activeToUnit !== "imp gal")
  ) {
    return null;
  }

  const numberValue = Number(inputValue.replace(",", "."));

  if (!Number.isFinite(numberValue)) {
    return null;
  }

  if (activeFromUnit === "gal" || activeFromUnit === "imp gal") {
    const usLitres = convert(category, numberValue, "gal", "L");
    const imperialLitres = convert(category, numberValue, "imp gal", "L");

    return `For the same numeric input: ${formatResult(numberValue, "en")} US gal = ${formatResult(usLitres, "en")} L · ${formatResult(numberValue, "en")} Imperial gal = ${formatResult(imperialLitres, "en")} L.`;
  }

  const litres = convert(category, numberValue, activeFromUnit, "L");
  const usGallons = convert(category, litres, "L", "gal");
  const imperialGallons = convert(category, litres, "L", "imp gal");

  return `Equivalent volume: ${formatResult(usGallons, "en")} US gal · ${formatResult(imperialGallons, "en")} Imperial gal.`;
}

export default function PairConverter({
  category,
  fromUnit,
  toUnit,
  fromName,
  toName,
  locale = "tr",
  syncKey,
}: PairConverterProps) {
  const [inputValue, setInputValue] = useState(() =>
    String(smartDefaultInput(category, fromUnit, toUnit))
  );
  const [isReversed, setIsReversed] = useState(false);

  const activeFromUnit = isReversed ? toUnit : fromUnit;
  const activeToUnit = isReversed ? fromUnit : toUnit;
  const activeFromName = isReversed ? toName : fromName;
  const activeToName = isReversed ? fromName : toName;

  const convertedValue = useMemo(() => {
    if (!inputValue.trim()) {
      return null;
    }

    const numberValue = Number(inputValue.replace(",", "."));

    if (!Number.isFinite(numberValue)) {
      return null;
    }

    return convert(
      category,
      numberValue,
      activeFromUnit,
      activeToUnit
    );
  }, [
    inputValue,
    category,
    activeFromUnit,
    activeToUnit,
  ]);

  const numericInput = inputValue.trim()
    ? Number(inputValue.replace(",", "."))
    : Number.NaN;
  const syncedValue = Number.isFinite(numericInput) ? numericInput : null;

  useEffect(() => {
    if (syncKey) {
      publishConverterState(syncKey, {
        value: syncedValue,
        unit: activeFromUnit,
      });
    }
  }, [syncKey, syncedValue, activeFromUnit]);

  const result =
    convertedValue === null ? "" : formatResult(convertedValue, locale);
  const feetAndInchesResult =
    locale === "en" &&
    category === "uzunluk" &&
    activeToUnit === "ft" &&
    convertedValue !== null
      ? formatFeetAndInches(convertedValue)
      : null;
  const fractionalFeetAndInchesResult =
    locale === "en" &&
    category === "uzunluk" &&
    activeToUnit === "ft" &&
    convertedValue !== null
      ? formatFeetAndInchesToSixteenth(convertedValue)
      : null;
  const volumeSystemNotice =
    locale === "en"
      ? getEnglishVolumeSystemNotice(category, [activeFromName, activeToName])
      : null;
  const gallonSystemComparison =
    locale === "en" && convertedValue !== null
      ? getEnglishGallonSystemComparison(
          category,
          inputValue,
          activeFromUnit,
          activeToUnit
        )
      : null;

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

  // Ingilizce sayfalarda Turkce kayit sembolleri (arşın, çk ...) gosterilmez.
  const fromLabel = locale === "en" ? englishDisplaySymbol(category, activeFromUnit) : activeFromUnit;
  const toLabel = locale === "en" ? englishDisplaySymbol(category, activeToUnit) : activeToUnit;

  const displayInput =
    syncedValue === null ? inputValue : formatResult(syncedValue, locale);
  const resultText =
    locale === "en"
      ? `${displayInput} ${fromLabel} = ${result} ${toLabel}`
      : `${displayInput} ${activeFromUnit} = ${result} ${activeToUnit}`;

  return (
    <section
      className="pair-converter"
      dir={undefined}
    >
      <label htmlFor="pair-converter-value">
        {valueLabel}
      </label>

      {volumeSystemNotice && (
        <p className="calculator-usage-hint" role="note">
          <strong>Measurement system:</strong> {volumeSystemNotice}
        </p>
      )}

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

          <span>{fromLabel}</span>
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

          <span>{toLabel}</span>
        </div>
      </div>

      {result && (
        <>
          <div className="pair-result-line">
            <p className="pair-result-text">
              {resultText}
            </p>
            <CopyResultButton locale={locale} text={resultText} />
          </div>
          {feetAndInchesResult && (
            <p className="pair-result-text">
              Feet and inches: {feetAndInchesResult}
            </p>
          )}
          {fractionalFeetAndInchesResult && (
            <p className="pair-result-text">
              Nearest 1/16 inch: {fractionalFeetAndInchesResult}
            </p>
          )}
          {gallonSystemComparison && (
            <p className="pair-result-text">
              {gallonSystemComparison}
            </p>
          )}
        </>
      )}
    </section>
  );
}
