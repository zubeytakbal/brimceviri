import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import { arabicStandaloneTools } from "../../i18n/arabicStandaloneTools";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "أدوات إضافية بالعربية",
  description:
    "استعرض الحاسبات والأدوات التي أصبحت متاحة بالعربية حاليا ضمن هذا القسم.",
  path: "/ar/other-conversions",
  turkishPath: "/diger-donusumler",
  englishPath: "/en/other-conversions",
  germanPath: "/de/weitere-umrechnungen",
});

export default function ArabicOtherConversionsPage() {
  return (
    <OtherCategoriesPage
      conversions={[]}
      categories={[]}
      locale="ar"
      alternateLink={{
        href: "/diger-donusumler",
        hrefLang: "tr",
        label: "عرض النسخة التركية الكاملة",
      }}
      tools={arabicStandaloneTools.map((tool) => ({
        id: tool.slug,
        href: tool.arabicPath,
        title: tool.title,
        description: tool.cardDescription,
        iconName: tool.iconName,
      }))}
    >
      <section className="category-article-content">
        <h2>دليل سريع للأدوات</h2>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th>المجال</th>
                <th>الأدوات</th>
                <th>مثال</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>البناء والتشطيب</td>
                <td>الطلاء، البلاط، الطوب</td>
                <td>أرضية 20 م² ببلاط 60 × 60 سم مع هدر 10% تحتاج 62 بلاطة</td>
              </tr>
              <tr>
                <td>المال</td>
                <td>ضريبة القيمة المضافة</td>
                <td>115 ريالًا شاملة 15% = 100 ريال + 15 ريال ضريبة</td>
              </tr>
              <tr>
                <td>الطاقة في المنزل</td>
                <td>سعة المكيف، استهلاك الكهرباء</td>
                <td>مكيف 1.5 كيلوواط × 8 ساعات × 30 يومًا = 360 كيلوواط ساعة</td>
              </tr>
              <tr>
                <td>الصحة والحياة اليومية</td>
                <td>مؤشر كتلة الجسم، أسابيع الحمل، النوم، العمر</td>
                <td>70 كغ و1.75 م ← مؤشر كتلة الجسم 22.9</td>
              </tr>
              <tr>
                <td>الرياضة</td>
                <td>وتيرة الجري</td>
                <td>5:00 دقائق لكل كم = 12 كم/س</td>
              </tr>
              <tr>
                <td>تقريب الأرقام</td>
                <td>مقارنة الأطوال والأوزان</td>
                <td>طن واحد ≈ 14 شخصًا بالغًا</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          تعمل جميع الأدوات بالوحدات المترية (المتر والكيلوغرام والواط)، وتُجرى الحسابات داخل متصفحك دون إرسال القيم إلى أي خادم.
          كل صفحة تشرح المعادلة المستخدمة وتعرض مثالًا محسوبًا يمكنك التحقق منه يدويًا، مع التنبيه إلى حدود التقدير عندما تكون
          النتيجة تقريبية، كما في سعة المكيف أو كمية الطلاء.
        </p>
      </section>
    </OtherCategoriesPage>
  );
}
