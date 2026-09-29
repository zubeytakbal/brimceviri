import Link from "@/app/components/SiteLink";
import {
  adadAr,
  GREG_MONTHS_AR,
  HIJRI_MONTHS_AR,
  hijriNass,
  mawaid,
  mawaidSana,
  mawidQadim,
  mawidRatib,
  miladiNass,
  MUNASABAT,
  riyadhYawm,
  SA_FEAH,
  SA_HIJRI_SANAWAT,
  saHijriSanaPath,
  saHijriShahrPath,
  saMunasabaPath,
  shahrHijri,
  type Mawid,
  type Munasaba,
  type SaFeah,
} from "../../converter/calendar/saTaqwim";
import {
  AAM_HALI,
  adadAyyam,
  ahdath,
  ijazaQadima,
  nihayatFasl1,
  yawmDirasi,
} from "../../converter/calendar/saMadrasi";
import type { FaqItem } from "../../converter/faqSchema";
import { gregorianToHijri, type YMD } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, ymdKey } from "../../converter/time/dateMath";
import { moonState, phaseName } from "../../converter/time/moon";
import TimeToolPage from "../time/TimeToolPage";
import SaNavigator from "./SaNavigator";
import SaUmrHijri from "./SaUmrHijri";
import { SaMiftah, SaShahrGrid } from "./SaShahrGrid";
import TakvimGorsel from "./TakvimGorsel";
import { buildSiteUrl } from "../../siteConfig";

const T = {
  crumb: "مسار التنقل",
  related: "قد يهمك أيضًا",
  toc: "المحتويات",
  faq: "الأسئلة الشائعة",
};
/** زر الاشتراك في تقويم ics يتحدث تلقائيًا. */
function SaIshtirak() {
  return (
    <div className="takvim-ics">
      <a
        className="time-tool-button is-secondary"
        href={buildSiteUrl("/ar/calendar.ics").replace(/^https?:/, "webcal:")}
      >
        🔔 أضف المناسبات والإجازات ومواعيد الرواتب إلى تقويم هاتفك
      </a>
    </div>
  );
}

const RAISIYA = { href: "/ar", label: "الرئيسية" };
const HUB = { href: "/ar/calendar", label: "التقويم" };
const MUN_HUB = { href: "/ar/occasions", label: "المناسبات" };

export const SA_ROWABIT = [
  { href: "/ar/calendar", label: "التقويم الهجري والميلادي" },
  { href: "/ar/hijri-date-converter", label: "تحويل التاريخ هجري ميلادي" },
  { href: "/ar/occasions", label: "المناسبات والإجازات الرسمية" },
  { href: "/ar/school-calendar", label: "التقويم الدراسي" },
  { href: "/ar/salary-dates", label: "مواعيد صرف الرواتب" },
  { href: "/ar/prayer-times-calculator", label: "مواقيت الصلاة" },
  { href: "/ar/hijri-age-calculator", label: "حساب العمر بالهجري" },
  { href: "/ar/zakat-calculator", label: "حاسبة الزكاة" },
];

const MARHALA: Record<string, string> = {
  new: "محاق",
  "waxing-crescent": "هلال متزايد",
  first: "تربيع أول",
  "waxing-gibbous": "أحدب متزايد",
  full: "بدر",
  "waning-gibbous": "أحدب متناقص",
  last: "تربيع ثانٍ",
  "waning-crescent": "هلال متناقص",
};

const qasir = (d: YMD) => `${d.day} ${GREG_MONTHS_AR[d.month - 1]}`;
const waqtAr = (d: Date) =>
  new Intl.DateTimeFormat("ar-SA-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Riyadh",
  }).format(d);
const baqi = (n: number) =>
  n === 0
    ? "اليوم"
    : n === 1
      ? "غدًا"
      : n === 2
        ? "بعد يومين"
        : n <= 10
          ? `بعد ${n} أيام`
          : `بعد ${n} يومًا`;

function ijazaNass(t: Mawid) {
  if (!t.ijazaMin || !t.ijazaIla) return null;
  if (ymdKey(t.ijazaMin) === ymdKey(t.ijazaIla))
    return `الإجازة: ${miladiNass(t.ijazaMin)}`;
  return `الإجازة (القطاع الخاص): من ${miladiNass(t.ijazaMin)} إلى ${miladiNass(t.ijazaIla)}`;
}

