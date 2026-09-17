import Link from "next/link";
import type { ReactNode } from "react";
import {
  areaUnitDefinitions,
  forceUnitDefinitions,
  pressureUnitDefinitions,
} from "../../converter/engineeringUnits";
import type { EngineeringUnitDefinition } from "../../converter/engineeringUnits";
import {
  areaUnitNamesUz,
  forceUnitNamesUz,
  pressureUnitNamesUz,
} from "../../converter/pressureForceAreaUnitNamesUz";
import { formatUzValue } from "../../converter/pressureForceAreaUz";
import PressureForceAreaCalculatorUz from "./PressureForceAreaCalculatorUz";

type UnitTableSection = {
  id: string;
  heading: string;
  siSymbol: string;
  units: ReadonlyArray<EngineeringUnitDefinition>;
  names: Record<string, { name: string; use: string }>;
};

function getUnitTableSections(): UnitTableSection[] {
  return [
    {
      id: "pressure-units",
      heading: "Bosim birliklari",
      siSymbol: "Pa",
      units: pressureUnitDefinitions,
      names: pressureUnitNamesUz,
    },
    {
      id: "force-units",
      heading: "Kuch birliklari",
      siSymbol: "N",
      units: forceUnitDefinitions,
      names: forceUnitNamesUz,
    },
    {
      id: "area-units",
      heading: "Maydon birliklari",
      siSymbol: "m²",
      units: areaUnitDefinitions,
      names: areaUnitNamesUz,
    },
  ];
}

const strings = {
  breadcrumbs: [
    { label: "Bosh sahifa", href: "/uz" },
    { label: "Bosim, Kuch va Maydon Hisoblagichi" },
  ],
  breadcrumbLabel: "Sahifa yo'li",
  title: "Bosim, Kuch va Maydon Hisoblagichi",
  description:
    "Bosimni, kuchni yoki maydonni SI baza birliklariga aylantirib hisoblang. Hisoblagich Pa, hPa, kPa, MPa, GPa, bar, atm, kgf/cm², psi, ksi, N, kN, kgf, lbf, kip, m², cm², mm², ft² va yana ko'plab birliklarni qo'llab-quvvatlaydi.",
  heroEyebrow: "MUHANDISLIK HISOBLAGICHI",
  heroResultHeading: "Hisoblash natijasi",
  formulasHeading: "Ishlatilgan formulalar",
  variablesHeading: "O'zgaruvchilarning ma'nosi",
  unitsHeading: "Birlik ma'lumotnoma jadvallari",
  examplesHeading: "Yechilgan misollar",
  applicationsHeading: "Odatiy qo'llanish sohalari",
  limitationsHeading: "Cheklovlar va o'lchov aniqligi",
  scientificNotesHeading: "Ilmiy izohlar",
  sourcesHeading: "Manbalar",
  relatedHeading: "Tegishli havolalar",
  relatedCalculatorsHeading: "Tegishli hisoblagichlar",
  relatedGuidesHeading: "Birlik qo'llanmalari",
  tableColumns: {
    unitName: "Birlik nomi",
    symbol: "Belgi",
    siEquivalent: "SI ekvivalenti",
    typicalUse: "Odatiy qo'llanish",
  },
  formulas: ["P = F / A", "F = P × A", "A = F / P", "1 Pa = 1 N/m²"],
  variables: [
    {
      term: "P",
      explanation:
        "Bosim. Yuzaga tik yo'nalishda ta'sir qiluvchi kuchning maydonga nisbati.",
    },
    {
      term: "F",
      explanation: "Kuch. Hisoblashda yuzaga tik komponent asos qilib olinadi.",
    },
    {
      term: "A",
      explanation:
        "Kontakt yoki ta'sir maydoni. Maydon kichraysa, xuddi shu kuch yuqoriroq o'rtacha bosim hosil qiladi.",
    },
  ],
  examples: [
    {
      title: "1000 N / 0.01 m² = 100000 Pa",
      body: "1000 N kuch 0.01 m² maydonga bir tekis taqsimlansa, bosim 100000 Pa bo'ladi. Bu, shuningdek, 100 kPa ga teng.",
    },
    {
      title: "1 kgf / 1 cm² = 98066.5 Pa",
      body: "Standart tortishish ostida 1 kgf 9.80665 N ga teng. 1 cm² esa 0.0001 m² bo'lgani uchun bosim 9.80665 / 0.0001 = 98066.5 Pa bo'ladi.",
    },
    {
      title: "1 kN / 100 cm² = 100 kPa",
      body: "1 kN avval 1000 N ga, 100 cm² esa 0.01 m² ga aylantiriladi. 1000 / 0.01 = 100000 Pa, ya'ni 100 kPa natija chiqadi.",
    },
    {
      title: "1 bar × 10 cm² = 100 N",
      body: "1 bar = 100000 Pa va 10 cm² = 0.001 m² qabul qilinadi. F = P × A bo'lgani uchun 100000 × 0.001 = 100 N topiladi.",
    },
    {
      title: "1 MPa × 1 mm² = 1 N",
      body: "1 MPa 1000000 Pa ga teng. 1 mm² esa 0.000001 m² bo'lgani uchun 1000000 × 0.000001 = 1 N natijasi olinadi.",
    },
    {
      title: "1 lbf / 1 in² ≈ 1 psi",
      body: "1 lbf taxminan 4.4482216152605 N va 1 in² aniq 0.00064516 m² qabul qilinsa, natija taxminan 6894.757 Pa, ya'ni taxminan 1 psi bo'ladi.",
    },
  ],
  applications: [
    "Kontakt bosimi baholari",
    "Press, qolip va siqish kuchi hisoblari",
    "Gidravlik va pnevmatik tizimlarning dastlabki o'lchamlashi",
    "Shina, prokladka va yuza yuki solishtirishlari",
  ],
  limitations: [
    "Bu hisob o'rtacha va bir tekis taqsimlangan bosimni ifodalaydi.",
    "Mahalliy kuchlanish to'planishi, qiya kuchlar, dinamik yuklar va material deformatsiyasi uchun yolg'iz o'zi yetarli emas.",
    "Bosim va mexanik kuchlanish bir xil birlikka ega bo'lsa-da, ular har doim bir xil kontekstda ishlatilmaydi.",
  ],
  scientificNotes: [
    "kgf, gf va texnik atmosfera hisoblarida standart tortishish tezlanishi g₀ = 9.80665 m/s² ishlatiladi.",
    "mmHg, mmH₂O, cmH₂O, inHg va inH₂O kabi suyuqlik ustuni birliklari ta'rif harorati va qo'llaniladigan konvensiyaga qarab farq qilishi mumkin; bu hisoblagich ko'rsatilgan konventsion aylantirish koeffitsientlaridan foydalanadi.",
    "Massa va kuch bir xil kattalik emas, shuning uchun kg kuch birligi sifatida taqdim etilmaydi; faqat kgf ishlatiladi.",
  ],
  sources: [
    {
      label: "BIPM SI Brochure",
      href: "https://www.bipm.org/en/publications/si-brochure",
    },
    {
      label: "NIST Appendix B.9 Conversion Factors",
      href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9",
    },
  ],
  relatedCalculators: [
    {
      label: "Om Qonuni Hisoblagichi",
      href: "/uz/om-qonuni-hisoblash",
    },
    {
      label: "Muhandislik Hisoblagichlari markazi",
      href: "/muhendislik-hesaplayicilari",
    },
  ],
  relatedGuides: [
    { label: "Paskal nima?", href: "/birimler/pascal" },
    { label: "Kilopaskal nima?", href: "/birimler/kilopascal" },
    { label: "Bar nima?", href: "/birimler/bar" },
    { label: "PSI nima?", href: "/birimler/psi" },
  ],
};

