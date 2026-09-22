import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MaterialDensityConverterDe from "../../../components/MaterialDensityConverterDe";
import MaterialMassVolumeCalculatorDe from "../../../components/MaterialMassVolumeCalculatorDe";
import { buildFaqSchema, type FaqItem } from "../../../converter/faqSchema";
import {
  findMaterialProfileById,
  findSimilarDensityMaterials,
  getAllMaterialProfiles,
} from "../../../converter/materialsHub";
import { getAllMaterialComparisons } from "../../../converter/materialComparisons";
import {
  materialCategoryLabelsDe,
  materialNamesDe,
  materialVariabilityNotesDe,
} from "../../../converter/materialsDatabaseDe";
import { type MaterialCategory } from "../../../converter/materialsDatabase";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 4 });
}

function getDensityUseNote(category: MaterialCategory) {
  const notes: Record<MaterialCategory, string> = {
    metal: "Die Dichte von Metallen hängt von Legierungszusammensetzung, Wärmebehandlung und Temperatur ab. Dieser Wert ist ein nominaler Ausgangspunkt für erste Massen- und Volumenberechnungen ohne festgelegte Werkstoffgüte.",
    sivi: "Die Dichte von Flüssigkeiten hängt besonders von Temperatur und Mischungsverhältnis ab. Für präzise Befüllung, Handelsprodukte oder Sicherheitsrechnungen verwenden Sie den temperaturbezogenen Wert aus dem technischen Datenblatt.",
    gaz: "Die Gasdichte hängt stark von Temperatur und Druck ab. Dieser Wert dient dem ersten Vergleich und einer groben Massenrechnung; für Prozessrechnungen ist ein Messwert unter denselben Temperatur- und Druckbedingungen nötig.",
    plastik: "Die Dichte von Polymeren kann je nach Harztyp, Füllstoff und Herstellverfahren variieren. Prüfen Sie für die Produktkonstruktion den werkstoffspezifischen Wert im Datenblatt des Herstellers.",
    "yapi-malzemesi": "Bei Baustoffen verändern Feuchte, Porosität und Verdichtungsgrad die Dichte. Die Rechnung ist eine erste Näherung für einen trockenen, typischen Werkstoff.",
    ahsap: "Die Dichte von Holz hängt neben der Holzart von Feuchte und Faserrichtung ab. Für eine genaue Gewichtsrechnung benötigen Sie die gemessene Holzfeuchte und das tatsächliche Bauteilvolumen.",
    gida: "Bei Lebensmitteln und Küchenzutaten verändern Wasser-, Fett- und Luftanteil die Dichte je nach Marke und Zubereitung. Das Ergebnis ist für eine grobe Küchen- und Volumenrechnung gedacht.",
  };

  return notes[category];
}

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function generateStaticParams() {
  return getAllMaterialProfiles().map((material) => ({ slug: material.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    return { title: "Material nicht gefunden", robots: { index: false, follow: false } };
  }

  const nameDe = materialNamesDe[material.id] ?? material.nameTr;
  const title = `${nameDe} Dichte, Eigenschaften und Einheitenumrechner`;
  const description = `${nameDe} Dichte: ${formatDensity(material.densityKgM3)} kg/m³. Dichte in g/cm³, kg/L und weitere Einheiten umrechnen, alle bekannten technischen Eigenschaften ansehen.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/de/werkstoffeigenschaften/${slug}`,
      languages: {
        tr: `/malzeme-ozellikleri/${slug}`,
        de: `/de/werkstoffeigenschaften/${slug}`,
        "x-default": `/malzeme-ozellikleri/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(`/de/werkstoffeigenschaften/${slug}`),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanMaterialPropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const material = findMaterialProfileById(slug);

  if (!material) {
    notFound();
  }

  const nameDe = materialNamesDe[material.id] ?? material.nameTr;
  const variabilityNoteDe = materialVariabilityNotesDe[material.id];
  const pageUrl = buildSiteUrl(`/de/werkstoffeigenschaften/${slug}`);
  const similarMaterials = findSimilarDensityMaterials(slug, 5).map((similar) => ({
    ...similar,
    nameDe: materialNamesDe[similar.id] ?? similar.nameTr,
  }));
  const relatedComparisons = getAllMaterialComparisons().filter(
    (comparison) => comparison.first.id === slug || comparison.second.id === slug
  );
  const oneLitreMassKg = material.densityKgM3 / 1000;

  const faqItems: FaqItem[] = [
    {
      question: `${nameDe} Dichte: wie viel kg/m³?`,
      answer: `${nameDe} hat eine Dichte von etwa ${formatDensity(material.densityKgM3)} kg/m³ (${formatDensity(material.densityKgM3 / 1000)} g/cm³).`,
    },
    {
      question: `Wie viel wiegt 1 Liter ${nameDe}?`,
      answer: `Mit dieser Referenzdichte wiegt 1 Liter ${nameDe} etwa ${formatDensity(oneLitreMassKg)} kg. Das tatsächliche Ergebnis kann sich mit Temperatur, Werkstoffgüte und Zusammensetzung ändern.`,
    },
  ];

  if (material.thermalConductivityWmK !== null) {
    faqItems.push({
      question: `Wie hoch ist die Wärmeleitfähigkeit von ${nameDe}?`,
      answer: `Der typische Wärmeleitfähigkeitswert für ${nameDe} liegt bei etwa ${material.thermalConductivityWmK} W/(m·K).`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      { "@type": "ListItem", position: 2, name: "Werkstoffeigenschaften", item: buildSiteUrl("/de/werkstoffeigenschaften") },
      { "@type": "ListItem", position: 3, name: nameDe, item: pageUrl },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqSchema(faqItems)) }} />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link href="/de/werkstoffeigenschaften">Werkstoffeigenschaften</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{nameDe}</span>
        </nav>

        <header className="all-conversions-header">
          <h1>{nameDe} Dichte, Eigenschaften und Einheitenumrechner</h1>
          <p>
            {nameDe} ({materialCategoryLabelsDe[material.category]}) —
            Dichte, bekannte technische Eigenschaften und ein
            Live-Einheitenumrechner.
          </p>
        </header>

        <section className="category-article-content">
          <h2>{nameDe} Grundeigenschaften</h2>
          <dl className="unit-facts">
            <div>
              <dt>Dichte</dt>
              <dd>
                {formatDensity(material.densityKgM3)} kg/m³ (
                {formatDensity(material.densityKgM3 / 1000)} g/cm³)
              </dd>
            </div>
            {material.thermalConductivityWmK !== null && (
              <div>
                <dt>Wärmeleitfähigkeit</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.thermalConductivityWmK} W/(m·K)
                </dd>
              </div>
            )}
            {material.elasticModulusGPa !== null && (
              <div>
                <dt>Elastizitätsmodul (E-Modul)</dt>
                <dd>{material.elasticModulusGPa} GPa</dd>
              </div>
            )}
            {material.thermalExpansionPerMillionK !== null && (
              <div>
                <dt>Wärmeausdehnungskoeffizient</dt>
                <dd>{material.thermalExpansionPerMillionK} × 10⁻⁶/K</dd>
              </div>
            )}
            {material.viscosityMPaS !== null && (
              <div>
                <dt>Dynamische Viskosität</dt>
                <dd>
                  {material.variabilityNote && "~"}
                  {material.viscosityMPaS} mPa·s
                </dd>
              </div>
            )}
          </dl>
          {variabilityNoteDe && (
            <p className="calculator-usage-hint">
              <strong>Hinweis zur Schwankungsbreite:</strong> {variabilityNoteDe}
            </p>
          )}
        </section>

        <section className="category-article-content">
          <h2>Dichtewert von {nameDe} richtig verwenden</h2>
          <p>{getDensityUseNote(material.category)}</p>
          <p>
            Mit diesem Referenzwert wiegt 1 Liter {nameDe} etwa {formatDensity(oneLitreMassKg)} kg;
            1 m³ wiegt etwa {formatDensity(material.densityKgM3)} kg.
          </p>
        </section>

        <MaterialMassVolumeCalculatorDe
          densityKgM3={material.densityKgM3}
          materialName={nameDe}
        />

        <MaterialDensityConverterDe
          densityKgM3={material.densityKgM3}
          materialName={nameDe}
        />

        {similarMaterials.length > 0 && (
          <section className="category-article-content">
            <h2>Materialien mit ähnlicher Dichte wie {nameDe}</h2>
            <ul className="related-conversion-list">
              {similarMaterials.map((similar) => (
                <li key={similar.id}>
                  <Link href={`/de/werkstoffeigenschaften/${similar.id}`}>
                    {similar.nameDe}
                  </Link>{" "}
                  — {formatDensity(similar.densityKgM3)} kg/m³
                </li>
              ))}
            </ul>
          </section>
        )}

        {relatedComparisons.length > 0 && (
          <section className="category-article-content">
            <h2>{nameDe} Vergleiche</h2>
            <ul className="related-conversion-list">
              {relatedComparisons.map((comparison) => (
                <li key={comparison.slug}>
                  <Link href={`/de/werkstoffvergleich/${comparison.slug}`}>
                    {materialNamesDe[comparison.first.id] ?? comparison.first.nameTr} –{" "}
                    {materialNamesDe[comparison.second.id] ?? comparison.second.nameTr}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="category-article-content">
          <h2>Häufig gestellte Fragen</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Verwandte Rechner</h2>
          <p>
            {material.thermalConductivityWmK !== null && (
              <>
                Für Wärmeleitungsberechnungen siehe den{" "}
                <Link href="/de/rechner/waermeleitung">Wärmeleitungs-Rechner</Link>
                {", "}
              </>
            )}
            {material.viscosityMPaS !== null && (
              <>
                für Strömungsberechnungen siehe den{" "}
                <Link href="/de/rechner/reynolds-zahl">Reynolds-Zahl-Rechner</Link>
                {", "}
              </>
            )}
            für alle Materialien siehe die Übersicht{" "}
            <Link href="/de/werkstoffeigenschaften">Werkstoffeigenschaften</Link>.
          </p>

          <h2>Quellen</h2>
          <p>
            Als Ausgangsreferenz für die Dichtewerte dient die{" "}
            <a
              href="https://densitycalculator.net/density-table"
              target="_blank"
              rel="noreferrer"
            >
              Dichtetabelle mit 232 Materialien
            </a>
            . Die Werte sind nominale Referenzwerte für erste Berechnungen.
            Nicht jeder Wert wurde bei derselben Temperatur oder für dieselbe
            Werkstoffgüte bestimmt; für Konstruktion, Sicherheit oder
            Handelsmessungen prüfen Sie den bedingten Wert im technischen
            Datenblatt des jeweiligen Produkts.
          </p>
        </section>
      </div>
    </main>
  );
}
