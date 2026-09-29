"use client";

import { useEffect, useState } from "react";
import {
  arbeitgeberFrist,
  GRUNDKUENDIGUNGSFRIST,
  kuendigungsEnde,
  mietEnde,
  naechsteMietTermine,
  naechsteTermine,
  PROBEZEIT_FRIST,
  type Frist,
  type Termin,
} from "../../converter/germanKuendigung";
import { parseYmd, weekdayOf } from "../../converter/time/dateMath";
import {
  formatDeLong,
  todayBerlin,
  ymdInput,
} from "../../converter/time/germanDates";
import {
  GERMAN_STATES,
  type StateCode,
} from "../../converter/time/germanHolidays";

type Modus =
  | "arbeitnehmer"
  | "arbeitgeber"
  | "probezeit"
  | "vertrag"
  | "mieter"
  | "vermieter";
const MODI: Array<[Modus, string]> = [
  ["arbeitnehmer", "Ich kündige (Job)"],
  ["arbeitgeber", "Arbeitgeber kündigt"],
  ["probezeit", "Probezeit"],
  ["vertrag", "Eigene Frist"],
  ["mieter", "Mieter kündigt"],
  ["vermieter", "Vermieter kündigt"],
];
const TERMINE: Array<[Termin, string]> = [
  ["monatsende", "zum Monatsende"],
  ["15-oder-monatsende", "zum 15. oder Monatsende"],
  ["quartalsende", "zum Quartalsende"],
  ["beliebig", "zu jedem Tag"],
];
const STATES = [...GERMAN_STATES].sort((a, b) =>
  a.name.localeCompare(b.name, "de"),
);

function fristText(f: Frist) {
  const menge = `${f.menge} ${f.einheit === "wochen" ? (f.menge === 1 ? "Woche" : "Wochen") : f.menge === 1 ? "Monat" : "Monate"}`;
  return `${menge} ${TERMINE.find(([t]) => t === f.termin)![1]}`;
}

