"use client";

import { useState } from "react";
import { calculateEvVsIceComparison } from "../../converter/evVsIceComparison";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatSom(value: number): string {
  return `${value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 })} so'm`;
}

function formatKm(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 });
}

export default function EvVsIceComparisonCalculatorUz() {
  const [annualKm, setAnnualKm] = useState("15000");
  const [iceConsumption, setIceConsumption] = useState("7.5");
  const [gasolinePrice, setGasolinePrice] = useState("");
  const [evConsumption, setEvConsumption] = useState("18");
  const [electricityPrice, setElectricityPrice] = useState("650");
  const [priceDifference, setPriceDifference] = useState("");

  const result = calculateEvVsIceComparison({
    annualKm: parseNumericValue(annualKm),
    iceConsumptionPer100Km: parseNumericValue(iceConsumption),
    gasolinePriceTl: parseNumericValue(gasolinePrice),
    evConsumptionPer100Km: parseNumericValue(evConsumption),
    electricityPriceTl: parseNumericValue(electricityPrice),
    priceDifferenceTl: priceDifference.trim() ? parseNumericValue(priceDifference) : 0,
  });

  return (
    <div className="category-general-converter">
      <form
        className="paint-calculator-grid"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="category-general-converter-field">
          <span>Yillik Yurish Masofasi (km)</span>
          <input
            type="text"
            inputMode="decimal"
            value={annualKm}
            onChange={(event) => setAnnualKm(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Benzinli Avtomobil Sarfi (lt/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            value={iceConsumption}
            onChange={(event) => setIceConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Joriy Benzin Narxi (so&apos;m/lt)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Bugungi narxni kiriting"
            value={gasolinePrice}
            onChange={(event) => setGasolinePrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Elektromobil Sarfi (kWh/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            value={evConsumption}
            onChange={(event) => setEvConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Joriy Elektr Narxi (so&apos;m/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Hisobingizdagi birlik narxni kiriting"
            title="Standart tarif (0-200 kVt/soat oralig'ida, 2026-yil iyun holatiga ko'ra); iste'molingiz yuqoriroq bo'lsa hisobingizdagi aniq narxni kiriting"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Avtomobillar Orasidagi Narx Farqi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 60000000"
            value={priceDifference}
            onChange={(event) => setPriceDifference(event.target.value)}
          />
        </label>
      </form>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib solishtirishni ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yillik Benzin Xarajati</td>
                  <td>{formatSom(result.annualGasolineCostTl)}</td>
                </tr>
                <tr>
                  <td>Yillik Elektr Xarajati</td>
                  <td>{formatSom(result.annualElectricityCostTl)}</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Tejamkorlik</strong>
                  </td>
                  <td>
                    <strong>{formatSom(result.annualSavingsTl)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Narx Farqining Qoplanish Muddati</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Narx farqi kiritilmadi"
                      : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil (~${formatKm(result.breakEvenKm ?? 0)} km)`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Sarf standartlari (7,5 lt/100km
        benzinli, 18 kWh/100km elektromobil) umumiy ma&apos;lumotnoma
        qiymatlaridir — o&apos;z avtomobilingizning sarfini bilsangiz
        o&apos;shani kiriting. Elektr narxi uchun standart tarif (650
        so&apos;m/kWh, 0-200 kVt/soat ijtimoiy norma doirasida, 2026-yil
        iyun holatiga ko&apos;ra) oldindan to&apos;ldirilgan — iste&apos;molingiz
        yuqoriroq bo&apos;lsa yoki tarif o&apos;zgargan bo&apos;lsa,
        hisobingizdagi aniq narxni kiriting. Benzin narxini o&apos;z
        hududingizdagi joriy narx bilan to&apos;ldiring. Avtomobillar
        orasidagi narx farqi butunlay shaxsiy qiymat, albatta o&apos;zingiz
        kiriting.
      </p>
    </div>
  );
}
