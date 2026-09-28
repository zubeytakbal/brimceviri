"use client";

import { useMemo, useState } from "react";
import { parseDe } from "../../converter/germanMath";
import {
  ausRoemisch,
  bigDe,
  bruchRechnen,
  bruchText,
  euklidSchritte,
  fakultaet,
  fmtDe,
  ggT,
  inRoemisch,
  kgV,
  nUeberK,
  parseBruch,
  parseZahlenliste,
  primfaktoren,
  primfaktorText,
  quadratisch,
  statistik,
  teiler,
  teilerAnzahl,
  wurzelVereinfachen,
  type BruchOp,
} from "../../converter/germanSchoolMath";

function Field({ label, value, onChange, mode = "decimal", wide }: { label: string; value: string; onChange: (v: string) => void; mode?: "decimal" | "numeric" | "text"; wide?: boolean }) {
  return (
    <label className="date-calc-field" style={wide ? { gridColumn: "1 / -1" } : undefined}>
      <span>{label}</span>
      <input inputMode={mode} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Main({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="date-calc-stat is-main">
      <span>{label}</span>
      <strong>{value}</strong>
      {detail ? <em>{detail}</em> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="date-calc-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Steps({ title = "Rechenweg", steps }: { title?: string; steps: string[] }) {
  if (!steps.length) return null;
  return (
    <div className="date-calc-input">
      <strong>{title}</strong>
      <ol className="date-calc-note">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

const Note = ({ children }: { children: React.ReactNode }) => <p className="date-calc-note">{children}</p>;

const int = (raw: string) => {
  const v = parseDe(raw);
  return Number.isInteger(v) ? v : Number.NaN;
};

/* ---------------- Bruchrechner ---------------- */

export function BruchRechner() {
  const [a, setA] = useState("1/4");
  const [b, setB] = useState("1/6");
  const [op, setOp] = useState<BruchOp>("+");
  const result = useMemo(() => {
    const x = parseBruch(a);
    const y = parseBruch(b);
    return x && y ? bruchRechnen(x, op, y) : null;
  }, [a, b, op]);
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Erster Bruch" value={a} onChange={setA} mode="text" />
          <Field label="Zweiter Bruch" value={b} onChange={setB} mode="text" />
        </div>
        <div className="date-converter-modes is-light" role="radiogroup" aria-label="Rechenart">
          {(["+", "−", "·", ":"] as BruchOp[]).map((o) => (
            <button key={o} type="button" role="radio" aria-checked={op === o} className={op === o ? "is-active" : undefined} onClick={() => setOp(o)}>
              {o}
            </button>
          ))}
        </div>
        <Note>Eingabe als 3/4, gemischte Zahl 1 1/2, ganze Zahl oder Dezimalzahl (0,75).</Note>
      </div>
      {result ? (
        <>
          <div className="date-calc-results">
            <Main label="Ergebnis" value={bruchText(result.ergebnis)} detail={result.gemischt ? `gemischte Zahl: ${result.gemischt}` : undefined} />
            <Stat label="Dezimalzahl" value={fmtDe(result.dezimal, 6)} />
          </div>
          <Steps steps={result.steps} />
        </>
      ) : (
        <Note>Bitte zwei gültige Brüche eingeben (Nenner nicht 0; bei „:“ darf der zweite Bruch nicht 0 sein).</Note>
      )}
    </div>
  );
}

/* ---------------- ggT und kgV ---------------- */

export function GgtKgvRechner() {
  const [raw, setRaw] = useState("84; 36");
  const zahlen = useMemo(() => parseZahlenliste(raw).filter((v) => Number.isInteger(v) && v !== 0).map(Math.abs), [raw]);
  const ok = zahlen.length >= 2 && zahlen.every((v) => v <= 1e12);
  const g = ok ? zahlen.reduce(ggT) : 0;
  const k = ok ? zahlen.reduce(kgV) : 0;
  const euklid = ok && zahlen.length === 2 ? euklidSchritte(zahlen[0], zahlen[1]) : [];
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Zahlen (mit Semikolon oder Leerzeichen getrennt)" value={raw} onChange={setRaw} mode="text" wide />
        </div>
      </div>
      {ok ? (
        <>
          <div className="date-calc-results">
            <Main label="ggT (größter gemeinsamer Teiler)" value={fmtDe(g)} />
            <Main label="kgV (kleinstes gemeinsames Vielfaches)" value={fmtDe(k)} />
          </div>
          <div className="date-calc-input">
            <strong>Über die Primfaktorzerlegung</strong>
            <ul className="date-calc-note">
              {zahlen.map((z, i) => (
                <li key={i}>
                  {fmtDe(z)} = {primfaktorText(primfaktoren(z)) || "1"}
                </li>
              ))}
            </ul>
            <p className="date-calc-note">
              ggT: gemeinsame Primfaktoren mit dem kleinsten Exponenten; kgV: alle Primfaktoren mit dem größten Exponenten.
            </p>
          </div>
          {euklid.length > 0 && (
            <Steps
              title="Euklidischer Algorithmus"
              steps={[...euklid.map((s) => `${fmtDe(s.a)} = ${fmtDe(s.q)} · ${fmtDe(s.b)} + ${fmtDe(s.r)}`), `Der letzte Rest ungleich 0 ist der ggT: ${fmtDe(g)}. kgV = ${fmtDe(zahlen[0])} · ${fmtDe(zahlen[1])} : ${fmtDe(g)} = ${fmtDe(k)}.`]}
            />
          )}
        </>
      ) : (
        <Note>Bitte mindestens zwei ganze Zahlen ungleich 0 eingeben.</Note>
      )}
    </div>
  );
}

/* ---------------- Primfaktorzerlegung ---------------- */

export function PrimfaktorRechner() {
  const [raw, setRaw] = useState("360");
  const n = int(raw);
  const ok = Number.isInteger(n) && n >= 2 && n <= 1e12;
  const f = ok ? primfaktoren(n) : [];
  const steps: string[] = [];
  if (ok) {
    let rest = n;
    for (const [p, e] of f) for (let i = 0; i < e; i++) {
      steps.push(`${fmtDe(rest)} : ${fmtDe(p)} = ${fmtDe(rest / p)}`);
      rest /= p;
    }
  }
  const prim = f.length === 1 && f[0][1] === 1;
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Natürliche Zahl (ab 2)" value={raw} onChange={setRaw} mode="numeric" />
        </div>
      </div>
      {ok ? (
        <>
          <div className="date-calc-results">
            <Main label="Primfaktorzerlegung" value={`${fmtDe(n)} = ${primfaktorText(f)}`} detail={prim ? `${fmtDe(n)} ist eine Primzahl.` : undefined} />
            <Stat label="Anzahl der Teiler" value={fmtDe(teilerAnzahl(f))} />
            {n <= 1e7 && <Stat label="Teiler" value={teiler(n).map((d) => fmtDe(d)).join(", ")} />}
          </div>
          {!prim && <Steps steps={steps} />}
        </>
      ) : (
        <Note>Bitte eine ganze Zahl von 2 bis 1 Billion eingeben.</Note>
      )}
    </div>
  );
}

/* ---------------- Wurzelrechner ---------------- */

export function WurzelRechner() {
  const [raw, setRaw] = useState("72");
  const [kRaw, setKRaw] = useState("2");
  const x = parseDe(raw);
  const k = int(kRaw);
  const okK = Number.isInteger(k) && k >= 2 && k <= 20;
  const ungerade = k % 2 === 1;
  const ok = okK && Number.isFinite(x) && (x >= 0 || ungerade);
  const wert = ok ? Math.sign(x) * Math.abs(x) ** (1 / k) : NaN;
  const vereinfacht = ok && Number.isInteger(x) && x >= 0 ? wurzelVereinfachen(x, k) : null;
  const zeichen = k === 2 ? "√" : k === 3 ? "∛" : `${k}√`;
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Radikand (Zahl unter der Wurzel)" value={raw} onChange={setRaw} />
          <Field label="Wurzelexponent (2 = Quadratwurzel)" value={kRaw} onChange={setKRaw} mode="numeric" />
        </div>
      </div>
      {ok ? (
        <>
          <div className="date-calc-results">
            <Main label={`${zeichen}${fmtDe(x)}`} value={fmtDe(wert, 8)} detail={`Probe: ${fmtDe(wert, 8)}${k === 2 ? "²" : k === 3 ? "³" : `^${k}`} ≈ ${fmtDe(wert ** k, 6)}`} />
            {vereinfacht && vereinfacht.innen !== 1 && vereinfacht.aussen !== 1 && (
              <Stat label="Teilweise radiziert" value={`${zeichen}${fmtDe(x)} = ${vereinfacht.aussen}${zeichen}${vereinfacht.innen}`} />
            )}
            {vereinfacht && vereinfacht.innen === 1 && <Stat label="Exakt" value={`${fmtDe(x)} ist eine ${k === 2 ? "Quadratzahl" : k === 3 ? "Kubikzahl" : "Potenz"}`} />}
          </div>
          {vereinfacht && vereinfacht.innen !== 1 && vereinfacht.aussen !== 1 && (
            <Steps
              steps={[
                `Primfaktorzerlegung: ${fmtDe(x)} = ${primfaktorText(primfaktoren(x))}`,
                `Je ${k} gleiche Faktoren wandern vor die Wurzel: ${vereinfacht.aussen}`,
                `Übrig unter der Wurzel bleibt ${vereinfacht.innen}: ${zeichen}${fmtDe(x)} = ${vereinfacht.aussen}${zeichen}${vereinfacht.innen}`,
              ]}
            />
          )}
        </>
      ) : (
        <Note>Bitte eine Zahl eingeben; bei geraden Wurzelexponenten darf sie nicht negativ sein.</Note>
      )}
    </div>
  );
}

/* ---------------- Quadratische Gleichungen ---------------- */

export function QuadratischeGleichung() {
  const [mode, setMode] = useState<"abc" | "pq">("pq");
  const [a, setA] = useState("1");
  const [b, setB] = useState("-5");
  const [c, setC] = useState("6");
  const [p, setP] = useState("-5");
  const [q, setQ] = useState("6");
  const A = mode === "pq" ? 1 : parseDe(a);
  const B = parseDe(mode === "pq" ? p : b);
  const C = parseDe(mode === "pq" ? q : c);
  const r = quadratisch(A, B, C);
  const f = (v: number) => fmtDe(v, 6);
  const steps: string[] = [];
  if (r) {
    if (mode === "pq") {
      steps.push(`x² + px + q = 0 mit p = ${f(B)}, q = ${f(C)}`);
      steps.push(`x₁,₂ = −p/2 ± √((p/2)² − q) = ${f(-B / 2)} ± √(${f((B / 2) ** 2)} − ${f(C)})`);
      steps.push(`Unter der Wurzel (Diskriminante D = (p/2)² − q): ${f((B / 2) ** 2 - C)}`);
    } else {
      steps.push(`ax² + bx + c = 0 mit a = ${f(A)}, b = ${f(B)}, c = ${f(C)}`);
      steps.push(`x₁,₂ = (−b ± √(b² − 4ac)) / 2a = (${f(-B)} ± √(${f(B * B)} − ${f(4 * A * C)})) / ${f(2 * A)}`);
      steps.push(`Diskriminante D = b² − 4ac = ${f(r.diskriminante)}`);
    }
    steps.push(
      r.diskriminante > 0 ? "D > 0: zwei Lösungen" : r.diskriminante === 0 ? "D = 0: genau eine (doppelte) Lösung" : "D < 0: keine reelle Lösung",
    );
  }
  return (
    <div className="date-calc">
      <div className="date-converter-modes is-light" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "pq"} className={mode === "pq" ? "is-active" : undefined} onClick={() => setMode("pq")}>
          pq-Formel
        </button>
        <button type="button" role="tab" aria-selected={mode === "abc"} className={mode === "abc" ? "is-active" : undefined} onClick={() => setMode("abc")}>
          Mitternachtsformel (abc)
        </button>
      </div>
      <div className="date-calc-input">
        <p className="date-calc-note">{mode === "pq" ? "Normalform: x² + px + q = 0" : "Allgemeine Form: ax² + bx + c = 0"}</p>
        <div className="date-calc-fields">
          {mode === "abc" && <Field label="a" value={a} onChange={setA} />}
          {mode === "abc" ? <Field label="b" value={b} onChange={setB} /> : <Field label="p" value={p} onChange={setP} />}
          {mode === "abc" ? <Field label="c" value={c} onChange={setC} /> : <Field label="q" value={q} onChange={setQ} />}
        </div>
      </div>
      {r ? (
        <>
          <div className="date-calc-results">
            <Main
              label="Lösungen"
              value={r.loesungen.length === 0 ? "keine reelle Lösung" : r.loesungen.length === 1 ? `x = ${f(r.loesungen[0])}` : `x₁ = ${f(r.loesungen[0])}, x₂ = ${f(r.loesungen[1])}`}
              detail={`L = {${r.loesungen.map(f).join("; ")}}`}
            />
            <Stat label="Diskriminante" value={f(r.diskriminante)} />
            <Stat label="Scheitelpunkt" value={`S(${f(r.scheitel.x)} | ${f(r.scheitel.y)})`} />
            {mode === "abc" && A !== 1 && r.pq && <Stat label="Als pq-Form (durch a geteilt)" value={`p = ${f(r.pq.p)}, q = ${f(r.pq.q)}`} />}
          </div>
          <Steps steps={steps} />
        </>
      ) : (
        <Note>Bitte gültige Zahlen eingeben; a darf nicht 0 sein.</Note>
      )}
    </div>
  );
}

/* ---------------- Römische Zahlen ---------------- */

export function RoemischeZahlen() {
  const [raw, setRaw] = useState("2026");
  const trimmed = raw.trim();
  const isRoman = /^[ivxlcdm]+$/i.test(trimmed);
  const zahl = isRoman ? ausRoemisch(trimmed) : int(trimmed);
  const rom = !isRoman && Number.isInteger(zahl) ? inRoemisch(zahl as number) : null;
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Zahl (1 bis 3999) oder römische Zahl" value={raw} onChange={setRaw} mode="text" />
        </div>
      </div>
      {isRoman ? (
        zahl ? (
          <div className="date-calc-results">
            <Main label={`${trimmed.toUpperCase()} in arabischen Ziffern`} value={String(zahl)} />
          </div>
        ) : (
          <Note>Keine gültige römische Zahl in Standardschreibweise (z. B. IV statt IIII, XC statt LXXXX).</Note>
        )
      ) : rom ? (
        <>
          <div className="date-calc-results">
            <Main label={`${zahl} in römischen Ziffern`} value={rom.text} />
          </div>
          <Steps title="Zerlegung" steps={rom.teile} />
        </>
      ) : (
        <Note>Bitte eine ganze Zahl von 1 bis 3999 oder eine römische Zahl eingeben.</Note>
      )}
    </div>
  );
}

