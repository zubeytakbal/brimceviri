"use client";

import { buildSiteUrl } from "../../siteConfig";
import {
  type TechnicalReferenceLocale,
  waterDynamicViscosityByTemperature,
  waterViscositySources,
} from "../../converter/technicalReferenceData";
import TechnicalReferenceSheet, {
  TechnicalReferenceLineChart,
  TechnicalReferenceTable,
} from "./TechnicalReferenceSheet";

function formatValue(
  value: number,
  locale: TechnicalReferenceLocale,
  maximumFractionDigits: number
) {
  return new Intl.NumberFormat(
    locale === "tr"
      ? "tr-TR"
      : locale === "de"
        ? "de-DE"
        : locale === "ar"
          ? "ar"
        : "en-US",
    {
      minimumFractionDigits: 0,
      maximumFractionDigits,
    }
  ).format(value);
}

export default function WaterViscosityReference({
  locale,
}: {
  locale: TechnicalReferenceLocale;
}) {
  const isTurkish = locale === "tr";
  const isArabic = locale === "ar";

  const points = waterDynamicViscosityByTemperature.map((point) => ({
    x: point.temperatureC,
    y: point.value * 1000,
  }));
  const rows = waterDynamicViscosityByTemperature.map((point) => [
    formatValue(point.temperatureC, locale, 2),
    formatValue(point.value * 1000, locale, 4),
    formatValue(point.value, locale, 9),
  ]);

  return (
    <TechnicalReferenceSheet
      locale={locale}
      label={
        isTurkish
          ? "Teknik referans"
          : isArabic
            ? "مرجع تقني"
            : "Technical reference"
      }
      title={
        isTurkish
          ? "Sıvı suyun sıcaklığa göre dinamik viskozitesi"
          : isArabic
            ? "اللزوجة الديناميكية للماء السائل بدلالة درجة الحرارة"
            : "Dynamic viscosity of liquid water as a function of temperature"
      }
      description={
        isTurkish
          ? "Bu teknik föy, Reynolds sayısı ve boru içi akış analizlerinde sık kullanılan sıvı su viskozite verisini özetler."
          : isArabic
            ? "يلخص هذا المرجع التقني بيانات لزوجة الماء السائل المستخدمة كثيرا في حسابات رينولدز وتحليل الجريان الداخلي."
            : "This technical sheet summarizes liquid-water viscosity data commonly used in Reynolds-number and internal-flow analysis."
      }
      definitionHeading={
        isTurkish ? "Tanım" : isArabic ? "التعريف" : "Definition"
      }
      definition={[
        isTurkish
          ? "Dinamik viskozite, akışkanın kesme deformasyonuna karşı gösterdiği dirençtir ve boru içi akış rejimi ile sürtünme kaybını doğrudan etkiler."
          : isArabic
            ? "اللزوجة الديناميكية تمثل مقاومة المائع لتشوه القص وتؤثر مباشرة في نظام الجريان وفقد الاحتكاك داخل الأنابيب."
            : "Dynamic viscosity is a measure of resistance to shear deformation and directly affects internal-flow regime and friction loss.",
      ]}
      formulaHeading={
        isTurkish ? "Formül" : isArabic ? "المعادلة" : "Formula"
      }
      formulas={["Re = ρ v D / μ"]}
      variablesHeading={
        isTurkish
          ? "Değişkenler"
          : isArabic
            ? "المتغيرات"
            : "Variables"
      }
      variables={[
        {
          symbol: "μ",
          description: isTurkish
            ? "Dinamik viskozite, Pa·s veya mPa·s"
            : isArabic
              ? "اللزوجة الديناميكية، Pa·s أو mPa·s"
              : "Dynamic viscosity, Pa·s or mPa·s",
        },
        {
          symbol: "ρ",
          description: isTurkish
            ? "Yoğunluk, kg/m³"
            : isArabic
              ? "الكثافة، kg/m³"
              : "Density, kg/m³",
        },
        {
          symbol: "v",
          description: isTurkish
            ? "Hız, m/s"
            : isArabic
              ? "السرعة، m/s"
              : "Velocity, m/s",
        },
        {
          symbol: "D",
          description: isTurkish
            ? "Karakteristik çap, m"
            : isArabic
              ? "القطر المميز، m"
              : "Characteristic diameter, m",
        },
      ]}
      exampleHeading={
        isTurkish
          ? "Kısa mühendislik örneği"
          : isArabic
            ? "مثال هندسي سريع"
            : "Short engineering example"
      }
      example={[
        isTurkish
          ? "20 °C civarında su için μ ≈ 1.0014 mPa·s alınırsa, 25 mm boruda 1.5 m/s hız için Reynolds sayısı yaklaşık 37400 bulunur ve akış türbülanslı bölgede değerlendirilir."
          : isArabic
            ? "إذا اعتبرت μ ≈ 1.0014 mPa·s للماء قرب 20 °C، فإن السرعة 1.5 m/s داخل أنبوب قطره 25 mm تعطي عدد رينولدز يقارب 37400 ويقع في المجال المضطرب."
            : "Using μ ≈ 1.0014 mPa·s for water near 20 °C, a velocity of 1.5 m/s in a 25 mm pipe gives a Reynolds number of about 37,400, which falls in the turbulent range.",
      ]}
      conditionsHeading={
        isTurkish
          ? "Geçerlilik koşulları ve varsayımlar"
          : isArabic
            ? "شروط الاستخدام والافتراضات"
            : "Validity conditions and assumptions"
      }
      conditions={[
        isTurkish
          ? "Veriler 0.101325 MPa sabit basınçta ve sıvı su dalında alınmıştır."
          : isArabic
            ? "البيانات مأخوذة عند ضغط ثابت 0.101325 MPa وعلى فرع الماء السائل."
            : "The data are taken at a constant pressure of 0.101325 MPa on the liquid-water branch.",
        isTurkish
          ? "Sıcaklık aralığı yaklaşık 0.01 °C ile 99.97 °C arasındadır."
          : isArabic
            ? "مجال درجة الحرارة تقريبا من 0.01 °C إلى 99.97 °C."
            : "The temperature range is approximately 0.01 °C to 99.97 °C.",
        isTurkish
          ? "Grafikte ana eksen mPa·s olarak verilmiştir; tabloda hem mPa·s hem Pa·s birlikte gösterilir."
          : isArabic
            ? "يعرض المخطط المحور الرئيسي بوحدة mPa·s، بينما يضم الجدول كلا من mPa·s وPa·s."
            : "The chart uses mPa·s on the main axis, and the table lists both mPa·s and Pa·s.",
      ]}
      useCasesHeading={
        isTurkish
          ? "Kullanım alanı"
          : isArabic
            ? "الاستخدامات"
            : "Use cases"
      }
      useCases={[
        isTurkish
          ? "Reynolds sayısı hesabında gerçekçi su viskozitesi seçmek."
          : isArabic
            ? "اختيار لزوجة ماء واقعية في حسابات عدد رينولدز."
            : "Selecting realistic water viscosity for Reynolds-number calculations.",
        isTurkish
          ? "Boru içi basınç kaybı ve laminer akış değerlendirmeleri."
          : isArabic
            ? "تقييم فقد الضغط والجريان الصفحي داخل الأنابيب."
            : "Internal-flow pressure-drop and laminar-flow assessments.",
        isTurkish
          ? "Laboratuvar deneylerinde sıcaklığa bağlı akışkan özellik analizi."
          : isArabic
            ? "تحليل خواص المائع المتغيرة مع الحرارة في التطبيقات المخبرية."
            : "Temperature-dependent fluid-property analysis in lab work.",
      ]}
      commonMistakesHeading={
        isTurkish
          ? "Sık yapılan hata"
          : isArabic
            ? "خطأ شائع"
            : "Common mistake"
      }
      commonMistakes={[
        isTurkish
          ? "Dinamik viskoziteyi kinematik viskozite ile karıştırmak veya cP ile Pa·s dönüşümünü yanlış yapmak."
          : isArabic
            ? "الخلط بين اللزوجة الديناميكية والحركية أو تحويل cP وPa·s بشكل خاطئ."
            : "Mixing dynamic viscosity with kinematic viscosity or converting cP and Pa·s incorrectly.",
      ]}
      relatedLinksHeading={
        isTurkish
          ? "İlgili hesaplayıcı"
          : isArabic
            ? "أدوات مرتبطة"
            : "Related calculator"
      }
      relatedLinks={[
        {
          label: isTurkish
            ? "Reynolds Sayısı Hesaplayıcısı"
            : isArabic
              ? "حاسبة عدد رينولدز"
              : "Reynolds Number Calculator",
          href: isTurkish
            ? "/hesaplayicilar/reynolds-sayisi"
            : isArabic
              ? "/ar/calculators/reynolds-number"
              : "/en/calculators/reynolds-number",
        },
        {
          label: isTurkish
            ? "Hidrostatik Basınç Hesaplayıcısı"
            : isArabic
              ? "حاسبة الضغط الهيدروستاتيكي"
              : "Hydrostatic Pressure Calculator",
          href: isTurkish
            ? "/hesaplayicilar/hidrostatik-basinc"
            : isArabic
              ? "/ar/calculators/hydrostatic-pressure"
              : "/en/calculators/hydrostatic-pressure",
        },
      ]}
      sourcesHeading={
        isTurkish ? "Kaynaklar" : isArabic ? "المراجع" : "Sources"
      }
      sources={waterViscositySources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "suyun-dinamik-viskozitesi.pdf"
          : isArabic
            ? "water-dynamic-viscosity-ar.pdf"
            : "water-dynamic-viscosity-reference-sheet.pdf",
        title: isTurkish
          ? "Sıvı suyun sıcaklığa göre dinamik viskozitesi"
          : isArabic
            ? "اللزوجة الديناميكية للماء السائل بدلالة درجة الحرارة"
            : "Dynamic viscosity of liquid water as a function of temperature",
        description: isTurkish
          ? "Bu teknik föy, Reynolds sayısı ve boru içi akış analizlerinde sık kullanılan sıvı su viskozite verisini özetler."
          : isArabic
            ? "يلخص هذا المرجع التقني بيانات لزوجة الماء السائل المستخدمة كثيرا في حسابات رينولدز وتحليل الجريان الداخلي."
            : "This technical sheet summarizes liquid-water viscosity data commonly used in Reynolds-number and internal-flow analysis.",
        definitionHeading: isTurkish
          ? "Tanım"
          : isArabic
            ? "التعريف"
            : "Definition",
        definition: [
          isTurkish
            ? "Dinamik viskozite, akışkanın kesme deformasyonuna karşı gösterdiği dirençtir ve boru içi akış rejimi ile sürtünme kaybını doğrudan etkiler."
            : isArabic
              ? "اللزوجة الديناميكية تمثل مقاومة المائع لتشوه القص وتؤثر مباشرة في نظام الجريان وفقد الاحتكاك داخل الأنابيب."
              : "Dynamic viscosity is a measure of resistance to shear deformation and directly affects internal-flow regime and friction loss.",
        ],
        formulaHeading: isTurkish
          ? "Formül"
          : isArabic
            ? "المعادلة"
            : "Formula",
        formulas: ["Re = ρ v D / μ"],
        variablesHeading: isTurkish
          ? "Değişkenler"
          : isArabic
            ? "المتغيرات"
            : "Variables",
        variables: [
          {
            symbol: "μ",
            description: isTurkish
              ? "Dinamik viskozite, Pa·s veya mPa·s"
              : isArabic
                ? "اللزوجة الديناميكية، Pa·s أو mPa·s"
                : "Dynamic viscosity, Pa·s or mPa·s",
          },
          {
            symbol: "ρ",
            description: isTurkish
              ? "Yoğunluk, kg/m³"
              : isArabic
                ? "الكثافة، kg/m³"
                : "Density, kg/m³",
          },
          {
            symbol: "v",
            description: isTurkish
              ? "Hız, m/s"
              : isArabic
                ? "السرعة، m/s"
                : "Velocity, m/s",
          },
          {
            symbol: "D",
            description: isTurkish
              ? "Karakteristik çap, m"
              : isArabic
                ? "القطر المميز، m"
                : "Characteristic diameter, m",
          },
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : isArabic
            ? "مثال هندسي سريع"
            : "Short engineering example",
        example: [
          isTurkish
            ? "20 °C civarında su için μ ≈ 1.0014 mPa·s alınırsa, 25 mm boruda 1.5 m/s hız için Reynolds sayısı yaklaşık 37400 bulunur ve akış türbülanslı bölgede değerlendirilir."
            : isArabic
              ? "إذا اعتبرت μ ≈ 1.0014 mPa·s للماء قرب 20 °C، فإن السرعة 1.5 m/s داخل أنبوب قطره 25 mm تعطي عدد رينولدز يقارب 37400 ويقع في المجال المضطرب."
              : "Using μ ≈ 1.0014 mPa·s for water near 20 °C, a velocity of 1.5 m/s in a 25 mm pipe gives a Reynolds number of about 37,400, which falls in the turbulent range.",
        ],
        conditionsHeading: isTurkish
          ? "Geçerlilik koşulları"
          : isArabic
            ? "شروط الاستخدام"
            : "Validity conditions",
        conditions: [
          isTurkish
            ? "0.101325 MPa sabit basınç, sıvı su dalı."
            : isArabic
              ? "ضغط ثابت 0.101325 MPa وعلى فرع الماء السائل."
              : "0.101325 MPa constant pressure, liquid-water branch.",
          isTurkish
            ? "Sıcaklık aralığı yaklaşık 0.01 °C ile 99.97 °C."
            : isArabic
              ? "مجال الحرارة تقريبا من 0.01 °C إلى 99.97 °C."
              : "Temperature range approximately 0.01 °C to 99.97 °C.",
          isTurkish
            ? "IAPWS viskozite formülasyonuna dayalı NIST verisi."
            : isArabic
              ? "بيانات NIST مبنية على صياغة لزوجة IAPWS."
              : "NIST data based on the IAPWS viscosity formulation.",
        ],
        charts: [
          {
            kind: "line",
            caption: isTurkish
              ? "Şekil 2. Sıvı su dinamik viskozitesinin sıcaklıkla değişimi"
              : isArabic
                ? "الشكل 2. تغير اللزوجة الديناميكية للماء السائل مع درجة الحرارة"
                : "Figure 2. Variation of liquid-water dynamic viscosity with temperature",
            xLabel: isArabic ? "درجة الحرارة (°C)" : "Temperature (°C)",
            yLabel: isArabic
              ? "اللزوجة الديناميكية (mPa·s)"
              : "Dynamic viscosity (mPa·s)",
            xTicks: [0, 20, 40, 60, 80, 100],
            yTicks: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
            points,
            color: [17, 138, 178],
            formatX: (value, currentLocale) =>
              formatValue(value, currentLocale, 0),
            formatY: (value, currentLocale) =>
              formatValue(value, currentLocale, 1),
          },
        ],
        tables: [
          {
            caption: isTurkish
              ? "Tablo 2. Sıvı suyun sıcaklığa göre dinamik viskozitesi"
              : isArabic
                ? "الجدول 2. اللزوجة الديناميكية للماء حسب درجة الحرارة"
                : "Table 2. Dynamic viscosity of liquid water by temperature",
            columns: isArabic
              ? [
                  "درجة الحرارة (°C)",
                  "اللزوجة الديناميكية (mPa·s)",
                  "اللزوجة الديناميكية (Pa·s)",
                ]
              : [
                  "Temperature (°C)",
                  "Dynamic viscosity (mPa·s)",
                  "Dynamic viscosity (Pa·s)",
                ],
            rows,
          },
        ],
        useCasesHeading: isTurkish
          ? "Kullanım alanı"
          : isArabic
            ? "الاستخدامات"
            : "Use cases",
        useCases: [
          isTurkish
            ? "Reynolds sayısı hesabı"
            : isArabic
              ? "حساب عدد رينولدز"
              : "Reynolds-number calculation",
          isTurkish
            ? "Basınç kaybı hesabı"
            : isArabic
              ? "حساب فقد الضغط"
              : "Pressure-drop calculation",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : isArabic
            ? "خطأ شائع"
            : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Yanlış viskozite birimi kullanmak."
            : isArabic
              ? "استخدام وحدة لزوجة خاطئة."
              : "Using the wrong viscosity unit.",
        ],
        relatedLinksHeading: isTurkish
          ? "İlgili bağlantılar"
          : isArabic
            ? "روابط مرتبطة"
            : "Related links",
        relatedLinks: [
          {
            label: isTurkish
              ? "Reynolds Sayısı Hesaplayıcısı"
              : isArabic
                ? "حاسبة عدد رينولدز"
                : "Reynolds Number Calculator",
            url: buildSiteUrl(
              isTurkish
                ? "/hesaplayicilar/reynolds-sayisi"
                : isArabic
                  ? "/ar/calculators/reynolds-number"
                  : "/en/calculators/reynolds-number"
            ),
          },
          {
            label: isTurkish
              ? "Hidrostatik Basınç Hesaplayıcısı"
              : isArabic
                ? "حاسبة الضغط الهيدروستاتيكي"
                : "Hydrostatic Pressure Calculator",
            url: buildSiteUrl(
              isTurkish
                ? "/hesaplayicilar/hidrostatik-basinc"
                : isArabic
                  ? "/ar/calculators/hydrostatic-pressure"
                  : "/en/calculators/hydrostatic-pressure"
            ),
          },
        ],
        sourcesHeading: isTurkish
          ? "Kaynaklar"
          : isArabic
            ? "المراجع"
            : "Sources",
        sources: waterViscositySources,
      }}
    >
      <TechnicalReferenceLineChart
        formatX={(value, currentLocale) =>
          formatValue(value, currentLocale, 0)
        }
        formatY={(value, currentLocale) =>
          formatValue(value, currentLocale, 1)
        }
        locale={locale}
        lineClassName="technical-reference-data-line is-turquoise"
        points={points}
        title={
          isTurkish
            ? "Şekil 2. Atmosfer basıncına yakın koşullarda sıvı su dinamik viskozitesi"
            : isArabic
              ? "الشكل 2. اللزوجة الديناميكية للماء السائل قرب الضغط الجوي"
              : "Figure 2. Liquid-water dynamic viscosity near atmospheric pressure"
        }
        xLabel={isArabic ? "درجة الحرارة (°C)" : "Temperature (°C)"}
        xTicks={[0, 20, 40, 60, 80, 100]}
        yLabel={
          isArabic
            ? "اللزوجة الديناميكية (mPa·s)"
            : "Dynamic viscosity (mPa·s)"
        }
        yTicks={[0.3, 0.6, 0.9, 1.2, 1.5, 1.8]}
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 2. Sıvı suyun sıcaklığa göre dinamik viskozitesi"
            : isArabic
              ? "الجدول 2. اللزوجة الديناميكية للماء حسب درجة الحرارة"
              : "Table 2. Dynamic viscosity of liquid water by temperature"
        }
        columns={
          isArabic
            ? [
                "درجة الحرارة (°C)",
                "اللزوجة الديناميكية (mPa·s)",
                "اللزوجة الديناميكية (Pa·s)",
              ]
            : [
                "Temperature (°C)",
                "Dynamic viscosity (mPa·s)",
                "Dynamic viscosity (Pa·s)",
              ]
        }
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
