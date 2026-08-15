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
    locale === "tr" ? "tr-TR" : "en-US",
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
      label={isTurkish ? "Teknik referans" : "Technical reference"}
      title={
        isTurkish
          ? "Sıvı suyun sıcaklığa göre dinamik viskozitesi"
          : "Dynamic viscosity of liquid water as a function of temperature"
      }
      description={
        isTurkish
          ? "Bu teknik föy, Reynolds sayısı ve boru içi akış analizlerinde sık kullanılan sıvı su viskozite verisini özetler."
          : "This technical sheet summarizes liquid-water viscosity data commonly used in Reynolds-number and internal-flow analysis."
      }
      definitionHeading={isTurkish ? "Tanım" : "Definition"}
      definition={[
        isTurkish
          ? "Dinamik viskozite, akışkanın kesme deformasyonuna karşı gösterdiği dirençtir ve boru içi akış rejimi ile sürtünme kaybını doğrudan etkiler."
          : "Dynamic viscosity is a measure of resistance to shear deformation and directly affects internal-flow regime and friction loss.",
      ]}
      formulaHeading={isTurkish ? "Formül" : "Formula"}
      formulas={[
        "Re = ρ v D / μ",
      ]}
      variablesHeading={
        isTurkish ? "Değişkenler" : "Variables"
      }
      variables={[
        {
          symbol: "μ",
          description: isTurkish
            ? "Dinamik viskozite, Pa·s veya mPa·s"
            : "Dynamic viscosity, Pa·s or mPa·s",
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
      ]}
      exampleHeading={
        isTurkish ? "Kısa mühendislik örneği" : "Short engineering example"
      }
      example={[
        isTurkish
          ? "20 °C civarında su için μ ≈ 1,0014 mPa·s alınırsa, 25 mm boruda 1,5 m/s hız için Reynolds sayısı yaklaşık 37 400 bulunur ve akış türbülanslı bölgede değerlendirilir."
          : "Using μ ≈ 1.0014 mPa·s for water near 20 °C, a velocity of 1.5 m/s in a 25 mm pipe gives a Reynolds number of about 37,400, which falls in the turbulent range.",
      ]}
      conditionsHeading={
        isTurkish ? "Geçerlilik koşulları ve varsayımlar" : "Validity conditions and assumptions"
      }
      conditions={[
        isTurkish
          ? "Veriler 0,101325 MPa sabit basınçta ve sıvı su dalında alınmıştır."
          : "The data are taken at a constant pressure of 0.101325 MPa on the liquid-water branch.",
        isTurkish
          ? "Sıcaklık aralığı yaklaşık 0,01 °C ile 99,97 °C arasındadır."
          : "The temperature range is approximately 0.01 °C to 99.97 °C.",
        isTurkish
          ? "Grafikte ana eksen mPa·s olarak verilmiştir; tabloda hem mPa·s hem Pa·s birlikte gösterilir."
          : "The chart uses mPa·s on the main axis, and the table lists both mPa·s and Pa·s.",
      ]}
      useCasesHeading={
        isTurkish ? "Kullanım alanı" : "Use cases"
      }
      useCases={[
        isTurkish
          ? "Reynolds sayısı hesabında gerçekçi su viskozitesi seçmek."
          : "Selecting realistic water viscosity for Reynolds-number calculations.",
        isTurkish
          ? "Boru içi basınç kaybı ve laminer akış değerlendirmeleri."
          : "Internal-flow pressure-drop and laminar-flow assessments.",
        isTurkish
          ? "Laboratuvar deneylerinde sıcaklığa bağlı akışkan özellik analizi."
          : "Temperature-dependent fluid-property analysis in lab work.",
      ]}
      commonMistakesHeading={
        isTurkish ? "Sık yapılan hata" : "Common mistake"
      }
      commonMistakes={[
        isTurkish
          ? "Dinamik viskoziteyi kinematik viskozite ile karıştırmak veya cP ile Pa·s dönüşümünü yanlış yapmak."
          : "Mixing dynamic viscosity with kinematic viscosity or converting cP and Pa·s incorrectly.",
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
        {
          label: isTurkish
            ? "Hidrostatik Basınç Hesaplayıcısı"
            : "Hydrostatic Pressure Calculator",
          href: isTurkish
            ? "/hesaplayicilar/hidrostatik-basinc"
            : "/en/calculators/hydrostatic-pressure",
        },
      ]}
      sourcesHeading={isTurkish ? "Kaynaklar" : "Sources"}
      sources={waterViscositySources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "suyun-dinamik-viskozitesi.pdf"
          : "water-dynamic-viscosity-reference-sheet.pdf",
        title: isTurkish
          ? "Sıvı suyun sıcaklığa göre dinamik viskozitesi"
          : "Dynamic viscosity of liquid water as a function of temperature",
        description: isTurkish
          ? "Bu teknik föy, Reynolds sayısı ve boru içi akış analizlerinde sık kullanılan sıvı su viskozite verisini özetler."
          : "This technical sheet summarizes liquid-water viscosity data commonly used in Reynolds-number and internal-flow analysis.",
        definitionHeading: isTurkish ? "Tanım" : "Definition",
        definition: [
          isTurkish
            ? "Dinamik viskozite, akışkanın kesme deformasyonuna karşı gösterdiği dirençtir ve boru içi akış rejimi ile sürtünme kaybını doğrudan etkiler."
            : "Dynamic viscosity is a measure of resistance to shear deformation and directly affects internal-flow regime and friction loss.",
        ],
        formulaHeading: isTurkish ? "Formül" : "Formula",
        formulas: ["Re = ρ v D / μ"],
        variablesHeading: isTurkish
          ? "Değişkenler"
          : "Variables",
        variables: [
          {
            symbol: "μ",
            description: isTurkish
              ? "Dinamik viskozite, Pa·s veya mPa·s"
              : "Dynamic viscosity, Pa·s or mPa·s",
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
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : "Short engineering example",
        example: [
          isTurkish
            ? "20 °C civarında su için μ ≈ 1,0014 mPa·s alınırsa, 25 mm boruda 1,5 m/s hız için Reynolds sayısı yaklaşık 37 400 bulunur ve akış türbülanslı bölgede değerlendirilir."
            : "Using μ ≈ 1.0014 mPa·s for water near 20 °C, a velocity of 1.5 m/s in a 25 mm pipe gives a Reynolds number of about 37,400, which falls in the turbulent range.",
        ],
        conditionsHeading: isTurkish
          ? "Geçerlilik koşulları"
          : "Validity conditions",
        conditions: [
          isTurkish
            ? "0,101325 MPa sabit basınç, sıvı su dalı."
            : "0.101325 MPa constant pressure, liquid-water branch.",
          isTurkish
            ? "Sıcaklık aralığı yaklaşık 0,01 °C ile 99,97 °C."
            : "Temperature range approximately 0.01 °C to 99.97 °C.",
          isTurkish
            ? "IAPWS viskozite formülasyonuna dayalı NIST verisi."
            : "NIST data based on the IAPWS viscosity formulation.",
        ],
        charts: [
          {
            kind: "line",
            caption: isTurkish
              ? "Şekil 2. Sıvı su dinamik viskozitesinin sıcaklıkla değişimi"
              : "Figure 2. Variation of liquid-water dynamic viscosity with temperature",
            xLabel: "Temperature (°C)",
            yLabel: "Dynamic viscosity (mPa·s)",
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
              : "Table 2. Dynamic viscosity of liquid water by temperature",
            columns: [
              "Temperature (°C)",
              "Dynamic viscosity (mPa·s)",
              "Dynamic viscosity (Pa·s)",
            ],
            rows,
          },
        ],
        useCasesHeading: isTurkish
          ? "Kullanım alanı"
          : "Use cases",
        useCases: [
          isTurkish
            ? "Reynolds sayısı hesabı"
            : "Reynolds-number calculation",
          isTurkish
            ? "Basınç kaybı hesabı"
            : "Pressure-drop calculation",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Yanlış viskozite birimi kullanmak."
            : "Using the wrong viscosity unit.",
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
          {
            label: isTurkish
              ? "Hidrostatik Basınç Hesaplayıcısı"
              : "Hydrostatic Pressure Calculator",
            url: buildSiteUrl(
              isTurkish
                ? "/hesaplayicilar/hidrostatik-basinc"
                : "/en/calculators/hydrostatic-pressure"
            ),
          },
        ],
        sourcesHeading: isTurkish ? "Kaynaklar" : "Sources",
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
            : "Figure 2. Liquid-water dynamic viscosity near atmospheric pressure"
        }
        xLabel="Temperature (°C)"
        xTicks={[0, 20, 40, 60, 80, 100]}
        yLabel="Dynamic viscosity (mPa·s)"
        yTicks={[0.3, 0.6, 0.9, 1.2, 1.5, 1.8]}
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 2. Sıvı suyun sıcaklığa göre dinamik viskozitesi"
            : "Table 2. Dynamic viscosity of liquid water by temperature"
        }
        columns={[
          "Temperature (°C)",
          "Dynamic viscosity (mPa·s)",
          "Dynamic viscosity (Pa·s)",
        ]}
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
