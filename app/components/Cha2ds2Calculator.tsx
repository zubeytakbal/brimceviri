"use client";

import { useMemo, useState } from "react";
import {
  calculateCha2ds2,
  type Cha2ds2Input,
} from "../converter/cha2ds2Calculator";

type AgeBand = Cha2ds2Input["ageBand"];

function riskLabel(total: number) {
  if (total === 0) return "Düşük Risk";
  if (total === 1) return "Orta Risk";
  return "Yüksek Risk";
}

export default function Cha2ds2Calculator() {
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
          <span>Konjestif Kalp Yetmezliği</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={congestiveHeartFailure}
              onChange={(event) =>
                setCongestiveHeartFailure(event.target.checked)
              }
            />
            Var (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Hipertansiyon</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={hypertension}
              onChange={(event) => setHypertension(event.target.checked)}
            />
            Var (+1)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yaş</span>
          <select
            value={ageBand}
            onChange={(event) => setAgeBand(event.target.value as AgeBand)}
          >
            <option value="under65">65 yaş altı (+0)</option>
            <option value="65to74">65-74 yaş (+1)</option>
            <option value="75plus">75 yaş ve üzeri (+2)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Diyabet</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={diabetes}
              onChange={(event) => setDiabetes(event.target.checked)}
            />
            Var (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>İnme / TİA / Tromboemboli Öyküsü</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={strokeOrTia}
              onChange={(event) => setStrokeOrTia(event.target.checked)}
            />
            Var (+2)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Vasküler Hastalık</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={vascularDisease}
              onChange={(event) => setVascularDisease(event.target.checked)}
            />
            Var (+1)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Cinsiyet</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={isFemale}
              onChange={(event) => setIsFemale(event.target.checked)}
            />
            Kadın (+1, klasik skora dahil)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Klasik CHA2DS2-VASc</span>
            <strong>
              {result.classicTotal} / 9 — {riskLabel(result.classicTotal)}
            </strong>
          </div>
          <div>
            <span>2024 Revize CHA2DS2-VA (cinsiyet hariç)</span>
            <strong>
              {result.revisedTotal} / 8 — {riskLabel(result.revisedTotal)}
            </strong>
          </div>
        </div>
      </div>

      <p className="calculator-usage-hint">
        Risk kategorileri genel bir basitleştirmedir; tam antikoagülasyon
        kararı için güncel ESC kılavuzuna ve klinik değerlendirmeye
        başvurulmalıdır.
      </p>
    </div>
  );
}
