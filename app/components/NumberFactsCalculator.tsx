"use client";

import { useMemo, useState } from "react";
import { getNumberFacts, type NumberFactsLocale } from "../converter/numberFacts";

type NumberFactsCalculatorProps = {
  initialNumber: number;
  locale?: NumberFactsLocale;
};

const copyByLocale: Record<
  NumberFactsLocale,
  {
    hint: string;
    numberLabel: string;
    emptyState: string;
    square: string;
    cube: string;
    squareRoot: string;
    isPrimeLabel: string;
    yes: string;
    no: string;
    divisorCount: string;
    factorial: string;
    romanNumeral: string;
    divisorsHeading: string;
  }
> = {
  tr: {
    hint: "Nasıl çalışır: aşağıya istediğin sayıyı yaz — karesi, küpü, karekökü, asal olup olmadığı, bölenleri ve daha fazlası anında hesaplanır (sayfadan ayrılman gerekmez).",
    numberLabel: "Sayı",
    emptyState: "1 ile 1.000.000 arasında bir tam sayı gir.",
    square: "Karesi",
    cube: "Küpü",
    squareRoot: "Karekökü",
    isPrimeLabel: "Asal mı?",
    yes: "Evet",
    no: "Hayır",
    divisorCount: "Bölen Sayısı",
    factorial: "Faktöriyel",
    romanNumeral: "Romen Rakamı",
    divisorsHeading: "Çarpanları (Bölenleri)",
  },
  uz: {
    hint: "Qanday ishlaydi: pastga istagan sonni yozing — kvadrati, kubi, kvadrat ildizi, tub son ekanligi, bo'luvchilari va boshqa ko'p narsa darhol hisoblanadi (sahifadan chiqish shart emas).",
    numberLabel: "Son",
    emptyState: "1 dan 1.000.000 gacha butun son kiriting.",
    square: "Kvadrati",
    cube: "Kubi",
    squareRoot: "Kvadrat Ildizi",
    isPrimeLabel: "Tub sonmi?",
    yes: "Ha",
    no: "Yo'q",
    divisorCount: "Bo'luvchilar Soni",
    factorial: "Faktorial",
    romanNumeral: "Rim Raqami",
    divisorsHeading: "Bo'luvchilari",
  },
};

function parseIntegerValue(rawValue: string) {
  const normalizedValue = rawValue.trim();

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number, locale: NumberFactsLocale, maxFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString(locale === "uz" ? "uz-UZ" : "tr-TR", {
    maximumFractionDigits: maxFractionDigits,
  });
}

export default function NumberFactsCalculator({
  initialNumber,
  locale = "tr",
}: NumberFactsCalculatorProps) {
  const [numberInput, setNumberInput] = useState(String(initialNumber));
  const copy = copyByLocale[locale];

  const n = useMemo(() => parseIntegerValue(numberInput), [numberInput]);
  const facts = useMemo(() => getNumberFacts(n, locale), [n, locale]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <p className="calculator-usage-hint">{copy.hint}</p>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{copy.numberLabel}</span>
            <input
              inputMode="numeric"
              type="text"
              value={numberInput}
              onChange={(event) => setNumberInput(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!facts ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{facts.value}² ({copy.square})</span>
              <strong>{formatNumber(facts.square, locale)}</strong>
            </div>
            <div>
              <span>{facts.value}³ ({copy.cube})</span>
              <strong>{formatNumber(facts.cube, locale)}</strong>
            </div>
            <div>
              <span>√{facts.value} ({copy.squareRoot})</span>
              <strong>{formatNumber(facts.squareRoot, locale)}</strong>
            </div>
            <div>
              <span>{copy.isPrimeLabel}</span>
              <strong>{facts.isPrime ? copy.yes : copy.no}</strong>
            </div>
            <div>
              <span>{copy.divisorCount}</span>
              <strong>{facts.divisorCount}</strong>
            </div>
            {facts.factorial && (
              <div>
                <span>{facts.value}! ({copy.factorial})</span>
                <strong>{facts.factorial}</strong>
              </div>
            )}
            {facts.romanNumeral && (
              <div>
                <span>{copy.romanNumeral}</span>
                <strong>{facts.romanNumeral}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {facts && (
        <div className="calculator-steps">
          <h3>{copy.divisorsHeading}</h3>
          <p className="calculator-step-line">{facts.divisors.join(", ")}</p>
          <p className="calculator-step-line">
            {facts.primeReason}
          </p>
        </div>
      )}
    </div>
  );
}
