import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AnnualOutdatedNotice from "../../components/de/AnnualOutdatedNotice";
import ArbeitszeitRechner from "../../components/de/ArbeitszeitRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { calendarRelated } from "../../i18n/germanCalendarTools";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

export const revalidate = 86400;

const path = "/de/arbeitszeitrechner";
const title =
  "Arbeitszeitrechner: Arbeitszeit, Pausen und Feierabend berechnen";
const description =
  "Arbeitszeit berechnen mit gesetzlicher Pause nach § 4 ArbZG, Feierabend-Rechner, Wochenarbeitszeit mit Überstunden und Ruhezeit-Prüfung, Umrechnung in Dezimalstunden.";

export const metadata: Metadata = {
  title: seoTitle(title, "Arbeitszeitrechner mit Pausen und Feierabend"),
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
    question: "Wie viel Pause ist bei 8 Stunden Arbeit Pflicht?",
    answer:
      "30 Minuten. Das Arbeitszeitgesetz verlangt bei mehr als sechs Stunden Arbeit mindestens 30 Minuten und bei mehr als neun Stunden 45 Minuten Pause. Die Pause darf in Abschnitte von mindestens 15 Minuten aufgeteilt werden; länger als sechs Stunden am Stück darf niemand ohne Pause arbeiten.",
  },
  {
    question: "Wann habe ich bei 8 Stunden Feierabend?",
    answer:
      "Wer um 8:00 Uhr beginnt und 8 Stunden arbeitet, hat mit der Pflichtpause von 30 Minuten um 16:30 Uhr Feierabend. Bei einer 39-Stunden-Woche (7:48 Std. am Tag) ist es 16:18 Uhr.",
  },
  {
    question: "Wie rechne ich Minuten in Dezimalstunden um?",
    answer:
      "Minuten durch 60 teilen: 15 Minuten sind 0,25 Stunden, 45 Minuten 0,75 Stunden. 7 Stunden 45 Minuten ergeben also 7,75 Stunden. Viele Zeiterfassungen und Stundenzettel rechnen mit diesen Industrieminuten.",
  },
  {
    question: "Wie lange darf ich maximal am Tag arbeiten?",
    answer:
      "Acht Stunden je Werktag, höchstens zehn Stunden, wenn im Durchschnitt von sechs Monaten oder 24 Wochen acht Stunden je Werktag nicht überschritten werden. Da der Samstag als Werktag zählt, ergibt das bis zu 48 Stunden pro Woche. Eine Reform, die eine wöchentliche statt einer täglichen Höchstarbeitszeit vorsieht, ist geplant, aber noch nicht in Kraft.",
  },
  {
    question: "Wie viel Ruhezeit brauche ich zwischen zwei Schichten?",
    answer:
      "Mindestens elf Stunden ununterbrochen nach Ende der täglichen Arbeitszeit. Wer um 22:00 Uhr Feierabend hat, darf also frühestens um 9:00 Uhr wieder anfangen. Für Jugendliche unter 18 Jahren sind es zwölf Stunden.",
  },
  {
    question: "Zählen Pausen zur Arbeitszeit?",
    answer:
      "Nein, Ruhepausen sind keine Arbeitszeit und werden in der Regel nicht bezahlt. Anders ist es bei Bereitschaft während der Pause oder bei kurzen Arbeitsunterbrechungen, die der Arbeitgeber anordnet.",
  },
];

const minuten = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function ArbeitszeitPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Arbeitszeitrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Arbeitszeitrechner"
        intro="Berechnen Sie Ihre Arbeitszeit mit der gesetzlichen Pause, wann Sie Feierabend haben und wie viele Überstunden in der Woche zusammenkommen. Der Rechner prüft Pausen, Höchstarbeitszeit und Ruhezeit nach dem Arbeitszeitgesetz und zeigt alles auch in Dezimalstunden."
        tool={
          <>
            <AnnualOutdatedNotice id="de-arbeitszeit" />
            <ArbeitszeitRechner />
          </>
        }
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            { href: "/de/stoppuhr", label: "Stoppuhr" },
            { href: "/de/brutto-netto-rechner", label: "Brutto-Netto-Rechner" },
            { href: "/de/urlaubsrechner", label: "Urlaubsrechner" },
            ...calendarRelated(path),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "regeln", label: "Regeln des Arbeitszeitgesetzes" },
          { id: "dezimal", label: "Minuten in Dezimalstunden" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="regeln">Die Regeln des Arbeitszeitgesetzes</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Regel</th>
                <th scope="col">Erwachsene (ArbZG)</th>
                <th scope="col">Unter 18 (JArbSchG)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pause</td>
                <td>über 6 Std.: 30 Min., über 9 Std.: 45 Min.</td>
                <td>über 4,5 Std.: 30 Min., über 6 Std.: 60 Min.</td>
              </tr>
              <tr>
                <td>Höchstarbeitszeit pro Tag</td>
                <td>8 Std., mit Ausgleich bis 10 Std.</td>
                <td>8 Std. (8,5 Std., wenn an anderen Tagen kürzer)</td>
              </tr>
              <tr>
                <td>Pro Woche</td>
                <td>48 Std. (6 Werktage × 8 Std.)</td>
                <td>40 Std., 5 Tage</td>
              </tr>
              <tr>
                <td>Ruhezeit</td>
                <td>11 Std.</td>
                <td>12 Std.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Pausen müssen im Voraus feststehen und dürfen in Abschnitte von
          mindestens 15 Minuten geteilt werden. Tarifverträge können abweichende
          Regeln enthalten, etwa für Schichtarbeit. Seit dem Urteil des
          Bundesarbeitsgerichts von 2022 müssen Arbeitgeber die Arbeitszeit
          erfassen; die Stunden zwischen zwei Terminen zählt der{" "}
          <Link href="/de/tagerechner">Tagerechner</Link>.
        </p>

        <h2 id="dezimal">Minuten in Dezimalstunden (Industrieminuten)</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Minuten</th>
                <th scope="col">Dezimal</th>
                <th scope="col">Minuten</th>
                <th scope="col">Dezimal</th>
              </tr>
            </thead>
            <tbody>
              {minuten.slice(0, 6).map((m, i) => (
                <tr key={m}>
                  <td>{m} Min.</td>
                  <td>
                    {(m / 60).toLocaleString("de-DE", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Std.
                  </td>
                  <td>{minuten[i + 6]} Min.</td>
                  <td>
                    {(minuten[i + 6] / 60).toLocaleString("de-DE", {
                      maximumFractionDigits: 2,
                    })}{" "}
                    Std.
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Weitere Zeiteinheiten rechnet der{" "}
          <Link href="/de/kategorien/zeit">Zeit-Umrechner</Link> um.
        </p>
        <p>
          <small>
            Rechtsgrundlage: §§ 3–5 Arbeitszeitgesetz, §§ 8, 11, 13
            Jugendarbeitsschutzgesetz (Stand 2026). Die Berechnung ersetzt keine
            Rechtsberatung; Tarifverträge und Betriebsvereinbarungen können
            abweichen.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