export default function KuendigungsfristRechner() {
  const [modus, setModus] = useState<Modus>("arbeitnehmer");
  const [zugang, setZugang] = useState("");
  const [jahre, setJahre] = useState(3);
  const [menge, setMenge] = useState(3);
  const [einheit, setEinheit] = useState<"wochen" | "monate">("monate");
  const [termin, setTermin] = useState<Termin>("monatsende");
  const [land, setLand] = useState<StateCode>("nw");
  const [wohnjahre, setWohnjahre] = useState(3);

  // Heutiges Datum erst im Browser setzen (statisch erzeugte Seite).
  useEffect(() => {
    setZugang(ymdInput(todayBerlin())); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  const z = parseYmd(zugang);
  const miete = modus === "mieter" || modus === "vermieter";
  const frist: Frist =
    modus === "arbeitgeber"
      ? arbeitgeberFrist(jahre)
      : modus === "probezeit"
        ? PROBEZEIT_FRIST
        : modus === "vertrag"
          ? { menge, einheit, termin }
          : GRUNDKUENDIGUNGSFRIST;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {MODI.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={modus === id}
            className={modus === id ? "is-active" : undefined}
            onClick={() => setModus(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kündigung geht zu am</span>
            <input
              type="date"
              value={zugang}
              onChange={(event) => setZugang(event.target.value)}
            />
            <small>entscheidend ist der Zugang, nicht das Absenden</small>
          </label>
          {modus === "arbeitgeber" && (
            <label className="date-calc-field">
              <span>Betriebszugehörigkeit (Jahre)</span>
              <select
                value={jahre}
                onChange={(event) => setJahre(Number(event.target.value))}
              >
                {Array.from({ length: 26 }, (_, i) => i).map((j) => (
                  <option key={j} value={j}>
                    {j === 0
                      ? "unter 1 Jahr"
                      : j === 25
                        ? "25 oder mehr"
                        : `${j} ${j === 1 ? "Jahr" : "Jahre"}`}
                  </option>
                ))}
              </select>
              <small>volle Jahre beim Zugang der Kündigung</small>
            </label>
          )}
          {modus === "vertrag" && (
            <>
              <label className="date-calc-field">
                <span>Frist</span>
                <select
                  value={menge}
                  onChange={(event) => setMenge(Number(event.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <label className="date-calc-field">
                <span>Einheit</span>
                <select
                  value={einheit}
                  onChange={(event) =>
                    setEinheit(event.target.value as "wochen" | "monate")
                  }
                >
                  <option value="wochen">Wochen</option>
                  <option value="monate">Monate</option>
                </select>
              </label>
              <label className="date-calc-field">
                <span>Termin</span>
                <select
                  value={termin}
                  onChange={(event) => setTermin(event.target.value as Termin)}
                >
                  {TERMINE.map(([t, label]) => (
                    <option key={t} value={t}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {miete && (
            <label className="date-calc-field">
              <span>Bundesland</span>
              <select
                value={land}
                onChange={(event) => setLand(event.target.value as StateCode)}
              >
                {STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
              <small>Feiertage zählen nicht als Werktag</small>
            </label>
          )}
          {modus === "vermieter" && (
            <label className="date-calc-field">
              <span>Wohndauer (Jahre)</span>
              <select
                value={wohnjahre}
                onChange={(event) => setWohnjahre(Number(event.target.value))}
              >
                {Array.from({ length: 11 }, (_, i) => i).map((j) => (
                  <option key={j} value={j}>
                    {j === 0
                      ? "unter 1 Jahr"
                      : j === 10
                        ? "10 oder mehr"
                        : `${j} ${j === 1 ? "Jahr" : "Jahre"}`}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>

      {!z ? (
        <p className="date-calc-note">Bitte ein Datum wählen.</p>
      ) : miete ? (
        (() => {
          const m = mietEnde(
            z,
            land,
            modus === "mieter" ? "mieter" : "vermieter",
            wohnjahre,
          );
          const termine = naechsteMietTermine(
            z,
            land,
            modus === "mieter" ? "mieter" : "vermieter",
            wohnjahre,
          );
          return (
            <>
              <div className="date-calc-results">
                <div className="date-calc-stat is-main">
                  <span>Mietverhältnis endet am</span>
                  <strong>{formatDeLong(m.ende)}</strong>
                  <em>
                    {m.rechtzeitig
                      ? `Zugang bis zum 3. Werktag (${formatDeLong(m.dritterWerktag)}) – Kündigungsfrist ${m.fristMonate} Monate abzüglich der Karenzzeit`
                      : `Zugang nach dem 3. Werktag (${formatDeLong(m.dritterWerktag)}) – der laufende Monat zählt nicht mehr`}
                  </em>
                </div>
              </div>
              {weekdayOf(m.dritterWerktag) === 6 && (
                <p className="date-calc-note">
                  Der 3. Werktag ist in diesem Monat ein Samstag. Samstage
                  zählen als Werktag; ob die Frist dann bis Montag verlängert
                  ist, hat der Bundesgerichtshof offengelassen. Sicher ist nur
                  der Zugang bis Samstag.
                </p>
              )}
              <Terminliste termine={termine} />
            </>
          );
        })()
      ) : (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Frühestes Ende des Arbeitsverhältnisses</span>
              <strong>{formatDeLong(kuendigungsEnde(z, frist))}</strong>
              <em>Kündigungsfrist: {fristText(frist)}</em>
            </div>
          </div>
          {modus === "arbeitnehmer" && (
            <p className="date-calc-note">
              Die längeren Fristen bei langer Betriebszugehörigkeit gelten nach
              dem Gesetz nur für den Arbeitgeber – außer Ihr Arbeits- oder
              Tarifvertrag sieht sie auch für Sie vor.
            </p>
          )}
          <Terminliste termine={naechsteTermine(z, frist)} />
        </>
      )}
    </div>
  );
}

function Terminliste({
  termine,
}: {
  termine: Array<{
    ende: { year: number; month: number; day: number };
    zugangBis: { year: number; month: number; day: number };
  }>;
}) {
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table">
        <thead>
          <tr>
            <th scope="col">Ende zum</th>
            <th scope="col">Kündigung muss spätestens zugehen am</th>
          </tr>
        </thead>
        <tbody>
          {termine.map((t) => (
            <tr key={ymdInput(t.ende)}>
              <td>{formatDeLong(t.ende)}</td>
              <td>{formatDeLong(t.zugangBis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
