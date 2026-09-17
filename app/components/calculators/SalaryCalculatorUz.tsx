"use client";

import { useMemo, useState } from "react";
import {
  calculateFromGross,
  calculateFromNet,
  type SalaryRegime,
} from "../../converter/salaryCalculatorUz";

type Direction = "gross-to-net" | "net-to-gross";

function parseNumericValue(rawValue: string) {
  const normalized = rawValue.trim().replace(/\s|,/g, "");

  if (!normalized) {
    return Number.NaN;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatSom(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 })} so'm`;
}

export default function SalaryCalculatorUz() {
  const [direction, setDirection] = useState<Direction>("gross-to-net");
  const [regime, setRegime] = useState<SalaryRegime>("standard");
  const [amountInput, setAmountInput] = useState("");

  const amount = useMemo(() => parseNumericValue(amountInput), [amountInput]);

  const result = useMemo(() => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return null;
    }

    return direction === "gross-to-net"
      ? calculateFromGross(amount, regime)
      : calculateFromNet(amount, regime);
  }, [amount, direction, regime]);

  const invalid = amountInput.trim().length > 0 && !result;

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>Hisoblash Yo&apos;nalishi</span>
        <div className="engineering-target-grid">
          <button
            type="button"
            className={`engineering-target-button${direction === "gross-to-net" ? " is-active" : ""}`}
            onClick={() => setDirection("gross-to-net")}
          >
            Yalpidan Sofga
          </button>
          <button
            type="button"
            className={`engineering-target-button${direction === "net-to-gross" ? " is-active" : ""}`}
            onClick={() => setDirection("net-to-gross")}
          >
            Sofdan Yalpiga
          </button>
        </div>
      </div>

      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>
            {direction === "gross-to-net"
              ? "Yalpi (hisoblangan) Ish Haqi (so'm)"
              : "Xohlagan Sof (qo'lga tegadigan) Ish Haqi (so'm)"}
          </span>
          <input
            inputMode="decimal"
            type="text"
            value={amountInput}
            onChange={(event) => setAmountInput(event.target.value)}
            placeholder="Summani kiriting"
          />
        </label>

        <label className="category-general-converter-field">
          <span>Soliq Rejimi</span>
          <select
            value={regime}
            onChange={(event) => setRegime(event.target.value as SalaryRegime)}
          >
            <option value="standard">Standart (JShShS 12%)</option>
            <option value="it-park">IT Park rezidenti (JShShS 7,5%)</option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {invalid ? (
          <strong>To&apos;g&apos;ri summa kiriting.</strong>
        ) : !result ? (
          <strong>Summani kiritib hisob-kitobni ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yalpi (hisoblangan) Ish Haqi</span>
              <strong>{formatSom(result.grossSalary)}</strong>
            </div>
            <div>
              <span>JShShS (Daromad Solig&apos;i)</span>
              <strong>{formatSom(result.incomeTax)}</strong>
            </div>
            <div>
              <span>IJPH (Pensiya Badali)</span>
              <strong>{formatSom(result.pensionContribution)}</strong>
            </div>
            <div>
              <span>Sof (Qo&apos;lga Tegadigan) Ish Haqi</span>
              <strong>{formatSom(result.netSalary)}</strong>
            </div>
            <div>
              <span>Ish Beruvchining Ijtimoiy Solig&apos;i (12%)</span>
              <strong>{formatSom(result.employerSocialTax)}</strong>
            </div>
            <div>
              <span>Ish Beruvchi Uchun Jami Xarajat</span>
              <strong>{formatSom(result.employerTotalCost)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Eslatma: JShShS (12%, IT Park rezidentlari uchun 7,5%) va IJPH
        (0,1%) ikkalasi ham yalpi ish haqining o&apos;zidan alohida-alohida
        hisoblanadi. Ish beruvchining ijtimoiy solig&apos;i (12%) xodimning
        qo&apos;lga tegadigan summasiga ta&apos;sir qilmaydi, faqat ish
        beruvchi uchun qo&apos;shimcha xarajatni bildiradi. Bu hisoblash
        umumiy yo&apos;naltiruvchi ma&apos;lumot; aniq va dolzarb stavkalar
        uchun buxgalteringiz yoki rasmiy soliq organi bilan
        maslahatlashing.
      </p>
    </div>
  );
}
