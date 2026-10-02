"use client";

import { useState } from "react";
import { parseBetrag } from "../../converter/germanBruttoNetto";
import { fmtDe, parseDe } from "../../converter/germanMath";
import {
  benoetigteSparrate,
  verdopplungszeit,
  zinseszins,
  type Zinsintervall,
} from "../../converter/germanZinseszins";

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix: string }) {
  return (
    <label className="date-calc-field">
      <span>
        {label} ({suffix})
      </span>
      <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export default function Zinseszinsrechner() {
  const [startkapital, setStartkapital] = useState("10.000");
  const [sparrate, setSparrate] = useState("100");
  const [zinssatz, setZinssatz] = useState("5");
  const [jahre, setJahre] = useState("20");
  const [intervall, setIntervall] = useState<Zinsintervall>("jaehrlich");
  const [ziel, setZiel] = useState("100.000");

  const input = {
    startkapital: parseBetrag(startkapital),
    sparrate: parseBetrag(sparrate),
    zinssatz: parseDe(zinssatz),
    jahre: parseDe(jahre),
    intervall,
  };
  const result = zinseszins(input);
  const verdopplung = verdopplungszeit(input.zinssatz, intervall);
  const zielBetrag = parseBetrag(ziel);
  const noetigeRate = result ? benoetigteSparrate(zielBetrag, input) : Number.NaN;
  const maxKapital = result ? Math.max(...result.jahre.map((row) => row.kapital), 1) : 1;

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Zinsgutschrift">
        {(
          [
            ["jaehrlich", "Zinsen jährlich"],
            ["monatlich", "Zinsen monatlich"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={intervall === value}
            className={intervall === value ? "is-active" : undefined}
            onClick={() => setIntervall(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Field label="Startkapital" suffix="€" value={startkapital} onChange={setStartkapital} />
          <Field label="Monatliche Sparrate" suffix="€" value={sparrate} onChange={setSparrate} />
          <Field label="Zinssatz" suffix="% p. a." value={zinssatz} onChange={setZinssatz} />
          <Field label="Laufzeit" suffix="Jahre" value={jahre} onChange={setJahre} />
        </div>
      </div>

      {result ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Endkapital nach {fmtDe(Math.round(input.jahre))} Jahren</span>
              <strong>{eur(result.endkapital)}</strong>
              <em>vor Steuern und Inflation</em>
            </div>
            <div className="date-calc-stat">
              <span>Eingezahlt</span>
              <strong>{eur(result.einzahlungen)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Zinsen</span>
              <strong>{eur(result.zinsen)}</strong>
              <em>
                {result.einzahlungen > 0 ? `${fmtDe((result.zinsen / result.einzahlungen) * 100, 1)} % der Einzahlungen` : ""}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Kapital verdoppelt in</span>
              <strong>{Number.isFinite(verdopplung) ? `${fmtDe(verdopplung, 1)} Jahren` : "—"}</strong>
              <em>ohne Sparrate</em>
            </div>
          </div>

          <div className="date-calc-input">
            <strong className="date-calc-input-title">Wie viel muss ich monatlich sparen?</strong>
            <div className="date-calc-fields">
              <Field label="Zielbetrag" suffix="€" value={ziel} onChange={setZiel} />
            </div>
            <p className="zins-ziel-ergebnis">
              {Number.isFinite(noetigeRate)
                ? noetigeRate === 0
                  ? "Das Ziel erreichen Sie schon mit dem Startkapital, ohne monatliche Sparrate."
                  : `Für ${eur(zielBetrag)} in ${fmtDe(Math.round(input.jahre))} Jahren brauchen Sie bei ${fmtDe(input.zinssatz, 2)} % eine Sparrate von ${eur(noetigeRate)} im Monat.`
                : "Bitte einen Zielbetrag eingeben."}
            </p>
          </div>

          <div className="holiday-table-wrap">
            <table className="holiday-table zins-tabelle">
              <thead>
                <tr>
                  <th scope="col">Jahr</th>
                  <th scope="col">Eingezahlt</th>
                  <th scope="col">Zinsen im Jahr</th>
                  <th scope="col">Kapital am Jahresende</th>
                </tr>
              </thead>
              <tbody>
                {result.jahre.map((row) => (
                  <tr key={row.jahr}>
                    <td>{row.jahr}</td>
                    <td>{eur(row.einzahlungen)}</td>
                    <td>{eur(row.zinsen)}</td>
                    <td>
                      <span className="zins-balken" aria-hidden="true">
                        <span style={{ width: `${(row.einzahlungen / maxKapital) * 100}%` }} className="is-eingezahlt" />
                        <span style={{ width: `${(Math.max(row.zinsenKumuliert, 0) / maxKapital) * 100}%` }} className="is-zinsen" />
                      </span>
                      {eur(row.kapital)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="date-calc-note">
          Bitte gültige Werte eingeben: Beträge ab 0 €, Laufzeit von 1 bis 100 Jahren.
        </p>
      )}
    </div>
  );
}
