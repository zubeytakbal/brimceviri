"use client";

import { useState } from "react";
import {
  calculatePlugVoltageCompatibility,
  countryPowerData,
} from "../../converter/travelPlugVoltage";
import {
  countryNamesUz,
  plugTypeDescriptionsUz,
} from "../../converter/travelPlugVoltageUz";

const sortedCountries = [...countryPowerData].sort((a, b) =>
  (countryNamesUz[a.id] ?? a.nameTr).localeCompare(countryNamesUz[b.id] ?? b.nameTr, "uz"),
);

export default function TravelPlugVoltageCalculatorUz() {
  const [fromId, setFromId] = useState("ozbekistan");
  const [toId, setToId] = useState("turkiye");
  const [deviceIsDualVoltage, setDeviceIsDualVoltage] = useState(true);

  const result = calculatePlugVoltageCompatibility(fromId, toId, deviceIsDualVoltage);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Yashaydigan / Kelgan Mamlakating</span>
          <select value={fromId} onChange={(event) => setFromId(event.target.value)}>
            {sortedCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {countryNamesUz[country.id] ?? country.nameTr}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Boradigan Mamlakating</span>
          <select value={toId} onChange={(event) => setToId(event.target.value)}>
            {sortedCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {countryNamesUz[country.id] ?? country.nameTr}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Qurilmang Ikki Voltajlimi? (zaryadlagichda &quot;100-240V&quot; yozilgan bo&apos;lsa ha)</span>
          <select
            value={deviceIsDualVoltage ? "yes" : "no"}
            onChange={(event) => setDeviceIsDualVoltage(event.target.value === "yes")}
          >
            <option value="yes">Ha, ikki voltajli (ko&apos;pchilik telefon/noutbuk zaryadlagichi)</option>
            <option value="no">Yo&apos;q / bilmayman (mas., soch quritgich, dazmol)</option>
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
              <tbody>
                <tr className="is-active">
                  <td>
                    <strong>Vilka Mosligi</strong>
                  </td>
                  <td>
                    <strong>
                      {result.plugMatches
                        ? "Adapter shart emas, rozetkalar mos"
                        : `Adapter kerak — ${countryNamesUz[result.toCountry.id] ?? result.toCountry.nameTr} rozetkalari ${result.toCountry.plugTypes.join("/")} turi`}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Voltaj Holati</td>
                  <td>
                    {result.voltageCompatible
                      ? `Voltaj muammo emas (${result.fromCountry.voltageLabel} → ${result.toCountry.voltageLabel})`
                      : `Voltaj o'zgartirgich kerak bo'lishi mumkin (${result.fromCountry.voltageLabel} → ${result.toCountry.voltageLabel})`}
                  </td>
                </tr>
                <tr>
                  <td>Chastota</td>
                  <td>
                    {result.frequencyDiffers
                      ? `Chastota farq qiladi (${result.fromCountry.frequencyLabel} → ${result.toCountry.frequencyLabel}); zamonaviy elektronika uchun odatda muammo bo'lmaydi`
                      : `Chastota bir xil (${result.toCountry.frequencyLabel})`}
                  </td>
                </tr>
                <tr>
                  <td>{countryNamesUz[result.toCountry.id] ?? result.toCountry.nameTr} Rozetka Turlari</td>
                  <td>
                    {result.toCountry.plugTypes
                      .map((type) => `${type} turi`)
                      .join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="calculator-plug-legend">
            {result.toCountry.plugTypes.map((type) => (
              <li key={type}>
                <strong>{type} turi:</strong> {plugTypeDescriptionsUz[type]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Eslatma:</strong> Voltaj va rozetka standartlari
        mamlakatlarning rasmiy elektr infratuzilmasiga asoslanadi va
        kamdan-kam o&apos;zgaradi; shunga qaramay sayohatdan oldin
        qurilmangizdagi kirish voltaji yorlig&apos;ini tekshirishingiz
        tavsiya etiladi. Ba&apos;zi mamlakatlarda (mas., Braziliya)
        hududga qarab voltaj farq qilishi mumkin.
      </p>
    </div>
  );
}
