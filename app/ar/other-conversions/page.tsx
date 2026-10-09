import OtherCategoriesPage from "../../components/OtherCategoriesPage";
import { arabicStandaloneTools } from "../../i18n/arabicStandaloneTools";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "أدوات إضافية بالعربية",
  description:
    "حاسبات عربية مجمعة حسب الغرض: البناء والتشطيب، الكهرباء والتكييف، الصحة والرياضة والنوم، التاريخ والمواقيت، الضريبة والمواريث، ومقارنات الأطوال والأوزان.",
  path: "/ar/other-conversions",
  turkishPath: "/diger-donusumler",
  englishPath: "/en/other-conversions",
  germanPath: "/de/weitere-umrechnungen",
});

const TOOL_GROUPS: Array<{ id: string; name: string; slugs: string[] }> = [
  {
    id: "building",
    name: "البناء والتشطيب",
    slugs: ["paint-calculator", "tile-calculator", "brick-calculator"],
  },
  {
    id: "home-energy",
    name: "الكهرباء والتكييف في المنزل",
    slugs: ["ac-btu-calculator", "electricity-consumption-calculator"],
  },
  {
    id: "health",
    name: "الصحة والرياضة والنوم",
    slugs: ["bmi-calculator", "pregnancy-week-calculator", "sleep-calculator", "running-pace-calculator"],
  },
  {
    id: "dates",
    name: "التاريخ والمواقيت",
    slugs: ["age-calculator", "hijri-date-converter", "prayer-times-calculator"],
  },
  {
    id: "money",
    name: "الضريبة والمواريث",
    slugs: ["vat-calculator", "faraid-calculator"],
  },
  {
    id: "comparisons",
    name: "مقارنات الأطوال والأوزان",
    slugs: ["length-comparison", "weight-comparison"],
  },
];

const groupBySlug = new Map(
  TOOL_GROUPS.flatMap((group) => group.slugs.map((slug) => [slug, group] as const)),
);

const groupedTools = [...arabicStandaloneTools].sort(
  (a, b) =>
    TOOL_GROUPS.indexOf(groupBySlug.get(a.slug)!) - TOOL_GROUPS.indexOf(groupBySlug.get(b.slug)!),
);

