"use client";

import { useState } from "react";
import { sugarFrom, type SugarKind } from "../../converter/scales/sugar";

const KINDS: Array<{ id: SugarKind; label: string }> = [
  { id: "brix", label: "Brix (°Bx)" },
  { id: "baume", label: "Baumé (°Bé)" },
  { id: "sg", label: "Özgül ağırlık (SG)" },
  { id: "oechsle", label: "Öchsle (°Oe)" },
];

const f = (v: number, d = 2) => v.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });

export default function SugarTool() {
  const [kind, setKind] = useState<SugarKind>("brix");
  const [value, setValue] = useState("68");
  const s = sugarFrom(kind, Number(value.replace(",", ".")));

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Değer</span>
            <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Ölçek</span>
            <select value={kind} onChange={(e) => setKind(e.target.value as SugarKind)}>
              {KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {s ? (
          <>
            <div className="date-calc-stat is-main">
              <span>Şeker oranı</span>
              <strong>{f(s.brix, 1)} °Bx</strong>
              <em>100 g çözeltide yaklaşık {f(s.brix, 1)} g çözünmüş şeker (20 °C)</em>
            </div>
            <div className="date-calc-stat">
              <span>Baumé</span>
              <strong>{f(s.baume, 1)} °Bé</strong>
            </div>
            <div className="date-calc-stat">
              <span>Özgül ağırlık</span>
              <strong>{f(s.sg, 4)}</strong>
              <em>1 litresi yaklaşık {f(s.sg, 3)} kg</em>
            </div>
            <div className="date-calc-stat">
              <span>Öchsle</span>
              <strong>{f(s.oechsle, 0)} °Oe</strong>
            </div>
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Şeker oranı</span>
            <strong>—</strong>
            <em>0–85 °Bx (özgül ağırlık 1,000–1,450) aralığında bir değer girin.</em>
          </div>
        )}
      </div>
    </div>
  );
}
