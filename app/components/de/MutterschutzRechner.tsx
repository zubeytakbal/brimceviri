"use client";

import { useEffect, useState } from "react";
import { fmtDe } from "../../converter/germanMath";
import { parseBetrag } from "../../converter/germanBruttoNetto";
import {
  mutterschaftsgeld,
  mutterschutz,
  naegele,
  schutzfristFehlgeburt,
  sswAm,
  type Besonderheit,
} from "../../converter/germanMutterschutz";
import { addDaysYmd, parseYmd } from "../../converter/time/dateMath";
import {
  formatDeLong,
  todayBerlin,
  ymdInput,
} from "../../converter/time/germanDates";

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;
const BESONDERHEITEN: Array<[Besonderheit, string]> = [
  ["keine", "keine"],
  ["fruehgeburt", "Frühgeburt (unter 2.500 g oder nicht voll ausgereift)"],
  ["mehrlinge", "Zwillinge oder Mehrlinge"],
  ["behinderung", "Behinderung des Kindes (auf Antrag)"],
];

export default function MutterschutzRechner() {
  const [modus, setModus] = useState<"termin" | "periode" | "fehlgeburt">(
    "termin",
  );
  const [termin, setTermin] = useState("");
  const [periode, setPeriode] = useState("");
  const [zyklus, setZyklus] = useState(28);
  const [geburtBekannt, setGeburtBekannt] = useState(false);
  const [geburt, setGeburt] = useState("");
  const [besonderheit, setBesonderheit] = useState<Besonderheit>("keine");
  const [netto, setNetto] = useState("2.200");
  const [versicherung, setVersicherung] = useState<
    "gesetzlich" | "privat-familie"
  >("gesetzlich");
  const [ssw, setSsw] = useState(18);

  // Vorbelegung erst im Browser, damit das statisch erzeugte HTML nicht vom heutigen Datum abhängt.
  useEffect(() => {
    const heute = todayBerlin();
    /* eslint-disable react-hooks/set-state-in-effect */
    setTermin(ymdInput(addDaysYmd(heute, 120)));
    setPeriode(ymdInput(addDaysYmd(heute, -160)));
    setGeburt(ymdInput(addDaysYmd(heute, 110)));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const et =
    modus === "periode"
      ? parseYmd(periode)
        ? naegele(parseYmd(periode)!, zyklus)
        : null
      : parseYmd(termin);
  const geb = geburtBekannt ? parseYmd(geburt) : null;
  const r =
    et && (!geburtBekannt || geb)
      ? mutterschutz({ termin: et, geburt: geb, besonderheit })
      : null;
  const monatsnetto = parseBetrag(netto);
  const geld =
    r && Number.isFinite(monatsnetto)
      ? mutterschaftsgeld(monatsnetto * 3, r.tage, versicherung)
      : null;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(
          [
            ["termin", "Mit Geburtstermin"],
            ["periode", "Mit letzter Periode"],
            ["fehlgeburt", "Nach Fehlgeburt"],
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

      {modus === "fehlgeburt" ? (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <label className="date-calc-field">
                <span>Schwangerschaftswoche bei der Fehlgeburt</span>
                <select
                  value={ssw}
                  onChange={(event) => setSsw(Number(event.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 12).map((w) => (
                    <option key={w} value={w}>
                      {w}. SSW
                    </option>
                  ))}
                </select>
                <small>
                  ab der 24. SSW gilt die Fehlgeburt als Entbindung (8 Wochen)
                </small>
              </label>
            </div>
          </div>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Mutterschutz nach einer Fehlgeburt in der {ssw}. SSW</span>
              <strong>
                {schutzfristFehlgeburt(ssw)
                  ? `${schutzfristFehlgeburt(ssw)} Wochen`
                  : "kein Anspruch"}
              </strong>
              <em>
                {schutzfristFehlgeburt(ssw)
                  ? "ab dem Tag nach der Fehlgeburt; Sie dürfen auf eigenen Wunsch früher weiterarbeiten"
                  : "vor der 13. SSW besteht kein Mutterschutz, eine Krankschreibung ist möglich"}
              </em>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              {modus === "termin" ? (
                <label className="date-calc-field">
                  <span>Errechneter Geburtstermin</span>
                  <input
                    type="date"
                    value={termin}
                    onChange={(event) => setTermin(event.target.value)}
                  />
                </label>
              ) : (
                <>
                  <label className="date-calc-field">
                    <span>Erster Tag der letzten Periode</span>
                    <input
                      type="date"
                      value={periode}
                      onChange={(event) => setPeriode(event.target.value)}
                    />
                  </label>
                  <label className="date-calc-field">
                    <span>Zykluslänge (Tage)</span>
                    <select
                      value={zyklus}
                      onChange={(event) =>
                        setZyklus(Number(event.target.value))
                      }
                    >
                      {Array.from({ length: 15 }, (_, i) => i + 21).map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              <label className="date-calc-field">
                <span>Besonderheit</span>
                <select
                  value={besonderheit}
                  onChange={(event) =>
                    setBesonderheit(event.target.value as Besonderheit)
                  }
                >
                  {BESONDERHEITEN.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              {geburtBekannt && (
                <label className="date-calc-field">
                  <span>Tatsächlicher Geburtstag</span>
                  <input
                    type="date"
                    value={geburt}
                    onChange={(event) => setGeburt(event.target.value)}
                  />
                </label>
              )}
              <label className="date-calc-field">
                <span>Nettogehalt pro Monat (€)</span>
                <input
                  inputMode="decimal"
                  value={netto}
                  onChange={(event) => setNetto(event.target.value)}
                />
                <small>Durchschnitt der letzten drei Monate</small>
              </label>
              <label className="date-calc-field">
                <span>Krankenversicherung</span>
                <select
                  value={versicherung}
                  onChange={(event) =>
                    setVersicherung(
                      event.target.value as "gesetzlich" | "privat-familie",
                    )
                  }
                >
                  <option value="gesetzlich">
                    gesetzlich, eigenes Mitglied
                  </option>
                  <option value="privat-familie">
                    privat oder familienversichert
                  </option>
                </select>
              </label>
            </div>
            <div className="date-calc-checks">
              <label>
                <input
                  type="checkbox"
                  checked={geburtBekannt}
                  onChange={(event) => setGeburtBekannt(event.target.checked)}
                />{" "}
                Das Kind ist schon geboren
              </label>
            </div>
          </div>

          {r && et ? (
            <>
              <div className="date-calc-results">
                <div className="date-calc-stat is-main">
                  <span>Mutterschutz</span>
                  <strong>
                    {formatDeLong(r.beginn).replace(/^\w+, /, "")} –{" "}
                    {formatDeLong(r.ende).replace(/^\w+, /, "")}
                  </strong>
                  <em>
                    {r.tage} Tage ({fmtDe(r.tage / 7, 1)} Wochen) · Beginn in
                    der {sswAm(et, r.beginn).wochen}. SSW
                  </em>
                </div>
                <div className="date-calc-stat">
                  <span>Letzter Arbeitstag</span>
                  <strong>{formatDeLong(addDaysYmd(r.beginn, -1))}</strong>
                  <em>danach nur noch auf eigenen Wunsch</em>
                </div>
                <div className="date-calc-stat">
                  <span>Nach der Geburt</span>
                  <strong>
                    {r.wochenNach} Wochen
                    {r.verlaengerung ? ` + ${r.verlaengerung} Tage` : ""}
                  </strong>
                  <em>
                    {r.verlaengerung
                      ? "verlängert um die Tage, die vor der Geburt fehlten"
                      : `bis ${formatDeLong(r.ende)}`}
                  </em>
                </div>
                {geld && (
                  <div className="date-calc-stat">
                    <span>Mutterschaftsgeld und Zuschuss</span>
                    <strong>{eur(geld.gesamt)}</strong>
                    <em>
                      {versicherung === "gesetzlich"
                        ? `Krankenkasse ${eur(geld.kasse)}`
                        : `Bundesamt für Soziale Sicherung einmalig ${eur(geld.kasse)}`}{" "}
                      · Arbeitgeber {eur(geld.zuschuss)}
                    </em>
                  </div>
                )}
              </div>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <tbody>
                    <tr>
                      <th scope="row">Geburtstermin</th>
                      <td>{formatDeLong(et)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Beginn Mutterschutz</th>
                      <td>{formatDeLong(r.beginn)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Ende Mutterschutz</th>
                      <td>{formatDeLong(r.ende)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Kündigungsschutz bis</th>
                      <td>
                        {formatDeLong(r.kuendigungsschutzBis)} (vier Monate nach
                        der Geburt)
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Elternzeit direkt danach</th>
                      <td>
                        ab {formatDeLong(r.elternzeitAb)} – schriftlich anmelden
                        bis spätestens {formatDeLong(r.elternzeitAnmeldenBis)}
                      </td>
                    </tr>
                    {geld && (
                      <tr>
                        <th scope="row">Pro Kalendertag</th>
                        <td>
                          {eur(geld.tagesnetto)} netto:{" "}
                          {eur(geld.kasseTag || 0)} Krankenkasse +{" "}
                          {eur(geld.zuschussTag)} Arbeitgeber
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="date-calc-note">Bitte ein gültiges Datum eingeben.</p>
          )}
        </>
      )}
    </div>
  );
}
