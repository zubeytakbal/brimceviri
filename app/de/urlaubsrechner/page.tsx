import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import TimeToolPage from "../../components/time/TimeToolPage";
import { UrlaubsRechner } from "../../components/de/GermanWorkTools";
import type { FaqItem } from "../../converter/faqSchema";
import { mindesturlaub } from "../../converter/germanWork";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/urlaubsrechner";
const title = "Urlaubsrechner: Urlaubsanspruch bei Teilzeit und Jobwechsel";
const description =
  "Urlaubsanspruch berechnen: Umrechnung bei Teilzeit und anderer Zahl von Arbeitstagen, anteiliger Urlaub bei Ein- oder Austritt nach § 5 BUrlG, gesetzlicher Mindesturlaub.";

export const metadata: Metadata = {
  title: seoTitle(title, "Urlaubsrechner: Urlaubsanspruch berechnen", "Urlaubsrechner"),
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Wie viel Urlaub steht mir gesetzlich zu?",
    answer: "Mindestens 24 Werktage bei einer Sechstagewoche (§ 3 BUrlG), also vier Wochen. Bei einer Fünftagewoche sind das 20 Arbeitstage, bei drei Arbeitstagen pro Woche 12 Tage. Viele Arbeits- und Tarifverträge sehen mehr vor.",
  },
  {
    question: "Wie berechne ich den Urlaub bei Teilzeit?",
    answer: "Urlaubstage bei Vollzeit × eigene Arbeitstage pro Woche ÷ Arbeitstage bei Vollzeit. 30 Tage bei einer Fünftagewoche ergeben bei drei Tagen pro Woche 18 Urlaubstage – ebenfalls sechs freie Wochen.",
  },
  {
    question: "Wie viel Urlaub habe ich bei einem Jobwechsel?",
    answer: "Für jeden vollen Beschäftigungsmonat ein Zwölftel des Jahresurlaubs, wenn Sie vor Ablauf der sechsmonatigen Wartezeit oder in der ersten Jahreshälfte ausscheiden (§ 5 BUrlG). Wer nach erfüllter Wartezeit in der zweiten Jahreshälfte geht, hat mindestens den vollen gesetzlichen Jahresurlaub; bereits beim alten Arbeitgeber genommener Urlaub wird angerechnet (§ 6 BUrlG).",
  },
  {
    question: "Wird ein halber Urlaubstag aufgerundet?",
    answer: "Ja. Bruchteile von mindestens einem halben Tag werden nach § 5 Abs. 2 BUrlG auf einen ganzen Tag aufgerundet. Kleinere Bruchteile werden nicht abgerundet, sondern stundenweise gewährt.",
  },
  {
    question: "Wie viel Zusatzurlaub gibt es bei Schwerbehinderung?",
    answer: "Eine Arbeitswoche zusätzlich (§ 208 SGB IX): fünf Tage bei einer Fünftagewoche, entsprechend weniger bei weniger Arbeitstagen.",
  },
];

export default function UrlaubsrechnerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Urlaubsrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Urlaubsrechner"
        intro="Rechnen Sie Ihren Urlaubsanspruch auf Teilzeit oder eine andere Zahl von Arbeitstagen um oder ermitteln Sie den anteiligen Urlaub bei Beginn oder Ende eines Arbeitsverhältnisses."
        tool={<UrlaubsRechner />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [{ href: "/de/feiertage", label: "Feiertage und Brückentage" }, { href: "/de/arbeitstage-rechner", label: "Arbeitstage-Rechner" }, ...rechnerRelated(path)],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "mindesturlaub", label: "Gesetzlicher Mindesturlaub" },
          { id: "teilzeit", label: "Urlaub bei Teilzeit" },
          { id: "anteilig", label: "Anteiliger Urlaub" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="mindesturlaub">Gesetzlicher Mindesturlaub</h2>
        <p>
          Das Bundesurlaubsgesetz rechnet mit Werktagen (Montag bis Samstag): 24 Werktage sind vier Wochen. Wer weniger Tage arbeitet, hat
          entsprechend weniger Urlaubstage, aber genauso viele freie Wochen.
        </p>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Arbeitstage pro Woche</th>
                <th scope="col">Mindesturlaub</th>
              </tr>
            </thead>
            <tbody>
              {[6, 5, 4, 3, 2, 1].map((t) => (
                <tr key={t}>
                  <td>{t}</td>
                  <td>{mindesturlaub(t)} Tage</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="teilzeit">Urlaub bei Teilzeit</h2>
        <p>
          Maßgeblich ist die Zahl der Arbeitstage, nicht die Stundenzahl. Wer an fünf Tagen je vier Stunden arbeitet, hat genauso viele Urlaubstage
          wie in Vollzeit. Wer an drei Tagen arbeitet, bekommt drei Fünftel der Tage: aus 30 Tagen werden 18. Ändert sich die Zahl der Arbeitstage
          im Laufe des Jahres, wird der Urlaub für die Zeiträume getrennt berechnet.
        </p>

        <h2 id="anteilig">Anteiliger Urlaub bei Ein- und Austritt</h2>
        <p>
          Der volle Urlaubsanspruch entsteht erst nach sechs Monaten Beschäftigung (Wartezeit, § 4 BUrlG). Davor sowie bei Ausscheiden in der ersten
          Jahreshälfte gibt es ein Zwölftel pro vollem Monat. Beispiel: 30 Tage Jahresurlaub, Beginn am 1. Juni – bis Jahresende sieben volle Monate,
          also 30 ÷ 12 × 7 = 17,5 Tage, aufgerundet 18 Tage. Volle Monate zählen ab dem Eintrittsdatum, nicht nach Kalendermonaten.
        </p>
        <p>
          Wie viele freie Tage sich mit Brückentagen herausholen lassen, zeigen die <Link href="/de/feiertage">Feiertage nach Bundesland</Link>.
        </p>
        <p>
          <small>Rechtsgrundlage: §§ 3–7 Bundesurlaubsgesetz, § 208 SGB IX. Arbeits- und Tarifverträge können günstigere Regeln enthalten. Angaben ohne Gewähr, keine Rechtsberatung.</small>
        </p>
      </TimeToolPage>
    </div>
  );
}
