"use client";

import { buildSiteUrl } from "../../siteConfig";
import {
  pressureReferenceRows,
  pressureReferenceSources,
  type TechnicalReferenceLocale,
} from "../../converter/technicalReferenceData";
import TechnicalReferenceSheet, {
  TechnicalReferenceTable,
} from "./TechnicalReferenceSheet";

function formatNumber(
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

export default function PressureReferenceTable({
  locale,
}: {
  locale: TechnicalReferenceLocale;
}) {
  const isTurkish = locale === "tr";
  const rows = pressureReferenceRows.map((row) => [
    row.enName,
    row.symbol,
    `${row.exact ? "=" : "≈"} ${formatNumber(
      row.pascalValue,
      locale,
      row.pascalValue < 1000 ? 6 : 6
    )}`,
    row.exact ? "Exact" : "Approximate",
    row.note.en,
  ]);

  return (
    <TechnicalReferenceSheet
      locale={locale}
      label={isTurkish ? "Teknik referans" : "Technical reference"}
      title={
        isTurkish
          ? "Basınç birimleri referans tablosu"
          : "Pressure-unit reference table"
      }
      description={
        isTurkish
          ? "Bu teknik föy, yaygın basınç birimlerinin pascal tabanındaki eşdeğerlerini tek tabloda toplar."
          : "This technical sheet gathers common pressure units and their pascal-based equivalents in one table."
      }
      definitionHeading={isTurkish ? "Tanım" : "Definition"}
      definition={[
        isTurkish
          ? "Basınç, birim alana etki eden kuvvettir ve SI sisteminde pascal (Pa) ile ifade edilir."
          : "Pressure is force acting on a unit area and is expressed in pascal (Pa) in SI.",
        isTurkish
          ? "Endüstriyel ve saha uygulamalarında bar, atm, psi, mmHg ve kgf/cm² gibi farklı birimler birlikte kullanıldığı için güvenilir bir başvuru tablosu gereklidir."
          : "Because industrial and field work commonly mixes bar, atm, psi, mmHg and kgf/cm², a reliable reference table is useful.",
      ]}
      formulaHeading={isTurkish ? "Formül" : "Formula"}
      formulas={["p = F / A"]}
      variablesHeading={
        isTurkish ? "Değişkenler" : "Variables"
      }
      variables={[
        {
          symbol: "p",
          description: isTurkish
            ? "Basınç, Pa"
            : "Pressure, Pa",
        },
        {
          symbol: "F",
          description: isTurkish
            ? "Kuvvet, N"
            : "Force, N",
        },
        {
          symbol: "A",
          description: isTurkish
            ? "Alan, m²"
            : "Area, m²",
        },
      ]}
      exampleHeading={
        isTurkish ? "Kısa mühendislik örneği" : "Short engineering example"
      }
      example={[
        isTurkish
          ? "2 bar basınç, referans tabloda 200 000 Pa ve 200 kPa olarak görülebilir; aynı değer 0,2 MPa biçiminde de raporlanabilir."
          : "A pressure of 2 bar corresponds to 200,000 Pa and 200 kPa in the reference table, and may also be reported as 0.2 MPa.",
      ]}
      conditionsHeading={
        isTurkish ? "Geçerlilik koşulları ve varsayımlar" : "Validity conditions and assumptions"
      }
      conditions={[
        isTurkish
          ? "Tablo, hızlı teknik başvuru amacıyla hazırlanmıştır; mutlak, gösterge ve diferansiyel basınç ayrımı kullanıcı tarafından ayrıca değerlendirilmelidir."
          : "The table is intended for quick technical reference; the distinction between absolute, gauge and differential pressure still has to be handled by the user.",
        isTurkish
          ? "Pa eşdeğerleri NIST ve BIPM tabanlıdır; exact ve approximate ayrımı tabloda korunur."
          : "The Pa equivalents are based on NIST and BIPM references, with the exact-versus-approximate distinction preserved in the table.",
      ]}
      useCasesHeading={
        isTurkish ? "Kullanım alanı" : "Use cases"
      }
      useCases={[
        isTurkish
          ? "Teknik rapor ve ders notlarında birim karşılaştırması yapmak."
          : "Comparing units in technical reports and coursework.",
        isTurkish
          ? "Dönüşüm hesaplarının arkasındaki pascal tabanını doğrulamak."
          : "Checking the pascal basis behind pressure conversions.",
        isTurkish
          ? "Saha cihazı birimini SI dokümantasyonuna çevirmek."
          : "Translating field-instrument units into SI documentation.",
      ]}
      commonMistakesHeading={
        isTurkish ? "Sık yapılan hata" : "Common mistake"
      }
      commonMistakes={[
        isTurkish
          ? "Gösterge basıncı ile mutlak basıncı aynı şeymiş gibi yorumlamak."
          : "Treating gauge pressure and absolute pressure as if they were the same quantity.",
      ]}
      relatedLinksHeading={
        isTurkish ? "İlgili hesaplayıcı" : "Related calculator"
      }
      relatedLinks={[
        {
          label: isTurkish
            ? "Basınç, Kuvvet ve Alan Hesaplayıcısı"
            : "Pressure, Force and Area Calculator",
          href: isTurkish
            ? "/hesaplayicilar/basinc-kuvvet-alan"
            : "/en/calculators/pressure-force-area",
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
      sources={pressureReferenceSources}
      pdfDefinition={{
        locale,
        fileName: isTurkish
          ? "basinc-birimleri-referans-tablosu.pdf"
          : "pressure-unit-reference-table.pdf",
        title: isTurkish
          ? "Basınç birimleri referans tablosu"
          : "Pressure-unit reference table",
        description: isTurkish
          ? "Bu teknik föy, yaygın basınç birimlerinin pascal tabanındaki eşdeğerlerini tek tabloda toplar."
          : "This technical sheet gathers common pressure units and their pascal-based equivalents in one table.",
        definitionHeading: isTurkish ? "Tanım" : "Definition",
        definition: [
          isTurkish
            ? "Basınç, birim alana etki eden kuvvettir ve SI sisteminde pascal (Pa) ile ifade edilir."
            : "Pressure is force acting on a unit area and is expressed in pascal (Pa) in SI.",
          isTurkish
            ? "Endüstriyel ve saha uygulamalarında bar, atm, psi, mmHg ve kgf/cm² gibi farklı birimler birlikte kullanıldığı için güvenilir bir başvuru tablosu gereklidir."
            : "Because industrial and field work commonly mixes bar, atm, psi, mmHg and kgf/cm², a reliable reference table is useful.",
        ],
        formulaHeading: isTurkish ? "Formül" : "Formula",
        formulas: ["p = F / A"],
        variablesHeading: isTurkish
          ? "Değişkenler"
          : "Variables",
        variables: [
          {
            symbol: "p",
            description: isTurkish
              ? "Basınç, Pa"
              : "Pressure, Pa",
          },
          {
            symbol: "F",
            description: isTurkish
              ? "Kuvvet, N"
              : "Force, N",
          },
          {
            symbol: "A",
            description: isTurkish
              ? "Alan, m²"
              : "Area, m²",
          },
        ],
        exampleHeading: isTurkish
          ? "Kısa mühendislik örneği"
          : "Short engineering example",
        example: [
          isTurkish
            ? "2 bar basınç, referans tabloda 200 000 Pa ve 200 kPa olarak görülebilir; aynı değer 0,2 MPa biçiminde de raporlanabilir."
            : "A pressure of 2 bar corresponds to 200,000 Pa and 200 kPa in the reference table, and may also be reported as 0.2 MPa.",
        ],
        conditionsHeading: isTurkish
          ? "Geçerlilik koşulları"
          : "Validity conditions",
        conditions: [
          isTurkish
            ? "Pa eşdeğerleri NIST ve BIPM tabanlıdır."
            : "The Pa equivalents are based on NIST and BIPM references.",
          isTurkish
            ? "Exact ve approximate ayrımı korunmuştur."
            : "The distinction between exact and approximate factors is preserved.",
        ],
        tables: [
          {
            caption: isTurkish
              ? "Tablo 3. Basınç birimleri ve pascal eşdeğerleri"
              : "Table 3. Pressure units and pascal equivalents",
            columns: [
              "Unit",
              "Symbol",
              "Pascal equivalent (Pa)",
              "Factor type",
              "Typical use",
            ],
            rows,
          },
        ],
        useCasesHeading: isTurkish
          ? "Kullanım alanı"
          : "Use cases",
        useCases: [
          isTurkish
            ? "Basınç birimi karşılaştırması"
            : "Pressure-unit comparison",
          isTurkish
            ? "Pascal tabanlı doğrulama"
            : "Pascal-based verification",
        ],
        commonMistakesHeading: isTurkish
          ? "Sık hata"
          : "Common mistake",
        commonMistakes: [
          isTurkish
            ? "Basınç türünü karıştırmak."
            : "Mixing up pressure types.",
        ],
        relatedLinksHeading: isTurkish
          ? "İlgili bağlantılar"
          : "Related links",
        relatedLinks: [
          {
            label: isTurkish
              ? "Basınç, Kuvvet ve Alan Hesaplayıcısı"
              : "Pressure, Force and Area Calculator",
            url: buildSiteUrl(
              isTurkish
                ? "/hesaplayicilar/basinc-kuvvet-alan"
                : "/en/calculators/pressure-force-area"
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
        sources: pressureReferenceSources,
      }}
    >
      <TechnicalReferenceTable
        caption={
          isTurkish
            ? "Tablo 3. Basınç birimleri ve pascal eşdeğerleri"
            : "Table 3. Pressure units and pascal equivalents"
        }
        columns={[
          "Unit",
          "Symbol",
          "Pascal equivalent (Pa)",
          "Factor type",
          "Typical use",
        ]}
        rows={rows}
      />
    </TechnicalReferenceSheet>
  );
}
