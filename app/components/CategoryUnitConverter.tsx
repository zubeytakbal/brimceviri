"use client";

import { useEffect, useMemo, useState } from "react";
import { convert } from "../converter/convert";
import { formatNumber } from "../converter/fx/fxMath";
import { getCategoryUnitOptions } from "./categoryUnitOptions";
import { publishConverterState } from "./converterSync";
import CopyResultButton from "./CopyResultButton";

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
  // Verilirse deger/birim "Tum birimler" paneliyle (AllUnitsPanel) paylasilir.
  syncKey?: string;
};

type ConverterLocale = CategoryUnitConverterProps["locale"];

const NUMBER_LOCALES: Record<ConverterLocale, string> = {
  tr: "tr-TR",
  en: "en-US",
  de: "de-DE",
};

type ConverterLabels = { value: string; from: string; to: string; result: string; swap: string; invalid: string };


const CONVERTER_LABELS: Record<ConverterLocale, ConverterLabels> = {
  tr: {
    value: "Değer",
    from: "Kaynak birim",
    to: "Hedef birim",
    result: "Anlık sonuç",
    swap: "Yönü değiştir",
    invalid: "Geçerli bir sayı girerek sonucu görebilirsiniz.",
  },
  en: {
    value: "Value",
    from: "From unit",
    to: "To unit",
    result: "Live result",
    swap: "Swap direction",
    invalid: "Enter a valid number to view the result.",
  },
  de: {
    value: "Wert",
    from: "Ausgangseinheit",
    to: "Zieleinheit",
    result: "Direktes Ergebnis",
    swap: "Richtung wechseln",
    invalid: "Geben Sie eine gültige Zahl ein, um das Ergebnis zu sehen.",
  },
};

function parseNumericValue(
  rawValue: string,
  locale: CategoryUnitConverterProps["locale"]
) {
  let normalizedValue = rawValue.trim().replace(/\s+/g, "");

  // In English, a comma is normally a thousands separator. The previous
  // locale-neutral replacement turned "1,000" into "1.000", or 1, which is
  // especially harmful on a conversion page. A one- or two-digit comma
  // suffix remains accepted as a forgiving decimal input.
  if (locale === "en") {
    const hasDecimalPoint = normalizedValue.includes(".");
    const isGroupedThousands = /^[-+]?\d{1,3}(,\d{3})+(\.\d+)?$/.test(
      normalizedValue
    );

    if (isGroupedThousands || hasDecimalPoint) {
      normalizedValue = normalizedValue.replace(/,/g, "");
    } else if (normalizedValue.includes(",")) {
      normalizedValue = normalizedValue.replace(",", ".");
    }
  } else {
    normalizedValue = normalizedValue.replace(/,/g, ".");
  }

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

  const localeName = NUMBER_LOCALES[locale];
  const absoluteValue = Math.abs(value);

  if (absoluteValue === 0) {
    return formatNumber(0, localeName);
  }

  if (absoluteValue >= 1_000_000_000 || absoluteValue < 0.0001) {
    return formatNumber(value, localeName, {
      maximumSignificantDigits: 8,
      notation: "scientific",
    });
  }

  return formatNumber(value, localeName, {
    maximumSignificantDigits: absoluteValue >= 1 ? 12 : 10,
  });
}

function getEnglishVolumeSystemNotice(
  category: string,
  unitLabels: Array<string | undefined>
) {
  if (category !== "hacim") {
    return null;
  }

  if (unitLabels.some((label) => label?.startsWith("US "))) {
    return "This conversion uses the US customary measure, not the Imperial/UK measure.";
  }

  if (unitLabels.some((label) => label?.startsWith("Imperial "))) {
    return "This conversion uses the Imperial/UK measure, not the US customary measure.";
  }

  return null;
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

  return `${sign}${feet} ft ${formatDisplayNumber("en", inches)} in`;
}

export default function CategoryUnitConverter({
  category,
  locale,
  unitOptions: unitOptionsOverride,
  syncKey,
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

  const parsedInputValue = parseNumericValue(inputValue, locale);
  const fromUnitOption = unitOptions.find(
    (unitOption) => unitOption.value === activeFromUnit
  );
  const toUnitOption = unitOptions.find(
    (unitOption) => unitOption.value === activeToUnit
  );
  const volumeSystemNotice =
    locale === "en"
      ? getEnglishVolumeSystemNotice(category, [
          fromUnitOption?.label,
          toUnitOption?.label,
        ])
      : null;
  const resultValue =
    parsedInputValue === null
      ? null
      : convert(
          category,
          parsedInputValue,
          activeFromUnit,
          activeToUnit
        );
  const feetAndInchesResult =
    locale === "en" &&
    category === "uzunluk" &&
    activeToUnit === "ft" &&
    Number.isFinite(resultValue ?? Number.NaN)
      ? formatFeetAndInches(resultValue ?? 0)
      : null;
  const hasResult =
    parsedInputValue !== null &&
    !Number.isNaN(parsedInputValue) &&
    Number.isFinite(resultValue ?? Number.NaN);
  const syncedValue =
    parsedInputValue === null || Number.isNaN(parsedInputValue)
      ? null
      : parsedInputValue;

  useEffect(() => {
    if (syncKey) {
      publishConverterState(syncKey, {
        value: syncedValue,
        unit: activeFromUnit,
      });
    }
  }, [syncKey, syncedValue, activeFromUnit]);

  const equalityValue =
    activeFromUnit && activeToUnit
      ? convert(category, 1, activeFromUnit, activeToUnit)
      : Number.NaN;

  const labels = CONVERTER_LABELS[locale];

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

      {volumeSystemNotice && (
        <p className="calculator-usage-hint" role="note">
          <strong>Measurement system:</strong> {volumeSystemNotice}
        </p>
      )}

      <div
        aria-live="polite"
        className="category-general-converter-result"
      >
        <p>{labels.result}</p>

        {!hasResult ? (
          <strong>{labels.invalid}</strong>
        ) : (
          <div className="category-general-converter-result-line">
            <strong>
              {formatDisplayNumber(locale, resultValue ?? 0)}{" "}
              {toUnitOption?.symbol ?? toUnit}
            </strong>
            <CopyResultButton
              locale={locale}
              text={`${inputValue.trim()} ${fromUnitOption?.symbol ?? activeFromUnit} = ${formatDisplayNumber(locale, resultValue ?? 0)} ${toUnitOption?.symbol ?? activeToUnit}`}
            />
          </div>
        )}

        <span className="category-general-converter-equality">
          {`1 ${fromUnitOption?.symbol ?? activeFromUnit} = ${formatDisplayNumber(locale, equalityValue)} ${toUnitOption?.symbol ?? activeToUnit}`}
        </span>

        {feetAndInchesResult && (
          <span className="category-general-converter-equality">
            Feet and inches: {feetAndInchesResult}
          </span>
        )}
      </div>
    </div>
  );
}
