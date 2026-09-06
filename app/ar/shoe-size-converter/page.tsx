import Link from "next/link";
import ShoeSizeConverter from "../../components/ShoeSizeConverter";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "محول مقاسات الأحذية",
  description:
    "حوّل مقاسات الأحذية بين الاتحاد الأوروبي وUS وUK، وقارن أيضا جداول Nike وAdidas وPuma وNew Balance وConverse.",
  path: "/ar/shoe-size-converter",
  turkishPath: "/ayakkabi-numarasi-cevirme",
  englishPath: "/en/shoe-size-converter",
  germanPath: "/de/schuhgroessen-umrechner",
});

export default function ArabicShoeSizePage() {
  return (
    <main className="all-conversions-page" lang="ar" dir="rtl">
      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="مسار التنقل">
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>محول مقاسات الأحذية</span>
        </nav>

        <header className="all-conversions-header">
          <h1>محول مقاسات الأحذية</h1>

          <p>
            أدخل المقاس الذي تعرفه مسبقا ثم اعرض فورا المقاسات المطابقة
            في أنظمة الاتحاد الأوروبي وUS وUK. كما تتوفر جداول منفصلة
            للرجال والنساء والأطفال الصغار والأطفال الأكبر سنا، مع
            مقارنات خاصة بعلامات Nike وAdidas وPuma وNew Balance وConverse.
          </p>
        </header>

        <ShoeSizeConverter locale="ar" />

        <section className="category-article-content">
          <h2>لماذا تختلف مقاسات الأحذية بين العلامات؟</h2>
          <p>
            مقاس الاتحاد الأوروبي ثابت نسبيا، لكن أنظمة US وUK تبني
            الأرقام على سلالم مختلفة. فوق ذلك، كل علامة تعتمد قالب
            تصنيع وشكل راحة مختلفا، لذلك قد يظهر طول القدم نفسه بمقاس
            مختلف أو بنصف درجة أعلى أو أقل من علامة إلى أخرى.
          </p>
          <p>
            أفضل نتيجة تكون عادة عند قياس طول القدم بالسنتيمتر ثم
            اختيار خيار طول القدم داخل الأداة. بهذه الطريقة تقل
            الفروقات الناتجة عن اختلاف أسماء المقاسات بين الأسواق.
          </p>
          <p>
            في مقاسات الأطفال يبدأ ترقيم US من جديد بعد 13.5، لذلك تم
            فصل جداول الأطفال الصغار عن جداول الأطفال الأكبر سنا حتى
            تكون المقارنة أوضح.
          </p>
        </section>

        <section className="conversion-section language-alternatives">
          <h2>لغات أخرى</h2>
          <Link
            className="text-link"
            href="/ayakkabi-numarasi-cevirme"
            hrefLang="tr"
          >
            عرض النسخة التركية
          </Link>
        </section>
      </div>
    </main>
  );
}
