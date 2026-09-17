"use client";

import { useState } from "react";
import { outerDiameterMmToInch, pipeNominalSizeTable } from "../../converter/pipeNominalSize";

function formatValue(value: number, maximumFractionDigits = 2): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function PipeNominalSizeCalculatorUz() {
  const [dnId, setDnId] = useState(pipeNominalSizeTable[3].id);

  const row =
    pipeNominalSizeTable.find((item) => item.id === dnId) ??
    pipeNominalSizeTable[3];

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Nominal Diametr (DN)</span>
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
          {" "}tashqi diametr ({formatValue(outerDiameterMmToInch(row.outerDiameterMm), 3)} dyuym)
        </strong>
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Quvur Nominal Diametri (DN) - NPS - Tashqi Diametr Jadvali</caption>
          <thead>
            <tr>
              <th scope="col">DN</th>
              <th scope="col">NPS (Dyuym)</th>
              <th scope="col">Tashqi Diametr (mm)</th>
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
        <strong>Eslatma:</strong> DN va NPS quvurning haqiqiy tashqi
        diametrini emas, nominal (nomiga xos) o&apos;lchamini ifodalaydi —
        masalan, DN50 quvurning tashqi diametri aynan 50 mm emas.
        Qiymatlar EN ISO 6708/DIN standartiga muvofiq; ASME/ANSI
        (Amerika) standartida ba&apos;zi o&apos;lchamlar (ayniqsa DN65 / NPS 2½&quot;)
        bir necha millimetr farq qilishi mumkin. Muhim loyihalarda
        tegishli quvur standartini albatta tasdiqlang.
      </p>
    </div>
  );
}
