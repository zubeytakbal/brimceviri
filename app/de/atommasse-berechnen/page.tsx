import type { Metadata } from "next";
import Link from "next/link";
import AtomicMassCalculator from "../../components/AtomicMassCalculator";
import { buildFaqSchema, type FaqItem } from "../../converter/faqSchema";
import { buildSiteUrl } from "../../siteConfig";

const faqItems: FaqItem[] = [
  {
    question: "Was ist die durchschnittliche Atommasse?",
    answer:
      "Die durchschnittliche Atommasse ist der mit den natürlichen Häufigkeiten gewichtete Durchschnitt der Massen aller natürlich vorkommenden Isotope eines Elements. Dieser Wert steht im Periodensystem unter jedem Element.",
  },
  {
    question: "Wie wird die durchschnittliche Atommasse berechnet?",
    answer:
      "Die Masse jedes Isotops wird mit seinem natürlichen Häufigkeitsanteil (Prozent/100) multipliziert; die Summe dieser Produkte ergibt den gewichteten Durchschnitt: Durchschnitt = Σ(Isotopmasse × Häufigkeitsanteil).",
  },
  {
    question: "Was ist ein Isotop?",
    answer:
      "Isotope sind Atome desselben Elements mit unterschiedlicher Neutronenzahl (und damit unterschiedlicher Massenzahl). Da sie die gleiche Protonenzahl haben, sind ihre chemischen Eigenschaften identisch, ihre Massen jedoch unterschiedlich.",
  },
  {
    question: "Warum ist die Atommasse keine ganze Zahl?",
    answer:
      "Die Atommassen im Periodensystem sind fast nie ganze Zahlen, weil sie der gewichtete Durchschnitt mehrerer Isotope sind. Chlor hat zum Beispiel eine Atommasse von 35,45 u, weil in der Natur sowohl Chlor-35 als auch Chlor-37 in unterschiedlichen Anteilen vorkommen.",
  },
];

