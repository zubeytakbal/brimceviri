"use client";

import { useState } from "react";
import { parseBetrag } from "../../converter/germanBruttoNetto";
import { fmtDe, parseDe } from "../../converter/germanMath";
import {
  breakEvenKwh,
  durchschnittspreisCt,
  jahreskosten,
  monatsabschlag,
  zaehlerstand,
  type Tarif,
} from "../../converter/germanStromkosten";

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;
const kwh = (n: number) => `${fmtDe(Math.round(n), 0)} kWh`;

type Modus = "kosten" | "zaehler" | "vergleich";

function Field({
  label,
  value,
  onChange,
  suffix,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  type?: "text" | "date";
}) {
  return (
    <label className="date-calc-field">
      <span>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </span>
      <input type={type} inputMode={type === "text" ? "decimal" : undefined} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function tarifAus(arbeit: string, grund: string): Tarif {
  return { arbeitspreisCt: parseDe(arbeit), grundpreisMonat: parseDe(grund) };
}

export default function Stromkostenrechner() {
  const [modus, setModus] = useState<Modus>("kosten");

  // Ortak alanlar: tüketim ve tarifeler. Varsayılanlar örnek değerdir.
  const [verbrauch, setVerbrauch] = useState("2.500");
  const [arbeit, setArbeit] = useState("30");
  const [grund, setGrund] = useState("12");
  const [arbeitB, setArbeitB] = useState("34");
  const [grundB, setGrundB] = useState("8");
  const [altStand, setAltStand] = useState("12.000");
  const [neuStand, setNeuStand] = useState("12.650");
  const [altDatum, setAltDatum] = useState("2026-01-01");
  const [neuDatum, setNeuDatum] = useState("2026-04-01");

  const tarifA = tarifAus(arbeit, grund);
  const tarifB = tarifAus(arbeitB, grundB);
  const zaehler = zaehlerstand(parseBetrag(altStand), parseBetrag(neuStand), altDatum, neuDatum);
  const jahresverbrauch = modus === "zaehler" ? (zaehler?.hochrechnungJahr ?? Number.NaN) : parseBetrag(verbrauch);
  const kostenA = jahreskosten(jahresverbrauch, tarifA);
  const kostenB = jahreskosten(jahresverbrauch, tarifB);
  const breakEven = breakEvenKwh(tarifA, tarifB);
  const billigerA = kostenA <= kostenB;

  const modes: Array<[Modus, string]> = [
    ["kosten", "Kosten und Abschlag"],
    ["zaehler", "Zählerstand"],
    ["vergleich", "Tarifvergleich"],
  ];

  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist" aria-label="Berechnung">
        {modes.map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={modus === value}
            className={modus === value ? "is-active" : undefined}
            onClick={() => setModus(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="date-calc-input">
        {modus === "zaehler" ? (
          <div className="date-calc-fields is-amounts">
            <Field label="Alter Zählerstand" suffix="kWh" value={altStand} onChange={setAltStand} />
            <Field label="Abgelesen am" type="date" value={altDatum} onChange={setAltDatum} />
            <Field label="Neuer Zählerstand" suffix="kWh" value={neuStand} onChange={setNeuStand} />
            <Field label="Abgelesen am" type="date" value={neuDatum} onChange={setNeuDatum} />
          </div>
        ) : (
          <div className="date-calc-fields">
            <Field label="Jahresverbrauch" suffix="kWh" value={verbrauch} onChange={setVerbrauch} />
          </div>
        )}
        <strong className="date-calc-input-title">{modus === "vergleich" ? "Tarif A (aktuell)" : "Ihr Tarif"}</strong>
        <div className="date-calc-fields">
          <Field label="Arbeitspreis" suffix="ct/kWh" value={arbeit} onChange={setArbeit} />
          <Field label="Grundpreis" suffix="€/Monat" value={grund} onChange={setGrund} />
        </div>
        {modus === "vergleich" && (
          <>
            <strong className="date-calc-input-title">Tarif B (Angebot)</strong>
            <div className="date-calc-fields">
              <Field label="Arbeitspreis" suffix="ct/kWh" value={arbeitB} onChange={setArbeitB} />
              <Field label="Grundpreis" suffix="€/Monat" value={grundB} onChange={setGrundB} />
            </div>
          </>
        )}
        <p className="zins-ziel-ergebnis">Voreingestellt sind Beispielwerte – tragen Sie die Preise von Ihrer Stromrechnung oder dem Angebot ein.</p>
      </div>

      {modus === "zaehler" && !zaehler ? (
        <p className="date-calc-note">Bitte zwei Ablesungen eingeben: der neue Zählerstand muss höher sein und mindestens einen Tag später abgelesen.</p>
      ) : !Number.isFinite(kostenA) ? (
        <p className="date-calc-note">Bitte gültige Werte eingeben: Verbrauch ab 0 kWh, Preise ab 0.</p>
      ) : modus === "vergleich" ? (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{billigerA ? "Tarif A ist günstiger" : "Tarif B ist günstiger"}</span>
            <strong>{eur(Math.abs(kostenA - kostenB))} im Jahr</strong>
            <em>bei {kwh(jahresverbrauch)} Jahresverbrauch</em>
          </div>
          <div className="date-calc-stat">
            <span>Tarif A</span>
            <strong>{eur(kostenA)}</strong>
            <em>Abschlag {eur(kostenA / 12)}</em>
          </div>
          <div className="date-calc-stat">
            <span>Tarif B</span>
            <strong>{Number.isFinite(kostenB) ? eur(kostenB) : "—"}</strong>
            <em>Abschlag {Number.isFinite(kostenB) ? eur(kostenB / 12) : "—"}</em>
          </div>
          <div className="date-calc-stat">
            <span>Gleich teuer bei</span>
            <strong>{Number.isFinite(breakEven) ? kwh(breakEven) : "—"}</strong>
            <em>
              {Number.isFinite(breakEven)
                ? `darüber lohnt sich der Tarif mit dem niedrigeren Arbeitspreis`
                : "ein Tarif ist bei jedem Verbrauch günstiger"}
            </em>
          </div>
        </div>
      ) : (
        <div className="date-calc-results">
          <div className="date-calc-stat is-main">
            <span>{modus === "zaehler" ? "Hochgerechnete Jahreskosten" : "Stromkosten im Jahr"}</span>
            <strong>{eur(kostenA)}</strong>
            <em>monatlicher Abschlag {eur(monatsabschlag(jahresverbrauch, tarifA))}</em>
          </div>
          {modus === "zaehler" && zaehler && (
            <>
              <div className="date-calc-stat">
                <span>Verbrauch</span>
                <strong>{kwh(zaehler.verbrauch)}</strong>
                <em>in {zaehler.tage} Tagen, {fmtDe(zaehler.proTag, 1)} kWh pro Tag</em>
              </div>
              <div className="date-calc-stat">
                <span>Hochrechnung aufs Jahr</span>
                <strong>{kwh(zaehler.hochrechnungJahr)}</strong>
                <em>365 Tage, ohne Jahreszeiten</em>
              </div>
            </>
          )}
          <div className="date-calc-stat">
            <span>Arbeitspreis-Anteil</span>
            <strong>{eur((jahresverbrauch * tarifA.arbeitspreisCt) / 100)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Grundpreis im Jahr</span>
            <strong>{eur(12 * tarifA.grundpreisMonat)}</strong>
          </div>
          <div className="date-calc-stat">
            <span>Effektiv pro kWh</span>
            <strong>{fmtDe(durchschnittspreisCt(jahresverbrauch, tarifA), 2)} ct</strong>
            <em>inklusive Grundpreis</em>
          </div>
        </div>
      )}
    </div>
  );
}
