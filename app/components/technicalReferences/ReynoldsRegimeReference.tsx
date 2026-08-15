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
  const rows = [
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
      label={isTurkish ? "Teknik referans" : "Technical reference"}
      title={
        isTurkish
          ? "Reynolds sayısı akış rejimi diyagramı"
          : "Reynolds-number flow-regime diagram"
      }
      description={
        isTurkish
          ? "Bu diyagram, yalnızca iç boru akışı bağlamında kullanılan yaklaşık Reynolds rejim sınırlarını gösterir."
          : "This diagram shows approximate Reynolds-regime boundaries used specifically for internal pipe flow."
      }
      definitionHeading={isTurkish ? "Tanım" : "Definition"}
      definition={[
        isTurkish
          ? "Reynolds sayısı, atalet kuvvetleri ile viskoz kuvvetlerin oranını temsil eden boyutsuz büyüklüktür."
          : "The Reynolds number is a dimensionless quantity that compares inertial effects with viscous effects.",
        isTurkish
          ? "Bu diyagramdaki eşikler, özellikle düzgün dairesel boru içi akış için öğretici ve yaklaşık sınırlar olarak kullanılmalıdır."
          : "The thresholds shown here should be treated as instructional, approximate limits specifically for smooth internal flow in circular pipes.",
      ]}
      formulaHeading={isTurkish ? "Formül" : "Formula"}
      formulas={["Re = ρ v D / μ"]}
      variablesHeading={
        isTurkish ? "Değişkenler" : "Variables"
      }
      variables={[
        {
          symbol: "Re",
          description: isTurkish
            ? "Boyutsuz Reynolds sayısı"
            : "Dimensionless Reynolds number",
        },
        {
          symbol: "ρ",
          description: isTurkish
            ? "Yoğunluk, kg/m³"
            : "Density, kg/m³",
        },
        {
          symbol: "v",
          description: isTurkish ? "Hız, m/s" : "Velocity, m/s",
        },
        {
          symbol: "D",
          description: isTurkish
            ? "Karakteristik çap, m"
            : "Characteristic diameter, m",
        },
        {
          symbol: "μ",
          description: isTurkish
            ? "Dinamik viskozite, Pa·s"
            : "Dynamic viscosity, Pa·s",
        },
      ]}
      exampleHeading={
        isTurkish ? "Kısa mühendislik örneği" : "Short engineering example"
      }
      example={[
        isTurkish
          ? "ρ = 998 kg/m³, v = 1,5 m/s, D = 0,025 m ve μ = 0,001001 Pa·s için Re ≈ 37 400 bulunur; diyagramda bu değer türbülanslı bölgededir."
          : "For ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m and μ = 0.001001 Pa·s, Re ≈ 37,400; on the diagram this falls in the turbulent region.",
      ]}
      conditionsHeading={
        isTurkish ? "Geçerlilik koşulları ve varsayımlar" : "Validity conditions and assumptions"
      }
      conditions={[
        isTurkish
          ? "Diyagram yalnızca iç boru akışı bağlamında kullanılmalıdır."
          : "The diagram should only be used in the context of internal pipe flow.",
        isTurkish
          ? "Giriş etkileri, pürüzlülük, kesit şekli ve akış bozucular gerçek sınırları kaydırabilir."
          : "Entrance effects, roughness, cross-section shape and flow disturbances can shift the effective boundaries.",
        isTurkish
          ? "Açık kanal, harici akış ve özel geometriler için aynı eşikler doğrudan kullanılmamalıdır."
          : "The same thresholds should not be applied directly to open-channel flow, external flow or special geometries.",
      ]}
      useCasesHeading={
        isTurkish ? "Kullanım alanı" : "Use cases"
      }
      useCases={[
        isTurkish
          ? "Hesaplanan Reynolds sayısını hızlı rejim yorumuna çevirmek."
          : "Turning a calculated Reynolds number into a quick regime interpretation.",
        isTurkish
          ? "Öğrenci raporlarında akış rejimi diyagramı sunmak."
          : "Presenting a flow-regime diagram in student reports.",
        isTurkish
          ? "Boru içi akış korelasyonu seçimine giriş yapmak."
          : "Supporting an initial internal-flow correlation choice.",
      ]}
      commonMistakesHeading={
        isTurkish ? "Sık yapılan hata" : "Common mistake"
      }
      commonMistakes={[
        isTurkish
          ? "Bu eşikleri tüm akış problemleri için evrensel kabul etmek."
          : "Treating these thresholds as universal for every flow problem.",
      ]}
      relatedLinksHeading={
        isTurkish ? "İlgili hesaplayıcı" : "Related calculator"
      }
      relatedLinks={[
        {
          label: isTurkish
            ? "Reynolds Sayısı Hesaplayıcısı"
            : "Reynolds Number Calculator",
          href: isTurkish
            ? "/hesaplayicilar/reynolds-sayisi"
            : "/en/calculators/reynolds-number",
        },
      ]}
      sourcesHeading={isTurkish ? "Kaynaklar" : "Sources"}
      sources={reynoldsRegimeSources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "reynolds-akis-rejimi-diyagrami.pdf"
          : "reynolds-flow-regime-diagram.pdf",
        title: isTurkish
          ? "Reynolds sayısı akış rejimi diyagramı"
          : "Reynolds-number flow-regime diagram",
        description: isTurkish
          ? "Bu diyagram, yalnızca iç boru akışı bağlamında kullanılan yaklaşık Reynolds rejim sınırlarını gösterir."
          : "This diagram shows approximate Reynolds-regime boundaries used specifically for internal pipe flow.",
        definitionHeading: isTurkish ? "Tanım" : "Definition",
        definition: [
          isTurkish
            ? "Reynolds sayısı, atalet kuvvetleri ile viskoz kuvvetlerin oranını temsil eden boyutsuz büyüklüktür."
            : "The Reynolds number is a dimensionless quantity that compares inertial effects with viscous effects.",
          isTurkish
            ? "Bu diyagramdaki eşikler, özellikle düzgün dairesel boru içi akış için öğretici ve yaklaşık sınırlar olarak kullanılmalıdır."
            : "The thresholds shown here should be treated as instructional, approximate limits specifically for smooth internal flow in circular pipes.",
        ],
        formulaHeading: isTurkish ? "Formül" : "Formula",
        formulas: ["Re = ρ v D / μ"],
        variablesHeading: isTurkish
          ? "Değişkenler"
          : "Variables",
        variables: [
          {
            symbol: "Re",
            description: isTurkish
              ? "Boyutsuz Reynolds sayısı"
              : "Dimensionless Reynolds number",
          },
          {
            symbol: "ρ",
            description: isTurkish
              ? "Yoğunluk, kg/m³"
              : "Density, kg/m³",
          },
          {
            symbol: "v",
            description: isTurkish ? "Hız, m/s" : "Velocity, m/s",
          },
          {
            symbol: "D",
            description: isTurkish
              ? "Karakteristik çap, m"
              : "Characteristic diameter, m",
          },
          {
            symbol: "μ",
            description: isTurkish
              ? "Dinamik viskozite, Pa·s"
              : "Dynamic viscosity, Pa·s",
          },
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : "Short engineering example",
        example: [
          isTurkish
            ? "ρ = 998 kg/m³, v = 1,5 m/s, D = 0,025 m ve μ = 0,001001 Pa·s için Re ≈ 37 400 bulunur; diyagramda bu değer türbülanslı bölgededir."
            : "For ρ = 998 kg/m³, v = 1.5 m/s, D = 0.025 m and μ = 0.001001 Pa·s, Re ≈ 37,400; on the diagram this falls in the turbulent region.",
        ],
        conditionsHeading: isTurkish
          ? "Geçerlilik koşulları"
          : "Validity conditions",
        conditions: [
          isTurkish
            ? "Yalnızca iç boru akışı için yaklaşık sınıflandırma."
            : "Approximate classification for internal pipe flow only.",
          isTurkish
            ? "2300 ve 4000 sınırları öğretici mühendislik eşikleridir."
            : "The 2300 and 4000 boundaries are instructional engineering thresholds.",
        ],
        charts: [
          {
            kind: "band",
            caption: isTurkish
              ? "Şekil 3. İç boru akışı için Reynolds rejim bölgeleri"
              : "Figure 3. Reynolds-regime regions for internal pipe flow",
            xLabel: "Reynolds number, Re (-)",
            yLabel: "Flow regime",
            xTicks: [0, 1000, 2300, 4000, 10000],
            xMin: 0,
            xMax: 10000,
            bands: [
              {
                label: "Laminar",
                start: 0,
                end: 2300,
                color: [153, 211, 146],
              },
              {
                label: "Transition",
                start: 2300,
                end: 4000,
                color: [124, 205, 214],
              },
              {
                label: "Turbulent",
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
              : "Table 4. Flow-regime summary by Reynolds number",
            columns: ["Regime", "Re range", "Interpretation"],
            rows,
          },
        ],
        useCasesHeading: isTurkish
          ? "Kullanım alanı"
          : "Use cases",
        useCases: [
          isTurkish
            ? "Re değeri yorumlama"
            : "Interpreting a Reynolds number",
          isTurkish
            ? "İç boru akışı eğitimi"
            : "Internal-flow teaching",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Eşikleri evrensel kabul etmek."
            : "Treating the thresholds as universal.",
        ],
        relatedLinksHeading: isTurkish
          ? "İlgili bağlantılar"
          : "Related links",
        relatedLinks: [
          {
            label: isTurkish
              ? "Reynolds Sayısı Hesaplayıcısı"
              : "Reynolds Number Calculator",
            url: buildSiteUrl(
              isTurkish
                ? "/hesaplayicilar/reynolds-sayisi"
                : "/en/calculators/reynolds-number"
            ),
          },
        ],
        sourcesHeading: isTurkish ? "Kaynaklar" : "Sources",
        sources: reynoldsRegimeSources,
      }}
    >
      <TechnicalReferenceBandChart
        bands={[
          {
            label: "Laminar",
            start: 0,
            end: 2300,
            className: "technical-reference-band is-laminar",
          },
          {
            label: "Transition",
            start: 2300,
            end: 4000,
            className: "technical-reference-band is-transition",
          },
          {
            label: "Turbulent",
            start: 4000,
            end: 10000,
            className: "technical-reference-band is-turbulent",
          },
        ]}
        locale={locale}
        title={
          isTurkish
            ? "Şekil 3. İç boru akışı için Reynolds rejim diyagramı"
            : "Figure 3. Reynolds regime diagram for internal pipe flow"
        }
        xLabel="Reynolds number, Re (-)"
        xMax={10000}
        xMin={0}
        xTicks={[0, 1000, 2300, 4000, 10000]}
        yLabel="Flow regime"
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 4. Reynolds sayısına göre akış rejimi özeti"
            : "Table 4. Flow-regime summary by Reynolds number"
        }
        columns={["Regime", "Re range", "Interpretation"]}
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
