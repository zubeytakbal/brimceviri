"use client";

import { useState } from "react";
import { fromRoman, toRoman } from "../../converter/text/roman";

const KEYS = ["I", "V", "X", "L", "C", "D", "M"];

export default function RomanTool() {
  const [mode, setMode] = useState<"toRoman" | "fromRoman">("toRoman");
  const [num, setNum] = useState("2026");
  const [roman, setRoman] = useState("MCMXXIII");

  const n = Number(num.replace(/\./g, ""));
  const r = mode === "toRoman" ? toRoman(n) : null;
  const parsed = mode === "fromRoman" ? fromRoman(roman) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "toRoman"} onClick={() => setMode("toRoman")}>
            Sayı → Roma rakamı
          </button>
          <button type="button" aria-pressed={mode === "fromRoman"} onClick={() => setMode("fromRoman")}>
            Roma rakamı → Sayı
          </button>
        </div>
        {mode === "toRoman" ? (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Sayı (1–3.999.999)</span>
              <input type="text" inputMode="numeric" value={num} onChange={(e) => setNum(e.target.value)} />
            </label>
          </div>
        ) : (
          <>
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Roma rakamı</span>
                <input type="text" autoCapitalize="characters" value={roman} onChange={(e) => setRoman(e.target.value)} />
              </label>
            </div>
            <div className="ebced-keys" aria-label="Harf düğmeleri">
              {KEYS.map((k) => (
                <button key={k} type="button" onClick={() => setRoman((t) => t + k)}>
                  {k}
                </button>
              ))}
              <button type="button" className="ebced-key-wide" onClick={() => setRoman((t) => Array.from(t).slice(0, -1).join(""))}>
                sil
              </button>
              <button type="button" className="ebced-key-wide" onClick={() => setRoman("")}>
                temizle
              </button>
            </div>
          </>
        )}
      </div>
      <div className="date-calc-results" aria-live="polite">
        {mode === "toRoman" ? (
          <div className="date-calc-stat is-main">
            <span>Roma rakamıyla</span>
            <strong>{r ?? "—"}</strong>
            <em>{r ? (n >= 4000 ? "Üst çizgili harfler 1000 ile çarpılır" : `${r.length} harf`) : "1 ile 3.999.999 arasında bir tam sayı girin. Roma rakamlarında sıfır yoktur."}</em>
          </div>
        ) : (
          <>
            <div className="date-calc-stat is-main">
              <span>Sayı karşılığı</span>
              <strong>{parsed ? (parsed.value < 10000 ? String(parsed.value) : parsed.value.toLocaleString("tr-TR")) : "—"}</strong>
              <em>{parsed ? (parsed.standard ? "Standart yazım" : `Standart yazımı: ${parsed.canonical}`) : "Yalnızca I, V, X, L, C, D, M harflerini kullanın."}</em>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
