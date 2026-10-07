// التقويم السعودي: تقويم أم القرى (الرسمي في المملكة) مع الإجازات الرسمية للقطاع الخاص وفق نظام العمل،
// والأيام الوطنية، والمناسبات الدينية، ومواعيد صرف رواتب القطاع الحكومي. كل التواريخ تُحسب بقواعد ثابتة.
//
// - عيد الفطر (القطاع الخاص): 4 أيام تبدأ من اليوم التالي لـ 29 رمضان.
// - عيد الأضحى (القطاع الخاص): 4 أيام تبدأ من يوم عرفة (9 ذو الحجة).
// - يوم التأسيس (22 فبراير) واليوم الوطني (23 سبتمبر): إن وافق الجمعة فالإجازة الخميس، وإن وافق السبت فالأحد.
// - رواتب القطاع الحكومي: يوم 27 من الشهر الميلادي؛ إن وافق الجمعة تُصرف الخميس قبله، وإن وافق السبت فالأحد بعده.
// بداية رمضان والعيدين تعلنها المحكمة العليا برؤية الهلال وقد تختلف يومًا عن أم القرى.
import type { YMD } from "../time/calendars";
import { gregorianToHijri, hijriToGregorian } from "../time/calendars";
import { addDaysYmd, diffDays, weekdayOf, ymdKey } from "../time/dateMath";
import { mevsimAni, type Mevsim } from "./astro";
import type { Gorsel } from "./trTakvim";

export const HIJRI_MONTHS_AR = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];
export const HIJRI_SLUG = [
  "muharram",
  "safar",
  "rabi-al-awwal",
  "rabi-al-akhir",
  "jumada-al-ula",
  "jumada-al-akhirah",
  "rajab",
  "shaban",
  "ramadan",
  "shawwal",
  "dhu-al-qadah",
  "dhu-al-hijjah",
];
export const GREG_MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
export const WEEKDAYS_AR = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export type SaFeah = "rasmi" | "watani" | "dini" | "mawsim";
export const SA_FEAH: Record<SaFeah, string> = {
  rasmi: "إجازة رسمية",
  watani: "مناسبة وطنية",
  dini: "مناسبة دينية",
  mawsim: "الفصول والفلك",
};

type Qaida =
  | { naw: "miladi"; m: number; d: number; tahwil?: boolean }
  | { naw: "hijri"; m: number; d: number }
  | { naw: "fitr" }
  | { naw: "adha" }
  | { naw: "astro"; olay: Mevsim };

export type Munasaba = {
  id: string;
  ism: string;
  feah: SaFeah;
  sura: Gorsel;
  qaida: Qaida;
  /** إجازة رسمية؟ عدد أيام الإجازة في القطاع الخاص */
  ijaza?: number;
  mujaz: string;
  tafsil: string;
  mundhu?: number;
};

