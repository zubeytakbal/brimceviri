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
    locale === "tr" ? "tr-TR" : "en-US",
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
      label={isTurkish ? "Teknik referans" : "Technical reference"}
      title={
        isTurkish
          ? "Suyun sıcaklığa göre yoğunluğu"
          : "Density of water as a function of temperature"
      }
      description={
        isTurkish
          ? "Bu teknik föy, atmosfer basıncına yakın koşullarda sıvı su yoğunluğunu tablo ve grafik olarak özetler."
          : "This technical sheet summarizes liquid-water density near atmospheric pressure as a table and graph."
      }
      definitionHeading={isTurkish ? "Tanım" : "Definition"}
      definition={[
        isTurkish
          ? "Yoğunluk, birim hacimdeki kütleyi gösterir ve hidrostatik basınç, seviye ve akışkan özellik hesabında temel girdilerden biridir."
          : "Density is mass per unit volume and is a core input in hydrostatic pressure, level and fluid-property calculations.",
        isTurkish
          ? "Sıvı su için yoğunluk sıcaklığa bağlı olarak değişir; bu yüzden hassas hesaplarda sabit 1000 kg/m³ kabulü her zaman yeterli değildir."
          : "For liquid water, density changes with temperature, so a fixed value of 1000 kg/m³ is not always adequate for precise work.",
      ]}
      formulaHeading={isTurkish ? "Formül" : "Formula"}
      formulas={[
        "ΔP = ρ g h",
        "ρ = m / V",
      ]}
      variablesHeading={
        isTurkish ? "Değişkenler" : "Variables"
      }
      variables={[
        {
          symbol: "ρ",
          description: isTurkish
            ? "Yoğunluk, kg/m³"
            : "Density, kg/m³",
        },
        {
          symbol: "m",
          description: isTurkish ? "Kütle, kg" : "Mass, kg",
        },
        {
          symbol: "V",
          description: isTurkish
            ? "Hacim, m³"
            : "Volume, m³",
        },
        {
          symbol: "ΔP",
          description: isTurkish
            ? "Basınç farkı, Pa"
            : "Pressure difference, Pa",
        },
      ]}
      exampleHeading={
        isTurkish ? "Kısa mühendislik örneği" : "Short engineering example"
      }
      example={[
        isTurkish
          ? "20 °C civarında su yoğunluğu yaklaşık 998,20509 kg/m³ alınırsa, 10 m derinlikte hidrostatik basınç farkı ΔP ≈ 998,20509 × 9,80665 × 10 = 97,89 kPa olur."
          : "Using a water density of about 998.20509 kg/m³ near 20 °C, the hydrostatic pressure rise at 10 m depth is ΔP ≈ 998.20509 × 9.80665 × 10 = 97.89 kPa.",
      ]}
      conditionsHeading={
        isTurkish ? "Geçerlilik koşulları ve varsayımlar" : "Validity conditions and assumptions"
      }
      conditions={[
        isTurkish
          ? "Veriler 0,101325 MPa sabit basınçta, sıvı su dalı için seçilmiştir."
          : "The data are selected at a constant pressure of 0.101325 MPa on the liquid-water branch.",
        isTurkish
          ? "Sıcaklık aralığı yaklaşık 0,01 °C ile 99,97 °C arasındadır."
          : "The temperature range is approximately 0.01 °C to 99.97 °C.",
        isTurkish
          ? "Değerler NIST çıktısından alınmış olup IAPWS-95 formülasyonuna dayalı yaklaşık mühendislik referansıdır."
          : "The values come from an NIST output based on the IAPWS-95 formulation and serve as approximate engineering reference data.",
      ]}
      useCasesHeading={
        isTurkish ? "Kullanım alanı" : "Use cases"
      }
      useCases={[
        isTurkish
          ? "Hidrostatik basınç hesabında sıcaklığa uygun su yoğunluğu seçmek."
          : "Selecting a temperature-appropriate water density for hydrostatic-pressure work.",
        isTurkish
          ? "Tank, depo ve seviye hesaplarında hata payını azaltmak."
          : "Reducing error in tank, vessel and level calculations.",
        isTurkish
          ? "Laboratuvar raporu veya ders notu için teknik başvuru verisi sunmak."
          : "Providing technical reference data for lab reports or coursework.",
      ]}
      commonMistakesHeading={
        isTurkish ? "Sık yapılan hata" : "Common mistake"
      }
      commonMistakes={[
        isTurkish
          ? "Her sıcaklıkta doğrudan 1000 kg/m³ kullanmak ve sıcaklık etkisini ihmal etmek."
          : "Using 1000 kg/m³ at every temperature and ignoring the temperature effect.",
      ]}
      relatedLinksHeading={
        isTurkish ? "İlgili hesaplayıcı" : "Related calculator"
      }
      relatedLinks={[
        {
          label: isTurkish
            ? "Hidrostatik Basınç Hesaplayıcısı"
            : "Hydrostatic Pressure Calculator",
          href: isTurkish
            ? "/hesaplayicilar/hidrostatik-basinc"
            : "/en/calculators/hydrostatic-pressure",
        },
        {
          label: isTurkish
            ? "Basınç kategorisi"
            : "Pressure category",
          href: isTurkish
            ? "/kategoriler/basinc"
            : "/en/categories/pressure",
        },
      ]}
      sourcesHeading={isTurkish ? "Kaynaklar" : "Sources"}
      sources={waterDensitySources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "suyun-sicakliga-gore-yogunlugu.pdf"
          : "water-density-reference-sheet.pdf",
        title: isTurkish
          ? "Suyun sıcaklığa göre yoğunluğu"
          : "Density of water as a function of temperature",
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
            ? "IAPWS-95 temelli NIST referans verisi."
            : "NIST reference data based on IAPWS-95.",
        ],
        charts: [
          {
            kind: "line",
            caption: isTurkish
              ? "Şekil 1. Sıvı su yoğunluğunun sıcaklıkla değişimi"
              : "Figure 1. Variation of liquid-water density with temperature",
            xLabel: "Temperature (°C)",
            yLabel: "Density (kg/m³)",
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
              : "Table 1. Water density by temperature",
            columns: ["Temperature (°C)", "Density (kg/m³)"],
            rows,
          },
        ],
        useCasesHeading: isTurkish
          ? "Kullanım alanı"
          : "Use cases",
        useCases: [
          isTurkish
            ? "Hidrostatik basınç hesabı"
            : "Hydrostatic-pressure calculation",
          isTurkish
            ? "Tank ve seviye hesabı"
            : "Tank and level calculation",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Sıcaklık etkisini ihmal etmek."
            : "Ignoring the temperature effect.",
        ],
        relatedLinksHeading: isTurkish
          ? "İlgili bağlantılar"
          : "Related links",
        relatedLinks: [
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
            : "Figure 1. Liquid-water density near atmospheric pressure"
        }
        xLabel="Temperature (°C)"
        xTicks={[0, 20, 40, 60, 80, 100]}
        yLabel="Density (kg/m³)"
        yTicks={[960, 970, 980, 990, 1000]}
      />

      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 1. Suyun sıcaklığa göre yoğunluğu"
            : "Table 1. Water density by temperature"
        }
        columns={["Temperature (°C)", "Density (kg/m³)"]}
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
