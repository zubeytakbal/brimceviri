"use client";

import { useState } from "react";
import { bodyWeights, MAIN_BODIES, OTHER_BODIES, sunWeight } from "../../converter/planetWeights";

const fmt = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 1 });

export default function PlanetWeightTool({ defaultKg }: { defaultKg: number }) {
  const [value, setValue] = useState(String(defaultKg));
  const [showAll, setShowAll] = useState(false);
  const kg = Number(value.replace(",", "."));
  const valid = kg > 0 && kg < 1000;
  const rows = valid ? bodyWeights(kg, showAll ? [...MAIN_BODIES, ...OTHER_BODIES] : MAIN_BODIES) : [];

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Dünya&apos;daki kilonuz (kg)</span>
            <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
        </div>
        <div className="date-calc-chips" role="group" aria-label="Gök cisimleri">
          <button type="button" aria-pressed={!showAll} onClick={() => setShowAll(false)}>
            Gezegenler, Ay ve Plüton
          </button>
          <button type="button" aria-pressed={showAll} onClick={() => setShowAll(true)}>
            Uydular ve cüce gezegenler dahil
          </button>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {valid ? (
          <>
            {rows.map((r) => (
              <div key={r.id} className={r.id === "dunya" ? "date-calc-stat is-main" : "date-calc-stat"}>
                <span>{r.name}</span>
                <strong>{fmt(r.kg)} kg</strong>
                <em>
                  Yerçekimi {fmt(r.gravity)} m/s² · Dünya&apos;ya göre {r.ratio < 1 ? `%${Math.round(r.ratio * 100)}` : `${fmt(r.ratio)} kat`}
                </em>
              </div>
            ))}
            <div className="date-calc-stat">
              <span>Güneş</span>
              <strong>{fmt(sunWeight(kg))} kg</strong>
              <em>Yerçekimi 274 m/s² · Güneş&apos;in katı bir yüzeyi yoktur, değer görünen yüzeyi (fotosfer) içindir</em>
            </div>
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Gezegenlerdeki ağırlığınız</span>
            <strong>—</strong>
            <em>0 ile 1000 kg arasında bir değer girin.</em>
          </div>
        )}
      </div>
    </div>
  );
}
