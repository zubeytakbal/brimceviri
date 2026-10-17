"use client";

import { useState } from "react";
import { BIKE_RIMS, outerDiameter, parseEtrto, rimByBsd } from "../../converter/scales/bikeRim";

const OPTIONS = BIKE_RIMS.flatMap((r) => r.names.map((name) => ({ name, bsd: r.bsd })));

export default function BikeRimTool() {
  const [mode, setMode] = useState<"name" | "etrto">("name");
  const [pick, setPick] = useState('28"|622');
  const [etrto, setEtrto] = useState("37-622");

  const [pickName, pickBsd] = pick.split("|");
  const parsed = parseEtrto(etrto);
  const bsd = mode === "name" ? Number(pickBsd) : parsed?.bsd ?? null;
  const rim = bsd ? rimByBsd(bsd) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "name"} onClick={() => setMode("name")}>
            İnç → ETRTO (mm)
          </button>
          <button type="button" aria-pressed={mode === "etrto"} onClick={() => setMode("etrto")}>
            ETRTO → İnç
          </button>
        </div>
        <div className="date-calc-fields">
          {mode === "name" ? (
            <label className="date-calc-field">
              <span>Jant ölçüsü</span>
              <select value={pick} onChange={(e) => setPick(e.target.value)}>
                {OPTIONS.map((o) => (
                  <option key={`${o.name}|${o.bsd}`} value={`${o.name}|${o.bsd}`}>
                    {o.name} ({o.bsd} mm)
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="date-calc-field">
              <span>Lastik yanağındaki ETRTO (ör. 37-622)</span>
              <input type="text" value={etrto} onChange={(e) => setEtrto(e.target.value)} />
            </label>
          )}
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>{mode === "name" ? `${pickName} jant oturma çapı (BSD)` : "Jant karşılığı"}</span>
          <strong>{mode === "name" ? `${pickBsd} mm` : rim ? rim.names.join(" / ") : "—"}</strong>
          <em>
            {rim
              ? rim.use
              : mode === "etrto" && parsed
                ? `${parsed.bsd} mm yaygın bir jant ölçüsü değil; numarayı kontrol edin.`
                : "Genişlik-çap biçiminde yazın: 37-622, 50-559, 25-622."}
          </em>
        </div>
        {rim && (
          <div className="date-calc-stat">
            <span>Aynı jantın adları</span>
            <strong>{rim.names.join(", ")}</strong>
            <em>ETRTO çapı {rim.bsd} mm</em>
          </div>
        )}
        {mode === "etrto" && parsed && (
          <div className="date-calc-stat">
            <span>Yaklaşık teker dış çapı</span>
            <strong>{outerDiameter(parsed.width, parsed.bsd)} mm</strong>
            <em>
              {parsed.bsd} + 2 × {parsed.width} mm lastik · ≈ {(outerDiameter(parsed.width, parsed.bsd) / 25.4).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} inç
            </em>
          </div>
        )}
      </div>
    </div>
  );
}
