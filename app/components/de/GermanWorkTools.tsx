"use client";

import { useState } from "react";
import { fmtDe, parseDe } from "../../converter/germanMath";
import {
  ARBEITNEHMER_PAUSCHBETRAG,
  mindesturlaub,
  pendlerpauschale,
  rundenBUrlG,
  schwerbehindertenZusatz,
  teilurlaub,
  urlaubUmrechnen,
  type Steuerjahr,
} from "../../converter/germanWork";

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <label className="date-calc-field">
      <span>{label}</span>
      <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

/* ---------------- Pendlerpauschale ---------------- */

export function PendlerpauschaleRechner() {
  const [jahr, setJahr] = useState<Steuerjahr>(2026);
  const [km, setKm] = useState("25");
  const [tage, setTage] = useState("220");
  const [auto, setAuto] = useState(true);
  const [ho, setHo] = useState("0");
  const [sonstige, setSonstige] = useState("0");
  const [satz, setSatz] = useState("30");

  const r = pendlerpauschale({
    km: parseDe(km),
    tage: parseDe(tage),
    jahr,
    auto,
    homeofficeTage: parseDe(ho) || 0,
    sonstige: parseDe(sonstige) || 0,
    grenzsteuersatz: parseDe(satz) || 0,
  });
  const valid = Number.isFinite(parseDe(km)) && Number.isFinite(parseDe(tage));

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        {([2026, 2025] as const).map((y) => (
          <button key={y} type="button" role="tab" aria-selected={jahr === y} className={jahr === y ? "is-active" : undefined} onClick={() => setJahr(y)}>
            Steuerjahr {y}
          </button>
        ))}
      </div>
      <p className="date-calc-note">
        {jahr === 2026 ? "2026: 0,38 € je Kilometer ab dem ersten Kilometer." : "2025: 0,30 € für die ersten 20 km, 0,38 € ab dem 21. Kilometer."}
      </p>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Einfache Entfernung (km)" value={km} onChange={setKm} hint="kürzeste Straßenverbindung, nur volle km" />
          <Field label="Tage im Büro" value={tage} onChange={setTage} hint="Fahrten zur ersten Tätigkeitsstätte" />
          <Field label="Homeoffice-Tage" value={ho} onChange={setHo} hint="6 € pro Tag, höchstens 210 Tage" />
          <Field label="Weitere Werbungskosten (€)" value={sonstige} onChange={setSonstige} hint="z. B. Arbeitsmittel, Fortbildung" />
          <Field label="Grenzsteuersatz (%)" value={satz} onChange={setSatz} hint="Schätzung für die Ersparnis" />
        </div>
        <div className="date-calc-checks">
          <label>
            <input type="checkbox" checked={auto} onChange={(event) => setAuto(event.target.checked)} /> Mit eigenem Auto oder Dienstwagen (keine
            Obergrenze)
          </label>
        </div>
      </div>
      {valid ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>Entfernungspauschale {jahr}</span>
            <strong>{eur(r.entfernung)}</strong>
            <em>{r.gedeckelt ? "auf 4.500 € begrenzt (ohne Auto)" : `${fmtDe(Math.floor(parseDe(km)))} km × ${fmtDe(Math.floor(parseDe(tage)))} Tage`}</em>
          </div>
          <div className="date-calc-stat">
            <span>Homeoffice-Pauschale</span>
            <strong>{eur(r.homeoffice)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Werbungskosten gesamt</span>
            <strong>{eur(r.werbungskosten)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Über dem Pauschbetrag ({fmtDe(ARBEITNEHMER_PAUSCHBETRAG)} €)</span>
            <strong>{eur(r.ueberPauschbetrag)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Geschätzte Steuerersparnis</span>
            <strong>{eur(r.ersparnis)}</strong>
            <em>ohne Solidaritätszuschlag und Kirchensteuer</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Bitte Entfernung und Arbeitstage eingeben.</p>
      )}
    </div>
  );
}

/* ---------------- Urlaubsanspruch ---------------- */

export function UrlaubsRechner() {
  const [mode, setMode] = useState<"teilzeit" | "anteilig">("teilzeit");
  const [urlaub, setUrlaub] = useState("30");
  const [basis, setBasis] = useState("5");
  const [eigene, setEigene] = useState("3");
  const [monate, setMonate] = useState("7");
  const [sb, setSb] = useState(false);

  const u = parseDe(urlaub);
  const b = parseDe(basis);
  const e = parseDe(eigene);
  const m = parseDe(monate);
  const tageOk = e > 0 && e <= 6 && b > 0 && b <= 6;

  const umgerechnet = urlaubUmrechnen(u, b, e);
  const zusatz = sb ? schwerbehindertenZusatz(e) : 0;
  const jahres = umgerechnet + zusatz;
  const anteil = teilurlaub(jahres, m);

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "teilzeit"} className={mode === "teilzeit" ? "is-active" : undefined} onClick={() => setMode("teilzeit")}>
          Teilzeit / Arbeitstage
        </button>
        <button type="button" role="tab" aria-selected={mode === "anteilig"} className={mode === "anteilig" ? "is-active" : undefined} onClick={() => setMode("anteilig")}>
          Ein- oder Austritt
        </button>
      </div>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Urlaubstage laut Vertrag" value={urlaub} onChange={setUrlaub} hint="bei Vollzeit" />
          <Field label="Arbeitstage pro Woche (Vollzeit)" value={basis} onChange={setBasis} />
          <Field label="Ihre Arbeitstage pro Woche" value={eigene} onChange={setEigene} />
          {mode === "anteilig" && <Field label="Volle Beschäftigungsmonate im Jahr" value={monate} onChange={setMonate} hint="1 bis 12" />}
        </div>
        <div className="date-calc-checks">
          <label>
            <input type="checkbox" checked={sb} onChange={(event) => setSb(event.target.checked)} /> Schwerbehinderung (Zusatzurlaub nach § 208 SGB IX)
          </label>
        </div>
      </div>
      {Number.isFinite(umgerechnet) && tageOk && u >= 0 ? (
        <div className="date-calc-results">
          {mode === "teilzeit" ? (
            <div className="date-calc-stat is-main">
              <span>Ihr Jahresurlaub</span>
              <strong>{fmtDe(rundenBUrlG(jahres), 2)} Tage</strong>
              <em>
                {fmtDe(u)} × {fmtDe(e)} ÷ {fmtDe(b)} = {fmtDe(umgerechnet, 2)}
                {sb ? ` + ${fmtDe(zusatz)} Zusatzurlaub` : ""}
              </em>
            </div>
          ) : Number.isFinite(m) && m >= 0 && m <= 12 ? (
            <div className="date-calc-stat is-main">
              <span>Anteiliger Urlaub</span>
              <strong>{fmtDe(rundenBUrlG(anteil), 2)} Tage</strong>
              <em>
                {fmtDe(jahres, 2)} ÷ 12 × {fmtDe(Math.floor(m))} = {fmtDe(anteil, 2)}
              </em>
            </div>
          ) : (
            <p className="date-calc-note">Bitte 0 bis 12 volle Monate eingeben.</p>
          )}
          <div className="date-calc-stat">
            <span>Gesetzlicher Mindesturlaub</span>
            <strong>{fmtDe(mindesturlaub(e), 2)} Tage</strong>
            <em>vier Wochen bei {fmtDe(e)} Arbeitstagen</em>
          </div>
        </div>
      ) : (
        <p className="date-calc-note">Bitte Urlaubstage und 1 bis 6 Arbeitstage pro Woche eingeben.</p>
      )}
    </div>
  );
}
