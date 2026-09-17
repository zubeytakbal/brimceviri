"use client";

import { useState } from "react";
import {
  boilerEfficiencyOptions,
  calculateHeatingCostComparison,
} from "../../converter/heatingCostComparison";

const boilerLabelsUz: Record<string, string> = {
  condensing: "Kondensatsion Qozon (~92%)",
  conventional: "Kondensatsiyasiz (An'anaviy) Qozon (~80%)",
};

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function HeatingCostComparisonCalculatorUz() {
  const [gasPrice, setGasPrice] = useState("1100");
  const [boilerId, setBoilerId] = useState(boilerEfficiencyOptions[0].id);
  const [electricityPrice, setElectricityPrice] = useState("650");
  const [acScop, setAcScop] = useState("3.5");
  const [annualHeatNeed, setAnnualHeatNeed] = useState("");

  const boiler =
    boilerEfficiencyOptions.find((option) => option.id === boilerId) ??
    boilerEfficiencyOptions[0];

  const result = calculateHeatingCostComparison({
    gasPriceTlPerM3: parseNumericValue(gasPrice),
    boilerEfficiencyPercent: boiler.efficiencyPercent,
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    acScop: parseNumericValue(acScop),
    annualHeatNeedKwh: annualHeatNeed.trim() ? parseNumericValue(annualHeatNeed) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Joriy Tabiiy Gaz Narxi (so&apos;m/m³)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Hisobingizdan qarang"
            title="Hisoblagichli, ijtimoiy norma doirasidagi tarif (2026-yil iyun holatiga ko'ra); hisoblagichsiz uy uchun isitish tarifi 1550 so'm/m³"
            value={gasPrice}
            onChange={(event) => setGasPrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Qozon Turi</span>
          <select value={boilerId} onChange={(event) => setBoilerId(event.target.value)}>
            {boilerEfficiencyOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {boilerLabelsUz[option.id] ?? option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Elektr Narxi (so&apos;m/kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Joriy narxni kiriting"
            value={electricityPrice}
            onChange={(event) => setElectricityPrice(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Konditsionerning Isitish SCOP Qiymati</span>
          <input
            type="text"
            inputMode="decimal"
            value={acScop}
            onChange={(event) => setAcScop(event.target.value)}
          />
          <small className="calculator-field-note">
            Qurilmaning energiya yorlig&apos;ida ko&apos;rsatiladi; A
            sinfli invertor konditsionerlarda odatda 3,5-4 orasida,
            mahsulotga qarab o&apos;zgaradi.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yillik Issiqlik Ehtiyoji (kWh, ixtiyoriy)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Bilsangiz kiriting, jami narx farqini ko'rsatadi"
            value={annualHeatNeed}
            onChange={(event) => setAnnualHeatNeed(event.target.value)}
          />
        </label>
      </div>

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
                  <td>Qozon bilan 1 kWh Issiqlik Narxi</td>
                  <td>{formatNumber(result.gasCostPerKwhHeat)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Konditsioner bilan 1 kWh Issiqlik Narxi</td>
                  <td>{formatNumber(result.acCostPerKwhHeat)} so&apos;m</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Natija</strong>
                  </td>
                  <td>
                    <strong>
                      {result.cheaperOption === "gas" ? "Qozon" : "Konditsioner"} taxminan %
                      {formatNumber(result.percentCheaper, 0)} arzonroq
                    </strong>
                  </td>
                </tr>
                {result.annualGasCostTl !== null && result.annualAcCostTl !== null && (
                  <>
                    <tr>
                      <td>Yillik Qozon Xarajati</td>
                      <td>{formatNumber(result.annualGasCostTl, 0)} so&apos;m</td>
                    </tr>
                    <tr>
                      <td>Yillik Konditsioner Xarajati</td>
                      <td>{formatNumber(result.annualAcCostTl, 0)} so&apos;m</td>
                    </tr>
                    <tr>
                      <td>Yillik Farq</td>
                      <td>{formatNumber(result.annualDifferenceTl ?? 0, 0)} so&apos;m</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Gaz va elektr narxlari uchun
        hisoblagichli, ijtimoiy norma doirasidagi standart tariflar
        (2026-yil iyun holatiga ko&apos;ra: 1100 so&apos;m/m³ gaz, 650
        so&apos;m/kWh elektr) oldindan to&apos;ldirilgan; iste&apos;molingiz
        yuqoriroq bo&apos;lsa yoki tariflar o&apos;zgargan bo&apos;lsa,
        hisobingizdagi aniq narxni kiriting. Tabiiy gaz-kWh
        aylantirishi keng qabul qilingan standart qiymatga (1 m³ =
        10,64 kWh) asoslangan.
        Qozon samaradorligi va konditsioner SCOP qiymati qurilmadan
        qurilmaga o&apos;zgaradi; o&apos;z qurilmangizning texnik
        xususiyatlariga qarab bu qiymatlarni yangilashingiz mumkin.
        Konditsioner SCOP qiymati ayniqsa 0°C dan past tashqi
        haroratlarda pasayadi, bu hisob mavsumiy o&apos;rtachani
        taxmin qiladi.
      </p>
    </div>
  );
}
