"use client";

import { useState } from "react";
import { ALL_PAPER, pixels, sheetWeight } from "../../converter/scales/paper";

const DPIS = [72, 96, 150, 300, 600];
const n = (v: number, d = 1) => v.toLocaleString("tr-TR", { maximumFractionDigits: d });

export default function PaperTool() {
  const [id, setId] = useState("A4");
  const [dpi, setDpi] = useState(300);
  const [gsm, setGsm] = useState("80");
  const p = ALL_PAPER.find((x) => x.id === id) ?? ALL_PAPER[4];
  const g = Number(gsm.replace(",", "."));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kâğıt boyutu</span>
            <select value={p.id} onChange={(e) => setId(e.target.value)}>
              {ALL_PAPER.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.id}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Çözünürlük (dpi)</span>
            <select value={dpi} onChange={(e) => setDpi(Number(e.target.value))}>
              {DPIS.map((d) => (
                <option key={d} value={d}>
                  {d} dpi
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Gramaj (g/m²)</span>
            <input type="text" inputMode="decimal" value={gsm} onChange={(e) => setGsm(e.target.value)} />
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>{p.id} ölçüsü</span>
          <strong>
            {n(p.w / 10)} × {n(p.h / 10)} cm
          </strong>
          <em>
            {n(p.w)} × {n(p.h)} mm · {n(p.w / 25.4, 2)} × {n(p.h / 25.4, 2)} inç
          </em>
        </div>
        <div className="date-calc-stat">
          <span>{dpi} dpi piksel</span>
          <strong>
            {pixels(p.w, dpi)} × {pixels(p.h, dpi)}
          </strong>
          <em>Dikey (portre) yönde</em>
        </div>
        <div className="date-calc-stat">
          <span>Alan</span>
          <strong>{n((p.w * p.h) / 1e6, 4)} m²</strong>
        </div>
        {Number.isFinite(g) && g > 0 && (
          <div className="date-calc-stat">
            <span>Bir yaprak ağırlığı</span>
            <strong>{n(sheetWeight(p, g), 2)} g</strong>
            <em>
              {n(g, 0)} g/m² kâğıtta · 500 yaprak {n((sheetWeight(p, g) * 500) / 1000, 2)} kg
            </em>
          </div>
        )}
      </div>
    </div>
  );
}
