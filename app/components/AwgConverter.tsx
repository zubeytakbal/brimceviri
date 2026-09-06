"use client";

import { useState } from "react";
import {
  areaMm2ToAwg,
  awgToAreaMm2,
  awgToDiameterMm,
  commonAwgSizes,
  formatAwgLabel,
} from "../converter/awgConverter";

type Target = "fromAwg" | "fromArea";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("tr-TR", { maximumFractionDigits });
}

export default function AwgConverter() {
  const [target, setTarget] = useState<Target>("fromAwg");
  const [awgInput, setAwgInput] = useState("10");
  const [areaInput, setAreaInput] = useState("2.5");

  const awg = parseNumericValue(awgInput);
  const area = parseNumericValue(areaInput);

  const diameterFromAwg = awg !== null ? awgToDiameterMm(awg) : null;
  const areaFromAwg = awg !== null ? awgToAreaMm2(awg) : null;
  const awgFromArea = area !== null ? areaMm2ToAwg(area) : null;

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <div className="engineering-targets">
          <span>Yön</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "fromAwg" ? " is-active" : ""}`}
              onClick={() => setTarget("fromAwg")}
            >
              AWG&apos;den mm²&apos;ye
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "fromArea" ? " is-active" : ""}`}
              onClick={() => setTarget("fromArea")}
            >
              mm²&apos;den AWG&apos;ye
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "fromAwg" ? (
            <label className="category-general-converter-field">
              <span>AWG Değeri</span>
              <input
                type="text"
                inputMode="decimal"
                value={awgInput}
                onChange={(event) => setAwgInput(event.target.value)}
                placeholder="örn. 10, veya 4/0 için -3"
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Kesit Alanı (mm²)</span>
              <input
                type="text"
                inputMode="decimal"
                value={areaInput}
                onChange={(event) => setAreaInput(event.target.value)}
              />
            </label>
          )}
        </div>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {target === "fromAwg" ? (
          !diameterFromAwg || !areaFromAwg ? (
            <strong>Bir AWG değeri girerek karşılığını görebilirsin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Çap</span>
                <strong>{formatValue(diameterFromAwg)} mm</strong>
              </div>
              <div>
                <span>Kesit Alanı</span>
                <strong>{formatValue(areaFromAwg)} mm²</strong>
              </div>
            </div>
          )
        ) : !awgFromArea ? (
          <strong>Bir kesit alanı girerek en yakın AWG değerini görebilirsin.</strong>
        ) : (
          <strong>
            En Yakın AWG: {formatAwgLabel(Math.round(awgFromArea))} (ondalıklı: {formatValue(awgFromArea, 2)})
          </strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Yaygın AWG Ölçüleri ve mm² Karşılıkları</caption>
          <thead>
            <tr>
              <th scope="col">AWG</th>
              <th scope="col">Çap (mm)</th>
              <th scope="col">Kesit Alanı (mm²)</th>
            </tr>
          </thead>
          <tbody>
            {commonAwgSizes.map((size) => {
              const diameter = awgToDiameterMm(size);
              const areaMm2 = awgToAreaMm2(size);
              return (
                <tr key={size}>
                  <td>{formatAwgLabel(size)}</td>
                  <td>{diameter !== null ? formatValue(diameter) : "—"}</td>
                  <td>{areaMm2 !== null ? formatValue(areaMm2) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Not:</strong> Bu araç yalnızca AWG ile mm² arasındaki
        geometrik (çap/kesit alanı) dönüşümü yapar. Akım taşıma
        kapasitesi (ampacity) yalıtım tipi, ortam sıcaklığı ve kablo
        gruplamasına göre değişir; bunun için ilgili elektrik tesisat
        yönetmeliğine (TS, NEC, IEC vb.) başvurulmalıdır.
      </p>
    </div>
  );
}
