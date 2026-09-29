import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AnnualOutdatedNotice from "../../components/de/AnnualOutdatedNotice";
import BruttoNettoRechner from "../../components/de/BruttoNettoRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import {
  BBG_KV_MONAT,
  BBG_RV_MONAT,
  BN_JAHR,
  bruttoNetto,
  DEFAULT_EINGABE,
  euro,
  MIDIJOB_OBERGRENZE,
  MINIJOB_GRENZE,
  type Steuerklasse,
} from "../../converter/germanBruttoNetto";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

// Taeglich neu erzeugen, damit der Jahreshinweis rechtzeitig erscheint.
export const revalidate = 86400;

const path = "/de/brutto-netto-rechner";
const title = `Brutto-Netto-Rechner ${BN_JAHR}: Nettogehalt berechnen`;
const description = `Nettogehalt ${BN_JAHR} berechnen: Lohnsteuer nach amtlichem Programmablaufplan, Soli, Kirchensteuer und Sozialabgaben für alle Steuerklassen, mit Minijob, Midijob und privater Krankenversicherung.`;

export const metadata: Metadata = {
  title: seoTitle(title, `Brutto-Netto-Rechner ${BN_JAHR}`),
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: buildSiteUrl(path),
    siteName: "BirimCeviri.app",
    locale: "de_DE",
    type: "website",
  },
};

const netto = (brutto: number, steuerklasse: Steuerklasse) =>
  bruttoNetto({ ...DEFAULT_EINGABE, brutto, steuerklasse }).netto;
const beispiele = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000];
const b3000 = bruttoNetto({ ...DEFAULT_EINGABE, brutto: 3000 });
const fmt = (n: number) =>
  n.toLocaleString("de-DE", { maximumFractionDigits: 2 });

const faqItems: FaqItem[] = [
  {
    question: `Wie viel netto bleibt von 3.000 € brutto (${BN_JAHR})?`,
    answer: `In Steuerklasse I, kinderlos, ohne Kirchensteuer und mit 2,9 % Zusatzbeitrag etwa ${euro(b3000.netto)} im Monat. Davon gehen ${euro(b3000.lohnsteuer)} Lohnsteuer und ${euro(b3000.sozialabgaben)} Sozialabgaben ab. In Steuerklasse III sind es ${euro(netto(3000, 3))}.`,
  },
  {
    question: "Wie genau ist der Rechner?",
    answer: `Die Lohnsteuer und der Solidaritätszuschlag werden nach dem amtlichen Programmablaufplan ${BN_JAHR} des Bundesfinanzministeriums berechnet, den auch Lohnabrechnungsprogramme verwenden. Abweichungen zur echten Abrechnung entstehen durch Freibeträge, Sachbezüge, Einmalzahlungen, den Faktor bei Steuerklasse IV oder einen abweichenden Zusatzbeitrag Ihrer Krankenkasse.`,
  },
  {
    question: "Warum bekomme ich in Steuerklasse V so wenig netto?",
    answer:
      "Die Steuerklassen III und V sind für Ehepaare mit sehr unterschiedlichem Einkommen gedacht: Der Partner in III bekommt beide Grundfreibeträge, der Partner in V keinen. Über das Jahr gleicht die Steuererklärung das aus – entscheidend ist, was das Paar zusammen zahlt. Bei ähnlichen Gehältern ist IV/IV (oder IV mit Faktor) die bessere Wahl.",
  },
  {
    question: "Was ist ein Midijob?",
    answer: `Ein Gehalt zwischen ${fmt(MINIJOB_GRENZE + 0.01)} € und ${fmt(MIDIJOB_OBERGRENZE)} € im Monat (Übergangsbereich). Arbeitnehmer zahlen dort Sozialabgaben nur auf eine reduzierte Bemessungsgrundlage, die bei ${fmt(MINIJOB_GRENZE)} € bei null beginnt und bei ${fmt(MIDIJOB_OBERGRENZE)} € das volle Gehalt erreicht. Ansprüche auf Rente werden trotzdem aus dem vollen Gehalt berechnet.`,
  },
  {
    question: "Warum zahle ich ohne Kinder mehr Pflegeversicherung?",
    answer:
      "Kinderlose ab 23 Jahren zahlen einen Zuschlag von 0,6 Prozentpunkten, zusammen also 2,4 % statt 1,8 %. Eltern zahlen ab dem zweiten Kind unter 25 Jahren je Kind 0,25 Punkte weniger, höchstens bis zum fünften Kind. In Sachsen tragen Arbeitnehmer 0,5 Punkte mehr, weil dort der Buß- und Bettag ein Feiertag ist.",
  },
  {
    question: "Ab welchem Gehalt steigen die Sozialabgaben nicht mehr?",
    answer: `Ab der Beitragsbemessungsgrenze: ${BN_JAHR} liegt sie in der Kranken- und Pflegeversicherung bei ${fmt(BBG_KV_MONAT)} € und in der Renten- und Arbeitslosenversicherung bei ${fmt(BBG_RV_MONAT)} € im Monat. Auf das Gehalt darüber fallen keine weiteren Beiträge an.`,
  },
];