export const metadata: Metadata = {
  title: "Atommasse berechnen: Isotopengewichteter Durchschnittsrechner",
  description:
    "Gib Isotopmassen und natürliche Häufigkeiten ein und berechne sofort per gewichtetem Durchschnitt die durchschnittliche Atommasse eines Elements aus dem Periodensystem.",
  alternates: {
    canonical: "/de/atommasse-berechnen",
    languages: {
      tr: "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama",
      de: "/de/atommasse-berechnen",
      "x-default": "/bilim-hesaplayicilari/kimya/atom-kutlesi-hesaplama",
    },
  },
  openGraph: {
    title: "Atommasse berechnen: Isotopengewichteter Durchschnittsrechner",
    description: "Berechne die durchschnittliche Atommasse aus Isotopmassen und Häufigkeiten.",
    url: buildSiteUrl("/de/atommasse-berechnen"),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

function serializeJsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function GermanAtomicMassCalculatorPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: buildSiteUrl("/de") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Atommasse berechnen",
        item: buildSiteUrl("/de/atommasse-berechnen"),
      },
    ],
  };

  return (
    <main className="all-conversions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildFaqSchema(faqItems)),
        }}
      />

      <div className="all-conversions-shell">
        <nav className="breadcrumbs" aria-label="Seitenpfad">
          <Link href="/de">Startseite</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>Atommasse berechnen</span>
        </nav>

        <header className="all-conversions-header">
          <h1>Atommasse berechnen</h1>
          <p>
            Gib die Massen und natürlichen Häufigkeiten der Isotope ein,
            berechne die gewichtete durchschnittliche Atommasse.
          </p>
        </header>

        <div className="unit-page-layout chem-calculator-layout">
        <div className="unit-page-content">
        <section className="category-article-content">
          <h2>Was ist die durchschnittliche Atommasse?</h2>
          <p>
            Der im Periodensystem unter jedem Element angezeigte
            Atommassewert ist nicht die Masse eines einzelnen Atoms,
            sondern der mit den natürlichen Häufigkeitsanteilen
            gewichtete Durchschnitt der Massen aller natürlich
            vorkommenden <strong>Isotope</strong>. Deshalb sind die Werte
            im Periodensystem fast nie ganze Zahlen.
          </p>

          <h2>Das Konzept der Isotope und ihre Entdeckung</h2>
          <p>
            Isotope sind Atome mit gleicher Protonenzahl (und damit
            gleicher Ordnungszahl und chemischer Identität), aber
            unterschiedlicher Neutronenzahl. Der Begriff wurde 1913 vom
            britischen Chemiker Frederick Soddy bei der Untersuchung
            radioaktiver Zerfallsreihen geprägt; der Name
            &quot;Isotop&quot; leitet sich von den griechischen Wörtern
            &quot;isos&quot; (gleich) und &quot;topos&quot; (Ort) ab, da
            Isotope im Periodensystem denselben Platz einnehmen. Soddy
            erhielt für diese Arbeit 1921 den Nobelpreis für Chemie. Das
            Massenspektrometer, das den Massenunterschied von Isotopen
            direkt misst, wurde von Francis Aston entwickelt, der 1922
            ebenfalls den Nobelpreis für Chemie erhielt.
          </p>

          <h2>Die Formel für den gewichteten Durchschnitt</h2>
          <p>
            Die durchschnittliche Atommasse wird mit der Formel{" "}
            <strong>Σ(Isotopmasse × Häufigkeitsanteil)</strong>{" "}
            berechnet, wobei der Häufigkeitsanteil der durch 100
            geteilte Prozentwert ist. Chlor hat zum Beispiel zwei
            natürliche Isotope: Chlor-35 (Masse 34,969 u, Häufigkeit
            75,77 %) und Chlor-37 (Masse 36,966 u, Häufigkeit 24,23 %).
            Gewichteter Durchschnitt: 34,969 × 0,7577 + 36,966 × 0,2423 ≈{" "}
            <strong>35,45 u</strong> — genau der Wert aus dem
            Periodensystem.
          </p>

          <h2>Warum haben manche Elemente eine fast ganzzahlige Atommasse?</h2>
          <p>
            Elemente wie Fluor (18,998 u) oder Aluminium (26,982 u)
            haben eine Atommasse sehr nahe an einer ganzen Zahl, weil sie
            in der Natur nur ein einziges stabiles Isotop haben (bei
            Fluor nur Fluor-19). Elemente wie Bor (10,81 u) haben dagegen
            mehrere Isotope in ähnlichen Anteilen, wodurch der
            Nachkommaanteil deutlicher ausgeprägt ist.
          </p>

          <h2>Massenspektrometrie: Messmethode für Isotopenhäufigkeit</h2>
          <p>
            Die Massen und natürlichen Häufigkeitsanteile von Isotopen
            werden experimentell mit einem Gerät namens
            Massenspektrometer gemessen. Dieses Gerät ionisiert Atome und
            trennt sie beim Durchgang durch elektrische und magnetische
            Felder nach ihrem Masse-Ladungs-Verhältnis; die
            Signalstärke jedes Isotops gibt seine relative Häufigkeit
            an. Diese Technologie wird heute nicht nur zur
            Isotopenanalyse, sondern auch in der Arzneimittelentwicklung,
            Forensik und archäologischen Datierung (Radiokarbonmethode)
            in einem sehr breiten Bereich eingesetzt.
          </p>

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
            Um von Masse zu Stoffmenge zu wechseln, siehe{" "}
            <Link href="/de/chemische-verbindungen">Chemische Verbindungen</Link>,{" "}
            für das Periodensystem siehe{" "}
            <Link href="/de/periodensystem">Periodensystem</Link>.
          </p>

          <h2>Quellen</h2>
          <p>
            Isotopmassen und natürliche Häufigkeitsanteile basieren auf
            der IUPAC-Tabelle der Standardatomgewichte.
          </p>
        </section>
        </div>

        <div className="unit-page-converter">
          <AtomicMassCalculator locale="de" />
        </div>
        </div>
      </div>
    </main>
  );
}
