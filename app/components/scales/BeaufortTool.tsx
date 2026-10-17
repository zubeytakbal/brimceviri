"use client";

import { useState } from "react";
import { BEAUFORT, beaufortOf, type BeaufortLevel, type SpeedUnit } from "../../converter/scales/beaufort";

const UNITS: Array<{ id: SpeedUnit; label: string }> = [
  { id: "kmh", label: "km/h" },
  { id: "kn", label: "knot (deniz mili/saat)" },
  { id: "ms", label: "m/s" },
  { id: "mph", label: "mph" },
];

const range = ([a, b]: [number, number | null], unit: string) =>
  b === null ? `${a.toLocaleString("tr-TR")} ${unit} ve üstü` : a === b ? `${a.toLocaleString("tr-TR")} ${unit}` : `${a.toLocaleString("tr-TR")}–${b.toLocaleString("tr-TR")} ${unit}`;

export default function BeaufortTool() {
  const [mode, setMode] = useState<"speed" | "force">("speed");
  const [value, setValue] = useState("45");
  const [unit, setUnit] = useState<SpeedUnit>("kmh");
  const [force, setForce] = useState(5);

  const level: BeaufortLevel | null = mode === "speed" ? beaufortOf(Number(value.replace(",", ".")), unit) : BEAUFORT[force];

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "speed"} onClick={() => setMode("speed")}>
            Rüzgâr hızı → Bofor
          </button>
          <button type="button" aria-pressed={mode === "force"} onClick={() => setMode("force")}>
            Bofor → Rüzgâr hızı
          </button>
        </div>
        {mode === "speed" ? (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Rüzgâr hızı</span>
              <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
            </label>
            <label className="date-calc-field">
              <span>Birim</span>
              <select value={unit} onChange={(e) => setUnit(e.target.value as SpeedUnit)}>
                {UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        ) : (
          <div className="date-calc-chips" role="group" aria-label="Bofor derecesi">
            {BEAUFORT.map((l) => (
              <button key={l.force} type="button" aria-pressed={force === l.force} onClick={() => setForce(l.force)}>
                {l.force}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>Rüzgâr şiddeti</span>
          <strong>{level ? `${level.force} bofor · ${level.name}` : "—"}</strong>
          <em>{level ? level.sea : "Geçerli bir hız girin."}</em>
        </div>
        {level && (
          <>
            <div className="date-calc-stat">
              <span>km/h</span>
              <strong>{range(level.kmh, "km/h")}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Knot</span>
              <strong>{range(level.kn, "kn")}</strong>
            </div>
            <div className="date-calc-stat">
              <span>m/s</span>
              <strong>{range(level.ms, "m/s")}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Olası dalga</span>
              <strong>{level.wave.toLocaleString("tr-TR")} m</strong>
              <em>Açık denizde</em>
            </div>
            <div className="date-calc-stat">
              <span>Karada</span>
              <strong style={{ fontSize: "1rem" }}>{level.land}</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
