"use client";

import { useMemo, useState } from "react";
import {
  calculateUzRealEstateCommission,
  type RealEstateCommissionInput,
  type TransactionType,
} from "../../converter/realEstateCommissionCalculatorUz";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 })} so'm`;
}

export default function RealEstateCommissionCalculatorUz() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("sotish");
  const [amount, setAmount] = useState("");
  const [commissionPercent, setCommissionPercent] = useState("3");
  const [vatPercent, setVatPercent] = useState("12");

  const input: RealEstateCommissionInput = useMemo(
    () => ({
      transactionType,
      amount: parseNumericValue(amount),
      commissionPercent: parseNumericValue(commissionPercent),
      vatPercent: parseNumericValue(vatPercent),
    }),
    [transactionType, amount, commissionPercent, vatPercent]
  );

  const result = useMemo(
    () => calculateUzRealEstateCommission(input),
    [input]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Bitim Turi</span>
          <select
            value={transactionType}
            onChange={(event) =>
              setTransactionType(event.target.value as TransactionType)
            }
          >
            <option value="sotish">Sotish</option>
            <option value="ijaraga-berish">Ijaraga berish</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>
            {transactionType === "sotish"
              ? "Sotish Narxi (so'm)"
              : "Oylik Ijara Narxi (so'm)"}
          </span>
          <input
            inputMode="decimal"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Narxni kiriting"
          />
        </label>

        <label className="category-general-converter-field">
          <span>Komissiya Foizi (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={commissionPercent}
            onChange={(event) => setCommissionPercent(event.target.value)}
          />
        </label>

        <label className="category-general-converter-field">
          <span>QQS Stavkasi (%)</span>
          <input
            inputMode="decimal"
            type="text"
            value={vatPercent}
            onChange={(event) => setVatPercent(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Komissiya (QQS Siz)</span>
              <strong>{formatCurrency(result.commissionExcludingVat)}</strong>
            </div>
            <div>
              <span>QQS Miqdori</span>
              <strong>{formatCurrency(result.vatAmount)}</strong>
            </div>
            <div>
              <span>Jami Komissiya (QQS Dahil)</span>
              <strong>{formatCurrency(result.commissionIncludingVat)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        Komissiya foizi taraflar (mulk egasi va rieltor/agentlik)
        o&apos;rtasida kelishilgan holda belgilanadi; qonun bilan
        qat&apos;iy belgilangan yagona bir stavka yo&apos;q. Standart
        QQS stavkasi 12%, lekin bitim shartlariga qarab o&apos;zgarishi
        mumkin — o&apos;z shartnomangizdagi aniq qiymatlarni
        kiritishingiz tavsiya etiladi.
      </p>
    </div>
  );
}
