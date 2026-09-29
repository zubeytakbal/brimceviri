import { seoTitle } from "../../../seoTitle";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "@/app/components/SiteLink";
import AlarmClock from "../../../components/time/AlarmClock";
import TimeToolPage from "../../../components/time/TimeToolPage";
import type { FaqItem } from "../../../converter/faqSchema";
import { alarmLabelDe, alarmPathDe, alarmSlugDe, findAlarmTimeDe } from "../../../i18n/germanTimeTools";
import { alarmPresetAlternates, alarmPresetTimes } from "../../../i18n/timeToolPaths";
import { buildSiteUrl } from "../../../siteConfig";

export const dynamicParams = false;

type PageProps = { params: Promise<{ uhrzeit: string }> };

export function generateStaticParams() {
  return alarmPresetTimes.map((t) => ({ uhrzeit: alarmSlugDe(t) }));
}

function shift(time: string, delta: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (((h * 60 + m + delta) % 1440) + 1440) % 1440;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")} Uhr`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const time = findAlarmTimeDe((await params).uhrzeit);
  if (!time) return {};
  const label = alarmLabelDe(time);
  const path = alarmPathDe(time);
  const title = `Wecker ${label} stellen: online mit einem Klick`;
  const description = `Wecker auf ${label} ist eingestellt: mit einem Klick aktivieren, Ton wählen, schlummern. Dazu die beste Schlafenszeit, um um ${label} ausgeschlafen aufzuwachen.`;
  return {
    title: seoTitle(title, `Wecker ${label} stellen`),
    description,
    alternates: { canonical: path, ...alarmPresetAlternates(time) },
    openGraph: { title, description, url: buildSiteUrl(path), siteName: "BirimCeviri.app", locale: "de_DE", type: "website" },
  };
}

export default async function WeckerZeitPage({ params }: PageProps) {
  const time = findAlarmTimeDe((await params).uhrzeit);
  if (!time) notFound();
  const label = alarmLabelDe(time);
  const path = alarmPathDe(time);
  const bedTimes = [6, 5, 4].map((cycles) => ({ cycles, bed: shift(time, -15 - cycles * 90) }));

  const faqItems: FaqItem[] = [
    {
      question: `Wann muss ich ins Bett, um um ${label} aufzustehen?`,
      answer: `Mit 90-minütigen Schlafzyklen und 15 Minuten zum Einschlafen: um ${bedTimes[0].bed} für 6 Zyklen (9 Stunden), um ${bedTimes[1].bed} für 5 Zyklen (7,5 Stunden) oder um ${bedTimes[2].bed} für 4 Zyklen (6 Stunden).`,
    },
    {
      question: `Klingelt der Wecker für ${label}, wenn der Tab geschlossen ist?`,
      answer: "Nein, nur solange der Tab geöffnet ist. Er darf im Hintergrund liegen; auf dem Handy „Bildschirm anlassen“ aktivieren.",
    },
    {
      question: "Kann ich die Uhrzeit ändern?",
      answer: `Ja. ${label} ist nur voreingestellt; Stunde und Minute lassen sich frei wählen.`,
    },
  ];

  return (
    <div lang="de">
      <TimeToolPage
        crumbs={[
          { href: "/de", label: "Startseite" },
          { href: "/de/wecker", label: "Wecker" },
          { href: path, label: `Wecker ${label}` },
        ]}
        crumbLabel="Brotkrumen"
        title={`Wecker auf ${label} stellen`}
        intro={`Der Wecker ist auf ${label} voreingestellt. „Wecker stellen“ drücken, Ton oder Notiz nach Wunsch ändern. Darunter finden Sie die beste Schlafenszeit, um um ${label} ausgeschlafen aufzuwachen.`}
        tool={<AlarmClock locale="de" initialTime={time} />}
        related={{
          title: "Andere Weckzeiten",
          links: alarmPresetTimes.filter((t) => t !== time).map((t) => ({ href: alarmPathDe(t), label: `Wecker ${alarmLabelDe(t)}` })),
        }}
        tocTitle="Inhalt"
        tocItems={[
          { id: "schlafenszeit", label: `Schlafenszeit für ${label}` },
          { id: "faq", label: "Häufige Fragen" },
        ]}
        faqTitle="Häufige Fragen"
        faqItems={faqItems}
      >
        <h2 id="schlafenszeit">Wann ins Bett, um um {label} aufzuwachen?</h2>
        <p>Ein Schlafzyklus dauert etwa 90 Minuten. Wer am Ende eines Zyklus geweckt wird, fühlt sich meist frischer. Mit 15 Minuten Einschlafzeit:</p>
        <div className="conversion-table-wrap">
          <table className="conversion-table">
            <thead>
              <tr>
                <th scope="col">Zyklen</th>
                <th scope="col">Schlafdauer</th>
                <th scope="col">Schlafenszeit</th>
              </tr>
            </thead>
            <tbody>
              {bedTimes.map(({ cycles, bed }) => (
                <tr key={cycles}>
                  <td>{cycles} Zyklen</td>
                  <td>{(cycles * 1.5).toLocaleString("de-DE")} Stunden</td>
                  <td>
                    <strong>{bed}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Erwachsenen werden 7 bis 9 Stunden Schlaf empfohlen. Andere Zeiten berechnet der <Link href="/de/schlafrechner">Schlafrechner</Link>.
        </p>
      </TimeToolPage>
    </div>
  );
}