export default function PressureForceAreaPageUz({
  structuredData,
}: {
  structuredData?: ReactNode;
}) {
  const unitTableSections = getUnitTableSections();

  return (
    <main className="calculator-page" lang="uz">
      {structuredData}

      <div className="conversion-breadcrumb-wrap">
        <nav className="breadcrumbs" aria-label={strings.breadcrumbLabel}>
          {strings.breadcrumbs.map((breadcrumb, index) => (
            <span key={`${breadcrumb.label}-${index}`}>
              {index > 0 && <span aria-hidden="true">›</span>}
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      <PressureForceAreaCalculatorUz
        eyebrow={strings.heroEyebrow}
        title={strings.title}
        description={strings.description}
        resultHeading={strings.heroResultHeading}
      />

      <article className="conversion-content calculator-content">
        <section className="conversion-section">
          <h2>{strings.formulasHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.formulas.map((formula) => (
              <li key={formula}>{formula}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.variablesHeading}</h2>
          <dl className="unit-facts">
            {strings.variables.map((variable) => (
              <div key={variable.term}>
                <dt>{variable.term}</dt>
                <dd>{variable.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="conversion-section">
          <h2>{strings.unitsHeading}</h2>
          <div className="calculator-unit-sections">
            {unitTableSections.map((section) => (
              <section
                className="calculator-unit-section"
                id={section.id}
                key={section.id}
              >
                <h3>{section.heading}</h3>

                <div className="conversion-table-wrap">
                  <table className="conversion-table">
                    <thead>
                      <tr>
                        <th>{strings.tableColumns.unitName}</th>
                        <th>{strings.tableColumns.symbol}</th>
                        <th>{strings.tableColumns.siEquivalent}</th>
                        <th>{strings.tableColumns.typicalUse}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.units.map((unit) => (
                        <tr key={`${section.id}-${unit.symbol}`}>
                          <td>{section.names[unit.enName]?.name ?? unit.enName}</td>
                          <td>{unit.symbol}</td>
                          <td>
                            {formatUzValue(unit.factorToSI)} {section.siSymbol}
                          </td>
                          <td>{section.names[unit.enName]?.use ?? unit.typicalUseEn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.scientificNotesHeading}</h2>
          <div className="engineering-note-box">
            <ul className="calculator-bullet-list">
              {strings.scientificNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.examplesHeading}</h2>
          <div className="calculator-example-list">
            {strings.examples.map((example) => (
              <article key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="conversion-section">
          <h2>{strings.applicationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section">
          <h2>{strings.limitationsHeading}</h2>
          <ul className="calculator-bullet-list">
            {strings.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>

        <section className="conversion-section unit-sources">
          <h2>{strings.sourcesHeading}</h2>
          <ol>
            {strings.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="conversion-section">
          <h2>{strings.relatedHeading}</h2>

          <h3>{strings.relatedCalculatorsHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedCalculators.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>

          <h3>{strings.relatedGuidesHeading}</h3>
          <ul className="related-conversion-list">
            {strings.relatedGuides.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