export const MUNASABAT: Munasaba[] = [
  {
    id: "founding-day",
    ism: "يوم التأسيس",
    feah: "watani",
    sura: "diriyah",
    qaida: { naw: "miladi", m: 2, d: 22, tahwil: true },
    ijaza: 1,
    mundhu: 2022,
    mujaz:
      "22 فبراير؛ ذكرى تأسيس الدولة السعودية الأولى عام 1727م، وإجازة رسمية.",
    tafsil:
      "يحتفي يوم التأسيس بتأسيس الإمام محمد بن سعود للدولة السعودية الأولى في الدرعية عام 1139هـ (1727م). صدر الأمر الملكي باعتماده يومًا وطنيًا وإجازة رسمية عام 2022. إذا وافق الجمعة تكون الإجازة يوم الخميس، وإذا وافق السبت تكون يوم الأحد.",
  },
  {
    id: "flag-day",
    ism: "يوم العلم",
    feah: "watani",
    sura: "watani",
    qaida: { naw: "miladi", m: 3, d: 11 },
    mundhu: 2023,
    mujaz: "11 مارس؛ ذكرى إقرار العلم السعودي عام 1937م، وليس إجازة.",
    tafsil:
      "يُحتفى بيوم العلم في 11 مارس من كل عام، وهو اليوم الذي أقرّ فيه الملك عبدالعزيز العلم بشكله الحالي عام 1355هـ (1937م). اعتُمد بأمر ملكي عام 2023، ولا يُعد إجازة رسمية.",
  },
  {
    id: "national-day",
    ism: "اليوم الوطني السعودي",
    feah: "watani",
    sura: "watani",
    qaida: { naw: "miladi", m: 9, d: 23, tahwil: true },
    ijaza: 1,
    mujaz: "23 سبتمبر؛ ذكرى توحيد المملكة عام 1932م، وإجازة رسمية.",
    tafsil:
      "يوافق اليوم الوطني ذكرى إعلان توحيد المملكة العربية السعودية على يد الملك عبدالعزيز في 23 سبتمبر 1932م. وهو إجازة رسمية؛ إذا وافق الجمعة تكون الإجازة يوم الخميس، وإذا وافق السبت تكون يوم الأحد.",
  },
  {
    id: "ramadan",
    ism: "بداية شهر رمضان",
    feah: "dini",
    sura: "fanous",
    qaida: { naw: "hijri", m: 9, d: 1 },
    mujaz: "أول أيام شهر الصيام وفق تقويم أم القرى.",
    tafsil:
      "رمضان هو الشهر التاسع في التقويم الهجري وشهر الصيام. يبدأ برؤية الهلال التي تعلنها المحكمة العليا، وقد يختلف الإعلان يومًا عن تقويم أم القرى. يستمر 29 أو 30 يومًا ويعقبه عيد الفطر.",
  },
  {
    id: "last-ten-nights",
    ism: "العشر الأواخر من رمضان",
    feah: "dini",
    sura: "hilal",
    qaida: { naw: "hijri", m: 9, d: 21 },
    mujaz: "تبدأ ليلة 21 رمضان، وفيها تُتحرّى ليلة القدر.",
    tafsil:
      "العشر الأواخر من رمضان أفضل ليالي الشهر، وفيها يُتحرّى ليلة القدر في الليالي الوتر. يعتكف كثير من المسلمين في المساجد خلالها.",
  },
  {
    id: "eid-al-fitr",
    ism: "عيد الفطر",
    feah: "rasmi",
    sura: "eid",
    qaida: { naw: "fitr" },
    ijaza: 4,
    mujaz:
      "1 شوال؛ إجازة القطاع الخاص 4 أيام تبدأ من اليوم التالي لـ 29 رمضان.",
    tafsil:
      "عيد الفطر أول أيام شهر شوال بعد صيام رمضان. وفق نظام العمل، إجازة القطاع الخاص 4 أيام تبدأ من اليوم التالي لليوم التاسع والعشرين من رمضان. أما القطاع الحكومي فتُعلن إجازته كل عام وتكون عادةً أطول.",
  },
  {
    id: "day-of-tarwiyah",
    ism: "يوم التروية",
    feah: "dini",
    sura: "arafat",
    qaida: { naw: "hijri", m: 12, d: 8 },
    mujaz: "8 ذو الحجة؛ أول أيام مناسك الحج.",
    tafsil:
      "في يوم التروية يتوجه الحجاج إلى منى ويبيتون فيها استعدادًا للوقوف بعرفة في اليوم التالي.",
  },
  {
    id: "day-of-arafah",
    ism: "يوم عرفة",
    feah: "dini",
    sura: "arafat",
    qaida: { naw: "hijri", m: 12, d: 9 },
    mujaz:
      "9 ذو الحجة؛ ركن الحج الأعظم، ويبدأ منه إجازة عيد الأضحى للقطاع الخاص.",
    tafsil:
      "يقف الحجاج في يوم عرفة على صعيد عرفات، وهو ركن الحج الأعظم. يُستحب صيامه لغير الحاج. تبدأ منه إجازة عيد الأضحى في القطاع الخاص.",
  },
  {
    id: "eid-al-adha",
    ism: "عيد الأضحى",
    feah: "rasmi",
    sura: "kurban",
    qaida: { naw: "adha" },
    ijaza: 4,
    mujaz: "10 ذو الحجة؛ إجازة القطاع الخاص 4 أيام تبدأ من يوم عرفة.",
    tafsil:
      "عيد الأضحى يوافق العاشر من ذي الحجة، ويذبح فيه المسلمون الأضاحي. وفق نظام العمل، إجازة القطاع الخاص 4 أيام تبدأ من يوم عرفة. تليه أيام التشريق (11–13 ذو الحجة).",
  },
  {
    id: "islamic-new-year",
    ism: "رأس السنة الهجرية",
    feah: "dini",
    sura: "hilal",
    qaida: { naw: "hijri", m: 1, d: 1 },
    mujaz: "1 محرم؛ بداية العام الهجري الجديد.",
    tafsil:
      "يبدأ العام الهجري في الأول من محرم. اعتمد الخليفة عمر بن الخطاب هجرة النبي ﷺ من مكة إلى المدينة بداية للتقويم. السنة الهجرية 354 أو 355 يومًا.",
  },
  {
    id: "ashura",
    ism: "يوم عاشوراء",
    feah: "dini",
    sura: "hilal",
    qaida: { naw: "hijri", m: 1, d: 10 },
    mujaz: "10 محرم؛ يُستحب صيامه مع يوم قبله.",
    tafsil:
      "يوم عاشوراء هو العاشر من محرم، ويُستحب صيامه اقتداءً بالنبي ﷺ، ويُسن صيام التاسع معه.",
  },
  {
    id: "spring",
    ism: "بداية فصل الربيع",
    feah: "mawsim",
    sura: "ilkbahar",
    qaida: { naw: "astro", olay: "mart-ekinoksu" },
    mujaz: "الاعتدال الربيعي؛ يتساوى الليل والنهار تقريبًا.",
    tafsil:
      "في الاعتدال الربيعي تعبر الشمس خط الاستواء السماوي نحو الشمال، فيتساوى طول الليل والنهار تقريبًا في أنحاء العالم.",
  },
  {
    id: "summer",
    ism: "بداية فصل الصيف",
    feah: "mawsim",
    sura: "yaz",
    qaida: { naw: "astro", olay: "haziran-gundonumu" },
    mujaz: "الانقلاب الصيفي؛ أطول نهار في السنة.",
    tafsil:
      "في الانقلاب الصيفي تبلغ الشمس أعلى ارتفاع لها في السماء عند الظهر، فيكون أطول نهار وأقصر ليل في نصف الكرة الشمالي.",
  },
  {
    id: "autumn",
    ism: "بداية فصل الخريف",
    feah: "mawsim",
    sura: "sonbahar",
    qaida: { naw: "astro", olay: "eylul-ekinoksu" },
    mujaz: "الاعتدال الخريفي؛ يتساوى الليل والنهار مرة أخرى.",
    tafsil:
      "في الاعتدال الخريفي تعبر الشمس خط الاستواء السماوي نحو الجنوب، وبعده يصبح الليل أطول من النهار في نصف الكرة الشمالي.",
  },
  {
    id: "winter",
    ism: "بداية فصل الشتاء",
    feah: "mawsim",
    sura: "kis",
    qaida: { naw: "astro", olay: "aralik-gundonumu" },
    mujaz: "الانقلاب الشتوي؛ أقصر نهار في السنة.",
    tafsil:
      "في الانقلاب الشتوي تكون الشمس في أدنى ارتفاع لها عند الظهر، فيكون أقصر نهار وأطول ليل في نصف الكرة الشمالي.",
  },
];

