import Link from "next/link";
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
