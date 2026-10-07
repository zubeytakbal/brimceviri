"use client";

import { useEffect, useState } from "react";
import CompoundMolCalculator from "../CompoundMolCalculator";

export type VerbindungDaten = {
  id: string;
  name: string;
  formula: string;
  molarMass: number;
  category: string;
  composition: Array<{ symbol: string; name: string; count: number; contribution: number }>;
  context?: string;
  uses?: string[];
  safety?: string;
};

const fmt = (value: number) => value.toLocaleString("de-DE", { maximumFractionDigits: 3 });

/** Chemische Verbindungen auf einer Seite: Auswahl über ?v= (Kennung oder alter deutscher Slug). */
export default function VerbindungsRechner({
  compounds,
  groups,
  aliases,
}: {
  compounds: VerbindungDaten[];
  groups: Array<{ category: string; label: string }>;
  aliases: Record<string, string>;
}) {
  const [id, setId] = useState("su");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const v = new URLSearchParams(window.location.search).get("v");
      const resolved = v ? (aliases[v] ?? v) : null;
      if (resolved && compounds.some((c) => c.id === resolved)) setId(resolved);
    });
    return () => cancelAnimationFrame(frame);
  }, [aliases, compounds]);

  const c = compounds.find((item) => item.id === id) ?? compounds[0];

  return (
    <div className="date-calc" id="rechner">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Verbindung</span>
            <select value={c.id} onChange={(event) => setId(event.target.value)}>
              {groups.map((g) => (
                <optgroup key={g.category} label={g.label}>
                  {compounds
                    .filter((item) => item.category === g.category)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.formula})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section className="category-article-content">
        <h2>
          {c.name} ({c.formula}): {fmt(c.molarMass)} g/mol
        </h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <caption>Atomare Zusammensetzung</caption>
            <thead>
              <tr>
                <th scope="col">Element</th>
                <th scope="col">Anzahl</th>
                <th scope="col">Beitrag (g/mol)</th>
              </tr>
            </thead>
            <tbody>
              {c.composition.map((item) => (
                <tr key={item.symbol}>
                  <td>
                    {item.name} ({item.symbol})
                  </td>
                  <td>{item.count}</td>
                  <td>{fmt(item.contribution)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {c.context && <p>{c.context}</p>}
        {c.safety && (
          <p>
            <strong>Sicherheit:</strong> {c.safety}
          </p>
        )}
      </section>

      <CompoundMolCalculator key={c.id} locale="de" molarMass={c.molarMass} compoundName={c.name} />
    </div>
  );
}
