"use client";

import { useState } from "react";
import type { GaugeRow } from "../../converter/scales/workshop";

// Numara ↔ mm çevirici: tablodan seçilen numaranın ölçüsü ya da girilen ölçüye en yakın numara.

export type GaugeTable = { id: string; label: string; rows: GaugeRow[] };

const mmF = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 3 });
const inF = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 4 });
const closest = (rows: GaugeRow[], mm: number) => rows.reduce((b, r) => (Math.abs(r.mm - mm) < Math.abs(b.mm - mm) ? r : b));

export default function GaugeTool({ tables, prefix, metricStep, defaultRow }: { tables: GaugeTable[]; prefix: string; metricStep?: number; defaultRow?: string }) {
  const [mode, setMode] = useState<"pick" | "mm">("pick");
  const [tableId, setTableId] = useState(tables[0].id);
  const table = tables.find((t) => t.id === tableId) ?? tables[0];
  const [rowId, setRowId] = useState(defaultRow ?? table.rows[Math.floor(table.rows.length / 2)].id);
  const [mm, setMm] = useState("3,2");

  const row = table.rows.find((r) => r.id === rowId) ?? table.rows[0];
  const v = Number(mm.replace(",", "."));
  const valid = Number.isFinite(v) && v > 0;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "pick"} onClick={() => setMode("pick")}>
            Numara → mm
          </button>
          <button type="button" aria-pressed={mode === "mm"} onClick={() => setMode("mm")}>
            mm → Numara
          </button>
        </div>
        <div className="date-calc-fields">
          {mode === "pick" ? (
            <>
              {tables.length > 1 && (
                <label className="date-calc-field">
                  <span>Seri</span>
                  <select
                    value={table.id}
                    onChange={(e) => {
                      const t = tables.find((x) => x.id === e.target.value)!;
                      setTableId(t.id);
                      setRowId(t.rows[0].id);
                    }}
                  >
                    {tables.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              <label className="date-calc-field">
                <span>Numara</span>
                <select value={row.id} onChange={(e) => setRowId(e.target.value)}>
                  {table.rows.map((r) => (
                    <option key={r.id} value={r.id}>
                      {prefix}
                      {r.id}
                    </option>
                  ))}
                </select>
              </label>
            </>
          ) : (
            <label className="date-calc-field">
              <span>Ölçü (mm)</span>
              <input type="text" inputMode="decimal" value={mm} onChange={(e) => setMm(e.target.value)} />
            </label>
          )}
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        {mode === "pick" ? (
          <>
            <div className="date-calc-stat is-main">
              <span>
                {prefix}
                {row.id}
              </span>
              <strong>{mmF(row.mm)} mm</strong>
              <em>{inF(row.inch)} inç</em>
            </div>
            {metricStep && (
              <div className="date-calc-stat">
                <span>En yakın metrik uç</span>
                <strong>{mmF(Math.round(row.mm / metricStep) * metricStep)} mm</strong>
                <em>{metricStep.toLocaleString("tr-TR")} mm adımlı seride</em>
              </div>
            )}
          </>
        ) : valid ? (
          tables.map((t, i) => {
            const r = closest(t.rows, v);
            return (
              <div key={t.id} className={`date-calc-stat${i === 0 ? " is-main" : ""}`}>
                <span>En yakın · {t.label}</span>
                <strong>
                  {prefix}
                  {r.id}
                </strong>
                <em>
                  {mmF(r.mm)} mm ({r.mm >= v ? "+" : "−"}
                  {mmF(Math.abs(r.mm - v))} mm)
                </em>
              </div>
            );
          })
        ) : (
          <div className="date-calc-stat is-main">
            <span>En yakın numara</span>
            <strong>—</strong>
            <em>Pozitif bir ölçü girin.</em>
          </div>
        )}
      </div>
    </div>
  );
}