export default function ArabicOtherConversionsPage() {
  return (
    <OtherCategoriesPage
      conversions={[]}
      categories={[]}
      hideCategoryGrid
      locale="ar"
      alternateLink={{
        href: "/diger-donusumler",
        hrefLang: "tr",
        label: "عرض النسخة التركية الكاملة",
      }}
      tools={groupedTools.map((tool) => ({
        id: tool.slug,
        href: tool.arabicPath,
        title: tool.title,
        description: tool.cardDescription,
        iconName: tool.iconName,
        group: groupBySlug.get(tool.slug)?.name,
        groupId: groupBySlug.get(tool.slug)?.id,
      }))}
    >
      <section className="category-article-content">
        <h2>ماذا تجد في كل مجموعة؟</h2>
        <p>
          <strong>البناء والتشطيب:</strong> ثلاث حاسبات تحوّل أبعاد الغرفة أو الجدار إلى كمية
          مواد يمكن طلبها من المورد. حاسبة الطلاء تطرح الأبواب والنوافذ وتحسب اللترات حسب عدد
          الطبقات ومعدل التغطية، وحاسبة البلاط تعطي عدد القطع مع نسبة هدر للقص، وحاسبة الطوب
          تضيف سماكة المونة إلى مقاس الطوبة أو البلوك. كلها تقريبية وتفترض أسطحًا مستطيلة، فقسّم
          الغرف غير المنتظمة إلى أجزاء.
        </p>
        <p>
          <strong>الكهرباء والتكييف:</strong> حاسبة BTU تقدّر سعة المكيف من مساحة الغرفة وعدد
          الأشخاص والتعرض للشمس، وتعرض النتيجة بالمقاسات التجارية التي تباع بالطن في أسواق
          الخليج. أما حاسبة الاستهلاك فتحوّل قدرة أي جهاز وساعات تشغيله إلى كيلوواط ساعة، ثم إلى
          تكلفة إذا أدخلت سعر التعرفة من فاتورتك.
        </p>
        <p>
          <strong>الصحة والرياضة والنوم:</strong> مؤشر كتلة الجسم مع تقدير السعرات اليومية،
          وأسابيع الحمل وموعد الولادة المتوقع من تاريخ آخر دورة، وأوقات النوم المبنية على دورات
          مدتها نحو 90 دقيقة، ووتيرة الجري وأزمنة السباقات. هذه الأدوات للتقدير والتنظيم، ولا
          تحل محل الفحص الطبي.
        </p>
        <p>
          <strong>التاريخ والمواقيت:</strong> حساب العمر أو المدة بين تاريخين بالتقويم الميلادي،
          وتحويل التاريخ بين الهجري والميلادي، ومواقيت الصلاة واتجاه القبلة لأي مدينة.
        </p>
        <p>
          <strong>الضريبة والمواريث:</strong> فصل ضريبة القيمة المضافة عن السعر أو إضافتها إليه
          بنسب الخليج الشائعة أو بنسبة تختارها، وحساب أنصبة الورثة الأساسيين وفق أحكام الفرائض مع
          تنبيه للحالات التي تحتاج إلى مختص.
        </p>
        <p>
          <strong>المقارنات:</strong> تضع رقمًا مجردًا بجانب شيء مألوف، فتعرف أن 50 مترًا تعادل
          حوتين أزرقين، أو أن 2.5 طن تعادل نحو سيارة ركاب متوسطة وثلثيها.
        </p>

        <h2>أي أداة تناسب سؤالك؟</h2>
        <ul>
          <li>
            تشتري مواد لغرفة واحدة؟ ابدأ بحاسبة الطلاء للجدران، ثم البلاط للأرضية. الطوب يلزم
            فقط عند بناء جدار جديد أو قاطع.
          </li>
          <li>
            تختار مكيفًا جديدًا؟ احسب السعة أولًا بحاسبة BTU، ثم أدخل القدرة الكهربائية المكتوبة
            على ملصق الجهاز في حاسبة الاستهلاك لتعرف أثره على الفاتورة الشهرية.
          </li>
          <li>
            تريد معرفة عمرك بالهجري لا بالميلادي؟ حاسبة العمر هنا ميلادية؛ حوّل تاريخ الميلاد
            أولًا بمحول التاريخ الهجري أو استخدم حاسبة العمر بالهجري.
          </li>
          <li>
            لديك سعر يشمل الضريبة وتريد معرفة قيمتها؟ اختر في حاسبة الضريبة اتجاه «من الإجمالي
            إلى الصافي»، ولا تأخذ النسبة من السعر الشامل مباشرة.
          </li>
          <li>
            تتدرب لسباق؟ أدخل زمن آخر تمرين في حاسبة الوتيرة، ثم اختر وقت النوم المناسب لصباح
            السباق من حاسبة النوم.
          </li>
        </ul>

        <h2>أسئلة شائعة</h2>
        <h3>هل تُحفظ القيم التي أدخلها؟</h3>
        <p>
          لا. تجري الحسابات في متصفحك مباشرة، ولا تُرسل الأرقام التي تكتبها إلى خادم الموقع.
        </p>
        <h3>لماذا تختلف نتيجتي عن تقدير المقاول أو الفني؟</h3>
        <p>
          لأن الحاسبات تستخدم قيمًا متوسطة ومعادلات مبسطة معلنة في كل صفحة، بينما يرى الفني
          تفاصيل الموقع نفسه. استخدم النتيجة لتعرف حجم الطلب وتناقش العرض، لا بديلًا عن المعاينة.
        </p>
      </section>
    </OtherCategoriesPage>
  );
}
