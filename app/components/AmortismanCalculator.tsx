"use client";

import { useMemo, useState } from "react";
import {
  calculateAmortisman,
  type AmortismanMethod,
} from "../converter/amortismanCalculator";

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

  return value.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

const methodLabels: Record<AmortismanMethod, string> = {
  normal: "Normal (Eşit Tutarlı)",
  "azalan-bakiyeler": "Azalan Bakiyeler",
};

export default function AmortismanCalculator() {
  const [costInput, setCostInput] = useState("100000");
  const [usefulLifeInput, setUsefulLifeInput] = useState("5");
  const [salvageValueInput, setSalvageValueInput] = useState("0");
  const [method, setMethod] = useState<AmortismanMethod>("normal");

  const result = useMemo(
    () =>
      calculateAmortisman({
        cost: parseNumericValue(costInput),
        usefulLifeYears: Math.round(parseNumericValue(usefulLifeInput)),
        salvageValue: parseNumericValue(salvageValueInput),
        method,
      }),
    [costInput, usefulLifeInput, salvageValueInput, method]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Maliyet (KDV hariç, ₺)</span>
          <input
            inputMode="decimal"
            type="text"
            value={costInput}
            onChange={(event) => setCostInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Faydalı Ömür (yıl)</span>
          <input
            inputMode="decimal"
            type="text"
            value={usefulLifeInput}
            onChange={(event) => setUsefulLifeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Hurda Değeri (₺, varsa)</span>
          <input
            inputMode="decimal"
            type="text"
            value={salvageValueInput}
            onChange={(event) => setSalvageValueInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Amortisman Yöntemi</span>
          <select
            value={method}
            onChange={(event) =>
              setMethod(event.target.value as AmortismanMethod)
            }
          >
            <option value="normal">{methodLabels.normal}</option>
            <option value="azalan-bakiyeler">
              {methodLabels["azalan-bakiyeler"]}
            </option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>
            Geçerli maliyet, faydalı ömür ve hurda değeri girerek
            amortisman tablosunu görebilirsin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yıllık Amortisman Oranı</span>
              <strong>%{formatCurrency(result.annualRatePercent)}</strong>
            </div>
            <div>
              <span>İlk Yıl Amortisman Tutarı</span>
              <strong>{formatCurrency(result.rows[0]?.depreciationAmount ?? 0)} ₺</strong>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Yıllara göre amortisman tablosu</caption>
            <thead>
              <tr>
                <th scope="col">Yıl</th>
                <th scope="col">Yıl Başı Değer</th>
                <th scope="col">Amortisman Tutarı</th>
                <th scope="col">Birikmiş Amortisman</th>
                <th scope="col">Yıl Sonu Değer</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{formatCurrency(row.beginningValue)} ₺</td>
                  <td>{formatCurrency(row.depreciationAmount)} ₺</td>
                  <td>{formatCurrency(row.accumulatedDepreciation)} ₺</td>
                  <td>{formatCurrency(row.endingValue)} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        Faydalı ömür yılları, Vergi Usul Kanunu&apos;nun (VUK) ilgili
        sabit kıymet sınıfına göre belirlediği amortisman oranları
        listesine göre değişir; bu araç sabit bir liste varsaymaz,
        kendi sabit kıymetin için Maliye Bakanlığı&apos;nın güncel
        faydalı ömür tablosundan bulduğun yılı buraya girmelisin.
        Azalan bakiyeler usulünde oran, VUK mükerrer 315&apos;e göre
        normal oranın 2 katıdır (üst sınır %50).
      </p>
    </div>
  );
}
