"use client";

import { useMemo, useState } from "react";
import { convert } from "./convert";

type PairConverterProps = {
  category: string;
  fromUnit: string;
  toUnit: string;
  fromName: string;
  toName: string;
  locale?: "tr" | "en" | "de" | "ar" | "uz" | "bn" | "fr" | "es" | "es-419" | "pt" | "it" | "nl" | "ru" | "sv" | "no" | "da";
};

function getNumberLocale(
  locale: "tr" | "en" | "de" | "ar" | "uz" | "bn" | "fr" | "es" | "es-419" | "pt" | "it" | "nl" | "ru" | "sv" | "no" | "da"
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

  if (locale === "fr") {
    return "fr-FR";
  }

  if (locale === "es") {
    return "es-ES";
  }

  if (locale === "es-419") {
    return "es-419";
  }

  if (locale === "pt") {
    return "pt-BR";
  }

  if (locale === "it") {
    return "it-IT";
  }

  if (locale === "nl") {
    return "nl-NL";
  }

  if (locale === "ru") {
    return "ru-RU";
  }

  if (locale === "sv") {
    return "sv-SE";
  }

  if (locale === "no") {
    return "nb-NO";
  }

  if (locale === "da") {
    return "da-DK";
  }

  return "en-US";
}

function formatResult(
  value: number,
  locale: "tr" | "en" | "de" | "ar" | "uz" | "bn" | "fr" | "es" | "es-419" | "pt" | "it" | "nl" | "ru" | "sv" | "no" | "da"
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
}: PairConverterProps) {
  const [inputValue, setInputValue] = useState("1");
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
        : locale === "ar"
          ? `قيمة ${activeFromName}`
          : locale === "uz"
            ? `${activeFromName} qiymati`
            : locale === "bn"
              ? `${activeFromName} \u09AE\u09BE\u09A8`
              : locale === "fr"
                ? `Valeur de ${activeFromName}`
                : locale === "es" || locale === "es-419"
                  ? `Valör de ${activeFromName}`
                  : locale === "pt"
                    ? `Valör de ${activeFromName}`
                    : locale === "it"
                      ? `Valöre di ${activeFromName}`
                      : locale === "nl"
                        ? `Waarde in ${activeFromName}`
                        : locale === "ru"
                          ? `Значение: ${activeFromName}`
                        : locale === "sv"
                          ? `${activeFromName}-värde`
                        : locale === "no"
                          ? `${activeFromName}-verdi`
                        : locale === "da"
                          ? `${activeFromName}-værdi`
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
              : locale === "fr"
                ? "Saisissez une valeur"
                : locale === "es" || locale === "es-419"
                  ? "Introduce un valor"
                  : locale === "pt"
                    ? "Digite um valor"
                    : locale === "it"
                      ? "Inserisci un valore"
                      : locale === "nl"
                        ? "Voer een waarde in"
                        : locale === "ru"
                          ? "Введите значение"
                        : locale === "sv"
                          ? "Ange ett värde"
                        : locale === "no"
                          ? "Skriv inn en verdi"
                        : locale === "da"
                          ? "Indtast en værdi"
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
              : locale === "fr"
                ? "Inverser le sens de la conversion"
                : locale === "es" || locale === "es-419"
                  ? "Invertir el sentido de la conversion"
                  : locale === "pt"
                    ? "Inverter o sentido da conversão"
                    : locale === "it"
                      ? "Inverti il senso della conversione"
                      : locale === "nl"
                        ? "Draai de omrekenrichting om"
                        : locale === "ru"
                          ? "Изменить направление перевода"
                        : locale === "sv"
                          ? "Vänd på omvandlingsriktningen"
                        : locale === "no"
                          ? "Snu omregningsretningen"
                        : locale === "da"
                          ? "Vend omregningsretningen"
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
        <>
          <p className="pair-result-text">
            {resultText}
          </p>
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
