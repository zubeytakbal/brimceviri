"use client";

import { useState } from "react";
import { fmtDe, parseDe } from "../../converter/germanMath";
import {
  BN_JAHR,
  bruttoNetto,
  DEFAULT_EINGABE,
  kirchensteuerSatz,
  MIDIJOB_OBERGRENZE,
  MINIJOB_GRENZE,
  nettoJeSteuerklasse,
  parseBetrag,
  type BruttoNettoEingabe,
  type Steuerklasse,
} from "../../converter/germanBruttoNetto";
import {
  GERMAN_STATES,
  type StateCode,
} from "../../converter/time/germanHolidays";

const eur = (n: number) => `${fmtDe(n, 2, 2)}\u00A0€`;
const STKL_TEXT: Record<Steuerklasse, string> = {
  1: "I – ledig",
  2: "II – alleinerziehend",
  3: "III – verheiratet, höheres Einkommen",
  4: "IV – verheiratet, gleiches Einkommen",
  5: "V – verheiratet, geringeres Einkommen",
  6: "VI – Zweitjob",
};
const STATES = [...GERMAN_STATES].sort((a, b) =>
  a.name.localeCompare(b.name, "de"),
);

export default function BruttoNettoRechner({
  initialBrutto = DEFAULT_EINGABE.brutto,
}: {
  initialBrutto?: number;
}) {
  const [zeitraum, setZeitraum] = useState<"monat" | "jahr">("monat");
  const [brutto, setBrutto] = useState(fmtDe(initialBrutto, 2));
  const [stkl, setStkl] = useState<Steuerklasse>(1);
  const [kfb, setKfb] = useState(0);
  const [kirche, setKirche] = useState(false);
  const [land, setLand] = useState<StateCode>(DEFAULT_EINGABE.bundesland);
  const [kinder, setKinder] = useState(0);
  const [unter23, setUnter23] = useState(false);
  const [kv, setKv] = useState<"gesetzlich" | "privat">("gesetzlich");
  const [zusatz, setZusatz] = useState(fmtDe(DEFAULT_EINGABE.zusatzbeitrag, 2));
  const [pkv, setPkv] = useState(fmtDe(DEFAULT_EINGABE.pkvBeitrag, 2));
  const [rvBefreit, setRvBefreit] = useState(true);

  const betrag = parseBetrag(brutto);
  const monat = zeitraum === "jahr" ? betrag / 12 : betrag;
  const valid =
    Number.isFinite(betrag) && betrag > 0 && Number.isFinite(parseDe(zusatz));
  const eingabe: BruttoNettoEingabe = {
    brutto: Math.round(monat * 100) / 100,
    steuerklasse: stkl,
    kinderfreibetraege: stkl >= 5 ? 0 : kfb,
    kirchensteuer: kirche,
    bundesland: land,
    kinder,
    unter23,
    krankenversicherung: kv,
    zusatzbeitrag: parseDe(zusatz) || 0,
    pkvBeitrag: parseBetrag(pkv) || 0,
    minijobRvBefreit: rvBefreit,
  };
  const r = valid ? bruttoNetto(eingabe) : null;
  const vergleich = valid ? nettoJeSteuerklasse(eingabe) : [];
  const zeilen: Array<[string, number, string?]> = r
    ? [
        ["Lohnsteuer", r.lohnsteuer],
        ["Solidaritätszuschlag", r.soli],
        ...(kirche
          ? ([
              [`Kirchensteuer (${kirchensteuerSatz(land)} %)`, r.kirchensteuer],
            ] as Array<[string, number]>)
          : []),
        ...(kv === "gesetzlich"
          ? ([
              ["Krankenversicherung", r.kv, `${fmtDe(r.kvSatzAn, 2)} %`],
              ["Pflegeversicherung", r.pv, `${fmtDe(r.pvSatzAn, 2)} %`],
            ] as Array<[string, number, string]>)
          : ([
              ["Private KV/PV (nach Arbeitgeberzuschuss)", r.pkvNetto],
            ] as Array<[string, number]>)),
        ["Rentenversicherung", r.rv, r.art === "minijob" ? "3,6 %" : "9,3 %"],
        ["Arbeitslosenversicherung", r.av, "1,3 %"],
      ]
    : [];

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {(["monat", "jahr"] as const).map((z) => (
          <button
            key={z}
            type="button"
            role="tab"
            aria-selected={zeitraum === z}
            className={zeitraum === z ? "is-active" : undefined}
            onClick={() => {
              if (z === zeitraum) return;
              const v = parseBetrag(brutto);
              if (Number.isFinite(v))
                setBrutto(fmtDe(z === "jahr" ? v * 12 : v / 12, 2));
              setZeitraum(z);
            }}
          >
            {z === "monat" ? "Monatsgehalt" : "Jahresgehalt"}
          </button>
        ))}
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>
              Bruttogehalt {zeitraum === "monat" ? "pro Monat" : "pro Jahr"} (€)
            </span>
            <input
              inputMode="decimal"
              value={brutto}
              onChange={(event) => setBrutto(event.target.value)}
            />
          </label>
          <label className="date-calc-field">
            <span>Steuerklasse</span>
            <select
              value={stkl}
              onChange={(event) =>
                setStkl(Number(event.target.value) as Steuerklasse)
              }
            >
              {([1, 2, 3, 4, 5, 6] as Steuerklasse[]).map((s) => (
                <option key={s} value={s}>
                  {STKL_TEXT[s]}
                </option>
              ))}
            </select>
          </label>
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
          </label>
          <label className="date-calc-field">
            <span>Kinderfreibeträge</span>
            <select
              value={stkl >= 5 ? 0 : kfb}
              disabled={stkl >= 5}
              onChange={(event) => setKfb(Number(event.target.value))}
            >
              {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6].map((v) => (
                <option key={v} value={v}>
                  {fmtDe(v, 1)}
                </option>
              ))}
            </select>
            <small>
              laut Lohnsteuerbescheinigung; wirkt nur auf Soli und Kirchensteuer
            </small>
          </label>
          <label className="date-calc-field">
            <span>Kinder (Pflegeversicherung)</span>
            <select
              value={kinder}
              onChange={(event) => setKinder(Number(event.target.value))}
            >
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <option key={v} value={v}>
                  {v === 5 ? "5 oder mehr" : v}
                </option>
              ))}
            </select>
            <small>Abschlag ab dem 2. Kind unter 25 Jahren</small>
          </label>
          <label className="date-calc-field">
            <span>Krankenversicherung</span>
            <select
              value={kv}
              onChange={(event) =>
                setKv(event.target.value as "gesetzlich" | "privat")
              }
            >
              <option value="gesetzlich">gesetzlich</option>
              <option value="privat">privat</option>
            </select>
          </label>
          {kv === "gesetzlich" ? (
            <label className="date-calc-field">
              <span>Zusatzbeitrag der Krankenkasse (%)</span>
              <input
                inputMode="decimal"
                value={zusatz}
                onChange={(event) => setZusatz(event.target.value)}
              />
              <small>Durchschnitt {BN_JAHR}: 2,9 %</small>
            </label>
          ) : (
            <label className="date-calc-field">
              <span>PKV-Beitrag pro Monat (€)</span>
              <input
                inputMode="decimal"
                value={pkv}
                onChange={(event) => setPkv(event.target.value)}
              />
              <small>
                inkl. Pflegepflichtversicherung, vor Arbeitgeberzuschuss
              </small>
            </label>
          )}
        </div>
        <div className="date-calc-checks">
          <label>
            <input
              type="checkbox"
              checked={kirche}
              onChange={(event) => setKirche(event.target.checked)}
            />{" "}
            Kirchensteuerpflichtig
          </label>
          {kinder === 0 && (
            <label>
              <input
                type="checkbox"
                checked={unter23}
                onChange={(event) => setUnter23(event.target.checked)}
              />{" "}
              Jünger als 23 Jahre (kein Kinderlosenzuschlag)
            </label>
          )}
          {r?.art === "minijob" && (
            <label>
              <input
                type="checkbox"
                checked={rvBefreit}
                onChange={(event) => setRvBefreit(event.target.checked)}
              />{" "}
              Von der Rentenversicherungspflicht befreit
            </label>
          )}
        </div>
      </div>

      {r ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>
                Nettogehalt {zeitraum === "monat" ? "pro Monat" : "pro Jahr"}
              </span>
              <strong>
                {eur(zeitraum === "monat" ? r.netto : r.netto * 12)}
              </strong>
              <em>
                {zeitraum === "monat"
                  ? `${eur(r.netto * 12)} im Jahr`
                  : `${eur(r.netto)} im Monat`}{" "}
                · {fmtDe((r.netto / r.brutto) * 100, 1)} % vom Brutto
              </em>
            </div>
            <div className="date-calc-stat">
              <span>Steuern</span>
              <strong>
                {eur(zeitraum === "monat" ? r.steuern : r.steuern * 12)}
              </strong>
            </div>
            <div className="date-calc-stat">
              <span>Sozialabgaben</span>
              <strong>
                {eur(
                  zeitraum === "monat" ? r.sozialabgaben : r.sozialabgaben * 12,
                )}
              </strong>
            </div>
            {r.arbeitgeber !== null && (
              <div className="date-calc-stat">
                <span>Kosten für den Arbeitgeber</span>
                <strong>
                  {eur(
                    (r.brutto + r.arbeitgeber) *
                      (zeitraum === "monat" ? 1 : 12),
                  )}
                </strong>
                <em>Brutto plus Arbeitgeberanteile, ohne Umlagen</em>
              </div>
            )}
          </div>
          {r.art === "minijob" && (
            <p className="date-calc-note">
              Minijob bis {fmtDe(MINIJOB_GRENZE)} €: keine Lohnsteuer für Sie
              (der Arbeitgeber zahlt pauschal), keine Kranken-, Pflege- und
              Arbeitslosenversicherung.
            </p>
          )}
          {r.art === "midijob" && (
            <p className="date-calc-note">
              Übergangsbereich (Midijob) {fmtDe(MINIJOB_GRENZE + 0.01, 2)} bis{" "}
              {fmtDe(MIDIJOB_OBERGRENZE)} €: Ihre Sozialabgaben werden aus einer
              reduzierten Bemessungsgrundlage berechnet.
            </p>
          )}
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Abzug</th>
                  <th scope="col">Monat</th>
                  <th scope="col">Jahr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Bruttogehalt</th>
                  <td>{eur(r.brutto)}</td>
                  <td>{eur(r.brutto * 12)}</td>
                </tr>
                {zeilen.map(([label, wert, satz]) => (
                  <tr key={label}>
                    <th scope="row">
                      {label}
                      {satz ? <small> ({satz})</small> : null}
                    </th>
                    <td>− {eur(wert)}</td>
                    <td>− {eur(wert * 12)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">
                    <strong>Nettogehalt</strong>
                  </th>
                  <td>
                    <strong>{eur(r.netto)}</strong>
                  </td>
                  <td>
                    <strong>{eur(r.netto * 12)}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {r.art !== "minijob" && (
            <>
              <p className="date-calc-note">
                Nettogehalt in jeder Steuerklasse bei gleichem Brutto (übrige
                Angaben wie oben):
              </p>
              <div className="holiday-table-wrap">
                <table className="holiday-table">
                  <thead>
                    <tr>
                      <th scope="col">Steuerklasse</th>
                      <th scope="col">Lohnsteuer</th>
                      <th scope="col">Netto / Monat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vergleich.map(({ stkl: s, ergebnis }) => (
                      <tr key={s}>
                        <td>
                          {s === stkl ? (
                            <strong>{STKL_TEXT[s]}</strong>
                          ) : (
                            STKL_TEXT[s]
                          )}
                        </td>
                        <td>{eur(ergebnis.lohnsteuer)}</td>
                        <td>{eur(ergebnis.netto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <p className="date-calc-note">Bitte ein Bruttogehalt eingeben.</p>
      )}
    </div>
  );
}
