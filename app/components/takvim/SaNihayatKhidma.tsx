"use client";

import { useState } from "react";
import { adadAr } from "../../converter/calendar/saTaqwim";
import {
  ASBAB,
  hisabMukafaa,
  type SababInhaa,
} from "../../converter/saNihayatKhidma";
import type { YMD } from "../../converter/time/calendars";
import { parseYmd, ymdKey } from "../../converter/time/dateMath";

const riyal = (n: number) =>
  `${n.toLocaleString("ar-SA-u-nu-latn", { maximumFractionDigits: 2, minimumFractionDigits: 2 })} ريال`;
/** عدد السنوات: صحيح بصيغة المعدود، وكسري بثلاث خانات. */
const sanaNass = (x: number) =>
  Number.isInteger(x)
    ? adadAr(x, "sana")
    : `${x.toLocaleString("ar-SA-u-nu-latn", { maximumFractionDigits: 3 })} سنة`;
const NISBA_NASS: Record<string, string> = {
  "0": "لا شيء",
  "0.333": "الثلث",
  "0.667": "الثلثان",
  "1": "كاملة",
};

/** حاسبة مكافأة نهاية الخدمة للقطاع الخاص وفق نظام العمل. */
export default function SaNihayatKhidma({ yawm }: { yawm: YMD }) {
  const [bidaya, setBidaya] = useState(`${yawm.year - 7}-01-01`);
  const [nihaya, setNihaya] = useState(ymdKey(yawm));
  const [asasi, setAsasi] = useState(8000);
  const [sakan, setSakan] = useState(2000);
  const [ukhra, setUkhra] = useState(0);
  const [sabab, setSabab] = useState<SababInhaa>("inhaa");

  const b = parseYmd(bidaya);
  const n = parseYmd(nihaya);
  const ajr = (asasi || 0) + (sakan || 0) + (ukhra || 0);
  const r = b && n ? hisabMukafaa(b, n, ajr, sabab) : null;
  const sharh = ASBAB.find((a) => a.id === sabab)!.sharh;

  const raqm = (label: string, value: number, set: (v: number) => void) => (
    <label className="date-calc-field">
      <span>{label}</span>
      <span className="date-calc-field-row">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={100}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
        />
      </span>
    </label>
  );

  return (
    <div className="date-calc">
      <div className="date-calc-input">
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>تاريخ بداية العمل</span>
            <span className="date-calc-field-row">
              <input
                type="date"
                value={bidaya}
                onChange={(e) => setBidaya(e.target.value)}
              />
            </span>
          </label>
          <label className="date-calc-field">
            <span>تاريخ انتهاء العلاقة التعاقدية</span>
            <span className="date-calc-field-row">
              <input
                type="date"
                value={nihaya}
                onChange={(e) => setNihaya(e.target.value)}
              />
              <button type="button" onClick={() => setNihaya(ymdKey(yawm))}>
                اليوم
              </button>
            </span>
          </label>
        </div>
        <div className="date-calc-fields is-amounts">
          {raqm("الأجر الأساسي الشهري", asasi, setAsasi)}
          {raqm("بدل السكن", sakan, setSakan)}
          {raqm("بدلات ثابتة أخرى (نقل وغيره)", ukhra, setUkhra)}
        </div>
        <div className="date-calc-fields">
          <label className="date-calc-field">
            <span>سبب انتهاء العلاقة التعاقدية</span>
            <span className="date-calc-field-row">
              <select
                value={sabab}
                onChange={(e) => setSabab(e.target.value as SababInhaa)}
                style={{ width: "100%", minWidth: 0 }}
              >
                {ASBAB.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.ism}
                  </option>
                ))}
              </select>
            </span>
          </label>
        </div>
      </div>
      {!r ? (
        <p className="date-calc-note">
          تحقق من التاريخين: يجب أن يكون تاريخ الانتهاء بعد تاريخ البداية.
        </p>
      ) : (
        <>
          <div className="date-calc-results">
            <div className="date-calc-stat is-main">
              <span>المكافأة المستحقة</span>
              <strong>{riyal(r.mustahaqq)}</strong>
              <em>
                {NISBA_NASS[String(Math.round(r.nisba * 1000) / 1000)] ?? ""} ·{" "}
                {sharh}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>مدة الخدمة</span>
              <strong>
                {adadAr(r.mudda.years, "sana")} و
                {adadAr(r.mudda.months, "shahr")} و
                {adadAr(r.mudda.days, "yawm")}
              </strong>
              <em>
                {adadAr(r.ayyam, "yawm")} = {sanaNass(r.sanawat)}
              </em>
            </div>
            <div className="date-calc-stat">
              <span>الأجر المعتمد للحساب</span>
              <strong>{riyal(r.ajr)}</strong>
              <em>الأساسي + السكن + البدلات الثابتة</em>
            </div>
            <div className="date-calc-stat">
              <span>المكافأة الكاملة</span>
              <strong>{riyal(r.kamila)}</strong>
              <em>قبل تطبيق نسبة الاستقالة</em>
            </div>
          </div>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">الشريحة</th>
                  <th scope="col">المدة</th>
                  <th scope="col">المعدل</th>
                  <th scope="col">المبلغ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">السنوات الخمس الأولى</th>
                  <td>{sanaNass(Math.min(r.sanawat, 5))}</td>
                  <td>نصف أجر شهر لكل سنة</td>
                  <td>{riyal(r.shariha1)}</td>
                </tr>
                <tr>
                  <th scope="row">ما بعد السنة الخامسة</th>
                  <td>{sanaNass(Math.max(r.sanawat - 5, 0))}</td>
                  <td>أجر شهر لكل سنة</td>
                  <td>{riyal(r.shariha2)}</td>
                </tr>
                <tr>
                  <th scope="row">نسبة الاستحقاق</th>
                  <td colSpan={2}>
                    {NISBA_NASS[String(Math.round(r.nisba * 1000) / 1000)]}
                  </td>
                  <td>{riyal(r.mustahaqq)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="date-calc-note">
            تقدير وفق المواد 84 و85 و87 من نظام العمل للقطاع الخاص، وتحسب أجزاء
            السنة بنسبة الأيام (÷ 365). لا يشمل الأجر المستحق أو بدل الإجازات أو
            التعويض عن الإنهاء غير المشروع (المادة 77). للاعتماد الرسمي استخدم
            الحاسبة العمالية في وزارة العدل.
          </p>
        </>
      )}
    </div>
  );
}
