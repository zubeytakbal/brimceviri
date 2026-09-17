"use client";

import { useState } from "react";
import {
  celsiusToFahrenheit,
  celsiusToKelvin,
  elementThermalTable,
} from "../../converter/elementThermalPoints";

const uzLabels: Record<string, string> = {
  hydrogen: "Vodorod (H)",
  helium: "Geliy (He)",
  nitrogen: "Azot (N)",
  oxygen: "Kislorod (O)",
  fluorine: "Ftor (F)",
  neon: "Neon (Ne)",
  sodium: "Natriy (Na)",
  aluminum: "Alyuminiy (Al)",
  silicon: "Kremniy (Si)",
  sulfur: "Oltingugurt (S)",
  chlorine: "Xlor (Cl)",
  argon: "Argon (Ar)",
  potassium: "Kaliy (K)",
  calcium: "Kalsiy (Ca)",
  iron: "Temir (Fe)",
  nickel: "Nikel (Ni)",
  copper: "Mis (Cu)",
  zinc: "Rux (Zn)",
  silver: "Kumush (Ag)",
  tin: "Qalay (Sn)",
  iodine: "Yod (I)",
  tungsten: "Volfram (W)",
  platinum: "Platina (Pt)",
  gold: "Oltin (Au)",
  mercury: "Simob (Hg)",
  lead: "Qo'rg'oshin (Pb)",
  uranium: "Uran (U)",
};

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function ElementMeltingBoilingCalculatorUz() {
  const [elementId, setElementId] = useState(elementThermalTable[0].id);

  const element =
    elementThermalTable.find((row) => row.id === elementId) ??
    elementThermalTable[0];
  const elementLabel = uzLabels[element.id] ?? element.label;

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Element</span>
          <select value={elementId} onChange={(event) => setElementId(event.target.value)}>
            {elementThermalTable.map((row) => (
              <option key={row.id} value={row.id}>
                {uzLabels[row.id] ?? row.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">{elementLabel}</th>
                <th scope="col">°C</th>
                <th scope="col">°F</th>
                <th scope="col">K</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Erish Nuqtasi</td>
                <td>{formatValue(element.meltingPointC)}</td>
                <td>{formatValue(celsiusToFahrenheit(element.meltingPointC))}</td>
                <td>{formatValue(celsiusToKelvin(element.meltingPointC))}</td>
              </tr>
              <tr>
                <td>Qaynash Nuqtasi</td>
                <td>{formatValue(element.boilingPointC)}</td>
                <td>{formatValue(celsiusToFahrenheit(element.boilingPointC))}</td>
                <td>{formatValue(celsiusToKelvin(element.boilingPointC))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Elementlarning Erish va Qaynash Nuqtalari Jadvali (°C)</caption>
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Erish Nuqtasi (°C)</th>
              <th scope="col">Qaynash Nuqtasi (°C)</th>
            </tr>
          </thead>
          <tbody>
            {elementThermalTable.map((row) => (
              <tr key={row.id} className={row.id === elementId ? "is-active" : undefined}>
                <td>{uzLabels[row.id] ?? row.label}</td>
                <td>{formatValue(row.meltingPointC)}</td>
                <td>{formatValue(row.boilingPointC)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Qiymatlar standart atmosfera bosimi
        (101,325 kPa) uchun. Uglerod normal bosimda erimasdan
        sublimatsiyaga uchragani uchun bu jadvalga kiritilmagan.
      </p>
    </div>
  );
}
