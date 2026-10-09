import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import { iddatWafat, MASAFAT_QASR_KM } from "../../converter/arabicFiqh";
import { adadAr, hijriNass, miladiNass, riyadhYawm } from "../../converter/calendar/saTaqwim";
import type { FaqItem } from "../../converter/faqSchema";
import { hijriToGregorian, gregorianToHijri } from "../../converter/time/calendars";
import { addDaysYmd, diffDays, ymdKey } from "../../converter/time/dateMath";
import { ARABIC_ISLAMIC_TOOLS } from "../../i18n/arabicIslamicTools";
import { ARABIC_ISLAMIC_HUB, ARABIC_ISLAMIC_PATHS, ISLAMIC_HUB_ALTERNATES, ISLAMIC_TOOL_PATHS, islamicAlternates } from "../../i18n/islamicToolPaths";
import TimeToolPage from "../time/TimeToolPage";
import { saMetadata } from "../takvim/takvimMeta";
import { AqiqahCalculator, IddahCalculator, QasrCalculator } from "./ArabicIslamicTools";

const T = { crumb: "مسار التنقل", related: "أدوات إسلامية أخرى", toc: "المحتويات", faq: "الأسئلة الشائعة" };
const RAISIYA = { href: "/ar", label: "الرئيسية" };
const HUB = { href: ARABIC_ISLAMIC_HUB, label: "أدوات إسلامية" };


const rawabit = (self: string) => ARABIC_ISLAMIC_TOOLS.filter((t) => t.href !== self).map(({ href, label }) => ({ href, label }));

const tarikh = (d: Parameters<typeof miladiNass>[0]) => `${hijriNass(d)} (${miladiNass(d, false)})`;

/* ---------------- metadata ---------------- */

export function iddahMetadata(): Metadata {
  return saMetadata(ARABIC_ISLAMIC_PATHS.iddah, {
    title: "حاسبة العدة: متى تنتهي عدة المطلقة والمتوفى عنها زوجها؟",
    short: "حاسبة العدة",
    description:
      "احسبي متى تنتهي العدة بالتاريخ الهجري والميلادي: عدة الوفاة أربعة أشهر وعشرة أيام، عدة المطلقة ثلاثة قروء أو ثلاثة أشهر، وعدة الحامل بوضع الحمل.",
  });
}

export function aqiqahMetadata(): Metadata {
  return saMetadata(ARABIC_ISLAMIC_PATHS.aqiqah, {
    title: "حساب يوم العقيقة: متى اليوم السابع من الولادة؟",
    short: "حساب يوم العقيقة",
    description: "أدخل تاريخ الولادة لمعرفة يوم العقيقة (اليوم السابع) والرابع عشر والحادي والعشرين بالهجري والميلادي، مع طريقة العد عند الجمهور والمالكية.",
  });
}

export function qasrMetadata(): Metadata {
  const m = saMetadata(ISLAMIC_TOOL_PATHS.qasr.ar, {
    title: "حاسبة قصر الصلاة للمسافر: كم مسافة القصر وكم يوم؟",
    short: "حاسبة قصر الصلاة",
    description: "هل يجوز لك قصر الصلاة؟ أدخل مسافة السفر وأيام الإقامة لمعرفة الحكم: مسافة القصر نحو 80 كم، والإقامة أربعة أيام عند الجمهور و15 يومًا عند الحنفية.",
  });
  return { ...m, alternates: { canonical: ISLAMIC_TOOL_PATHS.qasr.ar, languages: islamicAlternates("qasr") } };
}

export function hubMetadata(): Metadata {
  const m = saMetadata(ARABIC_ISLAMIC_HUB, {
    title: "أدوات وحاسبات إسلامية: الزكاة والعدة والعقيقة وقصر الصلاة",
    short: "أدوات إسلامية",
    description: "حاسبات إسلامية مجانية بالعربية: الزكاة وحول المدخرات، العدة، يوم العقيقة، قصر الصلاة للمسافر، مواقيت الصلاة، والتاريخ الهجري.",
  });
  return { ...m, alternates: { canonical: ARABIC_ISLAMIC_HUB, languages: ISLAMIC_HUB_ALTERNATES } };
}

/* ---------------- العدة ---------------- */

