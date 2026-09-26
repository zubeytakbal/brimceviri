"use client";

import { useMemo, useState } from "react";
import { areaMm2ToAwg, awgToAreaMm2, awgToDiameterMm, commonAwgSizes, formatAwgLabel } from "../converter/awgConverter";
import EnglishModeToggle from "./EnglishModeToggle";
import { formatNumber, parseInput } from "./englishFormHelpers";

type Direction = "awg-to-mm2" | "mm2-to-awg";

/** "4/0" -> -3, "1/0" -> 0, "12" -> 12 */
function parseAwg(value: string) {
  const zeros = value.trim().match(/^(\d)\/0$/);
  if (zeros) return 1 - Number(zeros[1]);
  return parseInput(value);
}

// 1 circular mil = area of a circle 1/1000 in in diameter.
function circularMils(diameterMm: number) {
  return (diameterMm / 0.0254) ** 2;
}

export default function EnglishAwgConverter() {
  const [direction, setDirection] = useState<Direction>("awg-to-mm2");
  const [awg, setAwg] = useState("12");
  const [area, setArea] = useState("2.5");

  const awgResult = useMemo(() => {
    const value = parseAwg(awg);
    if (value === null || value < -3 || value > 40) return null;
    const diameterMm = awgToDiameterMm(value)!;
    return { diameterMm, areaMm2: awgToAreaMm2(value)!, kcmil: circularMils(diameterMm) / 1000 };
  }, [awg]);

  const areaResult = useMemo(() => {
    const value = parseInput(area);
    if (value === null || value <= 0) return null;
    const exact = areaMm2ToAwg(value)!;
    // A wire must be at least as thick as the required area -> the next larger size (smaller AWG number).
    const safe = Math.floor(exact);
    return { exact, safe };
  }, [area]);

  return (
    <div className="category-general-converter">
      <div className="engineering-calculator-card">
        <EnglishModeToggle<Direction>
          label="Convert"
          value={direction}
          onChange={setDirection}
          options={[
            { value: "awg-to-mm2", label: "AWG → mm²" },
            { value: "mm2-to-awg", label: "mm² → AWG" },
          ]}
        />
        {direction === "awg-to-mm2" ? (
          <label className="category-general-converter-field">
            <span>AWG size</span>
            <input type="text" value={awg} placeholder="e.g. 12 or 4/0" onChange={(event) => setAwg(event.target.value)} />
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>Cross-sectional area (mm²)</span>
            <input inputMode="decimal" type="text" value={area} onChange={(event) => setArea(event.target.value)} />
          </label>
        )}
      </div>

      <div aria-live="polite" className="category-general-converter-result paint-calculator-result">
        {direction === "awg-to-mm2" ? (
          awgResult ? (
            <div className="paint-calculator-result-grid">
              <div>
                <span>Area</span>
                <strong>{formatNumber(awgResult.areaMm2, 3)} mm²</strong>
              </div>
              <div>
                <span>Diameter</span>
                <strong>
                  {formatNumber(awgResult.diameterMm, 3)} mm ({formatNumber(awgResult.diameterMm / 25.4, 4)} in)
                </strong>
              </div>
              <div>
                <span>Circular mils</span>
                <strong>{formatNumber(awgResult.kcmil, 2)} kcmil</strong>
              </div>
            </div>
          ) : (
            <strong>Enter an AWG size from 4/0 to 40.</strong>
          )
        ) : areaResult ? (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Nearest gauge (not smaller)</span>
              <strong>{areaResult.safe >= -3 ? formatAwgLabel(areaResult.safe) : "Larger than 4/0 – use kcmil sizes"}</strong>
            </div>
            <div>
              <span>Exact equivalent</span>
              <strong>{formatNumber(areaResult.exact, 2)} AWG</strong>
            </div>
          </div>
        ) : (
          <strong>Enter a cross-sectional area greater than 0.</strong>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>AWG wire sizes in mm² and inches</caption>
          <thead>
            <tr>
              <th scope="col">AWG</th>
              <th scope="col">Diameter (mm)</th>
              <th scope="col">Diameter (in)</th>
              <th scope="col">Area (mm²)</th>
            </tr>
          </thead>
          <tbody>
            {commonAwgSizes.map((size) => {
              const diameterMm = awgToDiameterMm(size)!;
              return (
                <tr key={size}>
                  <td>{formatAwgLabel(size)}</td>
                  <td>{formatNumber(diameterMm, 3)}</td>
                  <td>{formatNumber(diameterMm / 25.4, 4)}</td>
                  <td>{formatNumber(awgToAreaMm2(size)!, 3)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        <strong>Note:</strong> this converts sizes only. The current a wire can safely carry (ampacity) depends on
        insulation, temperature, installation method and local code (for example the NEC in the US) – check the
        applicable tables before choosing a wire.
      </p>
    </div>
  );
}
