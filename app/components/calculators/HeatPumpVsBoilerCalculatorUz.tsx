"use client";

import { useState } from "react";
import {
  calculateHeatPumpVsBoilerPayback,
  heatPumpDefaults,
} from "../../converter/heatPumpVsBoilerPayback";
import { boilerEfficiencyOptions } from "../../converter/heatingCostComparison";

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

function formatSom(value: number): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits: 0 });
}

export default function HeatPumpVsBoilerCalculatorUz() {
  const [gasPrice, setGasPrice] = useState("1100");
  const [boilerId, setBoilerId] = useState(boilerEfficiencyOptions[0].id);
  const [electricityPrice, setElectricityPrice] = useState("650");
  const [heatPumpCop, setHeatPumpCop] = useState(String(heatPumpDefaults.heatPumpCop));
  const [annualHeatNeed, setAnnualHeatNeed] = useState("");
  const [initialCostDifference, setInitialCostDifference] = useState("");

  const boiler =
    boilerEfficiencyOptions.find((option) => option.id === boilerId) ??
    boilerEfficiencyOptions[0];

  const result = calculateHeatPumpVsBoilerPayback({
    gasPriceTlPerM3: parseNumericValue(gasPrice),
    boilerEfficiencyPercent: boiler.efficiencyPercent,
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    heatPumpCop: parseNumericValue(heatPumpCop),
    annualHeatNeedKwh: parseNumericValue(annualHeatNeed),
    initialCostDifferenceTl: parseNumericValue(initialCostDifference),
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
          <span>Issiqlik Nasosining COP Qiymati</span>
          <input
            type="text"
            inputMode="decimal"
            value={heatPumpCop}
            onChange={(event) => setHeatPumpCop(event.target.value)}
          />
          <small className="calculator-field-note">
            Issiqlik nasoslari uchun odatiy oraliq 3,0-5,0; qurilmaning
            energiya yorlig&apos;ida ko&apos;rsatiladi, standart 3,8
            umumiy o&apos;rtachadir.
          </small>
        </label>
        <label className="category-general-converter-field">
          <span>Yillik Issiqlik Ehtiyoji (kWh)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 12000"
            value={annualHeatNeed}
            onChange={(event) => setAnnualHeatNeed(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Issiqlik Nasosi - Qozon O&apos;rnatish Narxi Farqi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 25000000"
            value={initialCostDifference}
            onChange={(event) => setInitialCostDifference(event.target.value)}
          />
          <small className="calculator-field-note">
            Issiqlik nasosi tizimi qozon o&apos;rnatishga nisbatan
            qancha qimmatroqqa tushishi — taklif olgan firmangizdan
            bilib oling.
          </small>
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
                  <td>Qozon bilan 1 kWh Issiqlik Narxi</td>
                  <td>{formatNumber(result.gasCostPerKwhHeat)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Issiqlik Nasosi bilan 1 kWh Issiqlik Narxi</td>
                  <td>{formatNumber(result.heatPumpCostPerKwhHeat)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Yillik Qozon Xarajati</td>
                  <td>{formatSom(result.annualGasCostTl)} so&apos;m</td>
                </tr>
                <tr>
                  <td>Yillik Issiqlik Nasosi Xarajati</td>
                  <td>{formatSom(result.annualHeatPumpCostTl)} so&apos;m</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Tejamkorlik</strong>
                  </td>
                  <td>
                    <strong>{formatSom(result.annualSavingsTl)} so&apos;m</strong>
                  </td>
                </tr>
                <tr>
                  <td>O&apos;rnatish Farqining Qoplanishi</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "Bu raqamlar bilan issiqlik nasosi qimmatroqqa tushmoqda"
                      : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil`}
                  </td>
                </tr>
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
        aylantirishi standart qiymatga (1 m³ = 10,64 kWh) asoslangan. Qozon samaradorligi va
        issiqlik nasosi COP qiymati qurilmadan qurilmaga o&apos;zgaradi;
        o&apos;z qurilmangizning texnik xususiyatlariga qarab bu
        qiymatlarni yangilashingiz mumkin. Issiqlik nasosining COP
        qiymati tashqi harorat pasaygan sari kamayadi, bu hisob
        mavsumiy o&apos;rtachani taxmin qiladi. O&apos;rnatish narxi
        farqi texnik xizmat va xizmat muddati farqlari kabi boshqa
        omillarni o&apos;z ichiga olmaydi.
      </p>
    </div>
  );
}
