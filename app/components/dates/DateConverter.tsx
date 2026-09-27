"use client";

import { useEffect, useState } from "react";
import {
  gregorianToHijri,
  gregorianToJdn,
  gregorianToRumi,
  HIJRI_MONTHS_EN,
  HIJRI_MONTHS_TR,
  hijriToGregorian,
  jdnToJulian,
  rumiToGregorian,
  RUMI_MONTHS,
  type YMD,
} from "../../converter/time/calendars";

type Mode = "gregorian" | "hijri" | "rumi";

export type DateConverterCopy = {
  modes: Record<Mode, string>;
  day: string;
  month: string;
  year: string;
  today: string;
  results: Record<Mode | "julian", string>;
  invalid: string;
  rumiOutOfRange: string;
  hijriNote: string;
  julianNote: string;
};

const GREGORIAN_MONTHS = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

// Hicri / Rumi / Miladi tarih cevirici. Girilen takvime gore digerlerini aninda hesaplar.
export default function DateConverter({ lang, copy }: { lang: "tr" | "en"; copy: DateConverterCopy }) {
  const [mode, setMode] = useState<Mode>("gregorian");
  const [input, setInput] = useState<YMD>({ year: 1923, month: 10, day: 29 });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const m = params.get("takvim") ?? params.get("calendar");
      const d = params.get("tarih") ?? params.get("date");
      if ((m === "gregorian" || m === "hijri" || m === "rumi") && d && /^\d{1,4}-\d{1,2}-\d{1,2}$/.test(d)) {
        const [year, month, day] = d.split("-").map(Number);
        setMode(m);
        setInput({ year, month, day });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const monthNames = mode === "gregorian" ? GREGORIAN_MONTHS[lang] : mode === "hijri" ? (lang === "tr" ? HIJRI_MONTHS_TR : HIJRI_MONTHS_EN) : RUMI_MONTHS;
  const hijriNames = lang === "tr" ? HIJRI_MONTHS_TR : HIJRI_MONTHS_EN;

  const gregorian: YMD | null =
    mode === "gregorian"
      ? gregorianToJdnValid(input)
      : mode === "hijri"
        ? hijriToGregorian(input)
        : rumiToGregorian(input);

  const setToday = () => {
    const now = new Date();
    const today = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    if (mode === "gregorian") setInput(today);
    else if (mode === "hijri") setInput(gregorianToHijri(today));
    else {
      setMode("gregorian");
      setInput(today);
    }
  };

  const switchMode = (next: Mode) => {
    // Mevcut tarihi yeni takvime tasi ki kullanici ayni gunu gorsun.
    if (gregorian) {
      if (next === "gregorian") setInput(gregorian);
      if (next === "hijri") setInput(gregorianToHijri(gregorian));
      if (next === "rumi") {
        const rumi = gregorianToRumi(gregorian);
        if (rumi) setInput(rumi);
        else setInput({ year: 1339, month: 10, day: 29 });
      }
    }
    setMode(next);
  };

  const weekday = gregorian
    ? new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", { weekday: "long", timeZone: "UTC" }).format(new Date(Date.UTC(gregorian.year, gregorian.month - 1, gregorian.day)))
    : "";
  const hijri = gregorian ? gregorianToHijri(gregorian) : null;
  const rumi = gregorian ? gregorianToRumi(gregorian) : null;
  const julian = gregorian && gregorian.year < 1927 ? jdnToJulian(gregorianToJdn(gregorian)) : null;
  const g = GREGORIAN_MONTHS[lang];

  return (
    <div className="date-converter">
      <div className="date-converter-input">
        <div className="date-converter-modes" role="tablist">
          {(["gregorian", "hijri", "rumi"] as Mode[]).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} className={mode === m ? "is-active" : undefined} onClick={() => switchMode(m)}>
              {copy.modes[m]}
            </button>
          ))}
        </div>
        <div className="date-converter-fields">
          <label>
            <span>{copy.day}</span>
            <input type="number" min={1} max={31} value={input.day} onChange={(event) => setInput({ ...input, day: Number(event.target.value) })} />
          </label>
          <label>
            <span>{copy.month}</span>
            <select value={input.month} onChange={(event) => setInput({ ...input, month: Number(event.target.value) })}>
              {monthNames.map((name, index) => (
                <option key={name} value={index + 1}>
                  {index + 1} · {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{copy.year}</span>
            <input type="number" min={1} max={3000} value={input.year} onChange={(event) => setInput({ ...input, year: Number(event.target.value) })} />
          </label>
          <button type="button" className="time-tool-button is-secondary" onClick={setToday}>
            {copy.today}
          </button>
        </div>
      </div>

      {!gregorian ? (
        <p className="date-converter-invalid">{mode === "rumi" ? copy.rumiOutOfRange : copy.invalid}</p>
      ) : (
        <div className="date-converter-results">
          <div className={`date-result${mode === "gregorian" ? " is-source" : ""}`}>
            <span>{copy.results.gregorian}</span>
            <strong>
              {gregorian.day} {g[gregorian.month - 1]} {gregorian.year}
            </strong>
            <em>{weekday}</em>
          </div>
          {hijri && (
            <div className={`date-result${mode === "hijri" ? " is-source" : ""}`}>
              <span>{copy.results.hijri}</span>
              <strong>
                {hijri.day} {hijriNames[hijri.month - 1]} {hijri.year}
              </strong>
              <em>{copy.hijriNote}</em>
            </div>
          )}
          <div className={`date-result${mode === "rumi" ? " is-source" : ""}`}>
            <span>{copy.results.rumi}</span>
            {rumi ? (
              <strong>
                {rumi.day} {RUMI_MONTHS[rumi.month - 1]} {rumi.year}
              </strong>
            ) : (
              <em>{copy.rumiOutOfRange}</em>
            )}
          </div>
          {julian && (
            <div className="date-result">
              <span>{copy.results.julian}</span>
              <strong>
                {julian.day} {g[julian.month - 1]} {julian.year}
              </strong>
              <em>{copy.julianNote}</em>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function gregorianToJdnValid(date: YMD): YMD | null {
  if (!date.year || date.month < 1 || date.month > 12 || date.day < 1 || date.day > 31) return null;
  const check = new Date(Date.UTC(date.year, date.month - 1, date.day));
  // Date.UTC 0-99 yillarini 1900'e kaydirir; bu cevirici icin 100 oncesi desteklenmez.
  if (date.year < 100 || check.getUTCMonth() !== date.month - 1) return null;
  return date;
}