export default function BruttoNettoPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Brutto-Netto-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title={`Brutto-Netto-Rechner ${BN_JAHR}`}
        intro={`Berechnen Sie Ihr Nettogehalt für ${BN_JAHR}: Lohnsteuer, Solidaritätszuschlag, Kirchensteuer und die Beiträge zur Kranken-, Pflege-, Renten- und Arbeitslosenversicherung – für alle Steuerklassen, mit Minijob, Midijob und privater Krankenversicherung.`}
        tool={
          <>
            <AnnualOutdatedNotice id="de-brutto-netto" />
            <BruttoNettoRechner />
          </>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" },
            ...rechnerRelated(path),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "tabelle", label: `Brutto-Netto-Tabelle ${BN_JAHR}` },
          { id: "abzuege", label: "Welche Abzüge es gibt" },
          { id: "steuerklassen", label: "Die Steuerklassen" },
          { id: "werte", label: `Beitragssätze und Grenzen ${BN_JAHR}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="tabelle">Brutto-Netto-Tabelle {BN_JAHR}</h2>
        <p>
          Nettogehalt pro Monat, kinderlos, ohne Kirchensteuer, gesetzlich
          versichert mit 2,9 % Zusatzbeitrag:
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Brutto</th>
                <th scope="col">Klasse I / IV</th>
                <th scope="col">Klasse III</th>
                <th scope="col">Klasse V</th>
              </tr>
            </thead>
            <tbody>
              {beispiele.map((b) => (
                <tr key={b}>
                  <td>{euro(b)}</td>
                  <td>{euro(netto(b, 1))}</td>
                  <td>{euro(netto(b, 3))}</td>
                  <td>{euro(netto(b, 5))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="abzuege">Welche Abzüge es gibt</h2>
        <ul>
          <li>
            <strong>Lohnsteuer:</strong> Vorauszahlung auf die Einkommensteuer.
            Grundfreibetrag {BN_JAHR}: 12.348 €, Spitzensteuersatz 42 % ab
            69.879 € zu versteuerndem Einkommen.
          </li>
          <li>
            <strong>Solidaritätszuschlag:</strong> 5,5 % der Lohnsteuer, aber
            erst ab einer Jahreslohnsteuer von 20.350 € (Steuerklasse III:
            40.700 €), dann mit einer Milderungszone. Die meisten Arbeitnehmer
            zahlen keinen Soli mehr.
          </li>
          <li>
            <strong>Kirchensteuer:</strong> 8 % der Lohnsteuer in Bayern und
            Baden-Württemberg, 9 % in den übrigen Bundesländern – nur für
            Mitglieder einer steuererhebenden Religionsgemeinschaft.
          </li>
          <li>
            <strong>Sozialversicherung:</strong> Kranken-, Pflege-, Renten- und
            Arbeitslosenversicherung, im Regelfall je zur Hälfte von
            Arbeitnehmer und Arbeitgeber getragen.
          </li>
        </ul>

        <h2 id="steuerklassen">Die Steuerklassen</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <tbody>
              <tr>
                <th scope="row">I</th>
                <td>
                  Ledige, Geschiedene, dauernd getrennt Lebende und Verwitwete
                  (ab dem übernächsten Jahr nach dem Tod des Partners)
                </td>
              </tr>
              <tr>
                <th scope="row">II</th>
                <td>
                  Alleinerziehende mit Entlastungsbetrag (4.260 € plus 240 € für
                  jedes weitere Kind)
                </td>
              </tr>
              <tr>
                <th scope="row">III</th>
                <td>
                  Verheiratete, wenn der Partner Klasse V hat oder kein Gehalt
                  bezieht
                </td>
              </tr>
              <tr>
                <th scope="row">IV</th>
                <td>
                  Verheiratete mit ähnlichem Einkommen; auf Antrag mit Faktor
                </td>
              </tr>
              <tr>
                <th scope="row">V</th>
                <td>Verheiratete, deren Partner Klasse III hat</td>
              </tr>
              <tr>
                <th scope="row">VI</th>
                <td>Zweites und jedes weitere Arbeitsverhältnis</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="werte">Beitragssätze und Grenzen {BN_JAHR}</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Versicherung</th>
                <th scope="col">Satz gesamt</th>
                <th scope="col">Arbeitnehmer</th>
                <th scope="col">Grenze pro Monat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Krankenversicherung</td>
                <td>14,6 % + Zusatzbeitrag (Ø 2,9 %)</td>
                <td>7,3 % + halber Zusatzbeitrag</td>
                <td>{fmt(BBG_KV_MONAT)} €</td>
              </tr>
              <tr>
                <td>Pflegeversicherung</td>
                <td>3,6 %</td>
                <td>1,8 % (kinderlos 2,4 %, Sachsen +0,5)</td>
                <td>{fmt(BBG_KV_MONAT)} €</td>
              </tr>
              <tr>
                <td>Rentenversicherung</td>
                <td>18,6 %</td>
                <td>9,3 %</td>
                <td>{fmt(BBG_RV_MONAT)} €</td>
              </tr>
              <tr>
                <td>Arbeitslosenversicherung</td>
                <td>2,6 %</td>
                <td>1,3 %</td>
                <td>{fmt(BBG_RV_MONAT)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Minijob-Grenze {BN_JAHR}: {fmt(MINIJOB_GRENZE)} € im Monat,
          Übergangsbereich bis {fmt(MIDIJOB_OBERGRENZE)} €. Wie viele
          Arbeitstage Ihr Jahr hat, zeigt der{" "}
          <Link href="/de/arbeitstage-rechner">Arbeitstage-Rechner</Link>;
          Fahrtkosten setzen Sie mit dem{" "}
          <Link href="/de/pendlerpauschale-rechner">
            Pendlerpauschale-Rechner
          </Link>{" "}
          an.
        </p>
        <p>
          <small>
            Quellen: Programmablaufplan für die maschinelle Berechnung der
            Lohnsteuer {BN_JAHR} (BMF, umgesetzt mit dem quelloffenen Paket
            lohnsteuerrechner), Sozialversicherungsrechengrößen-Verordnung{" "}
            {BN_JAHR}, durchschnittlicher Zusatzbeitrag laut Bundesministerium
            für Gesundheit, § 20 Abs. 2a SGB IV. Unverbindliche Berechnung ohne
            Freibeträge, Einmalzahlungen und Faktorverfahren; keine
            Steuerberatung.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
