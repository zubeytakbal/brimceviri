import Link from "next/link";
import CategoryUnitConverter from "../../components/CategoryUnitConverter";
import StaticPageLayout from "../../components/StaticPageLayout";
import { buildArabicMetadata } from "../seo";

export const metadata = buildArabicMetadata({
  title: "وحدات القياس التاريخية",
  description:
    "استكشف وحدات القياس البيزنطية والعثمانية والتركية القديمة، وحوّلها إلى المتر والغرام مع شروح مختصرة وسريعة.",
  path: "/ar/historical-units",
  turkishPath: "/tarihi-olcu-birimleri",
  englishPath: "/en/historical-units",
  germanPath: "/de/historische-masseinheiten",
});

const historicalLengthUnitOptions = [
  { value: "m", label: "متر (m)", symbol: "m" },
  { value: "arşın", label: "أرشين", symbol: "arşın" },
  { value: "endaze", label: "إندازه", symbol: "endaze" },
  { value: "pus", label: "القدم البيزنطية (Pous)", symbol: "pus" },
  { value: "orgyia", label: "القامة البيزنطية (Orgyia)", symbol: "orgyia" },
  { value: "çığ", label: "Çığ", symbol: "çığ" },
];

const historicalMassUnitOptions = [
  { value: "g", label: "غرام (g)", symbol: "g" },
  { value: "okka", label: "أوقية عثمانية (Okka)", symbol: "okka" },
  { value: "dirhem", label: "درهم", symbol: "dirhem" },
  { value: "litra", label: "اللترا البيزنطية (Litra)", symbol: "litra" },
  { value: "ounkia", label: "الأونكيا البيزنطية (Ounkia)", symbol: "ounkia" },
];

const byzantineUnits = [
  {
    href: "/birimler/bizans-ayagi",
    name: "القدم البيزنطية (pous)",
    value: "≈ 0.3148 م",
    note: "امتداد لوحدة القدم اليونانية القديمة واستمر استعمالها حتى سنة 1453.",
  },
  {
    href: "/birimler/bizans-kulaci",
    name: "القامة البيزنطية (orgyia)",
    value: "= 6 pous ≈ 1.8888 م",
    note: "تمثل المسافة بين طرفي الأصابع عند مد الذراعين بالكامل.",
  },
  {
    href: "/birimler/bizans-litrasi",
    name: "اللترا البيزنطية (litra)",
    value: "≈ 324 غ",
    note: "وحدة الكتلة الأساسية في التقليد البيزنطي والمتأثرة بالليبرا الرومانية.",
  },
  {
    href: "/birimler/bizans-onsu",
    name: "الأونكيا البيزنطية (ounkia)",
    value: "= 1/12 litra ≈ 27 غ",
    note: "تختلف عن الأونصة الحديثة في النظامين البريطاني والأمريكي.",
  },
];

const ottomanUnits = [
  {
    href: "/birimler/arsin",
    name: "أرشين",
    value: "≈ 0.68 م",
    note: "كان له أكثر من استعمال؛ أشهرها أرشين السوق، بينما استعمل أرشين البناء بطول أكبر.",
  },
  {
    href: "/birimler/endaze",
    name: "إندازه",
    value: "= 0.65 م",
    note: "استخدم خصوصا في قياس الأقمشة والمنسوجات والتجارة المرتبطة بها.",
  },
  {
    href: "/birimler/okka",
    name: "الأوقية العثمانية (Okka)",
    value: "= 400 dirhem ≈ 1282.945 غ",
    note: "من أشهر وحدات الوزن في الأسواق العثمانية التقليدية.",
  },
  {
    href: "/birimler/dirhem",
    name: "درهم",
    value: "= 1/400 okka ≈ 3.207 غ",
    note: "استعمل في الكميات الصغيرة مثل المعادن الثمينة والتوابل وبعض المستحضرات.",
  },
];

const oldTurkicUnits = [
  {
    href: "/birimler/cig",
    name: "Çığ",
    value: "≈ 0.333 م",
    note: "وحدة طول تركية قديمة وردت في مصادر لغوية وتاريخية مبكرة.",
  },
];