export const findMunasaba = (id: string) =>
  MUNASABAT.find((m) => m.id === id) ?? null;

export type Mawid = {
  m: Munasaba;
  tarikh: YMD;
  ila?: YMD;
  ijazaMin?: YMD;
  ijazaIla?: YMD;
  waqt?: Date;
};

const riyadh = (d: Date): YMD => {
  const t = new Date(d.getTime() + 3 * 3600000);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
  };
};

/** اليوم الأول من شهر هجري بالميلادي (أم القرى). */
function hijriYawm(hy: number, hm: number, hd: number): YMD | null {
  return hijriToGregorian({ year: hy, month: hm, day: hd });
}

/** السنوات الهجرية التي تقع أيامها في السنة الميلادية. */
function hijriSanawat(year: number) {
  const a = gregorianToHijri({ year, month: 1, day: 1 }).year;
  const b = gregorianToHijri({ year, month: 12, day: 31 }).year;
  return a === b ? [a] : [a, b];
}

/** تاريخ الإجازة الفعلي ليومي التأسيس والوطني: الجمعة ← الخميس، السبت ← الأحد. */
export function tahwilIjaza(d: YMD): YMD {
  const w = weekdayOf(d);
  if (w === 5) return addDaysYmd(d, -1);
  if (w === 6) return addDaysYmd(d, 1);
  return d;
}

