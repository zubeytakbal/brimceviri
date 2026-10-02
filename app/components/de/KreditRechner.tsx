"use client";

import { useState } from "react";
import { parseBetrag } from "../../converter/germanBruttoNetto";
import {
  baufiRate,
  effektivAusSollzins,
  kreditbetragAusRate,
  monatsrate,
  monatszinsAusEffektiv,
  restschuldNachJahren,
  tilgungsplan,
  type Tilgungsplan,
} from "../../converter/germanKredit";
import { fmtDe, parseDe } from "../../converter/germanMath";

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

function laufzeitText(monate: number) {
  const jahre = Math.floor(monate / 12);
  const rest = monate % 12;
  if (jahre === 0) return `${rest} Monate`;
  return rest === 0 ? `${jahre} Jahre` : `${jahre} Jahre, ${rest} Monate`;
}

function PlanTabelle({ plan, betrag, markJahr }: { plan: Tilgungsplan; betrag: number; markJahr?: number }) {
  const mitSonder = plan.jahre.some((row) => row.sondertilgung > 0);
  return (
    <div className="holiday-table-wrap">
      <table className="holiday-table zins-tabelle">
        <thead>
          <tr>
            <th scope="col">Jahr</th>
            <th scope="col">Zinsen</th>
            <th scope="col">Tilgung</th>
            {mitSonder && <th scope="col">Sondertilgung</th>}
            <th scope="col">Restschuld</th>
          </tr>
        </thead>
        <tbody>
          {plan.jahre.map((row) => (
            <tr key={row.jahr} className={row.jahr === markJahr ? "is-highlight" : undefined}>
              <td>{row.jahr}</td>
              <td>{eur(row.zinsen)}</td>
              <td>{eur(row.tilgung)}</td>
              {mitSonder && <td>{eur(row.sondertilgung)}</td>}
              <td>
                <span className="zins-balken" aria-hidden="true">
                  <span style={{ width: `${(row.restschuld / betrag) * 100}%` }} className="is-eingezahlt" />
                </span>
                {eur(row.restschuld)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- Ratenkredit ---------------- */

export function Ratenkreditrechner() {
  const [betrag, setBetrag] = useState("10.000");
  const [monate, setMonate] = useState("48");
  const [effektiv, setEffektiv] = useState("6,5");
  const [wunschrate, setWunschrate] = useState("250");

  const k = parseBetrag(betrag);
  const n = Math.round(parseDe(monate));
  const eff = parseDe(effektiv);
  const i = monatszinsAusEffektiv(eff);
  const valid = k > 0 && n >= 1 && n <= 120 && eff >= 0 && eff <= 100;
  const rate = valid ? monatsrate(k, i, n) : Number.NaN;
  const plan = valid ? tilgungsplan({ betrag: k, monatszins: i, rate }) : null;
  const moeglich = valid ? kreditbetragAusRate(parseBetrag(wunschrate), i, n) : Number.NaN;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Field label="Kreditbetrag" suffix="€" value={betrag} onChange={setBetrag} />
          <Field label="Laufzeit" suffix="Monate" value={monate} onChange={setMonate} />
          <Field label="Effektiver Jahreszins" suffix="%" value={effektiv} onChange={setEffektiv} />
        </div>
        <div className="date-calc-chips" aria-label="Laufzeit wählen">
          {[12, 24, 36, 48, 60, 72, 84, 96, 120].map((m) => (
            <button key={m} type="button" onClick={() => setMonate(String(m))}>
              {m} Monate
            </button>
          ))}
        </div>
      </div>

      {valid && plan ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Monatliche Rate</span>
              <strong>{eur(rate)}</strong>
              <em>
                {n} Raten · Sollzins {fmtDe(i * 12 * 100, 2)} % p. a.
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Zinskosten</span>
              <strong>{eur(plan.gesamtZinsen)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Gesamtbetrag</span>
              <strong>{eur(plan.gesamtGezahlt)}</strong>
              <em>Kredit + Zinsen</em>
            </div>
          </div>

          <div className="date-calc-input">
            <strong className="date-calc-input-title">Welcher Kredit passt zu meiner Wunschrate?</strong>
            <div className="date-calc-fields">
              <Field label="Wunschrate" suffix="€ im Monat" value={wunschrate} onChange={setWunschrate} />
            </div>
            <p className="zins-ziel-ergebnis">
              {Number.isFinite(moeglich)
                ? `Mit ${eur(parseBetrag(wunschrate))} im Monat können Sie bei ${fmtDe(eff, 2)} % effektiv über ${n} Monate rund ${eur(moeglich)} finanzieren.`
                : "Bitte eine Wunschrate eingeben."}
            </p>
          </div>

          <PlanTabelle plan={plan} betrag={k} />
        </>
      ) : (
        <p className="date-calc-note">Bitte gültige Werte eingeben: Betrag über 0 €, Laufzeit 1 bis 120 Monate, Zins 0 bis 100 %.</p>
      )}
    </div>
  );
}

/* ---------------- Baufinanzierung / Tilgungsrechner ---------------- */

export function Tilgungsrechner() {
  const [darlehen, setDarlehen] = useState("300.000");
  const [sollzins, setSollzins] = useState("3,5");
  const [tilgung, setTilgung] = useState("2");
  const [bindung, setBindung] = useState("10");
  const [sonder, setSonder] = useState("0");

  const k = parseBetrag(darlehen);
  const z = parseDe(sollzins);
  const t = parseDe(tilgung);
  const b = Math.round(parseDe(bindung));
  const s = parseBetrag(sonder || "0");
  const valid = k > 0 && z >= 0 && z <= 20 && t > 0 && t <= 20 && b >= 1 && b <= 40 && s >= 0;
  const rate = valid ? baufiRate(k, z, t) : Number.NaN;
  const plan = valid ? tilgungsplan({ betrag: k, monatszins: z / 100 / 12, rate, sondertilgungProJahr: s }) : null;
  const restschuld = plan ? restschuldNachJahren(plan, b) : Number.NaN;
  const zinsenBindung = plan ? plan.jahre.slice(0, b).reduce((sum, row) => sum + row.zinsen, 0) : Number.NaN;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields is-amounts">
          <Field label="Darlehensbetrag" suffix="€" value={darlehen} onChange={setDarlehen} />
          <Field label="Sollzins" suffix="% p. a." value={sollzins} onChange={setSollzins} />
          <Field label="Anfängliche Tilgung" suffix="%" value={tilgung} onChange={setTilgung} />
          <Field label="Zinsbindung" suffix="Jahre" value={bindung} onChange={setBindung} />
        </div>
        <div className="date-calc-fields">
          <Field label="Sondertilgung pro Jahr" suffix="€" value={sonder} onChange={setSonder} />
        </div>
      </div>

      {valid && plan ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>Monatliche Rate</span>
              <strong>{eur(rate)}</strong>
              <em>
                Effektivzins ohne Nebenkosten {fmtDe(effektivAusSollzins(z), 2)} %
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Restschuld nach {b} Jahren</span>
              <strong>{eur(restschuld)}</strong>
              <em>Ende der Zinsbindung</em>
            </div>
            <div className="date-calc-stat">
              <span>Zinsen in {b} Jahren</span>
              <strong>{eur(zinsenBindung)}</strong>
            </div>
            <div className="date-calc-stat">
              <span>Schuldenfrei nach</span>
              <strong>{plan.laufzeitMonate ? laufzeitText(plan.laufzeitMonate) : "—"}</strong>
              <em>bei gleichem Zins</em>
            </div>
          </div>
          <PlanTabelle plan={plan} betrag={k} markJahr={b} />
        </>
      ) : (
        <p className="date-calc-note">
          Bitte gültige Werte eingeben: Darlehen über 0 €, Sollzins 0 bis 20 %, Tilgung über 0 %, Zinsbindung 1 bis 40 Jahre.
        </p>
      )}
    </div>
  );
}
