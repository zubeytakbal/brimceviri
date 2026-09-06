"use client";

import { useMemo, useState } from "react";
import {
  calculateRealEstateCommission,
  type RealEstateCommissionInput,
  type TransactionType,
} from "../converter/realEstateCommissionCalculator";

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

  return `${value.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} TL`;
}

export default function RealEstateCommissionCalculator() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("satis");
  const [amount, setAmount] = useState("2000000");
  const [commissionPercent, setCommissionPercent] = useState("2");
  const [vatPercent, setVatPercent] = useState("20");

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
    () => calculateRealEstateCommission(input),
    [input]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>İşlem Türü</span>
          <select
            value={transactionType}
            onChange={(event) =>
              setTransactionType(event.target.value as TransactionType)
            }
          >
            <option value="satis">Satış</option>
            <option value="kiralama">Kiralama</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>
            {transactionType === "satis"
              ? "Satış Bedeli (TL)"
              : "Aylık Kira Bedeli (TL)"}
          </span>
          <input
            inputMode="decimal"
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>

        {transactionType === "satis" && (
          <label className="category-general-converter-field">
            <span>Komisyon Oranı (%)</span>
            <input
              inputMode="decimal"
              type="text"
              value={commissionPercent}
              onChange={(event) => setCommissionPercent(event.target.value)}
            />
          </label>
        )}

        <label className="category-general-converter-field">
          <span>KDV Oranı (%)</span>
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
          <strong>Geçerli değerler girerek sonucu görebilirsin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Komisyon (KDV Hariç)</span>
              <strong>{formatCurrency(result.commissionExcludingVat)}</strong>
            </div>
            <div>
              <span>KDV Tutarı</span>
              <strong>{formatCurrency(result.vatAmount)}</strong>
            </div>
            <div>
              <span>Toplam Komisyon (KDV Dahil)</span>
              <strong>{formatCurrency(result.commissionIncludingVat)}</strong>
            </div>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        {transactionType === "satis"
          ? "Yönetmeliğe göre satışta alıcı ve satıcıdan ayrı ayrı en fazla %2 + KDV komisyon alınabilir; bu tutar taraflar arasında bu tavanın altında serbestçe belirlenebilir."
          : "Yönetmeliğe göre kiralamada kiracı ve kiraya verenden ayrı ayrı en fazla 1 aylık kira bedeli + KDV komisyon alınabilir."}
      </p>
    </div>
  );
}
