"use client";

import { useState } from "react";
import {
  calculatePlugVoltageCompatibility,
  countryPowerData,
  plugTypeDescriptions,
} from "../converter/travelPlugVoltage";

const sortedCountries = [...countryPowerData].sort((a, b) =>
  a.nameTr.localeCompare(b.nameTr, "tr"),
);

export default function TravelPlugVoltageCalculator() {
  const [fromId, setFromId] = useState("turkiye");
  const [toId, setToId] = useState("almanya");
  const [deviceIsDualVoltage, setDeviceIsDualVoltage] = useState(true);

  const result = calculatePlugVoltageCompatibility(fromId, toId, deviceIsDualVoltage);

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Yaşadığın / Geldiğin Ülke</span>
          <select value={fromId} onChange={(event) => setFromId(event.target.value)}>
            {sortedCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameTr}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Gideceğin Ülke</span>
          <select value={toId} onChange={(event) => setToId(event.target.value)}>
            {sortedCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.nameTr}
              </option>
            ))}
          </select>
        </label>
        <label className="category-general-converter-field">
          <span>Cihazın Çift Voltajlı mı? (şarj aleti üzerinde &quot;100-240V&quot; yazıyorsa evet)</span>
          <select
            value={deviceIsDualVoltage ? "yes" : "no"}
            onChange={(event) => setDeviceIsDualVoltage(event.target.value === "yes")}
          >
            <option value="yes">Evet, çift voltajlı (çoğu telefon/laptop şarj cihazı)</option>
            <option value="no">Hayır / bilmiyorum (örn. saç kurutma makinesi, ütü)</option>
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
                    <strong>Fiş Uyumu</strong>
                  </td>
                  <td>
                    <strong>
                      {result.plugMatches
                        ? "Adaptöre gerek yok, prizler uyumlu"
                        : `Adaptör gerekli — ${result.toCountry.nameTr} prizleri Tip ${result.toCountry.plugTypes.join("/")}`}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td>Voltaj Durumu</td>
                  <td>
                    {result.voltageCompatible
                      ? `Voltaj sorun değil (${result.fromCountry.voltageLabel} → ${result.toCountry.voltageLabel})`
                      : `Voltaj dönüştürücü gerekebilir (${result.fromCountry.voltageLabel} → ${result.toCountry.voltageLabel})`}
                  </td>
                </tr>
                <tr>
                  <td>Frekans</td>
                  <td>
                    {result.frequencyDiffers
                      ? `Frekans farklı (${result.fromCountry.frequencyLabel} → ${result.toCountry.frequencyLabel}); modern elektronikler için genelde sorun olmaz`
                      : `Frekans aynı (${result.toCountry.frequencyLabel})`}
                  </td>
                </tr>
                <tr>
                  <td>{result.toCountry.nameTr} Priz Tipleri</td>
                  <td>
                    {result.toCountry.plugTypes
                      .map((type) => `Tip ${type}`)
                      .join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="calculator-plug-legend">
            {result.toCountry.plugTypes.map((type) => (
              <li key={type}>
                <strong>Tip {type}:</strong> {plugTypeDescriptions[type]}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Voltaj ve priz standartları ülkelerin
        resmi elektrik altyapısına dayanır ve nadiren değişir; yine de
        seyahat öncesi cihazının üzerindeki giriş voltajı etiketini
        kontrol etmen önerilir. Bazı ülkelerde (ör. Brezilya) bölgeye
        göre voltaj farklılık gösterebilir.
      </p>
    </div>
  );
}
