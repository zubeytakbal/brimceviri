"use client";

import { buildSiteUrl } from "../../siteConfig";
import {
  type TechnicalReferenceLocale,
  waterDensityByTemperature,
  waterDensitySources,
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

export default function WaterDensityReference({
  locale,
}: {
  locale: TechnicalReferenceLocale;
}) {
  const isTurkish = locale === "tr";
  const isArabic = locale === "ar";

  const points = waterDensityByTemperature.map((point) => ({
    x: point.temperatureC,
    y: point.value,
  }));
  const rows = waterDensityByTemperature.map((point) => [
    formatValue(point.temperatureC, locale, 2),
    formatValue(point.value, locale, 5),
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
          ? "Suyun sıcaklığa göre yoğunluğu"
          : isArabic
            ? "كثافة الماء بدلالة درجة الحرارة"
            : "Density of water as a function of temperature"
      }
      description={
        isTurkish
          ? "Bu teknik föy, atmosfer basıncına yakın koşullarda sıvı su yoğunluğunu tablo ve grafik olarak özetler."
          : isArabic
            ? "يلخص هذا المرجع التقني كثافة الماء السائل قرب الضغط الجوي في صورة جدول ومخطط."
            : "This technical sheet summarizes liquid-water density near atmospheric pressure as a table and graph."
      }
      definitionHeading={
        isTurkish ? "Tanım" : isArabic ? "التعريف" : "Definition"
      }
      definition={[
        isTurkish
          ? "Yoğunluk, birim hacimdeki kütleyi gösterir ve hidrostatik basınç, seviye ve akışkan özellik hesabında temel girdilerden biridir."
          : isArabic
            ? "الكثافة تمثل الكتلة في وحدة الحجم، وهي مدخل أساسي في حسابات الضغط الهيدروستاتيكي والمنسوب وخواص الموائع."
            : "Density is mass per unit volume and is a core input in hydrostatic pressure, level and fluid-property calculations.",
        isTurkish
          ? "Sıvı su için yoğunluk sıcaklığa bağlı olarak değişir; bu yüzden hassas hesaplarda sabit 1000 kg/m³ kabulü her zaman yeterli değildir."
          : isArabic
            ? "في الماء السائل تتغير الكثافة مع الحرارة، لذلك لا يكون افتراض 1000 kg/m³ كافيا دائما في الحسابات الأدق."
            : "For liquid water, density changes with temperature, so a fixed value of 1000 kg/m³ is not always adequate for precise work.",
      ]}
      formulaHeading={
        isTurkish ? "Formül" : isArabic ? "المعادلة" : "Formula"
      }
      formulas={["ΔP = ρ g h", "ρ = m / V"]}
      variablesHeading={
        isTurkish
          ? "Değişkenler"
          : isArabic
            ? "المتغيرات"
            : "Variables"
      }
      variables={[
        {
          symbol: "ρ",
          description: isTurkish
            ? "Yoğunluk, kg/m³"
            : isArabic
              ? "الكثافة، kg/m³"
              : "Density, kg/m³",
        },
        {
          symbol: "m",
          description: isTurkish
            ? "Kütle, kg"
            : isArabic
              ? "الكتلة، kg"
              : "Mass, kg",
        },
        {
          symbol: "V",
          description: isTurkish
            ? "Hacim, m³"
            : isArabic
              ? "الحجم، m³"
              : "Volume, m³",
        },
        {
          symbol: "ΔP",
          description: isTurkish
            ? "Basınç farkı, Pa"
            : isArabic
              ? "فرق الضغط، Pa"
              : "Pressure difference, Pa",
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
          ? "20 °C civarında su yoğunluğu yaklaşık 998.20509 kg/m³ alınırsa, 10 m derinlikte hidrostatik basınç farkı yaklaşık 97.89 kPa olur."
          : isArabic
            ? "إذا اعتبرت كثافة الماء قرب 20 °C نحو 998.20509 kg/m³، فإن زيادة الضغط الهيدروستاتيكي عند عمق 10 m تكون تقريبا 97.89 kPa."
            : "Using a water density of about 998.20509 kg/m³ near 20 °C, the hydrostatic pressure rise at 10 m depth is about 97.89 kPa.",
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
          ? "Veriler 0.101325 MPa sabit basınçta, sıvı su dalı için seçilmiştir."
          : isArabic
            ? "البيانات مختارة عند ضغط ثابت 0.101325 MPa وعلى فرع الماء السائل."
            : "The data are selected at a constant pressure of 0.101325 MPa on the liquid-water branch.",
        isTurkish
          ? "Sıcaklık aralığı yaklaşık 0.01 °C ile 99.97 °C arasındadır."
          : isArabic
            ? "مجال درجة الحرارة تقريبا من 0.01 °C إلى 99.97 °C."
            : "The temperature range is approximately 0.01 °C to 99.97 °C.",
        isTurkish
          ? "Değerler NIST çıktısından alınmış olup IAPWS-95 formülasyonuna dayalı yaklaşık mühendislik referansıdır."
          : isArabic
            ? "القيم مأخوذة من مرجع NIST المبني على صياغة IAPWS-95 وتستخدم كمرجع هندسي تقريبي."
            : "The values come from an NIST output based on the IAPWS-95 formulation and serve as approximate engineering reference data.",
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
          ? "Hidrostatik basınç hesabında sıcaklığa uygun su yoğunluğu seçmek."
          : isArabic
            ? "اختيار كثافة ماء مناسبة لدرجة الحرارة في حسابات الضغط الهيدروستاتيكي."
            : "Selecting a temperature-appropriate water density for hydrostatic-pressure work.",
        isTurkish
          ? "Tank, depo ve seviye hesaplarında hata payını azaltmak."
          : isArabic
            ? "تقليل الخطأ في حسابات الخزانات والمناسيب."
            : "Reducing error in tank, vessel and level calculations.",
        isTurkish
          ? "Laboratuvar raporu veya ders notu için teknik başvuru verisi sunmak."
          : isArabic
            ? "تقديم مرجع تقني للتقارير المخبرية أو التعليمية."
            : "Providing technical reference data for lab reports or coursework.",
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
          ? "Her sıcaklıkta doğrudan 1000 kg/m³ kullanmak ve sıcaklık etkisini ihmal etmek."
          : isArabic
            ? "استخدام 1000 kg/m³ عند كل درجة حرارة وإهمال أثر الحرارة."
            : "Using 1000 kg/m³ at every temperature and ignoring the temperature effect.",
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
        {
          label: isTurkish
            ? "Basınç kategorisi"
            : isArabic
              ? "فئة الضغط"
              : "Pressure category",
          href: isTurkish
            ? "/kategoriler/basinc"
            : isArabic
              ? "/ar/categories/pressure"
              : "/en/categories/pressure",
        },
      ]}
      sourcesHeading={
        isTurkish ? "Kaynaklar" : isArabic ? "المراجع" : "Sources"
      }
      sources={waterDensitySources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "suyun-sicakliga-gore-yogunlugu.pdf"
          : isArabic
            ? "water-density-temperature-ar.pdf"
            : "water-density-temperature-table.pdf",
        title: isTurkish
          ? "Suyun sıcaklığa göre yoğunluğu"
          : isArabic
            ? "كثافة الماء بدلالة درجة الحرارة"
            : "Density of water as a function of temperature",
        description: isTurkish
          ? "Bu teknik föy, atmosfer basıncına yakın koşullarda sıvı su yoğunluğunu tablo ve grafik olarak özetler."
          : isArabic
            ? "يلخص هذا المرجع التقني كثافة الماء السائل قرب الضغط الجوي في صورة جدول ومخطط."
            : "This technical sheet summarizes liquid-water density near atmospheric pressure as a table and graph.",
        definitionHeading: isTurkish
          ? "Tanım"
          : isArabic
            ? "التعريف"
            : "Definition",
        definition: [
          isTurkish
            ? "Yoğunluk, birim hacimdeki kütleyi gösterir ve hidrostatik basınç, seviye ve akışkan özellik hesabında temel girdilerden biridir."
            : isArabic
              ? "الكثافة تمثل الكتلة في وحدة الحجم، وهي مدخل أساسي في حسابات الضغط الهيدروستاتيكي والمنسوب وخواص الموائع."
              : "Density is mass per unit volume and is a core input in hydrostatic pressure, level and fluid-property calculations.",
          isTurkish
            ? "Sıvı su için yoğunluk sıcaklığa bağlı olarak değişir; bu yüzden hassas hesaplarda sabit 1000 kg/m³ kabulü her zaman yeterli değildir."
            : isArabic
              ? "في الماء السائل تتغير الكثافة مع الحرارة، لذلك لا يكون افتراض 1000 kg/m³ كافيا دائما في الحسابات الأدق."
              : "For liquid water, density changes with temperature, so a fixed value of 1000 kg/m³ is not always adequate for precise work.",
        ],
        formulaHeading: isTurkish
          ? "Formül"
          : isArabic
            ? "المعادلة"
            : "Formula",
        formulas: ["ΔP = ρ g h", "ρ = m / V"],
        variablesHeading: isTurkish
          ? "Değişkenler"
          : isArabic
            ? "المتغيرات"
            : "Variables",
        variables: [
          {
            symbol: "ρ",
            description: isTurkish
              ? "Yoğunluk, kg/m³"
              : isArabic
                ? "الكثافة، kg/m³"
                : "Density, kg/m³",
          },
          {
            symbol: "m",
            description: isTurkish
              ? "Kütle, kg"
              : isArabic
                ? "الكتلة، kg"
                : "Mass, kg",
          },
          {
            symbol: "V",
            description: isTurkish
              ? "Hacim, m³"
              : isArabic
                ? "الحجم، m³"
                : "Volume, m³",
          },
          {
            symbol: "ΔP",
            description: isTurkish
              ? "Basınç farkı, Pa"
              : isArabic
                ? "فرق الضغط، Pa"
                : "Pressure difference, Pa",
          },
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : isArabic
            ? "مثال هندسي سريع"
            : "Short engineering example",
        example: [
          isTurkish
            ? "20 °C civarında su yoğunluğu yaklaşık 998.20509 kg/m³ alınırsa, 10 m derinlikte hidrostatik basınç farkı yaklaşık 97.89 kPa olur."
            : isArabic
              ? "إذا اعتبرت كثافة الماء قرب 20 °C نحو 998.20509 kg/m³، فإن زيادة الضغط الهيدروستاتيكي عند عمق 10 m تكون تقريبا 97.89 kPa."
              : "Using a water density of about 998.20509 kg/m³ near 20 °C, the hydrostatic pressure rise at 10 m depth is about 97.89 kPa.",
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
            ? "IAPWS-95 temelli NIST referans verisi."
            : isArabic
              ? "بيانات مرجعية من NIST مبنية على IAPWS-95."
              : "NIST reference data based on IAPWS-95.",
        ],
        charts: [
          {
            kind: "line",
            caption: isTurkish
              ? "Şekil 1. Sıvı su yoğunluğunun sıcaklıkla değişimi"
              : isArabic
                ? "الشكل 1. تغير كثافة الماء السائل مع درجة الحرارة"
                : "Figure 1. Variation of liquid-water density with temperature",
            xLabel: isArabic ? "درجة الحرارة (°C)" : "Temperature (°C)",
            yLabel: isArabic ? "الكثافة (kg/m³)" : "Density (kg/m³)",
            xTicks: [0, 20, 40, 60, 80, 100],
            yTicks: [960, 970, 980, 990, 1000],
            points,
            color: [25, 119, 180],
            formatX: (value, currentLocale) =>
              formatValue(value, currentLocale, 0),
            formatY: (value, currentLocale) =>
              formatValue(value, currentLocale, 0),
          },
        ],
        tables: [
          {
            caption: isTurkish
              ? "Tablo 1. Suyun sıcaklığa göre yoğunluğu"
              : isArabic
                ? "الجدول 1. كثافة الماء حسب درجة الحرارة"
                : "Table 1. Water density by temperature",
            columns: isArabic
              ? ["درجة الحرارة (°C)", "الكثافة (kg/m³)"]
              : ["Temperature (°C)", "Density (kg/m³)"],
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
            ? "Hidrostatik basınç hesabı"
            : isArabic
              ? "حساب الضغط الهيدروستاتيكي"
              : "Hydrostatic-pressure calculation",
          isTurkish
            ? "Tank ve seviye hesabı"
            : isArabic
              ? "حسابات الخزانات والمناسيب"
              : "Tank and level calculation",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : isArabic
            ? "خطأ شائع"
            : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Sıcaklık etkisini ihmal etmek."
            : isArabic
              ? "إهمال تأثير درجة الحرارة."
              : "Ignoring the temperature effect.",
        ],
        relatedLinksHeading: isTurkish
          ? "İlgili bağlantılar"
          : isArabic
            ? "روابط مرتبطة"
            : "Related links",
        relatedLinks: [
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
          {
            label: isTurkish
              ? "Basınç kategorisi"
              : isArabic
                ? "فئة الضغط"
                : "Pressure category",
            url: buildSiteUrl(
              isTurkish
                ? "/kategoriler/basinc"
                : isArabic
                  ? "/ar/categories/pressure"
                  : "/en/categories/pressure"
            ),
          },
        ],
        sourcesHeading: isTurkish
          ? "Kaynaklar"
          : isArabic
            ? "المراجع"
            : "Sources",
        sources: waterDensitySources,
      }}
    >
      <TechnicalReferenceLineChart
        formatX={(value, currentLocale) =>
          formatValue(value, currentLocale, 0)
        }
        formatY={(value, currentLocale) =>
          formatValue(value, currentLocale, 0)
        }
        locale={locale}
        points={points}
        title={
          isTurkish
            ? "Şekil 1. Atmosfer basıncına yakın koşullarda sıvı su yoğunluğu"
            : isArabic
              ? "الشكل 1. كثافة الماء السائل قرب الضغط الجوي"
              : "Figure 1. Liquid-water density near atmospheric pressure"
        }
        xLabel={isArabic ? "درجة الحرارة (°C)" : "Temperature (°C)"}
        xTicks={[0, 20, 40, 60, 80, 100]}
        yLabel={isArabic ? "الكثافة (kg/m³)" : "Density (kg/m³)"}
        yTicks={[960, 970, 980, 990, 1000]}
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 1. Suyun sıcaklığa göre yoğunluğu"
            : isArabic
              ? "الجدول 1. كثافة الماء حسب درجة الحرارة"
              : "Table 1. Water density by temperature"
        }
        columns={
          isArabic
            ? ["درجة الحرارة (°C)", "الكثافة (kg/m³)"]
            : ["Temperature (°C)", "Density (kg/m³)"]
        }
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
