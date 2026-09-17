"use client";

import { useMemo, useState } from "react";
import { convertIntegerToUzbekWords } from "../../converter/numberToWordsUz";

function parseIntegerValue(rawValue: string): number | null {
  const normalized = rawValue.trim().replace(/\s|,/g, "");

  if (!normalized) {
    return null;
  }

  if (!/^-?\d+$/.test(normalized)) {
    return null;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value: number) {
  return value.toLocaleString("uz-UZ");
}

function capitalizeFirst(text: string) {
  if (!text) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function NumberToWordsCalculatorUz() {
  const [rawInput, setRawInput] = useState("125430");
  const [appendSom, setAppendSom] = useState(true);

  const parsedValue = useMemo(() => parseIntegerValue(rawInput), [rawInput]);

  const invalid = rawInput.trim().length > 0 && parsedValue === null;

  const words = useMemo(() => {
    if (parsedValue === null) {
      return null;
    }

    return convertIntegerToUzbekWords(parsedValue);
  }, [parsedValue]);

  const displayWords = words
    ? appendSom
      ? `${capitalizeFirst(words)} so'm`
      : capitalizeFirst(words)
    : null;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Butun Son</span>
          <input
            inputMode="numeric"
            type="text"
            value={rawInput}
            onChange={(event) => setRawInput(event.target.value)}
            placeholder="Masalan, 125430"
          />
        </label>

        <label className="category-general-converter-field">
          <span>
            <input
              type="checkbox"
              checked={appendSom}
              onChange={(event) => setAppendSom(event.target.checked)}
            />{" "}
            &quot;so&apos;m&quot; qo&apos;shish (summa yozuvi uchun)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>
            To&apos;g&apos;ri butun son kiriting (faqat raqamlar, o&apos;nlik
            kasr qo&apos;llab-quvvatlanmaydi).
          </strong>
        ) : words === null ? (
          <strong>
            Son kiritib uning so&apos;z bilan yozilishini ko&apos;rishingiz
            mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Raqamda</span>
              <strong>{formatNumber(parsedValue as number)}</strong>
            </div>
            <div>
              <span>So&apos;z Bilan</span>
              <strong>{displayWords}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Eslatma: bu vosita faqat butun sonlarni (-999 999 999 999 999 dan
        +999 999 999 999 999 gacha) so&apos;zga aylantiradi; o&apos;nlik
        kasrlar (tiyin qismi) qo&apos;llab-quvvatlanmaydi. Shartnoma, chek
        yoki faktura uchun summani yozuv bilan ifodalashda foydalanishingiz
        mumkin.
      </p>
    </div>
  );
}
