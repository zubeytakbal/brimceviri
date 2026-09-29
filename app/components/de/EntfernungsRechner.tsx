"use client";

import { useState } from "react";
import Link from "@/app/components/SiteLink";
import { germanCities } from "../../converter/geo/germanCities";
import { entfernungPaarPath, himmelsrichtung, kurs, luftlinieKm } from "../../converter/geo/germanDistances";

const sorted = [...germanCities].sort((a, b) => a.name.localeCompare(b.name, "de"));
const km = (v: number) => v.toLocaleString("de-DE", { maximumFractionDigits: 1 });

export default function EntfernungsRechner({ fromId = "berlin", toId = "muenchen" }: { fromId?: string; toId?: string }) {
  const [a, setA] = useState(fromId);
  const [b, setB] = useState(toId);
  const from = germanCities.find((c) => c.id === a)!;
  const to = germanCities.find((c) => c.id === b)!;
  const same = a === b;
  const d = luftlinieKm(from, to);
  const pair = same ? null : entfernungPaarPath(from, to);
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          {[
            ["Von", a, setA],
            ["Nach", b, setB],
          ].map(([label, value, set]) => (
            <label className="date-calc-field" key={label as string}>
              <span>{label as string}</span>
              <select value={value as string} onChange={(event) => (set as (v: string) => void)(event.target.value)}>
                {sorted.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>
      {same ? (
        <p className="date-calc-note">Bitte zwei verschiedene Städte wählen.</p>
      ) : (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Luftlinie {from.name} – {to.name}</span>
            <strong>{km(d)} km</strong>
            <em>
              {to.name} liegt im {himmelsrichtung(kurs(from, to))} von {from.name} · {km(d / 1.609344)} Meilen
            </em>
          </div>
          <p className="date-calc-note">
            {pair ? <Link href={pair}>Mehr zu dieser Strecke</Link> : <Link href={`/de/entfernung/${from.id}`}>Alle Entfernungen ab {from.name}</Link>}
          </p>
        </div>
      )}
    </div>
  );
}
