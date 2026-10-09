import Link from "@/app/components/SiteLink";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "الحاسبات الهندسية",
  description:
    "مدخل عربي منظم للحاسبات الهندسية داخل الموقع، يشمل الكهرباء والضغط والموائع وانتقال الحرارة وروابط الوحدات التقنية المرتبطة.",
  path: "/ar/engineering-calculators",
  turkishPath: "/muhendislik-hesaplayicilari",
  englishPath: "/en/engineering-calculators",
  germanPath: "/de/ingenieurrechner",
});

const pressureAndFluidLinks = [
  {
    href: "/ar/calculators/pressure-force-area",
    title: "الضغط والقوة والمساحة",
    description: "استخدم العلاقة P = F / A للحساب بين الضغط والقوة والمساحة.",
  },
  {
    href: "/ar/calculators/hydrostatic-pressure",
    title: "الضغط الهيدروستاتيكي",
    description: "احسب فرق الضغط من الكثافة والعمق والجاذبية.",
  },
  {
    href: "/ar/calculators/reynolds-number",
    title: "عدد رينولدز",
    description: "قدّر نمط الجريان من السرعة واللزوجة والقطر والكثافة.",
  },
];

const heatTransferLinks = [
  {
    href: "/ar/calculators/heat-energy",
    title: "طاقة الحرارة",
    description: "احسب Q = m × c × ΔT لمقارنات التسخين والتبريد.",
  },
  {
    href: "/ar/calculators/heat-conduction",
    title: "التوصيل الحراري",
    description: "قارن معدل انتقال الحرارة عبر المواد والسماكات المختلفة.",
  },
];

const electricalLinks = [
  {
    href: "/ar/engineering-calculators/electrical-calculators",
    title: "مركز الحاسبات الكهربائية",
    description: "المدخل العربي المنظم لحسابات الكهرباء داخل الموقع.",
  },
  {
    href: "/ar/calculators/ohms-law",
    title: "حاسبة قانون أوم",
    description: "احسب الجهد أو التيار أو المقاومة باستخدام V = I × R.",
  },
];

export default function ArabicEngineeringHubPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "الحاسبات الهندسية" },
      ]}
      title="الحاسبات الهندسية"
      description="هذه الصفحة تجمع أهم المسارات الهندسية في الموقع بطريقة أوضح: تبدأ باختيار المجال، ثم تنتقل إلى الحاسبة أو المرجع الأنسب."
      alternateLink={{
        href: "/muhendislik-hesaplayicilari",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
      sections={[
        {
          heading: "كيف تستخدم هذا القسم؟",
          content: (
            <>
              <p>
                بدلا من وضع كل الحاسبات في قائمة واحدة طويلة، يجمع
                هذا القسم الأدوات بحسب المجال الهندسي: كهرباء،
                ضغط وموائع، وانتقال حرارة.
              </p>
              <p>
                كل حاسبة تعرض المعادلة المستخدمة ووحدات الإدخال ومثالًا
                محسوبًا، وتنبّه إلى حدود التقدير، لأن النتائج الهندسية
                تحتاج دائمًا إلى مراجعة المعايير المحلية قبل التنفيذ.
              </p>
            </>
          ),
        },
        {
          heading: "الكهرباء",
          content: (
            <ul className="related-conversion-list">
              {electricalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" - "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "الضغط والموائع",
          content: (
            <ul className="related-conversion-list">
              {pressureAndFluidLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" - "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "انتقال الحرارة",
          content: (
            <ul className="related-conversion-list">
              {heatTransferLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.title}</strong>
                    {" - "}
                    {item.description}
                  </Link>
                </li>
              ))}
            </ul>
          ),
        },
        {
          heading: "مراجع مرتبطة",
          content: (
            <ul className="related-conversion-list">
              <li>
                <Link href="/ar/categories">الفئات ومعجم الوحدات</Link>
              </li>
              <li>
                <Link href="/ar/categories/pressure#pascal">دليل الباسكال</Link>
              </li>
              <li>
                <Link href="/ar/categories/length#meter">دليل المتر</Link>
              </li>
              <li>
                <Link href="/ar/categories/mass#kilogram">دليل الكيلوغرام</Link>
              </li>
            </ul>
          ),
        },
        {
          heading: "أمثلة سريعة من المجالات الثلاثة",
          content: (
            <div className="conversion-table-wrap">
              <table className="conversion-table">
                <thead>
                  <tr>
                    <th>المجال</th>
                    <th>المعادلة</th>
                    <th>مثال</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>الكهرباء</td>
                    <td>التيار = القدرة ÷ الجهد</td>
                    <td>سخان 2,000 واط على 230 فولت يسحب نحو 8.7 أمبير</td>
                  </tr>
                  <tr>
                    <td>الضغط</td>
                    <td>1 بار = 100 كيلوباسكال</td>
                    <td>ضغط 2.5 بار = 250 كيلوباسكال ≈ 36.3 رطل/بوصة²</td>
                  </tr>
                  <tr>
                    <td>انتقال الحرارة</td>
                    <td>Q = U × A × ΔT</td>
                    <td>جدار 10 م² بمعامل 0.5 واط/م²·ك وفرق 20 درجة يفقد 100 واط</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ),
        },
      ]}
    />
  );
}
