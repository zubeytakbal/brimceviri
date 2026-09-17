"use client";

import { useState } from "react";
import { calculateRemoteWorkVsOfficeCost } from "../../converter/remoteWorkVsOfficeCost";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatSom(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 });
}

export default function RemoteWorkVsOfficeCostCalculatorUz() {
  const [annualWorkDays, setAnnualWorkDays] = useState("235");
  const [remoteDaysPerWeek, setRemoteDaysPerWeek] = useState("2");
  const [dailyCommuteCost, setDailyCommuteCost] = useState("");
  const [dailyLunchDifference, setDailyLunchDifference] = useState("");
  const [monthlyExtraHomeCost, setMonthlyExtraHomeCost] = useState("");

  const result = calculateRemoteWorkVsOfficeCost({
    annualWorkDays: parseNumericValue(annualWorkDays),
    remoteDaysPerWeek: parseNumericValue(remoteDaysPerWeek),
    dailyCommuteCostTl: parseNumericValue(dailyCommuteCost),
    dailyLunchDifferenceTl: parseNumericValue(dailyLunchDifference),
    monthlyExtraHomeCostTl: parseNumericValue(monthlyExtraHomeCost),
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Yillik Jami Ish Kuni</span>
          <input
            type="text"
            inputMode="decimal"
            value={annualWorkDays}
            onChange={(event) => setAnnualWorkDays(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Haftada Necha Kun Uydan Ishlaysiz? (0-5)</span>
          <input
            type="text"
            inputMode="decimal"
            value={remoteDaysPerWeek}
            onChange={(event) => setRemoteDaysPerWeek(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kunlik Yo&apos;l Xarajati (so&apos;m, borish-kelish)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 20000"
            value={dailyCommuteCost}
            onChange={(event) => setDailyCommuteCost(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Kunlik Tushlik Farqi (so&apos;m, tashqarida - uyda)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 25000"
            value={dailyLunchDifference}
            onChange={(event) => setDailyLunchDifference(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Uydan Ishlashning Oylik Qo&apos;shimcha Xarajati (so&apos;m, elektr/isitish)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 80000"
            value={monthlyExtraHomeCost}
            onChange={(event) => setMonthlyExtraHomeCost(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib hisobni ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yillik Uydan Ishlangan Kun</td>
                  <td>{formatSom(result.annualRemoteDays)} kun</td>
                </tr>
                <tr>
                  <td>Yillik Yo&apos;l Tejamkorligi</td>
                  <td>{formatSom(result.annualCommuteSavingsTl)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Yillik Ovqat Tejamkorligi</td>
                  <td>{formatSom(result.annualLunchSavingsTl)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Yillik Qo&apos;shimcha Uy Xarajati</td>
                  <td>{formatSom(result.annualExtraHomeCostTl)} so&apos;m</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Sof Tejamkorlik</strong>
                  </td>
                  <td>
                    <strong>{formatSom(result.annualNetSavingsTl)} so&apos;m</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Bu hisob faqat yo&apos;l, tushlik va
        uy xarajati farqini o&apos;z ichiga oladi; ish kiyimi, ofis
        muloqoti yoki samaradorlik kabi pul bilan o&apos;lchanmaydigan
        omillarni kiritmaydi. Yillik ish kuni soni, ta&apos;til va
        bayramlarni ayirib taxmin qilingan; o&apos;z holatingizga
        qarab yangilashingiz mumkin.
      </p>
    </div>
  );
}