export function mawaid(m: Munasaba, year: number): Mawid[] {
  if (m.mundhu && year < m.mundhu) return [];
  const q = m.qaida;
  const inYear = (d: YMD | null): d is YMD => Boolean(d) && d!.year === year;
  switch (q.naw) {
    case "miladi": {
      const t = { year, month: q.m, day: q.d };
      const ijaza = q.tahwil && m.ijaza ? tahwilIjaza(t) : undefined;
      return [
        {
          m,
          tarikh: t,
          ...(ijaza ? { ijazaMin: ijaza, ijazaIla: ijaza } : {}),
        },
      ];
    }
    case "hijri":
      return hijriSanawat(year)
        .map((hy) => hijriYawm(hy, q.m, q.d))
        .filter(inYear)
        .map((tarikh) => ({ m, tarikh }));
    case "fitr":
      return hijriSanawat(year)
        .map((hy): Mawid | null => {
          const eid = hijriYawm(hy, 10, 1);
          const r29 = hijriYawm(hy, 9, 29);
          if (!eid || !r29) return null;
          const min = addDaysYmd(r29, 1);
          return {
            m,
            tarikh: eid,
            ijazaMin: min,
            ijazaIla: addDaysYmd(min, 3),
          };
        })
        .filter((x): x is Mawid => x !== null && x.tarikh.year === year);
    case "adha":
      return hijriSanawat(year)
        .map((hy): Mawid | null => {
          const eid = hijriYawm(hy, 12, 10);
          const arafa = hijriYawm(hy, 12, 9);
          if (!eid || !arafa) return null;
          return {
            m,
            tarikh: eid,
            ila: addDaysYmd(eid, 3),
            ijazaMin: arafa,
            ijazaIla: addDaysYmd(arafa, 3),
          };
        })
        .filter((x): x is Mawid => x !== null && x.tarikh.year === year);
    case "astro": {
      const an = mevsimAni(year, q.olay);
      return [{ m, tarikh: riyadh(an), waqt: an }];
    }
  }
}

export const mawaidSana = (year: number) =>
  MUNASABAT.flatMap((m) => mawaid(m, year)).sort((a, b) =>
    ymdKey(a.tarikh).localeCompare(ymdKey(b.tarikh)),
  );

const cache = new Map<
  number,
  { munasabat: Map<string, Mawid[]>; ijazat: Map<string, string> }
>();

