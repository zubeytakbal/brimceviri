"use client";

import { useState } from "react";
import { ASTM_E11, finestPassingSieve, nearestSieveByMicron } from "../../converter/scales/sieve";

const n = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 3 });

export default function SieveTool() {
  const [mode, setMode] = useState<"mesh" | "micron">("mesh");
  const [mesh, setMesh] = useState(200);
  const [micron, setMicron] = useState("100");

  const um = Number(micron.replace(",", "."));
  const sieve = ASTM_E11.find((s) => s.mesh === mesh)!;
  const nearest = mode === "micron" ? nearestSieveByMicron(um) : null;
  const passing = mode === "micron" ? finestPassingSieve(um) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "mesh"} onClick={() => setMode("mesh")}>
            Mesh → Mikron
          </button>
          <button type="button" aria-pressed={mode === "micron"} onClick={() => setMode("micron")}>
            Mikron → Mesh
          </button>
        </div>
        <div className="date-calc-fields">
          {mode === "mesh" ? (
            <label className="date-calc-field">
              <span>Elek numarası (mesh)</span>
              <select value={mesh} onChange={(e) => setMesh(Number(e.target.value))}>
                {ASTM_E11.map((s) => (
                  <option key={s.mesh} value={s.mesh}>
                    {s.mesh} mesh
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Tanecik / açıklık (µm)</span>
              <input type="text" inputMode="decimal" value={micron} onChange={(e) => setMicron(e.target.value)} />
            </label>
          )}
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {mode === "mesh" ? (
          <>
            <div className="date-calc-stat is-main">
              <span>{sieve.mesh} mesh elek açıklığı</span>
              <strong>{n(sieve.micron)} µm</strong>
              <em>
                {n(sieve.micron / 1000)} mm · {(sieve.micron / 25400).toLocaleString("tr-TR", { maximumFractionDigits: 4 })} inç
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Geçen tanecik</span>
              <strong>&lt; {n(sieve.micron)} µm</strong>
              <em>Bu açıklıktan küçük taneler elekten geçer</em>
            </div>
          </>
        ) : (
          <>
            <div className="date-calc-stat is-main">
              <span>En yakın standart elek</span>
              <strong>{nearest ? `${nearest.mesh} mesh` : "—"}</strong>
              <em>{nearest ? `Açıklık ${n(nearest.micron)} µm (${n(nearest.micron / 1000)} mm)` : "Pozitif bir değer girin."}</em>
            </div>
            <div className="date-calc-stat">
              <span>Bu boyutun geçtiği en ince elek</span>
              <strong>{passing ? `${passing.mesh} mesh` : "—"}</strong>
              <em>{passing ? `${n(passing.micron)} µm açıklık` : um > 4750 ? "4 mesh (4,75 mm) elekten büyük" : ""}</em>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