export function IddahPage() {
  const yawm = riyadhYawm();
  const h = gregorianToHijri(yawm);
  // مثال ثابت: وفاة في أول شهر هجري قادم
  const mithal = hijriToGregorian({ year: h.month === 12 ? h.year + 1 : h.year, month: (h.month % 12) + 1, day: 1 })!;
  const w = iddatWafat(mithal);
  const faq: FaqItem[] = [
    {
      question: "كم عدة المتوفى عنها زوجها؟",
      answer: "أربعة أشهر وعشرة أيام لغير الحامل، لقوله تعالى: «يتربصن بأنفسهن أربعة أشهر وعشرًا». تُعدّ الأشهر بالأهلة إن بدأت العدة أول الشهر، فإن بدأت في أثنائه فمن العلماء من يجعلها 130 يومًا.",
    },
    {
      question: "كم عدة المطلقة؟",
      answer: "ثلاثة قروء لمن تحيض، وثلاثة أشهر لمن لا تحيض لصغر أو كبر (الآيسة)، ووضع الحمل للحامل. واختلف الفقهاء في القرء: هو الحيض عند الحنفية والحنابلة، والطهر عند المالكية والشافعية.",
    },
    {
      question: "متى تنتهي عدة الحامل؟",
      answer: "بوضع الحمل كله، سواء كانت مطلقة أو متوفى عنها زوجها عند جمهور الفقهاء، ولو كان الوضع بعد الوفاة أو الطلاق بأيام.",
    },
    {
      question: "متى تبدأ العدة؟",
      answer: "من وقت الوفاة أو الطلاق، لا من وقت العلم به؛ فلو بلغها الخبر بعد انقضاء المدة فقد انقضت عدتها.",
    },
    {
      question: "هل تحسب عدة المطلقة بالأيام؟",
      answer: "عدة ذات الحيض بالحيضات لا بالأيام، ولذلك تعطي الحاسبة تقديرًا من طول دورتك. أما من لا تحيض فعدتها ثلاثة أشهر هجرية (نحو 88 إلى 90 يومًا).",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "حاسبة العدة" }]}
        crumbLabel={T.crumb}
        title="حاسبة العدة"
        intro="احسبي تاريخ انتهاء العدة بالهجري والميلادي: عدة الوفاة، عدة المطلقة التي تحيض أو لا تحيض، وعدة الحامل، مع ذكر الخلاف الفقهي في كل حالة."
        tool={<IddahCalculator initialDate={ymdKey(yawm)} />}
        related={{ title: T.related, links: rawabit(ARABIC_ISLAMIC_PATHS.iddah) }}
        tocTitle={T.toc}
        tocItems={[
          { id: "jadwal", label: "مدة العدة في كل حالة" },
          { id: "mithal", label: "مثال على عدة الوفاة" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="jadwal">مدة العدة في كل حالة</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">الحالة</th>
                <th scope="col">العدة</th>
                <th scope="col">بالأيام تقريبًا</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">المتوفى عنها زوجها (غير الحامل)</th>
                <td>أربعة أشهر وعشرة أيام</td>
                <td>128 إلى 130 يومًا</td>
              </tr>
              <tr>
                <th scope="row">المطلقة التي تحيض</th>
                <td>ثلاثة قروء</td>
                <td>نحو 60 إلى 90 يومًا حسب الدورة</td>
              </tr>
              <tr>
                <th scope="row">المطلقة التي لا تحيض (الصغيرة والآيسة)</th>
                <td>ثلاثة أشهر</td>
                <td>88 إلى 90 يومًا</td>
              </tr>
              <tr>
                <th scope="row">الحامل (مطلقة أو متوفى عنها)</th>
                <td>وضع الحمل</td>
                <td>حتى الولادة</td>
              </tr>
              <tr>
                <th scope="row">المطلقة قبل الدخول</th>
                <td>لا عدة عليها</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 id="mithal">مثال على عدة الوفاة</h2>
        <p>
          إذا كانت الوفاة في {tarikh(mithal)} فإن العدة بالأهلة تنتهي في {tarikh(w.bilAhilla)}، أي بعد {adadAr(diffDays(mithal, w.bilAhilla), "yawm")}، وعلى قول من
          يحسبها 130 يومًا تنتهي في {tarikh(w.bilAyyam)}.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* ---------------- العقيقة ---------------- */

export function AqiqahPage() {
  const yawm = riyadhYawm();
  const ayyam = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
  const faq: FaqItem[] = [
    {
      question: "كيف أحسب يوم العقيقة؟",
      answer: "يُعدّ يوم الولادة اليوم الأول عند الجمهور، فيكون السابع قبل يوم الولادة من الأسبوع بيوم: من وُلد يوم الجمعة تكون عقيقته يوم الخميس الذي يليه.",
    },
    {
      question: "كيف يحسب المالكية يوم العقيقة؟",
      answer: "لا يُحسب يوم الولادة عند المالكية إن وُلد المولود بعد طلوع الفجر، فيبدأ العد من اليوم التالي؛ وإن وُلد قبل الفجر حُسب ذلك اليوم.",
    },
    {
      question: "ماذا لو فات اليوم السابع؟",
      answer: "يذبح في الرابع عشر، فإن فات ففي الحادي والعشرين، وهو قول الحنابلة ومن وافقهم. ويرى الشافعية أنها تُجزئ بعد السابع إلى البلوغ.",
    },
    {
      question: "كم شاة في العقيقة؟",
      answer: "شاتان متكافئتان عن الغلام وشاة عن الجارية، ويجزئ عن الغلام شاة واحدة.",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "حساب يوم العقيقة" }]}
        crumbLabel={T.crumb}
        title="حساب يوم العقيقة"
        intro="أدخل تاريخ الولادة لتعرف اليوم السابع موعد العقيقة، ثم الرابع عشر والحادي والعشرين لمن فاته السابع، بالتاريخ الهجري والميلادي."
        tool={<AqiqahCalculator initialDate={ymdKey(yawm)} />}
        related={{ title: T.related, links: rawabit(ARABIC_ISLAMIC_PATHS.aqiqah) }}
        tocTitle={T.toc}
        tocItems={[
          { id: "jadwal", label: "يوم العقيقة حسب يوم الولادة" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="jadwal">يوم العقيقة حسب يوم الولادة</h2>
        <p>على قول الجمهور (يُحسب يوم الولادة):</p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">يوم الولادة</th>
                <th scope="col">اليوم السابع</th>
                <th scope="col">الرابع عشر</th>
                <th scope="col">الحادي والعشرون</th>
              </tr>
            </thead>
            <tbody>
              {ayyam.map((y, i) => (
                <tr key={y}>
                  <th scope="row">{y}</th>
                  <td>{ayyam[(i + 6) % 7]}</td>
                  <td>{ayyam[(i + 6) % 7]} الذي بعده</td>
                  <td>{ayyam[(i + 6) % 7]} بعد ثلاثة أسابيع</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          مثال: مولود اليوم {tarikh(yawm)} يكون سابعه في {tarikh(addDaysYmd(yawm, 6))}.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* ---------------- قصر الصلاة ---------------- */

export function QasrPage() {
  const faq: FaqItem[] = [
    {
      question: "كم مسافة قصر الصلاة بالكيلومتر؟",
      answer: `أربعة برد عند الجمهور، وتُقدّر في الفتاوى المعاصرة بنحو ${MASAFAT_QASR_KM} كم، وقدّرها بعضهم بـ 81 إلى 89 كم. ويرى بعض العلماء كابن تيمية وابن عثيمين أن المرجع ما يسميه الناس سفرًا.`,
    },
    {
      question: "كم يوم يقصر المسافر الصلاة؟",
      answer: "إن نوى الإقامة أكثر من أربعة أيام أتم من أول يوم عند المالكية والشافعية والحنابلة، وعند الحنفية إن نوى خمسة عشر يومًا فأكثر. فإن لم يدرِ متى تنقضي حاجته قصر ولو طالت المدة.",
    },
    {
      question: "ما الصلوات التي تُقصر؟",
      answer: "الرباعية فقط: الظهر والعصر والعشاء تُصلّى ركعتين. أما الفجر والمغرب فلا قصر فيهما.",
    },
    {
      question: "متى يبدأ القصر؟",
      answer: "بعد مفارقة عمران البلد الذي يسكنه، لا قبل الخروج منه.",
    },
    {
      question: "هل يقصر المسافر إذا صلى خلف مقيم؟",
      answer: "يتم الصلاة أربعًا إذا صلى خلف إمام مقيم.",
    },
  ];
  return (
    <div lang="ar" dir="rtl">
      <TimeToolPage
        crumbs={[RAISIYA, HUB, { label: "حاسبة قصر الصلاة" }]}
        crumbLabel={T.crumb}
        title="حاسبة قصر الصلاة للمسافر"
        intro="أدخل مسافة سفرك وعدد أيام الإقامة التي تنويها لتعرف هل تقصر الصلاة أم تتمها، على قول الجمهور (أربعة أيام) وقول الحنفية (خمسة عشر يومًا)."
        tool={<QasrCalculator />}
        related={{ title: T.related, links: rawabit(ISLAMIC_TOOL_PATHS.qasr.ar) }}
        tocTitle={T.toc}
        tocItems={[
          { id: "madhahib", label: "مسافة القصر ومدة الإقامة في المذاهب" },
          { id: "faq", label: T.faq },
        ]}
        faqTitle={T.faq}
        faqItems={faq}
      >
        <h2 id="madhahib">مسافة القصر ومدة الإقامة في المذاهب</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">المذهب</th>
                <th scope="col">مسافة القصر</th>
                <th scope="col">الإقامة التي يتم بعدها</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">الحنفية</th>
                <td>ثلاث مراحل (نحو 81 إلى 89 كم)</td>
                <td>نية 15 يومًا فأكثر</td>
              </tr>
              <tr>
                <th scope="row">المالكية</th>
                <td>أربعة برد (نحو 80 إلى 89 كم)</td>
                <td>نية أربعة أيام صحاح</td>
              </tr>
              <tr>
                <th scope="row">الشافعية</th>
                <td>أربعة برد (نحو 80 إلى 89 كم)</td>
                <td>نية أربعة أيام غير يومي الدخول والخروج</td>
              </tr>
              <tr>
                <th scope="row">الحنابلة</th>
                <td>أربعة برد (نحو 80 إلى 89 كم)</td>
                <td>نية أكثر من 20 صلاة (أكثر من أربعة أيام)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          تستخدم الحاسبة {MASAFAT_QASR_KM} كم حدًا تقريبيًا. المسافة تُحسب ذهابًا فقط، ولا يُجمع الذهاب والإياب.
        </p>
      </TimeToolPage>
    </div>
  );
}

/* ---------------- الصفحة الجامعة ---------------- */

export function ArabicIslamicHubPage() {
  return (
    <main className="other-categories-page" lang="ar" dir="rtl">
      <div className="directory-shell">
        <nav className="breadcrumbs" aria-label={T.crumb}>
          <Link href="/ar">الرئيسية</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>أدوات إسلامية</span>
        </nav>
        <header className="other-categories-header">
          <h1>أدوات وحاسبات إسلامية</h1>
          <p>
            حاسبات للأسئلة التي يبحث عنها الناس فعلًا: الزكاة وحول المدخرات، والعدة، ويوم العقيقة، وقصر الصلاة، مع بيان الخلاف بين المذاهب. الأسعار المتغيرة
            كسعر الذهب تُدخلها أنت أو تُجلب حية، ولا تُحفظ في الصفحات.
          </p>
        </header>
        <ul className="tool-hub-list dini-hub-list">
          {ARABIC_ISLAMIC_TOOLS.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>
                <span>{t.label}</span>
                <small>{t.text}</small>
              </Link>
            </li>
          ))}
        </ul>
        <section className="category-article-content">
          <h2>كيف تعرض هذه الحاسبات النتائج؟</h2>
          <p>
            تبيّن كل حاسبة المدخلات التي تعتمد عليها وطريقة الحساب خطوة بخطوة، وتذكر الأقوال المعتبرة حين يختلف الفقهاء في تقدير أو
            مدة، بدل أن تفرض قولًا واحدًا. الحسابات تتم داخل متصفحك، ولا تُحفظ المبالغ أو التواريخ التي تُدخلها.
          </p>
          <h2>مثال: زكاة المدخرات النقدية</h2>
          <p>
            الزكاة في النقود ربع العشر (2.5%) إذا بلغ المال النصاب وحال عليه الحول الهجري. ويُقدَّر النصاب عند كثير من أهل العلم بقيمة
            85 غرامًا من الذهب، ويقدّره آخرون بقيمة 595 غرامًا من الفضة، والفرق بينهما كبير بحسب أسعار اليوم. فمن ادّخر 40,000 وكان
            المبلغ فوق النصاب طوال الحول، فزكاته 40,000 × 0.025 = 1,000. تحسب حاسبة الزكاة قيمة النصاب من سعر الغرام الذي تُدخله أو
            من السعر الحي.
          </p>
          <h2>التقويم الهجري في هذه الأدوات</h2>
          <p>
            تعتمد الأدوات على تقويم أم القرى لتحويل التواريخ وحساب الحول والعدة. قد يختلف بدء الشهر يومًا عن الإعلان الرسمي في بعض
            البلدان لأنه يُبنى على رؤية الهلال، لذلك راجع الجهة الرسمية في بلدك للمواعيد الدينية.
          </p>
          <p>
            <strong>تنبيه:</strong> هذه الحاسبات تساعد على الحساب ولا تغني عن سؤال أهل العلم في الحالات الخاصة، مثل الديون والأموال
            المشتركة وعروض التجارة.
          </p>
        </section>
      </div>
    </main>
  );
}

