import Link from "@/app/components/SiteLink";
import { adadAr, riyadhYawm } from "../../converter/calendar/saTaqwim";
import type { FaqItem } from "../../converter/faqSchema";
import {
  nisbatIstihqaq,
  type SababInhaa,
} from "../../converter/saNihayatKhidma";
import TimeToolPage from "../time/TimeToolPage";
import SaNihayatKhidma from "./SaNihayatKhidma";

const AJR = 10000;
const AMTHILA = [1, 3, 5, 7, 10, 15, 20];

const mablagh = (s: number, sabab: SababInhaa) =>
  (Math.min(s, 5) * (AJR / 2) + Math.max(s - 5, 0) * AJR) *
  nisbatIstihqaq(sabab, s);
const riyal = (n: number) =>
  `${Math.round(n).toLocaleString("ar-SA-u-nu-latn")} ريال`;

/* /ar/end-of-service-calculator */
export function SaNihayatKhidmaSafha() {
  const yawm = riyadhYawm();
  const faq: FaqItem[] = [
    {
      question: "كيف تحسب مكافأة نهاية الخدمة في نظام العمل السعودي؟",
      answer:
        "نصف أجر شهر عن كل سنة من السنوات الخمس الأولى، وأجر شهر كامل عن كل سنة بعدها، ويستحق العامل عن أجزاء السنة بنسبة ما قضاه منها. يتخذ الأجر الأخير أساسًا للحساب (المادة 84).",
    },
    {
      question: "كم أستحق من مكافأة نهاية الخدمة إذا استقلت؟",
      answer:
        "إذا كانت الخدمة أقل من سنتين فلا مكافأة، ومن سنتين إلى خمس سنوات ثلث المكافأة، وأكثر من خمس وأقل من عشر ثلثاها، وعشر سنوات فأكثر المكافأة كاملة (المادة 85).",
    },
    {
      question: "متى أستحق المكافأة كاملة رغم الاستقالة؟",
      answer:
        "إذا ترك العامل العمل لقوة قاهرة خارجة عن إرادته، أو أنهت العاملة العقد خلال ستة أشهر من عقد زواجها أو ثلاثة أشهر من وضعها (المادة 87)، أو ترك العامل العمل بسبب إخلال صاحب العمل بالتزاماته وفق المادة 81.",
    },
    {
      question: "هل يدخل بدل السكن في حساب المكافأة؟",
      answer:
        "تحسب المكافأة على الأجر الفعلي الأخير، وهو الأجر الأساسي مضافًا إليه البدلات الثابتة المقررة كبدل السكن والنقل، ما لم ينص العقد على ما هو أفضل للعامل.",
    },
    {
      question: "كم مكافأة نهاية الخدمة لراتب 10,000 ريال و7 سنوات؟",
      answer: `عند انتهاء العقد أو الإنهاء من صاحب العمل: 5 × 5,000 + 2 × 10,000 = ${riyal(mablagh(7, "inhaa"))}. وعند الاستقالة يستحق الثلثين: ${riyal(mablagh(7, "istiqala"))}.`,
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[
          { href: "/ar", label: "الرئيسية" },
          { label: "حساب مكافأة نهاية الخدمة" },
        ]}
        crumbLabel="مسار التنقل"
        title="حساب مكافأة نهاية الخدمة"
        intro="احسب مكافأة نهاية الخدمة للقطاع الخاص وفق نظام العمل السعودي: أدخل تاريخ بداية العمل ونهايته والأجر وسبب انتهاء العلاقة التعاقدية (انتهاء العقد، استقالة، أو غيرها)."
        tool={<SaNihayatKhidma yawm={yawm} />}
        related={{
          title: "قد يهمك أيضًا",
          links: [
            { href: "/ar/salary-dates", label: "مواعيد صرف الرواتب" },
            { href: "/ar/occasions", label: "الإجازات الرسمية في السعودية" },
            { href: "/ar/calendar", label: "التقويم الهجري والميلادي" },
            { href: "/ar/hijri-age-calculator", label: "حساب العمر بالهجري" },
            { href: "/ar/zakat-calculator", label: "حاسبة الزكاة" },
            { href: "/ar/vat-calculator", label: "حاسبة ضريبة القيمة المضافة" },
          ],
        }}
        tocTitle="المحتويات"
        tocItems={[
          { id: "amthila", label: "أمثلة لراتب 10,000 ريال" },
          { id: "faq", label: "الأسئلة الشائعة" },
        ]}
        faqTitle="الأسئلة الشائعة"
        faqItems={faq}
      >
        <h2 id="amthila">أمثلة لراتب 10,000 ريال</h2>
        <p>
          المكافأة حسب مدة الخدمة وسبب انتهاء العلاقة، على أجر فعلي شهري قدره
          10,000 ريال:
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">مدة الخدمة</th>
                <th scope="col">انتهاء العقد أو الإنهاء من صاحب العمل</th>
                <th scope="col">الاستقالة</th>
              </tr>
            </thead>
            <tbody>
              {AMTHILA.map((s) => (
                <tr key={s}>
                  <th scope="row">{adadAr(s, "sana")}</th>
                  <td>{riyal(mablagh(s, "inhaa"))}</td>
                  <td>{riyal(mablagh(s, "istiqala"))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          لا تشمل المكافأة الأجر المستحق عن آخر شهر ولا مقابل الإجازات السنوية
          غير المستخدمة، ولا التعويض عن إنهاء العقد لسبب غير مشروع (المادة 77).
          لمعرفة الإجازات الرسمية القادمة راجع{" "}
          <Link href="/ar/occasions">المناسبات</Link>، ولموعد نزول الراتب راجع{" "}
          <Link href="/ar/salary-dates">مواعيد صرف الرواتب</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
