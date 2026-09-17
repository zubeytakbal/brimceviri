"use client";

import { useMemo, useState } from "react";
import {
  gregorianToHijri,
  hijriToGregorian,
  getHijriMonthName,
  getGregorianMonthNameUz,
  getHijriMonthLength,
} from "../../converter/hijriCalendarUz";

type Direction = "gregorian-to-hijri" | "hijri-to-gregorian";

function getDaysInGregorianMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export default function HijriCalendarCalculatorUz() {
  const today = new Date();

  const [direction, setDirection] = useState<Direction>("gregorian-to-hijri");

  const [gYear, setGYear] = useState(today.getFullYear());
  const [gMonth, setGMonth] = useState(today.getMonth() + 1);
  const [gDay, setGDay] = useState(today.getDate());

  const [hYear, setHYear] = useState(1447);
  const [hMonth, setHMonth] = useState(1);
  const [hDay, setHDay] = useState(1);

  const gregorianMaxDay = getDaysInGregorianMonth(gYear, gMonth);
  const hijriMaxDay = getHijriMonthLength(hYear, hMonth);

  const result = useMemo(() => {
    try {
      if (direction === "gregorian-to-hijri") {
        if (gDay < 1 || gDay > gregorianMaxDay) return null;
        return { hijri: gregorianToHijri({ year: gYear, month: gMonth, day: gDay }) };
      }
      if (hDay < 1 || hDay > hijriMaxDay) return null;
      return { gregorian: hijriToGregorian({ year: hYear, month: hMonth, day: hDay }) };
    } catch {
      return null;
    }
  }, [direction, gYear, gMonth, gDay, hYear, hMonth, hDay, gregorianMaxDay, hijriMaxDay]);

  return (
    <div className="category-general-converter">
      <div className="engineering-targets">
        <span>Aylantirish Yo&apos;nalishi</span>
        <div className="engineering-target-grid">
          <button
            type="button"
            className={`engineering-target-button${direction === "gregorian-to-hijri" ? " is-active" : ""}`}
            onClick={() => setDirection("gregorian-to-hijri")}
          >
            Milodiydan Hijriyga
          </button>
          <button
            type="button"
            className={`engineering-target-button${direction === "hijri-to-gregorian" ? " is-active" : ""}`}
            onClick={() => setDirection("hijri-to-gregorian")}
          >
            Hijriydan Milodiyga
          </button>
        </div>
      </div>

      {direction === "gregorian-to-hijri" ? (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Kun</span>
            <input
              type="number"
              min={1}
              max={gregorianMaxDay}
              value={gDay}
              onChange={(event) => setGDay(Number(event.target.value))}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Oy</span>
            <select value={gMonth} onChange={(event) => setGMonth(Number(event.target.value))}>
              {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                <option key={month} value={month}>
                  {getGregorianMonthNameUz(month)}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>Yil</span>
            <input
              type="number"
              value={gYear}
              onChange={(event) => setGYear(Number(event.target.value))}
            />
          </label>
        </div>
      ) : (
        <div className="paint-calculator-grid">
          <label className="category-general-converter-field">
            <span>Kun</span>
            <input
              type="number"
              min={1}
              max={hijriMaxDay}
              value={hDay}
              onChange={(event) => setHDay(Number(event.target.value))}
            />
          </label>
          <label className="category-general-converter-field">
            <span>Oy</span>
            <select value={hMonth} onChange={(event) => setHMonth(Number(event.target.value))}>
              {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                <option key={month} value={month}>
                  {getHijriMonthName(month)}
                </option>
              ))}
            </select>
          </label>
          <label className="category-general-converter-field">
            <span>Yil (h.)</span>
            <input
              type="number"
              value={hYear}
              onChange={(event) => setHYear(Number(event.target.value))}
            />
          </label>
        </div>
      )}

      <div
        aria-live="polite"
        className="category-general-converter-result paint-calculator-result"
      >
        {!result ? (
          <strong>To&apos;g&apos;ri sana kiritib natijani ko&apos;rishingiz mumkin.</strong>
        ) : result.hijri ? (
          <strong>
            {gDay} {getGregorianMonthNameUz(gMonth)} {gYear} = {result.hijri.day}{" "}
            {getHijriMonthName(result.hijri.month)} {result.hijri.year} h.
          </strong>
        ) : result.gregorian ? (
          <strong>
            {hDay} {getHijriMonthName(hMonth)} {hYear} h. = {result.gregorian.day}{" "}
            {getGregorianMonthNameUz(result.gregorian.month)} {result.gregorian.year}
          </strong>
        ) : null}
      </div>

      <p className="calculator-usage-hint">
        Eslatma: bu vosita jadvalli (hisoblangan) Islom taqvimi
        algoritmiga asoslangan — oyning haqiqiy ko&apos;rinishiga
        (hilol kuzatuviga) emas, sof matematik 30 yillik davr
        qoidasiga tayanadi. Shu sababli natija, diniy idoralar
        tomonidan rasmiy e&apos;lon qilingan sanadan 1-2 kunga farq
        qilishi mumkin — Ramazon boshlanishi yoki hayit kabi diniy
        sanalar uchun O&apos;zbekiston musulmonlari idorasining rasmiy
        e&apos;lonini asos qiling.
      </p>
    </div>
  );
}