function UnitList({
  units,
}: {
  units: Array<{
    href: string;
    name: string;
    value: string;
    note: string;
  }>;
}) {
  return (
    <ul className="calculator-example-list">
      {units.map((unit) => (
        <li key={unit.href}>
          <article>
            <h3>
              <Link href={unit.href}>{unit.name}</Link>
            </h3>
            <p>
              <strong>{unit.value}</strong> {" - "} {unit.note}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function ArabicHistoricalUnitsPage() {
  return (
    <StaticPageLayout
      locale="ar"
      breadcrumbAriaLabel="مسار التنقل"
      breadcrumbs={[
        { href: "/ar", label: "الرئيسية" },
        { label: "وحدات القياس التاريخية" },
      ]}
      title="وحدات القياس التاريخية"
      description="استكشف وحدات القياس البيزنطية والعثمانية والتركية القديمة مع مكافئاتها الحديثة بالمتر والغرام، واستخدم محولين عمليين للتحويل بينها."
      alternateLink={{
        href: "/tarihi-olcu-birimleri",
        hrefLang: "tr",
        label: "عرض النسخة التركية",
      }}
      sections={[
        {
          heading: "لمحة تاريخية سريعة",
          content: (
            <>
              <p>
                تاريخ القياس في الأناضول والمنطقة لم يبدأ بالنظام
                المتري الحديث؛ بل مر عبر طبقات متعددة من الأنظمة
                البيزنطية والعثمانية ثم القياسات التركية الأقدم.
              </p>
              <p>
                لهذا ما زالت أسماء مثل أرشين وأوقية ودرهم تظهر في
                الوثائق القديمة، وفي بعض الكتب والبحوث التاريخية
                حتى اليوم.
              </p>
            </>
          ),
        },
        {
          heading: "محول وحدات الطول التاريخية",
          content: (
            <>
              <p>
                حوّل مباشرة بين أرشين وإندازه والقدم البيزنطية
                والقامة البيزنطية وÇığ مع عرض مكافئها الحديث بالمتر.
                وإذا أردت كل وحدات الطول الحديثة، افتح{" "}
                <Link href="/ar/categories/length">مكتبة الطول الكاملة</Link>.
              </p>
              <CategoryUnitConverter
                category="uzunluk"
                locale="ar"
                unitOptions={historicalLengthUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "محول وحدات الكتلة التاريخية",
          content: (
            <>
              <p>
                حوّل بين الأوقية العثمانية والدرهم واللترا البيزنطية
                والأونكيا البيزنطية مع الغرام الحديث كمقياس مرجعي.
                وللوحدات الحديثة مثل الكيلوغرام والطن، يمكنك فتح{" "}
                <Link href="/ar/categories/mass">مكتبة الكتلة الكاملة</Link>.
              </p>
              <CategoryUnitConverter
                category="kutle"
                locale="ar"
                unitOptions={historicalMassUnitOptions}
              />
            </>
          ),
        },
        {
          heading: "وحدات العصر البيزنطي",
          content: (
            <>
              <p>
                ورثت بيزنطة جزءا كبيرا من تقاليد القياس اليونانية
                والرومانية، وطورت وحدات عملية للطول والكتلة استمرت
                قرونا في التجارة والعمران.
              </p>
              <UnitList units={byzantineUnits} />
            </>
          ),
        },
        {
          heading: "وحدات العصر العثماني",
          content: (
            <>
              <p>
                استعملت الدولة العثمانية وحدات مثل أرشين وإندازه
                وأوقية ودرهم في الأسواق والبناء والحياة اليومية،
                قبل الانتقال الكامل إلى النظام المتري في القرن
                العشرين.
              </p>
              <UnitList units={ottomanUnits} />
            </>
          ),
        },
        {
          heading: "وحدات تركية أقدم",
          content: (
            <>
              <p>
                بعض الوحدات الأقدم بقيت معروفة من خلال المصادر
                اللغوية والتاريخية، وهي مهمة لفهم النصوص القديمة
                وربطها بالمقاييس الحديثة.
              </p>
              <UnitList units={oldTurkicUnits} />
            </>
          ),
        },
        {
          heading: "لماذا ما زالت هذه الوحدات مهمة؟",
          content: (
            <>
              <p>
                ما زالت هذه الأسماء تظهر في الوثائق الوقفية والسجلات
                القديمة والأبحاث التاريخية وأعمال الترجمة، لذلك فإن
                تحويلها إلى المتر أو الغرام يساعد على فهمها بسرعة
                أكبر.
              </p>
              <p>
                هذه الصفحة مفيدة أيضا للطلاب وصناع المحتوى وكل من
                يريد قراءة الأرقام التاريخية بمعيار حديث واضح.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