/* ---------------- Mittelwert und Statistik ---------------- */

export function MittelwertRechner() {
  const [raw, setRaw] = useState("2; 4; 4; 4; 5; 5; 7; 9");
  const s = useMemo(() => statistik(parseZahlenliste(raw)), [raw]);
  const f = (v: number) => fmtDe(v, 4);
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="Werte (mit Semikolon oder Leerzeichen getrennt; Dezimalkomma erlaubt)" value={raw} onChange={setRaw} mode="text" wide />
        </div>
      </div>
      {s ? (
        <>
          <div className="date-calc-results">
            <Main label="Arithmetisches Mittel (Durchschnitt)" value={f(s.mittel)} detail={`Summe ${f(s.sum)} : ${s.n} Werte`} />
            <Stat label="Median (Zentralwert)" value={f(s.median)} />
            <Stat label="Modus (häufigster Wert)" value={s.modus.length ? s.modus.map(f).join("; ") : "keiner"} />
            <Stat label="Spannweite" value={`${f(s.spannweite)} (von ${f(s.min)} bis ${f(s.max)})`} />
            <Stat label="Standardabweichung (Grundgesamtheit, σ)" value={f(s.sdPop)} />
            <Stat label="Standardabweichung (Stichprobe, s)" value={s.n > 1 ? f(s.sdStich) : "–"} />
            <Stat label="Varianz (Grundgesamtheit / Stichprobe)" value={`${f(s.varianzPop)} / ${s.n > 1 ? f(s.varianzStich) : "–"}`} />
          </div>
          <Note>Sortiert: {s.sorted.map(f).join("; ")}</Note>
        </>
      ) : (
        <Note>Bitte mindestens einen Wert eingeben.</Note>
      )}
    </div>
  );
}

