import Link from "next/link";
import RingSizeConverter from "../../components/RingSizeConverter";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "محول مقاسات الخواتم",
  description:
    "حوّل مقاسات الخواتم بين القطر بالملليمتر والمحيط الأوروبي وUS وUK، مع جدول المقاسات القياسي المستخدم عالميا.",
  path: "/ar/ring-size-converter",
  turkishPath: "/yuzuk-olcusu-cevirici",
  englishPath: "/en/ring-size-converter",
  germanPath: "/de/ringgroessen-umrechner",
});

export default function ArabicRingSizePage() {
  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار التنقل">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>محول مقاسات الخواتم</span>
        </nav>

        <header className="all-conversions-header">
          <h1>محول مقاسات الخواتم</h1>

          <p>
            أدخل المقاس الذي تعرفه مسبقا لتعرض مباشرة القطر بالملليمتر
            والمحيط الأوروبي ومقاسات US وUK المطابقة. وعلى عكس
            الأحذية، مقاسات الخواتم تعتمد غالبا على جدول موحد في سوق
            المجوهرات، لذلك تكون المقارنة أكثر استقرارا بين البلدان.
          </p>
        </header>

        <RingSizeConverter locale="ar" />

        <section className="category-article-content">
          <h2>كيف يتم تحديد مقاس الخاتم؟</h2>
          <p>
            أدق طريقة هي قياس القطر الداخلي للخاتم بالملليمتر. النظام
            الأوروبي يستخدم المحيط الداخلي مباشرة، والانتقال بين القطر
            والمحيط حسابيا ثابت لأن المحيط يساوي القطر مضروبا في π.
          </p>
          <p>
            أما أنظمة US وUK فتعتمد سلالم أسماء مختلفة، ولهذا يفيد
            جدول المقارنة في الوصول إلى المقاس المكافئ بسرعة بدون
            تخمين.
          </p>
          <p>
            إذا كان لديك خاتم مناسب بالفعل، فقس قطره الداخلي ثم اختر
            أقرب قيمة ضمن خانة القطر لتحصل على أفضل تطابق.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>لغات أخرى</h2>
          <Link
            className="text-link"
            href="/yuzuk-olcusu-cevirici"
            hrefLang="tr"
          >
            عرض النسخة التركية
          </Link>
        </section>
      </div>
    </main>
  );
}
