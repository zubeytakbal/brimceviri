"use client";

import { useState } from "react";
import {
  areaMm2ToAwg,
  awgToAreaMm2,
  awgToDiameterMm,
  commonAwgSizes,
  formatAwgLabel,
} from "../../converter/awgConverter";

type Target = "fromAwg" | "fromArea";

function parseNumericValue(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number, maximumFractionDigits = 3): string {
  return value.toLocaleString("uz-UZ", { maximumFractionDigits });
}

export default function AwgConverterUz() {
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
          <span>Yo&apos;nalish</span>
          <div className="engineering-target-grid hydrostatic-target-grid">
            <button
              type="button"
              className={`engineering-target-button${target === "fromAwg" ? " is-active" : ""}`}
              onClick={() => setTarget("fromAwg")}
            >
              AWG dan mm² ga
            </button>
            <button
              type="button"
              className={`engineering-target-button${target === "fromArea" ? " is-active" : ""}`}
              onClick={() => setTarget("fromArea")}
            >
              mm² dan AWG ga
            </button>
          </div>
        </div>

        <div className="paint-calculator-grid">
          {target === "fromAwg" ? (
            <label className="category-general-converter-field">
              <span>AWG Qiymati</span>
              <input
                type="text"
                inputMode="decimal"
                value={awgInput}
                onChange={(event) => setAwgInput(event.target.value)}
                placeholder="mas. 10, yoki 4/0 uchun -3"
              />
            </label>
          ) : (
            <label className="category-general-converter-field">
              <span>Kesim Maydoni (mm²)</span>
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
            <strong>AWG qiymatini kiritib mos qiymatini ko&apos;rishingiz mumkin.</strong>
          ) : (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Diametr</span>
                <strong>{formatValue(diameterFromAwg)} mm</strong>
              </div>
              <div>
                <span>Kesim Maydoni</span>
                <strong>{formatValue(areaFromAwg)} mm²</strong>
              </div>
            </div>
          )
        ) : !awgFromArea ? (
          <strong>Kesim maydonini kiritib eng yaqin AWG qiymatini ko&apos;rishingiz mumkin.</strong>
        ) : (
          <strong>
            Eng Yaqin AWG: {formatAwgLabel(Math.round(awgFromArea))} (o&apos;nlik: {formatValue(awgFromArea, 2)})
          </strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Keng Tarqalgan AWG O&apos;lchamlari va mm² Ekvivalentlari</caption>
          <thead>
            <tr>
              <th scope="col">AWG</th>
              <th scope="col">Diametr (mm)</th>
              <th scope="col">Kesim Maydoni (mm²)</th>
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
        <strong>Eslatma:</strong> Bu vosita faqat AWG bilan mm² orasidagi
        geometrik (diametr/kesim maydoni) aylantirishni bajaradi. Tok
        o&apos;tkazish sig&apos;imi (ampasite) izolyatsiya turi, atrof-muhit
        harorati va kabel guruhlanishiga qarab o&apos;zgaradi; buning uchun
        tegishli elektr o&apos;rnatish qoidalariga (TS, NEC, IEC va h.k.)
        murojaat qilish kerak.
      </p>
    </div>
  );
}
