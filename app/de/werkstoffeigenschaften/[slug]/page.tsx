import { materialPathDe, comparisonPathDe, materialIdFromDeSlug, materialSlugDe } from "../../../converter/germanScienceSlugs";
import type { Metadata } from "next";
import { seoTitle } from "../../../seoTitle";
import Link from "@/app/components/SiteLink";
import { notFound } from "next/navigation";
import MaterialDensityConverter from "../../../components/MaterialDensityConverter";
import MaterialMassVolumeCalculator from "../../../components/MaterialMassVolumeCalculator";
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
import { buoyancy, densityRank, litresPerKg, practicalRows } from "../../../converter/materialPractical";
import { materialNotesDe } from "../../../converter/materialNotes";
import { buildSiteUrl } from "../../../siteConfig";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDensity(value: number) {
  return value.toLocaleString("de-DE", { maximumFractionDigits: 4 });
}

const de = (value: number, digits: number) => value.toLocaleString("de-DE", { maximumFractionDigits: digits });

function formatMass(kg: number) {
  if (kg >= 1000) return `${de(kg / 1000, 2)} t`;
  if (kg >= 1) return `${de(kg, 2)} kg`;
  if (kg >= 0.001) return `${de(kg * 1000, 1)} g`;
  return `${de(kg * 1e6, 1)} mg`;
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
  return getAllMaterialProfiles().map((material) => ({ slug: materialSlugDe(material.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: urlSlug } = await params;
  const slug = materialIdFromDeSlug(urlSlug) ?? "";
  const material = findMaterialProfileById(slug);

  if (!material) {
    return { title: "Material nicht gefunden", robots: { index: false, follow: false } };
  }

  const nameDe = materialNamesDe[material.id] ?? material.nameTr;
  const title = `${nameDe} Dichte, Eigenschaften und Einheitenumrechner`;
  const description = `${nameDe} Dichte: ${formatDensity(material.densityKgM3)} kg/m³. Dichte in g/cm³, kg/L und weitere Einheiten umrechnen, alle bekannten technischen Eigenschaften ansehen.`;

  return {
    title: seoTitle(title, `${nameDe}: Dichte und Eigenschaften`, `${nameDe.match(/\(([^)]+)\)\s*$/)?.[1] ?? nameDe}: Dichte und Eigenschaften`),
    description,
    alternates: {
      canonical: materialPathDe(slug),
      languages: {
        tr: `/malzeme-ozellikleri/${slug}`,
        de: materialPathDe(slug),
        "x-default": `/malzeme-ozellikleri/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: buildSiteUrl(materialPathDe(slug)),
      siteName: "BirimCeviri.app",
      locale: "de_DE",
      type: "article",
    },
  };
}

export default async function GermanMaterialPropertyPage({ params }: PageProps) {
  const { slug: urlSlug } = await params;
  const slug = materialIdFromDeSlug(urlSlug) ?? "";
  const material = findMaterialProfileById(slug);

  if (!material) {
    notFound();
  }

  const nameDe = materialNamesDe[material.id] ?? material.nameTr;
  const variabilityNoteDe = materialVariabilityNotesDe[material.id];
  const pageUrl = buildSiteUrl(materialPathDe(slug));
  const similarMaterials = findSimilarDensityMaterials(slug, 5).map((similar) => ({
    ...similar,
    nameDe: materialNamesDe[similar.id] ?? similar.nameTr,
  }));
  const relatedComparisons = getAllMaterialComparisons().filter(
    (comparison) => comparison.first.id === slug || comparison.second.id === slug
  );
  const oneLitreMassKg = material.densityKgM3 / 1000;
  const practical = practicalRows(material, "de");
  const perKg = litresPerKg(material);
  const float = buoyancy(material);
  const rank = densityRank(material);
  const note = materialNotesDe[material.id];
  const nameOf = (id: string, fallback: string) => materialNamesDe[id] ?? fallback;

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
          <h2>Wie viel wiegt {nameDe}?</h2>
          <div className="holiday-table-wrap">
            <table className="holiday-table">
              <thead>
                <tr>
                  <th scope="col">Maß</th>
                  <th scope="col">Ungefähres Gewicht</th>
                </tr>
              </thead>
              <tbody>
                {practical.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{formatMass(row.massKg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            1 kg {nameDe} nimmt{" "}
            {perKg >= 1000 ? `etwa ${de(perKg / 1000, 2)} m³` : perKg >= 1 ? `etwa ${de(perKg, 2)} Liter` : `etwa ${de(perKg * 1000, 1)} cm³`}{" "}
            ein.{" "}
            {float.kind === "gas"
              ? float.lighterThanAir
                ? `Es ist etwa ${de(1 / float.ratio, 1)}-mal leichter als Luft, steigt auf und sammelt sich in geschlossenen Räumen unter der Decke.`
                : `Es ist etwa ${de(float.ratio, 1)}-mal schwerer als Luft und sammelt sich bei einem Leck am Boden, in Kellern und Gruben.`
              : float.floats
                ? `Mit dem ${de(float.ratio, 2)}-Fachen der Dichte von Wasser schwimmt es${material.category === "sivi" || material.category === "gida" ? " (sofern es sich nicht mit Wasser mischt, oben)" : ""}.`
                : float.ratio < 1.01
                  ? "Die Dichte liegt sehr nahe an der von Wasser."
                  : `Mit dem ${de(float.ratio, 2)}-Fachen der Dichte von Wasser geht es unter.`}
          </p>
          <p>
            Unter den {rank.total} Materialien dieser Seite steht {nameDe} nach Dichte (absteigend) auf Platz{" "}
            {rank.overall}, in der Gruppe {materialCategoryLabelsDe[material.category]} auf Platz {rank.inCategory} von{" "}
            {rank.categoryTotal}.
            {rank.denser && rank.lighter && (
              <>
                {" "}Direkt darüber liegt {nameOf(rank.denser.id, rank.denser.nameTr)} ({formatDensity(rank.denser.densityKgM3)} kg/m³),
                darunter {nameOf(rank.lighter.id, rank.lighter.nameTr)} ({formatDensity(rank.lighter.densityKgM3)} kg/m³).
              </>
            )}{" "}
            {getDensityUseNote(material.category)}
          </p>
        </section>

        {note && (
          <section className="category-article-content">
            <h2>{note.heading}</h2>
            {note.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        )}

        <MaterialMassVolumeCalculator
          locale="de"
          densityKgM3={material.densityKgM3}
          materialName={nameDe}
        />

        <MaterialDensityConverter
          locale="de"
          densityKgM3={material.densityKgM3}
          materialName={nameDe}
        />

        {similarMaterials.length > 0 && (
          <section className="category-article-content">
            <h2>Materialien mit ähnlicher Dichte wie {nameDe}</h2>
            <ul className="related-conversion-list">
              {similarMaterials.map((similar) => (
                <li key={similar.id}>
                  <Link href={materialPathDe(similar.id)}>
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
                  <Link href={comparisonPathDe(comparison.slug)}>
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

          <p>
            Quelle:{" "}
            <a href="https://densitycalculator.net/density-table" target="_blank" rel="noreferrer">
              Dichtetabelle
            </a>
            ; Referenzwerte bei Raumtemperatur, der Wert im Produktdatenblatt hat Vorrang. Alle Materialien:{" "}
            <Link href="/de/werkstoffeigenschaften">Werkstoffeigenschaften</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
