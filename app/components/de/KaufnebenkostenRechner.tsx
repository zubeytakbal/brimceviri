"use client";

import { useState } from "react";
import { fmtDe, parseDe } from "../../converter/germanMath";
import { parseBetrag } from "../../converter/germanBruttoNetto";
import {
  GRUNDBUCH_PROZENT,
  GRUNDERWERBSTEUER,
  kaufnebenkosten,
  MAKLER_PROZENT,
  NOTAR_PROZENT,
} from "../../converter/germanKaufnebenkosten";
import {
  GERMAN_STATES,
  type StateCode,
} from "../../converter/time/germanHolidays";

const eur = (n: number) => `${fmtDe(n, 0, 0)} €`;
const STATES = [...GERMAN_STATES].sort((a, b) =>
  a.name.localeCompare(b.name, "de"),
);

export default function KaufnebenkostenRechner() {
  const [preis, setPreis] = useState("400.000");
  const [land, setLand] = useState<StateCode>("nw");
  const [inventar, setInventar] = useState("0");
  const [mitMakler, setMitMakler] = useState(true);
  const [makler, setMakler] = useState(fmtDe(MAKLER_PROZENT, 2));
  const [notar, setNotar] = useState(fmtDe(NOTAR_PROZENT, 2));
  const [grundbuch, setGrundbuch] = useState(fmtDe(GRUNDBUCH_PROZENT, 2));
  const [familie, setFamilie] = useState(false);

  const kaufpreis = parseBetrag(preis);
  const valid = Number.isFinite(kaufpreis) && kaufpreis > 0;
  const eingabe = {
    kaufpreis: valid ? kaufpreis : 0,
    bundesland: land,
    inventar: parseBetrag(inventar) || 0,
    notarProzent: parseDe(notar) || 0,
    grundbuchProzent: parseDe(grundbuch) || 0,
    maklerProzent: mitMakler ? parseDe(makler) || 0 : 0,
    familie,
  };
  const r = kaufnebenkosten(eingabe);
  const vergleich = GERMAN_STATES.map((s) => ({
    s,
    steuer: kaufnebenkosten({ ...eingabe, bundesland: s.code })
      .grunderwerbsteuer,
  })).sort(
    (a, b) => a.steuer - b.steuer || a.s.name.localeCompare(b.s.name, "de"),
  );

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>Kaufpreis (€)</span>
            <input
              inputMode="decimal"
              value={preis}
              onChange={(event) => setPreis(event.target.value)}
            />
          </label>
          <label className="date-calc-field">
            <span>Bundesland</span>
            <select
              value={land}
              onChange={(event) => setLand(event.target.value as StateCode)}
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({fmtDe(GRUNDERWERBSTEUER[s.code], 1)} %)
                </option>
              ))}
            </select>
          </label>
          <label className="date-calc-field">
            <span>Davon Inventar (€)</span>
            <input
              inputMode="decimal"
              value={inventar}
              onChange={(event) => setInventar(event.target.value)}
            />
            <small>z. B. Einbauküche, Markise – ohne Grunderwerbsteuer</small>
          </label>
          {mitMakler && (
            <label className="date-calc-field">
              <span>Maklerprovision (%)</span>
              <input
                inputMode="decimal"
                value={makler}
                onChange={(event) => setMakler(event.target.value)}
              />
              <small>Käuferanteil inkl. MwSt., meist 3,57 %</small>
            </label>
          )}
          <label className="date-calc-field">
            <span>Notar (%)</span>
            <input
              inputMode="decimal"
              value={notar}
              onChange={(event) => setNotar(event.target.value)}
            />
            <small>Richtwert 1,5 %, mit Grundschuld etwas mehr</small>
          </label>
          <label className="date-calc-field">
            <span>Grundbuch (%)</span>
            <input
              inputMode="decimal"
              value={grundbuch}
              onChange={(event) => setGrundbuch(event.target.value)}
            />
          </label>
        </div>
        <div className="date-calc-checks">
          <label>
            <input
              type="checkbox"
              checked={mitMakler}
              onChange={(event) => setMitMakler(event.target.checked)}
            />{" "}
            Mit Makler
          </label>
          <label>
            <input
              type="checkbox"
              checked={familie}
              onChange={(event) => setFamilie(event.target.checked)}
            />{" "}
            Kauf von Ehepartner, Eltern oder Kindern (steuerfrei)
          </label>
        </div>
      </div>

      {valid ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Kaufnebenkosten</span>
              <strong>{eur(r.summe)}</strong>
              <em>
                {fmtDe(r.prozent, 2)} % des Kaufpreises · Gesamtkosten{" "}
                {eur(r.gesamt)}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Grunderwerbsteuer ({fmtDe(r.satz, 1)} %)</span>
              <strong>{eur(r.grunderwerbsteuer)}</strong>
              <em>
                {r.steuerfrei
                  ? "steuerfrei"
                  : r.inventarErsparnis
                    ? `${eur(r.inventarErsparnis)} gespart durch das Inventar`
                    : `auf ${eur(r.bemessung)}`}
              </em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <tbody>
                <tr>
                  <th scope="row">Grunderwerbsteuer</th>
                  <td>{eur(r.grunderwerbsteuer)}</td>
                </tr>
                <tr>
                  <th scope="row">Notar</th>
                  <td>{eur(r.notar)}</td>
                </tr>
                <tr>
                  <th scope="row">Grundbuchamt</th>
                  <td>{eur(r.grundbuch)}</td>
                </tr>
                {mitMakler && (
                  <tr>
                    <th scope="row">Makler</th>
                    <td>{eur(r.makler)}</td>
                  </tr>
                )}
                <tr>
                  <th scope="row">
                    <strong>Nebenkosten gesamt</strong>
                  </th>
                  <td>
                    <strong>{eur(r.summe)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!r.steuerfrei && (
            <>
              <p className="date-calc-note">
                Grunderwerbsteuer für diesen Kaufpreis in allen Bundesländern:
              </p>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <tbody>
                    {vergleich.map(({ s, steuer }) => (
                      <tr key={s.code}>
                        <td>
                          {s.code === land ? <strong>{s.name}</strong> : s.name}
                        </td>
                        <td>{fmtDe(GRUNDERWERBSTEUER[s.code], 1)} %</td>
                        <td>{eur(steuer)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <p className="date-calc-note">Bitte einen Kaufpreis eingeben.</p>
      )}
    </div>
  );
}
