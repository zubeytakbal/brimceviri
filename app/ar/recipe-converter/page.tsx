import Link from "@/app/components/SiteLink";
import RecipeScalerConverter from "../../components/RecipeScalerConverter";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "محول الوصفات",
  description:
    "الصق وصفتك، اختر معامل التكبير أو التصغير، واحصل مباشرة على المقادير الجديدة مع تحويل تلقائي لبعض المكونات إلى الغرام.",
  path: "/ar/recipe-converter",
  turkishPath: "/tarif-cevirici",
  englishPath: "/en/recipe-converter",
  germanPath: "/de/rezept-umrechner",
});

// Wasfa mithal: al-maqadir li 4 ashkhas (tudrab fi 1.5).
const RECIPE: Array<[string, number, string]> = [
  ["دقيق", 2, "كوب"],
  ["سكر", 1, "كوب"],
  ["بيض", 3, "حبات"],
  ["حليب", 0.75, "كوب"],
  ["زبدة", 100, "غرام"],
  ["بيكنج باودر", 2, "ملعقة صغيرة"],
];

export default function ArabicRecipeConverterPage() {
  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار التنقل">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>محول الوصفات</span>
        </nav>

        <header className="all-conversions-header">
          <h1>محول الوصفات</h1>

          <p>
            الصق وصفتك سطرا سطرا، مثلا: &quot;2 كوب دقيق&quot;. بعد
            اختيار المعامل، يعيد الموقع حساب المقادير فورا. وإذا كان
            المكون معروفا ومكتوبا بوحدة مثل الكوب أو الملعقة، فستظهر
            أيضا قيمة تقريبية بالغرام.
          </p>
        </header>

        <RecipeScalerConverter locale="ar" />

        <section className="category-article-content">
          <h2>كيف تضاعف وصفة أو تقللها؟</h2>
          <p>
            الفكرة ببساطة هي ضرب كل كمية في نفس المعامل. إذا كانت
            الوصفة تكفي لشخصين وأردتها لأربعة، فالمعامل هو 2. هذه
            الأداة تنفذ ذلك تلقائيا لكل سطر يبدأ بكمية قابلة للقراءة،
            سواء كانت رقما صحيحا أو كسرا أو عددا عشريا.
          </p>
          <p>
            يمكنك أيضا إدخال عدد الحصص الأصلي وعدد الحصص المطلوب،
            وسيتم حساب المعامل تلقائيا بدون الحاجة إلى الحساب اليدوي.
          </p>

          <h2>لماذا لا يظهر الغرام في بعض السطور؟</h2>
          <p>
            يظهر التحويل إلى الغرام فقط عندما تتعرف الأداة على الوحدة
            وعلى اسم المكون معا. سطور مثل &quot;2 بيض&quot; ستتضاعف
            بشكل صحيح، لكنها لن تعرض غراما إضافيا لأن البيض ليس ضمن
            جدول التحويل الحجمي.
          </p>
          <p>
            للاطلاع على قائمة المكونات المدعومة، افتح{" "}
            <Link href="/ar/kitchen-measurement-converter">
              محول مقاييس المطبخ
            </Link>
            .
          </p>
        </section>

        <section className="category-article-content">
          <h2>مثال: كعكة لـ 4 أشخاص تصبح لـ 6</h2>
          <p>المعامل = 6 ÷ 4 = 1.5، فتُضرب كل كمية في 1.5:</p>
          <div className="conversion-table-wrap">
            <table className="conversion-table">
              <thead>
                <tr>
                  <th>المكوّن</th>
                  <th>لـ 4 أشخاص</th>
                  <th>لـ 6 أشخاص</th>
                </tr>
              </thead>
              <tbody>
                {RECIPE.map(([ism, kamiya, wahda]) => (
                  <tr key={ism}>
                    <td>{ism}</td>
                    <td>
                      {kamiya} {wahda}
                    </td>
                    <td>
                      {(kamiya * 1.5).toLocaleString("ar-EG-u-nu-latn", { maximumFractionDigits: 2 })} {wahda}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            الناتج 4.5 بيضات لا يمكن قياسه مباشرة؛ استخدم 4 بيضات كبيرة أو 5 صغيرة، أو أضف إلى 4 بيضات نحو 25 غرامًا من بيضة
            مخفوقة.
          </p>

          <h2>حجم الصينية ووقت الخبز</h2>
          <p>
            عند تكبير الوصفة يتغير حجم الصينية أيضًا. مساحة الصينية الدائرية تتناسب مع مربع القطر: الانتقال من قالب قطره 20 سم إلى
            قالب قطره 26 سم يزيد المساحة بنسبة (26 ÷ 20)² ≈ 1.69، أي أنه يناسب وصفة مضروبة في 1.7 تقريبًا بالارتفاع نفسه.
          </p>
          <p>
            وقت الخبز لا يتضاعف مع الكمية؛ ما يحدده هو سماكة العجين. إذا بقيت السماكة نفسها في صينية أكبر فالوقت يبقى قريبًا من
            الأصلي، أما إذا صار العجين أسمك فخفّض الحرارة قليلًا وأطل الوقت، وتحقق من النضج بعود خشبي.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>لغات أخرى</h2>
          <Link className="text-link" href="/tarif-cevirici" hrefLang="tr">
            عرض النسخة التركية
          </Link>
        </section>
      </div>
    </main>
  );
}
