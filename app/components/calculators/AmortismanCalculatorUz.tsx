"use client";

import { useMemo, useState } from "react";
import {
  calculateAmortisman,
  type AmortismanMethod,
} from "../../converter/amortismanCalculator";

function parseNumericValue(rawValue: string) {
  const normalizedValue = rawValue.trim().replace(/,/g, ".");

  if (!normalizedValue) {
    return Number.NaN;
  }

  const numericValue = Number(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : Number.NaN;
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 2 });
}

const methodLabelsUz: Record<AmortismanMethod, string> = {
  normal: "Chiziqli (Teng Miqdorli)",
  "azalan-bakiyeler": "Kamayuvchi Qoldiq",
};

export default function AmortismanCalculatorUz() {
  const [costInput, setCostInput] = useState("");
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
          <span>Tannarx (QQS siz, so&apos;m)</span>
          <input
            inputMode="decimal"
            type="text"
            value={costInput}
            onChange={(event) => setCostInput(event.target.value)}
            placeholder="Tannarxni kiriting"
          />
        </label>
        <label className="category-general-converter-field">
          <span>Foydali Muddat (yil)</span>
          <input
            inputMode="decimal"
            type="text"
            value={usefulLifeInput}
            onChange={(event) => setUsefulLifeInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Qutqaruv Qiymati (so&apos;m, bo&apos;lsa)</span>
          <input
            inputMode="decimal"
            type="text"
            value={salvageValueInput}
            onChange={(event) => setSalvageValueInput(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Amortizatsiya Usuli</span>
          <select
            value={method}
            onChange={(event) =>
              setMethod(event.target.value as AmortismanMethod)
            }
          >
            <option value="normal">{methodLabelsUz.normal}</option>
            <option value="azalan-bakiyeler">
              {methodLabelsUz["azalan-bakiyeler"]}
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
            To&apos;g&apos;ri tannarx, foydali muddat va qutqaruv
            qiymatini kiritib amortizatsiya jadvalini ko&apos;rishingiz
            mumkin.
          </strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Yillik Amortizatsiya Stavkasi</span>
              <strong>%{formatNumber(result.annualRatePercent)}</strong>
            </div>
            <div>
              <span>Birinchi Yil Amortizatsiya Miqdori</span>
              <strong>{formatNumber(result.rows[0]?.depreciationAmount ?? 0)} so&apos;m</strong>
            </div>
          </div>
        )}
      </div>

      {result && (
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Yillar bo&apos;yicha amortizatsiya jadvali</caption>
            <thead>
              <tr>
                <th scope="col">Yil</th>
                <th scope="col">Yil Boshi Qiymat</th>
                <th scope="col">Amortizatsiya Miqdori</th>
                <th scope="col">To&apos;plangan Amortizatsiya</th>
                <th scope="col">Yil Oxiri Qiymat</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row) => (
                <tr key={row.year}>
                  <td>{row.year}</td>
                  <td>{formatNumber(row.beginningValue)} so&apos;m</td>
                  <td>{formatNumber(row.depreciationAmount)} so&apos;m</td>
                  <td>{formatNumber(row.accumulatedDepreciation)} so&apos;m</td>
                  <td>{formatNumber(row.endingValue)} so&apos;m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="calculator-usage-hint">
        Foydali muddat yillari va amortizatsiya stavkasi mahalliy
        soliq kodeksi va buxgalteriya standartlariga (asosiy vosita
        toifasiga qarab) bog&apos;liq bo&apos;lishi mumkin; bu vosita
        sobit bir jadval taxmin qilmaydi, o&apos;z asosiy vositangiz
        uchun tegishli foydali muddatni o&apos;zingiz kiritishingiz
        kerak. Kamayuvchi qoldiq usulida stavka odatda chiziqli
        stavkaning 2 baravariga teng deb olinadi (bu yerda %50 bilan
        cheklangan) — bu xalqaro buxgalteriya amaliyotida keng
        tarqalgan konventsiya, lekin sizning mahalliy soliq
        qoidalaringiz boshqacha multiplikator yoki chegara
        belgilashi mumkin.
      </p>
    </div>
  );
}
