"use client";

import { useMemo, useState } from "react";
import {
  calculateApgar,
  type ApgarCategory,
  type CriterionScore,
} from "../../converter/apgarCalculator";

const categoryLabelsUz: Record<ApgarCategory, string> = {
  normal: "Normal (7-10)",
  "orta-depresyon": "O'rtacha Depressiya (4-6)",
  "ciddi-depresyon": "Jiddiy Depressiya (0-3)",
};

export default function ApgarCalculatorUz() {
  const [appearance, setAppearance] = useState<CriterionScore>(2);
  const [pulse, setPulse] = useState<CriterionScore>(2);
  const [grimace, setGrimace] = useState<CriterionScore>(2);
  const [activity, setActivity] = useState<CriterionScore>(2);
  const [respiration, setRespiration] = useState<CriterionScore>(2);

  const result = useMemo(
    () =>
      calculateApgar({ appearance, pulse, grimace, activity, respiration }),
    [appearance, pulse, grimace, activity, respiration]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Ko&apos;rinish (Teri Rangi)</span>
          <select
            value={appearance}
            onChange={(event) =>
              setAppearance(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Butunlay pushti</option>
            <option value={1}>1 - Tana pushti, oyoq-qo&apos;llar ko&apos;k</option>
            <option value={0}>0 - Butunlay ko&apos;k/oqargan</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Puls</span>
          <select
            value={pulse}
            onChange={(event) =>
              setPulse(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - ≥100/daq</option>
            <option value={1}>1 - &lt;100/daq</option>
            <option value={0}>0 - Yo&apos;q</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Refleks (Grimace)</span>
          <select
            value={grimace}
            onChange={(event) =>
              setGrimace(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Yo&apos;tal/aksirish/yig&apos;lash</option>
            <option value={1}>1 - Yuz burishtirish</option>
            <option value={0}>0 - Javob yo&apos;q</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Faollik (Mushak Tonusi)</span>
          <select
            value={activity}
            onChange={(event) =>
              setActivity(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Faol harakat</option>
            <option value={1}>1 - Biroz fleksiya</option>
            <option value={0}>0 - Bo&apos;sh (flaksid)</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Nafas Olish</span>
          <select
            value={respiration}
            onChange={(event) =>
              setRespiration(Number(event.target.value) as CriterionScore)
            }
          >
            <option value={2}>2 - Yaxshi, kuchli yig&apos;lash</option>
            <option value={1}>1 - Sekin/notekis</option>
            <option value={0}>0 - Yo&apos;q</option>
          </select>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {result === null ? (
          <strong>To&apos;g&apos;ri tanlovlar qilib natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>APGAR Jami Ball</span>
              <strong>{result.total} / 10</strong>
            </div>
            <div>
              <span>Kategoriya</span>
              <strong>{categoryLabelsUz[result.category]}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
