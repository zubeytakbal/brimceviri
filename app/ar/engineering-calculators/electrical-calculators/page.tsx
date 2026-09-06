import Link from "next/link";
import StaticPageLayout from "../../../components/StaticPageLayout";
import { buildArabicMetadata } from "../../seo";

export const metadata = buildArabicMetadata({
  title: "الحاسبات الكهربائية",
  description:
    "قسم عربي منظم للحاسبات الكهربائية، يشمل حسابات القدرة والتيار وهبوط الجهد ومقاطع الكابلات والتيار التقريبي للمحركات.",
  path: "/ar/engineering-calculators/electrical-calculators",
  turkishPath: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
  englishPath: "/en/engineering-calculators/electrical-calculators",
  germanPath: "/de/ingenieurrechner/elektrorechner",
});

const electricalTools = [
  {
    href: "/ar/calculators/ohms-law",
    title: "قانون أوم",
    description: "أسرع أداة للتحقق من العلاقة بين الجهد والتيار والمقاومة.",
    formula: "V = I × R",
  },
  {
    href: "/ar/engineering-calculators/electrical-calculators/kw-to-ampere-calculator",
    title: "تحويل kW إلى أمبير",
    description: "قدّر التيار من القدرة والجهد ونوع النظام الكهربائي.",
    formula: "I = P / (V × cos φ)",
  },
  {
    href: "/ar/engineering-calculators/electrical-calculators/ampere-to-kw-calculator",
    title: "تحويل أمبير إلى kW",
    description: "احسب القدرة التقريبية انطلاقا من التيار والجهد.",
    formula: "P = V × I × cos φ",
  },
  {
    href: "/ar/engineering-calculators/electrical-calculators/cable-size-calculator",
    title: "مقطع الكابل",
    description: "اختر مقطع موصل مناسب بحسب التيار والطول وهبوط الجهد المسموح.",
    formula: "S ≈ k × I × L / ΔU",
  },
  {
    href: "/ar/engineering-calculators/electrical-calculators/voltage-drop-calculator",
    title: "هبوط الجهد",
    description: "افحص فقد الجهد على خط كهربائي محدد الطول والمقطع.",
    formula: "ΔU = I × R",
  },
  {
    href: "/ar/engineering-calculators/electrical-calculators/motor-current-calculator",
    title: "تيار المحرك",
    description: "قدّر تيار الحمل التقريبي للمحركات من القدرة والجهد والكفاءة.",
    formula: "I = P / (√3 × V × cos φ × η)",
  },
];

export default function ArabicElectricalHubPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { href: "/ar/engineering-calculators", label: "الحاسبات الهندسية" },
        { label: "الحاسبات الكهربائية" },
      ]}
      title="الحاسبات الكهربائية"
      description="هذا القسم يجمع أهم أدوات الكهرباء العملية في مسار واحد: من قانون أوم وحتى مقاطع الكابلات وهبوط الجهد وتقدير تيار المحرك."
      alternateLink={{
        href: "/muhendislik-hesaplayicilari/elektrik-hesaplari",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
      sections={[
        {
          heading: "ما الذي ستجده هنا؟",
          content: (
            <>
              <p>
                الفكرة من هذا القسم هي جمع الحاسبات الكهربائية التي
                تستخدم معا أثناء التصميم أو المراجعة الأولية في مكان
                واحد، بدلا من تشتيتها ضمن قائمة عامة.
              </p>
              <p>
                يمكنك البدء من قانون أوم للحالات البسيطة، ثم الانتقال
                إلى أدوات القدرة والتيار ومقاطع الكابلات وهبوط الجهد
                كلما أصبحت الحالة أكثر عملية.
              </p>
            </>
          ),
        },
        {
          heading: "الأدوات الكهربائية الأساسية",
          content: (
            <ul className="related-conversion-list">
              {electricalTools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href}>
                    <strong>{tool.title}</strong>
                    {" - "}
                    {tool.description}
                    {" - "}
                    {tool.formula}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "كيف تختار الأداة المناسبة؟",
          content: (
            <>
              <p>
                إذا كانت لديك قيمتان فقط في دائرة بسيطة، ابدأ بقانون
                أوم. وإذا كنت تعمل على تغذية أو خط حمل، فابدأ من
                أدوات القدرة والتيار أو مقطع الكابل وهبوط الجهد.
              </p>
              <p>
                وعند التعامل مع محرك، يكون تقدير تيار المحرك نقطة
                بداية مفيدة قبل اختيار الحماية أو دراسة الكابل.
              </p>
            </>
          ),
        },
        {
          heading: "روابط مرتبطة",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/ar/engineering-calculators">العودة إلى الحاسبات الهندسية</Link>
              </li>
              <li>
                <Link href="/ar/unit-guides/volt">دليل الفولت</Link>
              </li>
              <li>
                <Link href="/ar/unit-guides/ampere">دليل الأمبير</Link>
              </li>
              <li>
                <Link href="/ar/unit-guides/ohm">دليل الأوم</Link>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}
