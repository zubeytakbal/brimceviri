"use client";

import { useState } from "react";
import { outerDiameterMmToInch, pipeNominalSizeTable } from "../converter/pipeNominalSize";

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function PipeNominalSizeCalculator() {
  const [dnId, setDnId] = useState(pipeNominalSizeTable[3].id);

  const row =
    pipeNominalSizeTable.find((item) => item.id === dnId) ??
    pipeNominalSizeTable[3];

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Nominal Çap (DN)</span>
          <select value={dnId} onChange={(event) => setDnId(event.target.value)}>
            {pipeNominalSizeTable.map((item) => (
              <option key={item.id} value={item.id}>
                DN{item.dn} ({item.nps})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <strong>
          DN{row.dn} = {row.nps} = {formatValue(row.outerDiameterMm)} mm
          {" "}dış çap ({formatValue(outerDiameterMmToInch(row.outerDiameterMm), 3)} inç)
        </strong>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Boru Nominal Çap (DN) - NPS - Dış Çap Tablosu</caption>
          <thead>
            <tr>
              <th scope="col">DN</th>
              <th scope="col">NPS (İnç)</th>
              <th scope="col">Dış Çap (mm)</th>
            </tr>
          </thead>
          <tbody>
            {pipeNominalSizeTable.map((item) => (
              <tr key={item.id} className={item.id === dnId ? "is-active" : undefined}>
                <td>DN{item.dn}</td>
                <td>{item.nps}</td>
                <td>{formatValue(item.outerDiameterMm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> DN ve NPS, borunun gerçek dış çapını değil,
        nominal (isimsel) ölçüsünü ifade eder — örneğin DN50 borunun dış
        çapı tam 50 mm değildir. Değerler EN ISO 6708/DIN standardına
        göredir; ASME/ANSI (Amerikan) standardında bazı ölçüler
        (özellikle DN65 / NPS 2½&quot;) birkaç milimetre farklı olabilir.
        Kritik projelerde ilgili boru standardını mutlaka teyit edin.
      </p>
    </div>
  );
}
