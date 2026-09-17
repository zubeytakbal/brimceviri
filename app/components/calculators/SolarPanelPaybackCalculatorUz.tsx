"use client";

import { useState } from "react";
import { calculateSolarPayback } from "../../converter/solarPanelPayback";

function parseNumericValue(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return Number.NaN;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function SolarPanelPaybackCalculatorUz() {
  const [systemSizeKwp, setSystemSizeKwp] = useState("5");
  const [regionYield, setRegionYield] = useState("1350");
  const [electricityPrice, setElectricityPrice] = useState("650");
  const [systemCostTl, setSystemCostTl] = useState("");

  const result = calculateSolarPayback({
    systemSizeKwp: parseNumericValue(systemSizeKwp),
    regionYieldKwhPerKwp: parseNumericValue(regionYield),
    electricityPriceTlPerKwh: parseNumericValue(electricityPrice),
    systemCostTl: systemCostTl.trim() ? parseNumericValue(systemCostTl) : 0,
  });

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Tizim Quvvati (kWp)</span>
          <input
            type="text"
            inputMode="decimal"
            value={systemSizeKwp}
            onChange={(event) => setSystemSizeKwp(event.target.value)}
          />
        </label>
        <label className="category-general-converter-field">
          <span>Hududiy Ishlab Chiqarish Samaradorligi (kWh/kWp/yil)</span>
          <input
            type="text"
            inputMode="decimal"
            value={regionYield}
            onChange={(event) => setRegionYield(event.target.value)}
          />
          <small className="calculator-field-note">
            Standart 1350 qiymati Toshkent koordinatalari uchun NASA
            POWER 20 yillik iqlim ma&apos;lumotlaridan (o&apos;rtacha
            quyosh nurlanishi 4,61 kWh/m²/kun ≈ yiliga 1683 kWh/m²)
            taxminiy tizim yo&apos;qotishlari (~%20) hisobga olingan
            holda hisoblangan. O&apos;zbekistonning janubiy hududlari
            (Buxoro, Surxondaryo) odatda yanada yuqori quyosh
            nurlanishiga ega; aniq qiymat uchun mahalliy quyosh
            energiyasi xaritalariga yoki quyosh panellari yetkazib
            beruvchiga murojaat qiling.
          </small>
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
          <span>Tizim O&apos;rnatish Narxi (so&apos;m)</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="masalan 40000000"
            value={systemCostTl}
            onChange={(event) => setSystemCostTl(event.target.value)}
          />
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri qiymatlar kiritib qoplanish muddatini ko&apos;ring.</strong>
        ) : (
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <tbody>
                <tr>
                  <td>Yillik Ishlab Chiqarish</td>
                  <td>{formatNumber(result.annualProductionKwh)} kWh</td>
                </tr>
                <tr className="is-active">
                  <td>
                    <strong>Yillik Tejamkorlik</strong>
                  </td>
                  <td>
                    <strong>{formatNumber(result.annualSavingsTl)} so&apos;m</strong>
                  </td>
                </tr>
                <tr>
                  <td>Qoplanish Muddati</td>
                  <td>
                    {result.breakEvenYears === null
                      ? "O'rnatish narxi kiritilmadi"
                      : `${result.breakEvenYears.toLocaleString("uz-UZ", { maximumFractionDigits: 1 })} yil`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Elektr narxi uchun standart tarif (650
        so&apos;m/kWh, 0-200 kVt/soat ijtimoiy norma doirasida, 2026-yil
        iyun holatiga ko&apos;ra) oldindan to&apos;ldirilgan; iste&apos;molingiz
        yuqoriroq bo&apos;lsa (201-500 kVt/soat uchun 900 so&apos;m/kWh)
        yoki tarif o&apos;zgargan bo&apos;lsa, hisobingizdagi aniq
        narxni kiriting — yuqoriroq narx quyosh panelining
        qoplanish muddatini qisqartiradi. Bu hisob ishlab chiqarilgan
        elektrning barchasi o&apos;z iste&apos;molingizni qoplashini
        taxmin qiladi. Haqiqatda ortiqcha ishlab chiqarish tarmoqqa
        odatda past narxda sotiladi; bu holda haqiqiy qoplanish
        muddati bu yerda hisoblangandan biroz uzoqroq bo&apos;lishi
        mumkin. Hududiy samaradorlik qiymatlari umumiy
        ma&apos;lumotnomadir, tom yo&apos;nalishi va soyalanish
        haqiqiy ishlab chiqarishga ta&apos;sir qiladi.
      </p>
    </div>
  );
}