function Qaima({ list }: { list: Mawid[] }) {
  return (
    <ul className="takvim-liste">
      {list.map((t) => (
        <li key={t.m.id + ymdKey(t.tarikh)}>
          <TakvimGorsel gorsel={t.m.sura} size={44} />
          <div>
            <Link href={saMunasabaPath(t.m.id)} prefetch={false}>
              <strong>{t.m.ism}</strong>
            </Link>
            <br />
            <span className="takvim-gun-adi">
              {miladiNass(t.tarikh)} · {hijriNass(t.tarikh)}
            </span>
            {t.waqt ? <small> · الساعة {waqtAr(t.waqt)}</small> : null}
          </div>
          <span className={`takvim-kat sa-feah-${t.m.feah}`}>
            {SA_FEAH[t.m.feah]}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* /ar/calendar ------------------------------------------------------------ */

export function SaHub() {
  const yawm = riyadhYawm();
  const h = gregorianToHijri(yawm);
  const qamar = moonState(new Date());
  const qadima = [...mawaidSana(yawm.year), ...mawaidSana(yawm.year + 1)]
    .filter((t) => ymdKey(t.ila ?? t.tarikh) >= ymdKey(yawm))
    .slice(0, 8);
  let ratib = mawidRatib(yawm.year, yawm.month);
  if (diffDays(yawm, ratib) < 0)
    ratib = mawidRatib(
      yawm.month === 12 ? yawm.year + 1 : yawm.year,
      (yawm.month % 12) + 1,
    );
  const faq: FaqItem[] = [
    {
      question: "كم التاريخ الهجري اليوم؟",
      answer: `التاريخ الهجري اليوم هو ${hijriNass(yawm)} حسب تقويم أم القرى، الموافق ${miladiNass(yawm)}.`,
    },
    {
      question: "ما هو تقويم أم القرى؟",
      answer:
        "تقويم أم القرى هو التقويم الهجري الرسمي في المملكة العربية السعودية، ويُحسب فلكيًا بحيث يبدأ الشهر إذا غرب القمر بعد الشمس في مكة المكرمة يوم الاقتران. أما بداية رمضان والعيدين فتعلنها المحكمة العليا برؤية الهلال.",
    },
    {
      question: "ما هي عطلة نهاية الأسبوع في السعودية؟",
      answer:
        "عطلة نهاية الأسبوع في المملكة العربية السعودية يوما الجمعة والسبت منذ عام 2013، ويبدأ الأسبوع يوم الأحد.",
    },
    {
      question: "ما هي الإجازات الرسمية في السعودية؟",
      answer:
        "الإجازات الرسمية للقطاع الخاص وفق نظام العمل: يوم التأسيس (22 فبراير)، وإجازة عيد الفطر (4 أيام)، وإجازة عيد الأضحى (4 أيام)، واليوم الوطني (23 سبتمبر).",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, { label: "التقويم" }]}
        crumbLabel={T.crumb}
        title={`التاريخ الهجري اليوم والتقويم ${h.year}هـ`}
        intro="التاريخ الهجري اليوم حسب تقويم أم القرى مع التاريخ الميلادي، وتقويم تفاعلي لكل شهر هجري من 1400 إلى 1500هـ، والإجازات الرسمية والمناسبات في المملكة العربية السعودية."
        tool={
          <div className="date-calc">
            <div className="takvim-bugun">
              <div>
                <span>اليوم</span>
                <strong>{hijriNass(yawm)}</strong>
                <em>{miladiNass(yawm)}</em>
              </div>
              <dl>
                <div>
                  <dt>الشهر الهجري</dt>
                  <dd>
                    {HIJRI_MONTHS_AR[h.month - 1]} (
                    {shahrHijri(h.year, h.month).ayyam} يومًا)
                  </dd>
                </div>
                <div>
                  <dt>القمر</dt>
                  <dd>{MARHALA[phaseName(qamar.age)]}</dd>
                </div>
                <div>
                  <dt>صرف الرواتب</dt>
                  <dd>
                    <Link href="/ar/salary-dates" prefetch={false}>
                      {qasir(ratib)} ({baqi(diffDays(yawm, ratib))})
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
            <SaNavigator yawm={yawm} hy0={h.year} hm0={h.month} />
            <SaIshtirak />
            <div className="time-tool-chips takvim-yillar">
              {SA_HIJRI_SANAWAT.map((y) => (
                <Link key={y} href={saHijriSanaPath(y)} prefetch={false}>
                  تقويم {y}هـ
                </Link>
              ))}
              <Link href="/ar/occasions" prefetch={false}>
                المناسبات
              </Link>
              <Link href="/ar/school-calendar" prefetch={false}>
                التقويم الدراسي
              </Link>
            </div>
          </div>
        }
        related={{ title: T.related, links: SA_ROWABIT }}
        tocTitle={T.toc}
        tocItems={[
          { id: "qadima", label: "المناسبات القادمة" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="qadima">المناسبات القادمة</h2>
        <Qaima list={qadima} />
      </TimeToolPage>
    </div>
  );
}

/* /ar/hijri-calendar/[hy] ---------------------------------------------------- */

export function saSanaMeta(hy: number) {
  const b = shahrHijri(hy, 1).bidaya;
  return {
    title: `التقويم الهجري ${hy}: الأشهر الهجرية والمناسبات`,
    short: `التقويم الهجري ${hy}هـ`,
    description: `تقويم العام الهجري ${hy} حسب أم القرى: بداية كل شهر ونهايته بالميلادي، وعدد أيامه، ورمضان والعيدين والإجازات الرسمية. يبدأ العام في ${miladiNass(b)}.`,
  };
}

export function SaSana({ hy }: { hy: number }) {
  const ashhur = Array.from({ length: 12 }, (_, i) => ({
    hm: i + 1,
    ...shahrHijri(hy, i + 1),
  }));
  const mawaidFi = (bidaya: YMD, nihaya: YMD) =>
    [bidaya.year, nihaya.year]
      .filter((y, i, a) => a.indexOf(y) === i)
      .flatMap(mawaidSana)
      .filter(
        (t) =>
          t.m.feah !== "mawsim" &&
          diffDays(bidaya, t.tarikh) >= 0 &&
          diffDays(t.tarikh, nihaya) >= 0,
      );
  const ayyam = ashhur.reduce((s, x) => s + x.ayyam, 0);
  const faq: FaqItem[] = [
    {
      question: `متى يبدأ العام الهجري ${hy}؟`,
      answer: `يبدأ العام الهجري ${hy} يوم ${miladiNass(ashhur[0].bidaya)} (1 محرم ${hy}هـ) وينتهي يوم ${miladiNass(ashhur[11].nihaya)}.`,
    },
    {
      question: `كم عدد أيام السنة الهجرية ${hy}؟`,
      answer: `عدد أيام العام الهجري ${hy} حسب تقويم أم القرى ${ayyam} يومًا.`,
    },
    {
      question: `متى رمضان ${hy}؟`,
      answer: `يبدأ شهر رمضان ${hy} حسب تقويم أم القرى يوم ${miladiNass(ashhur[8].bidaya)}، ويستمر ${ashhur[8].ayyam} يومًا. تُعلن البداية رسميًا برؤية الهلال.`,
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: `${hy}هـ` }]}
        crumbLabel={T.crumb}
        title={`التقويم الهجري ${hy}هـ`}
        intro={`الأشهر الهجرية لعام ${hy} حسب تقويم أم القرى مع ما يوافقها بالتاريخ الميلادي، وعدد أيام كل شهر، والمناسبات والإجازات الرسمية.`}
        tool={
          <div className="date-calc">
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">الشهر</th>
                    <th scope="col">من – إلى (ميلادي)</th>
                    <th scope="col">المناسبات</th>
                  </tr>
                </thead>
                <tbody>
                  {ashhur.map((x) => (
                    <tr key={x.hm}>
                      <td>
                        <Link
                          href={saHijriShahrPath(hy, x.hm)}
                          prefetch={false}
                        >
                          <strong>{HIJRI_MONTHS_AR[x.hm - 1]}</strong>
                        </Link>
                        <br />
                        <small>{x.ayyam} يومًا</small>
                      </td>
                      <td>
                        {miladiNass(x.bidaya, false)} –{" "}
                        {miladiNass(x.nihaya, false)}
                      </td>
                      <td>
                        {mawaidFi(x.bidaya, x.nihaya).map((t, i) => (
                          <span key={t.m.id}>
                            {i ? "، " : ""}
                            <Link
                              href={saMunasabaPath(t.m.id)}
                              prefetch={false}
                            >
                              {t.m.ism}
                            </Link>
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="holiday-calendar takvim-yil">
              {ashhur.map((x) => (
                <div className="holiday-month" key={x.hm}>
                  <h3>
                    <Link href={saHijriShahrPath(hy, x.hm)} prefetch={false}>
                      {HIJRI_MONTHS_AR[x.hm - 1]}
                    </Link>
                  </h3>
                  <SaShahrGrid hy={hy} hm={x.hm} />
                </div>
              ))}
            </div>
            <SaMiftah />
          </div>
        }
        related={{
          title: T.related,
          links: [
            ...SA_HIJRI_SANAWAT.filter((y) => y !== hy).map((y) => ({
              href: saHijriSanaPath(y),
              label: `التقويم الهجري ${y}`,
            })),
            ...SA_ROWABIT,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[{ id: "faq", label: T.faq }]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <p>
          يُحسب تقويم أم القرى فلكيًا، ويعتمد رسميًا في المملكة العربية
          السعودية. أما بدايات رمضان وشوال وذي الحجة فتُعلن برؤية الهلال، وقد
          تختلف يومًا عن التقويم. لتحويل أي تاريخ استخدم{" "}
          <Link href="/ar/hijri-date-converter">
            محول التاريخ الهجري الميلادي
          </Link>
          .
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /ar/hijri-calendar/[hy]/[month] ------------------------------------------- */

export function saShahrMeta(hy: number, hm: number) {
  const s = shahrHijri(hy, hm);
  const ism = HIJRI_MONTHS_AR[hm - 1];
  return {
    title: `تقويم شهر ${ism} ${hy}هـ: بدايته ونهايته بالميلادي`,
    short: `تقويم ${ism} ${hy}`,
    description: `شهر ${ism} ${hy}هـ حسب تقويم أم القرى: يبدأ ${miladiNass(s.bidaya)} وعدد أيامه ${s.ayyam} يومًا، مع التاريخ الميلادي لكل يوم والمناسبات فيه.`,
  };
}

export function SaShahr({ hy, hm }: { hy: number; hm: number }) {
  const ism = HIJRI_MONTHS_AR[hm - 1];
  const s = shahrHijri(hy, hm);
  const list = [s.bidaya.year, s.nihaya.year]
    .filter((y, i, a) => a.indexOf(y) === i)
    .flatMap(mawaidSana)
    .filter(
      (t) =>
        diffDays(s.bidaya, t.tarikh) >= 0 && diffDays(t.tarikh, s.nihaya) >= 0,
    );
  const sabiq = hm === 1 ? { hy: hy - 1, hm: 12 } : { hy, hm: hm - 1 };
  const lahiq = hm === 12 ? { hy: hy + 1, hm: 1 } : { hy, hm: hm + 1 };
  const faq: FaqItem[] = [
    {
      question: `متى يبدأ شهر ${ism} ${hy}؟`,
      answer: `يبدأ شهر ${ism} ${hy}هـ حسب تقويم أم القرى يوم ${miladiNass(s.bidaya)}، وينتهي يوم ${miladiNass(s.nihaya)}.`,
    },
    {
      question: `كم يوم في شهر ${ism} ${hy}؟`,
      answer: `عدد أيام شهر ${ism} ${hy}هـ حسب تقويم أم القرى ${s.ayyam} يومًا. الشهر الهجري 29 أو 30 يومًا.`,
    },
    ...(hm === 9
      ? [
          {
            question: `متى عيد الفطر ${hy}؟`,
            answer: `عيد الفطر يوافق 1 شوال ${hy}هـ حسب تقويم أم القرى، أي ${miladiNass(addDaysYmd(s.nihaya, 1))}. تُعلن المحكمة العليا ثبوت رؤية هلال شوال مساء 29 رمضان.`,
          },
        ]
      : []),
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[
          RAISIYA,
          HUB,
          { href: saHijriSanaPath(hy), label: `${hy}هـ` },
          { label: ism },
        ]}
        crumbLabel={T.crumb}
        title={`تقويم شهر ${ism} ${hy}هـ`}
        intro={`شهر ${ism} ${hy}هـ يومًا بيوم مع التاريخ الميلادي، من ${miladiNass(s.bidaya)} إلى ${miladiNass(s.nihaya)} (${s.ayyam} يومًا)، مع المناسبات والإجازات.`}
        tool={
          <div className="date-calc">
            <div className="takvim-ay-baslik">
              {SA_HIJRI_SANAWAT.includes(sabiq.hy) ? (
                <Link
                  href={saHijriShahrPath(sabiq.hy, sabiq.hm)}
                  prefetch={false}
                >
                  › {HIJRI_MONTHS_AR[sabiq.hm - 1]}
                </Link>
              ) : (
                <span />
              )}
              <h2>
                {ism} {hy}هـ
              </h2>
              {SA_HIJRI_SANAWAT.includes(lahiq.hy) ? (
                <Link
                  href={saHijriShahrPath(lahiq.hy, lahiq.hm)}
                  prefetch={false}
                >
                  {HIJRI_MONTHS_AR[lahiq.hm - 1]} ‹
                </Link>
              ) : (
                <span />
              )}
            </div>
            <SaShahrGrid hy={hy} hm={hm} kabir />
            <SaMiftah />
            <div className="date-calc-results">
              <div className="date-calc-stat">
                <span>بداية الشهر</span>
                <strong>{qasir(s.bidaya)}</strong>
                <em>{miladiNass(s.bidaya)}</em>
              </div>
              <div className="date-calc-stat">
                <span>نهاية الشهر</span>
                <strong>{qasir(s.nihaya)}</strong>
                <em>{miladiNass(s.nihaya)}</em>
              </div>
              <div className="date-calc-stat">
                <span>عدد الأيام</span>
                <strong>{s.ayyam} يومًا</strong>
                <em>حسب تقويم أم القرى</em>
              </div>
            </div>
          </div>
        }
        related={{
          title: T.related,
          links: [
            { href: saHijriSanaPath(hy), label: `التقويم الهجري ${hy}` },
            ...SA_ROWABIT,
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "munasabat", label: `مناسبات ${ism}` },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="munasabat">
          المناسبات في شهر {ism} {hy}هـ
        </h2>
        {list.length ? (
          <Qaima list={list} />
        ) : (
          <p>لا توجد في هذا الشهر مناسبة من مناسبات التقويم.</p>
        )}
      </TimeToolPage>
    </div>
  );
}

/* /ar/occasions -------------------------------------------------------------- */

const TARTIB: SaFeah[] = ["rasmi", "watani", "dini", "mawsim"];

export function SaMunasabatHub() {
  const yawm = riyadhYawm();
  const faq: FaqItem[] = [
    {
      question: "كم عدد أيام إجازة عيد الفطر للقطاع الخاص؟",
      answer:
        "إجازة عيد الفطر للقطاع الخاص 4 أيام تبدأ من اليوم التالي لليوم التاسع والعشرين من رمضان، وفق اللائحة التنفيذية لنظام العمل.",
    },
    {
      question: "كم عدد أيام إجازة عيد الأضحى للقطاع الخاص؟",
      answer:
        "إجازة عيد الأضحى للقطاع الخاص 4 أيام تبدأ من يوم عرفة (9 ذو الحجة).",
    },
    {
      question: "ماذا لو وافق اليوم الوطني أو يوم التأسيس الجمعة أو السبت؟",
      answer:
        "إذا وافق أحدهما يوم الجمعة تكون الإجازة يوم الخميس الذي قبله، وإذا وافق يوم السبت تكون الإجازة يوم الأحد الذي بعده.",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "المناسبات" }]}
        crumbLabel={T.crumb}
        title="المناسبات والإجازات الرسمية في السعودية"
        intro="متى رمضان والعيد ويوم التأسيس واليوم الوطني؟ الإجازات الرسمية والمناسبات الدينية والوطنية مع موعدها القادم وعدد الأيام المتبقية."
        tool={
          <div className="takvim-hub">
            <SaIshtirak />
            {TARTIB.map((f) => (
              <section key={f}>
                <h2 id={`feah-${f}`}>{SA_FEAH[f]}</h2>
                <ul className="takvim-hub-liste">
                  {MUNASABAT.filter((m) => m.feah === f).map((m) => {
                    const q = mawidQadim(m, yawm);
                    const n = q ? diffDays(yawm, q.tarikh) : null;
                    return (
                      <li key={m.id}>
                        <Link href={saMunasabaPath(m.id)} prefetch={false}>
                          <TakvimGorsel gorsel={m.sura} size={56} />
                          <span>
                            <strong>{m.ism}</strong>
                            {q ? (
                              <em>
                                {miladiNass(q.tarikh)}
                                {n !== null
                                  ? ` · ${n < 0 ? "جارية الآن" : baqi(n)}`
                                  : ""}
                              </em>
                            ) : null}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        }
        related={{ title: T.related, links: SA_ROWABIT }}
        tocTitle={T.toc}
        tocItems={[
          ...TARTIB.map((f) => ({ id: `feah-${f}`, label: SA_FEAH[f] })),
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <p>
          تُحسب المواعيد حسب تقويم أم القرى. بدايات رمضان وشوال وذي الحجة تُعلن
          رسميًا برؤية الهلال وقد تختلف يومًا واحدًا. إجازات القطاع الحكومي في
          العيدين تُعلن كل عام وتكون عادةً أطول من إجازات القطاع الخاص.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /ar/occasions/[id] --------------------------------------------------------- */

export function saMunasabaMeta(m: Munasaba) {
  const y = riyadhYawm().year;
  const q = mawidQadim(m, riyadhYawm());
  return {
    title: `موعد ${m.ism} ${q ? q.tarikh.year : y}: كم باقي؟`,
    short: `موعد ${m.ism}`,
    description:
      `${m.ism}: ${q ? `${miladiNass(q.tarikh)} الموافق ${hijriNass(q.tarikh)}` : ""}. ${m.mujaz}`.slice(
        0,
        300,
      ),
  };
}

export function SaMunasaba({ m }: { m: Munasaba }) {
  const yawm = riyadhYawm();
  const q = mawidQadim(m, yawm);
  const n = q ? diffDays(yawm, q.tarikh) : null;
  const sufuf = [yawm.year, yawm.year + 1, yawm.year + 2].flatMap((y) =>
    mawaid(m, y),
  );
  const faq: FaqItem[] = [
    ...(q
      ? [
          {
            question: `كم باقي على ${m.ism}؟`,
            answer: `${m.ism} ${n !== null && n > 0 ? `بعد ${n} يومًا، ` : ""}يوم ${miladiNass(q.tarikh)} الموافق ${hijriNass(q.tarikh)}.`,
          },
        ]
      : []),
    {
      question: `هل ${m.ism} إجازة رسمية؟`,
      answer: m.ijaza
        ? `نعم، ${m.ism} إجازة رسمية مدتها ${m.ijaza === 1 ? "يوم واحد" : `${m.ijaza} أيام`} للقطاع الخاص.${q && ijazaNass(q) ? ` ${ijazaNass(q)}.` : ""}`
        : `لا، ${m.ism} ليس إجازة رسمية.`,
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, MUN_HUB, { label: m.ism }]}
        crumbLabel={T.crumb}
        title={`موعد ${m.ism}`}
        intro={m.mujaz}
        tool={
          <div className="date-calc">
            <article className="takvim-kart">
              <TakvimGorsel gorsel={m.sura} size={112} title={m.ism} />
              <div>
                <span className={`takvim-kat sa-feah-${m.feah}`}>
                  {SA_FEAH[m.feah]}
                </span>
                {q ? (
                  <>
                    <h2>{miladiNass(q.tarikh)}</h2>
                    <p>
                      {hijriNass(q.tarikh)} ·{" "}
                      {n !== null ? (n < 0 ? "جارية الآن" : baqi(n)) : ""}
                      {q.waqt ? ` · الساعة ${waqtAr(q.waqt)} بتوقيت مكة` : ""}
                    </p>
                    {ijazaNass(q) ? (
                      <p className="takvim-kart-alt">
                        <span className="takvim-etiket is-tatil">
                          {ijazaNass(q)}
                        </span>
                      </p>
                    ) : null}
                  </>
                ) : null}
              </div>
            </article>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">التاريخ الميلادي</th>
                    <th scope="col">التاريخ الهجري</th>
                    <th scope="col">الإجازة</th>
                  </tr>
                </thead>
                <tbody>
                  {sufuf.map((t) => (
                    <tr key={ymdKey(t.tarikh)}>
                      <td>{miladiNass(t.tarikh)}</td>
                      <td>{hijriNass(t.tarikh)}</td>
                      <td>
                        {t.ijazaMin && t.ijazaIla
                          ? ymdKey(t.ijazaMin) === ymdKey(t.ijazaIla)
                            ? qasir(t.ijazaMin)
                            : `${qasir(t.ijazaMin)} – ${qasir(t.ijazaIla)}`
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        }
        related={{ title: T.related, links: [MUN_HUB, ...SA_ROWABIT] }}
        tocTitle={T.toc}
        tocItems={[
          { id: "tafsil", label: `عن ${m.ism}` },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="tafsil">عن {m.ism}</h2>
        <p>{m.tafsil}</p>
        {m.feah === "dini" || m.id.startsWith("eid") ? (
          <p>
            المواعيد حسب تقويم أم القرى؛ وتُعلن بدايات رمضان وشوال وذي الحجة
            رسميًا برؤية الهلال، وقد تختلف يومًا واحدًا.
          </p>
        ) : null}
      </TimeToolPage>
    </div>
  );
}

/* /ar/salary-dates ----------------------------------------------------------- */

export function SaRawatib() {
  const yawm = riyadhYawm();
  const sanawat = [yawm.year, yawm.year + 1];
  const kull = sanawat.flatMap((y) =>
    Array.from({ length: 12 }, (_, i) => ({
      y,
      m: i + 1,
      d: mawidRatib(y, i + 1),
    })),
  );
  const qadim = kull.find((x) => diffDays(yawm, x.d) >= 0)!;
  const n = diffDays(yawm, qadim.d);
  const faq: FaqItem[] = [
    {
      question: "متى ينزل الراتب؟",
      answer: `يُصرف راتب شهر ${GREG_MONTHS_AR[qadim.m - 1]} ${qadim.y} لموظفي القطاع الحكومي يوم ${miladiNass(qadim.d)} (${baqi(n)}).`,
    },
    {
      question: "ما قاعدة صرف رواتب موظفي الدولة؟",
      answer:
        "تُصرف رواتب موظفي الدولة يوم 27 من كل شهر ميلادي. إذا وافق يوم 27 الجمعة تُصرف يوم الخميس الذي قبله، وإذا وافق السبت تُصرف يوم الأحد الذي بعده. وقد يُقدَّم الصرف بأمر ملكي، كما قبل العيدين أحيانًا.",
    },
    {
      question: "هل يتغير موعد الراتب في رمضان؟",
      answer:
        "القاعدة واحدة طوال العام، لكن الدولة قد تقدّم موعد الصرف قبل عيد الفطر أو عيد الأضحى بأمر ملكي. تابع إعلانات وزارة المالية.",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "مواعيد الرواتب" }]}
        crumbLabel={T.crumb}
        title={`مواعيد صرف الرواتب ${sanawat.join(" و")}`}
        intro="موعد نزول رواتب موظفي القطاع الحكومي في السعودية لكل شهر، مع العد التنازلي للراتب القادم والتاريخ الهجري الموافق."
        tool={
          <div className="date-calc">
            <article className="takvim-kart">
              <TakvimGorsel gorsel="maas" size={112} title="الراتب" />
              <div>
                <span className="takvim-kat sa-feah-rasmi">الراتب القادم</span>
                <h2>{miladiNass(qadim.d)}</h2>
                <p>
                  {hijriNass(qadim.d)} · {baqi(n)}
                </p>
                {qadim.d.day !== 27 ? (
                  <p className="takvim-kart-alt">
                    <span className="takvim-etiket">
                      يوم 27 يوافق عطلة نهاية الأسبوع، لذا تغيّر موعد الصرف
                    </span>
                  </p>
                ) : null}
              </div>
            </article>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">الشهر</th>
                    <th scope="col">موعد الصرف</th>
                    <th scope="col">التاريخ الهجري</th>
                  </tr>
                </thead>
                <tbody>
                  {kull.map((x) => (
                    <tr
                      key={`${x.y}-${x.m}`}
                      className={
                        diffDays(yawm, x.d) < 0
                          ? "is-weekend"
                          : x === qadim
                            ? "is-half"
                            : undefined
                      }
                    >
                      <td>
                        {GREG_MONTHS_AR[x.m - 1]} {x.y}
                      </td>
                      <td>{miladiNass(x.d)}</td>
                      <td>{hijriNass(x.d)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="date-calc-note">
              القاعدة: يوم 27 من الشهر الميلادي؛ الجمعة ← الخميس قبله، السبت ←
              الأحد بعده. قد يُقدَّم الصرف بأمر ملكي.
            </p>
            <SaIshtirak />
          </div>
        }
        related={{ title: T.related, links: SA_ROWABIT }}
        tocTitle={T.toc}
        tocItems={[{ id: "faq", label: T.faq }]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <p>
          تعتمد مواعيد الصرف على قرار مجلس الوزراء بربط صرف رواتب موظفي الدولة
          بالتقويم الميلادي في يوم 27 من كل شهر. تنشر وزارة المالية جدول الصرف
          السنوي. لمعرفة الإجازات الرسمية القادمة راجع{" "}
          <Link href="/ar/occasions">المناسبات</Link>، ولحساب مستحقاتك عند ترك
          العمل استخدم{" "}
          <Link href="/ar/end-of-service-calculator">
            حاسبة مكافأة نهاية الخدمة
          </Link>
          .
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /ar/school-calendar -------------------------------------------------------- */

export function SaTaqwimDirasi() {
  const a = AAM_HALI;
  const yawm = riyadhYawm();
  const hadath = ahdath(a);
  const qadima = ijazaQadima(a, yawm);
  const jariya =
    qadima && qadima.ila && diffDays(qadima.min, yawm) >= 0 ? qadima : null;
  const f1 = nihayatFasl1(a);
  const ayyam1 = adadAyyam(a, a.bidaya, f1);
  const ayyam2 = adadAyyam(a, a.fasl2, a.nihaya);
  const baqiya =
    diffDays(yawm, a.nihaya) >= 0
      ? adadAyyam(a, diffDays(a.bidaya, yawm) > 0 ? yawm : a.bidaya, a.nihaya)
      : 0;
  const dirasi = new Set<string>();
  for (let d = a.bidaya; diffDays(d, a.nihaya) >= 0; d = addDaysYmd(d, 1))
    if (yawmDirasi(a, d)) dirasi.add(ymdKey(d));
  const h0 = gregorianToHijri(a.bidaya);
  const h1 = gregorianToHijri(a.nihaya);
  const ashhur: Array<{ hy: number; hm: number }> = [];
  for (
    let i = h0.year * 12 + h0.month - 1;
    i <= h1.year * 12 + h1.month - 1;
    i++
  )
    ashhur.push({ hy: Math.floor(i / 12), hm: (i % 12) + 1 });
  const mudda = (h: { min: YMD; ila?: YMD }) =>
    h.ila ? diffDays(h.min, h.ila) + 1 : 0;
  const faq: FaqItem[] = [
    {
      question: `متى يبدأ العام الدراسي ${a.hijri}؟`,
      answer: `تبدأ الدراسة يوم ${miladiNass(a.bidaya)} (${hijriNass(a.bidaya)})، وفي مكة المكرمة والمدينة المنورة وجدة والطائف يوم ${miladiNass(a.bidayaGharbiya)} (${hijriNass(a.bidayaGharbiya)}).`,
    },
    {
      question: `متى يبدأ الفصل الدراسي الثاني ${a.hijri}؟`,
      answer: `يبدأ الفصل الدراسي الثاني يوم ${miladiNass(a.fasl2)} (${hijriNass(a.fasl2)}) بعد إجازة منتصف العام.`,
    },
    {
      question: `متى إجازة نهاية العام الدراسي ${a.hijri}؟`,
      answer: `آخر يوم دراسي ${miladiNass(a.nihaya)} (${hijriNass(a.nihaya)})، وتبدأ إجازة نهاية العام بعد نهاية دوام ذلك اليوم.`,
    },
    {
      question: "كم عدد الأيام الدراسية في العام؟",
      answer: `بعد استبعاد عطلة نهاية الأسبوع (الجمعة والسبت) والإجازات: ${ayyam1} يومًا دراسيًا في الفصل الأول و${ayyam2} يومًا في الفصل الثاني، أي ${ayyam1 + ayyam2} يومًا (حسب تقويم المناطق التي تبدأ فيها الدراسة ${qasir(a.bidaya)}).`,
    },
    {
      question: "كم مدة إجازة عيد الفطر وعيد الأضحى في المدارس؟",
      answer: hadath
        .filter((h) => h.id === "eid-al-fitr" || h.id === "eid-al-adha")
        .map(
          (h) =>
            `${h.ism}: ${adadAr(mudda(h), "yawm")} من ${miladiNass(h.min)} إلى ${miladiNass(h.ila!)}، والعودة ${miladiNass(h.awda!)}`,
        )
        .join(". "),
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "التقويم الدراسي" }]}
        crumbLabel={T.crumb}
        title={`التقويم الدراسي ${a.hijri}`}
        intro={`التقويم الدراسي للتعليم العام في السعودية ${a.ism} بنظام الفصلين: بداية الدراسة، الإجازات، بداية الفصل الثاني ونهاية العام، مع العد التنازلي للإجازة القادمة.`}
        tool={
          <div className="date-calc">
            <article className="takvim-kart">
              <TakvimGorsel gorsel="madrasa" size={112} title="المدرسة" />
              <div>
                <span className="takvim-kat kat-okul">
                  {jariya ? "الآن" : "الإجازة القادمة"}
                </span>
                {jariya ? (
                  <>
                    <h2>{jariya.ism}</h2>
                    <p>
                      العودة للدراسة {miladiNass(jariya.awda!)} ·{" "}
                      {baqi(diffDays(yawm, jariya.awda!))}
                    </p>
                  </>
                ) : qadima ? (
                  <>
                    <h2>{qadima.ism}</h2>
                    <p>
                      {miladiNass(qadima.min)} · {hijriNass(qadima.min)} ·{" "}
                      {baqi(diffDays(yawm, qadima.min))}
                    </p>
                  </>
                ) : (
                  <h2>انتهى العام الدراسي {a.hijri}</h2>
                )}
                <p className="takvim-kart-alt">
                  {hadath
                    .filter(
                      (h) => h.id !== qadima?.id && diffDays(yawm, h.min) > 0,
                    )
                    .slice(0, 3)
                    .map((h) => (
                      <span key={h.id} className="takvim-etiket">
                        {h.ism}: {baqi(diffDays(yawm, h.min))}
                      </span>
                    ))}
                </p>
              </div>
            </article>
            <div className="date-calc-results">
              <div className="date-calc-stat">
                <span>الأيام الدراسية المتبقية</span>
                <strong>{baqiya} يومًا</strong>
                <em>حتى إجازة نهاية العام (بدون الإجازات وعطلة الأسبوع)</em>
              </div>
              <div className="date-calc-stat">
                <span>الفصل الأول</span>
                <strong>{ayyam1} يومًا دراسيًا</strong>
                <em>
                  {qasir(a.bidaya)} – {qasir(f1)}
                </em>
              </div>
              <div className="date-calc-stat">
                <span>الفصل الثاني</span>
                <strong>{ayyam2} يومًا دراسيًا</strong>
                <em>
                  {qasir(a.fasl2)} – {qasir(a.nihaya)}
                </em>
              </div>
            </div>
            <div className="holiday-table-wrap">
              <table className="holiday-table">
                <thead>
                  <tr>
                    <th scope="col">الحدث</th>
                    <th scope="col">من</th>
                    <th scope="col">إلى</th>
                    <th scope="col">العودة</th>
                  </tr>
                </thead>
                <tbody>
                  {hadath.map((h) => (
                    <tr
                      key={h.id}
                      className={
                        diffDays(yawm, h.ila ?? h.min) < 0
                          ? "is-weekend"
                          : h.id === qadima?.id
                            ? "is-half"
                            : undefined
                      }
                    >
                      <th scope="row">
                        {h.ism}
                        {h.ila ? ` (${adadAr(mudda(h), "yawm")})` : ""}
                      </th>
                      <td>
                        {miladiNass(h.min)}
                        <br />
                        <small>{hijriNass(h.min)}</small>
                      </td>
                      <td>
                        {h.ila ? (
                          <>
                            {miladiNass(h.ila)}
                            <br />
                            <small>{hijriNass(h.ila)}</small>
                          </>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{h.awda ? miladiNass(h.awda) : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="date-calc-note">
              تبدأ الدراسة في مكة المكرمة والمدينة المنورة وجدة والطائف بعد
              أسبوع، يوم {miladiNass(a.bidayaGharbiya)}، مراعاةً لمواسم الحج
              والعمرة. المصدر: {a.masdar}. قد تُعلن إدارات التعليم تعديلات
              محلية.
            </p>
            <div className="holiday-calendar takvim-yil">
              {ashhur.map((x) => (
                <div className="holiday-month" key={`${x.hy}-${x.hm}`}>
                  <h3>
                    {SA_HIJRI_SANAWAT.includes(x.hy) ? (
                      <Link
                        href={saHijriShahrPath(x.hy, x.hm)}
                        prefetch={false}
                      >
                        {HIJRI_MONTHS_AR[x.hm - 1]} {x.hy}
                      </Link>
                    ) : (
                      `${HIJRI_MONTHS_AR[x.hm - 1]} ${x.hy}`
                    )}
                  </h3>
                  <SaShahrGrid
                    hy={x.hy}
                    hm={x.hm}
                    yawm={yawm}
                    dirasi={dirasi}
                  />
                </div>
              ))}
            </div>
            <p className="holiday-legend">
              <span className="takvim-lejant-okul" /> يوم دراسي{" "}
              <span className="is-holiday" /> إجازة رسمية{" "}
              <span className="is-weekend" /> عطلة نهاية الأسبوع · الرقم الكبير
              هجري والصغير ميلادي
            </p>
          </div>
        }
        related={{
          title: T.related,
          links: SA_ROWABIT.filter((l) => l.href !== "/ar/school-calendar"),
        }}
        tocTitle={T.toc}
        tocItems={[{ id: "faq", label: T.faq }]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <p>
          عادت المدارس في المملكة إلى نظام الفصلين الدراسيين بدءًا من العام
          1447هـ بعد موافقة مجلس الوزراء، واعتمدت وزارة التعليم التقويم لعدة
          أعوام مقبلة. تتضمن الإجازات: اليوم الوطني، الخريف، منتصف العام، يوم
          التأسيس، وعيدي الفطر والأضحى. لمواعيد المناسبات الرسمية راجع{" "}
          <Link href="/ar/occasions">المناسبات</Link>، وللتاريخ الهجري اليوم
          راجع <Link href="/ar/calendar">التقويم الهجري</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* /ar/hijri-age-calculator --------------------------------------------------- */

/** السنة الميلادية 365.2425 يومًا والهجرية (الوسطية) 354.367 يومًا. */
const NISBA = 365.2425 / 354.367;

export function SaUmrHijriSafha() {
  const yawm = riyadhYawm();
  const h = gregorianToHijri(yawm);
  const amthila = [7, 15, 18, 21, 30, 40, 50, 60, 65];
  const faq: FaqItem[] = [
    {
      question: "كيف أحسب عمري بالهجري؟",
      answer:
        "اختر تقويم تاريخ ميلادك (هجري أو ميلادي) وأدخل اليوم والشهر والسنة. تحوّل الحاسبة التاريخ حسب تقويم أم القرى ثم تعد السنوات والأشهر والأيام الهجرية الكاملة حتى اليوم أو حتى التاريخ الذي تختاره.",
    },
    {
      question: "لماذا العمر بالهجري أكبر من العمر بالميلادي؟",
      answer:
        "لأن السنة الهجرية القمرية 354 أو 355 يومًا بينما السنة الميلادية 365 أو 366 يومًا، فالفرق نحو 11 يومًا كل سنة، أي سنة هجرية إضافية تقريبًا كل 33 سنة ميلادية.",
    },
    {
      question: "ما التقويم الذي تعتمد عليه الحاسبة؟",
      answer:
        "تقويم أم القرى، وهو التقويم الهجري الرسمي في المملكة العربية السعودية. قد يختلف تاريخ هجري قديم مسجل برؤية الهلال بيوم واحد عن أم القرى.",
    },
    {
      question: "ماذا لو كان يوم ميلادي 30 من شهر هجري؟",
      answer:
        "الشهر الهجري 29 أو 30 يومًا. في السنوات التي يكون فيها شهر ميلادك 29 يومًا تحتسب الحاسبة عيد ميلادك الهجري في آخر يوم من الشهر.",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "حساب العمر بالهجري" }]}
        crumbLabel={T.crumb}
        title="حساب العمر بالهجري والميلادي"
        intro="احسب عمرك بالهجري والميلادي بالسنوات والأشهر والأيام حسب تقويم أم القرى، مع عدد الأيام التي عشتها وموعد عيد ميلادك الهجري القادم."
        tool={<SaUmrHijri yawm={yawm} />}
        related={{
          title: T.related,
          links: [
            { href: "/ar/age-calculator", label: "حاسبة العمر (ميلادي)" },
            ...SA_ROWABIT.filter((l) => l.href !== "/ar/hijri-age-calculator"),
          ],
        }}
        tocTitle={T.toc}
        tocItems={[
          { id: "jadwal", label: "العمر الميلادي وما يقابله بالهجري" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="jadwal">العمر الميلادي وما يقابله بالهجري</h2>
        <p>
          قيم تقريبية؛ العمر الدقيق يعتمد على تاريخ الميلاد. اليوم{" "}
          {hijriNass(yawm)} ({miladiNass(yawm, false)}).
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">العمر بالميلادي</th>
                <th scope="col">العمر بالهجري تقريبًا</th>
                <th scope="col">مواليد سنة (هجري)</th>
              </tr>
            </thead>
            <tbody>
              {amthila.map((n) => {
                const hijri = n * NISBA;
                const s = Math.floor(hijri);
                const ash = Math.floor((hijri - s) * 12);
                return (
                  <tr key={n}>
                    <th scope="row">{adadAr(n, "sana")}</th>
                    <td>
                      {adadAr(s, "sana")}
                      {ash ? ` و${adadAr(ash, "shahr")}` : ""}
                    </td>
                    <td>
                      {h.year - s - 1}–{h.year - s}هـ
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>
          لتحويل أي تاريخ بين التقويمين استخدم{" "}
          <Link href="/ar/hijri-date-converter">
            محول التاريخ الهجري الميلادي
          </Link>
          ، ولمعرفة التاريخ الهجري اليوم راجع{" "}
          <Link href="/ar/calendar">التقويم الهجري</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
