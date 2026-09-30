// التقويم الدراسي للتعليم العام في السعودية (نظام الفصلين). تعتمده وزارة التعليم لعدة أعوام؛
// عند إضافة عام جديد تُحدَّث "sa-taqwim" في annualUpdates.ts.
import type { YMD } from "../time/calendars";
import { addDaysYmd, diffDays, weekdayOf, ymdKey } from "../time/dateMath";

const t = (s: string): YMD => {
  const [year, month, day] = s.split("-").map(Number);
  return { year, month, day };
};

export type Ijaza = {
  id: string;
  ism: string;
  /** أول يوم إجازة (قد يكون جمعة) وآخر يوم إجازة (قد يكون سبتًا). */
  min: YMD;
  ila: YMD;
};

export type AamDirasi = {
  hijri: number;
  ism: string;
  bidaya: YMD;
  /** بداية الدراسة في مكة المكرمة والمدينة المنورة وجدة والطائف. */
  bidayaGharbiya: YMD;
  fasl2: YMD;
  /** آخر يوم دراسي قبل إجازة نهاية العام. */
  nihaya: YMD;
  ijazat: Ijaza[];
  masdar: string;
};

export const AAM_1448: AamDirasi = {
  hijri: 1448,
  ism: "1448هـ (2026–2027م)",
  bidaya: t("2026-08-23"),
  bidayaGharbiya: t("2026-08-30"),
  fasl2: t("2027-01-17"),
  nihaya: t("2027-06-24"),
  ijazat: [
    {
      id: "national-day",
      ism: "إجازة اليوم الوطني",
      min: t("2026-09-23"),
      ila: t("2026-09-26"),
    },
    {
      id: "autumn",
      ism: "إجازة الخريف",
      min: t("2026-11-20"),
      ila: t("2026-11-28"),
    },
    {
      id: "mid-year",
      ism: "إجازة منتصف العام",
      min: t("2027-01-08"),
      ila: t("2027-01-16"),
    },
    {
      id: "founding-day",
      ism: "إجازة يوم التأسيس",
      min: t("2027-02-19"),
      ila: t("2027-02-22"),
    },
    {
      id: "eid-al-fitr",
      ism: "إجازة عيد الفطر",
      min: t("2027-02-26"),
      ila: t("2027-03-13"),
    },
    {
      id: "eid-al-adha",
      ism: "إجازة عيد الأضحى",
      min: t("2027-05-07"),
      ila: t("2027-05-22"),
    },
  ],
  masdar:
    "وزارة التعليم: التقويم الدراسي المعتمد للأعوام 1447–1450هـ بنظام الفصلين الدراسيين",
};

export const AAM_HALI = AAM_1448;

/** هل اليوم يوم دراسي؟ (أيام الأحد–الخميس خارج الإجازات، ضمن العام الدراسي) */
export function yawmDirasi(a: AamDirasi, d: YMD, gharbiya = false) {
  const bidaya = gharbiya ? a.bidayaGharbiya : a.bidaya;
  if (diffDays(bidaya, d) < 0 || diffDays(d, a.nihaya) < 0) return false;
  const w = weekdayOf(d);
  if (w === 5 || w === 6) return false;
  return !a.ijazat.some(
    (i) => diffDays(i.min, d) >= 0 && diffDays(d, i.ila) >= 0,
  );
}

/** عدد الأيام الدراسية بين تاريخين (شاملًا الطرفين). */
export function adadAyyam(a: AamDirasi, min: YMD, ila: YMD, gharbiya = false) {
  let n = 0;
  for (let d = min; diffDays(d, ila) >= 0; d = addDaysYmd(d, 1))
    if (yawmDirasi(a, d, gharbiya)) n++;
  return n;
}

export type Hadath = {
  id: string;
  ism: string;
  min: YMD;
  ila?: YMD;
  /** أول يوم دراسي بعد الإجازة. */
  awda?: YMD;
  naw: "dirasa" | "ijaza";
};

/** أحداث العام الدراسي مرتبة زمنيًا. */
export function ahdath(a: AamDirasi): Hadath[] {
  const awda = (d: YMD) => {
    let x = addDaysYmd(d, 1);
    while (weekdayOf(x) === 5 || weekdayOf(x) === 6) x = addDaysYmd(x, 1);
    return x;
  };
  const out: Hadath[] = [
    {
      id: "start",
      ism: "بداية العام الدراسي",
      min: a.bidaya,
      naw: "dirasa",
    },
    ...a.ijazat.map((i): Hadath => ({ ...i, awda: awda(i.ila), naw: "ijaza" })),
    {
      id: "semester-2",
      ism: "بداية الفصل الدراسي الثاني",
      min: a.fasl2,
      naw: "dirasa",
    },
    {
      id: "summer",
      ism: "إجازة نهاية العام الدراسي",
      min: addDaysYmd(a.nihaya, 1),
      naw: "ijaza",
    },
  ];
  return out.sort((x, y) => ymdKey(x.min).localeCompare(ymdKey(y.min)));
}

/** الإجازة القادمة (أو الجارية) بالنسبة لتاريخ. */
export function ijazaQadima(a: AamDirasi, d: YMD) {
  return (
    ahdath(a).find(
      (h) => h.naw === "ijaza" && diffDays(d, h.ila ?? h.min) >= 0,
    ) ?? null
  );
}

/** آخر يوم دراسي في الفصل الأول. */
export const nihayatFasl1 = (a: AamDirasi) => {
  let d = addDaysYmd(a.fasl2, -1);
  while (!yawmDirasi(a, d)) d = addDaysYmd(d, -1);
  return d;
};
