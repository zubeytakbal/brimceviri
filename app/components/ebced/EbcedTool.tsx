"use client";

import { useState } from "react";
import { hijriToGregorian } from "../../converter/time/calendars";
import { EBCED_LETTERS, ebcedValue, numberToEbced, type TaMarbuta } from "../../converter/text/ebced";

// Ebced çevirici: Arap harfli metin → sayı (harf harf döküm) ve sayı → ebced harfleri.
// Telefonda Arap klavyesi olmayanlar için 28 harf ve Osmanlı harfleri düğme olarak verilir.

const EXTRA = [
  { char: "ة", name: "yuvarlak te" },
  { char: "ى", name: "elif maksure" },
  { char: "ء", name: "hemze" },
  { char: "پ", name: "pe" },
  { char: "چ", name: "çim" },
  { char: "ژ", name: "je" },
  { char: "گ", name: "gef" },
];

/** Hicri yılın miladi karşılığı: 1 Muharrem'in düştüğü yıl ve yılın bitişi. */
function hijriYearSpan(h: number) {
  if (h < 1 || h > 1500) return null;
  const start = hijriToGregorian({ year: h, month: 1, day: 1 });
  const next = hijriToGregorian({ year: h + 1, month: 1, day: 1 });
  if (!start || !next) return null;
  const endYear = next.month === 1 && next.day === 1 ? next.year - 1 : next.year;
  return start.year === endYear ? `${start.year}` : `${start.year}–${endYear}`;
}

const nameOf = (c: string) => EBCED_LETTERS.find((l) => l.char === c)!;

/** "gayın 1000 + te 400 + …"; 2000 ve üstünde ilk harf binlerin çarpanıdır (بغ = 2 × 1000). */
function letterNote(letters: string, n: number) {
  const chars = Array.from(letters);
  const parts = chars.map((c) => `${nameOf(c).name} ${nameOf(c).value}`);
  if (n < 2000) return parts.join(" + ");
  const [mul, , ...rest] = parts;
  return [`${mul} × gayın 1000`, ...rest].join(" + ");
}

export default function EbcedTool() {
  const [mode, setMode] = useState<"text" | "number">("text");
  const [text, setText] = useState("بلدة طيبة");
  const [ta, setTa] = useState<TaMarbuta>("te");
  const [num, setNum] = useState("1453");

  const result = ebcedValue(text, ta);
  const n = Number(num);
  const letters = numberToEbced(n);
  const span = mode === "text" ? hijriYearSpan(result.total) : null;

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-chips" role="group" aria-label="Çevirme yönü">
          <button type="button" aria-pressed={mode === "text"} onClick={() => setMode("text")}>
            Harf → Sayı
          </button>
          <button type="button" aria-pressed={mode === "number"} onClick={() => setMode("number")}>
            Sayı → Harf
          </button>
        </div>
        {mode === "text" ? (
          <>
            <label className="date-calc-field ebced-field">
              <span>Arap harfleriyle metin</span>
              <textarea dir="rtl" lang="ar" rows={2} value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <div className="ebced-keys" dir="rtl" aria-label="Harf düğmeleri">
              {[...EBCED_LETTERS, ...EXTRA].map((l) => (
                <button key={l.char} type="button" title={l.name} onClick={() => setText((t) => t + l.char)}>
                  {l.char}
                </button>
              ))}
              <button type="button" className="ebced-key-wide" onClick={() => setText((t) => t + " ")}>
                boşluk
              </button>
              <button type="button" className="ebced-key-wide" onClick={() => setText((t) => Array.from(t).slice(0, -1).join(""))}>
                sil
              </button>
              <button type="button" className="ebced-key-wide" onClick={() => setText("")}>
                temizle
              </button>
            </div>
            <div className="date-calc-chips" role="group" aria-label="Yuvarlak te (ة) değeri">
              <button type="button" aria-pressed={ta === "te"} onClick={() => setTa("te")}>
                {"ة\u200E = 400 (te)"}
              </button>
              <button type="button" aria-pressed={ta === "he"} onClick={() => setTa("he")}>
                {"ة\u200E = 5 (he)"}
              </button>
            </div>
          </>
        ) : (
          <div className="date-calc-fields">
            <label className="date-calc-field">
              <span>Sayı (1–9999)</span>
              <input type="number" inputMode="numeric" min={1} max={9999} value={num} onChange={(e) => setNum(e.target.value)} />
            </label>
          </div>
        )}
      </div>
      <div className="date-calc-results" aria-live="polite">
        {mode === "text" ? (
          <>
            <div className="date-calc-stat is-main">
              <span>Ebced değeri</span>
              <strong>{result.total.toLocaleString("tr-TR")}</strong>
              <em>
                {result.parts.length} harf
                {result.unknown ? ` · ${result.unknown} karakter Arap harfi olmadığı için sayılmadı` : ""}
              </em>
            </div>
            {span && (
              <div className="date-calc-stat">
                <span>Hicri {result.total} yılı</span>
                <strong>Miladi {span}</strong>
                <em>Tarih düşürmede sonuç genellikle hicri yıldır</em>
              </div>
            )}
            {result.parts.length > 0 && (
              <p className="ebced-breakdown">
                {result.parts.map((p, i) => (
                  <span key={i}>
                    <b dir="rtl" lang="ar">
                      {p.char}
                    </b>{" "}
                    {p.name} {p.value}
                  </span>
                ))}
              </p>
            )}
          </>
        ) : (
          <div className="date-calc-stat is-main">
            <span>Ebced harfleriyle</span>
            <strong dir="rtl" lang="ar">
              {letters ?? "—"}
            </strong>
            <em>
              {letters ? letterNote(letters, n) : "1 ile 9999 arasında bir tam sayı girin."}
            </em>
          </div>
        )}
      </div>
    </div>
  );
}
