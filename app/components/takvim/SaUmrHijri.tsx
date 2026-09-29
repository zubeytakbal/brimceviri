"use client";

import { useState } from "react";
import {
  adadAr,
  GREG_MONTHS_AR,
  HIJRI_MONTHS_AR,
  WEEKDAYS_AR,
} from "../../converter/calendar/saTaqwim";
import {
  gregorianToHijri,
  hijriToGregorian,
  type YMD,
} from "../../converter/time/calendars";
import {
  diffDays,
  parseYmd,
  weekdayOf,
  ymdKey,
} from "../../converter/time/dateMath";
import { hisabUmr, hijriShahrTul } from "../../converter/time/hijriAge";

type Mudda = { years: number; months: number; days: number };

const hijriNass = (h: YMD) =>
  `${h.day} ${HIJRI_MONTHS_AR[h.month - 1]} ${h.year}هـ`;
const miladiNass = (d: YMD) =>
  `${WEEKDAYS_AR[weekdayOf(d)]} ${d.day} ${GREG_MONTHS_AR[d.month - 1]} ${d.year}م`;
const muddaNass = (m: Mudda) =>
  `${adadAr(m.years, "sana")} و${adadAr(m.months, "shahr")} و${adadAr(m.days, "yawm")}`;

/** حاسبة العمر بالهجري والميلادي: يُدخل تاريخ الميلاد بأي من التقويمين. */
export default function SaUmrHijri({ yawm }: { yawm: YMD }) {
  const h0 = gregorianToHijri(yawm);
  const [naw, setNaw] = useState<"hijri" | "miladi">("hijri");
  const [hy, setHy] = useState(h0.year - 30);
  const [hm, setHm] = useState(1);
  const [hd, setHd] = useState(1);
  const [miladi, setMiladi] = useState(`${yawm.year - 30}-01-01`);
  const [ila, setIla] = useState(ymdKey(yawm));

  let milad: YMD | null = null;
  let khata = "";
  if (naw === "hijri") {
    if (hy < 1300 || hy > h0.year)
      khata = "أدخل سنة هجرية بين 1300 و" + h0.year;
    else {
      const tul = hijriShahrTul(hy, hm);
      if (hd > tul)
        khata = `شهر ${HIJRI_MONTHS_AR[hm - 1]} ${hy}هـ ${tul} يومًا فقط حسب تقويم أم القرى`;
      else milad = hijriToGregorian({ year: hy, month: hm, day: hd });
    }
  } else milad = parseYmd(miladi);
  const hadaf = parseYmd(ila);
  const r = milad && hadaf && !khata ? hisabUmr(milad, hadaf) : null;
  if (milad && hadaf && !khata && !r) khata = "تاريخ الميلاد بعد تاريخ الحساب";

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div
          className="date-converter-modes"
          role="radiogroup"
          aria-label="تقويم تاريخ الميلاد"
        >
          {(
            [
              ["hijri", "تاريخ الميلاد بالهجري"],
              ["miladi", "تاريخ الميلاد بالميلادي"],
            ] as const
          ).map(([k, l]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={naw === k}
              className={naw === k ? "is-active" : undefined}
              onClick={() => setNaw(k)}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="date-calc-fields">
          {naw === "hijri" ? (
            <label className="date-calc-field">
              <span>تاريخ الميلاد (هجري – أم القرى)</span>
              <span className="date-calc-field-row">
                <select
                  value={hd}
                  onChange={(e) => setHd(Number(e.target.value))}
                  aria-label="اليوم"
                >
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={hm}
                  onChange={(e) => setHm(Number(e.target.value))}
                  aria-label="الشهر"
                >
                  {HIJRI_MONTHS_AR.map((m, i) => (
                    <option key={m} value={i + 1}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1300}
                  max={h0.year}
                  value={hy}
                  onChange={(e) => setHy(Number(e.target.value))}
                  aria-label="السنة الهجرية"
                />
              </span>
            </label>
          ) : (
            <label className="date-calc-field">
              <span>تاريخ الميلاد (ميلادي)</span>
              <span className="date-calc-field-row">
                <input
                  type="date"
                  value={miladi}
                  onChange={(e) => setMiladi(e.target.value)}
                />
              </span>
            </label>
          )}
          <label className="date-calc-field">
            <span>حساب العمر في تاريخ</span>
            <span className="date-calc-field-row">
              <input
                type="date"
                value={ila}
                onChange={(e) => setIla(e.target.value)}
              />
              <button type="button" onClick={() => setIla(ymdKey(yawm))}>
                اليوم
              </button>
            </span>
          </label>
        </div>
      </div>
      {khata ? <p className="date-calc-note">{khata}</p> : null}
      {r && milad && hadaf ? (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>العمر بالهجري</span>
              <strong>{muddaNass(r.hijri)}</strong>
              <em>من {hijriNass(r.miladHijri)}</em>
            </div>
            <div className="date-calc-stat">
              <span>العمر بالميلادي</span>
              <strong>{muddaNass(r.miladi)}</strong>
              <em>من {miladiNass(milad)}</em>
            </div>
            <div className="date-calc-stat">
              <span>عدد الأيام</span>
              <strong>{adadAr(r.ayyam, "yawm")}</strong>
              <em>
                {adadAr(Math.floor(r.ayyam / 7), "usbu")} · يوم الولادة:{" "}
                {WEEKDAYS_AR[weekdayOf(milad)]}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>عيد الميلاد الهجري القادم</span>
              <strong>
                {hijriNass(gregorianToHijri(r.qadimHijri.tarikh))}
              </strong>
              <em>
                {miladiNass(r.qadimHijri.tarikh)} · تكمل{" "}
                {adadAr(r.qadimHijri.umr, "sana")} ·{" "}
                {diffDays(hadaf, r.qadimHijri.tarikh) === 0
                  ? "اليوم"
                  : `بعد ${adadAr(diffDays(hadaf, r.qadimHijri.tarikh), "yawm")}`}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>عيد الميلاد الميلادي القادم</span>
              <strong>{miladiNass(r.qadimMiladi.tarikh)}</strong>
              <em>
                تكمل {adadAr(r.qadimMiladi.umr, "sana")} ·{" "}
                {diffDays(hadaf, r.qadimMiladi.tarikh) === 0
                  ? "اليوم"
                  : `بعد ${adadAr(diffDays(hadaf, r.qadimMiladi.tarikh), "yawm")}`}
              </em>
            </div>
          </div>
          <p className="date-calc-note">
            العمر الهجري أكبر من الميلادي لأن السنة الهجرية أقصر من الميلادية
            بنحو 11 يومًا. التاريخ الموافق:{" "}
            {naw === "hijri" ? miladiNass(milad) : hijriNass(r.miladHijri)}.
          </p>
        </>
      ) : null}
    </div>
  );
}
