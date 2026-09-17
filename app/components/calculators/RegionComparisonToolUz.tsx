"use client";

import { useMemo, useState } from "react";
import { compareRegions, type HealthTier } from "../../converter/regionComparisonUz";
import { getAllRegions } from "../../converter/regionElevationHubUz";

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

const healthTierText: Record<HealthTier, string> = {
  past: "Bu farq kichik, kundalik hayotda sezilarli ta'siri yo'q.",
  orta: "Bu farq biroz sezilishi mumkin (nafas qisilishi, tez charchash kabi), ayniqsa keskin harakat qilinganda.",
  sezilarli: "Bu farq, tibbiy manbalarga ko'ra sezilarli hisoblangan chegaradan yuqori — tanangiz moslashishi vaqt olishi mumkin.",
};

type RegionComparisonToolProps = {
  defaultRegionIdA?: string;
  defaultRegionIdB?: string;
};

export default function RegionComparisonToolUz({
  defaultRegionIdA = "toshkent-shahri",
  defaultRegionIdB = "samarqand",
}: RegionComparisonToolProps) {
  const regions = useMemo(() => getAllRegions(), []);
  const [regionIdA, setRegionIdA] = useState(defaultRegionIdA);
  const [regionIdB, setRegionIdB] = useState(defaultRegionIdB);

  const result = useMemo(
    () => compareRegions(regionIdA, regionIdB),
    [regionIdA, regionIdB]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>1. Hudud</span>
          <select value={regionIdA} onChange={(event) => setRegionIdA(event.target.value)}>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>2. Hudud</span>
          <select value={regionIdB} onChange={(event) => setRegionIdB(event.target.value)}>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
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
                  <th>{result.regionA.name}</th>
                  <th>{result.regionB.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Balandlik</td>
                  <td>{formatNumber(result.regionA.elevationM, 0)} m</td>
                  <td>{formatNumber(result.regionB.elevationM, 0)} m</td>
                </tr>
                <tr>
                  <td>Havo Bosimi</td>
                  <td>{formatNumber(result.regionA.pressureHpa)} hPa</td>
                  <td>{formatNumber(result.regionB.pressureHpa)} hPa</td>
                </tr>
                <tr>
                  <td>Suv Qaynash Nuqtasi</td>
                  <td>{formatNumber(result.regionA.boilingPointC)} °C</td>
                  <td>{formatNumber(result.regionB.boilingPointC)} °C</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="calculator-usage-hint">
            <strong>
              {result.regionA.name} bilan {result.regionB.name} orasida{" "}
              {formatNumber(Math.abs(result.elevationDiffM), 0)} metr balandlik farqi bor.
            </strong>{" "}
            {healthTierText[result.healthTier]}
          </p>
        </div>
      )}
    </div>
  );
}
