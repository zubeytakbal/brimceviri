import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import MutterschutzRechner from "../../components/de/MutterschutzRechner";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import {
  mutterschutz,
  MUTTERSCHAFTSGELD_BAS,
  MUTTERSCHAFTSGELD_TAG,
} from "../../converter/germanMutterschutz";
import { formatDeShort } from "../../converter/time/germanDates";
import { rechnerRelated } from "../../i18n/germanRechnerLinks";
import { seoTitle } from "../../seoTitle";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/mutterschutzrechner";
const title =
  "Mutterschutzrechner: Mutterschutz und Mutterschaftsgeld berechnen";
const description =
  "Mutterschutz berechnen: Beginn 6 Wochen vor dem Geburtstermin, Ende 8 oder 12 Wochen nach der Geburt, Verlängerung bei Frühgeburt, Mutterschaftsgeld mit Arbeitgeberzuschuss und Fristen für die Elternzeit.";

export const metadata: Metadata = {
  title: seoTitle(title, "Mutterschutzrechner: Mutterschutz berechnen"),
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

// Beispiel für Text und Tabelle (fester Termin, damit die Seite unabhängig vom Erstellungstag ist).
const beispielTermin = { year: 2027, month: 3, day: 15 };
const normal = mutterschutz({ termin: beispielTermin, besonderheit: "keine" });
const frueh = mutterschutz({
  termin: beispielTermin,
  geburt: { year: 2027, month: 3, day: 1 },
  besonderheit: "keine",
});
const fruehgeburt = mutterschutz({
  termin: beispielTermin,
  geburt: { year: 2027, month: 2, day: 15 },
  besonderheit: "fruehgeburt",
});
const spaet = mutterschutz({
  termin: beispielTermin,
  geburt: { year: 2027, month: 3, day: 22 },
  besonderheit: "keine",
});

const faqItems: FaqItem[] = [
  {
    question: "Wann beginnt der Mutterschutz?",
    answer:
      "Sechs Wochen vor dem errechneten Geburtstermin, also zu Beginn der 35. Schwangerschaftswoche (34+0). In dieser Zeit dürfen Sie nur arbeiten, wenn Sie es ausdrücklich wünschen; diese Erklärung können Sie jederzeit widerrufen.",
  },
  {
    question: "Wie lange dauert der Mutterschutz nach der Geburt?",
    answer:
      "Acht Wochen, bei Frühgeburten, Zwillingen oder Mehrlingen zwölf Wochen. Zwölf Wochen gibt es auf Antrag auch, wenn innerhalb von acht Wochen nach der Geburt eine Behinderung des Kindes festgestellt wird. Nach der Geburt gilt ein absolutes Beschäftigungsverbot.",
  },
  {
    question: "Was passiert, wenn das Kind früher oder später kommt?",
    answer: `Kommt das Kind früher, werden die Tage, die vor der Geburt fehlten, nach der Geburt angehängt – der Mutterschutz dauert also trotzdem mindestens 14 Wochen. Beispiel: Termin ${formatDeShort(beispielTermin)}, Geburt ${formatDeShort(frueh.entbindung)} → Mutterschutz bis ${formatDeShort(frueh.ende)}. Kommt das Kind später, verlängert sich die Zeit vor der Geburt, die acht Wochen danach bleiben unverändert.`,
  },
  {
    question: "Wie viel Mutterschaftsgeld bekomme ich?",
    answer: `Gesetzlich Versicherte erhalten von der Krankenkasse höchstens ${MUTTERSCHAFTSGELD_TAG} € pro Kalendertag. Der Arbeitgeber zahlt die Differenz zum durchschnittlichen Nettoentgelt der letzten drei Monate (geteilt durch 90 Tage) dazu, sodass Sie netto etwa Ihr bisheriges Gehalt bekommen. Privat oder familienversicherte Arbeitnehmerinnen bekommen einmalig bis zu ${MUTTERSCHAFTSGELD_BAS} € vom Bundesamt für Soziale Sicherung plus den Arbeitgeberzuschuss.`,
  },
  {
    question: "Gibt es Mutterschutz nach einer Fehlgeburt?",
    answer:
      "Seit dem 1. Juni 2025 ja, ab der 13. Schwangerschaftswoche: zwei Wochen ab der 13., sechs Wochen ab der 17. und acht Wochen ab der 20. Schwangerschaftswoche. Sie können auf eigenen Wunsch früher wieder arbeiten.",
  },
  {
    question: "Wann muss ich die Elternzeit anmelden?",
    answer:
      "Spätestens sieben Wochen vor ihrem Beginn schriftlich beim Arbeitgeber, wenn sie vor dem dritten Geburtstag des Kindes liegt. Soll sie direkt an den Mutterschutz anschließen, zeigt der Rechner das Datum für die Anmeldung. Die Zeit des Mutterschutzes nach der Geburt wird auf die Elternzeit der Mutter angerechnet.",
  },
];

export default function MutterschutzPage() {
  const zeilen = [
    { fall: "Geburt am Termin", r: normal },
    { fall: "Geburt 14 Tage zu früh", r: frueh },
    { fall: "Frühgeburt 4 Wochen vor dem Termin", r: fruehgeburt },
    { fall: "Geburt 7 Tage nach dem Termin", r: spaet },
  ];
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Mutterschutzrechner" },
        ]}
        crumbLabel="Brotkrumen"
        title="Mutterschutzrechner"
        intro="Berechnen Sie Beginn und Ende Ihres Mutterschutzes aus dem Geburtstermin oder der letzten Periode – mit Verlängerung bei Früh- und Mehrlingsgeburten, Mutterschaftsgeld und Arbeitgeberzuschuss, Kündigungsschutz und der Frist für die Elternzeit."
        tool={<MutterschutzRechner />}
        related={{
          title: "Das könnte Sie auch interessieren",
          links: [
            {
              href: "/de/schwangerschaftswochen-rechner",
              label: "Schwangerschaftswochen-Rechner",
            },
            ...rechnerRelated(path),
          ],
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "fristen", label: "Die Schutzfristen" },
          { id: "beispiele", label: "Beispiele" },
          { id: "geld", label: "Mutterschaftsgeld und Zuschuss" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="fristen">Die Schutzfristen nach dem Mutterschutzgesetz</h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <tbody>
              <tr>
                <th scope="row">Vor der Geburt</th>
                <td>
                  6 Wochen vor dem errechneten Termin; Arbeit nur auf eigenen
                  Wunsch
                </td>
              </tr>
              <tr>
                <th scope="row">Nach der Geburt</th>
                <td>8 Wochen, absolutes Beschäftigungsverbot</td>
              </tr>
              <tr>
                <th scope="row">Früh- und Mehrlingsgeburt</th>
                <td>
                  12 Wochen nach der Geburt, dazu die vor der Geburt nicht
                  genutzten Tage
                </td>
              </tr>
              <tr>
                <th scope="row">Behinderung des Kindes</th>
                <td>
                  auf Antrag 12 Wochen, wenn sie innerhalb von 8 Wochen nach der
                  Geburt festgestellt wird
                </td>
              </tr>
              <tr>
                <th scope="row">Fehlgeburt ab 13. SSW</th>
                <td>
                  2 Wochen (ab 13. SSW), 6 Wochen (ab 17. SSW), 8 Wochen (ab 20.
                  SSW) – seit 1. Juni 2025
                </td>
              </tr>
              <tr>
                <th scope="row">Kündigungsschutz</th>
                <td>
                  von Beginn der Schwangerschaft bis vier Monate nach der Geburt
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="beispiele">
          Beispiele: Termin {formatDeShort(beispielTermin)}
        </h2>
        <div className="holiday-table-wrap">
          <table className="holiday-table">
            <thead>
              <tr>
                <th scope="col">Fall</th>
                <th scope="col">Mutterschutz</th>
                <th scope="col">Dauer</th>
              </tr>
            </thead>
            <tbody>
              {zeilen.map(({ fall, r }) => (
                <tr key={fall}>
                  <td>{fall}</td>
                  <td>
                    {formatDeShort(r.beginn)} – {formatDeShort(r.ende)}
                  </td>
                  <td>{r.tage} Tage</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="geld">Mutterschaftsgeld und Arbeitgeberzuschuss</h2>
        <p>
          Während des Mutterschutzes zahlt nicht der Arbeitgeber das Gehalt,
          sondern die Krankenkasse Mutterschaftsgeld von höchstens{" "}
          {MUTTERSCHAFTSGELD_TAG} € pro Kalendertag. Liegt Ihr
          durchschnittliches Nettoentgelt darüber, stockt der Arbeitgeber auf.
          Beispiel: 2.200 € netto im Monat ergeben 6.600 € in drei Monaten,
          geteilt durch 90 also 73,33 € pro Tag – davon 13 € Krankenkasse und
          60,33 € Arbeitgeber. Das Geld ist steuer- und sozialabgabenfrei,
          erhöht aber über den Progressionsvorbehalt den Steuersatz auf das
          übrige Einkommen. Ihr Nettogehalt berechnet der{" "}
          <Link href="/de/brutto-netto-rechner">Brutto-Netto-Rechner</Link>.
        </p>
        <p>
          <small>
            Rechtsgrundlage: §§ 3, 17, 19, 20 Mutterschutzgesetz (MuSchG) in der
            Fassung ab 1. Juni 2025, § 16 Bundeselterngeld- und
            Elternzeitgesetz. Die Berechnung ersetzt keine Auskunft der
            Krankenkasse oder des Arbeitgebers.
          </small>
        </p>
      </TimeToolPage>
    </div>
  );
}
