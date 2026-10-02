import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import Stromkostenrechner from "../../components/de/Stromkostenrechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { fmtDe } from "../../converter/germanMath";
import { breakEvenKwh, durchschnittspreisCt, jahreskosten } from "../../converter/germanStromkosten";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/stromkostenrechner";
const title = "Stromkostenrechner: Stromkosten und Abschlag berechnen";
const description =
  "Stromkosten pro Jahr und monatlichen Abschlag aus Verbrauch, Arbeitspreis und Grundpreis berechnen – mit Zählerstand-Hochrechnung und Vergleich zweier Stromtarife.";

export const metadata: Metadata = {
  title: seoTitle(title, "Stromkostenrechner: Abschlag berechnen", "Stromkostenrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const eur = (n: number) => `${fmtDe(n, 2, 2)} €`;

// Örnek tarif ve tüm rakamlar hesaptan; gerçek bir piyasa fiyatı iddiası değildir.
const beispiel = { arbeitspreisCt: 30, grundpreisMonat: 12 };
const beispielKosten = jahreskosten(2500, beispiel);
const beispielEffektiv = durchschnittspreisCt(2500, beispiel);
const tarifA = { arbeitspreisCt: 28, grundpreisMonat: 15 };
const tarifB = { arbeitspreisCt: 32, grundpreisMonat: 9 };
const breakEven = breakEvenKwh(tarifA, tarifB);
const verbrauchsTabelle = [1000, 1500, 2000, 2500, 3000, 4000, 5000].map((kwh) => ({
  kwh,
  kosten: jahreskosten(kwh, beispiel),
  effektiv: durchschnittspreisCt(kwh, beispiel),
}));

const faqItems: FaqItem[] = [
  {
    question: "Wie berechne ich meine Stromkosten?",
    answer: `Jahresverbrauch in kWh × Arbeitspreis + 12 × monatlicher Grundpreis. Beispiel: 2.500 kWh × 30 ct = 750 € plus 12 × 12 € Grundpreis = ${eur(beispielKosten)} im Jahr, also ${eur(beispielKosten / 12)} Abschlag im Monat.`,
  },
  {
    question: "Wie berechne ich den Verbrauch aus dem Zählerstand?",
    answer: "Neuen Zählerstand minus alten Zählerstand ergibt die verbrauchten kWh. Teilen Sie durch die Anzahl der Tage zwischen den Ablesungen und multiplizieren Sie mit 365, um den Jahresverbrauch hochzurechnen.",
  },
  {
    question: "Was ist der Unterschied zwischen Arbeitspreis und Grundpreis?",
    answer: "Der Arbeitspreis wird für jede verbrauchte kWh fällig. Der Grundpreis ist ein fester Monatsbetrag, unabhängig vom Verbrauch. Bei geringem Verbrauch fällt der Grundpreis stärker ins Gewicht.",
  },
  {
    question: "Welcher Tarif ist günstiger: niedriger Grundpreis oder niedriger Arbeitspreis?",
    answer: `Das hängt vom Verbrauch ab. Tarif A (28 ct, 15 € Grundpreis) und Tarif B (32 ct, 9 € Grundpreis) kosten bei ${fmtDe(Math.round(breakEven), 0)} kWh gleich viel. Wer mehr verbraucht, fährt mit dem niedrigeren Arbeitspreis besser, wer weniger verbraucht, mit dem niedrigeren Grundpreis.`,
  },
];

export default function StromkostenrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/rechner", label: "Rechner" },
          { href: path, label: "Stromkostenrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Stromkostenrechner"
        intro="Berechnen Sie Ihre Stromkosten im Jahr und den passenden monatlichen Abschlag. Rechnen Sie Ihren Verbrauch aus zwei Zählerständen hoch oder vergleichen Sie Ihren Tarif mit einem neuen Angebot."
        tool={<Stromkostenrechner />}
        related={{ title: "Das könnte Sie auch interessieren", links: rechnerRelated(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "formel", label: "So setzen sich die Stromkosten zusammen" },
          { id: "abschlag", label: "Abschlag prüfen" },
          { id: "vergleich", label: "Tarife vergleichen" },
          { id: "tabelle", label: "Tabelle nach Verbrauch" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="formel">So setzen sich die Stromkosten zusammen</h2>
        <p>
          Ihre Stromrechnung besteht aus zwei Teilen: dem <strong>Arbeitspreis</strong> pro Kilowattstunde und dem <strong>Grundpreis</strong>{" "}
          pro Monat. Beide stehen auf der Jahresabrechnung und in jedem Tarifangebot. Mit einem Beispieltarif von 30 ct/kWh und 12 € Grundpreis
          kosten 2.500 kWh im Jahr {eur(beispielKosten)}. Umgerechnet auf jede kWh sind das effektiv {fmtDe(beispielEffektiv, 2)} ct, weil der
          Grundpreis mitbezahlt wird. Was ein einzelnes Gerät verbraucht, berechnen Sie mit dem{" "}
          <Link href="/de/stromverbrauch-rechner">Stromverbrauchsrechner</Link>.
        </p>

        <h2 id="abschlag">Abschlag prüfen</h2>
        <p>
          Der Abschlag ist eine monatliche Vorauszahlung auf die Jahresrechnung. Liegt er zu niedrig, droht eine Nachzahlung; liegt er zu hoch,
          bekommen Sie Geld zurück. Lesen Sie Ihren Zähler zweimal im Abstand von einigen Wochen ab und nutzen Sie den Reiter „Zählerstand“: Der
          Rechner rechnet den Verbrauch auf 365 Tage hoch. Beachten Sie, dass im Winter meist mehr Strom verbraucht wird als im Sommer.
        </p>

        <h2 id="vergleich">Tarife vergleichen</h2>
        <p>
          Ein niedriger Arbeitspreis lohnt sich bei hohem Verbrauch, ein niedriger Grundpreis bei geringem. Im Reiter „Tarifvergleich“ sehen Sie
          neben den Jahreskosten beider Tarife auch den Verbrauch, ab dem sie gleich teuer sind. Achten Sie bei Angeboten zusätzlich auf
          Bonuszahlungen, die meist nur im ersten Jahr gelten.
        </p>

        <h2 id="tabelle">Tabelle: Stromkosten nach Verbrauch</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Jahresverbrauch</th>
                <th scope="col">Kosten im Jahr</th>
                <th scope="col">Abschlag im Monat</th>
                <th scope="col">Effektiv pro kWh</th>
              </tr>
            </thead>
            <tbody>
              {verbrauchsTabelle.map((row) => (
                <tr key={row.kwh}>
                  <td>{fmtDe(row.kwh, 0)} kWh</td>
                  <td>{eur(row.kosten)}</td>
                  <td>{eur(row.kosten / 12)}</td>
                  <td>{fmtDe(row.effektiv, 2)} ct</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Beispieltarif: 30 ct/kWh Arbeitspreis, 12 € Grundpreis pro Monat. Ihre tatsächlichen Preise stehen auf Ihrer Stromrechnung.</p>
      </TimeToolPage>
    </div>
  );
}
