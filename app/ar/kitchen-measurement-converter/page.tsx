import Link from "next/link";
import KitchenMeasuresConverter from "../../components/KitchenMeasuresConverter";
import { kitchenIngredientLabels } from "../../converter/kitchenIngredientLabels";
import { kitchenIngredientRows } from "../../converter/kitchenMeasures";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "محول مقاييس المطبخ",
  description:
    "حوّل الأكواب والملاعق والغرامات والملليلترات حسب نوع المكون، مع قيم تقريبية للدقيق والسكر والأرز والعسل والزبدة وغيرها.",
  path: "/ar/kitchen-measurement-converter",
  turkishPath: "/mutfak-olculeri-cevirici",
  englishPath: "/en/kitchen-measurement-converter",
  germanPath: "/de/kuechenmass-umrechner",
});

export default function ArabicKitchenMeasurementsPage() {
  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار التنقل">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>محول مقاييس المطبخ</span>
        </nav>

        <header className="all-conversions-header">
          <h1>محول مقاييس المطبخ</h1>

          <p>
            اختر المكون والوحدة التي تعرفها لتعرض فورا القيم المكافئة
            بالكوب والملعقة الكبيرة والملعقة الصغيرة والغرام والملليلتر
            واللتر. كل مكون يملك كثافة مختلفة، لذلك يتم الحساب بقيم
            منفصلة للدقيق والسكر والأرز والعسل والزبدة وغيرها.
          </p>
        </header>

        <KitchenMeasuresConverter locale="ar" />

        <section className="category-article-content">
          <h2>كم غراما يوجد في كوب دقيق أو ملعقة سكر؟</h2>
          <p>
            لا توجد قاعدة واحدة تصلح لكل شيء، لأن الكوب يقيس الحجم
            بينما الغرام يقيس الوزن. كوب الدقيق أخف من كوب السكر،
            والعسل أثقل من الاثنين، لذلك يختلف التحويل حسب كثافة
            المادة نفسها.
          </p>
          <p>
            القيم هنا متوسطات عملية مناسبة للطبخ اليومي. قد يتغير
            الوزن النهائي قليلا بحسب طريقة التعبئة أو النخل أو نوع
            المنتج، لكن النتيجة تظل مفيدة جدا للاستخدام المنزلي.
          </p>

          <h2>جدول المقادير الشائعة (1 كوب = 200 مل)</h2>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <caption>الغرامات التقريبية لكل كوب وملعقة كبيرة وملعقة صغيرة</caption>
              <thead>
                <tr>
                  <th scope="col">المكون</th>
                  <th scope="col">1 كوب</th>
                  <th scope="col">1 ملعقة كبيرة</th>
                  <th scope="col">1 ملعقة صغيرة</th>
                </tr>
              </thead>
              <tbody>
                {kitchenIngredientRows.map((row) => (
                  <tr key={row.key}>
                    <td>{kitchenIngredientLabels.ar[row.key]}</td>
                    <td>{Math.round(row.gramsPerBardak)} غ</td>
                    <td>{Math.round((row.gramsPerBardak * 15) / 200)} غ</td>
                    <td>{Math.round((row.gramsPerBardak * 5) / 200)} غ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>أسئلة شائعة</h2>
          <p>
            <strong>كم ملليلتر في الملعقة الكبيرة؟</strong>
            <br />
            الملعقة الكبيرة تساوي 15 ملليلتر، أي 3 ملاعق صغيرة. أما
            الكوب المستخدم هنا فيساوي 200 ملليلتر.
          </p>
          <p>
            <strong>لماذا يتغير وزن الكوب بين مكون وآخر؟</strong>
            <br />
            لأن الحجم ثابت لكن الكثافة تختلف. المكونات الخفيفة مثل
            الدقيق تعطي وزنا أقل من المكونات الثقيلة مثل العسل عند
            نفس الحجم.
          </p>
          <p>
            إذا أردت تكبير وصفة كاملة أو تصغيرها دفعة واحدة، جرّب{" "}
            <Link href="/ar/recipe-converter">محول الوصفات</Link>.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>لغات أخرى</h2>
          <Link
            className="text-link"
            href="/mutfak-olculeri-cevirici"
            hrefLang="tr"
          >
            عرض النسخة التركية
          </Link>
        </section>
      </div>
    </main>
  );
}
