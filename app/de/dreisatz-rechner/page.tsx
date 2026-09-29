import type { Metadata } from "next";
import TimeToolPage from "../../components/time/TimeToolPage";
import { DreisatzRechner } from "../../components/de/GermanMathTools";
import type { FaqItem } from "../../converter/faqSchema";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/dreisatz-rechner";
const title = "Dreisatz-Rechner: proportional und antiproportional";
const description =
  "Dreisatz online berechnen: proportional (je mehr, desto mehr) und antiproportional (je mehr, desto weniger), mit eigenen Einheiten und Rechenweg in drei Schritten.";

export const metadata: Metadata = {
  title: seoTitle(title, "Dreisatz-Rechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie funktioniert der Dreisatz?",
    answer: "In drei Schritten: gegebene Aussage aufschreiben, auf eine Einheit umrechnen, dann auf die gesuchte Menge hochrechnen. 3 Brötchen kosten 7,50 €, 1 Brötchen 2,50 €, 5 Brötchen 12,50 €.",
  },
  {
    question: "Wann ist ein Dreisatz antiproportional?",
    answer: "Wenn die eine Größe sinkt, während die andere steigt: mehr Arbeiter, weniger Tage; höhere Geschwindigkeit, kürzere Fahrzeit. Dann wird im zweiten Schritt multipliziert und im dritten geteilt.",
  },
  {
    question: "Wie rechne ich den Dreisatz mit einer Formel?",
    answer: "Proportional: gesucht = B ÷ A × C. Antiproportional: gesucht = A × B ÷ C. A und B sind das bekannte Wertepaar, C die neue Menge.",
  },
  {
    question: "Kann ich mit dem Dreisatz Prozente berechnen?",
    answer: "Ja. 100 % entsprechen 80, also 1 % = 0,8 und 15 % = 12. Schneller geht es mit dem Prozentrechner.",
  },
];

export default function DreisatzPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Dreisatz-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Dreisatz-Rechner"
        intro="Geben Sie ein bekanntes Wertepaar und die neue Menge ein. Der Rechner löst proportionale und antiproportionale Dreisätze und zeigt den Weg über die Einheit."
        tool={<DreisatzRechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "proportional", label: "Proportionaler Dreisatz" },
          { id: "antiproportional", label: "Antiproportionaler Dreisatz" },
          { id: "erkennen", label: "Welcher Dreisatz passt?" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="proportional">Proportionaler Dreisatz</h2>
        <p>Beide Größen wachsen im gleichen Verhältnis. Beispiel: 3 Brötchen kosten 7,50 €. Was kosten 5 Brötchen?</p>
        <ol>
          <li>3 Brötchen → 7,50 €</li>
          <li>1 Brötchen → 7,50 € ÷ 3 = 2,50 €</li>
          <li>5 Brötchen → 2,50 € × 5 = 12,50 €</li>
        </ol>

        <h2 id="antiproportional">Antiproportionaler Dreisatz</h2>
        <p>Eine Größe wächst, die andere sinkt. Beispiel: 4 Arbeiter brauchen 6 Tage. Wie lange brauchen 3 Arbeiter?</p>
        <ol>
          <li>4 Arbeiter → 6 Tage</li>
          <li>1 Arbeiter → 6 Tage × 4 = 24 Tage</li>
          <li>3 Arbeiter → 24 Tage ÷ 3 = 8 Tage</li>
        </ol>

        <h2 id="erkennen">Welcher Dreisatz passt?</h2>
        <p>
          Fragen Sie sich: Wenn ich die Menge verdopple, verdoppelt sich dann auch das Ergebnis? Dann ist er proportional (Preis und Menge, Strecke
          und Benzinverbrauch, Rezeptmengen und Portionen). Halbiert sich das Ergebnis, ist er antiproportional (Arbeiter und Dauer, Geschwindigkeit
          und Fahrzeit, Anzahl der Personen und Vorrat pro Person). Passt keins von beiden – etwa bei Rabattstaffeln oder Grundgebühren – hilft der
          Dreisatz nicht.
        </p>
      </TimeToolPage>
    </div>
  );
}
