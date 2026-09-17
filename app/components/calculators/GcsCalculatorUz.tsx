"use client";

import { useMemo, useState } from "react";
import {
  calculateGcs,
  type EyeOpeningScore,
  type GcsCategory,
  type MotorResponseScore,
  type VerbalResponseScore,
} from "../../converter/gcsCalculator";

const categoryLabelsUz: Record<GcsCategory, string> = {
  hafif: "Yengil (14-15)",
  orta: "O'rtacha (9-13)",
  siddetli: "Og'ir (3-8)",
};

export default function GcsCalculatorUz() {
  const [eyeOpening, setEyeOpening] = useState<EyeOpeningScore>(4);
  const [verbalResponse, setVerbalResponse] =
    useState<VerbalResponseScore>(5);
  const [motorResponse, setMotorResponse] = useState<MotorResponseScore>(6);

  const result = useMemo(
    () => calculateGcs(eyeOpening, verbalResponse, motorResponse),
    [eyeOpening, verbalResponse, motorResponse]
  );

  return (
    <div className="category-general-converter">
      <div className="paint-calculator-grid">
        <label className="category-general-converter-field">
          <span>Ko&apos;z Ochish Javobi</span>
          <select
            value={eyeOpening}
            onChange={(event) =>
              setEyeOpening(Number(event.target.value) as EyeOpeningScore)
            }
          >
            <option value={4}>4 - Spontan</option>
            <option value={3}>3 - Ovozga</option>
            <option value={2}>2 - Og&apos;riqli ta&apos;sirga</option>
            <option value={1}>1 - Javob yo&apos;q</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Nutqiy Javob</span>
          <select
            value={verbalResponse}
            onChange={(event) =>
              setVerbalResponse(
                Number(event.target.value) as VerbalResponseScore
              )
            }
          >
            <option value={5}>5 - Oryentatsiyalangan, to&apos;g&apos;ri gapirish</option>
            <option value={4}>4 - Chalkash gapirish</option>
            <option value={3}>3 - Nomunosib so&apos;zlar</option>
            <option value={2}>2 - Tushunarsiz tovushlar</option>
            <option value={1}>1 - Javob yo&apos;q</option>
          </select>
        </label>

        <label className="category-general-converter-field">
          <span>Motor Javob</span>
          <select
            value={motorResponse}
            onChange={(event) =>
              setMotorResponse(
                Number(event.target.value) as MotorResponseScore
              )
            }
          >
            <option value={6}>6 - Buyruqlarga bo&apos;ysunadi</option>
            <option value={5}>5 - Og&apos;riqli ta&apos;sirni lokalizatsiya qiladi</option>
            <option value={4}>4 - Og&apos;riqdan tortadi (fleksiya)</option>
            <option value={3}>3 - Anomal fleksiya (dekortikatsiya)</option>
            <option value={2}>2 - Ekstenziya (decerebratsiya)</option>
            <option value={1}>1 - Javob yo&apos;q</option>
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
              <span>GKS Jami Ball</span>
              <strong>{result.total} / 15</strong>
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
