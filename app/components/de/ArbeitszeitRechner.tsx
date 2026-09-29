"use client";

import { useState } from "react";
import {
  dezimal,
  feierabend,
  hhmm,
  parseDauer,
  parseZeit,
  REGELN,
  tagAuswerten,
  uhrzeit,
  woche,
  type Tag,
} from "../../converter/germanArbeitszeit";

const dez = (min: number) =>
  dezimal(min).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
const TAGE = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
];
type Zeile = { beginn: string; ende: string; pause: string };
const START: Zeile[] = [
  ...Array.from({ length: 5 }, () => ({
    beginn: "08:00",
    ende: "16:30",
    pause: "30",
  })),
  { beginn: "", ende: "", pause: "" },
  { beginn: "", ende: "", pause: "" },
];

function Feld({
  label,
  value,
  onChange,
  hint,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export default function ArbeitszeitRechner() {
  const [modus, setModus] = useState<"tag" | "feierabend" | "woche">("tag");
  const [jugendlich, setJugendlich] = useState(false);
  const [beginn, setBeginn] = useState("08:00");
  const [ende, setEnde] = useState("17:15");
  const [pause, setPause] = useState("30");
  const [soll, setSoll] = useState("8:00");
  const [sollWoche, setSollWoche] = useState("40:00");
  const [zeilen, setZeilen] = useState<Zeile[]>(START);
  const r = jugendlich ? REGELN.jugendlich : REGELN.erwachsen;

  const b = parseZeit(beginn);
  const e = parseZeit(ende);
  const p = parseDauer(pause);
  const sollMin = parseDauer(soll);

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(
          [
            ["tag", "Arbeitszeit"],
            ["feierabend", "Feierabend"],
            ["woche", "Woche"],
          ] as const
        ).map(([id, label]) => (
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

      {modus === "tag" && (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <Feld
                label="Arbeitsbeginn"
                value={beginn}
                onChange={setBeginn}
                placeholder="08:00"
              />
              <Feld
                label="Arbeitsende"
                value={ende}
                onChange={setEnde}
                placeholder="17:00"
                hint="über Mitternacht möglich"
              />
              <Feld
                label="Pause (Minuten oder h:mm)"
                value={pause}
                onChange={setPause}
                placeholder="30"
              />
              <Feld
                label="Sollarbeitszeit pro Tag"
                value={soll}
                onChange={setSoll}
                placeholder="8:00"
              />
            </div>
          </div>
          {b !== null && e !== null && p !== null ? (
            (() => {
              const t = tagAuswerten({ beginn: b, ende: e, pause: p }, r);
              const diff =
                sollMin !== null ? t.nettoGesetzlich - sollMin : null;
              return (
                <>
                  <div className="date-calc-results">
                    <div className="date-calc-stat is-main">
                      <span>Arbeitszeit</span>
                      <strong>{hhmm(t.nettoGesetzlich)} Std.</strong>
                      <em>
                        {dez(t.nettoGesetzlich)} Stunden dezimal · Anwesenheit{" "}
                        {hhmm(t.anwesenheit)}
                        {t.ueberNacht ? " (über Mitternacht)" : ""}
                      </em>
                    </div>
                    <div className="date-calc-stat">
                      <span>Gesetzliche Mindestpause</span>
                      <strong>{t.mindest} Min.</strong>
                      <em>
                        {t.pauseZuKurz
                          ? `Ihre Pause ist ${t.mindest - p} Min. zu kurz`
                          : "eingehalten"}
                      </em>
                    </div>
                    {diff !== null && (
                      <div className="date-calc-stat">
                        <span>
                          {diff >= 0 ? "Überstunden" : "Minusstunden"}
                        </span>
                        <strong>{hhmm(Math.abs(diff))}</strong>
                        <em>gegenüber {hhmm(sollMin!)} Soll</em>
                      </div>
                    )}
                  </div>
                  {(t.pauseZuKurz || t.abschnittZuKurz || t.ueberMax) && (
                    <ul className="date-calc-note">
                      {t.pauseZuKurz && (
                        <li>
                          Bei dieser Anwesenheit schreibt das Gesetz mindestens{" "}
                          {t.mindest} Minuten Pause vor. Nicht genommene
                          Pflichtpausen sind trotzdem keine Arbeitszeit; deshalb
                          zählt der Rechner {hhmm(t.nettoGesetzlich)} statt{" "}
                          {hhmm(t.netto)} Stunden.
                        </li>
                      )}
                      {t.abschnittZuKurz && (
                        <li>
                          Pausen unter 15 Minuten gelten nicht als Ruhepause im
                          Sinne des Gesetzes.
                        </li>
                      )}
                      {t.ueberMax && (
                        <li>
                          Mehr als {hhmm(r.maxTag)} Stunden:{" "}
                          {t.ueberAusnahme
                            ? `auch die Obergrenze von ${hhmm(r.maxTagAusnahme)} Stunden ist überschritten.`
                            : `zulässig bis ${hhmm(r.maxTagAusnahme)} Stunden, wenn der Durchschnitt über sechs Monate 8 Stunden je Werktag nicht übersteigt.`}
                        </li>
                      )}
                    </ul>
                  )}
                </>
              );
            })()
          ) : (
            <p className="date-calc-note">
              Bitte Uhrzeiten wie 8:00 oder 17:15 eingeben.
            </p>
          )}
        </>
      )}

      {modus === "feierabend" && (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <Feld
                label="Arbeitsbeginn"
                value={beginn}
                onChange={setBeginn}
                placeholder="08:00"
              />
              <Feld
                label="Sollarbeitszeit"
                value={soll}
                onChange={setSoll}
                placeholder="8:00"
                hint="z. B. 7:48 bei 39-Stunden-Woche"
              />
              <Feld
                label="Geplante Pause (Minuten)"
                value={pause}
                onChange={setPause}
                placeholder="30"
                hint="mindestens die gesetzliche Pause"
              />
            </div>
          </div>
          {b !== null && sollMin !== null && p !== null ? (
            (() => {
              const f = feierabend(b, sollMin, p, r);
              return (
                <div className="date-calc-results">
                  <div className="date-calc-stat is-main">
                    <span>Feierabend</span>
                    <strong>{uhrzeit(f.ende)} Uhr</strong>
                    <em>
                      {hhmm(sollMin)} Arbeit + {f.pause} Min. Pause
                      {f.pause > p ? " (gesetzliche Mindestpause)" : ""}
                    </em>
                  </div>
                  <div className="date-calc-stat">
                    <span>Spätestens gehen</span>
                    <strong>{uhrzeit(f.spaetestens)} Uhr</strong>
                    <em>
                      {hhmm(r.maxTagAusnahme)} Std. Höchstarbeitszeit plus Pause
                    </em>
                  </div>
                  <div className="date-calc-stat">
                    <span>Frühester Arbeitsbeginn morgen</span>
                    <strong>{uhrzeit(f.ende + r.ruhezeit)} Uhr</strong>
                    <em>nach {hhmm(r.ruhezeit)} Std. Ruhezeit</em>
                  </div>
                </div>
              );
            })()
          ) : (
            <p className="date-calc-note">
              Bitte Arbeitsbeginn und Sollzeit eingeben.
            </p>
          )}
        </>
      )}

      {modus === "woche" &&
        (() => {
          const tage: Array<Tag | null> = zeilen.map((z) => {
            const zb = parseZeit(z.beginn);
            const ze = parseZeit(z.ende);
            const zp = parseDauer(z.pause);
            return zb !== null && ze !== null && zp !== null
              ? { beginn: zb, ende: ze, pause: zp }
              : null;
          });
          const sw = parseDauer(sollWoche) ?? 0;
          const w = woche(tage, sw, r);
          const setZeile = (i: number, key: keyof Zeile, v: string) =>
            setZeilen(zeilen.map((z, j) => (j === i ? { ...z, [key]: v } : z)));
          return (
            <>
              <div className="holiday-table-wrap">
                <table className="holiday-table arbeitszeit-woche">
                  <thead>
                    <tr>
                      <th scope="col">Tag</th>
                      <th scope="col">Beginn</th>
                      <th scope="col">Ende</th>
                      <th scope="col">Pause</th>
                      <th scope="col">Arbeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {zeilen.map((z, i) => {
                      const a = w.ausgewertet[i];
                      const ruhe = w.ruhezeiten[i];
                      return (
                        <tr key={TAGE[i]}>
                          <th scope="row">{TAGE[i].slice(0, 2)}</th>
                          {(["beginn", "ende", "pause"] as const).map((k) => (
                            <td key={k}>
                              <input
                                inputMode="numeric"
                                aria-label={`${TAGE[i]} ${k}`}
                                value={z[k]}
                                size={5}
                                onChange={(event) =>
                                  setZeile(i, k, event.target.value)
                                }
                              />
                            </td>
                          ))}
                          <td>
                            {a ? hhmm(a.nettoGesetzlich) : "–"}
                            {a?.pauseZuKurz && <small> ⚠ Pause</small>}
                            {a?.ueberAusnahme && (
                              <small>
                                {" "}
                                ⚠ über {hhmm(r.maxTagAusnahme)} Std.
                              </small>
                            )}
                            {ruhe !== null && ruhe < r.ruhezeit && (
                              <small> ⚠ Ruhezeit {hhmm(ruhe)}</small>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="date-calc-input">
                <div className="date-calc-fields">
                  <Feld
                    label="Sollarbeitszeit pro Woche"
                    value={sollWoche}
                    onChange={setSollWoche}
                    placeholder="40:00"
                  />
                </div>
              </div>
              <div className="date-calc-results">
                <div className="date-calc-stat is-main">
                  <span>Wochenarbeitszeit</span>
                  <strong>{hhmm(w.summe)} Std.</strong>
                  <em>{dez(w.summe)} Stunden dezimal</em>
                </div>
                <div className="date-calc-stat">
                  <span>
                    {w.ueberstunden >= 0 ? "Überstunden" : "Minusstunden"}
                  </span>
                  <strong>{hhmm(Math.abs(w.ueberstunden))}</strong>
                  <em>gegenüber {hhmm(sw)} Soll</em>
                </div>
                <div className="date-calc-stat">
                  <span>Ruhezeit-Verstöße</span>
                  <strong>{w.ruheVerstoesse}</strong>
                  <em>
                    weniger als {hhmm(r.ruhezeit)} Std. zwischen zwei
                    Arbeitstagen
                  </em>
                </div>
              </div>
              {w.ueberWochenmax && (
                <p className="date-calc-note">
                  Mehr als {hhmm(r.maxWoche)} Stunden in dieser Woche:{" "}
                  {jugendlich
                    ? "für Jugendliche nicht zulässig."
                    : "nur zulässig, wenn der Durchschnitt über sechs Monate 48 Stunden nicht übersteigt."}
                </p>
              )}
            </>
          );
        })()}

      <div className="date-calc-checks">
        <label>
          <input
            type="checkbox"
            checked={jugendlich}
            onChange={(event) => setJugendlich(event.target.checked)}
          />{" "}
          Unter 18 Jahre (Jugendarbeitsschutzgesetz)
        </label>
      </div>
    </div>
  );
}
