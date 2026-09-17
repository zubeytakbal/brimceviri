"use client";

import { useState } from "react";
import {
  calculateLpgConversionPayback,
  lpgConversionDefaults,
} from "../../converter/lpgConversionPayback";

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

export default function LpgConversionPaybackCalculatorUz() {
  const [annualKm, setAnnualKm] = useState("15000");
  const [gasolineConsumption, setGasolineConsumption] = useState("7.5");
  const [consumptionIncrease, setConsumptionIncrease] = useState(
    String(lpgConversionDefaults.lpgConsumptionIncreasePercent),
  );
  const [gasolinePrice, setGasolinePrice] = useState("");
  const [lpgPrice, setLpgPrice] = useState("");
  const [conversionCost, setConversionCost] = useState("");
  const [maintenanceCost, setMaintenanceCost] = useState("");

  const result = calculateLpgConversionPayback({
    annualKm: parseNumericValue(annualKm),
    gasolineConsumptionPer100Km: parseNumericValue(gasolineConsumption),
    lpgConsumptionIncreasePercent: parseNumericValue(consumptionIncrease),
    gasolinePriceTl: parseNumericValue(gasolinePrice),
    lpgPriceTl: parseNumericValue(lpgPrice),
    conversionCostTl: parseNumericValue(conversionCost),
    annualMaintenanceCostTl: parseNumericValue(maintenanceCost) || 0,
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
          <span>Benzin Sarfi (lt/100km)</span>
          <input
            type="text"
            inputMode="decimal"
            value={gasolineConsumption}
            onChange={(event) => setGasolineConsumption(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>LPGda Sarf Oshishi (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={consumptionIncrease}
            onChange={(event) => setConsumptionIncrease(event.target.value)}
          />
          <small className="calculator-field-note">
            Bozorda odatda 20-25% oralig&apos;i kuzatiladi, standart 22% —
            o&apos;z avtomobilingizning qiymatini bilsangiz yangilang.
          </small>
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
          <span>Joriy LPG Narxi (so&apos;m/lt)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Bugungi narxni kiriting"
            value={lpgPrice}
            onChange={(event) => setLpgPrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>O&apos;rnatish Tizimi Narxi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 4000000"
            value={conversionCost}
            onChange={(event) => setConversionCost(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Yillik Qo&apos;shimcha Texnik Xizmat (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 400000"
            value={maintenanceCost}
            onChange={(event) => setMaintenanceCost(event.target.value)}
          />
        </label>
      </form>

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
                  <td>LPG Sarfi (taxminiy)</td>
                  <td>
                    {result.lpgConsumptionPer100Km.toLocaleString("uz-UZ", {
                      maximumFractionDigits: 1,
                    })}{" "}
                    lt/100km
                  </td>
                </tr>
                <tr>
                  <td>Yillik Benzin Xarajati</td>
                  <td>{formatSom(result.annualGasolineCostTl)}</td>
                </tr>
                <tr>
                  <td>Yillik LPG Xarajati (texnik xizmat bilan)</td>
                  <td>{formatSom(result.annualLpgTotalCostTl)}</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Tejamkorlik</strong>
                  </td>
                  <td>
                    <strong>{formatSom(result.annualNetSavingsTl)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>O&apos;rnatish Narxining Qoplanishi</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Bu sarf/narxlar bilan LPG qimmatroqqa tushmoqda"
                      : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil (~${formatKm(result.breakEvenKm ?? 0)} km)`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> LPG sarf oshishi, o&apos;rnatish narxi
        va yillik texnik xizmat xarajati avtomobilga va o&apos;rnatuvchi
        ustaxonaga qarab o&apos;zgaradi — o&apos;z avtomobilingiz/ustaxonangiz
        bergan raqamlarni ishlatish aniqroq natija beradi.
      </p>
    </div>
  );
}
