"use client";

import { useMemo, useState } from "react";
import {
  abiturNote,
  dreisatzAntiproportional,
  dreisatzProportional,
  fmtDe,
  grundwert,
  ihkNote,
  mitProzent,
  NOTEN_NAMEN,
  notenDurchschnitt,
  notenName,
  parseDe,
  prozentsatz,
  prozentwert,
  punkteZuNote,
  veraenderung,
  vorProzent,
} from "../../converter/germanMath";

function Field({ label, value, onChange, suffix }: { label: string; value: string; onChange: (v: string) => void; suffix?: string }) {
  return (
    <label className="date-calc-field">
      <span>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </span>
      <input inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Result({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="date-calc-results">
      <div className="date-calc-stat is-main">
        <span>{label}</span>
        <strong>{value}</strong>
        {detail ? <em>{detail}</em> : null}
      </div>
    </div>
  );
}

/* ---------------- Prozentrechner ---------------- */

type Card = {
  id: string;
  title: string;
  a: { label: string; suffix?: string; initial: string };
  b: { label: string; suffix?: string; initial: string };
  compute: (a: number, b: number) => { label: string; value: string; detail: string } | null;
};

const PROZENT_CARDS: Card[] = [
  {
    id: "prozentwert",
    title: "Wie viel sind p % von G?",
    a: { label: "Prozentsatz", suffix: "%", initial: "15" },
    b: { label: "Grundwert", initial: "80" },
    compute: (p, g) => {
      const w = prozentwert(p, g);
      return Number.isFinite(w) ? { label: "Prozentwert", value: fmtDe(w), detail: `${fmtDe(g)} × ${fmtDe(p)} ÷ 100 = ${fmtDe(w)}` } : null;
    },
  },
  {
    id: "prozentsatz",
    title: "W ist wie viel Prozent von G?",
    a: { label: "Prozentwert", initial: "12" },
    b: { label: "Grundwert", initial: "80" },
    compute: (w, g) => {
      const p = prozentsatz(w, g);
      return Number.isFinite(p) ? { label: "Prozentsatz", value: `${fmtDe(p)} %`, detail: `${fmtDe(w)} ÷ ${fmtDe(g)} × 100 = ${fmtDe(p)} %` } : null;
    },
  },
  {
    id: "grundwert",
    title: "W sind p % von welchem Grundwert?",
    a: { label: "Prozentwert", initial: "12" },
    b: { label: "Prozentsatz", suffix: "%", initial: "15" },
    compute: (w, p) => {
      const g = grundwert(w, p);
      return Number.isFinite(g) ? { label: "Grundwert", value: fmtDe(g), detail: `${fmtDe(w)} ÷ ${fmtDe(p)} × 100 = ${fmtDe(g)}` } : null;
    },
  },
  {
    id: "veraenderung",
    title: "Prozentuale Veränderung von A auf B",
    a: { label: "Alter Wert (A)", initial: "1200" },
    b: { label: "Neuer Wert (B)", initial: "1500" },
    compute: (a, b) => {
      const p = veraenderung(a, b);
      if (!Number.isFinite(p)) return null;
      const sign = p > 0 ? "+" : "";
      return { label: p >= 0 ? "Zunahme" : "Abnahme", value: `${sign}${fmtDe(p)} %`, detail: `(${fmtDe(b)} − ${fmtDe(a)}) ÷ ${fmtDe(Math.abs(a))} × 100` };
    },
  },
  {
    id: "aufschlag",
    title: "Wert plus oder minus p % (Aufschlag, Rabatt)",
    a: { label: "Ausgangswert", initial: "49,90" },
    b: { label: "Prozent (Rabatt mit Minus)", suffix: "%", initial: "-20" },
    compute: (g, p) => {
      const e = mitProzent(g, p);
      return Number.isFinite(e) ? { label: "Neuer Wert", value: fmtDe(e, 2, 2), detail: `${fmtDe(g)} × ${fmtDe(1 + p / 100)} · Differenz ${fmtDe(e - g, 2, 2)}` } : null;
    },
  },
  {
    id: "rueckwaerts",
    title: "Ursprungswert vor einer Änderung um p %",
    a: { label: "Wert nach der Änderung", initial: "39,92" },
    b: { label: "Änderung (Rabatt mit Minus)", suffix: "%", initial: "-20" },
    compute: (e, p) => {
      const g = vorProzent(e, p);
      return Number.isFinite(g) ? { label: "Ursprungswert", value: fmtDe(g, 2, 2), detail: `${fmtDe(e)} ÷ ${fmtDe(1 + p / 100)} = ${fmtDe(g, 2, 2)}` } : null;
    },
  },
];

function ProzentCard({ card }: { card: Card }) {
  const [a, setA] = useState(card.a.initial);
  const [b, setB] = useState(card.b.initial);
  const result = useMemo(() => {
    const x = parseDe(a);
    const y = parseDe(b);
    return Number.isFinite(x) && Number.isFinite(y) ? card.compute(x, y) : null;
  }, [a, b, card]);
  return (
    <section className="date-calc-input" aria-labelledby={`pr-${card.id}`}>
      <h3 id={`pr-${card.id}`}>{card.title}</h3>
      <div className="date-calc-fields">
        <Field label={card.a.label} suffix={card.a.suffix} value={a} onChange={setA} />
        <Field label={card.b.label} suffix={card.b.suffix} value={b} onChange={setB} />
      </div>
      {result ? <Result {...result} /> : <p className="date-calc-note">Bitte zwei gültige Zahlen eingeben (Grundwert nicht 0).</p>}
    </section>
  );
}

export function Prozentrechner() {
  return (
    <div className="date-calc">
      {PROZENT_CARDS.map((card) => (
        <ProzentCard key={card.id} card={card} />
      ))}
    </div>
  );
}

/* ---------------- Dreisatz ---------------- */

export function DreisatzRechner() {
  const [mode, setMode] = useState<"pro" | "anti">("pro");
  const [a, setA] = useState("3");
  const [b, setB] = useState("7,50");
  const [c, setC] = useState("5");
  const [unitA, setUnitA] = useState("Stück");
  const [unitB, setUnitB] = useState("€");

  const switchMode = (m: "pro" | "anti") => {
    setMode(m);
    if (m === "pro") {
      setA("3");
      setB("7,50");
      setC("5");
      setUnitA("Stück");
      setUnitB("€");
    } else {
      setA("4");
      setB("6");
      setC("3");
      setUnitA("Arbeiter");
      setUnitB("Tage");
    }
  };

  const x = parseDe(a);
  const y = parseDe(b);
  const z = parseDe(c);
  const valid = [x, y, z].every(Number.isFinite);
  const result = valid ? (mode === "pro" ? dreisatzProportional(x, y, z) : dreisatzAntiproportional(x, y, z)) : Number.NaN;
  const one = mode === "pro" ? y / x : x * y;

  return (
    <div className="date-calc">
      <div className="date-converter-modes" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "pro"} className={mode === "pro" ? "is-active" : undefined} onClick={() => switchMode("pro")}>
          Proportional
        </button>
        <button type="button" role="tab" aria-selected={mode === "anti"} className={mode === "anti" ? "is-active" : undefined} onClick={() => switchMode("anti")}>
          Antiproportional
        </button>
      </div>
      <p className="date-calc-note">
        {mode === "pro"
          ? "Je mehr, desto mehr: doppelte Menge, doppelter Preis."
          : "Je mehr, desto weniger: doppelt so viele Arbeiter brauchen halb so lange."}
      </p>
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Menge A" value={a} onChange={setA} />
          <label className="date-calc-field">
            <span>Einheit A</span>
            <input value={unitA} onChange={(event) => setUnitA(event.target.value)} />
          </label>
          <Field label="entspricht B" value={b} onChange={setB} />
          <label className="date-calc-field">
            <span>Einheit B</span>
            <input value={unitB} onChange={(event) => setUnitB(event.target.value)} />
          </label>
          <Field label="Gesucht für Menge C" value={c} onChange={setC} />
        </div>
      </div>
      {Number.isFinite(result) ? (
        <>
          <Result
            label={`${fmtDe(z)} ${unitA} entsprechen`}
            value={`${fmtDe(result)} ${unitB}`}
            detail={mode === "pro" ? `${fmtDe(y)} ÷ ${fmtDe(x)} × ${fmtDe(z)}` : `${fmtDe(x)} × ${fmtDe(y)} ÷ ${fmtDe(z)}`}
          />
          <ol className="date-calc-note">
            <li>
              {fmtDe(x)} {unitA} → {fmtDe(y)} {unitB}
            </li>
            <li>
              1 {unitA} → {fmtDe(one)} {unitB} ({mode === "pro" ? `÷ ${fmtDe(x)}` : `× ${fmtDe(x)}`})
            </li>
            <li>
              {fmtDe(z)} {unitA} → {fmtDe(result)} {unitB} ({mode === "pro" ? `× ${fmtDe(z)}` : `÷ ${fmtDe(z)}`})
            </li>
          </ol>
        </>
      ) : (
        <p className="date-calc-note">Bitte drei gültige Zahlen eingeben (A und C nicht 0).</p>
      )}
    </div>
  );
}

/* ---------------- Notenrechner ---------------- */

type Row = { note: string; gewicht: string };

export function Notenrechner() {
  const [mode, setMode] = useState<"schnitt" | "ihk" | "punkte" | "abi">("schnitt");
  const [rows, setRows] = useState<Row[]>([
    { note: "2", gewicht: "1" },
    { note: "3", gewicht: "1" },
    { note: "1,5", gewicht: "2" },
    { note: "", gewicht: "1" },
  ]);
  const [punkte, setPunkte] = useState("78");
  const [maxPunkte, setMaxPunkte] = useState("100");
  const [oberstufe, setOberstufe] = useState("11");
  const [abi, setAbi] = useState("650");

  const schnitt = notenDurchschnitt(rows.map((r) => ({ note: parseDe(r.note), gewicht: parseDe(r.gewicht) })));
  const ihk = ihkNote(parseDe(punkte), parseDe(maxPunkte));
  const ober = punkteZuNote(Number(oberstufe));
  const abiNote = abiturNote(Number(abi));

  const update = (i: number, key: keyof Row, value: string) => setRows((prev) => prev.map((r, j) => (j === i ? { ...r, [key]: value } : r)));

  const modes = [
    { id: "schnitt", label: "Durchschnitt" },
    { id: "ihk", label: "Punkte in Note (IHK)" },
    { id: "punkte", label: "Oberstufe 0–15" },
    { id: "abi", label: "Abi-Schnitt" },
  ] as const;

  return (
    <div className="date-calc">
      <div className="date-converter-modes" role="tablist">
        {modes.map((m) => (
          <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} className={mode === m.id ? "is-active" : undefined} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === "schnitt" && (
        <>
          <div className="date-calc-input">
            {rows.map((r, i) => (
              <div className="date-calc-fields" key={i}>
                <Field label={`Note ${i + 1}`} value={r.note} onChange={(v) => update(i, "note", v)} />
                <Field label="Gewichtung" value={r.gewicht} onChange={(v) => update(i, "gewicht", v)} />
              </div>
            ))}
            <div className="time-tool-actions">
              <button type="button" className="time-tool-button is-secondary" onClick={() => setRows((prev) => [...prev, { note: "", gewicht: "1" }])}>
                Weitere Note
              </button>
              {rows.length > 1 && (
                <button type="button" className="time-tool-button is-secondary" onClick={() => setRows((prev) => prev.slice(0, -1))}>
                  Letzte entfernen
                </button>
              )}
            </div>
          </div>
          {Number.isFinite(schnitt) ? (
            <Result label="Notendurchschnitt" value={fmtDe(schnitt, 2, 2)} detail={`entspricht „${notenName(schnitt)}“ (gerundet ${Math.round(schnitt)})`} />
          ) : (
            <p className="date-calc-note">Bitte mindestens eine Note zwischen 1 und 6 eingeben.</p>
          )}
        </>
      )}

      {mode === "ihk" && (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <Field label="Erreichte Punkte" value={punkte} onChange={setPunkte} />
              <Field label="Maximale Punkte" value={maxPunkte} onChange={setMaxPunkte} />
            </div>
          </div>
          {ihk ? (
            <Result
              label="Note nach IHK-Schlüssel"
              value={`${ihk.note} – ${NOTEN_NAMEN[ihk.note - 1]}`}
              detail={`${ihk.hundert} von 100 Punkten · ${ihk.hundert >= 50 ? "bestanden (ab 50 Punkten)" : "nicht bestanden (unter 50 Punkten)"}`}
            />
          ) : (
            <p className="date-calc-note">Bitte Punkte zwischen 0 und der Höchstpunktzahl eingeben.</p>
          )}
        </>
      )}

      {mode === "punkte" && (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <Field label="Punkte (0 bis 15)" value={oberstufe} onChange={setOberstufe} />
            </div>
          </div>
          {ober ? (
            <Result label="Note" value={ober} detail={`„${NOTEN_NAMEN[Number(ober[0]) - 1]}“`} />
          ) : (
            <p className="date-calc-note">Bitte eine ganze Zahl von 0 bis 15 eingeben.</p>
          )}
        </>
      )}

      {mode === "abi" && (
        <>
          <div className="date-calc-input">
            <div className="date-calc-fields">
              <Field label="Gesamtpunktzahl (300 bis 900)" value={abi} onChange={setAbi} />
            </div>
          </div>
          {abiNote !== null ? (
            <Result label="Abiturnote" value={abiNote.toFixed(1).replace(".", ",")} detail="N = 17/3 − E/180, auf eine Nachkommastelle abgeschnitten" />
          ) : (
            <p className="date-calc-note">Bitte eine ganze Punktzahl von 300 bis 900 eingeben (unter 300 ist das Abitur nicht bestanden).</p>
          )}
        </>
      )}
    </div>
  );
}
