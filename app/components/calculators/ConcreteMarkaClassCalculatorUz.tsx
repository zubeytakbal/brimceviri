"use client";

import { useMemo, useState } from "react";
import {
  concreteMarkaClassTable,
  findByMarka,
  findByClassName,
} from "../../converter/concreteMarkaClassUz";

type Direction = "marka-to-class" | "class-to-marka";

export default function ConcreteMarkaClassCalculatorUz() {
  const [direction, setDirection] = useState<Direction>("marka-to-class");
  const [marka, setMarka] = useState("M300");
  const [className, setClassName] = useState("B22.5");

  const result = useMemo(() => {
    if (direction === "marka-to-class") {
      return findByMarka(marka);
    }
    return findByClassName(className);
  }, [direction, marka, className]);

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>Aylantirish Yo&apos;nalishi</span>
        <div className="engineering-target-grid">
          <button
            type="button"
            className={`engineering-target-button${direction === "marka-to-class" ? " is-active" : ""}`}
            onClick={() => setDirection("marka-to-class")}
          >
            Markadan Sinfga
          </button>
          <button
            type="button"
            className={`engineering-target-button${direction === "class-to-marka" ? " is-active" : ""}`}
            onClick={() => setDirection("class-to-marka")}
          >
            Sinfdan Markaga
          </button>
        </div>
      </div>

      <div className="paint-calculator-grid">
        {direction === "marka-to-class" ? (
          <label className="category-general-converter-field">
            <span>Beton Markasi</span>
            <select value={marka} onChange={(event) => setMarka(event.target.value)}>
              {concreteMarkaClassTable.map((row) => (
                <option key={row.marka} value={row.marka}>
                  {row.marka}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className="category-general-converter-field">
            <span>Beton Sinfi</span>
            <select value={className} onChange={(event) => setClassName(event.target.value)}>
              {concreteMarkaClassTable.map((row) => (
                <option key={row.className} value={row.className}>
                  {row.className}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>Qiymat tanlab natijani ko&apos;rishingiz mumkin.</strong>
        ) : (
          <div className="paint-calculator-result-grid">
            <div>
              <span>Marka</span>
              <strong>{result.marka}</strong>
            </div>
            <div>
              <span>Sinf</span>
              <strong>{result.className}</strong>
            </div>
          </div>
        )}
      </div>

      <div className="conversion-table-wrap">
        <table className="conversion-table">
          <caption>Beton markasi va sinfi mos kelish jadvali (GOST 26633)</caption>
          <thead>
            <tr>
              <th scope="col">Marka</th>
              <th scope="col">Sinf</th>
            </tr>
          </thead>
          <tbody>
            {concreteMarkaClassTable.map((row) => (
              <tr
                key={row.marka}
                className={result?.marka === row.marka ? "is-active" : undefined}
              >
                <td>{row.marka}</td>
                <td>{row.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="calculator-usage-hint">
        Eslatma: marka (M) — o&apos;rtacha mustahkamlik ko&apos;rsatkichi
        (kgf/sm²), sinf (B) — kafolatlangan mustahkamlik ko&apos;rsatkichi
        (MPa, 95% ehtimollik bilan). Ular orasidagi mos kelish statistik
        xarakterga ega bo&apos;lgani uchun turli manbalarda ozgina farq
        qilishi mumkin; muhim qurilish ishlarida yetkazib beruvchining
        rasmiy sertifikatidagi qiymatga tayanish kerak.
      </p>
    </div>
  );
}
