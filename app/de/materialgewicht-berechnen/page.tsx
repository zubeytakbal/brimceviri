import type { Metadata } from "next";
import Link from "next/link";
import MaterialWeightCalculator from "../../components/MaterialWeightCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Wie hoch ist die Dichte von Stahl?",
    answer:
      "Kohlenstoffstahl hat eine Dichte von etwa 7850 kg/m³ (7,85 g/cm³). Edelstahlsorten liegen meist bei etwa 8000 kg/m³.",
  },
  {
    question: "Wie berechnet man das Gewicht eines Materials?",
    answer:
      "Gewicht (kg) = Dichte (kg/m³) × Volumen (m³). Bei kleinen Teilen wird das Volumen meist in cm³ gemessen; dann gilt: Gewicht (kg) = Dichte (kg/m³) × Volumen (cm³) / 1.000.000.",
  },
  {
    question: "Wie hoch ist die Dichte von Aluminium?",
    answer:
      "Aluminium hat eine Dichte von etwa 2700 kg/m³ (2,7 g/cm³); das macht es etwa 2,9-mal leichter als Stahl (7850 kg/m³).",
  },
];

export const metadata: Metadata = {
  title: "Tabelle der Materialdichten und Gewichtsberechnung",
  description:
    "Berechne aus der Dichtetabelle gängiger Materialien wie Stahl, Aluminium und Kupfer das Gewicht aus dem Volumen oder das Volumen aus dem Gewicht.",
  alternates: {
    canonical: "/de/materialgewicht-berechnen",
    languages: {
      tr: "/malzeme-agirligi-hesaplama",
      de: "/de/materialgewicht-berechnen",
      "x-default": "/malzeme-agirligi-hesaplama",
    },
  },
  openGraph: {
    title: "Tabelle der Materialdichten und Gewichtsberechnung",
    description: "Materialgewicht oder -volumen aus der Dichtetabelle berechnen.",
    url: buildSiteUrl("/de/materialgewicht-berechnen"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GermanMaterialWeightCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      { "@type": "ListItem", position: 2, name: "Tabelle der Materialdichten und Gewichtsberechnung", item: buildSiteUrl("/de/materialgewicht-berechnen") },
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
          <span>Tabelle der Materialdichten und Gewichtsberechnung</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Tabelle der Materialdichten und Gewichtsberechnung</h1>
          <p>
            Material auswählen, Volumen (cm³) eingeben: Gewicht (kg)
            berechnen — oder aus bekanntem Gewicht das Volumen finden.
            Unten findest du auch die Dichtetabelle gängiger
            Materialien.
          </p>
        </header>

        <MaterialWeightCalculator locale="de" />

        <section className="category-article-content">
          <h2>Häufig gestellte Fragen</h2>
          {faqItems.map((item) => (
            <p key={item.question}>
              <strong>{item.question}</strong>
              <br />
              {item.answer}
            </p>
          ))}

          <h2>Verwandte Tools</h2>
          <p>
            Für Masseneinheiten-Umrechnungen siehe die Kategorie{" "}
            <Link href="/de/kategorien/masse">Masse</Link>, für über 100
            Materialien mit Dichte und weiteren Eigenschaften siehe{" "}
            <Link href="/de/werkstoffeigenschaften">Werkstoffeigenschaften</Link>,
            {" "}zum Vergleich zweier Materialien nach Dichte siehe die{" "}
            <Link href="/de/werkstoffvergleich/aluminyum-celik-karsilastirma">
              Werkstoffvergleich
            </Link>
            {" "}Seiten.
          </p>

          <h2>Quellen</h2>
          <p>
            Die Dichtewerte sind allgemein anerkannte technische
            Referenzwerte für etwa 20°C; je nach Legierung und Sorte
            können kleine Abweichungen auftreten.
          </p>
        </section>
      </div>
    </main>
  );
}