/** خريطة الأيام: المناسبات في يومها، وأيام الإجازة الرسمية (للقطاع الخاص). */
export function kharitatSana(year: number) {
  let c = cache.get(year);
  if (c) return c;
  const munasabat = new Map<string, Mawid[]>();
  const ijazat = new Map<string, string>();
  for (const y of [year - 1, year, year + 1]) {
    for (const t of mawaidSana(y)) {
      if (t.tarikh.year === year)
        munasabat.set(ymdKey(t.tarikh), [
          ...(munasabat.get(ymdKey(t.tarikh)) ?? []),
          t,
        ]);
      if (t.ijazaMin && t.ijazaIla)
        for (
          let d = t.ijazaMin;
          diffDays(d, t.ijazaIla) >= 0;
          d = addDaysYmd(d, 1)
        )
          if (d.year === year) ijazat.set(ymdKey(d), t.m.ism);
    }
  }
  c = { munasabat, ijazat };
  cache.set(year, c);
  return c;
}

/** موعد صرف رواتب القطاع الحكومي لشهر ميلادي. */
export function mawidRatib(year: number, month: number): YMD {
  const d = { year, month, day: 27 };
  const w = weekdayOf(d);
  if (w === 5) return addDaysYmd(d, -1);
  if (w === 6) return addDaysYmd(d, 1);
  return d;
}

export function hijriNass(d: YMD) {
  const h = gregorianToHijri(d);
  return `${h.day} ${HIJRI_MONTHS_AR[h.month - 1]} ${h.year}هـ`;
}

export const miladiNass = (d: YMD, maaYawm = true) =>
  `${maaYawm ? `${WEEKDAYS_AR[weekdayOf(d)]} ` : ""}${d.day} ${GREG_MONTHS_AR[d.month - 1]} ${d.year}م`;

export const SA_SANAWAT = [2026, 2027, 2028];
export const SA_HIJRI_SANAWAT = [1448, 1449];

export const saHubPath = "/ar/calendar";
export const saHijriSanaPath = (hy: number) => `/ar/hijri-calendar/${hy}`;
export const saHijriShahrPath = (hy: number, hm: number) =>
  `/ar/hijri-calendar/${hy}/${HIJRI_SLUG[hm - 1]}`;
/** المناسبات في صفحة واحدة؛ لكل مناسبة قسمها. */
export const saMunasabaPath = (id: string) => `/ar/occasions#${id}`;

/** الموعد القادم لمناسبة (بما فيها الجارية). */
export function mawidQadim(m: Munasaba, min: YMD): Mawid | null {
  for (let y = min.year; y <= min.year + 2; y += 1) {
    const t = mawaid(m, y).find(
      (x) => ymdKey(x.ila ?? x.tarikh) >= ymdKey(min),
    );
    if (t) return t;
  }
  return null;
}

/** أيام الشهر الهجري بالميلادي. */
export function shahrHijri(hy: number, hm: number) {
  const bidaya = hijriYawm(hy, hm, 1)!;
  let nihaya = bidaya;
  while (gregorianToHijri(addDaysYmd(nihaya, 1)).month === hm)
    nihaya = addDaysYmd(nihaya, 1);
  return { bidaya, nihaya, ayyam: diffDays(bidaya, nihaya) + 1 };
}

export function riyadhYawm(): YMD {
  return riyadh(new Date());
}

const SIGH = {
  sana: ["سنة واحدة", "سنتان", "سنوات", "سنة"],
  shahr: ["شهر واحد", "شهران", "أشهر", "شهرًا"],
  yawm: ["يوم واحد", "يومان", "أيام", "يومًا"],
  usbu: ["أسبوع واحد", "أسبوعان", "أسابيع", "أسبوعًا"],
} as const;

/** العدد مع المعدود بصيغة عربية صحيحة (1، 2، 3–10، 11 فأكثر). */
export function adadAr(n: number, w: keyof typeof SIGH) {
  const [wahid, ithnan, jam, mufrad] = SIGH[w];
  const r = n.toLocaleString("ar-SA-u-nu-latn");
  if (n === 1) return wahid;
  if (n === 2) return ithnan;
  const m = n % 100;
  if (m >= 3 && m <= 10) return `${r} ${jam}`;
  if (n === 0) return `0 ${SIGH[w][3].replace(/ًا$/, "")}`;
  return `${r} ${mufrad}`;
}
