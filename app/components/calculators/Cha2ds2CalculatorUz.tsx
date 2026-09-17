"use client";

import { useMemo, useState } from "react";
import {
  calculateCha2ds2,
  type Cha2ds2Input,
} from "../../converter/cha2ds2Calculator";

type AgeBand = Cha2ds2Input["ageBand"];

function riskLabelUz(total: number) {
  if (total === 0) return "Past Xavf";
  if (total === 1) return "O'rtacha Xavf";
  return "Yuqori Xavf";
}

export default function Cha2ds2CalculatorUz() {
  const [congestiveHeartFailure, setCongestiveHeartFailure] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [ageBand, setAgeBand] = useState<AgeBand>("under65");
  const [diabetes, setDiabetes] = useState(false);
  const [strokeOrTia, setStrokeOrTia] = useState(false);
  const [vascularDisease, setVascularDisease] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  const result = useMemo(
    () =>
      calculateCha2ds2({
        congestiveHeartFailure,
        hypertension,
        ageBand,
        diabetes,
        strokeOrTia,
        vascularDisease,
        isFemale,
      }),
    [
      congestiveHeartFailure,
      hypertension,
      ageBand,
      diabetes,
      strokeOrTia,
      vascularDisease,
      isFemale,
    ]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Kongestiv Yurak Yetishmovchiligi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={congestiveHeartFailure}
              onChange={(event) =>
                setCongestiveHeartFailure(event.target.checked)
              }
            />
            Bor (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Gipertoniya</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={hypertension}
              onChange={(event) => setHypertension(event.target.checked)}
            />
            Bor (+1)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yosh</span>
          <select
            value={ageBand}
            onChange={(event) => setAgeBand(event.target.value as AgeBand)}
          >
            <option value="under65">65 yoshdan kichik (+0)</option>
            <option value="65to74">65-74 yosh (+1)</option>
            <option value="75plus">75 yosh va undan katta (+2)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Diabet</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={diabetes}
              onChange={(event) => setDiabetes(event.target.checked)}
            />
            Bor (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Insult / TIA / Tromboemboliya Tarixi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={strokeOrTia}
              onChange={(event) => setStrokeOrTia(event.target.checked)}
            />
            Bor (+2)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Qon Tomir Kasalligi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={vascularDisease}
              onChange={(event) => setVascularDisease(event.target.checked)}
            />
            Bor (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Jins</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isFemale}
              onChange={(event) => setIsFemale(event.target.checked)}
            />
            Ayol (+1, klassik ballga kiritiladi)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Klassik CHA2DS2-VASc</span>
            <strong>
              {result.classicTotal} / 9 — {riskLabelUz(result.classicTotal)}
            </strong>
          </div>
          <div>
            <span>2024 Qayta Ko&apos;rilgan CHA2DS2-VA (jinssiz)</span>
            <strong>
              {result.revisedTotal} / 8 — {riskLabelUz(result.revisedTotal)}
            </strong>
          </div>
        </div>
      </div>

      <p className="calculator-usage-hint">
        Xavf kategoriyalari umumiy soddalashtirishdir; to&apos;liq
        antikoagulyatsiya qarori uchun joriy ESC qo&apos;llanmasiga
        va klinik baholashga murojaat qilinishi kerak.
      </p>
    </div>
  );
}
