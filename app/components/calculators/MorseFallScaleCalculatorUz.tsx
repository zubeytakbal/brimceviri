"use client";

import { useMemo, useState } from "react";
import {
  calculateMorseFallScale,
  type AmbulatoryAid,
  type Gait,
  type MorseRiskCategory,
} from "../../converter/morseFallScaleCalculator";

const categoryLabelsUz: Record<MorseRiskCategory, string> = {
  dusuk: "Past Xavf (0-24)",
  orta: "O'rtacha Xavf (25-44)",
  yuksek: "Yuqori Xavf (≥45)",
};

export default function MorseFallScaleCalculatorUz() {
  const [historyOfFalling, setHistoryOfFalling] = useState(false);
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState(false);
  const [ambulatoryAid, setAmbulatoryAid] = useState<AmbulatoryAid>("none");
  const [ivOrHeparinLock, setIvOrHeparinLock] = useState(false);
  const [gait, setGait] = useState<Gait>("normal");
  const [forgetsLimitations, setForgetsLimitations] = useState(false);

  const result = useMemo(
    () =>
      calculateMorseFallScale({
        historyOfFalling,
        secondaryDiagnosis,
        ambulatoryAid,
        ivOrHeparinLock,
        gait,
        forgetsLimitations,
      }),
    [
      historyOfFalling,
      secondaryDiagnosis,
      ambulatoryAid,
      ivOrHeparinLock,
      gait,
      forgetsLimitations,
    ]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Yiqilish tarixi (hozirgi murojaat/so&apos;nggi 3 oy)</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={historyOfFalling}
              onChange={(event) => setHistoryOfFalling(event.target.checked)}
            />
            Bor (+25)
          </span>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>Ikkilamchi tashxis bormi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={secondaryDiagnosis}
              onChange={(event) =>
                setSecondaryDiagnosis(event.target.checked)
              }
            />
            Bor (+15)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yurish Yordamchisi</span>
          <select
            value={ambulatoryAid}
            onChange={(event) =>
              setAmbulatoryAid(event.target.value as AmbulatoryAid)
            }
          >
            <option value="none">Yo&apos;q / to&apos;shakda dam olish / hamshira yordami (+0)</option>
            <option value="crutchesCaneWalker">Qo&apos;ltiqtayoq / hassa / uoker (+15)</option>
            <option value="furniture">Buyumlarga tutinib (+30)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>IV / Geparin qulfi o&apos;rnatilganmi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={ivOrHeparinLock}
              onChange={(event) => setIvOrHeparinLock(event.target.checked)}
            />
            Bor (+20)
          </span>
        </label>

        <label className="category-general-converter-field">
          <span>Yurish (Gait)</span>
          <select
            value={gait}
            onChange={(event) => setGait(event.target.value as Gait)}
          >
            <option value="normal">Normal / to&apos;shakda dam olish / g&apos;ildirakli kreslo (+0)</option>
            <option value="weak">Zaif (+10)</option>
            <option value="impaired">Buzilgan (+20)</option>
          </select>
        </label>

        <label className="category-general-converter-field paint-calculator-checkbox-field">
          <span>O&apos;z cheklovini unutadimi</span>
          <span className="paint-calculator-checkbox-row">
            <input
              type="checkbox"
              checked={forgetsLimitations}
              onChange={(event) =>
                setForgetsLimitations(event.target.checked)
              }
            />
            Ha (+15)
          </span>
        </label>
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        <div className="paint-calculator-result-grid">
          <div>
            <span>Morse Yiqilish Balli</span>
            <strong>{result.total} / 125</strong>
          </div>
          <div>
            <span>Xavf Kategoriyasi</span>
            <strong>{categoryLabelsUz[result.category]}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
