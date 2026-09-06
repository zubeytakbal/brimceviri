"use client";

import { buildSiteUrl } from "../../siteConfig";
import {
  reynoldsRegimeSources,
  type TechnicalReferenceLocale,
} from "../../converter/technicalReferenceData";
import TechnicalReferenceSheet, {
  TechnicalReferenceBandChart,
  TechnicalReferenceTable,
} from "./TechnicalReferenceSheet";

export default function ReynoldsRegimeReference({
  locale,
}: {
  locale: TechnicalReferenceLocale;
}) {
  const isTurkish = locale === "tr";
  const isArabic = locale === "ar";

  const rows = isArabic
    ? [
        [
          "صفحي",
          "Re < 2300",
          "تغلب التأثيرات اللزجة ويكون الخلط محدودا.",
        ],
        [
          "انتقالي",
          "2300 ≤ Re ≤ 4000",
          "يكون النظام حساسا لظروف الدخول والهندسة.",
        ],
        [
          "مضطرب",
          "Re > 4000",
          "تغلب تأثيرات العطالة ويزداد الخلط والاحتكاك.",
        ],
      ]
    : [
        [
          "Laminar",
          "Re < 2300",
          "Viscous effects dominate and mixing is limited.",
        ],
        [
          "Transition",
          "2300 ≤ Re ≤ 4000",
          "The regime is sensitive to inlet conditions and geometry.",
        ],
        [
          "Turbulent",
          "Re > 4000",
          "Inertial effects dominate, with stronger mixing and friction.",
        ],
      ];

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
          ? "Reynolds sayısı akış rejimi diyagramı"
          : isArabic
            ? "مخطط أنظمة الجريان حسب عدد رينولدز"
            : "Reynolds-number flow-regime diagram"
      }
      description={
        isTurkish
          ? "Bu diyagram, yalnızca iç boru akışı bağlamında kullanılan yaklaşık Reynolds rejim sınırlarını gösterir."
          : isArabic
            ? "يعرض هذا المخطط حدودا تقريبية لأنظمة الجريان المستخدمة خصوصا في الجريان الداخلي داخل الأنابيب."
            : "This diagram shows approximate Reynolds-regime boundaries used specifically for internal pipe flow."
      }
      definitionHeading={
        isTurkish ? "Tanım" : isArabic ? "التعريف" : "Definition"
      }
      definition={[
        isTurkish
          ? "Reynolds sayısı, atalet kuvvetleri ile viskoz kuvvetlerin oranını temsil eden boyutsuz büyüklüktür."
          : isArabic
            ? "عدد رينولدز كمية لا بعدية تقارن بين تأثيرات العطالة والتأثيرات اللزجة."
            : "The Reynolds number is a dimensionless quantity that compares inertial effects with viscous effects.",
        isTurkish
          ? "Bu diyagramdaki eşikler, özellikle düzgün dairesel boru içi akış için öğretici ve yaklaşık sınırlar olarak kullanılmalıdır."
          : isArabic
            ? "ينبغي التعامل مع هذه الحدود كإرشادات تقريبية وتعليمية خاصة بالجريان الداخلي في الأنابيب الدائرية الملساء."
            : "The thresholds shown here should be treated as instructional, approximate limits specifically for smooth internal flow in circular pipes.",
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
          symbol: "Re",
          description: isTurkish
            ? "Boyutsuz Reynolds sayısı"
            : isArabic
              ? "عدد رينولدز اللابعدي"
              : "Dimensionless Reynolds number",
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
        {
          symbol: "μ",
          description: isTurkish
            ? "Dinamik viskozite, Pa·s"
            : isArabic
              ? "اللزوجة الديناميكية، Pa·s"
              : "Dynamic viscosity, Pa·s",
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
          ? "ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m ve μ = 0.001001 Pa·s için Re ≈ 37400 bulunur; diyagramda bu değer türbülanslı bölgededir."
          : isArabic
            ? "عند ρ = 998 kg/m³ وv = 1.5 m/s وD = 0.025 m وμ = 0.001001 Pa·s يكون Re ≈ 37400، وهذا يقع في المجال المضطرب على المخطط."
            : "For ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m and μ = 0.001001 Pa·s, Re ≈ 37,400; on the diagram this falls in the turbulent region.",
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
          ? "Diyagram yalnızca iç boru akışı bağlamında kullanılmalıdır."
          : isArabic
            ? "يستخدم المخطط في سياق الجريان الداخلي داخل الأنابيب فقط."
            : "The diagram should only be used in the context of internal pipe flow.",
        isTurkish
          ? "Giriş etkileri, pürüzlülük, kesit şekli ve akış bozucular gerçek sınırları kaydırabilir."
          : isArabic
            ? "قد تغيّر تأثيرات الدخول والخشونة وشكل المقطع والاضطرابات حدود النظام الفعلية."
            : "Entrance effects, roughness, cross-section shape and flow disturbances can shift the effective boundaries.",
        isTurkish
          ? "Açık kanal, harici akış ve özel geometriler için aynı eşikler doğrudan kullanılmamalıdır."
          : isArabic
            ? "لا ينبغي تطبيق الحدود نفسها مباشرة على الجريان المفتوح أو الخارجي أو الهندسات الخاصة."
            : "The same thresholds should not be applied directly to open-channel flow, external flow or special geometries.",
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
          ? "Hesaplanan Reynolds sayısını hızlı rejim yorumuna çevirmek."
          : isArabic
            ? "تحويل قيمة رينولدز المحسوبة إلى تفسير سريع لنظام الجريان."
            : "Turning a calculated Reynolds number into a quick regime interpretation.",
        isTurkish
          ? "Öğrenci raporlarında akış rejimi diyagramı sunmak."
          : isArabic
            ? "تقديم مخطط نظام الجريان في التقارير التعليمية."
            : "Presenting a flow-regime diagram in student reports.",
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
          ? "Bu eşikleri tüm akış problemleri için evrensel kabul etmek."
          : isArabic
            ? "اعتبار هذه الحدود عامة لكل مسائل الجريان."
            : "Treating these thresholds as universal for every flow problem.",
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
      ]}
      sourcesHeading={
        isTurkish ? "Kaynaklar" : isArabic ? "المراجع" : "Sources"
      }
      sources={reynoldsRegimeSources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "reynolds-akis-rejimi-diyagrami.pdf"
          : isArabic
            ? "reynolds-flow-regime-ar.pdf"
            : "reynolds-flow-regime-diagram.pdf",
        title: isTurkish
          ? "Reynolds sayısı akış rejimi diyagramı"
          : isArabic
            ? "مخطط أنظمة الجريان حسب عدد رينولدز"
            : "Reynolds-number flow-regime diagram",
        description: isTurkish
          ? "Bu diyagram, yalnızca iç boru akışı bağlamında kullanılan yaklaşık Reynolds rejim sınırlarını gösterir."
          : isArabic
            ? "يعرض هذا المخطط حدودا تقريبية لأنظمة الجريان المستخدمة خصوصا في الجريان الداخلي داخل الأنابيب."
            : "This diagram shows approximate Reynolds-regime boundaries used specifically for internal pipe flow.",
        definitionHeading: isTurkish
          ? "Tanım"
          : isArabic
            ? "التعريف"
            : "Definition",
        definition: [
          isTurkish
            ? "Reynolds sayısı, atalet kuvvetleri ile viskoz kuvvetlerin oranını temsil eden boyutsuz büyüklüktür."
            : isArabic
              ? "عدد رينولدز كمية لا بعدية تقارن بين تأثيرات العطالة والتأثيرات اللزجة."
              : "The Reynolds number is a dimensionless quantity that compares inertial effects with viscous effects.",
          isTurkish
            ? "Bu diyagramdaki eşikler, özellikle düzgün dairesel boru içi akış için öğretici ve yaklaşık sınırlar olarak kullanılmalıdır."
            : isArabic
              ? "ينبغي التعامل مع هذه الحدود كإرشادات تقريبية وتعليمية خاصة بالجريان الداخلي في الأنابيب الدائرية الملساء."
              : "The thresholds shown here should be treated as instructional, approximate limits specifically for smooth internal flow in circular pipes.",
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
            symbol: "Re",
            description: isTurkish
              ? "Boyutsuz Reynolds sayısı"
              : isArabic
                ? "عدد رينولدز اللابعدي"
                : "Dimensionless Reynolds number",
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
          {
            symbol: "μ",
            description: isTurkish
              ? "Dinamik viskozite, Pa·s"
              : isArabic
                ? "اللزوجة الديناميكية، Pa·s"
                : "Dynamic viscosity, Pa·s",
          },
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : isArabic
            ? "مثال هندسي سريع"
            : "Short engineering example",
        example: [
          isTurkish
            ? "ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m ve μ = 0.001001 Pa·s için Re ≈ 37400 bulunur; diyagramda bu değer türbülanslı bölgededir."
            : isArabic
              ? "عند ρ = 998 kg/m³ وv = 1.5 m/s وD = 0.025 m وμ = 0.001001 Pa·s يكون Re ≈ 37400، وهذا يقع في المجال المضطرب على المخطط."
              : "For ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m and μ = 0.001001 Pa·s, Re ≈ 37,400; on the diagram this falls in the turbulent region.",
        ],
        conditionsHeading: isTurkish
          ? "Geçerlilik koşulları"
          : isArabic
            ? "شروط الاستخدام"
            : "Validity conditions",
        conditions: [
          isTurkish
            ? "Yalnızca iç boru akışı için yaklaşık sınıflandırma."
            : isArabic
              ? "تصنيف تقريبي للجريان الداخلي داخل الأنابيب فقط."
              : "Approximate classification for internal pipe flow only.",
          isTurkish
            ? "2300 ve 4000 sınırları öğretici mühendislik eşikleridir."
            : isArabic
              ? "الحدان 2300 و4000 هما حدود هندسية تعليمية تقريبية."
              : "The 2300 and 4000 boundaries are instructional engineering thresholds.",
        ],
        charts: [
          {
            kind: "band",
            caption: isTurkish
              ? "Şekil 3. İç boru akışı için Reynolds rejim bölgeleri"
              : isArabic
                ? "الشكل 3. مناطق نظام الجريان حسب رينولدز للجريان الداخلي"
                : "Figure 3. Reynolds-regime regions for internal pipe flow",
            xLabel: isArabic
              ? "عدد رينولدز Re (-)"
              : "Reynolds number, Re (-)",
            yLabel: isArabic ? "نظام الجريان" : "Flow regime",
            xTicks: [0, 1000, 2300, 4000, 10000],
            xMin: 0,
            xMax: 10000,
            bands: [
              {
                label: isArabic ? "صفحي" : "Laminar",
                start: 0,
                end: 2300,
                color: [153, 211, 146],
              },
              {
                label: isArabic ? "انتقالي" : "Transition",
                start: 2300,
                end: 4000,
                color: [124, 205, 214],
              },
              {
                label: isArabic ? "مضطرب" : "Turbulent",
                start: 4000,
                end: 10000,
                color: [22, 143, 140],
              },
            ],
          },
        ],
        tables: [
          {
            caption: isTurkish
              ? "Tablo 4. Reynolds sayısına göre akış rejimi özeti"
              : isArabic
                ? "الجدول 4. ملخص نظام الجريان حسب عدد رينولدز"
                : "Table 4. Flow-regime summary by Reynolds number",
            columns: isArabic
              ? ["النظام", "مدى Re", "التفسير"]
              : ["Regime", "Re range", "Interpretation"],
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
            ? "Re değeri yorumlama"
            : isArabic
              ? "تفسير قيمة رينولدز"
              : "Interpreting a Reynolds number",
          isTurkish
            ? "İç boru akışı eğitimi"
            : isArabic
              ? "تعليم الجريان الداخلي"
              : "Internal-flow teaching",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : isArabic
            ? "خطأ شائع"
            : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Eşikleri evrensel kabul etmek."
            : isArabic
              ? "اعتبار الحدود عامة في كل الحالات."
              : "Treating the thresholds as universal.",
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
        ],
        sourcesHeading: isTurkish
          ? "Kaynaklar"
          : isArabic
            ? "المراجع"
            : "Sources",
        sources: reynoldsRegimeSources,
      }}
    >
      <TechnicalReferenceBandChart
        bands={[
          {
            label: isArabic ? "صفحي" : "Laminar",
            start: 0,
            end: 2300,
            className: "technical-reference-band is-laminar",
          },
          {
            label: isArabic ? "انتقالي" : "Transition",
            start: 2300,
            end: 4000,
            className: "technical-reference-band is-transition",
          },
          {
            label: isArabic ? "مضطرب" : "Turbulent",
            start: 4000,
            end: 10000,
            className: "technical-reference-band is-turbulent",
          },
        ]}
        locale={locale}
        title={
          isTurkish
            ? "Şekil 3. İç boru akışı için Reynolds rejim diyagramı"
            : isArabic
              ? "الشكل 3. مخطط نظام الجريان حسب رينولدز للجريان الداخلي"
              : "Figure 3. Reynolds regime diagram for internal pipe flow"
        }
        xLabel={
          isArabic ? "عدد رينولدز Re (-)" : "Reynolds number, Re (-)"
        }
        xMax={10000}
        xMin={0}
        xTicks={[0, 1000, 2300, 4000, 10000]}
        yLabel={isArabic ? "نظام الجريان" : "Flow regime"}
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 4. Reynolds sayısına göre akış rejimi özeti"
            : isArabic
              ? "الجدول 4. ملخص نظام الجريان حسب عدد رينولدز"
              : "Table 4. Flow-regime summary by Reynolds number"
        }
        columns={
          isArabic
            ? ["النظام", "مدى Re", "التفسير"]
            : ["Regime", "Re range", "Interpretation"]
        }
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
