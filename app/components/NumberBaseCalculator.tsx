"use client";

import { useMemo, useState } from "react";
import {
  calculateBinaryArithmetic,
  convertFromBase,
  isValidForBase,
  type BinaryArithmeticOperation,
  type NumberBase,
} from "../converter/numberBaseCalculator";

type SupportedLocale = "tr" | "bn";

type NumberBaseCopy = {
  labels: {
    inputValue: string;
    inputBase: string;
  };
  bases: Record<NumberBase, string>;
  resultLabels: {
    binary: string;
    octal: string;
    decimal: string;
    hexadecimal: string;
  };
  emptyState: string;
  invalidState: (base: string) => string;
  arithmeticTitle: string;
  arithmeticLabels: {
    first: string;
    second: string;
  };
  operations: Record<BinaryArithmeticOperation, string>;
  arithmeticResult: (
    first: string,
    second: string,
    resultBinary: string,
    resultDecimal: string
  ) => string;
  arithmeticEmptyState: string;
  arithmeticInvalidState: string;
};

const copyByLocale: Record<SupportedLocale, NumberBaseCopy> = {
  tr: {
    labels: {
      inputValue: "Değer",
      inputBase: "Giriş Tabanı",
    },
    bases: {
      2: "İkili (Binary)",
      8: "Sekizli (Octal)",
      10: "Onlu (Decimal)",
      16: "Onaltılık (Hexadecimal)",
    },
    resultLabels: {
      binary: "İkili",
      octal: "Sekizli",
      decimal: "Onlu",
      hexadecimal: "Onaltılık",
    },
    emptyState: "Geçerli bir sayı girerek sonucu görebilirsin.",
    invalidState: (base) => `Bu değer ${base} tabanında geçerli değil.`,
    arithmeticTitle: "İkili Sayılarla Toplama / Çıkarma / Çarpma",
    arithmeticLabels: {
      first: "1. İkili Sayı",
      second: "2. İkili Sayı",
    },
    operations: {
      add: "Topla",
      subtract: "Çıkar",
      multiply: "Çarp",
    },
    arithmeticResult: (first, second, resultBinary, resultDecimal) =>
      `${first} ve ${second} işleminin sonucu: ${resultBinary} (onlu: ${resultDecimal})`,
    arithmeticEmptyState: "İki geçerli ikili sayı girerek işlemi görebilirsin.",
    arithmeticInvalidState:
      "Çıkarma işleminde sonuç negatif olamaz; büyük sayıyı önce girin.",
  },
  bn: {
    labels: {
      inputValue: "মান",
      inputBase: "ইনপুট বেস",
    },
    bases: {
      2: "বাইনারি (দ্বিমিক)",
      8: "অক্টাল (অষ্টমিক)",
      10: "ডেসিমেল (দশমিক)",
      16: "হেক্সাডেসিমেল (ষোড়শমিক)",
    },
    resultLabels: {
      binary: "বাইনারি",
      octal: "অক্টাল",
      decimal: "ডেসিমেল",
      hexadecimal: "হেক্সাডেসিমেল",
    },
    emptyState: "একটি বৈধ সংখ্যা লিখে ফলাফল দেখুন।",
    invalidState: (base) => `এই মান ${base} বেসের জন্য বৈধ নয়।`,
    arithmeticTitle: "বাইনারি সংখ্যা যোগ / বিয়োগ / গুণ",
    arithmeticLabels: {
      first: "প্রথম বাইনারি সংখ্যা",
      second: "দ্বিতীয় বাইনারি সংখ্যা",
    },
    operations: {
      add: "যোগ করুন",
      subtract: "বিয়োগ করুন",
      multiply: "গুণ করুন",
    },
    arithmeticResult: (first, second, resultBinary, resultDecimal) =>
      `${first} এবং ${second} এর ফলাফল: ${resultBinary} (ডেসিমেলে: ${resultDecimal})`,
    arithmeticEmptyState: "দুটি বৈধ বাইনারি সংখ্যা লিখে ফলাফল দেখুন।",
    arithmeticInvalidState:
      "বিয়োগের ফলাফল ঋণাত্মক হতে পারে না; বড় সংখ্যাটি আগে লিখুন।",
  },
};

const BASE_OPTIONS: NumberBase[] = [2, 8, 10, 16];

export default function NumberBaseCalculator({
  locale = "tr",
}: {
  locale?: SupportedLocale;
}) {
  const copy = copyByLocale[locale];

  const [inputValue, setInputValue] = useState("1010");
  const [inputBase, setInputBase] = useState<NumberBase>(2);

  const [firstBinary, setFirstBinary] = useState("1010");
  const [secondBinary, setSecondBinary] = useState("110");
  const [operation, setOperation] = useState<BinaryArithmeticOperation>("add");

  const result = useMemo(
    () => convertFromBase(inputValue, inputBase),
    [inputValue, inputBase]
  );

  const isInvalid =
    inputValue.trim().length > 0 && !isValidForBase(inputValue.trim(), inputBase);

  const arithmeticResult = useMemo(() => {
    if (!firstBinary.trim() || !secondBinary.trim()) {
      return null;
    }

    return calculateBinaryArithmetic(firstBinary, secondBinary, operation);
  }, [firstBinary, secondBinary, operation]);

  const arithmeticInvalid =
    firstBinary.trim().length > 0 &&
    secondBinary.trim().length > 0 &&
    !arithmeticResult;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.labels.inputBase}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {BASE_OPTIONS.map((base) => (
              <button
                key={base}
                type="button"
                className={`engineering-target-button${
                  inputBase === base ? " is-active" : ""
                }`}
                onClick={() => setInputBase(base)}
              >
                {copy.bases[base]}
              </button>
            ))}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{copy.labels.inputValue}</span>
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </label>
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {isInvalid ? (
          <strong>{copy.invalidState(copy.bases[inputBase])}</strong>
        ) : !result ? (
          <strong>{copy.emptyState}</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>{copy.resultLabels.binary}</span>
              <strong>{result.binary}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.octal}</span>
              <strong>{result.octal}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.decimal}</span>
              <strong>{result.decimal}</strong>
            </div>
            <div>
              <span>{copy.resultLabels.hexadecimal}</span>
              <strong>{result.hexadecimal}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>{copy.arithmeticTitle}</span>

          <div className="engineering-target-grid hydrostatic-target-grid">
            {(Object.keys(copy.operations) as BinaryArithmeticOperation[]).map(
              (op) => (
                <button
                  key={op}
                  type="button"
                  className={`engineering-target-button${
                    operation === op ? " is-active" : ""
                  }`}
                  onClick={() => setOperation(op)}
                >
                  {copy.operations[op]}
                </button>
              )
            )}
          </div>
        </div>

        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>{copy.arithmeticLabels.first}</span>
            <input
              type="text"
              value={firstBinary}
              onChange={(event) => setFirstBinary(event.target.value)}
            />
          </label>
          <label className="category-general-converter-field">
            <span>{copy.arithmeticLabels.second}</span>
            <input
              type="text"
              value={secondBinary}
              onChange={(event) => setSecondBinary(event.target.value)}
            />
          </label>
        </div>

        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          {arithmeticInvalid ? (
            <strong>{copy.arithmeticInvalidState}</strong>
          ) : !arithmeticResult ? (
            <strong>{copy.arithmeticEmptyState}</strong>
          ) : (
            <strong>
              {copy.arithmeticResult(
                firstBinary,
                secondBinary,
                arithmeticResult.resultBinary,
                arithmeticResult.resultDecimal.toString()
              )}
            </strong>
          )}
        </div>
      </div>
    </div>
  );
}