/* ---------------- Binomialkoeffizient ---------------- */

export function BinomialRechner() {
  const [nRaw, setN] = useState("49");
  const [kRaw, setK] = useState("6");
  const n = int(nRaw);
  const k = int(kRaw);
  const v = Number.isInteger(n) && n <= 1000 ? nUeberK(n, k) : null;
  const fac = Number.isInteger(n) ? fakultaet(n) : null;
  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <Field label="n (Anzahl insgesamt)" value={nRaw} onChange={setN} mode="numeric" />
          <Field label="k (Anzahl ausgewählt)" value={kRaw} onChange={setK} mode="numeric" />
        </div>
      </div>
      {v !== null ? (
        <>
          <div className="date-calc-results">
            <Main label={`${n} über ${k}`} value={bigDe(v)} detail={`Möglichkeiten, ${k} aus ${n} ohne Reihenfolge auszuwählen`} />
            <Stat label="Wahrscheinlichkeit für genau eine Kombination" value={`1 : ${bigDe(v)}`} />
            {fac !== null && n <= 25 && <Stat label={`${n}! (Fakultät)`} value={bigDe(fac)} />}
          </div>
          <Steps steps={[`(n über k) = n! / (k! · (n − k)!) = ${n}! / (${k}! · ${n - k}!)`, `= ${bigDe(v)}`]} />
        </>
      ) : (
        <Note>Bitte ganze Zahlen mit 0 ≤ k ≤ n ≤ 1000 eingeben.</Note>
      )}
    </div>
  );
}
