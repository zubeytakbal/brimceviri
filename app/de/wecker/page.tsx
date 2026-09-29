import type { Metadata } from "next";
import Link from "@/app/components/SiteLink";
import AlarmClock from "../../components/time/AlarmClock";
import TimeToolPage from "../../components/time/TimeToolPage";
import type { FaqItem } from "../../converter/faqSchema";
import { alarmLabelDe, alarmPathDe, timeToolsRelatedDe } from "../../i18n/germanTimeTools";
import { alarmPresetTimes, timeToolAlternates } from "../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../siteConfig";

const path = "/de/wecker";
const title = "Wecker online stellen: kostenlos mit Ton";
const description =
  "Online-Wecker im Browser: Weckzeit wählen, Ton aussuchen, Schlummerfunktion. Mehrere Wecker, täglich oder werktags wiederholen – ohne App und Anmeldung.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path, ...timeToolAlternates("alarm") },
  openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
};

const faqItems: FaqItem[] = [
  {
    question: "Klingelt der Wecker, wenn der Tab geschlossen ist?",
    answer: "Nein. Der Wecker klingelt, solange dieser Tab geöffnet ist; er darf aber im Hintergrund liegen. Auf dem Handy „Bildschirm anlassen“ aktivieren, damit das Gerät nicht einschläft.",
  },
  {
    question: "Kann ich mehrere Wecker stellen?",
    answer: "Ja. Jeder Wecker kann eine eigene Uhrzeit, Notiz und einen eigenen Ton haben und lässt sich einzeln an- und ausschalten. Die Liste bleibt in diesem Browser gespeichert.",
  },
  {
    question: "Gibt es eine Schlummerfunktion?",
    answer: "Ja. „Schlummern“ verschiebt das Klingeln um 5 Minuten.",
  },
  {
    question: "Kann ich den Wecker nur werktags klingeln lassen?",
    answer: "Ja. Unter „Wiederholen“ wählen Sie „Einmal“, „Täglich“ oder „Werktags (Mo–Fr)“.",
  },
];

export default function WeckerPage() {
  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: path, label: "Wecker" },
        ]}
        crumbLabel="Brotkrumen"
        title="Online-Wecker"
        intro="Weckzeit einstellen, Ton wählen und „Wecker stellen“ drücken. Zur eingestellten Zeit klingelt es, mit Schlummerfunktion. Mehrere Wecker und Wiederholung werktags sind möglich."
        tool={<AlarmClock locale="de" />}
        related={{ title: "Das könnte Sie auch interessieren", links: timeToolsRelatedDe(path) }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "anleitung", label: "So stellen Sie den Wecker" },
          { id: "weckzeiten", label: "Wecker nach Uhrzeit" },
          { id: "tipps", label: "Tipps für zuverlässiges Wecken" },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="anleitung">So stellen Sie den Wecker</h2>
        <ol>
          <li>Stunde und Minute wählen (24-Stunden-Format).</li>
          <li>Optional eine Notiz eingeben, etwa „Medikament“ oder „Zug um 7:12 Uhr“.</li>
          <li>Ton auswählen und mit „Ton testen“ die Lautstärke prüfen.</li>
          <li>„Wecker stellen“ drücken und den Tab geöffnet lassen.</li>
        </ol>

        <h2 id="weckzeiten">Wecker nach Uhrzeit</h2>
        <p>Für häufige Weckzeiten gibt es fertig eingestellte Seiten – mit der passenden Schlafenszeit:</p>
        <div className="time-tool-chips">
          {alarmPresetTimes.map((t) => (
            <Link key={t} href={alarmPathDe(t)} prefetch={false}>
              Wecker {alarmLabelDe(t)}
            </Link>
          ))}
        </div>

        <h2 id="tipps">Tipps für zuverlässiges Wecken</h2>
        <ul>
          <li>Gerät ans Ladekabel hängen und die Lautstärke vorher testen.</li>
          <li>Auf dem Handy „Bildschirm anlassen“ nutzen; sonst kann der Browser im Ruhezustand pausieren.</li>
          <li>
            Für wichtige Termine zusätzlich einen zweiten Wecker stellen. Die beste Zeit zum Schlafengehen berechnet der{" "}
            <Link href="/de/schlafrechner">Schlafrechner</Link>.
          </li>
        </ul>
      </TimeToolPage>
    </div>
  );
}
