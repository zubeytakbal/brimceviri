import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import KuendigungsfristRechner from "../../components/de/KuendigungsfristRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { ARBEITGEBER_STAFFEL } from "../../converter/germanKuendigung";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/kuendigungsfrist-rechner";
const title = "Kündigungsfrist-Rechner: Arbeitsvertrag und Mietvertrag";
const description =
  "Kündigungsfrist berechnen: Arbeitnehmer, Arbeitgeber nach Betriebszugehörigkeit, Probezeit und Mietvertrag. Mit spätestem Zugangsdatum für jeden Termin, Feiertagen der Bundesländer und § 622 BGB.";

export const metadata: Metadata = {
  title: seoTitle(title, "Kündigungsfrist-Rechner"),
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

const faqItems: FaqItem[] = [
  {
    question: "Welche Kündigungsfrist habe ich als Arbeitnehmer?",
    answer:
      "Ohne abweichende Regelung im Arbeits- oder Tarifvertrag vier Wochen zum 15. oder zum Ende eines Kalendermonats (§ 622 Abs. 1 BGB) – unabhängig davon, wie lange Sie schon im Betrieb sind. Wer zum 31. eines Monats kündigen will, muss die Kündigung dem Arbeitgeber also spätestens 28 Tage vorher zukommen lassen.",
  },
  {
    question: "Wie lange ist die Kündigungsfrist in der Probezeit?",
    answer:
      "Zwei Wochen, und zwar zu jedem beliebigen Tag – nicht nur zum 15. oder Monatsende. Das gilt für eine vereinbarte Probezeit von höchstens sechs Monaten.",
  },
  {
    question: "Zählt der Tag, an dem die Kündigung ankommt?",
    answer:
      "Nein. Die Frist beginnt am Tag nach dem Zugang (§ 187 BGB). Zugegangen ist die Kündigung, wenn sie so in den Machtbereich des Empfängers gelangt, dass er sie unter normalen Umständen lesen kann – bei einem Brief also meist am Tag des Einwurfs in den Briefkasten. Eine Kündigung per E-Mail oder WhatsApp ist beim Arbeitsvertrag unwirksam; sie muss schriftlich mit Unterschrift erfolgen.",
  },
  {
    question: "Wie berechne ich die Kündigungsfrist beim Mietvertrag?",
    answer:
      "Mieter können mit einer Frist von drei Monaten kündigen: Geht die Kündigung spätestens am dritten Werktag eines Monats zu, endet das Mietverhältnis mit Ablauf des übernächsten Monats. Samstage zählen dabei als Werktag, Sonn- und Feiertage nicht. Für Vermieter verlängert sich die Frist nach fünf und acht Jahren Wohndauer um jeweils drei Monate.",
  },
  {
    question: "Darf das Ende der Kündigungsfrist auf einen Sonntag fallen?",
    answer:
      "Ja. Die Regel, dass sich Fristen bis zum nächsten Werktag verlängern (§ 193 BGB), gilt für Kündigungsfristen nicht. Ein Arbeitsverhältnis kann also auch an einem Sonntag enden.",
  },
];

export default function KuendigungsfristPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Kündigungsfrist-Rechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Kündigungsfrist-Rechner"
        intro="Berechnen Sie, wann Ihr Arbeits- oder Mietverhältnis frühestens endet und bis wann die Kündigung spätestens zugehen muss – für Arbeitnehmer, Arbeitgeber, Probezeit, vertragliche Fristen und Mietverträge."
        tool={<KuendigungsfristRechner />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" },
            ...rechnerRelated(path),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "arbeit", label: "Kündigungsfristen im Arbeitsvertrag" },
          { id: "miete", label: "Kündigungsfristen im Mietvertrag" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="arbeit">Kündigungsfristen im Arbeitsvertrag (§ 622 BGB)</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Betriebszugehörigkeit</th>
                <th scope="col">Frist bei Kündigung durch den Arbeitgeber</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Probezeit (höchstens 6 Monate)</td>
                <td>2 Wochen zu jedem Tag</td>
              </tr>
              <tr>
                <td>unter 2 Jahre</td>
                <td>4 Wochen zum 15. oder Monatsende</td>
              </tr>
              {[...ARBEITGEBER_STAFFEL].reverse().map((s) => (
                <tr key={s.jahre}>
                  <td>ab {s.jahre} Jahren</td>
                  <td>
                    {s.monate} {s.monate === 1 ? "Monat" : "Monate"} zum
                    Monatsende
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Die verlängerten Fristen gelten nur für Kündigungen durch den
          Arbeitgeber; Arbeitnehmer kündigen weiter mit vier Wochen, wenn der
          Vertrag nichts anderes regelt. Die frühere Regel, nach der Jahre vor
          dem 25. Geburtstag nicht mitzählen, wendet man seit einem Urteil des
          Europäischen Gerichtshofs (2010) nicht mehr an. Tarifverträge dürfen
          kürzere oder längere Fristen vorsehen, Arbeitsverträge für den
          Arbeitnehmer keine längeren als für den Arbeitgeber.
        </p>

        <h2 id="miete">Kündigungsfristen im Mietvertrag (§ 573c BGB)</h2>
        <ul>
          <li>
            Mieter: drei Monate, unabhängig von der Wohndauer. Zugang spätestens
            am 3. Werktag, Ende mit Ablauf des übernächsten Monats.
          </li>
          <li>
            Vermieter: drei Monate, nach 5 Jahren Wohndauer sechs Monate, nach 8
            Jahren neun Monate – und nur mit berechtigtem Interesse, etwa
            Eigenbedarf.
          </li>
          <li>
            Die Kündigung muss schriftlich mit eigenhändiger Unterschrift
            erfolgen; eine E-Mail reicht nicht.
          </li>
        </ul>
        <p>
          Wie viele Tage bis zum Auszug bleiben, zeigt der{" "}
          <Link href="/de/tagerechner">Tagerechner</Link>. Welche Tage im
          Bundesland Feiertage sind, steht unter{" "}
          <Link href="/de/feiertage">Feiertage nach Bundesland</Link>.
        </p>
        <p>
          <small>
            Rechtsgrundlage: §§ 187, 188, 573c, 622 BGB; BGH, Urteil vom
            27.04.2005 – VIII ZR 206/04 (Samstag als Werktag). Die Berechnung
            ersetzt keine Rechtsberatung; Arbeits-, Tarif- und Mietverträge
            können abweichende Fristen enthalten.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
