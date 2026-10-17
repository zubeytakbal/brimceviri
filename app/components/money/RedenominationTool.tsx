"use client";

import { useState } from "react";
import { REDENOMINATIONS, convertRedenomination } from "../../converter/money/redenomination";
import { trLocative } from "../../converter/turkishSuffix";

const fmt = (v: number) => v.toLocaleString("tr-TR", { maximumFractionDigits: 6 });

export default function RedenominationTool() {
  const [systemId, setSystemId] = useState("tr");
  const system = REDENOMINATIONS.find((s) => s.id === systemId)!;
  const [fromId, setFromId] = useState(system.units[0].id);
  const [toId, setToId] = useState(system.units[system.units.length - 1].id);
  const [raw, setRaw] = useState("1000000");

  const pick = (id: string) => {
    const next = REDENOMINATIONS.find((s) => s.id === id)!;
    setSystemId(id);
    setFromId(next.units[0].id);
    setToId(next.units[next.units.length - 1].id);
    setRaw(String(next.units[0].perNew));
  };

  const value = Number(raw.replace(/\./g, "").replace(",", "."));
  const result = convertRedenomination(systemId, value, fromId, toId);
  const fromUnit = system.units.find((u) => u.id === fromId)!;
  const toUnit = system.units.find((u) => u.id === toId)!;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Ülke">
          {REDENOMINATIONS.map((s) => (
            <button key={s.id} type="button" aria-pressed={s.id === systemId} onClick={() => pick(s.id)}>
              {s.country}
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Tutar</span>
            <input inputMode="decimal" value={raw} onChange={(e) => setRaw(e.target.value)} />
          </label>
          <label className="date-calc-field">
            <span>Bu paradan</span>
            <select value={fromId} onChange={(e) => setFromId(e.target.value)}>
              {system.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Bu paraya</span>
            <select value={toId} onChange={(e) => setToId(e.target.value)}>
              {system.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="date-calc-results" aria-live="polite">
        <div className="date-calc-stat is-main">
          <span>Sonuç</span>
          <strong>{result === null ? "—" : `${fmt(result)} ${toUnit.short}`}</strong>
          <em>
            {result === null
              ? "Geçerli bir tutar girin."
              : `${fmt(value)} ${fromUnit.short} · ${trLocative(system.country)} sadeleştirme: ${system.date}`}
          </em>
        </div>
      </div>
    </div>
  );
}
