"use client";

import { useState } from "react";
import { riseOver, slopeFrom, slopeLength, type SlopeKind } from "../../converter/scales/slope";

const KINDS: Array<{ id: SlopeKind; label: string }> = [
  { id: "percent", label: "Yüzde (%)" },
  { id: "degree", label: "Derece (°)" },
  { id: "permille", label: "Binde (‰)" },
  { id: "ratio", label: "Oran (1:n)" },
  { id: "rise", label: "cm/m (metrede yükselme)" },
];

const f = (v: number, d = 2) => v.toLocaleString("tr-TR", { maximumFractionDigits: d });

export default function SlopeTool() {
  const [kind, setKind] = useState<SlopeKind>("percent");
  const [value, setValue] = useState("10");
  const [run, setRun] = useState("10");

  const s = slopeFrom(kind, Number(value.replace(",", ".")));
  const r = Number(run.replace(",", "."));
  const hasRun = Number.isFinite(r) && r > 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Eğim</span>
            <input type="text" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Gösterim</span>
            <select value={kind} onChange={(e) => setKind(e.target.value as SlopeKind)}>
              {KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Yatay mesafe (m, isteğe bağlı)</span>
            <input type="text" inputMode="decimal" value={run} onChange={(e) => setRun(e.target.value)} />
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {s ? (
          <>
            <div className="date-calc-stat is-main">
              <span>Eğim açısı</span>
              <strong>{f(s.degree)}°</strong>
              <em>
                %{f(s.percent)} · ‰{f(s.percent * 10, 1)} · {s.ratio ? `1:${f(s.ratio)}` : "düz"}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Yüzde</span>
              <strong>%{f(s.percent)}</strong>
              <em>1 metrede {f(s.percent)} cm yükselir</em>
            </div>
            <div className="date-calc-stat">
              <span>Binde</span>
              <strong>‰{f(s.permille, 1)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Oran</span>
              <strong>{s.ratio ? `1:${f(s.ratio)}` : "—"}</strong>
              <em>{s.ratio ? `${f(s.ratio)} birim yatayda 1 birim yükselir` : "Eğim yok"}</em>
            </div>
            {hasRun && (
              <div className="date-calc-stat">
                <span>{f(r)} m yatayda</span>
                <strong>{f(riseOver(s, r))} m yükselir</strong>
                <em>Eğik uzunluk {f(slopeLength(s, r))} m</em>
              </div>
            )}
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Eğim açısı</span>
            <strong>—</strong>
            <em>Geçerli bir değer girin. Derece 90&apos;dan küçük, oran 0&apos;dan büyük olmalı.</em>
          </div>
        )}
      </div>
    </div>
  );
}
