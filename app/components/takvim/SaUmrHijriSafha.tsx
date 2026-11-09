// حساب العمر بالهجري (/ar/hijri-age-calculator). Takvim bölümü kaldırıldığında SaSafahat.tsx'ten ayrıldı.
import Link from "@/app/components/SiteLink";
import { adadAr, hijriNass, miladiNass, riyadhYawm } from "../../converter/calendar/saTaqwim";
import type { FaqItem } from "../../converter/faqSchema";
import { gregorianToHijri } from "../../converter/time/calendars";
import TimeToolPage from "../time/TimeToolPage";
import SaUmrHijri from "./SaUmrHijri";

const T = { crumb: "مسار التنقل", related: "قد يهمك أيضًا", toc: "المحتويات", faq: "الأسئلة الشائعة" };
const RAISIYA = { href: "/ar", label: "الرئيسية" };
const SA_ROWABIT = [
  { href: "/ar/hijri-date-converter", label: "تحويل التاريخ هجري ميلادي" },
  { href: "/ar/prayer-times-calculator", label: "مواقيت الصلاة" },
  { href: "/ar/hijri-age-calculator", label: "حساب العمر بالهجري" },
  { href: "/ar/zakat-calculator", label: "حاسبة الزكاة" },
];
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
        crumbs={[RAISIYA, { label: "حساب العمر بالهجري" }]}
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
          .
        </p>
      </TimeToolPage>
    </div>
  );
}
