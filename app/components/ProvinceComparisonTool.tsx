"use client";

import { useMemo, useState } from "react";
import { compareProvinces, type HealthTier } from "../converter/provinceComparison";
import { getAllProvinces } from "../converter/provinceElevationHub";

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

const healthTierText: Record<HealthTier, string> = {
  dusuk: "Bu fark küçük, günlük hayatta hissedilir bir etkisi yoktur.",
  orta: "Bu fark hafif hissedilebilir (nefes darlığı, çabuk yorulma gibi), özellikle ani hareket edildiğinde.",
  belirgin: "Bu fark, tıbbi kaynaklara göre belirgin sayılan bir eşiğin üzerinde — vücudun uyum sağlaması zaman alabilir.",
};

type ProvinceComparisonToolProps = {
  defaultProvinceIdA?: string;
  defaultProvinceIdB?: string;
};

export default function ProvinceComparisonTool({
  defaultProvinceIdA = "istanbul",
  defaultProvinceIdB = "ankara",
}: ProvinceComparisonToolProps) {
  const provinces = useMemo(() => getAllProvinces(), []);
  const [provinceIdA, setProvinceIdA] = useState(defaultProvinceIdA);
  const [provinceIdB, setProvinceIdB] = useState(defaultProvinceIdB);

  const result = useMemo(
    () => compareProvinces(provinceIdA, provinceIdB),
    [provinceIdA, provinceIdB]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>1. İl</span>
          <select value={provinceIdA} onChange={(event) => setProvinceIdA(event.target.value)}>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.nameTr}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>2. İl</span>
          <select value={provinceIdB} onChange={(event) => setProvinceIdB(event.target.value)}>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.nameTr}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result && (
        <div
          aria-live="polite"
          className="category-general-converter-result paint-calculator-result"
        >
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th></th>
                  <th>{result.provinceA.nameTr}</th>
                  <th>{result.provinceB.nameTr}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rakım</td>
                  <td>{formatNumber(result.provinceA.elevationM, 0)} m</td>
                  <td>{formatNumber(result.provinceB.elevationM, 0)} m</td>
                </tr>
                <tr>
                  <td>Hava Basıncı</td>
                  <td>{formatNumber(result.provinceA.pressureHpa)} hPa</td>
                  <td>{formatNumber(result.provinceB.pressureHpa)} hPa</td>
                </tr>
                <tr>
                  <td>Su Kaynama Noktası</td>
                  <td>{formatNumber(result.provinceA.boilingPointC)} °C</td>
                  <td>{formatNumber(result.provinceB.boilingPointC)} °C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="calculator-usage-hint">
            <strong>
              {result.provinceA.nameTr} ile {result.provinceB.nameTr} arasında{" "}
              {formatNumber(Math.abs(result.elevationDiffM), 0)} metre rakım farkı var.
            </strong>{" "}
            {healthTierText[result.healthTier]}
          </p>
        </div>
      )}
    </div>
  );
}
