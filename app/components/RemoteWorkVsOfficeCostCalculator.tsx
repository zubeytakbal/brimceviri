"use client";

import { useState } from "react";
import { calculateRemoteWorkVsOfficeCost } from "../converter/remoteWorkVsOfficeCost";
import { buildSiteUrl } from "../siteConfig";
import ShareResultButton from "./ShareResultButton";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatTl(value: number): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits: 0 });
}

export default function RemoteWorkVsOfficeCostCalculator() {
  const [annualWorkDays, setAnnualWorkDays] = useState("235");
  const [remoteDaysPerWeek, setRemoteDaysPerWeek] = useState("2");
  const [dailyCommuteCost, setDailyCommuteCost] = useState("100");
  const [dailyLunchDifference, setDailyLunchDifference] = useState("150");
  const [monthlyExtraHomeCost, setMonthlyExtraHomeCost] = useState("400");

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
          <span>Yıllık Toplam İş Günü</span>
          <input
            type="text"
            inputMode="decimal"
            value={annualWorkDays}
            onChange={(event) => setAnnualWorkDays(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Haftada Kaç Gün Evden Çalışıyorsun? (0-5)</span>
          <input
            type="text"
            inputMode="decimal"
            value={remoteDaysPerWeek}
            onChange={(event) => setRemoteDaysPerWeek(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Günlük Yol Masrafı (₺, gidiş-dönüş)</span>
          <input
            type="text"
            inputMode="decimal"
            value={dailyCommuteCost}
            onChange={(event) => setDailyCommuteCost(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Günlük Öğle Yemeği Farkı (₺, dışarıda - evde)</span>
          <input
            type="text"
            inputMode="decimal"
            value={dailyLunchDifference}
            onChange={(event) => setDailyLunchDifference(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Evden Çalışmanın Aylık Ek Maliyeti (₺, elektrik/ısınma)</span>
          <input
            type="text"
            inputMode="decimal"
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
          <strong>Geçerli değerler girerek hesaplamayı gör.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yıllık Evden Çalışılan Gün</td>
                  <td>{formatTl(result.annualRemoteDays)} gün</td>
                </tr>
                <tr>
                  <td>Yıllık Yol Tasarrufu</td>
                  <td>{formatTl(result.annualCommuteSavingsTl)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık Yemek Tasarrufu</td>
                  <td>{formatTl(result.annualLunchSavingsTl)} ₺</td>
                </tr>
                <tr>
                  <td>Yıllık Ek Ev Gideri</td>
                  <td>{formatTl(result.annualExtraHomeCostTl)} ₺</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yıllık Net Tasarruf</strong>
                  </td>
                  <td>
                    <strong>{formatTl(result.annualNetSavingsTl)} ₺</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <ShareResultButton
              shareText={`Uzaktan çalışmayla yılda ${formatTl(result.annualNetSavingsTl)} ₺ tasarruf ediyormuşum! Sen de kendi rakamlarınla hesapla:`}
              shareUrl={buildSiteUrl("/uzaktan-calisma-ofis-maliyeti-karsilastirma")}
            />
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu hesaplama yalnızca yol, öğle yemeği ve
        ev gideri farkını kapsar; iş kıyafeti, ofis sosyalleşmesi veya
        verimlilik gibi parasal olmayan faktörleri dahil etmez. Yıllık
        iş günü sayısı, izin ve tatilleri düşerek Türkiye ortalaması
        (~235 gün) üzerinden varsayılmıştır, kendi durumuna göre
        güncelleyebilirsin.
      </p>
    </div>
  );
}
